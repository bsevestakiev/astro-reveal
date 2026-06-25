# Sveltia CMS — "Publish on Save" (toggle + watcher → production)

Give non-technical blog editors a **WordPress-style publish gesture**: tick a
checkbox on the post, hit Sveltia's normal **Save**, and the post goes live on
`www.revealbi.io` minutes later — attributed to them, fully logged, with **no
GitHub seats** and **no code able to ride the lane**.

This is the lowest-effort path that uses **only natively-supported Sveltia
widgets** (a boolean + a select). It deliberately avoids custom Sveltia editor
components, which this repo already found unreliable — see the `ctaDemo` toggle
in `src/content.config.ts` (the same "boolean-as-action" pattern) and commit
`f6e1e0e` ("remove Body-field hint about Sveltia editor-component support").

It supersedes the relay approach in `aws-oauth-relay-spec.md`: once editing
happens on a single always-on **authoring host** that holds one git credential,
"commit locally" replaces the AWS Lambda/API-Gateway relay entirely.

---

## 1. The editor's experience

1. Open the post in Sveltia (`/admin/` on the authoring host).
2. Edit. Preview is live at the host URL (Astro dev server, hot reload).
3. Pick your name in **Published by**.
4. Tick **Publish to production now**.
5. Hit **Save**.

That's it. No branches, no PRs, no git. The post is live on prod shortly after,
with a commit attributed to the person picked in **Published by**.

---

## 2. Why this works (and why nothing fancier is needed)

| Concern | Resolution |
|---|---|
| Editors have no GitHub seats (private repo write = a paid seat) | They never write to GitHub. The **host** holds one credential and pushes on their behalf. Editing uses Sveltia **local backend** (writes local files, no GitHub auth). |
| No anonymous PAT, need attribution | A native **select** field captures who published; the watcher sets that person as the **commit author** (GitHub links the commit to their profile via the no-reply email). |
| Sveltia can't surface custom editor buttons | Use a native **boolean** toggle as the action trigger — the exact pattern already used by `ctaDemo`. |
| Code must never reach prod via this lane | The promote **workflow** enforces a blog-only path allowlist before anything merges. |
| Branch conventions for code must stay intact | The lane routes `cms-content → staging → main`, which satisfies `pr-branch-policy.yml` (PRs to `main` allowed from `staging`). Code keeps its normal reviewed flow. |

---

## 3. CMS fields (config.yml only — NOT in the Zod schema)

Add two fields to the `blog` collection (`public/admin/config.yml`, after
`author`). They are **transient control signals**, not content, so they are
intentionally kept out of `src/content.config.ts`. Astro's Zod schema strips
unknown keys, and `validate-content.mjs` only inspects HTML in strings, so these
keys never break a build even if one slips through un-stripped.

```yaml
      # ── Publish-on-Save controls (transient; stripped by the host watcher
      #    before the commit, so they never persist in the repo). ───────────
      - name: publishedBy
        label: Published by
        widget: select
        required: false
        i18n: duplicate
        hint: 'Who is publishing this. Used for the commit author / audit log.'
        options:
          - Casey Ciniello
          - Bilyana Petrova
          - Martin Atanasov
          - Zdravko Kolev
          - Jason Beres
      - name: publishNow
        label: 'Publish to production now'
        widget: boolean
        required: false
        default: false
        i18n: duplicate
        hint: 'Tick + Save to push this post straight to www.revealbi.io.'
```

> `publishedBy` mirrors the existing `author` dropdown but is a *separate*
> field: the byline (`author`) and the person hitting publish can differ.

---

## 4. The host watcher

A small Node service running on the authoring host (e.g. `chokidar` +
`gray-matter` + `simple-git`, or plain `git` via `execFile`). It is the only
thing that turns a Save into a publish.

```
watch  src/content/blog/en/*.md
on change(file):
  fm = parseFrontmatter(file)
  if fm.publishNow !== true:            # normal Save → leave it local
      return
  who   = EDITORS[fm.publishedBy]        # { name, email } map; unknown → abort + log
  if !who: log('unknown publishedBy'); return

  stripKeys(file, ['publishNow','publishedBy'])   # remove control signals
  git add <file>                                   # ONLY this post (per-post scope)
  git commit --author "<who.name> <who.email>" \
             -m "content(blog): <slug> — publish [ship]"
  git push origin cms-content                       # host credential (cms-content only)
  log(who, slug, timestamp)                          # local audit line
```

Key properties:

- **Idempotent.** After stripping, `publishNow` is gone, so the watcher's own
  rewrite does not re-trigger a publish.
- **Per-post scoping.** Only the saved post (and, if used, its images under
  `public/images/blog/`) is committed — so a co-worker's half-finished draft in
  the same working tree can't ride along. This is the mitigation for the shared
  working-tree collision risk.
- **Normal Saves are untouched.** `publishNow: false` → the file just sits in
  the local tree and can still go through the normal reviewed flow later.
- **The `[ship]` marker** in the commit message is what the promote workflow
  keys on, so non-watcher commits to `cms-content` keep the old buffer behavior.

The `EDITORS` map (name → GitHub no-reply email) lives in the watcher config:

```js
const EDITORS = {
  'Casey Ciniello':  { name: 'Casey Ciniello',  email: '<id>+casey@users.noreply.github.com' },
  // …one line per editor; <id> is their GitHub numeric id for profile linking
};
```

---

## 5. Attribution

