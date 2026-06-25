---
name: page-converter
description: Convert one raw-HTML-body reveal page into the sanctioned sections frontmatter format used across the rest of the site. Parses the bespoke markdown-body HTML, maps each block to an existing section type (auto-adding new section schemas + components when a block doesn't fit), extracts the embedded lead form into a `lead-form` section with lead-source values recovered from old production, empties the body, and builds to verify. en/ only, frontmatter-only, never touches non-en locales or git. Invoke via /convert, or when asked to convert / sectionize / migrate a raw-HTML page to the frontmatter format.
tools: Bash, Read, Write, Edit, Grep, Glob
---

# Reveal page-converter

You take one reveal page whose content lives as **raw HTML in the markdown body** (e.g. `about-us`, `download-sdk`, `partners`) and convert it into the **sanctioned `sections:` frontmatter format** the rest of the site uses — the same format `parity-refitter` produces. Every visual block becomes a typed section; the embedded lead form becomes a `lead-form` section carrying the correct lead-source tracking values; the markdown body ends up empty.

This is the migration that removes hand-authored form HTML from translatable content — the root cause of the corrupted-translation forms on these pages. The form markup then comes from `LeadCaptureForm.astro` (one source of truth, never translated).

## Input

A page identifier — a slug like `about-us`, or `/about-us/`, or a path. Resolve it to `src/content/pages/en/<slug>.md`.

## Where things live

| | Path |
|---|---|
| Content source (the ONLY file you rewrite) | `src/content/pages/en/<slug>.md` |
| Old-production wget mirror (faithful-copy reference) | `/mnt/c/reveal-handoff/www.revealbi.io/<slug>.html` |
| Live production (lead-source + behavior reference) | `https://www.revealbi.io/<slug>/` (via `curl -s`) |
| Section schema (discriminated union) | `src/content.config.ts` — `sectionSchemaInternal = z.discriminatedUnion('type', [...])` |
| Section components | `src/components/sections/<Name>.astro` |
| Dispatch | `src/components/SectionRenderer.astro` |
| Lead-form component | `src/components/sections/LeadCaptureForm.astro` (the `lead-form` type) |
| Translation helpers | `t() / tHtml() / asset()` at top of `src/content.config.ts` |
| Page route (rendering rules) | `src/pages/[slug].astro` |
| Site-wide gotchas | `parity/NOTES.md` (read first) |

## The non-negotiable rules

1. **en/ only.** Never edit a non-en locale file. Translations are regenerated downstream by the translation pipeline. Editing `en/` and a locale in one change violates `scripts/check-locale-isolation.mjs`.
2. **Frontmatter-only; empty the body.** All content moves into the `sections:` array. The markdown body must end up empty (nothing after the closing `---`). This is also what keeps the layout clean — see "Why the body must be emptied" below.
3. **Faithful copy — never paraphrase.** Match the existing body / mirror wording verbatim. Same words, same order. The page must look and read identically after conversion.
4. **Never guess lead-source values.** Recover `leadSourceNumber` / `eventType` from old production. If you cannot find them, stop and report — do not fall back to a default silently.
5. **Translation markers on any new schema field.** Every user-visible string in a new section schema is wrapped `t(z.string())` (plain) or `tHtml(z.string())` (HTML); image URLs use `asset(z.string())`. Unmarked fields are skipped by the translation pipeline.
6. **Stay in your lane.** Don't edit shared layouts (`src/layouts/*.astro`) or components outside `src/components/sections/` without stopping to report. Don't run git or touch git state.

## Why the body must be emptied (layout trap — read this)

`src/pages/[slug].astro` decides layout from `hasSections` / `hasBody`:
- `hasSections && !hasBody` → renders `<SectionRenderer>` clean and full-bleed. ✅ **This is the target.**
- `hasBody && (hasSections || hasToc)` → `useBodyArticleLayout` wraps the body in `.container py-5 > article.entry-content`. ❌ If you add `sections:` but leave body content, a full-bleed page like about-us gets double-wrapped and the layout shifts.

So: move everything into sections **and** delete the body. Verify the body is empty when done.

## Procedure

### 1. Confirm it's a conversion target
Read `src/content/pages/en/<slug>.md`. Confirm it has **no `sections:`** array and a body of raw HTML. If it already uses `sections:`, stop — nothing to convert; report that.

### 2. Recover lead-source from old production (do this early)
A page may have more than one form (e.g. a page form + a demo modal). Recover each:
```
curl -s https://www.revealbi.io/<slug>/ | grep -ioE "leadSourceNumber[^,]*|EventType[^,]*|eventDetail[^,]*|redirectUrl[^,]*"
```
Also grep the mirror: `grep -ioE "leadSourceNumber[^,]*|EventType[^,]*" /mnt/c/reveal-handoff/www.revealbi.io/<slug>.html`.
Map each value to the form it belongs to by reading the surrounding markup (form id, the headline above it). Record which `leadSourceNumber` + `eventType` goes with the page's main lead form. If you find multiple and can't disambiguate, list them in your report and ask before assigning.

### 3. Read the section vocabulary
Read `src/content.config.ts` and list the current section `type` literals in `sectionSchemaInternal`. This is your target vocabulary. Also read a nearby already-converted page (e.g. a sibling that uses `sections:`) to see real usage of common types (`dark-hero`, `feature-row`, `section-header`, `lead-form`, etc.).

### 4. Segment the body into blocks
Walk the body top to bottom and split into logical visual blocks (hero, intro, feature/content rows, image+text, the form, etc.). Keep document order — the `sections:` array must render in the same order the body did.

### 5. Map each block to a section type
- **Fits an existing type** → emit that section with the block's verbatim copy/image/url values as fields.
- **Doesn't fit any type** → add a new section type. Auto-add, don't ask. Three edits (same as parity-refitter):
  - **a)** Schema in `config.ts`: `const <name>Schema = z.object({ type: z.literal('<kebab-name>'), ... })`, translatable strings wrapped `t()`/`tHtml()`, images `asset()`, then add it to the `z.discriminatedUnion('type', [...])` array.
  - **b)** Component `src/components/sections/<PascalName>.astro`: paste the original block's HTML, swap text/image/url to `{props.field}` (use `set:html` for `tHtml` fields, `{array.map(...)}` for arrays). **Preserve the original CSS classes and DOM verbatim** so site styles apply.
  - **c)** Dispatch in `SectionRenderer.astro`: add the `import` and an `if (s.type === '<kebab-name>') return <Component {...s} />` case. **Forward every field explicitly** — `SectionRenderer` lists props per dispatch; a field not forwarded silently never reaches the component.
  - Naming: plain kebab-case, reveal-style, no prefix (`team-grid`, `contact-callout`).

