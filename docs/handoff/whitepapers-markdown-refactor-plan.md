# Whitepapers Markdown Refactor — Plan

**Status:** Proposed
**Owner:** TBD
**Last updated:** 2026-05-14

## Goal

Strip WordPress-export cruft from whitepaper bodies so they read like blog
posts plus a handful of intentional HTML blocks, **without changing the
runtime contract** (URLs, anchor IDs, gate behavior, Sveltia editor UX).

The schemas are already unified — `whitepaperSchema` aliases `postSchema`
(blog) per refactor 8e1fdee. This plan addresses **body content**, not
collection structure.

## What stays HTML (intentional)

These are part of the system's contract and are paired with Sveltia editor
buttons that round-trip cleanly. Do not touch:

- `<!-- gate -->` marker (split point for public/gated body)
- `<div class="alert alert-secondary icon--tips">…</div>` (Bonus tip — `bonus-tip` button)
- `<aside class="alert alert-danger…">…</aside>` (Callouts — `callout` button)
- `<reveal-expandable-table>…</reveal-expandable-table>` (Comparison tables)
- `.banner.banner--embedded` CTA banners (`cta-banner` button)
- `authorBio` HTML in frontmatter (separate cleanup; out of scope here)

## What gets cleaned up

| Current | Target |
|---|---|
| `<h2 class="wp-block-heading whitepapers__headline-dividers" id="chapter-1"><strong>Planning Phase</strong></h2>` | `## **Planning Phase** {#chapter-1}` |
| `class="wp-block-heading"` on any element | removed |
| `<p>The planning phase serves as…</p>` (between block elements) | `The planning phase serves as…` (markdown handles paragraph wrapping) |
| Per-heading `class="whitepapers__headline-dividers"` | One `.whitepaper-body` wrapper + scoped CSS |

**Critical invariant: anchor IDs stay byte-identical.** `#chapter-1` must
resolve to the same `id="chapter-1"` element after the refactor, on both
EN and JA. Any external links and any cross-language anchor parity depends
on this.

## Phased PR plan

### Phase 1 — Enable `{#id}` syntax on markdown headings

**One PR. No content change.**

1. Add `remark-heading-id` (or equivalent — verify against Astro 5/6 markdown pipeline).
2. Register it in `astro.config.mjs` under `markdown.remarkPlugins`.
3. Smoke test: a sandbox `.md` with `## Test {#sandbox}` should render to
   `<h2 id="sandbox">Test</h2>`.
4. Verify the build is green and no existing whitepaper rendering changes
   (all current HTML headings still work; this only adds a *new* capability).

**Risk:** plugin choice — Astro's remark pipeline can be picky about plugin
versions. Confirm Astro version on staging before pinning.

**Verification:** `npm run build && npm run preview`, walk one existing
whitepaper, confirm visual match against production.

### Phase 2 — Scope styling to a `.whitepaper-body` wrapper

**One PR. No content change.**

1. In `BlogLayout.astro` (isWhitepaper branch), confirm the rendered body
   is wrapped in an element with a class hook. Add `.whitepaper-body` if
   missing.
2. Move CSS rules currently targeting `.whitepapers__headline-dividers`
   to `.whitepaper-body h2` (and any other generalizations the rule needs).
3. Existing HTML keeps the explicit class on each heading — old and new
   selectors both match, so this is non-breaking.

**Verification:** visual diff on the rendered `bi-deployment-guide` page.
Must be pixel-identical.

### Phase 3 — Migrate one whitepaper as proof

**One PR. Touches one file.**

1. Pick `bi-deployment-guide.md` (the proof-of-pipeline file from the
   previous refactor).
2. By hand or with a transform script, apply:
   - `<h2 class="wp-block-heading whitepapers__headline-dividers" id="chapter-N"><strong>X</strong></h2>` → `## **X** {#chapter-N}`
   - Remove every remaining `class="wp-block-heading"`.
   - Drop redundant `<p>…</p>` wrappers around plain prose paragraphs
     between block elements. Leave `<p>` alone inside `<div>` callouts —
     markdown inside HTML wrappers needs the explicit tag in some cases.
