# Reveal Embedded Analytics — marketing site (Astro rebuild)

Static Astro 6 build of the Reveal Embedded Analytics marketing site, replacing the legacy WordPress site. **Live in production** at `www.revealbi.io` (AWS S3 + CloudFront, indexable). The legacy WordPress site has been retired to `old.revealbi.io`. A noindexed integration copy runs at `astro-staging.revealbi.io`.

> **First time here?** Read this file top to bottom, then skim [`docs/handoff/outstanding-work.md`](docs/handoff/outstanding-work.md) for the current punchlist. The `CLAUDE.md` at the repo root is the authoritative source for the git/PR workflow and has a condensed orientation map.

---

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Astro 6 (`^6.1.10`) | `output: 'static'`, no SSR adapter |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) | + ported WP CSS in `src/styles/` for parity |
| JS on the page | Frozen WP jQuery bundle (~5,800 lines) | No framework runtime; 14 files in `public/js/` (jquery, jquery-migrate, plugins, menu, script, tooltips, polyfills, leadTracker, sf.common, downloadUtility, maxmegamenu, maxmegamenu-pro, reveal-accordion, reveal-expandable-table) |
| CMS | Sveltia (browser, File System Access API) | Admin shell: `public/admin/` |
| Search | pagefind | Built into `npm run build` |
| Translation | n8n → LLM (`gemma4:31b` via Ollama) → GitHub PUT | Workflow: `n8n/ja-translation.json` |
| Hosting | AWS S3 + CloudFront | Auto-deploy via GitHub Actions: `staging` branch → staging site, `main` branch → production |
| Asset CDN | `static.infragistics.com/marketing/reveal` | `PUBLIC_CDN_BASE`; newer images served from CDN rather than `public/images/` |

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:4321
```

Then open the CMS at `http://localhost:4321/admin/` (Chromium-only — uses the File System Access API). Click "Work with Local Repository" → pick the repo root → edit any of the 72 EN pages with structured forms per section type.

> **WSL users:** node is not available inside WSL on this project's setup. Run from Windows PowerShell or call `/mnt/c/Program\ Files/nodejs/node.exe` directly. Build commands (`npm run build`, `npm run dev`) live on the Windows side.

---

## Project layout

```
Marketing-Reveal/
├── .github/workflows/      # GitHub Actions: deploy (branch-aware), translation
├── docs/                   # Project documentation (see docs/README.md)
├── infra/                  # CloudFront response-headers policy + redirect helper scripts
├── n8n/                    # JA translation workflow JSON
├── parity/                 # Parity harness: wget-mirror snapshots + per-page verdicts
├── parity-tracking.md      # Page-by-page parity status (repo root, not under docs/)
├── public/                 # ~293 MB
│   ├── admin/              # Sveltia CMS shell (index.html + config.yml)
│   ├── images/             # ~224 MB — wholesale port of WP /wp-content/uploads
│   ├── js/                 # 14 frozen WP-era JS files (jQuery, megamenu, leadTracker…)
│   ├── fonts/              # Self-hosted webfonts
│   └── _headers            # Cloudflare/Netlify parity (CloudFront ignores)
├── scripts/                # ~39 mjs helpers — content validation, locale/blog extraction, sitemaps, parity tooling
├── src/
│   ├── components/
│   │   ├── sections/       # ~64 typed section components (Hero, FeatureRow, FAQ, …)
│   │   ├── ui/             # Header, Footer, DemoModal, GdprBanner, Card, header/*
│   │   ├── Analytics.astro # Env-gated GA4/GTM/LinkedIn/Meta/Hotjar/HubSpot/reCAPTCHA/PageSense snippets
│   │   └── SectionRenderer.astro  # Single dispatcher mapping section.type → component
│   ├── content.config.ts   # Zod schemas + ~63-type discriminated union for `sections[]`
│   ├── content/
│   │   ├── pages/{en,es,ja,ko,pt-BR}/  # 72 EN + 67 each ES/JA/KO/PT-BR sectioned pages
│   │   ├── blog/{en,es,ja,ko,pt-BR}/   # 109 EN posts (+ locale translations)
│   │   ├── glossary/en/    # 24 entries (EN only)
│   │   ├── stories/en/     # 10 (EN only)
│   │   ├── whitepapers/en/ # 21 (EN only)
│   │   └── webinars/en/    # 55 (EN only)
│   ├── i18n/               # en|es|ja|ko|pt-BR.yml chrome strings + index.ts deep-merge fallback
│   ├── layouts/            # BaseLayout, BlogLayout, LandingLayout, WhitepaperLayout
│   ├── lib/                # env.ts, href.ts (locale-aware links), blog.ts, blog-authors.ts, render-markdown.ts, seo.ts, whitepaper-i18n.ts
│   ├── pages/              # Astro routes — see Routing below
│   └── styles/             # Tailwind entry + ported WP bundles (navigation, sections, ig-modal, tiny-slider, fonts, tooltips)
├── astro.config.mjs        # static output, 5-locale i18n routing, tailwind via vite/postcss
├── package.json
├── tsconfig.json           # extends astro/tsconfigs/strict
├── DEPLOY.md               # AWS infra + GitHub secrets setup
├── CLAUDE.md               # Git/PR workflow rules + orientation map (read this)
├── .env.staging            # Public env values for the staging build (committed)
├── .env.production         # Public env values for the production build (committed)
└── .env.example            # All env vars documented (site / endpoints / analytics / search / CDN)
```

