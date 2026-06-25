# Sveltia CMS — AWS Lambda OAuth Relay (spec)

Replace the Sveltia GitHub **personal-access-token** login with a proper
"Sign in with GitHub" OAuth flow, hosted entirely on **AWS** (no Cloudflare).

Sveltia implements the **Netlify/Decap CMS external-OAuth protocol**, so any
relay that speaks that handshake works — we just host it on Lambda instead of a
Cloudflare Worker.

---

## 1. Why a relay is required

Browser OAuth needs the GitHub **client secret** to exchange the `?code=` for an
access token. A secret cannot live in the static, publicly-served
`public/admin/config.yml`. The relay is the one server-side piece that holds the
secret and performs that exchange. Two tiny endpoints, nothing else:

```
            ┌────────────────────────────── browser (/admin/) ──────────────────────────────┐
            │  Sveltia opens popup → ${base_url}/auth                                          │
            ▼                                                                                  │
   ┌───────────────────┐   302    ┌───────────────────┐   user approves   ┌──────────────┐    │
   │ Lambda  GET /auth  │ ───────► │ github.com/login/  │ ────────────────► │  redirect to │    │
   │  set state cookie  │          │   oauth/authorize  │                   │  /callback   │    │
   └───────────────────┘          └───────────────────┘                   └──────┬───────┘    │
                                                                                   ▼            │
   ┌──────────────────────────────────────────────┐   POST code+secret   ┌────────────────┐   │
   │ Lambda  GET /callback                          │ ───────────────────► │ github.com/...  │  │
   │  verify state → exchange code → access_token   │ ◄─────────────────── │ access_token    │  │
   │  return HTML that postMessage()s token back ───┼──────────────────────────────────────────┘
   └──────────────────────────────────────────────┘
```

CloudFront Functions / Lambda@Edge are **not** suitable (no general outbound
HTTP, too constrained). Use a normal Lambda.

---

## 2. Endpoints (Decap/Netlify protocol)

The relay exposes exactly two routes. Sveltia builds the start URL as
`${backend.base_url}/${backend.auth_endpoint}` where `auth_endpoint` defaults to
`auth`.

| Route          | Job                                                                 |
|----------------|---------------------------------------------------------------------|
| `GET /auth`    | Generate CSRF `state`, set a signed cookie, 302 → GitHub authorize. |
| `GET /callback`| Verify `state`, exchange `code` → token, return the postMessage page.|

**postMessage handshake** the callback page must perform (this is the protocol
Sveltia/Decap listen for):

1. Popup → opener: `postMessage("authorizing:github", "*")`
2. Opener → popup: replies with a message (its origin).
3. Popup validates `event.origin` against the allow-list, then →
   `postMessage('authorization:github:success:' + JSON.stringify({token, provider:'github'}), event.origin)`

On failure, send `authorization:github:error:<json>` instead.

---

## 3. Lambda handler (Node 20, zero dependencies)

Runtime **Node.js 20.x** (global `fetch` + `crypto` built in). Single CommonJS
file, zip-deployable. Function URL payload format **2.0**.

```js
// index.js
const crypto = require('crypto');

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  REDIRECT_URI,            // public URL of THIS relay's /callback (see §5)
  ALLOWED_ORIGINS = '',    // comma list of full CMS origins (scheme+host[:port])
  OAUTH_SCOPE = 'repo',    // 'repo' for a PRIVATE repo; 'public_repo' if public
  STATE_SECRET,            // random string used to sign the state cookie
} = process.env;

const ALLOWED = ALLOWED_ORIGINS.split(',').map(s => s.trim()).filter(Boolean);
const sign = v => crypto.createHmac('sha256', STATE_SECRET).update(v).digest('hex');

const html = (body) => ({
  statusCode: 200,
  headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
  body,
});

exports.handler = async (event) => {
  const path = event.rawPath || '/';
  const qs = event.queryStringParameters || {};
  const cookies = event.cookies || [];

  if (path.endsWith('/auth')) {
    const state = crypto.randomBytes(16).toString('hex');
    const cookie =
      `oauth_state=${state}.${sign(state)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`;
    const url =
      'https://github.com/login/oauth/authorize'
      + `?client_id=${encodeURIComponent(GITHUB_CLIENT_ID)}`
      + `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
      + `&scope=${encodeURIComponent(OAUTH_SCOPE)}`
      + `&state=${state}`;
    return { statusCode: 302, headers: { location: url }, cookies: [cookie] };
  }

  if (path.endsWith('/callback')) {
    // CSRF: state in query must match the signed cookie
    const sent = qs.state || '';
    const raw = (cookies.find(c => c.startsWith('oauth_state=')) || '').split('=')[1] || '';
    const [val, mac] = raw.split('.');
    if (!sent || sent !== val || sign(val) !== mac) {
      return html(page('error', JSON.stringify({ message: 'Invalid state' })));
    }

    const resp = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: qs.code,
        redirect_uri: REDIRECT_URI,
      }),
    });
    const data = await resp.json();
    if (data.error || !data.access_token) {
      return html(page('error', JSON.stringify({ message: data.error_description || 'OAuth failed' })));
    }
    return html(page('success', JSON.stringify({ token: data.access_token, provider: 'github' })));
  }

  return { statusCode: 404, body: 'Not found' };
};

