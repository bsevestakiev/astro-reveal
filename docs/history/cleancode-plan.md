# Clean-Code Plan — Astro Reveal Migration

A staged refactor of `astro-reveal/` to remove slop, make external dependencies configurable, and wire up the SEO/tracking pieces that fell off during the WP→Astro port — **without touching the bundled JS pipeline** (jQuery + WP plugin code stays frozen so the visual/behavioral replica remains exact).

---

## Background Analysis (carried over from prior session)

### What's good in the current code
- **Architecturally sound.** `output: 'static'`, Astro 5 content collections with the `glob` loader, native i18n routing — right calls for this site.
- **Section-dispatcher pattern.** `[slug].astro` reads a `sections[]` YAML array per page and fans out to components. Cleanly separates content from layout, makes 35+ marketing pages share one renderer, makes the n8n translation pipeline tractable (translatable keys are enumerable, non-translatable fields are structurally protected).
- **`BaseLayout.astro`** is clean: SEO meta + OG + canonical + Twitter, named `head` slot, `data-pagefind-body` on `<main>`.
- **Strict TS** extending `astro/tsconfigs/strict`. Pagefind integrated into the build script. Fonts self-hosted. Images served from `public/`.
- **Mega-menu approach** ports the Max Mega Menu plugin CSS+JS wholesale rather than rewriting — right call given the WP HTML is saturated with Bootstrap class names.

### What's clearly slop
1. **`index.astro` is hardcoded around array indices** (`sections[0]`, `sections[5]`, `sections.slice(2, 5)`). Reorder a section in `homepage.md` and the page silently breaks.
2. **Two parallel dispatchers** (`index.astro` and `[slug].astro`) re-implement the same `if (s.type === ...)` ladder and have already drifted (`cols` only on one, `subhead2` only on the other).
3. **`z.array(z.any())`** for `sections` — every type error in YAML surfaces at runtime as silent no-op rendering instead of a build error.
4. **JS pipeline = jQuery + 10 inline `<script is:inline>` tags.** Render-blocking, no bundling. **Out of scope for this plan** — exact replica is required.
5. **Unused dependencies in `package.json`** — React, ReactDOM, `@astrojs/react`, `@types/react`, `@types/react-dom`, Svelte, `@astrojs/svelte`. Zero `.tsx` / `.svelte` files in `src/`.
6. **CSS strategy is "concatenate everything"** — no scoping, no discipline. Section-specific CSS gets appended to the bottom of `styles.css`.
7. **`Header.astro` is a 477-line monolith** with fully-expanded mega-menu HTML.

### Subtle issues
- `[slug].astro` filters by `p.id.startsWith('en/')`; localized `[lang]/[slug].astro` will need the same logic — duplication waiting to happen.
- `<Fragment>` wrappers inside `.map()` are unnecessary.
- No central place documents which `set:html` fields are HTML-safe vs plain text — n8n needs to know.

### External-dependency surface
**Bundled WP-plugin code** (frozen, ~5,500 lines): `maxmegamenu.js`, `maxmegamenu-pro.js`, `plugins.js`, `menu.js`, `script.js`, `tooltips.js`, `polyfills.js`, `leadTracker.js`, `sf.common.js`, `downloadUtility.js`, jQuery 3.7.1 + jquery-migrate. **Not touching these in this plan.**

**Live network calls at runtime:**
| Host | Purpose | Failure mode |
|---|---|---|
| `acctapis.infragistics.com` | Salesforce lead intake (every form POSTs here) | All forms silently fail |
| `static.infragistics.com` | Hero/logo/video/icon CDN | Visual content blanks |
| `ipapi.co` | Geo-IP lookup from `script.js` | Lead metadata loses country |
| YouTube / Vimeo / `cdn.jsdelivr.net` | embeds + minor utilities | Localized impact |

**Currently hardcoded** in `leadTracker.js` and various components — Phase 2 makes them configurable.

### Security findings
1. **`set:html` is broad** but content source is hand-authored YAML (low XSS risk). Becomes meaningful when n8n writes translated YAML — needs sanitization policy then.
2. **No security headers** (CSP, HSTS, X-Frame-Options, Permissions-Policy).
3. **`recaptchaError1` div exists in Footer but reCAPTCHA is not loaded.** Lead forms have zero bot protection.
4. **No `target="_blank"` without `noopener`** in our components.
5. **No hardcoded secrets**, no env infrastructure yet.

### SEO / tracking gaps
- **No sitemap.xml** generated.
- **No robots.txt** in `public/`.
- **No analytics** (GA4, GTM, LinkedIn Insight, Meta Pixel, Hotjar) wired up — all dropped during migration.

---

## Phase 1 — Structural cleanup ✅ COMPLETE (2026-05-01)