> **Note:** `src/content.config.ts` is at `src/`, not `src/content/config.ts` (Astro 6 content-config location).

---

## Content model

The site runs on a **section-dispatcher pattern**. Every page in `src/content/pages/<lang>/<slug>.md` has YAML frontmatter with a `sections: []` array. `SectionRenderer.astro` reads each `section.type` and renders the matching component from `src/components/sections/`.

The schema in `src/content.config.ts` is a `z.discriminatedUnion('type', [...])` over ~63 typed section schemas. Every translatable field is annotated:

```ts
const t     = (s) => s.describe('translatable')        // plain text
const tHtml = (s) => s.describe('translatable-html')   // body HTML, sanitized to allowlist
const asset = (s) => s.describe('asset')               // image/video path — never translated
```

These annotations drive `dist/translatable-keys.json` (built from `src/pages/translatable-keys.json.ts`), which the n8n pipeline consumes so it doesn't have to re-derive the schema. Adding a new section type or a new translatable field on an existing one is a one-line change that automatically propagates to the translation pipeline.

**Routing:**
- EN routes: `pages/index.astro`, `pages/[slug].astro`, `pages/{blog,glossary,stories,whitepapers,webinars,events}/{index,[slug]}.astro`.
- Blog has pagination + category routes: `blog/page/[page].astro`, `blog/category/[cat].astro`, `blog/category/[cat]/page/[page].astro`; webinars has `webinars/page/[page].astro`.
- Several pages have dedicated route files for nested or special slugs: `embedded-analytics.astro`, `in-the-news.astro`, `licenses.astro`, `reveal-navigation.astro`, `pricing/embedded-analytics.astro`, `license-agreements/{index,embedded-sdk,reveal-saas}.astro`.
- Non-EN routes: `pages/[lang]/index.astro`, `pages/[lang]/[slug].astro`, plus per-collection `[lang]/<col>/[slug].astro` shims (e.g. `[lang]/pricing/embedded-analytics.astro`). Falls back to the EN entry if a locale is missing a page.
- Internal-link locale rewriting is centralized in `src/lib/href.ts` (`localizedHref()`) — used by Header, Footer, DemoModal.

---

## Editing content

Open `http://localhost:4321/admin/` in Chromium (Chrome / Edge / Brave). Click **Work with Local Repository** → pick the repo root.

`public/admin/config.yml` configures three collections, each with Sveltia's built-in i18n (`i18n: true`, `locales: [en, es, ja, ko, pt-BR]`):

