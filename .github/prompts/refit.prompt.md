---
mode: agent
description: Refit an Astro page to match the live revealbi.io page using captured screenshots.
---

# Refit a page to match the live site

You are refitting an Astro content file so it matches the live revealbi.io page.
The live site is the source of truth. The `.md` file is what you will edit.

**Target**: The `.md` file currently open in the editor under `src/content/pages/en/`.

---

## Step 1 — Confirm the slug

Derive the slug from the open filename:
- `src/content/pages/en/ai.md` → slug is `ai`
- `src/content/pages/en/chart-types.md` → slug is `chart-types`

If no file is open, ask the user which page to refit.

---

## Step 2 — Capture screenshots of the live page

Run this in the terminal:

```
node scripts/capture-live.mjs <slug>
```

This screenshots `https://www.revealbi.io/<slug>` at mobile / tablet / desktop with full lazy-load scroll. No dev server needed.

Screenshots are saved to `parity/compare/<slug>/`.

---

## Step 3 — Catalog existing section types

Read `src/content/config.ts` and list every `type:` literal from the `sectionSchemaInternal` discriminated union. Also note each type's key fields (headline, cards, items, etc.).

These are the only valid section types. **Do not create a new type until you have confirmed no existing type can represent the content.**

---

## Step 4 — Analyse the live screenshots

Open and study:
- `parity/compare/<slug>/live-desktop.png`
- `parity/compare/<slug>/live-mobile.png`
- `parity/compare/<slug>/live-tablet.png`

For every visible section on the live page, document:
1. What kind of section it is (hero, feature row, card grid, FAQ, CTA, logo row, etc.)
2. Its headline, body copy, image URLs, icon URLs, and CTA text — extracted directly from what you see
3. Which existing `type:` from Step 3 best represents it

---

## Step 5 — Compare against the current `.md` file

Read `src/content/pages/en/<slug>.md`.

For each live section identified in Step 4, check whether the `.md` file already has an equivalent entry. Classify each as:
- **Match** — section exists and fields are correct
- **Update** — section exists but fields are wrong or incomplete
- **Missing** — section does not exist in the `.md` file at all

---

## Step 6 — Edit the content file

Edit only the `sections:` array in `src/content/pages/en/<slug>.md` to close the gaps.

### Guardrails

| Rule | Detail |
|------|--------|
| **Reuse first** | Always pick an existing type. Only propose a new type if you can state why every existing type is unsuitable. |
| **Preserve matches** | Do not touch sections already classified as Match. |
| **No raw HTML outside slotContent** | Convert HTML from the live page into typed YAML fields. `slotContent` on `feature-row` is the only field designed for HTML blocks. |
| **Plain text vs HTML fields** | `t(z.string())` in config.ts = plain text only. `tHtml(z.string())` = inline HTML allowed. |
| **Image URLs** | Copy exact URLs from the live page. Do not guess or shorten paths. |
| **Scope** | Only edit the target `.md` file. No `.astro` files, no `config.ts`, no other pages. |

### HTML → YAML conversion guide

```
Live page element                      → YAML field
──────────────────────────────────────────────────────
<h1> or large heading                  → headline: "..."
Supporting paragraph                   → subhead: "..."
CTA button                             → ctaLabel: / ctaHref:
<img src="..." alt="...">              → image: + imageAlt:
3-column cards with icon+title+body    → icon-grid  →  cards: [{ icon, title, body }]
Accordion Q&A pairs                    → faq  →  items: [{ question, answer }]
Logo strip                             → logo-slider  →  logos: [{ src, alt }]
Side-by-side image + text block        → feature-row  (reversed: true if image is on left)
Numbered steps with icons              → ai-step-flow or feature-steps
Dark section with feature rows         → ai-dark-section
Stat callouts (numbers + labels)       → stats-band  →  stats: [...]
```

---

## Step 7 — New section types (last resort only)

Only proceed here if Step 6 confirms no existing type fits.

1. Add a Zod schema to `src/content/config.ts` — follow the exact same pattern (use `z.literal`, `t()`, `tHtml()`, `asset()`, `.passthrough()`, `zone` field).
2. Add it to the `sectionSchemaInternal` discriminated union.
3. Create `src/components/sections/<TypeName>.astro` — match the style of a similar existing component.
4. Register it in `src/components/SectionRenderer.astro`.
5. Use the new type in the `.md` file.

---

## Step 8 — Summary

Output a table of every section on the live page:

| # | Section type | Action | Notes |
|---|-------------|--------|-------|
| 1 | dark-hero | updated | fixed title and subhead |
| 2 | logo-slider | unchanged | already matched |
| 3 | feature-row | added | was missing entirely |

If any live sections could not be mapped and were skipped, list them so the user can decide whether to add a new type.
