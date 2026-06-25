# Outstanding work

Categorized punchlist of everything that's not yet done. Each item: status, where to look, rough effort, blocker.

---

## Tracking & analytics — Phase 4 + Phase 5

**Status:** Phases 1–3 ✅ complete. Phase 4 (production env values) blocked on marketing handoff. Phase 5 (end-to-end smoke test) blocks on Phase 4.

**Effort:** ~30 minutes once values are in hand.

**Where the values land:** `.env.production`. The committed `.env.staging` stays empty so we don't pollute the prod GA stream during staging traffic.

**Detail:** [`tracking-and-analytics.md`](tracking-and-analytics.md). The doc breaks the work into 5 phases — 1 (templatize robots.txt), 2 (leadTracker reads `__REVEAL_CONFIG__`), 3 (reCAPTCHA + 6-form wiring) all done. 4 and 5 remain.

---

## Parity — long-tail page review

**Status:** ~100 of ~250 English pages signed off; ~150 still pending review.

**Tracker:** [`../parity/tracking.md`](../parity/tracking.md). Every page row carries reference quality (chrome-save / wget / none), diff status, fix status, and notes.

**Done:**
- ✅ Homepage
- ✅ 19 industry verticals (B1: banking-analytics, crm-analytics, crypto-analytics, education-analytics, embedded-analytics-statistics, energy-analytics, finance-analytics, healthcare-analytics, insurance-analytics, isv-analytics, it-analytics, manufacturing-analytics, mining-analytics, on-prem-analytics, real-estate-analytics, retail-analytics, supply-chain-analytics, telecommunications-analytics, white-label-analytics)
- ✅ 14 vs-competitor pages (B2: reveal-vs-power-bi, reveal-vs-tableau, reveal-vs-looker, reveal-vs-sisense, reveal-vs-domo, reveal-vs-metabase, reveal-vs-gooddata, reveal-vs-thoughtspot, reveal-vs-logi-analytics, reveal-vs-luzmo, reveal-vs-qrvey, reveal-vs-bold-bi, reveal-vs-panintelligence, reveal-vs-toucan-toco)
- ✅ 4 unique-product (B3: features, ai, pricing, embedded-analytics)
- ✅ 17 unique-layout (C: about-us, annual-survey-2026, careers, chart-types, cookie-policy, data-sources, download-sdk, empowering-partners, faq, licenses, partners, privacy-policy, request-demo, survey-2025, security, support-policies, terms-of-use)

**Pending:**
- ⚪ 107 blog posts (A1)
- ⚪ 23 glossary entries (A2)
- ⚪ 9 stories (A3) — 1 already done
- ⚪ 21 whitepapers (A4)
- ⚪ 1 webinar (A5)

**Methodology:** [`../parity/per-page-walk.md`](../parity/per-page-walk.md). Definition-of-done: frontmatter exact, body content exact (every `<p>`, `<h2>`–`<h4>`, list, table, figure preserved), sidebar where applicable, internal links resolved to pretty slugs, no alert/badge stripping.

**Blog idea (not yet attempted):** the developer mentioned a possible WP-admin-export path to bulk-extract the 107 blog posts in one shot rather than one-by-one. Worth exploring before grinding through manually.

---

## CMS — Sveltia S3 + S4 deferred

**Status:** Local dev workflow is feature-complete (S0/S1/S2/A/B/D done — see [`../cms/status.md`](../cms/status.md)). S3 (GitHub OAuth) + S4 (production deploy of `/admin`) deferred until a non-developer needs to edit through a browser they don't control.