| Collection | Create/Delete | Notes |
|---|---|---|
| `pages` | `create: false` | Sectioned marketing pages; EN is source of truth, non-EN locales auto-generated by n8n |
| `blog` | `create: true` | Blog posts |
| `whitepapers` | `create: true` | Whitepaper entries |

The EN page field schema is defined once via a YAML anchor (`&pages_fields`) and shared across locales through Sveltia's i18n model — single source of truth, no copy-paste drift. Glossary, stories, webinars and events are edited as files (no dedicated CMS collection).

> **Saves write to local files** via the File System Access API. Commit and push manually from the terminal once you're happy.

---

## Translation pipeline (n8n)

The JA translation workflow is checked in at `n8n/ja-translation.json`. It walks `src/content/pages/en/`, finds files with no `ja/` counterpart, sends each through an Ollama-hosted LLM (`gemma4:31b`) with a translation prompt, and PUTs the result back to GitHub. A parallel branch translates new keys in `src/i18n/en.yml` into `src/i18n/ja.yml`. When both branches finish, it fires a `repository_dispatch` of type `translation-complete` to trigger `.github/workflows/translation.yml`.

- **Spec:** [`docs/n8n/contract.md`](docs/n8n/contract.md) — what gets translated, what stays verbatim, HTML allowlist, frontmatter rules
- **Troubleshooting:** [`docs/n8n/knowledgebase.md`](docs/n8n/knowledgebase.md) — recorded LLM failure modes and the defensive transforms in the `Encode Page Output` Code node

**Write-ownership convention:**
- `en/` → editor (Sveltia / human)
- `{es,ja,ko,pt-BR}/` → n8n only
- A single commit should not touch both EN and a generated locale.

**Localization status:**
- **Pages:** all four non-EN locales are populated (67 pages each in ES/JA/KO/PT-BR).
- **Blog:** translated locale directories exist under `src/content/blog/` for es/ja/ko/pt-BR.
- **Chrome strings (`src/i18n/*.yml`):** EN (~200 keys) and JA (~193) are complete; **ES/KO/PT-BR are still stubs** (~5 lines each) — the UI chrome for those locales falls back to EN via `src/i18n/index.ts`.

The pipeline is locale-agnostic; cloning the workflow with a different `lang` target swaps it.

---

## Build & deploy

**Local build** (`npm run build`) runs this pipeline in order:
```
1. node scripts/validate-content.mjs          — HTML allowlist enforcement
2. node scripts/extract-locale-blog-posts.mjs — split locale blog content
3. astro build                                — Zod schema validation + static output
4. node scripts/fix-locale-css-refs.mjs       — rewrite locale CSS references
5. node scripts/normalize-trailing-slash.mjs  — trailing-slash normalization
6. pagefind --site dist                        — search index
7. node scripts/build_sitemaps.mjs            — sitemaps (5 locales, hreflang)
```

**Branching model** (see `CLAUDE.md` for the authoritative workflow):
- `staging` — integration branch. All feature work flows through here.
- `main` — production. Promoted from `staging` via PR. Never PR directly into `main` except the `staging → main` release.
- After each `staging → main` release, open a `main → staging` sync PR (mandatory — see `CLAUDE.md`).
- Feature branches use descriptive prefixes off `staging`: `fix/<...>`, `feat/<...>`, `refactor/<...>`, `task/<...>`.

**Workflow per change:**
1. Branch off `staging`: `git checkout staging && git pull && git checkout -b fix/my-thing`
2. Commit, push, open a PR back to `staging` (GitHub often defaults the target to `main` — change it manually)
3. Merge once green; the staging deploy fires automatically
4. Promote `staging` → `main` with a separate PR when ready to ship to production

**CI deploys** (one branch-aware workflow):

