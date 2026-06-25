# RevealBI → Astro Migration Plan

## Directory Structure Assumptions

```
/mnt/d/reveal/
  downloaded/        ← wget output (www.revealbi.io/)
  boilerplate/       ← Astro boilerplate template
  PLAN.md            ← this file
```

---

## Phase 1 — Analyze the Downloaded Site

**Goal:** Understand the site structure before writing any code.

### Steps
1. List all unique page templates by sampling:
   - Homepage (`index.html`)
   - A blog post
   - A glossary entry
   - A whitepaper page
   - A webinar page
   - A story page
   - A category page
2. Identify **repeated components** across pages:
   - Header / Nav (desktop + mobile)
   - Footer
   - Hero sections
   - CTA blocks
   - Cards (blog, glossary, whitepaper, etc.)
   - Forms (if any)
3. Catalog all **CSS files** — determine if it's a theme, custom CSS, or utility framework (Tailwind, Bootstrap, etc.)
4. Catalog all **JS files** — identify what interactivity exists (menus, sliders, modals, etc.)
5. Note all **font sources** (Google Fonts, self-hosted, etc.)

**Token tip:** Sample 1 file per page type — do NOT read all 260 files.

---

## Phase 2 — Set Up Astro Foundation

**Goal:** Configure the boilerplate to match the site's needs.

### Steps
1. Review the boilerplate structure (read key config files only)
2. Configure `astro.config.mjs`:
   - Enable i18n routing (`/en/`, `/es/`, etc.)
   - Set `en` as default locale
   - Configure Content Collections
3. Set up global CSS:
   - Copy downloaded CSS into `src/styles/`
   - Or port to Tailwind if boilerplate uses it
4. Copy all assets:
   - Images from `wp-content/uploads/` → `src/assets/images/` (Astro will convert to WebP at build via `<Image />`)
   - Fonts → `public/fonts/`
   - Favicons / PWA icons → `public/icons/`
5. Set up `src/content/config.ts` — define collections:
   - `pages`
   - `blog`
   - `glossary`
   - `whitepapers`
   - `webinars`
   - `stories`

---

## Phase 3 — Build Astro Components

**Goal:** Recreate all reusable UI components from the downloaded HTML.

### Order of work (one component per focused prompt)
1. `BaseLayout.astro` — `<head>`, fonts, global CSS
2. `Header.astro` — nav, logo, mobile menu
3. `Footer.astro`
4. `Hero.astro` — main hero section variants
5. `CTABlock.astro` — call-to-action sections
6. `Card.astro` — blog/glossary/whitepaper cards
7. Any other repeated patterns found in Phase 1

**Token tip:** For each component, read only the relevant HTML snippet from the downloaded site — not the full page.

---

## Phase 4 — Build Page Templates

**Goal:** Create Astro page layouts for each content type.

### Pages to create
1. `src/pages/[lang]/index.astro` — Homepage
2. `src/pages/[lang]/blog/[slug].astro` — Blog post
3. `src/pages/[lang]/blog/index.astro` — Blog listing
4. `src/pages/[lang]/glossary/[slug].astro` — Glossary entry
5. `src/pages/[lang]/glossary/index.astro` — Glossary listing
6. `src/pages/[lang]/whitepapers/[slug].astro` — Whitepaper
7. `src/pages/[lang]/webinars/[slug].astro` — Webinar
8. `src/pages/[lang]/stories/[slug].astro` — Story
9. `src/pages/[lang]/[slug].astro` — Generic pages (About, Pricing, etc.)

---

## Phase 5 — Extract English Content to Markdown

**Goal:** Convert all downloaded HTML pages into `.md` files under `src/content/en/`.

### Structure
```
src/content/
  en/
    pages/
      about.md
      pricing.md
      ...
    blog/
      post-slug.md
      ...
    glossary/
      term-slug.md
      ...
    whitepapers/
      title-slug.md
      ...
    webinars/
      title-slug.md
      ...
    stories/
      title-slug.md
      ...
```

### Frontmatter schema (per content type)
```yaml
---
title: "Page Title"
description: "Meta description"
date: "2025-01-01"        # for posts
cover: "/images/foo.jpg"  # if applicable
---
```

**Token tip:** Extract content in batches by type — all glossary entries in one session, all blog posts in another.

---

## Phase 6 — Rebuild Marketing Pages (Section Components)

**Goal:** Exact visual replica of the homepage and all marketing/landing pages, with content editable via props/frontmatter.

### Why this is needed
The homepage and ~54 generic pages (features, pricing, industry pages, vs-competitor, etc.) have multi-section layouts — logo sliders, alternating feature rows, stats bands, etc. These cannot be represented in flat markdown. The right approach is:
1. One Astro component per distinct section type
2. Pages compose those components with content as props
3. Text content lives in the `.astro` file or a structured frontmatter file — fully editable

### Pre-session checklist (do this BEFORE starting the session)

**1. Download the homepage completely from Chrome**
- Open `https://www.revealbi.io` in Chrome (disable cache in DevTools)
- File → Save Page As → **Webpage, Complete** → save to `www.revealbi.io/homepage-complete/`
- This captures the fully-rendered DOM, computed CSS, and all CDN images (including `static.infragistics.com` hero images that wget missed)

**2. Download the CDN images separately**
Open DevTools → Network → filter by `Img` → note all URLs from `static.infragistics.com/marketing/reveal/`. Run:
```bash
wget -P public/images/cdn/ -i cdn-images.txt   # one URL per line
```
Or just copy the `homepage-complete/` folder's image assets into `public/images/`.

**3. Identify which pages share which sections**
The homepage sections also appear on other pages. Before the session, skim these pages on the live site and note which sections recur:
- `/features`, `/ai`, `/embedded-analytics` — likely share feature-row and stats sections
- Industry pages (`/banking-analytics`, `/healthcare-analytics`, etc.) — likely share a common template with hero + feature rows + CTA
- `/pricing` — unique section (pricing table)
- `/vs-*` competitor pages — likely share a comparison template

