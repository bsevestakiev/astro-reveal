# Sonnet-driven parity review — handoff

Last updated: 2026-05-13 (all 6 fixes applied, smoke-tested, awaiting full re-snap+re-review + commits).

## TL;DR for the next session

1. **Read this file end-to-end first.**
2. Check uncommitted changes: `git status -s`. All 6 fixes are uncommitted on `staging` — see "Commit plan" below.
3. Run the **full re-snap+re-review cycle** to refresh every verdict, then regenerate the report.
4. Commit per the suggested split in "Commit plan".

## Current state

| Quantity | Value |
|---|---|
| Total pages reviewed | 246 (1 `/admin/` skipped) |

Verdicts on disk are partially stale — every fix re-snapped/re-reviewed only the smoked sample (3-5 per fix). Run the **full re-snap+re-review cycle** before reading totals from the report.

After fix #1 (the only fix where full totals were captured): 114 match / 51 minor / 81 major / 0 broken. Each subsequent fix flipped its smoked sample MAJOR → MATCH/MINOR; the unsmoked majority of each cohort is expected to track the same way.

## Pipeline scripts

All under `scripts/`. The pipeline is end-to-end runnable with no API key — uses your Claude Code login via `claude -p`.

| Script | Purpose |
|---|---|
| `scrape-original.sh` | wget mirror of `www.revealbi.io` → `../www.revealbi.io/`. Already run; idempotent (timestamp-based skip on re-run). |
| `parity-seed-tracker.mjs` | walks `dist/` → writes `parity-tracking.md` (247 rows). Re-run only if pages are added/removed. |
| `parity-snap.mjs` | spawns local servers, Playwright captures 6 PNGs per page → `parity/snapshots/<slug>/` + `parity/last-run.json`. Default: all `⚪|❌` rows in tracker; `--all` for everything; positional args for specific paths. |
| `parity-review.mjs` | shells out to `claude -p --model sonnet --permission-mode bypassPermissions` per page (concurrency configurable, default 5). Each subagent writes `parity/verdicts/<slug>.json`. Resumable — skips slugs with existing verdicts. |
| `parity-report.mjs` | aggregates `parity/verdicts/*.json` → updates Diff column in `parity-tracking.md` + writes `parity/sonnet-report.md` (text) and `parity/sonnet-report.html` (with embedded screenshots). |

npm scripts: `parity:seed`, `parity:snap`, `parity:report`. (`parity:review` is run directly to allow `--concurrency` / `--only` / `--max` args.)

## Verdict rubric the reviewers use

- **match** — equivalent or differs only by additive content in BUILT (FAQs, testimonials, stats blocks, fuller footer, related-articles, newsletter signup) or state (accordion open/closed). Additive BUILT content goes in `notes`, not `deltas`.
- **minor** — small regression: spacing, color shade, one image swapped. No missing content.
- **major** — ORIGINAL content missing in BUILT, broken layout, wrong copy in headings/CTAs, missing inline body images.
- **broken** — BUILT is unusable.

Confidence is `high|medium|low`. Empty `deltas` ⇒ verdict must be `match`. This prompt was tuned in the smoke phase — do **not** loosen the "additive content is approved" rule without thinking through the side effects.

## Standard workflow per fix

**SMOKE FIRST, BULK SECOND.** This is a hard rule — see `feedback_smoke-test-after-fix.md`. The full snap+review cycle takes 25-35 min per N=51 pages; validating on 3-5 pages catches regressions in ~2 min.

1. Apply the fix (code or content change).
2. `npm run build` — confirm clean build.
3. Pick 3-5 representative slugs from the affected set.
4. `node scripts/parity-snap.mjs /path1/ /path2/ /path3/` — re-snap just those.
5. `rm parity/verdicts/<slug1>.json <slug2>.json …` — remove their stale verdicts.
6. `node scripts/parity-review.mjs --only /path1/ /path2/ ... --concurrency 3` — re-review.
7. **Eyeball** the new verdicts (`cat parity/verdicts/<slug>.json`). If they look right, proceed.
8. Otherwise iterate on the fix and re-smoke.
9. Once smoke is good: re-snap the full set, delete all their old verdicts, re-review, regenerate the report.

Resuming a mid-run review safely: just re-run `parity-review.mjs` — it skips slugs with verdicts already on disk.

## Fix log

### Fix #1 — Blog `heroImage: reveal-fallback-image.svg` (DONE 2026-05-12)