| Workflow | Trigger | Environment | Site |
|---|---|---|---|
| `.github/workflows/deploy.yml` | push to `staging` | `staging` | `astro-staging.revealbi.io` |
| `.github/workflows/deploy.yml` | push to `main` | `production` | `www.revealbi.io` |
| `.github/workflows/translation.yml` | n8n `repository_dispatch` (`translation-complete`) | `staging` | staging only — promoted to prod via the next staging→main PR |

`deploy.yml` picks the GitHub Actions environment and `.env.<env>` file from `github.ref_name`, so the same code produces different artifacts per target. Steps after build are identical: `aws s3 sync dist/` (long-cache for assets, no-cache for HTML/XML/JSON) → `aws cloudfront create-invalidation --paths "/*"`.

**GitHub Actions environments — required secrets:**

Two environments in **Settings → Environments**: `staging` and `production`. Each needs its own scoped secrets:

| Secret | `staging` value | `production` value |
|---|---|---|
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | IAM user (or role) for the staging bucket | IAM user (or role) for the prod bucket |
| `S3_BUCKET_NAME` | staging bucket | prod bucket |
| `CLOUDFRONT_DISTRIBUTION_ID` | staging distribution | prod distribution |

Public env values (site URL, deploy env, noindex flag, analytics IDs, CDN base) live in the committed `.env.staging` / `.env.production` files — not in secrets. Anything that should differ between the two environments belongs in those files; nothing environment-specific should ship in component / content / JS code.

See [`DEPLOY.md`](DEPLOY.md) for the full one-time AWS setup.

**URL / trailing-slash routing** is handled by CloudFront Functions in AWS (not in this repo), plus the `normalize-trailing-slash.mjs` build step. Prod serves both `/foo` and `/foo/` without a redirect and preserves UTM params.

**Security headers:** apply [`infra/cloudfront-response-headers-policy.json`](infra/cloudfront-response-headers-policy.json) as a CloudFront Response Headers Policy. Includes HSTS, X-Frame-Options, Referrer-Policy, X-Content-Type-Options, Permissions-Policy. **CSP is intentionally omitted** — the WP-era jQuery bundle is inline; a strict CSP needs `unsafe-inline` or per-tag hashes. Defer to a dedicated security pass. The `public/_headers` file mirrors these for Cloudflare Pages / Netlify parity but is ignored by CloudFront.

---

## Production status & environment switches

The site is **live** at `www.revealbi.io`. The split-environment workflow means shipping is just a `staging` → `main` PR — no code edits, no manual file flips. The noindex meta tag and `robots.txt` body read from `PUBLIC_NOINDEX` (1 in `.env.staging`, 0 in `.env.production`), so indexing flips automatically with the build target.

Current `.env.production` analytics wiring:

| Var | Status |
|---|---|
| `PUBLIC_GTM_CONTAINER_ID` | set (`GTM-WXWCMQZ`) — live |
| `PUBLIC_RECAPTCHA_SITE_KEY` | set — live |
| `PUBLIC_GA4_MEASUREMENT_ID`, `PUBLIC_LINKEDIN_PARTNER_ID`, `PUBLIC_META_PIXEL_ID`, `PUBLIC_HOTJAR_SITE_ID`, `PUBLIC_HUBSPOT_PORTAL_ID` | empty — each snippet stays disabled until its env var is filled |
| `PUBLIC_LEAD_API_BASE` | empty — `leadTracker.js` uses legacy hostname-based auto-routing |

> **Lead API host.** `PUBLIC_LEAD_API_BASE` is empty in both env files so `leadTracker.js` falls back to its legacy hostname-based auto-routing (`staging.infragistics.com` for staging hosts, otherwise `www.infragistics.com`). Lead-tracking events post to `PUBLIC_LEAD_TRACKING_PATH` (`https://www.infragistics.com/api/leadtrackingevents/track`). See `docs/handoff/tracking-and-analytics.md` "Endpoint mismatch" note before changing this.

---

## Outstanding work

Categorized punchlist in [`docs/handoff/outstanding-work.md`](docs/handoff/outstanding-work.md). Headlines:

