# Pass 1 — BaseLayout SEO tags

**Date:** 2026-05-07
**Status:** ✅ done
**Build verified:** `npm run build` clean; tags spot-checked in `dist/index.html`, `dist/blog/angular-dashboard-library/index.html`, `dist/es/index.html`.

## Goal

Bring the Astro site's `<head>` SEO surface to parity with `www.revealbi.io` for everything that doesn't require content-schema changes. No per-page markdown edits, no JSON-LD, no Sveltia changes — that comes in later passes.

## Files changed

| File | Change |
|---|---|
| `src/layouts/BaseLayout.astro` | Frontmatter: 4 new optional props (`imageAlt`, `ogType`, `noindex`, kept existing `image`/`canonicalUrl`/`lang`); computed values for absolute OG image URL, OG image type (extension-derived), hreflang neutral path, og:locale + alternates, robots logic. Head: added X-UA-Compatible, branding meta block, facebook-domain-verification, full-form robots tag (Yoast-style), 6 hreflang alternates, og:locale + og:locale:alternate, og:site_name, og:image:secure_url/alt/type/width/height, twitter:site/creator/image:alt. |
| `src/layouts/BlogLayout.astro:75` | Pass `ogType="article"` to BaseLayout. |
| `src/layouts/WhitepaperLayout.astro:51` | Pass `ogType="article"` to BaseLayout. |

`LandingLayout.astro` already spreads props through unchanged, so no edit needed.

## New `BaseLayout` props

```ts
interface Props {
  title: string
  description?: string
  image?: string         // existing — defaults to /images/og-default.jpg
  imageAlt?: string      // NEW — defaults to "Reveal BI logo"
  canonicalUrl?: string  // existing
  lang?: string          // existing
  ogType?: 'website' | 'article'  // NEW — defaults to 'website'
  noindex?: boolean      // NEW — per-page override; env NOINDEX still wins
}
```

## Tags now emitted on every page

### Sitewide constants (hardcoded in `BaseLayout.astro`)

```
<meta name="author" content="Infragistics" />
<meta name="application-name" content="Reveal" />
<meta name="apple-mobile-web-app-title" content="Reveal" />
<meta name="theme-color" content="#2d2a90" />
<meta name="msapplication-navbutton-color" content="#2d2a90" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="msapplication-starturl" content="/" />
<meta name="facebook-domain-verification" content="i2o4p15ysejbr93xeaz7gqhxkgp5a6" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta property="og:site_name" content="Reveal Embedded Analytics" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@reveal_bi" />
<meta name="twitter:creator" content="@reveal_bi" />
```

### Computed (from `Astro.url` and `lang`)

```
<link rel="canonical" href="..." />
<link rel="alternate" hreflang="en" href="https://.../..." />
<link rel="alternate" hreflang="es" href="https://.../es/..." />
<link rel="alternate" hreflang="ja" href="https://.../ja/..." />
<link rel="alternate" hreflang="ko" href="https://.../ko/..." />
<link rel="alternate" hreflang="pt-BR" href="https://.../pt-BR/..." />
<link rel="alternate" hreflang="x-default" href="https://.../..." />
<meta property="og:locale" content="en_US|es_ES|ja_JP|ko_KR|pt_BR" />
<meta property="og:locale:alternate" content="..." /> × 4
<meta property="og:url" content="..." />
```

Locale-prefix logic mirrors `astro.config.mjs` (`prefixDefaultLocale: false`): `en` paths have no prefix, others use `/{locale}/...`. The neutral path is computed by stripping any current locale prefix.

### Per-page (driven by props with sensible defaults)

```
<title>{title}</title>
<meta name="description" content={description} />
<meta name="robots" content={env-NOINDEX || pageNoindex ? "noindex,nofollow" : "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"} />

<meta property="og:type" content={ogType} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={absolute(image)} />
<meta property="og:image:secure_url" content={absolute(image)} />
<meta property="og:image:alt" content={imageAlt} />
<meta property="og:image:type" content={derived: image/jpeg|png|webp|gif} />
<meta property="og:image:width" content="1200" />   <!-- only when image == default -->
<meta property="og:image:height" content="630" />   <!-- only when image == default -->

<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={absolute(image)} />
<meta name="twitter:image:alt" content={imageAlt} />
```

## Notable behaviors

- **Robots precedence:** env `PUBLIC_NOINDEX` (in `src/lib/env.ts`) wins; per-page `noindex` prop is the secondary lever. Default robots tag is the long-form Yoast string (`follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large`).
- **og:image dimensions** are only emitted when the page is using the default `/images/og-default.jpg` (where we know it's 1200×630). For per-page covers, `og:image:width/height` are omitted — Facebook/LinkedIn fetch and figure it out. When per-page-cover dimensions become metadata, we can add `imageWidth`/`imageHeight` props.
- **og:image:type** is derived from the file extension (`jpeg`/`png`/`webp`/`gif`), so a blog post with a PNG cover automatically reports `image/png`.
- **`og:image` and `twitter:image` are always absolute URLs** (required by Facebook/LinkedIn/X) — relative paths get the `Astro.site` origin prepended.

## Verify

```bash
npm run build

# Homepage — should show og:type=website, og:image:width/height=1200/630, full hreflang block
grep -oE '<meta (name|property)="(og:|twitter:|robots|description)[^"]*" content="[^"]*"' dist/index.html

# Blog post — should show og:type=article, og:image:type matching the cover extension, no width/height
grep -oE '<meta (name|property)="(og:type|og:image:type|og:image:width)" content="[^"]*"' dist/blog/<slug>/index.html

# Non-EN page — hreflang alternates should re-target each locale prefix correctly
grep -oE '<link rel="alternate" hreflang="[^"]+" href="[^"]+"' dist/es/index.html
```

## Intentionally NOT done in this pass

- Per-page metadata frontmatter overrides (Pass 2)
- Sveltia controls for those overrides (Pass 2)
- JSON-LD: Organization, WebSite, FAQPage, Article (Pass 3)
- Verbatim title/description scrape from revealbi.io into each markdown file (Pass 4)

## Open questions

- **OG image strategy:** every page currently shares the gradient-logo fallback (matches revealbi.io). Should each marketing page get a custom 1200×630 social card? Either generate at build time from headline (e.g. `@vercel/og` or `astro-og-canvas`) or hand-design a few. Defer until Pass 4 when per-page metadata is being authored.
- **Sitelinks Searchbox JSON-LD:** worth wiring once the Pagefind search UI is mature enough that Google can deep-link into it. Not now.