### Homepage sections to build (from Phase 1 analysis)

| # | Section | Key classes / notes |
|---|---|---|
| 1 | **Hero** | Already exists as `Hero.astro` — verify it matches exactly |
| 2 | **Logo slider** | `tiny-slider` carousel, client logos, "TRUSTED BY..." label |
| 3 | **Feature row (light)** | "Loved by Users. Engineered for Control." — alternating image+text cols |
| 4 | **Feature row (dark navy)** | "Instant Answers. Dashboard-Grade Depth." — same layout, dark bg |
| 5 | **Feature row (light)** | "Governance First Architecture" |
| 6 | **Stats band** | "Numbers Don't Lie" — full-width, 4 stat tiles |
| 7 | **Pricing teaser** | "Fixed Pricing. No Surprises." — pricing cards or summary |
| 8 | **Footer CTA** | Already exists as `CTABlock.astro` — verify |

### Order of work

1. ~~Read the saved `homepage-complete/` HTML — extract each section's exact HTML~~ ✅ Done (Session 6)
2. ~~Build section components~~ ✅ Done (Session 6): `FeatureRow`, `LogoSlider`, `IconGrid`, `AIDarkSection`, `FastImplementation`, `StatsBand`, `PricingTeaser`, `Reviews`, `FAQ`, `InlineCTA`
3. ~~Wire up `src/pages/index.astro`~~ ✅ Done (Session 8): dispatcher pattern, content in `homepage.md`
4. **Next:** Download 5 representative pages from live site and build remaining marketing pages:
   - `features` → canonical product-page template
   - `banking-analytics` → shared industry template (apply to ~15 industry pages)
   - `reveal-vs-power-bi` → shared competitor template (apply to ~14 vs-* pages)
   - `ai` → unique layout
   - `pricing` / `embedded-analytics` → unique layout
5. For each page: extract sections from downloaded HTML → populate `src/content/pages/en/<slug>.md` → verify via dispatcher

### Content strategy for marketing pages

**All content lives in structured YAML frontmatter** — no content hardcoded in `.astro` files.

Each page gets a file at `src/content/pages/en/<slug>.md`:
```yaml
---
title: "Banking Analytics | Reveal"
description: "..."
sections:
  - type: hero
    headline: "Embedded Analytics for Banking"
    image: "/images/homepage/banking-hero-480.webp"
    ...
  - type: feature-row
    headline: "Real-Time Risk Dashboards"
    slotContent: |
      <p>...</p>
  - type: stats-band
    stats:
      - { value: "500+", label: "Banks using Reveal" }
  - type: inline-cta
    headline: "Ready to start?"
    ctaLabel: "Book a Demo"
---
```

`src/pages/[slug].astro` (or a dedicated marketing dispatcher) reads the `sections[]` array and renders components — identical to how `index.astro` works after Session 8.

**Translatable keys** (for n8n): `title`, `description`, `headline`, `subhead`, `body`, `slotContent`, `question`, `answer`, `label`, `footnote`, `quote`, `eyebrow`
**Non-translatable** (leave untouched): `type`, `image`, `imageSrcset`, `src`, `href`, `variant`, `bgClass`, `reversed`, `open`

---

## Phase 7 — Search (Pagefind)

**Goal:** Add static, multilingual search.

### Steps
1. Install Pagefind: `npm install pagefind`
2. Update build script in `package.json`:
   ```json
   "build": "astro build && pagefind --site dist"
   ```
3. Create `SearchBar.astro` component using Pagefind UI
4. Add to Header or dedicated search page
5. Pagefind auto-indexes per language — no extra config needed

---

## Phase 8 — n8n Translation Workflow

**Goal:** Auto-translate `/en/` content into other locales.

### n8n workflow design
```
Trigger (file change or manual)
  → Read MD file from src/content/en/[type]/[slug].md
  → Extract frontmatter + body separately
  → Translate body (preserve markdown syntax)
  → Translate frontmatter fields (title, description)
  → Write to src/content/[locale]/[type]/[slug].md
```

### Important notes for n8n
- Translate **body and frontmatter separately** — don't feed raw MD as one blob
- Instruct the LLM to **preserve all markdown syntax** (headings, bold, links, code blocks)
- Preserve frontmatter keys — only translate values
- Preserve image paths and URLs — do not translate these

---

## Session Guide

Run each phase in a **separate Claude Code session** to manage context:

| Session | Phase | Input needed |
|---------|-------|--------------|
| 1 | Analyze site | Path to `downloaded/` dir |
| 2 | Astro foundation + components | Path to `boilerplate/` dir |
| 3 | Page templates | Output from sessions 1 & 2 |
| 4 | Content extraction to MD | Path to `downloaded/` dir |
| 5 | Search + n8n notes | Running Astro project |

---

## Key Constraints

- **Never read all 260 HTML files in one session** — always sample by type
- **One component or page template per focused prompt**
- **Assets go to `public/`** — reference by absolute path in MD frontmatter
- **English is the source of truth** — all other languages are derived by n8n

---

## Changelog

At the **end of every session**, append an entry here before closing. Keep it brief.

### Format
```
### Session N — YYYY-MM-DD
**Phase:** X — Phase Name
**Completed:**
- bullet of what was done

**Files created/modified:**
- path/to/file.astro
- path/to/file.md

**Decisions made:**
- Any non-obvious choices (e.g. "used Tailwind instead of raw CSS because boilerplate included it")

**Left for next session:**
- What's next / any blockers
```

---

### Session 0 — 2026-04-27
**Phase:** Pre-work
**Completed:**
- Downloaded revealbi.io via wget (260 pages, ~200-500MB)
- Identified sitemap structure: posts, pages, glossary, whitepapers, webinars, stories, categories
- Defined migration architecture: Astro + MD content + n8n translation + Pagefind search
- Created this plan

