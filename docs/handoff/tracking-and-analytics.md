# Tracking & analytics — finish wiring

Snapshot taken 2026-05-04. Picks up tomorrow.

Today the analytics components and env scaffolding are in place but two pipelines are half-wired and one config file is hardcoded. ~3h total to close all gaps.

---

## Current state (updated 2026-05-05 — Phases 1–3 done)

| Piece | Status | File |
|---|---|---|
| GA4 / GTM / LinkedIn / Meta / Hotjar / HubSpot snippets | ✅ wired, env-gated, off until IDs set | `src/components/Analytics.astro` |
| `window.__REVEAL_CONFIG__` injection | ✅ injected | `src/layouts/BaseLayout.astro:75` |
| `leadTracker.js` reads `__REVEAL_CONFIG__.leadApiBase` | ✅ done (`9c8e5bf`); env empty → legacy auto-routing fallback | `public/js/leadTracker.js` |
| reCAPTCHA v3 script load + token attach on submit | ✅ done (`1d9a329`); env-gated, forms work without it | `src/components/Analytics.astro`, `public/js/leadTracker.js` |
| Lead form `leadTracker.execute()` initialization | ✅ done (`1d9a329`); 6 forms wired via inline init scripts | 6 components / pages |
| Sitemap (5 locales, `hreflang`, excludes `/search`) | ✅ generated at build | `astro.config.mjs:6-13` |
| `robots.txt` sitemap URL | ✅ done (`5d7907b`); now reads `Astro.site` | `src/pages/robots.txt.ts` |
| Production env values (GA4 / GTM / etc.) | ❌ not set — marketing handoff (Phase 4) | `.env` |
| End-to-end smoke test on staging | ❌ pending Phase 4 | — |

---

## Phase 1 — Templatize `robots.txt` — ✅ DONE (`5d7907b`)

Right now `public/robots.txt` line 4 says `Sitemap: https://www.revealbi.io/sitemap-index.xml`. If we ship to `astro-staging.revealbi.io` first, search engines hit a 404 there.

**Action:** delete `public/robots.txt`, replace with `src/pages/robots.txt.ts` that reads `Astro.site` (which respects `PUBLIC_SITE_URL`):

```ts
import type { APIRoute } from 'astro'
export const GET: APIRoute = ({ site }) => new Response(
  `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site!).href}\n`,
  { headers: { 'Content-Type': 'text/plain' } },
)
```

**Verify:** `npm run build` → `dist/robots.txt` shows the correct origin.

---

## Phase 2 — `leadTracker.js` reads `__REVEAL_CONFIG__` — ✅ DONE (`9c8e5bf` + `a36eba5`)

`_apiBase()` helper added; reads `cfg.leadApiBase` and falls back to legacy `getAppApiHost()` auto-routing when empty. `env.ts` default cleared to `''` (was `acctapis.infragistics.com`) so the fallback actually fires by default. `acctapis` vs `www.infragistics.com` host question is still unresolved — see `lead_api_host_unresolved.md` memory.

### Original notes (kept for reference)

The 778-line legacy `leadTracker.js` ignores the runtime config that BaseLayout injects. So `PUBLIC_LEAD_API_BASE` is currently a dead env var.

**Two callsites to patch** (search for `getAppApiHost()`):
- `leadTracker.js:422` — `POST /api/leadtrackingevents/track`
- `leadTracker.js:644` — `POST /api/productresources/{id}/initiatedownload`
- `leadTracker.js:741` — `GET /api/productresources?...`

**Action:** at the top of `leadTracker.js`, add:
```js
function _apiBase() {
  var cfg = window.__REVEAL_CONFIG__;
  return (cfg && cfg.leadApiBase)
    ? cfg.leadApiBase
    : `${window.location.protocol}//${window.location.hostname.includes('staging') ? 'staging.infragistics.com' : 'www.infragistics.com'}`;
}
```

Then replace each `${window.location.protocol}//${getAppApiHost()}` with `${_apiBase()}`. Keep `getAppApiHost()` for backward compat in case anything else calls it.

**⚠️ Endpoint mismatch to confirm before deploying:** `.env.example` has `PUBLIC_LEAD_API_BASE=https://acctapis.infragistics.com`, but the legacy script POSTs to `www.infragistics.com/api/leadtrackingevents/track`. These are two different hosts. Decide which is correct (probably `www.infragistics.com` since that's what's been working in prod) and align the env default — otherwise this patch will silently route leads to a 404 host.

**Test plan:**
1. Set `PUBLIC_LEAD_API_BASE=https://httpbin.org` in `.env`, rebuild, submit a form, confirm POST hits httpbin.
2. Unset, rebuild, confirm POST falls back to `www.infragistics.com`.
3. Real submit on staging build, confirm Salesforce receives the lead.

---

## Phase 3 — reCAPTCHA v3 + lead-form wiring — ✅ DONE (`1d9a329`)

