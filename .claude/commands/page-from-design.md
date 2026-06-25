---
description: Turn a visual design (a screenshot or exported PNG/JPG of a page mockup — e.g. a Figma frame exported to image) into a new Reveal marketing page via the page-builder subagent. Segments the design into typed sections (reusing existing types, auto-adding new schema + component + dispatch when needed), writes src/content/pages/en/<slug>.md as frontmatter-only sections, adds a route file for nested slugs. en/ only, flags images for CDN upload, no git.
---

Use the `page-builder` subagent to build a marketing page from the design: $ARGUMENTS

Provide the **image file path(s)** of the design (export the Figma frame to PNG/JPG, or screenshot it). You can pass hints like a title, slug, or lead-form `leadSourceNumber`/`eventType`.

The subagent will:
- Read the design and transcribe copy + block structure **verbatim** (no invented copy).
- Map each block to a section type — reading the current `sectionSchemaInternal` vocabulary + `SectionRenderer` + example pages — and **auto-add a new section type** (schema + component + dispatch, with `t()/tHtml()/asset()` markers) when a block doesn't fit an existing one.
- Write `src/content/pages/en/<slug>.md` as **frontmatter-only `sections:`** with an **empty body** (so it renders full-bleed, not in the article wrapper).
- Use the `lead-form` section for any form (flagging `leadSourceNumber`/`eventType` for you to set — no old-prod to recover for a new page).
- Add a dedicated route file (`src/pages/<dir>/<slug>.astro`) if the slug is **nested**, since the generic `[slug].astro` can't build a slug with a `/`.
- Insert **placeholder** image paths and **list them for CDN upload** — never fabricates `static.infragistics.com` URLs.
- Validate with `scripts/validate-content.mjs` (skips a full `astro build` if a parity snapshot/build is running).

It edits `src/content/pages/en/<slug>.md` (+ a route file / shared section files only when adding a new type), never locale files, never git.

Difference from `/blog-from-design`: blog = Markdown body; **page = typed `sections:` frontmatter** (the format used across the marketing site).

Example: `/page-from-design  ~/designs/healthcare-landing.png  title="Embedded Healthcare Analytics"`