3. **Verify the rendered HTML before/after is identical** (run
   `astro build`, diff `dist/whitepapers/bi-deployment-guide/index.html`).
   Trivial whitespace differences are OK; structural HTML must match.
4. Spot-check anchor links: `#chapter-1`..`#chapter-N` still resolve.

**Verification:** rendered HTML diff is the gold standard. If it doesn't
match, the migration is wrong — do not merge.

### Phase 4 — Migration script for the remaining 20 whitepapers

**One PR (or chunked PRs). Touches the rest of the collection.**

1. Build `scripts/migrate-whitepapers.mjs` that does what Phase 3 did
   manually. Pure file-in / file-out; runs locally; commits nothing.
2. Run dry-run, eyeball the diffs for surprises.
3. Run for real, commit all 20 in a single PR (or split into chunks of
   5 if review is unwieldy).
4. Spot-check 3 random files via `astro build` + rendered diff.

**Verification:** every migrated file must produce identical rendered HTML
against the pre-migration version (modulo whitespace). The script should
log any file whose render changed structurally so reviewers can inspect.

### Phase 5 — Optional cleanup (defer)

Out of scope for the first pass but candidates for follow-up:

- Move `authorBio` from HTML-in-YAML to markdown-in-YAML rendered via
  `renderMarkdown()` in BlogLayout.
- Audit blog posts for the same WP-cruft (`wp-block-heading`, redundant
  `<p>`) and apply the same script.
- Consider whether the explicit `id="chapter-N"` ought to become a more
  semantic `id="planning-phase"` etc. — **probably not**, since `chapter-N`
  is stable across translation while text-derived IDs are not.

## Sequencing relative to JA translation

Two options:

**A) Refactor first, then translate.**
- Pro: cleaner EN bodies → simpler translation prompt, less LLM error surface.
- Con: postpones the translation kickoff; refactor work sits unmerged
  while reviewers cycle.

**B) Translate first, then refactor both EN + JA together.**
- Pro: translation can start immediately against today's bodies (prompt
  already handles HTML).
- Pro: migration script gets reused across both locales — `42 files` total
  instead of `21 × 2 passes`.
- Con: slightly more LLM work on the translation side (preserving HTML
  the script would have removed anyway).

**Recommendation: B.** The translation prompt is already paid-for; deferring
it costs more than the slightly larger migration. Unless the next
translation run is more than a week out, translate first.

## Risks

| Risk | Mitigation |
|---|---|
| `remark-heading-id` is incompatible with Astro's pipeline | Sandbox-test in Phase 1 before any content change |
| Migration silently changes rendered HTML | Phase 3 rendered-HTML diff is the gate. Don't skip it. |
| Anchor link rot | Diff `id="chapter-*"` attributes before/after. Stop if any differ. |
| Sveltia editor breakage | Sveltia button regexes match HTML, not markdown — buttons keep working. Test once on staging admin to confirm. |
| Translation merge conflicts (if A) | Choose B and avoid this entirely. |

## Effort estimate

- Phase 1: ~30 min (plugin choice + config + smoke test)
- Phase 2: ~30 min (CSS move + visual diff)
- Phase 3: ~1 hour (manual migration of one file + render diff)
- Phase 4: ~2 hours (script + dry run + commit + spot checks)
- Phase 5: deferred

**Total: ~½ day** of focused work, spread across 4 PRs.

## Decision points needing input

1. **Sequencing**: A (refactor first) or B (translate first)? Default to B.
2. **Phase 4 PR shape**: one big PR or chunked by 5 files? Default to one
   big PR — the script makes the changes mechanical and easy to skim.
3. **Heading attr plugin**: `remark-heading-id`, `remark-attr`, or a tiny
   custom plugin? Defer to Phase 1's sandbox.

## Not in this plan

- Changing the schema (already aligned).
- Removing the gate marker (it's already minimal and Sveltia-supported).
- Replacing Bootstrap alert classes with semantic components (separate
  design-system question, not relevant to translation parity).
- Translating anything — see the n8n translation workflow plan.