// Renders the postMessage handshake page. `kind` is 'success' | 'error'.
function page(kind, payloadJson) {
  const allowed = JSON.stringify(ALLOWED);
  return `<!doctype html><html><body><script>
  (function () {
    var ALLOWED = ${allowed};
    var MSG = 'authorization:github:${kind}:' + ${JSON.stringify(payloadJson)};
    function receive(e) {
      if (ALLOWED.length && ALLOWED.indexOf(e.origin) === -1) return; // origin allow-list
      window.opener.postMessage(MSG, e.origin);
      window.removeEventListener('message', receive, false);
    }
    window.addEventListener('message', receive, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
  </script></body></html>`;
}
```

> `REDIRECT_URI` is set explicitly (not derived from the request host) so it
> stays correct when the relay sits behind CloudFront, where the inbound host
> differs from the Lambda's own URL.

---

## 4. Configuration — env vars / secrets

| Name                   | Example                                                                 | Notes |
|------------------------|-------------------------------------------------------------------------|-------|
| `GITHUB_CLIENT_ID`     | `Iv1.abc123…`                                                           | From the GitHub OAuth App. |
| `GITHUB_CLIENT_SECRET` | *(secret)*                                                              | Store in **SSM Parameter Store (SecureString)** or **Secrets Manager**; load at cold start. Do **not** commit. |
| `REDIRECT_URI`         | `https://<relay-base>/callback`                                         | Must match the OAuth App callback **exactly**. |
| `ALLOWED_ORIGINS`      | `https://astro-staging.revealbi.io,https://www.revealbi.io,http://localhost:4321` | Full origins (scheme+host[+port]). Gates who receives the token. Start staging-only. |
| `OAUTH_SCOPE`          | `repo`                                                                  | `repo` (private repo write). Use `public_repo` only if the repo is public. |
| `STATE_SECRET`         | *(random 32+ chars)*                                                    | Signs the CSRF state cookie. Generate once, keep secret. |

---

## 5. Hosting the Lambda — two options

### Option B1 — Lambda **Function URL** (recommended, minimal)
- Create the function (Node 20), **Function URL** with **Auth type: NONE** (it's a
  public OAuth endpoint — protected by `state` + origin allow-list).
- You get `https://<id>.lambda-url.<region>.on.aws/`.
- `base_url` (Sveltia) = that origin. `REDIRECT_URI` = that origin + `/callback`.
- Routes resolve as `…on.aws/auth` and `…on.aws/callback` (handler matches on
  `endsWith`).
- Optional but recommended: front with **CloudFront + WAF** for rate-limiting; or
  add Lambda reserved concurrency as a cheap throttle.

### Option B2 — behind your existing CloudFront (same-domain, nicer URLs)
- Add the Function URL as a **second origin** on the current distribution
  (use **Origin Access Control** for `lambda` so only CloudFront can call it).
- Add a cache behavior for path pattern **`/oauth/*`** → that origin, caching
  disabled (`CachingDisabled`), forward all query strings + the `Cookie` header.
- `base_url` = `https://www.revealbi.io/oauth`, callback =
  `https://www.revealbi.io/oauth/callback`. Update the handler route checks if you
  prefix with `/oauth` (the `endsWith` checks already tolerate a prefix).
