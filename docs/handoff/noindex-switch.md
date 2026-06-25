# noindex on astro-staging.revealbi.io

**Date:** 2026-05-05
**Scope:** Block search-engine indexing of the new astro build at `astro-staging.revealbi.io` while WP at `www.revealbi.io` remains the canonical prod site.

## Why

Two live hosts serve overlapping content. If both get indexed, Google sees duplicate pages and may demote `www.revealbi.io` (the host that actually drives leads). Until the cutover happens, the astro site needs to stay invisible to crawlers.

## What changed

Repo: `astro-reveal` (commit on `main`, auto-deployed by `.github/workflows/deploy.yml`).

1. **`src/layouts/BaseLayout.astro`** — added `<meta name="robots" content="noindex,nofollow" />` to the head. Every page on every layout inherits this, since `BlogLayout`, `LandingLayout`, and `WhitepaperLayout` all wrap `BaseLayout`.

2. **`src/pages/robots.txt.ts`** — flipped from `Allow: /` + sitemap link to `Disallow: /`. Sitemap line dropped (no point pointing crawlers at a map of pages we don't want crawled).

## Effect

- New crawl: Googlebot/Bingbot read `Disallow: /`, skip the page.
- Existing index entries: when Googlebot revisits, it sees `noindex,nofollow` and drops the page from results. Typically days, not weeks. Can be sped up by submitting a removal request in Google Search Console.

## How to revert

When astro-staging.revealbi.io is ready to replace WP:

1. Delete the `<meta name="robots">` line from `BaseLayout.astro`.
2. Restore `robots.txt.ts` to emit `Allow: /` + the sitemap URL (see git blame for the previous body).

~30 seconds, single commit.

## Open question

The current change is hardcoded — it noindexes regardless of build env. If we ever want to deploy the same code to a host that *should* be indexed (e.g. a future `www.revealbi.io` replacement), this needs to be env-gated off `PUBLIC_SITE_URL` or a dedicated `PUBLIC_NOINDEX` flag. Not worth wiring proactively; flip it when the cutover plan is real.