51 blog markdown files had `heroImage:` pointing to `https://www.revealbi.io/wp-content/uploads/2025/08/reveal-fallback-image.svg`. The Astro `BlogLayout` rendered this as a giant blue circle/checkmark in the hero slot. The `cover:` frontmatter field on these files is already correct — so the fix was: strip the broken `heroImage:` line. `heroAsset = heroImage ?? image` (where `image` is passed from `post.data.cover` per `src/pages/blog/[slug].astro:38`) means the layout falls back to the correct image.

Outcome: 31 of 51 pages flipped to MATCH. The other 20 still flag (mostly MAJOR) because those pages also have **fix #2** issues — broken `/wp-content/uploads/…` body images. Removing the giant fallback SVG exposed the body issues more clearly.

Uncommitted git state: 51 modified `src/content/blog/en/*.md` files.

### Fix #2 — WP-era `/wp-content/uploads/…` body paths (DONE 2026-05-13)

88 blog markdown files rewrote 362 image refs from `/wp-content/uploads/YYYY/MM/foo.png` (and the `/../wp-staging.revealbi.io/wp-content/uploads/...` and `../wp-content/uploads/...` variants) to `/images/YYYY/MM/foo.png`.

Implementation:
- The WP XML export at `Scraped Site from XML/revealembeddedanalytics.WordPress.2026-05-11.xml` was fed through the `flowershow/wordpress-to-markdown` tool, which downloaded 1066 images into `../wp-export/output/assets/images/` as a reference manifest.
- `scripts/parity-fix-wp-paths.mjs` walks each blog `.md`, rewrites the WP path to `/images/YYYY/MM/<filename>`, and:
  - If `public/images/YYYY/MM/foo.png` already exists → just rewrite (303 of 362 refs).
  - Else copies `../wp-export/output/assets/images/foo.png` → `public/images/YYYY/MM/foo.png` (59 refs).
- Smoke (3 blogs): MAJOR → MATCH / MATCH / MINOR (the lone MINOR is unrelated hero-gradient styling).

One unfixed edge case: `master-your-data.md` has a malformed nested `.mp3` audio link `[..](url].(url)` that the regex caught but can't resolve cleanly. Audio file, not image — left as-is.

### Fix #3 — Story inline images render as gray placeholders (DONE 2026-05-13)

The WP source used a JS lazy-load pattern: `<img src="...lazy-load.jpg" data-src="<real>.jpg">`. JS swapped them client-side; the markdown migration captured only `src` (a literal gray placeholder image). 3 stories were affected (handoff originally said 8 — actual count was 3; the other 5 had different problems).

- `scripts/parity-fix-story-lazy-load.mjs` reads each story's wget mirror, extracts data-src URLs in document order, and positionally swaps each `*-lazy-load.<ext>` in the .md with the real URL.
- Stories: `avion` (3 refs), `lanxing-...` (4 refs), `overwhelming-data-...` (2 refs).
- Smoke: MAJOR → MINOR/MAJOR/MINOR. Avion's leftover MINOR is hero gradient; lanxing's was a separate sidebar issue handled in Fix #3b.

### Fix #3b — Lanxing sidebar metadata (DONE 2026-05-13)

All 8 stories stored their right-column metadata (Industry / Markets Served / Top Challenges / Why Reveal) as the *leading body markdown* (`- ### Industry` list pattern). The story template `src/pages/stories/[slug].astro` rendered an empty `<aside>` because frontmatter lacked those fields. Lanxing's verdict flagged this most prominently because its WP sidebar is the most content-rich.

- Extended `storySchema` in `src/content/config.ts` with `industry`, `marketsServed`, `topChallenges[]`, `whyReveal[]` (renamed prior `markets` → `marketsServed`).
- Updated `src/pages/stories/[slug].astro` aside to render the 4 sections with the original WP markup (`<h3 class="h4 font-weight-bold">` + `<ul class="list-disc pl-3">`).
- `scripts/parity-fix-story-metadata.mjs` regex-extracts the leading list block from each story's body, writes it as frontmatter, and strips it from the body. 8 stories migrated.
- Smoke (lanxing): MAJOR → MINOR (the leftover MINOR is hero/logo placement, separate from the sidebar fix).

### Fix #4 — Glossary H1 = full question, WP H1 = short noun (DONE 2026-05-13)

WP serves `<title>What Is SaaS Analytics? KPIs, Challenges And Limitations</title>` (SEO/Yoast) but `<h1>SaaS Analytics</h1>` (short). The Astro `title:` was holding the long SEO copy and the glossary template was using it for *both* the page title and the H1.

