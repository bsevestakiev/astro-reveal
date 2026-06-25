# Cutover checklist

Going from "staging serving `astro-staging.revealbi.io`" to "production serving `www.revealbi.io`."

The branch + env-file model means cutover is **mostly DNS plus filling in a couple of values that were unknown at handoff**. There are no code edits to make at launch — anything that should differ between staging and prod already differs through `.env.staging` vs `.env.production`.

---

## Prerequisites (before cutover day)

### 1. AWS infrastructure exists for both environments

Two S3 buckets + two CloudFront distributions + two GitHub Actions environments, each with their own scoped secrets. Setup steps in [`../../DEPLOY.md`](../../DEPLOY.md).

| Resource | Staging | Production |
|---|---|---|
| S3 bucket | (e.g. `astro-revealbi-staging`) | (e.g. `astro-revealbi-prod`) |
| CloudFront distribution | distro fronting the staging bucket | distro fronting the prod bucket |
| Domain | `astro-staging.revealbi.io` | `www.revealbi.io` |
| Security headers policy | applied from `infra/cloudfront-response-headers-policy.json` | same |
| GitHub Actions env name | `staging` | `production` |

### 2. Production analytics + reCAPTCHA values are in `.env.production`

Get from marketing and commit:

| Env var | Format |
|---|---|
| `PUBLIC_GA4_MEASUREMENT_ID` | `G-XXXXXXXXXX` |
| `PUBLIC_GTM_CONTAINER_ID` | `GTM-XXXXXXX` |
| `PUBLIC_LINKEDIN_PARTNER_ID` | numeric |
| `PUBLIC_HUBSPOT_PORTAL_ID` | numeric |
| `PUBLIC_HOTJAR_SITE_ID` | numeric |
| `PUBLIC_META_PIXEL_ID` | numeric (only if running paid social) |
| `PUBLIC_RECAPTCHA_SITE_KEY` | v3 site key |

`Analytics.astro` only renders a snippet block when its env var is set — empty means dormant. The Consent Mode v2 default-deny in `BaseLayout.astro` runs before any of these load, so EU consent law is respected from the first paint.

### 3. Lead API host decision (unresolved)

`PUBLIC_LEAD_API_BASE` is empty in `.env.production`. When empty, `public/js/leadTracker.js` auto-routes by hostname (a host containing "staging" → `staging.infragistics.com`; otherwise → `www.infragistics.com`). This is the historically-correct behavior for `/api/leadtrackingevents/track`.

**Open question:** the original `.env.example` had suggested `https://acctapis.infragistics.com`, but the legacy script has never POSTed there. Confirm with the Salesforce-side owner before setting a non-empty value. Setting it incorrectly silently routes prod leads to a 404.

### 4. Lead-form consent gating (deferred fix, legal exposure)

`public/js/leadTracker.js` submits regardless of `IGconsentMode`. Once GA wires for EU visitors, this is a legal hole. Coordinate with the Salesforce-side endpoint owner before the production GA goes live. See [`gdpr-consent.md`](gdpr-consent.md) "Lead form not consent-gated."

### 5. SEO metadata port from revealbi.io

Passes 1–3 of the SEO porting work are already shipped (BaseLayout meta tags, per-page `seo:` frontmatter overrides, JSON-LD for Organization/WebSite/Article/FAQPage). What's intentionally deferred is **Pass 4**: scraping each page's verbatim Yoast `<title>` / `<meta description>` / `og:type` from `www.revealbi.io` and writing them into the corresponding markdown's `seo:` block.

**Why it's a cutover-time task, not now:** staging is `noindex`, so Yoast title equity isn't being lost by waiting. Doing it post-deploy means Search Console signal can prioritize *which* pages actually need hand-tuning instead of porting all 50+ blindly.

**Highest-ROI fields:** `seo.title` (current Astro pattern produces awkward double-Reveal titles like `"About Reveal | Reveal"`) and `seo.ogType=article` for marketing pages.

Full plan + script outline: [`../seo/pass-4-content-port.md`](../seo/pass-4-content-port.md). Index of all four passes: [`../seo/README.md`](../seo/README.md).

---

## Cutover day

### 1. DNS

Point `www.revealbi.io` at the production CloudFront distribution. CloudFront's alternate domain names + ACM cert may need updating.

### 2. Promote staging → main

```bash
git checkout main
git pull
git merge --ff-only staging       # or open a PR for review
git push
```

The push triggers `.github/workflows/deploy.yml` (production branch) which:
- Copies `.env.production` → `.env`
- Builds (HTML allowlist validation → Astro build → pagefind)
- Syncs to the prod S3 bucket
- Invalidates the prod CloudFront distribution

The build picks up `PUBLIC_NOINDEX=0` from `.env.production`, so the prod site emits no `<meta name="robots">` and serves an `Allow: /` `robots.txt` with the sitemap link. The staging site at `astro-staging.revealbi.io` keeps its `noindex` because it builds against `.env.staging` (`PUBLIC_NOINDEX=1`).

### 3. Verify

```bash
curl -s https://www.revealbi.io/robots.txt
# Expected: User-agent: * / Allow: / / Sitemap: https://www.revealbi.io/sitemap-index.xml

curl -sI https://www.revealbi.io/ | grep -i strict-transport
# Expected: strict-transport-security header (from CloudFront response policy)

curl -s https://www.revealbi.io/ | grep 'name="robots"'
# Expected: nothing (noindex tag is gone)
```

### 4. Submit to Search Console

Add `www.revealbi.io` as a property, submit the sitemap, request re-index of the homepage. Existing `astro-staging.revealbi.io` stays noindexed and may eventually drop out of Google's index naturally (if it ever made it in).

### 5. Smoke test

See [`tracking-and-analytics.md`](tracking-and-analytics.md) Phase 5: GA4 Realtime, lead form submit, sitemap, robots.txt, reCAPTCHA token, `hreflang` tags.

---

## What does *not* require a cutover-day code edit

These all flip automatically through env vars:

| Concern | Mechanism |
|---|---|
| `noindex` meta tag | `PUBLIC_NOINDEX=0` in `.env.production` → `BaseLayout.astro` skips the tag |
| `robots.txt` body | same flag → `robots.txt.ts` emits `Allow: /` + sitemap |
| Site URL (canonicals, OG, sitemap) | `PUBLIC_SITE_URL=https://www.revealbi.io` in `.env.production` |
| Lead API host | `PUBLIC_LEAD_API_BASE` (or auto-router fallback when empty) |
| Analytics IDs | individual `PUBLIC_*_ID` vars in `.env.production` |
| Deploy env (which leadTracker host is "current") | `PUBLIC_DEPLOY_ENV=production` |

---

## Repo-name references that need a one-time find/replace (after the repo moves to enterprise)

These are unrelated to cutover but mentioned here for completeness — do them before the first push to the new enterprise repo:

| File | What to change |
|---|---|
| `public/admin/config.yml` line 3 | `repo: bsevestakiev/astro-reveal` → `repo: <enterprise-org>/<repo>` |
| `n8n/ja-translation.json` | 9 occurrences of `bsevestakiev/astro-reveal` |
| `docs/n8n/knowledgebase.md` ~line 126 | author-name reference (informational) |

n8n's GitHub PAT credential also needs updating to one with access to the new enterprise repo (and `repo:dispatch` permission).