Scope was bigger than originally planned: discovered that `leadTracker.execute({...})` was never called anywhere, so all 6 lead forms across the site were dead, not just missing reCAPTCHA. Mirrored WordPress's per-form settings templates and wired each form via inline `<script is:inline>` blocks:

| Component | Form ID | Settings template |
|---|---|---|
| `LeadCaptureForm.astro` (18 industry pages) | `lead-form_request-demo` | tier_1 / A800001 / "demo request" |
| `Footer.astro` (every page) | `lead-form_newsletter` | tier_2 / A800003 / "newsletter signup" |
| `DemoModal.astro` (header CTA) | `lead-form_2` | tier_1 / A800001 / "demo request" / formContainerId="modal-demo_0000" |
| `PricingHero.astro` (pricing page) | `lead-form_pricing-quote` | tier_1 / A800005 / "pricing quote" |
| `WhitepaperLayout.astro` | `lead-form_1` | tier_1 / A800001 / "demo request" |
| `request-demo.md` body | `lead-form_1` | tier_1 / A800001 / "demo request" |

`leadTracker.js` got a guard: if `grecaptcha` isn't loaded (env key empty) or `reaptchaKey` is empty, submit without a token instead of throwing. `Analytics.astro` conditionally injects the reCAPTCHA `<script>` only when `PUBLIC_RECAPTCHA_SITE_KEY` is set.

**Known caveat:** the `<script>` block in `request-demo.md` body sits in markdown content. n8n's translation pipeline may process it — needs to be checked after the next non-EN re-translation. If it strips strings, the workaround is to convert `request-demo` to use the `LeadCaptureForm` section type instead of body HTML.

### Original notes (kept for reference)

Form already has `recaptchaError` div (`LeadCaptureForm.astro:36`) but no script ever runs.

**Steps:**
1. In `Analytics.astro` (or a new `Recaptcha.astro` mounted from BaseLayout), conditionally render:
   ```astro
   {recaptchaSiteKey && (
     <script is:inline async defer src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}></script>
   )}
   ```
2. In `leadTracker.js`, before the lead-tracking `xhr.send(...)`:
   ```js
   if (window.grecaptcha && window.__REVEAL_CONFIG__?.recaptchaSiteKey) {
     await new Promise(r => grecaptcha.ready(r));
     var token = await grecaptcha.execute(window.__REVEAL_CONFIG__.recaptchaSiteKey, { action: 'lead_submit' });
     trackingDataRequest.recaptchaToken = token;
   }
   ```
3. Server-side verification (Salesforce side) is out of scope for this repo — just confirm with whoever owns `acctapis`/`www.infragistics.com` that they accept and verify the token.

**Test plan:**
- Site key set → reCAPTCHA badge appears bottom-right; form submit attaches token.
- Site key empty → no script load, form submits unchanged (graceful fallback).

---

## Phase 4 — Production env values — depends on marketing

External dependency. Get from marketing:
- GA4 measurement ID (`G-XXXXXXXXXX`)
- GTM container ID if marketing manages tags through it (`GTM-XXXXXXX`)
- LinkedIn partner ID for B2B remarketing
- HubSpot portal ID if HubSpot is the CRM
- reCAPTCHA v3 site key (and confirm secret key is configured server-side)
- Confirm `PUBLIC_SITE_URL` for prod (`https://www.revealbi.io` vs `https://astro-staging.revealbi.io`)

Set in production `.env` or deploy pipeline secrets, rebuild, deploy.

---

## Phase 5 — End-to-end smoke test — ~30 min

After Phases 1–4 ship to staging:

1. **GA4** — open GA4 Realtime, load 3 pages, confirm events appear.
2. **Lead form** — submit a test lead, confirm it lands in Salesforce.
3. **Sitemap** — `curl https://<host>/sitemap-index.xml` → confirm all 5 locale shards listed.
4. **robots.txt** — `curl https://<host>/robots.txt` → confirm Sitemap line matches host.
5. **reCAPTCHA** — DevTools network tab on form submit → `recaptchaToken` in payload.
6. **`hreflang`** — view-source on homepage → confirm `<link rel="alternate" hreflang="...">` for all 5 locales.

---

## Recommended order

**1 → 2 → 3 → 4 → 5.** Phase 4 can happen in parallel with 2 and 3 if marketing is responsive.

If short on time: **Phase 4 + Phase 1** alone unblock GA4 and a correct sitemap-pointer in robots.txt — the most visible wins. Phases 2 and 3 are about fixing dead config that nobody is currently relying on.

---

## Pointers

- Analytics component: `src/components/Analytics.astro`
- Env config: `src/lib/env.ts` (the `ANALYTICS` export)
- Env example with all keys documented: `.env.example`
- Runtime config injection: `src/layouts/BaseLayout.astro:75`
- Legacy lead script: `public/js/leadTracker.js`
- Lead form section: `src/components/sections/LeadCaptureForm.astro`
- Sitemap config: `astro.config.mjs:6-13`
