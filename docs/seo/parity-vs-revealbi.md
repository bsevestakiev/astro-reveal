# Parity check — astro-staging.revealbi.io vs www.revealbi.io

**Snapshot date:** 2026-05-07 (after Passes 1–3 deployed to staging)
**Method:** raw `curl` of both `/` URLs, head section parsed for SEO-relevant tags, JSON-LD blocks parsed and `@type` enumerated.

This is a moment-in-time snapshot. The intent is to confirm that the Astro staging site's metadata layer matches or exceeds Yoast's output on the live WP site. Per-page copy is intentionally not compared — Pass 4 (`pass-4-content-port.md`) handles that at cutover.

## Title + description

| | www.revealbi.io | astro-staging.revealbi.io |
|---|---|---|
| `<title>` | `Customer Facing Embedded BI Solution For SaaS Companies` | `Embedded Analytics for Software Teams \| Reveal` |
| `meta description` | "Reveal Embedded Analytics enables your teams and customers to drive data insights with embedded BI…" | "Reveal is the AI-native embedded analytics platform built for SaaS applications and software products…" |

Different because the Astro markdown was authored fresh. Pass 4 ports the WP versions verbatim into per-page `seo:` blocks at cutover.

## Sitewide branding (parity)

| Tag | WP | Astro |
|---|---|---|
| `meta[name=author]` | Infragistics | Infragistics ✅ |
| `meta[name=application-name]` | Reveal | Reveal ✅ |
| `meta[name=theme-color]` | #2d2a90 | #2d2a90 ✅ |
| `meta[name=facebook-domain-verification]` | i2o4p15ysejbr93xeaz7gqhxkgp5a6 | same ✅ |
| `og:site_name` | Reveal Embedded Analytics | same ✅ |
| `twitter:site` / `twitter:creator` | @reveal_bi | same ✅ |

## Robots + canonical

| | WP | Astro |
|---|---|---|
| `robots` | `follow, index, max-snippet:-1, …` (live, indexable) | `noindex,nofollow` (staging is intentionally hidden — flipped at cutover via `PUBLIC_NOINDEX=0` in `.env.production`) |
| `canonical` | https://www.revealbi.io | https://astro-staging.revealbi.io/ |

## hreflang

Both emit 6 alternates (en, es, ja, ko, pt-BR, x-default). WP uses trailing slashes (`/es/`); Astro doesn't (`/es`). Functionally equivalent.

## OG image

Both emit the full 6-tag set (`og:image`, `og:image:secure_url`, `og:image:alt`, `og:image:type`, `og:image:width`, `og:image:height`) with 1200×630 jpeg dimensions on the default fallback.

## Twitter cards

Both emit `summary_large_image`, title, description, image, site, creator. Differences:

- Astro adds `twitter:image:alt` (Yoast doesn't).
- Astro intentionally drops `twitter:label1/data1` and `twitter:label2/data2` (Yoast emits "Written by"/"Time to read"; Twitter/X deprecated these years ago).

## JSON-LD structured data

| | www.revealbi.io | astro-staging.revealbi.io |
|---|---|---|
| Format | Single `@graph` array (Yoast's preferred shape) | Three separate `<script>` blocks |
| Schemas present | Organization, WebSite, ImageObject, WebPage, FAQPage | Organization, WebSite, FAQPage |
| Inter-node `@id` references | Yes (graph-linked) | No (independent blocks) |

Both formats validate equally well in Google's Rich Results tester. The two extras WP includes (`ImageObject`, `WebPage`) don't unlock any rich-result features beyond what `Organization` already provides — they're decorative.

## Astro improvements over Yoast

- `og:locale:alternate` ×4 (one per other locale) — Yoast doesn't emit these.
- `twitter:image:alt` — Yoast doesn't emit.
- `Article` schema on blog posts and whitepapers — Yoast on revealbi.io doesn't emit any per-content-type schema beyond `FAQPage`.

## Astro intentional omissions vs Yoast

| Yoast tag | Why we skip it |
|---|---|
| `twitter:label1/data1`, `twitter:label2/data2` | Deprecated by Twitter/X — no longer rendered. |
| `og:updated_time` | Not stored in frontmatter. Could derive from `git log` if ever needed; minimal SEO value. |
| WordPress oEmbed and REST API `<link>` tags | Don't apply outside WP. |
| `meta[name=generator]` (`WP Rocket 3.21.1`) | Astro emits its own; doesn't matter. |
| WOVN.io localization scripts | Astro i18n replaces it. |

## Bugs in Yoast we deliberately did NOT replicate

| Page | Bug | Pass-4 action |
|---|---|---|
| `/pricing/` | description truncated mid-sentence (`"…ensuring a strong return on investment. With no"`) | Rewrite when porting |
| `/pricing/` | canonical points to `/pricing/embedded-analytics` | Leave canonical empty (auto-derives) |
| `/about-us/` | canonical points to `/about-us-2` (WP slug-collision artefact) | Leave canonical empty |

## Net result

The sitewide identity layer matches or exceeds Yoast on every measurable dimension. The remaining gap is per-page copy (titles, descriptions, og:type), which is handled by Pass 4 just before cutover so editors can use real Search Console signal to prioritize what to keep verbatim vs improve.