**Left for next session:**
- Confirm download is complete and directory paths
- Set up Astro boilerplate
- Begin Phase 1 (site analysis)

---

### Session 1 — 2026-04-27
**Phase:** 1 — Analyze the Downloaded Site

**Completed:**
- Sampled one file per page type (homepage, blog post, blog listing, glossary entry, whitepaper, webinar, story)
- Catalogued all CSS, JS, and font dependencies
- Identified all repeated components and their structure

---

#### Page Templates Identified

| Template | Example file | Notes |
|---|---|---|
| Homepage | `index.html` | Split-col hero (text + product image), decorative gradient circles, logo slider, multiple feature sections, dark CTA band, testimonials/quotes, FAQ, gradient footer CTA |
| Blog post | `blog/ai-powered-analytics.html` | Dark gradient header (breadcrumb, h1, author, date, read time); 2-col: sticky sidebar (TOC + CTA card + ShareThis) + main content |
| Blog listing | `blog.html` | Gradient header strip (h1, subtitle); 2-col: article list (image, h3, author/date, excerpt) + sidebar (categories, pagination) |
| Glossary entry | `glossary/business-intelligence.html` | Simple `<header class="container">` with breadcrumb + h1; full-width content; inline CTA buttons |
| Whitepaper | `whitepapers/bi-deployment-guide.html` | Dark gradient header (h1 + cover image); content summary; gated lead-capture form section |
| Webinar | `webinars/designing-embedded-analytics-your-users-actually-use.html` | Dark gradient header (title, date/time, duration); 2-col: description left + registration form right; past webinars → YouTube |
| Story / Case study | `stories/atanasoft.html` | Dark gradient header (customer logo, h1, hero image); 2-col: content left (8) + aside right (4) with key-facts list-group card |

---

#### Repeated Components

| Component | Location/notes |
|---|---|
| **Nav / Header** | Max Mega Menu plugin; sticky; light background (`#ebebf5`); logo left; top-level: Product, Solutions, Resources, Help, Pricing; CTA "BOOK A PERSONALIZED DEMO" (modal trigger `ig-show-modal`); language switcher; desktop inline search |
| **Footer** | Two-part: (1) `bg-gradient--primary` strip with social icons (Facebook, X, LinkedIn, YouTube, G2) + SVG wave; (2) 4-col link grid (Platforms, Company, Resources, Compare) + copyright/legal |
| **Page Hero (dark)** | Used on all content pages — dark navy/gradient, breadcrumb, h1, metadata. Multiple layout variants (2-col with image, centered, or with form) |
| **Blog/listing card** | `item-article card rounded-xl`: feature image top, h3 title, author/date, excerpt, "Read more" arrow link |
| **Story card** | Image, title, "Read Story" + blue arrow SVG link |
| **Sidebar CTA card** | "See Reveal in Action" — demo CTA + illustration; appears in blog sidebar |
| **Key-facts aside** | Story pages: right col `<aside>` with Bootstrap list-group (Industry, Markets, Challenges, Why Reveal) |
| **Gated form** | Lead capture: email + first name; custom JS validation via `sf.common.js` + `leadTracker.js`; used on whitepapers and webinar registration |
| **Table of Contents** | Blog sidebar: sticky `<ul id="sidebar-blog">` with anchor links |
| **SVG wave divider** | Used at footer transition and between dark/light sections |
| **Inline CTAs** | `btn btn-primary` + `btn btn-white-play` (play button variant); modal triggers for demo form |
| **Breadcrumbs** | Rank Math plugin: `<nav class="rank-math-breadcrumb">` |
| **Logo slider** | `tiny-slider` carousel: client/partner logos, on homepage below hero |
| **Testimonials/quotes** | Dark navy section with quote text + author photo; carousel |
| **ShareThis** | Inline share buttons in blog sidebar |

---

#### CSS

| File | Purpose |
|---|---|
| `wp-content/themes/reveal/css/bootstrap.v4.4/_*.css` | Bootstrap 4.4 (split into individual component files: reboot, grid, navbar, cards, forms, buttons, utilities…) |
| `wp-content/themes/reveal/css/styles.css` | Main custom theme styles (brand colors, layout, custom classes) |
| `wp-content/themes/reveal/css/navigation.css` | Navigation-specific styles |
| `wp-content/themes/reveal/css/ig-modal.css` | Demo request modal |
| `wp-content/themes/reveal/css/tiny-slider.css` | Logo/testimonial carousel |
| `wp-content/themes/reveal/css/tooltips.css` | Tooltips |
| `wp-content/plugins/megamenu-pro/icons/fontawesome6/css/all.min.css` | Font Awesome 6 icons |
| `wp-content/uploads/maxmegamenu/style.css` | Mega menu layout |

**Framework verdict:** Bootstrap 4.4 + custom theme CSS. No Tailwind. For Astro migration, we'll port the `styles.css` + Bootstrap CSS into `src/styles/` and use them as-is, rather than re-implementing in Tailwind.

---

#### JS

| File | Purpose |
|---|---|
| jQuery 3.7.1 | DOM/Ajax base |
| `menu.js` | Nav sticky + mobile toggle behavior |
| `plugins.js` | Tiny-slider init + other plugin inits |
| `script.js` | Main theme JS (animations, misc) |
| `downloadUtility.js` | SDK download tracking |
| `leadTracker.js` | Salesforce lead form submission |
| `sf.common.js` | Form validation |

**Interactivity summary:** Sticky nav (scroll listener), mobile hamburger, logo carousel, demo modal, lead forms, lazy loading (`b-lazy`), scroll animations (`animate-me` + `data-animation`).

---

#### Fonts

- **Roboto** (weights 300, 400, 700) — originally Google Fonts, cached locally by WP Rocket at `wp-content/cache/fonts/`
- Self-hosted WOFF2 files available locally — copy directly to `public/fonts/`

---

#### Images