- **v1 (native, self-selected):** the `publishedBy` dropdown → commit author.
  Self-selected, but the OAuth gate (§7) has already proven a real, allowlisted
  person is at the keyboard, so the gate access log + the commit author together
  form the audit trail. Good enough for an internal trusted team.
- **v2 (gate-verified, optional upgrade):** put oauth2-proxy in front of the
  Sveltia local-backend proxy; it injects a verified `X-Forwarded-Email`. A thin
  middleware logs `email → file → timestamp`, and the watcher correlates the
  saved file to the verified user instead of trusting the dropdown. Tamper-proof,
  more code. Not required for v1.

---

## 6. Promote workflow (`.github/workflows/promote-content.yml`)

Runs in CI on push to `cms-content` **when the head commit carries `[ship]`**.
This is the safety core — it runs in a clean environment and cannot be skipped.

1. **Path allowlist** — diff `cms-content` vs `main`; every changed file must be
   under `src/content/blog/en/**` or `public/images/blog/**`. Anything else →
   abort and open a normal human PR instead (code physically cannot promote).
2. **Build gate** — `node scripts/validate-content.mjs` + `astro build`. A broken
   post fails here and never deploys.
3. **Promote** — `cms-content → staging` (deploys to staging for the record) →
   `staging → main` (policy-compliant) → `main` deploys to production via the
   existing `deploy.yml`.
4. **Attribute** — carry the commit author / `publishedBy` into the PR title and
   body.
5. **Sync** — fast-forward `main → staging` and reset `cms-content` onto `main`
   (keeps the "main and staging in sync" rule satisfied, automated).

> **Gotcha:** the push to `main` MUST use a PAT or GitHub App token, **not** the
> default Actions `GITHUB_TOKEN` — a `GITHUB_TOKEN` push does not trigger
> `deploy.yml`, so prod would silently never update.

---

## 7. Host setup (always-on authoring environment)

- **Astro dev** (`npm run dev`, :4321) and **Sveltia local-backend proxy**
  (`@sveltia/cms-proxy-server`, :3000), both as `systemd`/`pm2` services so they
  survive reboots.
- **nginx**: TLS + an auth gate + reverse-proxy `/` → :4321 and the proxy
  endpoint → :3000. The proxy ships with **no auth of its own**, so the gate in
  front of it is mandatory.
- **Auth gate:** start with HTTP basic-auth; upgrade to **oauth2-proxy with the
  GitHub provider + a username allowlist** (free — identity only, no repo access,
  no seats) when gate-verified attribution (§5 v2) is wanted.
- **Vite:** set `server.allowedHosts` to the nginx hostname or proxied requests
  are refused.
- **Git credential** on the host: scoped to **`cms-content` only** (a GitHub App
  install limited by a branch ruleset, or a deploy key + push ruleset). The
  privileged **`main`** push credential lives **only** in GitHub Actions secrets
  — least privilege, two separate credentials.

Editing a dev server that's network-exposed is acceptable only behind the gate +
TLS + (ideally) an IP allowlist/VPN. Dev servers are not hardened for the open
internet.

---

## 8. Edge cases & failure handling

- **Build/validate fails in CI** → the post does not deploy; the workflow run
  records the failure. v1: editor learns via the run / a notification. A later
  enhancement can write the failure back as a `lastPublishError` field the editor
  sees on reload.
- **Two editors, one host** → per-post commit scoping (§4) keeps publishes
  isolated; simultaneous edits to the *same* post are last-writer-wins (same as
  any shared CMS).
- **Unknown `publishedBy`** → watcher aborts the publish and logs; nothing ships.
- **Watcher down** → Saves still write locally; nothing publishes until it's
  back (fail-safe, not fail-open).
- **Control keys leak** (watcher missed one) → harmless: Zod strips them, the
  build ignores them; the promote workflow can also strip as a belt-and-suspenders
  normalization step.

---

## 9. Security checklist

- [x] **No seats** — editors never hold repo write; one host credential + one
      Actions credential do all writes.
- [x] **No anonymous PAT** — credentials are server-side (host + Actions secrets);
      every publish is attributed and logged.
- [x] **Code can't promote** — blog-only path allowlist enforced in CI.
- [x] **Least privilege** — host credential = `cms-content` only; `main` push
      credential = Actions secrets only.
- [x] **Gate in front of the unauth'd local-backend proxy** — basic-auth → GitHub
      OAuth.
- [ ] **Gate-verified attribution** (§5 v2) — optional hardening.
- [ ] **Rate/abuse limiting on the host** — IP allowlist / VPN recommended.

---

## 10. Rollout & test plan

1. Add the two fields to `config.yml` on a feature branch → PR to `staging`.
   (They're inert until the watcher exists, so this is safe to land first.)
2. Stand up the host (§7) pointed at `cms-content`; install the watcher with a
   `cms-content`-scoped credential.
3. Add `promote-content.yml` with the `main`-push credential in Actions secrets.
4. **Dry run:** create a throwaway post, tick Publish + Save → confirm: a
   `[ship]` commit on `cms-content` authored to the picked editor → workflow runs
   → staging deploys → main deploys → post live on `www.revealbi.io` → control
   keys absent from the committed file → `main`/`staging` back in sync.
5. **Negative test:** put a non-blog change on `cms-content` with `[ship]` →
   confirm the workflow refuses to promote and opens a human PR instead.

**Test URLs**
- Staging: https://astro-staging.revealbi.io/blog/<slug>
- Production: https://www.revealbi.io/blog/<slug>

Rollback: remove the two fields from `config.yml` (editors lose the button) and
disable the watcher — the normal reviewed flow is unaffected.