- Added optional `heading` field to `glossarySchema`.
- `src/pages/glossary/[slug].astro` now uses `entry.data.heading ?? entry.data.title` for the DarkHero title and breadcrumb leaf. `title` stays the document title.
- `scripts/parity-fix-glossary-heading.mjs` scrapes the WP mirror's `<h1>` for each glossary and writes it as `heading:`. 19 of 23 files touched; 4 were already aligned.
- Smoke (3): MAJOR → MINOR/MINOR/MINOR. Remaining MINORs are unrelated hero gradient / oversized inline graphic — not the H1.

### Fix #5 — Whitepapers missing "About the Author" + "Recent Content" + hero clipping (DONE 2026-05-13)

Three problems traced to the same root cause:

1. 20/21 whitepapers had `author: "Featured Story"` — not in the author registry, so `getAuthor()` returned undefined and the existing About-the-Author + Recent Content block (already coded in `BlogLayout.astro`'s `isWhitepaper` branch lines 268-310) silently rendered nothing because the gate was `(authorMeta && authorBio)`.
2. Titles in frontmatter were Title-Case (Yoast pattern: "Top 7 Questions To Ask...") whereas WP's `<h1>` was sentence case ("Top 7 Questions to Ask..."). This was also the "hero clipping" — Title-Case wrapped to one more line than sentence-case, pushing words below the visible hero. Not a CSS bug.

Fixes:
- Added `bio?: string` to `AuthorMeta` in `src/lib/blog-authors.ts`; populated Casey Ciniello and Bilyana Petrova bios from the WP source. Added `getAuthorBio()` helper.
- `BlogLayout.astro` now computes `authorBioHtml = authorBio || getAuthorBio(author)` (registry as fallback). Gate flipped to `(authorMeta && authorBioHtml)`.
- `scripts/parity-fix-whitepaper-meta.mjs` rewrites each whitepaper `.md`'s `title:` and `author:` from the WP mirror's `<h1>` and About-the-Author H3. 20 of 21 files touched.
- Smoke (3): MAJOR → MATCH/MATCH/MATCH.

### Fix #6 — Vertical / unique-product content drift (DONE 2026-05-13)

17 vertical/landing pages had heading renames, missing sections, or wholesale content drift vs WP. Per-page work — no scripts; manual rewrite of each `.md`'s `sections:` array.

Pattern: the canonical structure (per banking-analytics, which was already MATCH) is `dark-hero → feature-row "The Importance of…" → icon-grid "4 Benefits…" → section-header "X Dashboard Samples" → feature-row × N for dashboards → faq → inline-cta`. Some verticals (insurance, manufacturing, energy, mining) also need:
- `feature-row "Bring Conversational AI Into Your Industry Workflows"` (note: WP H2 wraps `<span class="title-violet-gradient">Conversational AI</span>` inside — naive `<h2[^>]*>([^<]+)</h2>` regex misses this. Use full-content extraction.)
- `section-header "Trusted by Teams Building X Software" + logo-slider` for G2 badges.
- `icon-grid "Why Reveal Powers X"` and `icon-grid "Why X Teams Choose Reveal"`.

Special cases:
- `embedded-analytics`: WP is a 12-section SEO article guide; pre-fix build was a different product landing page. Fully replaced the product landing with the SEO article structure.
- `white-label-analytics`: kept the `video-split-hero` (which has no WP equivalent — different hero design); ported the 4 main content sections + FAQ.
- `on-prem-analytics`: WP has no FAQ schema; built 7 sections matching WP H2s.

All 17 smoke-tested: 13 MATCH, 4 MINOR (insurance hero gradient, isv additive content, mining missing testimonial cards but logos present, white-label feature-tab styling), 0 MAJOR.

5 issues caught in smoke that would have shipped silently:
- manufacturing + energy: missed "Bring Conversational AI" section due to span-in-H2 extraction bug.
- mining: missed 3 sections (Enhance Mining Ops icon-grid, inline CTA, testimonials).
- finance: dashboard image URLs were 404s — wrong filename pattern. WP uses `reveal-solution-finance-<dashboard>-768.png`, not `reveal-finance-embedded-768.png`.
- telecommunications: hero title word order ("Embedded Telecommunications Analytics" vs WP's "Telecommunications Embedded Analytics").

Lesson: H2/H3 extraction regexes must handle inline `<span>` and other inline elements inside heading tags. The naive `<h2[^>]*>([^<]+)</h2>` form is brittle.

## Scripts written this session

| Script | Purpose |
|---|---|
| `scripts/parity-fix-wp-paths.mjs` | Fix #2 — rewrite WP-era image refs in blog body markdown. Copies missing assets from `../wp-export/output/assets/images/`. |
| `scripts/parity-fix-story-lazy-load.mjs` | Fix #3 — positionally swap `*-lazy-load.*` URLs with `data-src` URLs from WP mirror HTML. |
| `scripts/parity-fix-story-metadata.mjs` | Fix #3b — extract leading `- ### Industry/Markets Served/Top Challenges/Why Reveal` body block to frontmatter for stories. |
| `scripts/parity-fix-glossary-heading.mjs` | Fix #4 — scrape WP `<h1>` into a new `heading:` field per glossary `.md`. |
| `scripts/parity-fix-whitepaper-meta.mjs` | Fix #5 — rewrite `title:` and `author:` from WP source per whitepaper. |

The WP-to-markdown tool is at `../wp-export/tool/` (cloned from `flowershow/wordpress-to-markdown`). Its output lives at `../wp-export/output/`. Not committed; the manifest data is reference-only.

## Commit plan

Six logical commits, in order:

1. **Fix #1** — 51 blog files with the `heroImage:` line stripped.
2. **Fix #2** — `scripts/parity-fix-wp-paths.mjs` + 88 blog `.md` files with rewritten paths + 59 newly-added asset files under `public/images/`.
3. **Fix #3 + #3b** — `scripts/parity-fix-story-lazy-load.mjs`, `scripts/parity-fix-story-metadata.mjs`, schema/template edits (`storySchema` + `src/pages/stories/[slug].astro`), 8 story `.md` files.
4. **Fix #4** — `scripts/parity-fix-glossary-heading.mjs`, schema (`glossarySchema.heading`), `src/pages/glossary/[slug].astro`, 19 glossary `.md` files.
5. **Fix #5** — `scripts/parity-fix-whitepaper-meta.mjs`, `src/lib/blog-authors.ts` (bios + `getAuthorBio`), `src/layouts/BlogLayout.astro` (registry fallback), 20 whitepaper `.md` files.
6. **Fix #6** — 17 vertical/landing `.md` files.

The `parity/` tracker, snapshots, verdicts, and reports remain uncommitted (large, regenerable, probably `.gitignore`-worthy — confirm with user).

## Pickup recipe

```bash
cd /home/bsevestakiev/projects/reveal

# 1. See where we are
git status -s
cat docs/handoff/sonnet-parity-review.md   # this file

# 2. Full re-snap + re-review (refreshes every verdict on disk)
#    Snapshots: ~10-15 min. Review: ~30-40 min at concurrency=8.
node scripts/parity-snap.mjs --all
rm -rf parity/verdicts && mkdir parity/verdicts   # clean slate
node scripts/parity-review.mjs --concurrency 8
npm run parity:report                              # regenerate sonnet-report.html + tracker

# 3. Open the report visually
xdg-open parity/sonnet-report.html

# 4. Commit per the "Commit plan" section above, in order.
```

## Gotchas / lessons learned

- **`claude -p` subprocess pace:** ~80s per page at concurrency 8. Default timeout in `parity-review.mjs` is 360s. Two timeouts in the original 232-page run; both resolved on retry.
- **Subagent early-termination:** Sonnet sometimes ended its turn after a "Now let me read…" narration without calling Write. Current prompt explicitly says "Issue 6 parallel Read calls in your FIRST message" — keep that wording.
- **Prompt tuning:** the first iteration counted "BUILT adds content not in ORIGINAL" as a regression and produced inflated MAJOR counts (≥150). Current prompt explicitly treats additive content (FAQ/testimonials/stats/footer added by the new template) as approved enhancements. Don't loosen further.
- **`heroAsset` falls back to `image`, which the route passes from `post.data.cover`** — so stripping `heroImage:` does NOT remove the hero image from the page; it just lets `cover` take over. Verified via build inspection of `/blog/analytical-application/`.
- **wget mirror noise:** scrape contains query-string variants like `pricing@gad_source=…`.html. Ignored because the snap script reads canonical paths from the tracker and only fetches the clean `pricing.html` file.

## Notes left to confirm with the team

- **Approved template additions** — current prompt assumes FAQs, testimonials, stats blocks, fuller footer, related-articles, and newsletter signup were all sanctioned. Verify with the content owner.
- **Locale parity** — only EN reviewed. JA, ES, KO, PT-BR out of scope.
- **State differences** (accordion expanded vs collapsed) noted as informational only.
