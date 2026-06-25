# Pass 3 — JSON-LD structured data

**Status:** ✅ done 2026-05-07
**Depends on:** Pass 1 (BaseLayout exists). Independent of Pass 2.
**Build verified:** `npm run build` clean. Spot-checked: homepage emits 3 blocks (Organization, WebSite, FAQPage with 7 items); a blog post emits 3 (Organization, WebSite, Article with all required fields); a whitepaper emits 3 (same shape as blog). All blocks parse as valid JSON; all FAQ answers are HTML-stripped (0 items contain `<` or `>`).

## Goal

Add Schema.org JSON-LD to enable richer Google/Bing search results (knowledge panel, FAQ rich results, article cards). revealbi.io currently emits **only** `FAQPage` on most marketing pages — this pass goes further with `Organization` + `WebSite` sitewide and `Article` on blog/whitepaper.

## Files changed

| File | Change |
|---|---|
| `src/components/seo/JsonLd.astro` | New helper component — wraps a JSON-LD object in a `<script type="application/ld+json">` tag and escapes `<` so any `</script>` or `<!--` sequences inside string values can't break out. |
| `src/lib/seo.ts` | New module — exports `stripHtml()` plus `ORGANIZATION_LD`, `WEBSITE_LD`, `ARTICLE_PUBLISHER_LD` (single source of truth for the org identity). |
| `src/layouts/BaseLayout.astro` | Imports `JsonLd` + sitewide schemas; emits `Organization` + `WebSite` blocks in head; adds `<slot name="jsonld" />` so layouts can inject page-specific schemas. |
| `src/layouts/BlogLayout.astro` | Builds an `Article` schema from the existing post data (headline, description, image, datePublished, dateModified, author with absolute URL, publisher with `ImageObject` logo, `mainEntityOfPage`); slots it into BaseLayout. |
| `src/layouts/WhitepaperLayout.astro` | Same `Article` schema pattern; uses `cover` for the image and `permalink ?? Astro.url.pathname` for `mainEntityOfPage`. |
| `src/components/sections/FAQ.astro` | Switched the existing JSON-LD emit to use `JsonLd` (escapes `<`); fixed Google-spec violation by `stripHtml()`-ing question/answer before serialization. |

## Schemas to emit

### Sitewide (every page)

**`Organization`** — feeds Google's knowledge panel. Logo, social profiles, contact.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Reveal Embedded Analytics",
  "url": "https://www.revealbi.io",
  "logo": "https://www.revealbi.io/wp-content/uploads/2020/10/reveal-logo-gradient-1200x630-1.jpg",
  "sameAs": [
    "https://twitter.com/reveal_bi",
    "https://www.linkedin.com/showcase/revealbi/",
    "https://www.youtube.com/@revealembeddedanalytics",
    "https://github.com/RevealBi"
  ]
}
```

(Verify the actual social URLs before shipping — placeholders here.)

**`WebSite`** — gives Google the site name + optional sitelinks searchbox.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Reveal Embedded Analytics",
  "url": "https://www.revealbi.io",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.revealbi.io/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

The `SearchAction` part is optional and only useful if `/search` is robust enough to handle Google's deep-link traffic. Pagefind currently powers `/search`; revisit this once it's stable.

### Conditional (when applicable)

**`FAQPage`** — auto-emit whenever a page contains an `faq` section.

The `faqSchema` (`src/content/config.ts:184`) already has `items: [{ question, answer }]` — trivially mappable:

```ts
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": items.map((item, i) => ({
    "@type": "Question",
    "position": i + 1,
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": stripHtml(item.answer) }
  }))
}
```

**`Article`** — for `BlogLayout` and `WhitepaperLayout`. Fields available in `blogSchema`: `title`, `description`, `date`, `author`, `cover`/`heroImage`.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "description": "...",
  "datePublished": "2026-...",
  "dateModified": "2026-...",
  "author": { "@type": "Person", "name": "..." },
  "image": "...",
  "publisher": {
    "@type": "Organization",
    "name": "Reveal Embedded Analytics",
    "logo": { "@type": "ImageObject", "url": "..." }
  }
}
```

**`BreadcrumbList`** — for nested routes that already render breadcrumbs (most marketing pages have them via `dark-hero` section's `breadcrumbs` array, e.g. `src/components/sections/DarkHero.astro`).

## Implementation pattern

A single `src/components/seo/JsonLd.astro` component that takes a `data` prop and renders `<script type="application/ld+json">`. Layouts compose multiple instances:

```astro
---
// src/components/seo/JsonLd.astro
const { data } = Astro.props
---
<script type="application/ld+json" set:html={JSON.stringify(data)} />
```

In `BaseLayout.astro` (after the existing meta block), emit the sitewide pair via slot or directly:

```astro
<JsonLd data={organizationLd} />
<JsonLd data={websiteLd} />
<slot name="jsonld" />   {/* layouts/pages can add Article, FAQPage, BreadcrumbList */}
```

Page-specific schemas would slot in:

```astro
<BaseLayout title={...}>
  <JsonLd slot="jsonld" data={articleLd} />
  <JsonLd slot="jsonld" data={faqLd} />
  ...
</BaseLayout>
```

Or — cleaner — derive FAQPage automatically inside `SectionRenderer.astro` when it encounters an `faq` section. Authors get rich results for free without touching anything.

## Validation performed

1. ✅ `npm run build` clean.
2. ✅ Homepage (`dist/index.html`): 3 JSON-LD blocks — `Organization`, `WebSite`, `FAQPage` (7 items, all answer text plain — no `<` / `>` left).
3. ✅ Blog post (`dist/blog/<slug>/index.html`): 3 blocks — `Organization`, `WebSite`, `Article` with full publisher/author/image/date fields. `author.url` is absolute (`https://www.revealbi.io/author/<slug>`).
4. ✅ Whitepaper (`dist/whitepapers/<slug>/index.html`): same 3-block shape.
5. ✅ All blocks parse as valid JSON via `python3 -c "json.loads(...)"`.

## Recommended follow-up validation (manual, post-deploy)

- Run a sample of pages through Google's Rich Results Test: `https://search.google.com/test/rich-results`.
- Check Google Search Console → Enhancements once the site is live and indexed.

## Out of scope (deferred)

- **`BreadcrumbList`** — most marketing pages already render breadcrumbs via the `dark-hero` section (`src/components/sections/DarkHero.astro` reads `breadcrumbs[]` from the `seo` schema). Could derive a `BreadcrumbList` schema from that array. Skipped for now because the value is marginal vs. the work of threading current-page context through every section.
- **Sitelinks Searchbox** in `WebSite` schema — Reveal's `/search` is currently Pagefind-only (client-side). Google requires a server-rendered URL pattern (`/search?q={search_term_string}`) that returns results. Wiring this is a separate workstream.
- **`Person` schema for authors** — currently inlined as `Person` inside Article. A dedicated `Person` block per author profile page would be richer but requires building author landing pages. Defer.

## Open questions

- **Logo dimensions for `Organization`:** Google recommends ≥112×112; we currently point to the 1200×630 OG default. Probably fine — Google accepts wider logos — but a dedicated square asset would be cleaner.
- **`Article` vs `BlogPosting` vs `TechArticle`:** all three are valid for blog content. `Article` is the safest umbrella; `BlogPosting` would be more semantically correct for blog posts and `TechArticle` for technical content. No SEO impact difference in practice. Stick with `Article`.