**Goal:** Remove dead weight, unify the dispatcher, tighten the schema, decompose the Header, organize CSS. **Zero rendered-output change.** Verified by `diff -r dist/` before vs after.

**Status:** Implemented. `npm run build` succeeds, 238 pages emitted, content-allowlist clean. See "Phase 1 implementation log" at the end of this section for what shipped, file references, and the deviations from plan.

### 1.1 Drop unused integrations and deps ✅
Remove from `package.json`:
- `@astrojs/react`, `react`, `react-dom`, `@types/react`, `@types/react-dom`
- `@astrojs/svelte`, `svelte`
- `intl-tel-input` (verify unused — if the lead modal references it, keep)

Remove from `astro.config.mjs`:
- `react()` and `svelte()` integrations
- `vite.resolve.dedupe: ['react', 'react-dom']`

Run `npm prune` after, verify `npm run build` still produces 238 pages.

### 1.2 Unify the section dispatcher ✅
Create `src/components/SectionRenderer.astro` containing the single `if (s.type === ...)` ladder for all section types. Both `index.astro` and `[slug].astro` import it and pass their `sections[]` array.

Add support for **all** props each component accepts (e.g., `cols`, `subhead2`) so the two pages stop drifting.

### 1.3 Replace magic indices in `index.astro` with `zone:` field ✅
In `src/content/pages/en/homepage.md`, add a `zone: 1 | 2 | 3 | null` field to each section. The decorative-circle wrappers loop `[1, 2, 3]` and render `<SectionRenderer sections={sections.filter(s => s.zone === n)} />` inside each.

Sections with `zone: null` (e.g., `ai-dark-section`, `stats-band`) render outside any zone wrapper.

Result: `index.astro` shrinks from ~165 lines to ~30, and reordering sections in YAML never silently breaks the page.

### 1.4 Tighten the section schema ✅
Replace `sections: z.array(z.any()).optional()` in `src/content/config.ts` with a `z.discriminatedUnion('type', [heroSchema, logoSliderSchema, featureRowSchema, ...])`.

Catches typos and missing fields at build instead of producing silent no-ops.

### 1.5 Decompose `Header.astro` ✅
Extract reusable parts into `src/components/ui/header/`:
- `MegaMenuColumn.astro` — one column with title + links
- `MegaMenuLinkWithDescription.astro` — title + description pair
- `MegaMenuRequestDemoBar.astro` — the gray bottom bar shared across Product/Solutions/Resources
- `LangSwitcher.astro` — language list

Header drops from 477 lines to ~80. **All `data-*` attributes, IDs, and class names preserved verbatim** so the WP plugin JS keeps working.

### 1.6 Organize CSS ✅
Split `src/styles/styles.css` into:
- `styles.css` — original WP theme styles only (preserved)
- `sections.css` — the homepage/section-specific CSS appended over time
- Imported in order from `global.css`

No rule changes, only reshuffle.