**Effort:** S3 ~1–3h (try Device Flow first; fall back to a Cloudflare Worker OAuth proxy if not). S4 ~1h (it's just `aws s3 sync` + a short CloudFront TTL on `/admin/*`).

**Why deferred:** today's editor is the developer, and the File System Access API works fine in local Chromium. No urgency.

---

## Localization — ES / KO / PT-BR

**Status:** JA fully populated end-to-end. ES/KO/PT-BR have `src/i18n/<lang>.yml` chrome-string stubs only — no `src/content/pages/<lang>/` directories yet.

**To unblock:** clone `n8n/ja-translation.json` per locale, change the `lang` parameter from `ja` to the target, point at the new `<lang>/` directory. The pipeline is locale-agnostic — no code changes needed in this repo.

**Code is already locale-agnostic:**
- `astro.config.mjs:23` declares all 5 locales
- `src/i18n/index.ts` deep-merges per-locale YAML over EN with sensible fallbacks
- `src/lib/href.ts` rewrites internal links across all 5 locales
- `public/admin/config.yml` already has `pages_es / pages_ko / pages_pt_br` collections (read-only) ready to render once the files exist

---

## Performance post-launch — image pipeline

**Status:** `public/images/` is 191 MB of raw PNG/JPG, no webp/avif, no `<Image>` component. Intentional during the parity phase to keep the WP-vs-built visual diff honest.

**Effort:** convert all `<img>` references to Astro's built-in `<Image>` component. Astro handles webp/avif transcoding + dimension hints + lazy loading.

**Win:** large. 191 MB → estimated ~30–50 MB after webp on the photo-heavy folders (2020–2026). LCP and CLS both improve.

**Risk:** breaks parity diffs on pages still in review. Schedule for post-launch, after the parity tracker is fully ✅.

---

## Lead-form consent gating — legal gap

**Status:** `public/js/leadTracker.js` doesn't read `IGconsentMode` — submits regardless of the user's GDPR choice.

**Risk:** legal exposure once GA wires for EU visitors. Currently dormant because GA isn't wired (Phase 4).

**Fix sketch:** at the top of the lead-tracking xhr.send handler, check `localStorage.IGconsentMode` and skip submission (or skip just the marketing-cookie portion of the payload) if the user denied analytics. Coordinate with the Salesforce-side endpoint owner — they may have their own consent-gating or accept a "consent: denied" payload field.

---

## Known small gaps

### `request-demo.md` inline `<script>` block in markdown body

**File:** `src/content/pages/en/request-demo.md` line ~130
**Risk:** n8n's translation pipeline may process strings inside the `<script>` tag on the next non-EN re-translation, mangling the JS.
**Workaround if it breaks:** convert `request-demo` from body-HTML to use the `lead-form` section type, which keeps form config in structured frontmatter where translatable-keys.json already protects non-translatable fields.

### `feature-row.cta` empty-object serialization

**File:** `src/content/config.ts` `featureRowSchema`
**Risk:** when Sveltia saves a `feature-row` section without setting `cta`, the optional object may serialize as `cta: {}` rather than being omitted. Not yet observed in practice (verified on 2026-05-04 round-trip).
**Workaround:** if it appears, normalize on save in Sveltia config or post-save hook.

### `careers.html` lazyrender sections

**File:** `src/content/pages/en/careers.md` ✅ matches in the tracker, but the WP wget reference is missing the bottom three sections because they're WP-Rocket `data-wpr-lazyrender`. The built page captures more content than the reference. Accepted divergence.

### `n8n/ja-translation.json` repo-name references

**Files:** 9 hardcoded URLs to `api.github.com/repos/bsevestakiev/astro-reveal/...`. Will need the find/replace pass when the repo moves — see [`cutover-checklist.md`](cutover-checklist.md) §5.2.

---

## Things worth considering, not blockers

- **CSP header.** Currently omitted because of inline jQuery. Ship a strict-dynamic CSP with per-tag hashes when someone has a day to invest.
- **Accessibility audit.** No formal a11y pass yet — only rough checks during parity review.
- **Bundle the WP-era jQuery code.** Ship a single concatenated/minified bundle instead of 12 `<script>` tags. Render-blocking impact is small but measurable.
- **Replace the WP-frozen `plugins.js` GDPR banner JS** with a lighter homegrown one once the rest of the WP bundle is decommissioned.
- **Pagefind tuning.** Default config; could tune excerpt length, custom weights, language detection.
