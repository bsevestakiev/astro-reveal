---
description: Convert one raw-HTML-body reveal page into the sanctioned sections frontmatter format via the page-converter subagent. Sectionizes the bespoke body, extracts the lead form into a lead-form section with lead-source recovered from old production, empties the body, and builds to verify. en/ only, no git.
---

Use the `page-converter` subagent to convert the reveal page: $ARGUMENTS

Pass the argument verbatim (e.g. `about-us`, `/about-us/`, `download-sdk`). The subagent will:
- Resolve it to `src/content/pages/en/<slug>.md` and confirm it's a raw-HTML-body page (not already sectionized).
- Recover the form's `leadSourceNumber` / `eventType` from old production (`https://www.revealbi.io/<slug>/` and the wget mirror) — never guessing.
- Read the current section vocabulary from `src/content.config.ts`, segment the body into blocks, and map each to an existing section type — auto-adding new section schemas + components (with `t()/tHtml()/asset()` markers and `SectionRenderer` dispatch) when a block doesn't fit.
- Replace the embedded form with a `lead-form` section, move everything into the `sections:` frontmatter array in document order, and **empty the body** (avoids the `[slug].astro` article-layout wrapper).
- Run `npx astro build` (must pass) and, if available, `scripts/parity-snap.mjs` to confirm the converted page is visually faithful to the mirror.

It edits **only** `src/content/pages/en/<slug>.md` plus shared section files (`config.ts`, `src/components/sections/*`, `SectionRenderer.astro`). It will **not** touch non-en locale files (those regenerate downstream), will **not** run git, and will **not** paraphrase copy. If lead-source is unrecoverable or a block needs a shared-layout edit, it stops and reports rather than guessing.
