# SEO porting — overview

Tracks the work to bring the Astro site's SEO surface to parity with `www.revealbi.io` (WordPress + Yoast SEO).

## Source-of-truth decisions

- **Metadata authority:** copy verbatim from revealbi.io for each existing page (title, description, og:type). Where the WP source is buggy (truncated descriptions, mismatched canonicals), fix during port — don't replicate the bug. See `pass-4-content-port.md`.
- **Per-page editing:** anything that lives in markdown frontmatter is editable in Sveltia *if and only if* it is also declared in `public/admin/config.yml`. Sitewide constants (twitter handle, og:site_name, theme-color, etc.) live in `BaseLayout.astro` and are not editor-facing unless we later add a Sveltia "site config" singleton.
- **Computed fields** (canonical URL, hreflang URLs, og:url, og:locale) are derived from `Astro.url` and the `lang` prop. Never edited.

## Where each tag lives

| Category | File | Tags |
|---|---|---|
| Sitewide constants | `src/layouts/BaseLayout.astro` | `og:site_name`, `twitter:site/creator`, `theme-color`, `application-name`, `facebook-domain-verification`, `author=Infragistics` |
| Per-page (props) | `src/layouts/BaseLayout.astro` props | `title`, `description`, `image`, `imageAlt`, `ogType`, `noindex`, `canonicalUrl` |
| Per-page (frontmatter) | `src/content/.../*.md` | (planned) `seo: { ogType, ogImage, noindex, canonical }` |
| Computed | `BaseLayout.astro` script block | `og:url`, `og:locale`, `og:locale:alternate`, hreflang alternates, canonical |
| Structured data | (planned) component | Organization, WebSite, FAQPage, Article |

## Passes

| Pass | Status | Doc |
|---|---|---|
| 1 — BaseLayout SEO tags | ✅ done 2026-05-07 | [pass-1-baselayout.md](pass-1-baselayout.md) |
| 2 — Schema + Sveltia mirror | ✅ done 2026-05-07 (pages collection) | [pass-2-schema-and-sveltia.md](pass-2-schema-and-sveltia.md) |
| 3 — JSON-LD structured data | ✅ done 2026-05-07 | [pass-3-jsonld.md](pass-3-jsonld.md) |
| 4 — Verbatim copy port from revealbi.io | ⏭️ deferred to pre-cutover | [pass-4-content-port.md](pass-4-content-port.md) |

## Validation snapshots

- [parity-vs-revealbi.md](parity-vs-revealbi.md) — 2026-05-07: side-by-side audit of `astro-staging.revealbi.io` vs `www.revealbi.io` after Passes 1–3 deployed. Confirmed sitewide identity layer matches or exceeds Yoast.

## Reference inventory of revealbi.io's SEO surface

What `www.revealbi.io` emits per page (sampled across 9 page types — homepage, embedded-analytics-software, pricing, blog, request-demo, features, ai, isv-analytics, about-us):

**Per-page (varies):** `title`, `description`, `canonical`, `robots`, `og:type` (`website` for home & /blog/, `article` elsewhere), `og:title/description/url/updated_time`, `og:image` set (×6 tags), `twitter:title/description/image`, `twitter:label1/data1` ("Time to read" or author).

**Sitewide:** charset, viewport, X-UA-Compatible, `author=Infragistics`, `application-name=Reveal`, `theme-color=#2d2a90`, `apple-mobile-web-app-*`, `facebook-domain-verification=i2o4p15ysejbr93xeaz7gqhxkgp5a6`, `og:locale=en_US`, `og:site_name=Reveal Embedded Analytics`, `twitter:site/creator=@reveal_bi`, `twitter:card=summary_large_image`.

**i18n:** WOVN.io plugin emits 6 hreflang alternates per page (en, ja, ko, pt-BR, es, x-default).

**Structured data:** Yoast emits a single `<script type="application/ld+json">` block containing an `@graph` array with `Organization`, `WebSite`, `ImageObject`, `WebPage` (cross-referenced via `@id`), plus a separate `FAQPage` block on pages that have an FAQ section. No `Article`, `BlogPosting`, or `BreadcrumbList`. (See `parity-vs-revealbi.md` for the corrected discovery — earlier inventory mistakenly read this as "FAQPage only.")

## Things NOT being ported

- WordPress oEmbed/REST link tags (don't apply on Astro)
- `meta[name=generator]` (not useful)
- WOVN.io scripts (Astro i18n handles localization)
- `twitter:label1/data1` "Time to read" (deprecated by Twitter/X)
- `meta[name=keywords]` (Google ignores it; revealbi.io doesn't emit it either)

## Bugs in revealbi.io's metadata to fix during port (not replicate)

- `/pricing/` — `description` truncated mid-sentence (`"…ensuring a strong return on investment. With no"`)
- `/pricing/` — canonical points to `/pricing/embedded-analytics` (canonical mismatch)
- `/about-us/` — canonical points to `/about-us-2` (WP slug-collision artefact)
- All pages share the same fallback `og:image` (the gradient logo) — improve with per-page covers where available
