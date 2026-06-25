# Reveal Marketing Site — Copilot Context

## What this repo is
An Astro 5 marketing site for [Reveal embedded analytics](https://www.revealbi.io).
Pages live in `src/content/pages/en/*.md` as YAML frontmatter with a `sections:` array.
Each section maps to an Astro component via `src/components/SectionRenderer.astro`.

## How a page is built
1. A `.md` file in `src/content/pages/en/` defines `title`, `description`, `seo`, and `sections`.
2. `sections` is a typed discriminated union — each entry has a `type:` field that maps to a specific schema.
3. All section types and their fields are defined in `src/content/config.ts`.
4. `SectionRenderer.astro` switches on `type` and renders the matching component from `src/components/sections/`.

## Section types (exhaustive list — read config.ts for fields)
`hero` · `dark-hero` · `pricing-hero` · `logo-slider` · `feature-row` · `icon-grid`
`comparison-table` · `feature-steps` · `ai-dark-section` · `fast-implementation`
`stats-band` · `pricing-teaser` · `reviews` · `customer-quote` · `faq` · `inline-cta`
`cta-block` · `section-header` · `lead-form` · `banner` · `features` · `team`
`video-split-hero` · `blog-teaser` · `ai-compare-list` · `story-teaser`
`competitor-matrix` · `feature-tabs` · `subnav` · `platform-process-card`
`dark-capabilities-grid` · `vertical-cards` · `feature-sticky-scroll`
`metric-benefit-grid` · `dual-checklist` · `light-feature-tabs` · `ai-video-block`
`ai-under-hood` · `ai-enterprise-grid` · `ai-step-flow` · `security-risk-table`
`security-arch-cards` · `security-gradient-banner` · `gradient-hero`
`chart-filter-grid` · `connector-grid`

## What you must NOT do unprompted
- Edit `.astro` component files
- Edit `src/content/config.ts`
- Edit `src/components/SectionRenderer.astro`
- Edit any file other than the target `.md` page
- Create new section types unless explicitly asked and no existing type fits

## HTML in frontmatter
Fields marked `tHtml` in config.ts accept inline HTML.
Fields marked `t` expect plain text — no HTML tags.
The `slotContent` field on `feature-row` always accepts HTML.
Use inline HTML only when needed (bold, links, line breaks) — prefer plain text otherwise.

## Image URLs
All production images are served from `https://static.infragistics.com/marketing/reveal/`.
Do not reference relative paths or placeholder images.