- **CDN images** (most hero/feature): `https://static.infragistics.com/marketing/reveal/…` — these are external; reference as-is or download separately
- **WP uploads** (page-specific): 1,764 local files under `wp-content/uploads/` (by year 2018–2026) — copy to `public/wp-content/uploads/` preserving folder structure

---

#### Locales

5 languages: `en` (default), `es`, `ja`, `ko`, `pt-BR` — each has its own subdirectory mirroring the root structure.

---

#### Content counts (unique pages, excluding UTM duplicates)

| Type | Count |
|---|---|
| Blog posts | ~127 |
| Glossary entries | ~25 |
| Whitepapers | ~30 |
| Webinars | ~5 (unique) |
| Stories | ~11 |
| Generic pages | ~30 |

---

**Decisions made:**
- **CSS strategy:** Port Bootstrap 4.4 CSS files + `styles.css` / `navigation.css` / `ig-modal.css` / `tiny-slider.css` as-is into `src/styles/`. No Tailwind rewrite — the custom CSS relies on Bootstrap class names throughout.
- **Images strategy:** Local uploads → `src/assets/images/` (Astro optimizes at build: WebP conversion, resizing, lazy loading via `<Image />`). During Phase 5 content extraction, rewrite all `wp-content/uploads/…` paths to `/src/assets/images/…`. CDN images (`static.infragistics.com`) stay as external URLs — Astro cannot optimize those at build time.
- **Fonts:** Copy self-hosted WOFF2 files from `wp-content/cache/fonts/` to `public/fonts/`, update `@font-face` in `BaseLayout.astro`.
- **JS strategy:** `menu.js`, `plugins.js`, `script.js` can be bundled as client-side scripts in `BaseLayout.astro`. Lead forms (`leadTracker.js`, `sf.common.js`) treated as Astro client islands.
- **Gated content:** Whitepapers and webinars use lead-capture forms — preserve form structure; backend endpoint (Salesforce) wired via the existing `leadTracker.js`.
- **Locales:** Only English content extracted to Markdown in Phase 5. Other locales left for n8n translation (Phase 7).

**Left for next session:**
- Phase 2: Configure the Astro boilerplate
  - Update `astro.config.mjs` — i18n routing, content collections
  - Copy CSS into `src/styles/`
  - Copy local uploads into `public/wp-content/uploads/`
  - Copy fonts into `public/fonts/`
  - Define `src/content/config.ts` collections (blog, glossary, whitepapers, webinars, stories, pages)

---

### Session 2 — 2026-04-27
**Phase:** 2 — Set Up Astro Foundation

**Completed:**
- Switched `output` from `server` + node adapter → `static` (marketing site, all forms are client-side JS)
- Removed Keystatic CMS (not needed for this migration)
- Added i18n config: default `en` (no prefix), `es`/`ja`/`ko`/`pt-BR` prefixed — matches original site structure
- Concatenated Bootstrap 4.4 individual CSS files (correct component order) → `src/styles/vendor/bootstrap.css`
- Copied theme CSS files (styles.css, navigation.css, ig-modal.css, tiny-slider.css, tooltips.css) → `src/styles/`
- Generated `src/styles/fonts.css` with Roboto @font-face declarations pointing to `/fonts/roboto/v51/`
- Copied 9 Roboto WOFF2 subsets → `public/fonts/roboto/v51/`
- Copied 10 JS files (jQuery 3.7.1, jquery-migrate 3.4.1, menu, plugins, script, leadTracker, sf.common, downloadUtility, tooltips, polyfills) → `public/js/`
- Rewrote `src/styles/global.css`: imports fonts → Bootstrap → theme CSS (no Tailwind in global scope)
- Updated `BaseLayout.astro`: added `lang` prop, removed Tailwind body classes, JS bundle in `<body>` footer
- Created `src/content/config.ts` with 6 collections using Astro 5 glob loader: blog, pages, whitepapers, webinars, stories, glossary
- Created `src/content/{blog,glossary,whitepapers,webinars,stories,pages}/en/` stub directories
- Build verified: `astro build` succeeds, 1 static page, no errors

**Files created/modified:**
- `astro.config.mjs`
- `package.json`
- `src/content/config.ts`
- `src/styles/global.css`
- `src/styles/fonts.css`
- `src/styles/vendor/bootstrap.css`
- `src/styles/styles.css`
- `src/styles/navigation.css`
- `src/styles/ig-modal.css`
- `src/styles/tiny-slider.css`
- `src/styles/tooltips.css`
- `src/layouts/BaseLayout.astro`
- `public/fonts/roboto/v51/*.woff2` (9 files)
- `public/js/*.js` (10 files)
- `src/content/*/en/.gitkeep` (6 dirs)

**Decisions made:**
- **Tailwind kept in config but not imported globally** — Tailwind vite plugin stays for potential future component-level use; Bootstrap CSS is loaded instead in global.css (mixing both globally would cause preflight conflicts)
- **Static output** — all interactivity is client-side (sticky nav, forms POST to Salesforce via leadTracker.js); no SSR needed
- **Content structure** `src/content/{type}/en/` — locale is the first path segment so pages can filter by `entry.id.startsWith('en/')` when querying collections; n8n will write translated files into `es/`, `ja/`, etc.
- **WP uploads NOT copied yet** — `public/wp-content/uploads/` copy deferred to Phase 5 (content extraction), when paths are being rewritten anyway; copying all 1,764 files now without rewriting paths would be wasted work
- **navigation.css image warnings** (`flags.webp`, `globe.webp`) — these are referenced by the mega-menu CSS via relative paths; will resolve once images are copied in Phase 5