- Trade-off: more CloudFront config, but no extra DNS and same-origin as `/admin/`.

### Deploy (SAM sketch)
```yaml
# template.yaml  (sam build && sam deploy --guided)
Resources:
  OAuthRelay:
    Type: AWS::Serverless::Function
    Properties:
      Runtime: nodejs20.x
      Handler: index.handler
      CodeUri: ./relay
      Timeout: 10
      MemorySize: 128
      FunctionUrlConfig: { AuthType: NONE }
      Environment:
        Variables:
          GITHUB_CLIENT_ID: !Ref GitHubClientId
          REDIRECT_URI:     !Ref RedirectUri
          ALLOWED_ORIGINS:  !Ref AllowedOrigins
          OAUTH_SCOPE:      repo
          # secrets via dynamic refs, not plaintext:
          GITHUB_CLIENT_SECRET: '{{resolve:secretsmanager:sveltia/oauth:SecretString:client_secret}}'
          STATE_SECRET:         '{{resolve:secretsmanager:sveltia/oauth:SecretString:state_secret}}'
```
(Plain zip upload to a hand-made Lambda works too — this is just for repeatability.)

---

## 6. GitHub OAuth App

Register under the **Infragistics-IS org** (Settings → Developer settings →
OAuth Apps → New) so the team owns it:

- **Homepage URL:** `https://www.revealbi.io`
- **Authorization callback URL:** `<REDIRECT_URI>` (e.g.
  `https://<id>.lambda-url.<region>.on.aws/callback` or
  `https://www.revealbi.io/oauth/callback`)

Copy **Client ID** + **Client Secret** into the env/secret store (§4).

> **Org approval:** if Infragistics-IS restricts third-party OAuth Apps, an org
> owner must approve this app before anyone can sign in.

---

## 7. Sveltia config change

One block in `public/admin/config.yml` — add `base_url` (and `auth_endpoint`
only if you used the `/oauth` prefix):

```yaml
backend:
  name: github
  repo: Infragistics-IS/Marketing-Reveal
  branch: cms-content
  base_url: https://<relay-base>        # Function URL origin, or https://www.revealbi.io
  # auth_endpoint: oauth/auth           # ONLY for Option B2 (CloudFront /oauth/* prefix)
  commit_messages:
    # …unchanged…
```

Editors then need **write access** to `Infragistics-IS/Marketing-Reveal`.

> Live `/admin/` reads the **deployed** `config.yml`: the change takes effect on
> `astro-staging.revealbi.io/admin/` once it reaches `staging`, and on
> `www.revealbi.io/admin/` once it reaches `main`.

---

## 8. Security checklist

- [x] **CSRF**: `state` signed (HMAC) in an `HttpOnly; Secure; SameSite=Lax`
      cookie; verified on `/callback`.
- [x] **Origin allow-list**: token only `postMessage`'d to an `ALLOWED_ORIGINS`
      origin — prevents token theft by a malicious opener.
- [x] **Secret storage**: client secret + `STATE_SECRET` in SSM/Secrets Manager,
      never in the repo or static assets.
- [x] **Scope**: `repo` (private repo). Don't over-grant.
- [x] **No caching**: `/auth` + `/callback` responses `Cache-Control: no-store`;
      if behind CloudFront use a `CachingDisabled` behavior.
- [ ] **Rate limiting** (recommended): CloudFront + WAF, or Lambda reserved
      concurrency, to blunt abuse of a public endpoint.

---

## 9. Staging-first rollout + test plan

1. Deploy relay; set `ALLOWED_ORIGINS=https://astro-staging.revealbi.io,http://localhost:4321`.
2. Register OAuth App with the callback URL; load client id/secret.
3. PR the `base_url` edit **into `staging`** only.
4. Verify on staging, then promote `staging → main` and **add
   `https://www.revealbi.io` to `ALLOWED_ORIGINS`**.

**Test URLs**
- Staging: https://astro-staging.revealbi.io/admin/ → "Sign in with GitHub" → approve → lands in CMS → make a trivial edit → confirm a commit on `cms-content`.
- Production (after promotion): https://www.revealbi.io/admin/ → same flow.

Roll back by removing `base_url` from `config.yml` (reverts to PAT login) — no
infra teardown needed.