- **Tracking & analytics:** remaining provider IDs (GA4, LinkedIn, Meta, Hotjar, HubSpot) get filled into `.env.production` as marketing supplies them; each is env-gated and off until then.
- **Parity:** page-by-page status tracked in [`parity-tracking.md`](parity-tracking.md) (repo root) with per-page verdicts under [`parity/`](parity/).
- **CMS production deploy:** GitHub OAuth + hosted `/admin` deferred until a non-developer needs to edit through a browser they don't control.
- **Localization chrome strings:** ES/KO/PT-BR `src/i18n/*.yml` are still stubs (pages and blog are translated; UI chrome falls back to EN).
- **Performance:** raw `<img>` → Astro `<Image>` for webp/avif on the large asset pile; intentionally deferred during parity work to keep the visual diff clean.
- **Lead-form consent gating:** `leadTracker.js` doesn't read `IGconsentMode` — legal exposure once GA wires for EU.

---

## Things that look unusual but are intentional

- **Frozen jQuery bundle.** `public/js/*.js` is the WP era's jQuery + plugin code (megamenu, leadTracker, sf.common, etc.), plus a couple of reveal-specific helpers (`reveal-accordion.js`, `reveal-expandable-table.js`). Not bundled, not modernized. The visual/behavioral parity goal required exact replica; rewriting would be a separate project.
- **Wholesale image port** — the WP `/wp-content/uploads` tree was committed straight into `public/images/` with the same folder structure, so WP-source image URLs work unchanged. Newer assets are served from the CDN (`PUBLIC_CDN_BASE`) instead. No conversion to webp yet (post-launch task).
- **Tailwind v4 + WP CSS coexist.** New components use Tailwind utilities; ported WP styling sits in `src/styles/{navigation,sections,ig-modal,tooltips,fonts,tiny-slider}.css`.
- **Inline analytics snippets.** `src/components/Analytics.astro` emits provider-recommended inline snippets (GA4, GTM, LinkedIn, Meta, Hotjar, HubSpot, reCAPTCHA, PageSense). Each block renders only when its env var is set. Empty = disabled. This matches what marketing's tag manager docs expect and avoids the "GTM-loads-everything" trap.
- **Consent Mode v2 default-deny** in `BaseLayout.astro` runs *before* `<Analytics />` so when GA4/GTM eventually load they respect EU consent law from the first paint. See [`docs/handoff/gdpr-consent.md`](docs/handoff/gdpr-consent.md).
- **`output: 'static'`, no Node adapter.** The CMS works in the browser via File System Access API; no server-side admin to host. Deployed admin (S3) is the same static `index.html` + `config.yml`.
- **Parity scripts reference a wget mirror.** `scripts/cascade-*.mjs`, `refresh-bodies-A.mjs`, etc. reference `../www.revealbi.io/` — a wget snapshot of the legacy WP site (now retired to `old.revealbi.io`), not committed here. Scripts are shipped as evidence of how the parity work was done; running them needs the wget mirror at the parent dir.

---

## Pointers

- [`CLAUDE.md`](CLAUDE.md) — git/PR workflow rules (authoritative) + orientation map
- [`docs/README.md`](docs/README.md) — full docs index
- [`docs/handoff/`](docs/handoff/) — cutover checklist, outstanding work, tracking/analytics, GDPR consent, noindex switch, lead-tracker summary
- [`docs/n8n/contract.md`](docs/n8n/contract.md) / [`knowledgebase.md`](docs/n8n/knowledgebase.md) — translation pipeline contract + troubleshooting
- [`docs/cms/status.md`](docs/cms/status.md) — Sveltia phase status
- [`docs/seo/`](docs/seo/) — SEO passes (baselayout, schema/sveltia, JSON-LD, content port, parity-vs-revealbi)
- [`docs/history/`](docs/history/) — original migration plan, cleancode plan, session logs
- [`parity-tracking.md`](parity-tracking.md) + [`parity/`](parity/) — page-by-page parity status and per-page verdicts