**Left for next session:**
- Phase 4: Build page templates
  - src/pages/index.astro — Homepage (stub exists, needs full content sections)
  - src/pages/[lang]/blog/[slug].astro — Blog post
  - src/pages/[lang]/blog/index.astro — Blog listing
  - src/pages/[lang]/glossary/[slug].astro — Glossary entry
  - src/pages/[lang]/glossary/index.astro — Glossary listing
  - src/pages/[lang]/whitepapers/[slug].astro
  - src/pages/[lang]/webinars/[slug].astro
  - src/pages/[lang]/stories/[slug].astro
  - src/pages/[lang]/[slug].astro — Generic pages

---

### Session 3 — 2026-04-27
**Phase:** 3 — Build Astro Components

**Completed:**
- Copied mega-menu plugin JS (`maxmegamenu.js`) → `public/js/`
- Copied mega-menu plugin CSS (`style.css`) → `src/styles/vendor/megamenu.css`
- Copied FontAwesome 6 CSS + WOFF2 webfonts → `src/styles/vendor/fa6.css` + `public/fonts/fa6/webfonts/`
- Fixed FA6 CSS font paths from `../webfonts/` → absolute `/fonts/fa6/webfonts/`
- Updated `src/styles/global.css` — added megamenu.css + fa6.css imports
- Copied Reveal logo images → `public/wp-content/uploads/2025/09/`
- Wrote `src/components/ui/Header.astro` — full mega-menu compatible HTML structure (Product, Solutions, Resources dropdowns; language switcher; search; CTA button; mobile toggle)
- Wrote `src/components/ui/Footer.astro` — gradient wave + social icons + 4-col link grid + newsletter form + copyright bar + GDPR banner + back-to-top
- Wrote `src/components/ui/DemoModal.astro` — "Book a Personalized Demo" lead capture modal (moved out of Footer to standalone component)
- Wrote `src/components/sections/Hero.astro` — homepage light hero, split 2-col, decorative circles, multi-srcset image, demo modal CTA
- Wrote `src/components/sections/DarkHero.astro` — dark gradient hero for content pages; variants: centered / split-image / split-form; breadcrumbs + metadata slot
- Wrote `src/components/sections/CTABlock.astro` — generic CTA section; variants: dark / gradient / light; demo modal or plain link
- Wrote `src/components/ui/Card.astro` — two variants: blog (image + title + author/date + excerpt) and story (card with image + CTA arrow)
- Updated `src/layouts/BaseLayout.astro` — wraps Header + main slot + Footer + DemoModal; JS load order: jQuery → polyfills → maxmegamenu → plugins → menu → script → tooltips → leadTracker → sf.common
- Updated `src/layouts/LandingLayout.astro` — simplified to pass-through to BaseLayout (no duplicate Header/Footer)
- Updated `src/layouts/BlogLayout.astro` — uses DarkHero + 8/4 column content+sidebar layout
- Updated `src/pages/index.astro` — uses Hero + CTABlock with real Reveal content
- Build verified: `astro build` succeeds, no errors

**Files created/modified:**
- `src/styles/global.css`
- `src/styles/vendor/megamenu.css`
- `src/styles/vendor/fa6.css`
- `public/js/maxmegamenu.js`
- `public/fonts/fa6/webfonts/*.woff2` (5 files)
- `public/wp-content/uploads/2025/09/business-teams-reveal-logo-black*.webp` (3 files)
- `src/components/ui/Header.astro`
- `src/components/ui/Footer.astro`
- `src/components/ui/DemoModal.astro`
- `src/components/ui/Card.astro`
- `src/components/sections/Hero.astro`
- `src/components/sections/DarkHero.astro`
- `src/components/sections/CTABlock.astro`
- `src/layouts/BaseLayout.astro`
- `src/layouts/LandingLayout.astro`
- `src/layouts/BlogLayout.astro`
- `src/pages/index.astro`

**Decisions made:**
- **Mega-menu approach:** Ported the Max Mega Menu plugin CSS + JS wholesale (rather than rewriting Bootstrap navbar from scratch). HTML structure in Header.astro matches what `maxmegamenu.js` expects, so sticky nav + dropdown + mobile toggle all work via the existing JS.
- **DemoModal separate component:** Extracted the `#requestDemo` modal from the inline page HTML into `DemoModal.astro`, rendered once in BaseLayout. All `ig-show-modal` + `data-targetid="requestDemo"` triggers across the site will find it.
- **FA6 font paths:** Only WOFF2 files copied (TTF fallbacks omitted); WOFF2 covers all modern browsers. Build-time Vite warnings about TTF are harmless.
- **Hero.astro uses `set:html`** for the headline prop — allows inline HTML gradient spans (`<span class="title-violet-gradient">`) from frontmatter without XSS risk (content is authored, not user input).
- **Lead forms (newsletter + modal):** Preserved the original form HTML structure and IDs (`lead-form_1`, `lead-form_2`) so `leadTracker.js` and `sf.common.js` can initialize them unchanged.

**Left for next session:**
- Phase 4: Build page templates (see above)

---

### Session 4 — 2026-04-27
**Phase:** 4 — Build Page Templates

**Completed:**
- Created all English (default locale, no prefix) page templates
- Created all localized `[lang]` page templates (es, ja, ko, pt-BR)
- Build verified: `astro build` succeeds — 22 static pages, no errors

**Files created:**
- `src/pages/blog/index.astro` — Blog listing with sidebar (categories + demo CTA card)
- `src/pages/blog/[slug].astro` — Blog post with TOC + demo CTA sidebar
- `src/pages/glossary/index.astro` — Glossary listing grouped by letter with alpha-jump nav
- `src/pages/glossary/[slug].astro` — Glossary entry with inline CTAs
- `src/pages/whitepapers/index.astro` — Whitepaper card grid
- `src/pages/whitepapers/[slug].astro` — Whitepaper with gated lead-capture form sidebar
- `src/pages/webinars/index.astro` — Webinar listing split into upcoming + on-demand
- `src/pages/webinars/[slug].astro` — Webinar with registration form or YouTube embed (past)
- `src/pages/stories/index.astro` — Story card grid
- `src/pages/stories/[slug].astro` — Story with key-facts aside (industry, markets)
- `src/pages/[slug].astro` — Generic page (full-width content)
- `src/pages/[lang]/index.astro` — Localized homepage (mirrors English homepage)
- `src/pages/[lang]/blog/index.astro` — Localized blog listing
- `src/pages/[lang]/blog/[slug].astro` — Localized blog post
- `src/pages/[lang]/glossary/index.astro` — Localized glossary listing
- `src/pages/[lang]/glossary/[slug].astro` — Localized glossary entry
- `src/pages/[lang]/whitepapers/[slug].astro` — Localized whitepaper
- `src/pages/[lang]/webinars/[slug].astro` — Localized webinar
- `src/pages/[lang]/stories/index.astro` — Localized story listing
- `src/pages/[lang]/stories/[slug].astro` — Localized story
- `src/pages/[lang]/[slug].astro` — Localized generic page