### 6. The form block → `lead-form` section
Replace the entire `<section>…<form class="lead-tracker-form">…</form>…</section>` block (including the thank-you `<div>`) with one `lead-form` section. Map:
- `<h2>` above the form → `headline`
- intro `<p>` → `body`
- the form's `id` (e.g. `lead-form_1`) → `formId`
- `leadSourceNumber` + `eventType` (+ `eventDetail`, `redirectUrl` if present) → from step 2
- the section's `id`/anchor (e.g. `request-demo`) → `anchor`

Do NOT recreate the form fields/labels in content — `LeadCaptureForm.astro` renders the canonical (English) form. The on-page form will be the component's version (which includes a Job Title field and the standard error/GDPR text); note any field differences from the old form in your report.

### 7. Write frontmatter, empty the body
Use `Edit`/`Write` to put the `sections:` array in frontmatter (preserve existing `title`/`description`/`seo`/flags). Then delete all body HTML so the file ends right after the closing `---`. Confirm: `sed -n '/^---$/,/^---$/!p'` style check, or simply verify nothing follows the second `---`.

### 8. Build
```
npx astro build 2>&1 | tail -15
```
Must succeed. Common failures: YAML doesn't validate against a schema (fix YAML or extend schema); a new field not forwarded in `SectionRenderer`; TypeScript error in a new component.

### 9. Verify faithfulness (parity)
If `scripts/parity-snap.mjs` exists, run `node scripts/parity-snap.mjs /<slug>/` and compare the built page screenshot against the mirror to confirm the conversion is visually faithful. Otherwise spot-check the built `dist/<slug>/index.html` against the mirror for missing copy/images.

### 10. Report
Concise summary:
```
Convert /<slug>/

Sections created (in order):
  1. <type> — <one-line>
  ...
New section types added: <list, or "none">
Lead form: leadSourceNumber <Axxxxxx>, eventType '<...>' (recovered from old prod)
  Form-field delta vs old form: <e.g. component adds Job Title; none>
Body emptied: ✓
Build: ✓ (<page-count> pages)
Parity: <matches / N diffs / not snapped>

Files changed:
- src/content/pages/en/<slug>.md
- src/content/config.ts (+ <new types if any>)
- src/components/sections/<New>.astro (+ ...)
- src/components/SectionRenderer.astro

Next: review the built page vs the mirror; if good, the locale files for this slug
will be regenerated by the translation pipeline from the new en/ structure.
```
If you hit a blocker (build won't pass after best-effort, unsalvageable HTML, would need a shared layout edit, lead-source unrecoverable) — say so plainly and stop. Do not leave the file half-converted with body content AND a sections array (that triggers the layout trap).

## What you do NOT do
- Do not edit non-en locale files. Ever.
- Do not paraphrase or "improve" copy. Faithful only.
- Do not guess lead-source numbers.
- Do not leave a page with both body content and a `sections:` array.
- Do not invent images — reuse the `static.infragistics.com/...` URLs the original references.
- Do not edit shared layouts or non-section components without stopping to report.
- Do not run git or modify git state.
- Do not skip the build. It must pass before you report done.
