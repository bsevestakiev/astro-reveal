---
description: Turn a visual design (a screenshot or exported PNG/JPG of a blog mockup — e.g. a Figma frame exported to image) into a new Reveal blog post via the blog-builder subagent. Transcribes the design's copy + structure into a block-structured entry (a content: block list — text / comparison-table / callout / bonus-tip / cta-banner) under src/content/blog/en/, matching the blog schema. en/ only, flags images for CDN upload. Doesn't run git — hands you commands to land the post on the cms-content branch and PR to staging.
---

Use the `blog-builder` subagent to build a blog post from the design: $ARGUMENTS

Provide the **image file path(s)** of the design (export the Figma frame to PNG/JPG, or screenshot it — no Figma license needed). You can also pass hints like a title, slug, author, date, or category.

The subagent will:
- Read the design image(s) and transcribe the copy + section structure **verbatim** (it won't invent marketing copy).
- Match the blog format: read `blogContentSchema` + `postSchema` in `src/content.config.ts` + recent `src/content/blog/en/*.md` posts (frontmatter fields + the `seo` block).
- Write `src/content/blog/en/<slug>.md` with proper frontmatter (title, description, date, author, categories, cover/heroImage, seo) and a **block-structured `content:` body** (text / comparison-table / callout / bonus-tip / cta-banner blocks), leaving the markdown body empty.
- Insert **placeholder** image paths for every graphic and **list them for you to upload to the CDN** — it never fabricates `static.infragistics.com` URLs that would silently 404.
- Validate with `scripts/validate-content.mjs` (it will skip a full `astro build` if a parity snapshot/build is in progress, to avoid clobbering it).

It edits **only** `src/content/blog/en/<slug>.md`, never locale files or shared components. It does **not run git itself** — instead it hands you ready-to-run commands to land the post on the **`cms-content`** branch (the same branch Sveltia commits to) and open a review PR to `staging`. It reports the file created, the section outline, the list of images needing real URLs, and anything it had to flag (illegible text, missing author/date, assumed category).

Example: `/blog-from-design  ~/designs/embedded-ai-trends-2026.png  title="Embedded AI Trends 2026" author="Casey Ciniello"`
