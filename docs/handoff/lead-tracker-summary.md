# Lead tracker & tracked forms

Quick reference for what `leadTracker.js` does, which forms it captures, and what's still open. For full historical detail see [`tracking-and-analytics.md`](tracking-and-analytics.md).

## What it does

`public/js/leadTracker.js` is a 778-line legacy script ported from the WordPress site. It captures form submissions, attaches reCAPTCHA tokens, and POSTs them to `/api/leadtrackingevents/track` on Infragistics' Salesforce-backed endpoint.

When we got here, it was effectively **dead code** — never initialized, ignored runtime config, no reCAPTCHA wiring. Fixed in three commits:

| Phase | What changed | Commit |
|---|---|---|
| 1 | `robots.txt` made build-time templated (reads `Astro.site`) | `5d7907b` |
| 2 | `leadTracker.js` reads `window.__REVEAL_CONFIG__.leadApiBase` (with legacy host-routing fallback) | `9c8e5bf` + `a36eba5` |
| 3 | reCAPTCHA v3 wired + all 6 forms initialized via inline `leadTracker.execute({...})` blocks | `1d9a329` |

## The 6 tracked forms

| Component | Form ID | Type / Asset code |
|---|---|---|
| `src/components/sections/LeadCaptureForm.astro` (used by 18 industry pages) | `lead-form_request-demo` | tier_1 / A800001 / demo request |
| `src/components/ui/Footer.astro` (every page) | `lead-form_newsletter` | tier_2 / A800003 / newsletter |
| `src/components/ui/DemoModal.astro` (header CTA) | `lead-form_2` | tier_1 / A800001 / demo request |
| `src/components/sections/PricingHero.astro` | `lead-form_pricing-quote` | tier_1 / A800005 / pricing quote |
| `src/layouts/WhitepaperLayout.astro` | `lead-form_1` | tier_1 / A800001 / demo request |
| `src/content/pages/en/request-demo.md` body | `lead-form_1` | tier_1 / A800001 / demo request |

## Endpoint routing

`leadTracker.js` resolves the API base in this order:

1. `PUBLIC_LEAD_API_BASE` if set (committed value is empty in both `.env.staging` and `.env.production`)
2. Auto-routes by hostname:
   - hostname contains `"staging"` → `https://staging.infragistics.com`
   - otherwise → `https://www.infragistics.com`

So on `astro-staging.revealbi.io`, leads route to `staging.infragistics.com`. On `www.revealbi.io` (post-cutover), they route to `www.infragistics.com`.

## Still open

- **Marketing handoff (Phase 4):** GA4, GTM, LinkedIn, HubSpot, reCAPTCHA site key — all env vars exist but values are empty pending marketing
- **Endpoint host unresolved:** `.env.example` historically suggested `acctapis.infragistics.com`, but the legacy script POSTs to `www.infragistics.com`. Confirm which is correct before prod cutover
- **End-to-end smoke test on staging (Phase 5):** submit a real form, confirm Salesforce receives the lead, confirm reCAPTCHA token is attached
- **JA `request-demo` caveat:** the inline `<script>` in `request-demo.md` body sits in markdown content — n8n's translation pipeline may process it on the next JA pass. If strings get stripped, switch the page to the `LeadCaptureForm` section type instead of body HTML

## Pointers

- Lead script: `public/js/leadTracker.js`
- Runtime config injection: `src/layouts/BaseLayout.astro:75`
- Lead form section: `src/components/sections/LeadCaptureForm.astro`
- Env config (analytics + endpoints): `src/lib/env.ts`
- Env example with all keys documented: `.env.example`
- Full analytics handoff doc: [`tracking-and-analytics.md`](tracking-and-analytics.md)
