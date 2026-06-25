# Publish-on-Save — test drive (this repo only)

This is the sandbox copy of the site (`bsevestakiev/astro-reveal`). It has **no
deploy workflow and no AWS** — "promote to production" here just means *merged to
`main`*. Nothing can touch the live site.

## What you're testing
The editor experience: open a post in Sveltia, tick **Publish to production now**,
pick **Published by**, hit **Save** — and watch the post flow to `main` on its
own, attributed to that person, with the two control fields stripped out.

## Run it (Windows)
Double-click **`author.cmd`** (or run it from a terminal at the repo root). It:
1. checks out the `cms-content` branch,
2. starts the Astro dev server (live preview at http://localhost:4321),
3. starts the publish watcher,
4. opens http://localhost:4321/admin/.

> **Run on the Windows side, not inside WSL.** The watcher must run where the
> files are actually written (the Windows browser saves them), or it won't see
> the change. `author.cmd` does this for you.

## In the browser
1. At `/admin/`, choose **Work with Local Repository** and pick this repo's
   folder (Sveltia local-backend mode — your saves write to disk, not GitHub).
2. Open any post under **📰 Blog**.
3. Set **Published by** to your name and tick **Publish to production now**.
4. **Save.**

## What should happen
- The watcher prints `▶ publishing "<slug>" as <you>` then `✔ pushed to cms-content`.
- The **Promote content to main (TEST)** workflow runs on GitHub
  (https://github.com/bsevestakiev/astro-reveal/actions): blog-only guard →
  validate → merge `cms-content` → `main`.
- On `main`, the post has your edit, the commit is authored to you, and
  `publishNow` / `publishedBy` are gone.

## Notes
- A normal Save **without** ticking Publish just writes the file locally — it does
  **not** promote. Only the tick ships it.
- A change touching anything outside `src/content/blog/en/` is **refused** by the
  workflow guard (proved by the negative test).
- This is the test rig. The production design (deploy key, nginx, OAuth gate,
  staging→main) is in `docs/cms/publish-on-save-spec.md`.
