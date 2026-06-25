# Pass 2 — content-schema SEO fields + Sveltia mirror

**Status:** ✅ done 2026-05-07 (pages collection only)
**Depends on:** Pass 1 (BaseLayout already accepts the props this pass populates)
**Build verified:** `npm run build` clean. Override behavior verified on `about-us` page (all four tested fields — `title`, `description`, `ogType`, `noindex` — applied to the rendered HTML and Twitter/OG mirrors), then reverted.

## Goal

Surface per-page SEO controls in markdown frontmatter so authors (including Sveltia editors) can override `ogType`, OG image, and `noindex` per page without touching code. Wire those overrides through the page route components (`[slug].astro`, `[...slug].astro`, etc.) into the `BaseLayout` props that Pass 1 added.

## Files changed

| File | Change |
|---|---|
| `src/content/config.ts` | Added `seoFieldsSchema`; added `seo: seoFieldsSchema.optional()` to `pageSchema`. Other schemas (blog, whitepaper, story, glossary, webinar) intentionally deferred — see "Out of scope" below. |
| `src/pages/index.astro` | Reads `entry.data.seo` and forwards to `BaseLayout` props. |
| `src/pages/[slug].astro` | Same. |
| `src/pages/[lang]/index.astro` | Same. |
| `src/pages/[lang]/[slug].astro` | Same. |
| `public/admin/config.yml` | Added `seo` object widget to the `&pages_fields` anchor. Non-EN collections (`pages_es/ja/ko/pt_br`) inherit the anchor automatically (read-only views). |

## Schema (as shipped)

```ts
// src/content/config.ts
const seoFieldsSchema = z.object({
  title: t(z.string()).optional(),
  description: t(z.string()).optional(),
  ogType: z.enum(['website', 'article']).optional(),
  ogImage: asset(z.string()).optional(),
  ogImageAlt: t(z.string()).optional(),
  noindex: z.boolean().optional(),
  canonical: z.string().url().optional(),
})

const pageSchema = z.object({
  title: t(z.string()),
  description: t(z.string()).optional(),
  cover: asset(z.string()).optional(),
  seo: seoFieldsSchema.optional(),
  sections: z.array(sectionSchemaInternal).optional(),
})
```

Why a nested `seo` object rather than top-level fields:
- Keeps content-author concerns (`title`, `description`, `cover` for hero/teaser usage) separate from SEO concerns (`seo.title` only affects `<title>`/og:title).
- Frontmatter stays clean — the `seo:` key signals intent to readers/editors.

## Wiring in route components (as shipped)

Two patterns depending on whether the route adds the `| Reveal` suffix:

```astro
<!-- src/pages/[slug].astro and src/pages/[lang]/[slug].astro -->
<BaseLayout
  title={seo?.title ?? `${page.data.title} | Reveal`}
  description={seo?.description ?? page.data.description}
  image={seo?.ogImage ?? page.data.cover}
  imageAlt={seo?.ogImageAlt}
  ogType={seo?.ogType}
  noindex={seo?.noindex}
  canonicalUrl={seo?.canonical}
>
```

```astro
<!-- src/pages/index.astro and src/pages/[lang]/index.astro (homepage; no suffix) -->
<BaseLayout
  title={seo?.title ?? title}
  description={seo?.description ?? description}
  image={seo?.ogImage ?? cover}
  imageAlt={seo?.ogImageAlt}
  ogType={seo?.ogType}
  noindex={seo?.noindex}
  canonicalUrl={seo?.canonical}
>
```

Setting `seo.title` bypasses the `| Reveal` suffix entirely — editors get full control over what shows up in `<title>`. Same for description: `seo.description` overrides both `<meta description>` *and* `og:description`/`twitter:description`, matching Yoast's behavior on revealbi.io.

## Sveltia mirror — `public/admin/config.yml` (as shipped)

Added to the EN page collection's fields anchor (`&pages_fields`), positioned between `cover` and `sections`:

```yaml
- name: seo
  label: 'SEO (overrides)'
  widget: object
  required: false
  collapsed: true
  fields:
    - { name: title,       label: 'SEO title (overrides <title> + og:title)',                   widget: string,  required: false }
    - { name: description, label: 'SEO description (overrides <meta description> + og:desc)',   widget: text,    required: false }
    - { name: ogType,      label: 'OG type',                                                    widget: select,  options: ['website', 'article'], required: false }
    - { name: ogImage,     label: 'OG image URL (1200×630, overrides cover for socials only)',  widget: string,  required: false }
    - { name: ogImageAlt,  label: 'OG image alt text',                                          widget: string,  required: false }
    - { name: noindex,     label: 'Block search engines from indexing this page',               widget: boolean, required: false }
    - { name: canonical,   label: 'Canonical URL (rare; absolute https URL)',                   widget: string,  required: false }
```

The non-EN collections (`pages_es`, `pages_ja`, `pages_ko`, `pages_pt_br`) are read-only and reuse the same `*pages_fields` reference — they automatically pick up the new block.

`collapsed: true` means the SEO group renders folded by default in the editor — keeps the form clean for editors who don't need to override anything.

## Validation performed

1. ✅ `npm run build` clean (full 297-page build).
2. ✅ Pages with no `seo:` block render identically to before (no diff in unrelated dist files).
3. ✅ Override behavior verified end-to-end:
   - Added `seo: { title, description, ogType: article, noindex: true }` to `src/content/pages/en/about-us.md`.
   - Built; `dist/about-us/index.html` showed: `<title>` overridden, `meta[description]` overridden, `og:type=article`, `meta[robots]=noindex,nofollow`, `twitter:title` mirrored the SEO title.
   - Reverted the test edit.

## Out of scope (deferred to follow-up passes)

- **`blogSchema` / `whitepaperSchema` / `storySchema` / `glossarySchema` / `webinarSchema`** don't yet have `seo` blocks. Their respective layouts (`BlogLayout`, `WhitepaperLayout`) already handle `ogType="article"` automatically (set in Pass 1), so the most-impactful tag is already correct. Per-post `seo.title`/`seo.description`/`seo.noindex` overrides for blog/whitepaper land in a follow-up if needed.
- **Sveltia mirrors for the above** — same deferral.

## Open questions

- Whether to expose a `seo.twitterCard` field (`summary` vs `summary_large_image`). Probably not — `summary_large_image` is correct for ~all marketing content. Skip unless an editor asks.
- Adding `seoFieldsSchema` to the other collections is mostly mechanical — the only design decision is whether to share the same Zod schema or define a slightly leaner one (e.g. blog posts don't need `ogType` because BlogLayout always sets `article`). Current preference: share, override defaults at the route level.