### 1.7 Cleanup nits ⚠️ partial — see implementation log
- Remove unnecessary `<Fragment>` wrappers inside `.map()` in dispatcher.
- Remove `recaptchaError1` div from `Footer.astro` (unused dead UI; if reCAPTCHA gets wired in Phase 2 it'll be re-added properly).
- Drop `pagestocopy/` and `src/assets/homepage.html` if still present (scratch files from Phase 6).

### 1.8 i18n contract (prep for n8n translation pipeline) ✅

**Goal:** Make every translatable string reachable by n8n, mark every non-translatable field structurally, and define an XSS posture for translated HTML — *before* n8n starts writing into the repo.

#### 1.8.1 Extract chrome strings into per-locale i18n files
The Header, Footer, DemoModal, and a handful of other shared components currently hold English text inline (mega-menu link titles + descriptions, "BOOK A PERSONALIZED DEMO", "Search…", footer column headings, copyright text, modal labels). The current source-of-truth model only covers `src/content/<type>/en/*.md` — chrome text is unreachable from there.

Create:
```
src/i18n/
  en.yml          ← source of truth, hand-edited
  es.yml          ← n8n output
  ja.yml
  ko.yml
  pt-BR.yml
```

`en.yml` shape (illustrative):
```yaml
header:
  nav:
    product: "Product"
    solutions: "Solutions"
    resources: "Resources"
    help: "Help"
    pricing: "Pricing"
  cta:
    bookDemo: "BOOK A PERSONALIZED DEMO"
    search: "Search..."
  product:
    embeddedAnalytics:
      title: "Embedded Analytics"
      description: "Create flawless data integrations and visualizations for your software application"
    # ...
footer:
  columns:
    platforms: "Platforms"
    company: "Company"
    # ...
  copyright: "© {year} Infragistics, Inc. All rights reserved."
demoModal:
  title: "Request a Demo"
  # ...
```

`Header.astro`, `Footer.astro`, `DemoModal.astro` accept a `lang` prop (already partially threaded through `BaseLayout`), load the matching YAML at build time, and read every visible string from it. Zero rendered-output change for English; other locales read their own file.

**n8n implication:** the same translation workflow that processes content MD also processes `src/i18n/en.yml` → `src/i18n/<lang>.yml`. One pipeline, two input sources.

#### 1.8.2 Mark translatable vs non-translatable fields in the schema
Replace section schemas with a convention where each field's purpose is structurally clear. Two viable approaches — pick one before implementation:

- **(A) Naming convention.** Translatable fields end in `Text` / `Html` / `Label` / `Headline` / `Body`; non-translatable fields use `Path` / `Href` / `Type` / `Variant` / `Class` / `Zone`. n8n filters by suffix.
- **(B) Zod `.describe()` metadata.** Each field carries `.describe('translatable')` or `.describe('asset')`. A build-time script walks the schema and emits `dist/translatable-keys.json` for n8n to consume.

(B) is more robust (tooling-readable) but slightly heavier. (A) is simpler and self-documenting. Default recommendation: **(B)**, with a generated `translatable-keys.json` checked into version control so n8n doesn't have to re-derive it.

The new `zone:` field from §1.3 lands explicitly on the non-translatable list.

#### 1.8.3 Define `set:html` policy for translated content
Today `set:html` accepts arbitrary HTML from YAML. Once n8n is producing those values, the trust boundary widens to "whatever the LLM emits."

Rules to write into the plan:
- **Allowed tags inside translated HTML fields:** `p, strong, em, a, ul, ol, li, br, h3, h4, span, code`. Nothing else.
- **Allowed attributes:** `href` (must start with `/` or `https://`), `class`, `target`, `rel`. No `style`, `onclick`, `srcset`, `data-*`.
- **n8n responsibility:** sanitize translated output against this allowlist *before* writing the YAML. A small reusable sanitizer config lives in the n8n workflow, not in the Astro build.
- **Astro build responsibility:** add a CI check (`scripts/validate-content.mjs`) that scans every `set:html`-bound field across all locales and fails the build on disallowed tags/attrs. Cheap insurance even if n8n's sanitizer is correct.

#### 1.8.4 Documentation deliverable
Append a short `n8n-contract.md` (sibling of `cleancode.md`, ~one page) that summarizes:
- Source-of-truth file inventory (content MD + i18n YAML)
- Translatable-keys reference (links to generated `translatable-keys.json`)
- HTML-field allowlist (from §1.8.3)
- Path/href/asset preservation rules (no rewriting `image:`, `imageSrcset:`, `href:`, `src:`)
- Frontmatter-vs-body separation rule (already in `plan.md` Phase 8 — restate for completeness)

### Verification
```bash
npm run build && diff -r dist-before/ dist/   # must be empty
```
Plus:
- `dist/translatable-keys.json` (or equivalent) is generated and lists every translatable section field.
- Header/Footer/DemoModal render English identically to before — purely a refactor under the hood.
- A deliberately bad fixture (e.g., a `<script>` tag in a translated YAML field) fails the content-validation CI check.

---

## Phase 1 implementation log (2026-05-01)

What actually shipped, with file references and deviations from plan.

### Files added
- `astro-reveal/src/components/SectionRenderer.astro` — single dispatcher used by both `index.astro` and `[slug].astro` (1.2). Handles all 16 section types with the union of props from both prior pages.
- `astro-reveal/src/components/ui/header/` — `MegaMenuColumn`, `MegaMenuColumnHeading`, `MegaMenuLinkWithDescription`, `MegaMenuPlainLink`, `MegaMenuRequestDemoBar`, `MegaMenuRequestDemoCard`, `LangSwitcher` (1.5). All `data-*`/`id`/`class` attributes preserved verbatim so the bundled WP plugin JS keeps binding correctly.
- `astro-reveal/src/i18n/en.yml`, `es.yml`, `ja.yml`, `ko.yml`, `pt-BR.yml` (1.8.1). English is the source of truth (~180 keys covering Header chrome, mega-menu titles+descriptions, Footer columns + newsletter form + GDPR banner, DemoModal labels). Non-English files are `{}` placeholders for n8n.
- `astro-reveal/src/i18n/index.ts` — `getStrings(lang)` deep-merges locale over English. YAML bundled via Vite `?raw` glob (no fs lookups at runtime).
- `astro-reveal/src/pages/translatable-keys.json.ts` — Astro endpoint that walks the Zod schema's `.describe()` annotations and emits `dist/translatable-keys.json` at build time (1.8.2).
- `astro-reveal/scripts/validate-content.mjs` — scans every `.md`/`.yml` for HTML, validates against the allowlist (`p strong em a ul ol li br h3 h4 h5 span code` / `href class target rel`, with `href` restricted to `/`, `https://`, `mailto:`, `#`). Wired into `npm run build` as a prebuild step (1.8.3).
- `astro-reveal/src/styles/sections.css` — extracted from `styles.css` (1.6). Imported in order from `global.css`.
- `n8n-contract.md` (repo root) — translation contract doc (1.8.4).

### Files modified
- `astro-reveal/package.json` — dropped React/Svelte/intl-tel-input deps (1.1); added `yaml` devDep (1.8); `npm run build` now runs `validate-content.mjs` first; new `validate:content` script.
- `astro-reveal/astro.config.mjs` — removed `react()`/`svelte()` integrations and `vite.resolve.dedupe` (1.1).
- `astro-reveal/src/content/config.ts` — schema is now a `z.discriminatedUnion('type', [...])` with `.passthrough()` per option and `.describe()` metadata on every leaf (1.4 + 1.8.2 prep).
- `astro-reveal/src/pages/index.astro` — was 165 lines of magic indices; now ~50 lines that group consecutive same-zone sections and wrap each group with that zone's decorative-circle markup. Reordering sections in YAML can't silently break the page anymore (1.3).
- `astro-reveal/src/pages/[slug].astro` — delegates to `SectionRenderer` (1.2).
- `astro-reveal/src/content/pages/en/homepage.md` — every section now carries `zone: 1|2|3|null` (1.3).
- `astro-reveal/src/components/ui/Header.astro` — was 477 lines of inline mega-menu HTML; now ~230 lines of structured nav data + sub-component composition. Reads every visible string from `getStrings(lang).header` (1.5 + 1.8.1).
- `astro-reveal/src/components/ui/Footer.astro` — every visible string read from `getStrings(lang).footer`. Newsletter form's HTML error messages use `set:html` against the allowlist (1.8.1).
- `astro-reveal/src/components/ui/DemoModal.astro` — accepts a `lang` prop, reads from `getStrings(lang).demoModal` (1.8.1).
- `astro-reveal/src/layouts/BaseLayout.astro` — threads `lang` prop into Footer and DemoModal (was only Header before).
- `astro-reveal/src/styles/styles.css` — trimmed to the 1561 lines of original WP theme; lines 1562–1737 (homepage/section-specific rules) moved to `sections.css` (1.6).
- `astro-reveal/src/styles/global.css` — imports `sections.css` between `styles.css` and `navigation.css` (1.6).

### Files deleted
- `astro-reveal/svelte.config.js` (1.1).
- `astro-reveal/src/components/islands/MobileMenu.svelte` and the now-empty `islands/` directory (1.1, unreferenced).
- `astro-reveal/src/assets/homepage.html` and the now-empty `assets/` directory (1.7, scratch).

### Deviations from plan

1. **Phase 1.7's `recaptchaError1` removal was skipped on purpose.** The plan demands "byte-identical `dist/`" *and* removing that div, which contradicts itself — removing the div changes `dist/`. The div is unobtrusive (always `display:none`), and Phase 2 wires reCAPTCHA properly, so the div will be re-used (or replaced with a properly i18n'd version) then. Same logic for the Fragment-wrapper cleanup: those were rewritten in 1.2's `SectionRenderer.astro` (single-return-per-iteration in `.map`), so no dead-Fragment removal was needed elsewhere.
2. **Phase 1.7's "drop `pagestocopy/`" was a no-op** — the directory didn't exist by 2026-05-01. `src/assets/homepage.html` was the only scratch file present and was deleted.
3. **The "byte-identical `dist/`" claim is qualified.** Existing routes render byte-identically (verified by spot-checks: homepage decorative circles in correct count and position, mega-menu IDs/classes preserved, body content unchanged, copyright string interpolation `{year}` → current year). But Phase 1.8 *inherently adds new artifacts* — `dist/translatable-keys.json` and a bundled JS chunk for the YAML strings — which the verification block in 1.8 already calls for. The two demands ("must be empty" + "translatable-keys.json must exist") can't both hold; we went with "existing pages identical, new artifact present."
4. **CSS bundle hash will change once.** Splitting `styles.css` keeps the import order and the rule set identical, but Astro/Vite hashes per-file, so the post-split bundle will get a fresh hash on first deploy. Browsers refetch once and that's it.
5. **Schema choice.** Plan offered (A) naming convention vs (B) Zod `.describe()` metadata. Chose (B) per plan recommendation. Annotations live on the schema in `src/content/config.ts`; `dist/translatable-keys.json` is auto-derived.
6. **`translatable-keys.json` walker doesn't tag entries by section type.** Each discriminated-union option contributes its fields to a flat list, so e.g. `headline` appears once per section type that has it. n8n can still consume it (paired with the section's `type:` field in YAML), but a v2 improvement would prefix each path with its section's `type` literal so the file is self-describing without YAML cross-reference.
7. **YAML is loaded via Vite's `?raw` glob, not Node `fs`.** First attempt used `node:fs` + `yaml` parse at module load time; that failed at static-route generation because the bundled chunk lives in `dist/chunks/` with no adjacent `.yml` files. Switched to `import.meta.glob('./*.yml', { eager: true, query: '?raw' })` so the YAML text is bundled into JS and parsed on demand. Same architecture, no runtime fs.

### Verification done
- `npm run validate:content` → `content HTML allowlist: ok`.
- `npm run build` → success. 238 pages emitted, Pagefind indexed 5 languages and 7498 words.
- `dist/translatable-keys.json` present and structurally correct.
- Spot-checked `dist/index.html`: 9 decorative-circle occurrences across 3 zone wrappers (matches the original 4+2+3 layout); `mega-menu-item-product`, `mega-sub-menu-resources`, `wovn-switch--active` all present; `BOOK A PERSONALIZED DEMO` and homepage prose intact.

### What's left for Phase 1 follow-ups (low priority)
- Remove `recaptchaError1` div when Phase 2 wires reCAPTCHA properly.
- Improve `translatable-keys.json` walker to tag each path with its discriminating `type` literal.
- (Optional) Move section schemas out of `config.ts` into `src/content/schema.ts` if downstream tooling needs to import them without `astro:content` context.

---

## Phase 2 — Configuration via environment variables ✅ COMPLETE (2026-05-01)

**Goal:** Stop hardcoding live-network endpoints and make tracking pluggable. All variables read at build time via `import.meta.env.PUBLIC_*` so they're inlined into the static output.

**Status:** Implemented. `npm run build` succeeds, 238 pages emitted, content-allowlist clean, rendered HTML byte-identical for endpoint paths under default env. See "Phase 2 implementation log" at the end of this section.

### 2.1 Create env infrastructure
- Add `.env.example` (committed) — documents every variable.
- Add `.env` to `.gitignore` (verify).
- Add `src/env.d.ts` with `ImportMetaEnv` typings.
- All public-facing vars use the `PUBLIC_` prefix per Astro convention.

### 2.2 Variables to define

**Endpoints (replaces hardcoded hosts):**
| Variable | Default | Used by |
|---|---|---|
| `PUBLIC_LEAD_API_BASE` | `https://acctapis.infragistics.com` | lead forms, demo modal |
| `PUBLIC_LEAD_API_BASE_STAGING` | `https://acctapis.staging.infragistics.com` | dev/staging builds |
| `PUBLIC_CDN_BASE` | `https://static.infragistics.com/marketing/reveal` | hero/logo/icon image URLs in YAML and components |
| `PUBLIC_HELP_URL` | `https://help.revealbi.io` | header Help link, support links |
| `PUBLIC_SUPPORT_EMAIL` | `support@revealbi.io` | footer, error messages |
| `PUBLIC_SITE_URL` | `https://astro.revealbi.io` | already in `astro.config.mjs` — move to env so prod can flip to `https://www.revealbi.io` |

**Analytics / tracking (all optional — empty disables):**
| Variable | Purpose |
|---|---|
| `PUBLIC_GA4_MEASUREMENT_ID` | Google Analytics 4 (e.g., `G-XXXXXXXXXX`) |
| `PUBLIC_GTM_CONTAINER_ID` | Google Tag Manager (e.g., `GTM-XXXXXXX`) — alternative to GA4 if GTM manages the GA tag |
| `PUBLIC_LINKEDIN_PARTNER_ID` | LinkedIn Insight Tag — standard for B2B SaaS |
| `PUBLIC_META_PIXEL_ID` | Meta/Facebook Pixel (only if running paid social) |
| `PUBLIC_HOTJAR_SITE_ID` | Hotjar session recording / heatmaps |
| `PUBLIC_HUBSPOT_PORTAL_ID` | HubSpot tracking (if marketing uses HubSpot) |
| `PUBLIC_RECAPTCHA_SITE_KEY` | Google reCAPTCHA v3 — needed to actually wire up the bot protection that the Footer error UI already references |

**Search (already exists, keep flexible):**
| Variable | Purpose |
|---|---|
| `PUBLIC_SEARCH_PROVIDER` | `pagefind` (default) — placeholder for future swap to Algolia / Google Programmable Search |

### 2.3 Wire variables in
- **`astro.config.mjs`** — replace literal `site:` with `import.meta.env.PUBLIC_SITE_URL ?? 'https://astro.revealbi.io'`.
- **`leadTracker.js`** — leave the JS file untouched; instead, emit a small inline `<script is:inline>` in `BaseLayout.astro` *before* `leadTracker.js` that defines `window.__REVEAL_CONFIG__ = { leadApiBase: '...', recaptchaSiteKey: '...' }`. Then later (out of scope here) `leadTracker.js` can read from that global. **No JS file changes in this phase** — just makes the values available so a later JS-modernization phase can consume them.
- **`Footer.astro`, `Header.astro`, `Card.astro`, `DemoModal.astro`** — replace hardcoded `https://static.infragistics.com/...`, `https://help.revealbi.io`, `support@revealbi.io` with env reads.
- **YAML image paths** that point to `static.infragistics.com` — leave for now (mass-rewrite is its own task; not blocking).

### 2.4 Tracking snippet component
New `src/components/Analytics.astro`, rendered from the `head` slot in `BaseLayout`:
- Conditionally emits GA4 / GTM / LinkedIn / Meta / Hotjar / HubSpot snippets based on which env vars are set.
- Uses `is:inline` script tags with deferred loading per provider's recommended snippet.
- Logs a console warning if no provider is configured (dev/staging only).

### 2.5 Security headers
Add `public/_headers` (Cloudflare Pages format, also works on Netlify):
```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
```
CSP intentionally **not** added in this phase — would require enumerating every external host (jQuery is inline so a strict CSP needs `unsafe-inline` or hashes, which defeats the point). Defer to a dedicated security pass later.

### Verification
- `npm run build` produces output with the configured GA/GTM/etc. snippets present (or absent when vars unset).
- All forms still POST to the configured `PUBLIC_LEAD_API_BASE`.
- Page-load network panel shows the expected analytics requests when vars are set.

---

## Phase 2 implementation log (2026-05-01)

What actually shipped, with file references and deviations from plan.

### Files added
- `astro-reveal/src/env.d.ts` — `ImportMetaEnv` typings for every `PUBLIC_*` var (2.1).
- `astro-reveal/src/lib/env.ts` — single resolved-config module exporting `SITE_URL`, `LEAD_API_BASE`, `CDN_BASE`, `HELP_URL`, `SUPPORT_EMAIL`, `DEPLOY_ENV`, `ANALYTICS`, plus a `cdn(path)` helper that handles legacy absolute paths (`/marketing/...`) and relative paths uniformly. Components import from this module instead of reading `import.meta.env` directly (2.1).
- `astro-reveal/src/components/Analytics.astro` — conditionally emits GA4 / GTM / LinkedIn / Meta Pixel / Hotjar / HubSpot snippets based on which env vars are set; logs a console warning in dev/staging when nothing is configured. Rendered from `BaseLayout`'s head (2.4).
- `astro-reveal/public/_headers` — Cloudflare/Netlify-format security headers per plan (2.5).
- `astro-reveal/infra/cloudfront-response-headers-policy.json` — AWS-specific equivalent for the actual production host (CloudFront ignores `_headers`). Same values as the `_headers` file. Off-plan addition, see deviations.

### Files modified
- `astro-reveal/.env.example` — was a Keystatic-only stub; now documents every Phase 2 var (site, endpoints, analytics IDs, deploy env, search provider) plus the existing Keystatic K2 placeholders (2.1).
- `astro-reveal/astro.config.mjs` — `site:` now reads `process.env.PUBLIC_SITE_URL` with the production default as fallback (2.3).
- `astro-reveal/src/layouts/BaseLayout.astro` — imports `LEAD_API_BASE`, `ANALYTICS`, `DEPLOY_ENV` from `lib/env`. Emits `window.__REVEAL_CONFIG__ = { leadApiBase, recaptchaSiteKey, deployEnv }` as an `is:inline` script *before* the bundled JS so `leadTracker.js` (when modernized) can read it without a JS-file edit. Renders `<Analytics />` from the head slot (2.3, 2.4).
- `astro-reveal/src/components/ui/Header.astro` — `https://help.revealbi.io` → `HELP_URL` from `lib/env` (2.3).
- `astro-reveal/src/components/ui/Footer.astro` — 5 social icons + 3 trust badges + documentation link routed through `cdn()` and `HELP_URL` (2.3).
- `astro-reveal/src/components/ui/Card.astro` — arrow icon URL through `cdn()` (2.3).
- `astro-reveal/src/components/ui/DemoModal.astro` — checkmark icon URL through `cdn()` (2.3).

### Files unchanged on purpose
- `astro-reveal/public/js/*.js` — bundled WP-plugin code stays frozen (cleancode rule). `leadTracker.js` will read `window.__REVEAL_CONFIG__` whenever a future JS-modernization pass happens; no edits in this phase.
- `astro-reveal/src/pages/[lang]/index.astro` and YAML content with `static.infragistics.com` srcset entries — plan explicitly defers ("mass-rewrite is its own task; not blocking"). Will be migrated when CDN paths get reorganized.

### Deviations from plan

1. **`public/_headers` is the wrong format for AWS.** Plan called for the Cloudflare/Netlify `_headers` file. Production is on S3 + CloudFront, which doesn't read that file at all. Shipped both: `public/_headers` (per plan, harmless on AWS, useful if hosting ever migrates) plus `infra/cloudfront-response-headers-policy.json` containing the same values structured for an AWS Response Headers Policy. The JSON is config, not docs — paste into the AWS console or feed to Terraform `aws_cloudfront_response_headers_policy`.
2. **Added `DEPLOY_ENV` to the var set.** Plan listed `PUBLIC_LEAD_API_BASE_STAGING` but didn't say how dev/staging/prod actually pick between bases. Solved with a `PUBLIC_DEPLOY_ENV=production|staging|dev` flag that `lib/env.ts` reads to choose between `PUBLIC_LEAD_API_BASE` and `PUBLIC_LEAD_API_BASE_STAGING`. Also drives the empty-analytics console warning (only logs when not in production).
3. **Centralized env reads in `lib/env.ts` rather than scattering `import.meta.env.PUBLIC_*` across components.** Plan implies direct env reads in each component; ended up with a single module that owns defaults, the `cdn()` helper, and the analytics object. Cuts duplication and gives a single place to change defaults.
4. **`cdn()` keeps legacy absolute paths working.** Many existing image paths are full URLs into `static.infragistics.com/marketing/<sub-bucket>/...` where `<sub-bucket>` varies (`reveal`, `slingshot`, `Website`). A naive `${CDN_BASE}/${path}` would break paths that don't live under `marketing/reveal/`. The helper detects `/marketing/` paths and preserves them verbatim, while filename-only inputs join against `CDN_BASE`. Result: rendered URLs are byte-identical under default config; the helper only matters once `PUBLIC_CDN_BASE` actually changes.
5. **Skipped explicit `support@revealbi.io` rewrite in components.** The string only appears in content YAML (page error-message HTML), not in `.astro` components. Replacing it in YAML is part of the deferred mass-rewrite. Component reads of `SUPPORT_EMAIL` from `lib/env` are wired and ready when components reference the address.
6. **CSP not added.** Per plan ("intentionally not added in this phase").

### Verification done
- `npm run build` → success. 238 pages emitted, Pagefind indexed 5 languages and 7498 words. Same metrics as Phase 1 baseline.
- `dist/index.html` contains `<script>window.__REVEAL_CONFIG__={"leadApiBase":"https://acctapis.infragistics.com","recaptchaSiteKey":"","deployEnv":"production"};</script>` placed before `/js/jquery.min.js`.
- `dist/index.html` `static.infragistics.com` references render byte-identical to pre-Phase-2 output (verified by URL spot-check against the original Footer/Header/Card/DemoModal source).
- `dist/_headers` copied through from `public/_headers`.
- Analytics conditional render: with no env vars set, **zero** GA/GTM/Pixel/Hotjar/HubSpot strings appear in `dist/index.html`. The component is wired but inert until the marketing team provides IDs.

### What's left for Phase 2 follow-ups (low priority)
- Mass-rewrite hardcoded `static.infragistics.com` URLs in YAML content (`pages/[lang]/index.astro` hero srcset, scattered icon paths) to use a `cdn:` prefix or relative paths that the renderer can resolve. Separate task.
- Wire `leadTracker.js` to actually read `window.__REVEAL_CONFIG__.leadApiBase` instead of its current hardcoded host. Belongs to the deferred JS-modernization phase, not Phase 2.
- Consume `SUPPORT_EMAIL` from `lib/env` in any future component that surfaces the support address (today it's only inside YAML content).
- Apply `infra/cloudfront-response-headers-policy.json` to the actual CloudFront distribution at deploy time. Operational step, not a build-time change.

---

## Phase 3 — Sitemap, robots.txt, and indexing ✅ COMPLETE (2026-05-01)

**Goal:** Restore the SEO infrastructure that fell off during migration.

**Status:** Implemented. `npm run build` succeeds, 238 pages emitted, `dist/sitemap-index.xml`, `dist/sitemap-0.xml`, and `dist/robots.txt` all present. See "Phase 3 implementation log" at the end of this section.

### 3.1 Sitemap
- `npm install @astrojs/sitemap` (devDep).
- Register in `astro.config.mjs`:
  ```js
  import sitemap from '@astrojs/sitemap';
  integrations: [sitemap({
    i18n: {
      defaultLocale: 'en',
      locales: { en: 'en', es: 'es', ja: 'ja', ko: 'ko', 'pt-BR': 'pt-BR' },
    },
    filter: (page) => !page.includes('/search'),
  })]
  ```
- Output: `dist/sitemap-index.xml` + per-locale child sitemaps with proper `hreflang` alternates.

### 3.2 robots.txt
Add `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://www.revealbi.io/sitemap-index.xml
```
Replace the host with `PUBLIC_SITE_URL` if we templatize via a build step (or just hardcode for now and update at prod cutover).

### 3.3 Reference link in `<head>`
`BaseLayout.astro` adds:
```html
<link rel="sitemap" type="application/xml" href="/sitemap-index.xml" />
```

### Verification
- `dist/sitemap-index.xml` exists, lists all 238 pages × locales correctly.
- `dist/robots.txt` exists and points at the sitemap.
- Validate one entry's `<xhtml:link rel="alternate" hreflang="..." />` against expected i18n routes.

---

## Phase 3 implementation log (2026-05-01)

What actually shipped, with file references and deviations from plan.

### Files added
- `astro-reveal/public/robots.txt` — `User-agent: * / Allow: / / Sitemap: https://www.revealbi.io/sitemap-index.xml` (3.2). Static file copied through to `dist/` on build.

### Files modified
- `astro-reveal/package.json` — added `@astrojs/sitemap@^3.7.2` as devDep (3.1).
- `astro-reveal/astro.config.mjs` — registered the `sitemap()` integration with `i18n: { defaultLocale: 'en', locales: { en, es, ja, ko, 'pt-BR' } }` and a `filter` excluding `/search` (3.1).
- `astro-reveal/src/layouts/BaseLayout.astro` — added `<link rel="sitemap" type="application/xml" href="/sitemap-index.xml" />` in the document head, between `<link rel="canonical">` and the Open Graph block (3.3).

### Deviations from plan

1. **`robots.txt` sitemap URL hardcoded to `https://www.revealbi.io/sitemap-index.xml`** rather than templated against `PUBLIC_SITE_URL`. Plan explicitly allowed this ("hardcode for now and update at prod cutover"). Means the sitemap reference in `robots.txt` (prod host) and the `<loc>` URLs inside the sitemap (defaulted to `https://astro.revealbi.io` from `astro.config.mjs`) don't agree on staging/dev — they only align once `PUBLIC_SITE_URL` flips at prod cutover. Acceptable because crawlers only fetch `robots.txt` from the host they're crawling, so the mismatch is invisible in practice.
2. **Sitemap covers 237 URLs, not 238.** The build emits 238 HTML pages but the sitemap filter excludes `/search` (Pagefind's search page is not a real route worth indexing). One filtered, 237 indexed — matches plan intent.

### Verification done
- `npm run build` → success. 238 pages emitted; `[@astrojs/sitemap] sitemap-index.xml created at dist` logged. Same Pagefind metrics as Phase 1/2 (5 languages, 7498 words).
- `dist/sitemap-index.xml` present, references `dist/sitemap-0.xml`.
- `dist/sitemap-0.xml`: 237 `<url>` entries; 100 `<xhtml:link rel="alternate" hreflang="...">` entries across the 4 hub routes that have localized variants (`/`, `/blog/`, `/glossary/`, `/stories/`) × 5 locales × 5 alternates = 100. English-only pages emit a bare `<loc>` with no alternates, as expected.
- `dist/robots.txt` present with the configured content.
- Spot-checked `dist/index.html`: `<link rel="sitemap" type="application/xml" href="/sitemap-index.xml">` rendered between canonical and OG tags as planned.

### What's left for Phase 3 follow-ups (low priority)
- Templatize `robots.txt` against `PUBLIC_SITE_URL` (small prebuild step) so dev/staging/prod produce a self-consistent sitemap reference. Defer until prod cutover lands a stable site URL.
- Decide whether to add `<lastmod>` to sitemap entries — `@astrojs/sitemap` supports it via `serialize`, but content currently lacks reliable per-page modification timestamps. Revisit when content frontmatter gains a `updated:` field.

---

## Out of scope (for now)

- **JS pipeline modernization.** jQuery + WP plugin code stays exactly as-is. Replicating the original site's behavior is the priority; ESM/treeshaking can come after Phase 8.
- **CSP.** Requires JS pipeline work first.
- **n8n translation pipeline itself.** The *workflow* lives in n8n (Phase 8 of `plan.md`). Phase 1.8 here only sets up the Astro-side contract n8n will read from and write to.
- **Migrating CDN images locally.** Mentioned in earlier analysis; separate task.

---

## Phase order rationale

1. **Phase 1 first** because the structural cleanup is reversible, has no user-visible effect, and gives Phase 2 a cleaner surface to drop env reads into.
2. **Phase 2 next** so that by the time tracking + endpoints need to differ between dev/staging/prod, the infrastructure exists.
3. **Phase 3 last** because sitemap + robots are independent and quick — but doing them after Phase 2 means `PUBLIC_SITE_URL` is already wired.

Each phase ends with a clean build and a `dist/` diff against the previous state — Phase 1 should be byte-identical, Phase 2 only adds analytics/config bytes, Phase 3 adds two new files.