**Decisions made:**
- **`getStaticPaths` locale array must be inline** — Astro compiles `getStaticPaths` as a module-level export; variables declared in the frontmatter instance scope are not accessible inside it. `['es', 'ja', 'ko', 'pt-BR']` is declared locally inside each `getStaticPaths`.
- **Listing pages added for whitepapers and webinars** — Not in original plan spec but needed for navigation; trivial to add now while content structure is defined.
- **Localized listing pages always generated** — `[lang]/blog/index`, `[lang]/glossary/index`, etc. always produce all 4 locale pages even when content is empty, so links from the header nav resolve correctly before Phase 5/7 content lands.
- **Bootstrap 4 embeds** — Used `embed-responsive embed-responsive-16by9` (Bootstrap 4) not `ratio ratio-16x9` (Bootstrap 5) for YouTube iframes.
- **Content collection "empty" warnings at build time** — Expected; `.gitkeep` stubs produce no `.md` files. Will resolve automatically when Phase 5 populates content.

**Left for next session:**
- Phase 5: Extract English content to Markdown
  - Blog posts (~127) → `src/content/blog/en/`
  - Glossary entries (~25) → `src/content/glossary/en/`
  - Whitepapers (~30) → `src/content/whitepapers/en/`
  - Webinars (~5) → `src/content/webinars/en/`
  - Stories (~11) → `src/content/stories/en/`
  - Generic pages (~30) → `src/content/pages/en/`
  - Rewrite all `wp-content/uploads/…` image paths to `/wp-content/uploads/…` (public dir)

---

### Session 5 — 2026-04-28
**Phase:** 5 — Extract English Content to Markdown

**Completed:**
- Wrote `extract.py` — Python script using BeautifulSoup + markdownify to extract all content types
- Extracted 216 Markdown files with YAML frontmatter:
  - Blog posts: 107 → `src/content/blog/en/`
  - Generic pages: 54 → `src/content/pages/en/`
  - Glossary entries: 23 → `src/content/glossary/en/`
  - Whitepapers: 21 → `src/content/whitepapers/en/`
  - Stories: 10 → `src/content/stories/en/`
  - Webinars: 1 → `src/content/webinars/en/`
- Copied 1,796 WP upload files → `public/wp-content/uploads/` (preserving year/month structure)
- All image paths rewritten: `../wp-content/uploads/` → `/wp-content/uploads/`
- Build verified: `astro build` succeeds — 237 static pages, 0 errors

**Files created/modified:**
- `extract.py` (extraction script, at repo root `/mnt/d/projects/reveal/`)
- `src/content/blog/en/*.md` (107 files)
- `src/content/pages/en/*.md` (54 files)
- `src/content/glossary/en/*.md` (23 files)
- `src/content/whitepapers/en/*.md` (21 files)
- `src/content/stories/en/*.md` (10 files)
- `src/content/webinars/en/*.md` (1 file)
- `public/wp-content/uploads/**` (1,796 image/asset files)

**Decisions made:**
- **Author extracted via `itemprop="author"`** — more reliable than text heuristics; falls back gracefully to empty string
- **Date extracted via `time[itemprop="datePublished"]`** — prefers `datetime` attribute (ISO format), falls back to visible text
- **UTM/query-string variants skipped** — only clean filenames (no `?`, `&`, or `'` in name) are extracted; avoids duplicate content
- **Generic pages: 54 extracted** — includes all industry verticals, vs-competitor, policy, and feature pages; excluded language-root stubs (ja.html, ko.html, etc.) and test pages
- **Story key_facts** written as a YAML block in frontmatter (industry, markets, challenges, why Reveal)
- **markdownify `strip=` only** — `strip` and `convert` cannot be combined; container tags (div, span, section…) are stripped (content preserved), semantic tags converted by default
- **WP uploads copied as-is** — 189 MB; Astro `<Image />` optimization not used for these (too many; would bloat build time); serve from `/wp-content/uploads/` directly

**Left for next session:**
- Phase 6 (continued): product/industry/vs-competitor pages
  - Download 5 representative pages from live site (features, banking-analytics, reveal-vs-power-bi, ai, pricing/embedded-analytics)
  - Build page-specific templates and write all 54 generic pages
- Phase 8: n8n translation workflow

---

### Session 7 — 2026-04-28
**Phase:** 7 — Search (Pagefind)

**Completed:**
- Installed `pagefind@1.5.2` as devDependency
- Updated build script: `astro build && pagefind --site dist`
- Added `data-pagefind-body` to `<main>` in `BaseLayout.astro` — nav and footer excluded from index automatically
- Added named `head` slot to `BaseLayout.astro` for per-page `<head>` injections
- Created `src/pages/search.astro` — loads Pagefind UI CSS/JS from `/pagefind/` (generated at build time), pre-fills search from `?s=` URL param so the existing header search forms work without any changes
- Build verified: 238 pages indexed across 5 languages (en, es, ja, ko, pt-BR), 7,945 words, 1s index time

**Files created/modified:**
- `package.json` (build script updated, pagefind devDependency added)
- `src/layouts/BaseLayout.astro` (data-pagefind-body on main, head slot added)
- `src/pages/search.astro`

