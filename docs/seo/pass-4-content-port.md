# Pass 4 — verbatim metadata port from revealbi.io

**Status:** ⏭️ deferred to pre-cutover (decision 2026-05-07)
**Depends on:** Pass 2 (the `seo:` frontmatter block must exist in the schema before we can populate it). ✅ Already done.

## Why deferred

Passes 1–3 are already a major SEO upgrade over what was here, and crucially:

- **Staging is `noindex`** (per `docs/handoff/noindex-switch.md`), so Google isn't reading any of this metadata yet — Yoast titles only matter once the site is actually indexed.
- **Pass 4 is purely additive.** The override mechanism shipped in Pass 2; dropping `seo.title` values into markdown later is a pure data change with zero architectural risk.
- **Better signal post-deploy.** Once production traffic patterns and Search Console reporting are available, prioritizing *which* pages need hand-tuning beats porting all 50+ verbatim.

Tracked as a pre-cutover task in `docs/handoff/cutover-checklist.md` so it doesn't get squeezed by launch crunch.

## Spot-check from sampling (do this small thing first)

Before running the full scrape, verify the value for a handful of pages. Example: `/about-us/`:
- Astro `description` = revealbi.io `description` exactly.
- Astro current `<title>` = `"About Reveal | Reveal"` (double Reveal — awkward).
- revealbi.io `<title>` = `"About Reveal | Learn More About Our Team And How To Contact Us"`.

So `seo.title` is where the real win is. Descriptions are largely already ported. The `seo.description` part of the script can probably skip rows where the values match.

## Goal

For every page in the Astro content collections that has a counterpart on `www.revealbi.io`, scrape its current `<title>`, `<meta name="description">`, and `og:type`, and write them into the markdown file's frontmatter. This is the "copy verbatim" decision the user made up-front.

## Why scrape-and-copy

- Yoast metadata on revealbi.io has been hand-tuned over years; it's where the SEO equity lives. Replicating verbatim preserves that equity through the cutover.
- Where the WP source is broken (truncated descriptions, mismatched canonicals), we **fix during port** — see "Bugs to fix" below.

## Work plan

1. Build a slug → URL mapping. Astro EN pages live at `src/content/pages/en/*.md`; the file slug usually matches the WP path 1:1 (e.g. `embedded-analytics-software.md` → `https://www.revealbi.io/embedded-analytics-software/`). Confirm with `grep -l '^title:' src/content/pages/en/*.md | wc -l` vs the live URL list.

2. Write a one-shot Node script (`scripts/import-seo-from-wp.mjs`) that, for each EN markdown file:
   - Fetches the corresponding revealbi.io URL.
   - Extracts `<title>`, `meta[name=description]`, `og:type`, `link[rel=canonical]`.
   - Writes the frontmatter `seo:` block (idempotent — re-running shouldn't churn existing values unless `--force`).
   - Skips and reports any URL that 404s or doesn't have valid metadata.

3. Run script, review the diff, commit per category (homepage, products, solutions, resources, etc.) for clean history.

4. Hand-fix the bugs from `README.md` (don't blindly carry them across):
   - `/pricing/` truncated description → write a complete one (use copy in `src/content/pages/en/pricing.md` already if present, or extend it).
   - `/about-us/` canonical → leave canonical empty (auto-derives correctly).
   - `/pricing/` canonical → leave empty.

## Schema field mapping

WP/Yoast → Astro frontmatter:

| revealbi.io tag | Astro frontmatter field |
|---|---|
| `<title>` | `seo.title` |
| `<meta name="description">` | `seo.description` |
| `<meta property="og:type">` | `seo.ogType` |
| `<meta property="og:image">` | `seo.ogImage` (only when not the shared fallback) |
| `<link rel="canonical">` | `seo.canonical` (only when it differs from auto-derived) |
| `<meta name="robots">` `noindex` | `seo.noindex: true` |

Notes:
- If `og:title`/`og:description` differ from `<title>`/`<meta description>` on revealbi.io, we'd want a separate `seo.ogTitle`/`seo.ogDescription` field. Spot-check first; if Yoast emits identical values everywhere (which it usually does), don't bother.
- `og:updated_time` is automatic via git/file mtime — don't store in frontmatter.

## Things to validate after this pass

1. `npm run build` clean.
2. Render a handful of ported pages and diff their head against the WP equivalent, modulo: site-domain, hreflang block, additions from Pass 1/3.
3. Any page that was `noindex` on WP (e.g. `/request-demo/`) is also `noindex` on Astro.
4. Search-Console URL inspector on a few production-deployed pages confirms Google sees the ported metadata.

## Bugs to fix (not replicate)

From `README.md`:

| Page | Bug on revealbi.io | Action in port |
|---|---|---|
| `/pricing/` | description truncated mid-sentence (`"…ensuring a strong return on investment. With no"`) | Write a complete description |
| `/pricing/` | canonical points to `/pricing/embedded-analytics` | Leave `seo.canonical` empty (auto-derives to `/pricing`) |
| `/about-us/` | canonical points to `/about-us-2` (WP slug-collision) | Leave empty |

## Open questions

- Will Sveltia editors prefer to author SEO copy from scratch in places where the WP version is generic? If so, the script should leave fields empty instead of copying — but that delays the cutover. Default: copy verbatim, let editors revise post-launch.
- For non-EN locales (es/ja/ko/pt-BR): WP also has WOVN-translated meta. Currently `pages_es`/etc. are read-only in Sveltia (n8n owns translations). Decide whether to scrape those pages too or let n8n handle it from the EN frontmatter.
