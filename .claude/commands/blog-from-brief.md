---
description: Draft a new Reveal blog post from a written brief (a topic, angle, and/or outline you type — no design image needed) via the blog-writer subagent. Writes original on-brand copy grounded in the brief into a Markdown entry under src/content/blog/en/, matching the blog schema and surfacing the in-body components (Comparison Table, Callout, CTA Banner). en/ only, flags images for CDN upload, never fabricates facts or asset URLs. Doesn't run git — hands you commands to land the post on the cms-content branch and PR to staging.
---

Use the `blog-writer` subagent to draft a blog post from this brief: $ARGUMENTS

Give it as much of a brief as you have — the more you provide, the less it has to assume:
- **Topic / working title** (required-ish — at least the subject and the angle)
- **Audience** (e.g. SaaS product leaders, .NET developers)
- **Outline or key points** to cover
- **Target keyword / SEO angle**, desired length, and the **call-to-action**
- Hints: `author=`, `date=`, `category=`

The subagent will:
- Draft clear, on-brand copy that delivers the brief's angle — original prose, but grounded: it will **not** invent statistics, quotes, customer names, or external URLs (it marks those `<!-- TODO -->` and flags them).
- Match the blog format: read `postSchema` in `src/content.config.ts` + recent `src/content/blog/en/*.md` posts (frontmatter fields + Markdown body conventions + the `seo` block).
- Use the **in-body components** (Comparison Table, Callout, CTA Banner) where the content earns it, so the post renders fully branded and round-trips in the Sveltia editor.
- Write `src/content/blog/en/<slug>.md` with proper frontmatter (title, description, date, author, categories, seo) and a Markdown body.
- Insert **placeholder** image paths for any requested hero/cover and **list them for you to upload to the CDN** — it never fabricates `static.infragistics.com` URLs that would silently 404.
- Validate with `scripts/validate-content.mjs` (it skips a full `astro build` when a dev server / parity job is running, to avoid clobbering it).

It edits **only** `src/content/blog/en/<slug>.md`, never locale files or shared components. It does **not run git itself** — instead it hands you ready-to-run commands to land the post on the **`cms-content`** branch (the same branch Sveltia commits to) and open a review PR to `staging`. It reports the file created, the section outline, components used, any images needing real URLs, and anything it assumed or flagged (missing author/date, TODO stats to supply, assumed category).

Example: `/blog-from-brief  Topic: why iframe embedding limits SaaS analytics; angle: build-vs-buy; audience: product leaders; include a comparison table; CTA: request a demo; author="Casey Ciniello"`