**Decisions made:**
- **Pagefind Default UI** — used the classic `pagefind-ui.js` (not the new Component UI added in v1.5.0). Both work; Component UI adds a search modal and better accessibility. Can upgrade later if needed.
- **`?s=` pre-fill** — header forms use `name="s"` (unchanged from the WP site). Search page reads this on `DOMContentLoaded` and calls `ui.triggerSearch(q)` — no header changes needed.
- **Multilingual indexing automatic** — Pagefind detects `<html lang="...">` and separates indexes per language. The `/search` page searches across all languages by default; per-locale search pages can be added later if needed.
- **Pagefind assets not in `src/`** — `/pagefind/` directory is generated into `dist/` at build time. During `astro dev` the search page loads but shows nothing (404 on pagefind assets). This is expected and acceptable.

**Left for next session:**
- Phase 6 (continued): product/industry/vs-competitor pages
  - **5 downloads unlock ~35 pages:** features, banking-analytics, reveal-vs-power-bi, ai, pricing/embedded-analytics
- Phase 8: n8n translation workflow

---

### Session 6 — 2026-04-28
**Phase:** 6 — Rebuild Marketing Pages (Section Components) — homepage

**Completed:**
- Downloaded homepage via Chrome (Save Page As → Webpage Complete) → `pagestocopy/`
- Copied homepage CDN images → `public/images/homepage/`
- Built 10 new section components (in `astro-boilerplate/src/components/sections/`):
  - `LogoSlider.astro` — CSS-animated infinite logo carousel (`--slide-count` + `--slide-width` CSS vars, 100s animation, pause on hover)
  - `FeatureRow.astro` — split text+image row; props: headline, body, image, imageSrcset, reversed, variant (light/dark/gray-card), eyebrow, cta; slot for rich body content
  - `IconGrid.astro` — 4-col icon card grid; props: eyebrow, headline, subhead, cards[], variant (white/gray-card), footnote
  - `AIDarkSection.astro` — dark navy 2-row AI section with check lists, CTA links, decorative circles
  - `FastImplementation.astro` — before/after comparison card (9+ months vs 2 weeks)
  - `StatsBand.astro` — full-width blue stats band with pink stat values
  - `PricingTeaser.astro` — fixed pricing card with checklist + 3 pillar icons
  - `Reviews.astro` — large italic quote + G2 badge row
  - `FAQ.astro` — Bootstrap accordion + auto-generated `FAQPage` JSON-LD schema
  - `InlineCTA.astro` — small centered icon + headline + CTA button
- Added CSS classes to `src/styles/styles.css` (appended at bottom): bg-dark-navy, bg-light-gray-card, bg-blue-primary, text-light-blue, text-pink-stat, ai-analyst-tag, font-size-stat, accent-bar, testimonial-quote, bg-icon-{pink,blue,orange}, fast-impl-divider, logo-slider animation, accordion clean theme, decorative circle classes, title-violet-gradient, btn-white-play
- Rewrote `pages/index.astro` — fully composed homepage using all 10 new components + Hero + CTABlock (no more raw HTML import)
- Build verified: `astro build` succeeds, no errors

**Files created/modified:**
- `src/components/sections/LogoSlider.astro`
- `src/components/sections/FeatureRow.astro`
- `src/components/sections/IconGrid.astro`
- `src/components/sections/AIDarkSection.astro`
- `src/components/sections/FastImplementation.astro`
- `src/components/sections/StatsBand.astro`
- `src/components/sections/PricingTeaser.astro`
- `src/components/sections/Reviews.astro`
- `src/components/sections/FAQ.astro`
- `src/components/sections/InlineCTA.astro`
- `src/styles/styles.css` (CSS appended)
- `src/pages/index.astro` (fully rewritten)
- `public/images/homepage/` (homepage CDN images)

**Decisions made:**
- **480px local fallbacks + CDN srcsets** — homepage hero images copied locally as 480px fallbacks; larger srcsets still point to `static.infragistics.com` (cannot download all CDN variants)
- **LogoSlider uses pure CSS animation** — no JS dependency (tiny-slider not used for logos on new site); seamless loop achieved by duplicating logo set in DOM
- **FAQ generates JSON-LD automatically** — `FAQPage` schema injected in `<head>` via BaseLayout slot whenever FAQ component is used
- **FeatureRow slot for body** — body prop accepts HTML string via `set:html`; slot is available for when rich markup (lists, custom elements) is needed instead

**Left for next session:**
- Phase 6 (continued): product/industry/vs-competitor pages
  - **5 downloads unlock ~35 pages:** features, banking-analytics, reveal-vs-power-bi, ai, pricing/embedded-analytics
  - Build `features` page first (canonical product-page template, most reused)
  - Build `banking-analytics` → apply template to all 15 industry pages
  - Build `reveal-vs-power-bi` → apply template to all 14 vs-competitor pages
  - Build `ai`, `pricing/embedded-analytics` individually (unique layouts)
- Phase 7: Pagefind search
- Phase 8: n8n translation workflow

---

### Session 8 — 2026-04-28
**Phase:** 6 (PoC) — Content-Driven Homepage via Structured Frontmatter

**Completed:**
- Converted `src/pages/index.astro` from hardcoded props → section dispatcher pattern
- Created `src/content/pages/en/homepage.md` — all 13 homepage sections as structured YAML frontmatter (hero, logo-slider, 2× feature-row, 2× icon-grid, ai-dark-section, fast-implementation, stats-band, pricing-teaser, reviews, faq, inline-cta)
- Added `sections: z.array(z.any()).optional()` to `pageSchema` in `config.ts`
- Excluded `en/homepage` from `[slug].astro` route to avoid generating a `/homepage` page
- Build verified: `/index.html` generates correctly, 0 errors

**Files created/modified:**
- `src/content/pages/en/homepage.md` (new — homepage content as structured YAML)
- `src/pages/index.astro` (rewritten — section dispatcher, ~80 lines vs 377)
- `src/content/config.ts` (pageSchema extended with `sections` field)
- `src/pages/[slug].astro` (excludes `en/homepage` from routes)

**Decisions made:**
- **`homepage.md` not `index.md`** — Astro's glob loader silently excludes `index.md` files from content collections to avoid routing conflicts; `homepage.md` is the workaround
- **`z.array(z.any())`** — sections schema is intentionally untyped; strict per-section types would be verbose and fragile across 11 section variants
- **`slotContent` field** — FeatureRow's rich body (lists, h3s) can't go in the `body` prop (renders as a single `<p>`); stored as an HTML string in `slotContent`, rendered via `<Fragment set:html={...} />` in the slot
- **n8n implication** — translatable keys are now explicit and enumerable (headline, subhead, body, slotContent, question, answer, label, footnote, quote); non-translatable fields (type, image, variant, bgClass, href, src) are never touched by the LLM

**Left for next session:**
- Phase 6 (continued): apply dispatcher pattern to industry/vs-competitor/features pages
  - Download 5 pages from live site (features, banking-analytics, reveal-vs-power-bi, ai, pricing/embedded-analytics)
  - Build section templates for each, populate via structured frontmatter
- Phase 8: n8n translation workflow

---

### Session 9 — 2026-04-28
**Phase:** 6 (continued) — All Marketing Pages via Section Dispatcher

**Completed:**
- Copied page-specific images from `pagestocopy/` → `public/images/features/`, `public/images/banking/`, `public/images/ai/`, `public/images/vs/`, `public/images/icons/`
- Extended `DarkHero.astro` — added `subhead`, `ctaLabel`, `ctaHref`, `secondaryCtaLabel`, `secondaryCtaHref`, `imageSrcset`, and new `dark-navy` variant (centered, dark background, for AI/product pages)
- Extended `IconGrid.astro` — added `cols` prop (2|3|4), optional `items[]` per card (checklist), optional `image` per card, optional `link`/`linkLabel` per card
- Built `ComparisonTable.astro` — 3-col comparison table (feature | Reveal | competitor) for all vs-* pages
- Built `PricingHero.astro` — split hero with headline+checklist on left, lead-capture form on right; used on pricing page
- Built `FeatureSteps.astro` — horizontal step-flow component for AI page "From Question to Insight" section
- Upgraded `[slug].astro` to full section dispatcher — handles `dark-hero`, `pricing-hero`, `logo-slider`, `feature-row`, `icon-grid`, `comparison-table`, `feature-steps`, `stats-band`, `reviews`, `faq`, `inline-cta`, `cta-block`; falls back to `<Content />` for pages without `sections[]`
- Wrote structured YAML sections for all 6 downloaded representative pages: `features.md`, `banking-analytics.md`, `reveal-vs-power-bi.md`, `ai.md`, `pricing.md`, `embedded-analytics.md`
- Applied vs-* template to all 13 remaining competitor pages (tableau, looker, sisense, domo, metabase, gooddata, thoughtspot, logi-analytics, luzmo, qrvey, bold-bi, panintelligence, toucan-toco)
- Applied industry template to all 10 downloaded-pattern industry pages (healthcare, finance, retail, manufacturing, energy, education, insurance, supply-chain, it, real-estate)
- Applied simplified template to 8 remaining solution pages (isv, crm, crypto, mining, on-prem, telecom, white-label, embedded-analytics-statistics)
- Build verified: 238 static pages, 0 errors

**Files created/modified:**
- `src/components/sections/DarkHero.astro` (extended)
- `src/components/sections/IconGrid.astro` (extended)
- `src/components/sections/ComparisonTable.astro` (new)
- `src/components/sections/PricingHero.astro` (new)
- `src/components/sections/FeatureSteps.astro` (new)
- `src/pages/[slug].astro` (section dispatcher)
- `src/content/pages/en/features.md` (structured YAML)
- `src/content/pages/en/banking-analytics.md` (structured YAML)
- `src/content/pages/en/reveal-vs-power-bi.md` (structured YAML)
- `src/content/pages/en/ai.md` (structured YAML)
- `src/content/pages/en/pricing.md` (structured YAML)
- `src/content/pages/en/embedded-analytics.md` (structured YAML)
- `src/content/pages/en/reveal-vs-*.md` (13 files — structured YAML)
- `src/content/pages/en/*-analytics.md` (10 industry files — structured YAML)
- `src/content/pages/en/{isv,crm,crypto,mining,on-prem,telecom,white-label,embedded-analytics-statistics}.md` (8 files)
- `public/images/features/` (feature screenshot PNGs)
- `public/images/banking/` (banking dashboard PNGs)
- `public/images/ai/` (AI page WEBPs)
- `public/images/vs/` (G2 badges SVGs)
- `public/images/icons/` (Reveal icon SVGs)

**Decisions made:**
- **`DarkHero` `dark-navy` variant** — centered layout with gradient dark navy bg for product pages (AI, etc.); `split-image` variant keeps the original teardrop/gradient hero layout with image column
- **`IconGrid` `cols` prop** — 2 cols for AI capability cards with checklists; 3 cols for feature screenshot cards; 4 cols (default) for standard icon grids
- **vs-* pages use CDN images for feature rows** — Infragistics CDN images referenced directly; local fallbacks only for images that were actually downloaded
- **Industry pages beyond banking use CDN image URLs** — only banking images were downloaded; other industry pages reference CDN URLs that may not exist (acceptable — the page structure is correct, images can be updated when those pages are downloaded)
- **`[slug].astro` falls back to `<Content />`** — pages without `sections[]` in frontmatter (about-us, careers, etc.) still render their markdown body correctly

**Left for next session:**
- Phase 8: n8n translation workflow
- Optional: download remaining industry pages to get correct hero images and content for each vertical
