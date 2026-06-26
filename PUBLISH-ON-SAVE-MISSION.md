# Publish-on-Save — mission & handoff (TEST SANDBOX)

## Read this first (AI assistant)
You are in **`bsevestakiev/astro-reveal`**, a **sanitized sandbox copy** of the
Reveal marketing site. It is **NOT production**: no AWS, no deploy workflow, no
connection to the live site (`www.revealbi.io`).

⚠️ The repo also contains a `CLAUDE.md` inherited from the *real* project. It
describes production rules — AWS S3/CloudFront deploys, the `Infragistics-IS`
repo, a staging→main PR process. **Those rules DO NOT apply here.** This file is
your source of truth. Before doing anything, sanity-check you're in the sandbox:

```bash
git remote -v                       # must be bsevestakiev/astro-reveal
ls .github/workflows                # should contain ONLY promote-content.yml
gh secret list                      # should be EMPTY (no AWS creds)
```
Never re-add a deploy workflow, AWS secrets, or re-point the CMS at
`Infragistics-IS/*`. Keep this a sandbox.

---

## The product goal
Let **non-technical blog editors** publish a blog post to "production" (here:
the `main` branch) through the **Sveltia CMS UI** — by ticking a toggle and
hitting Save — *without* breaking the team's code-review conventions and
*without* giving editors dangerous access.

It should feel like WordPress's "Publish" button: edit → tick → Save → live.

## Constraints that shaped the design (why it's built this way)
- Editors have **no GitHub seats** (private-repo write = a paid seat) and we
  won't hand out an anonymous shared token. So editors never write to GitHub
  directly — a host credential does, and the editor's name is stamped as the
  commit **author** for attribution.
- Branch conventions exist to gate **code**, not content. A blog post is data:
  it can't break the build if validated, and is trivially revertable. So content
  gets its **own machine-gated lane**; code keeps its normal reviewed flow.
- Sveltia has no usable custom editor buttons, so the publish action is a plain
  **boolean field** (same pattern as the existing `ctaDemo` toggle).

## How it works (mechanism — already built and proven)
1. **Two transient CMS fields** on the blog collection (in
   `public/admin/config.yml`, NOT in the Zod schema):
   - `publishNow` (boolean) — "Publish to production now"
   - `publishedBy` (select) — who is publishing (→ commit author)
2. **Editor flow:** in Sveltia local-backend mode, the editor edits a post,
   sets `publishedBy`, ticks `publishNow`, and Saves. Files are written to the
   working tree (branch `cms-content`).
3. **Watcher** (`scripts/publish-watcher.mjs`, zero-dependency): on save, if
   `publishNow === true`, it strips the two control fields, commits **only that
   post** authored to the `publishedBy` person with a `[ship]` marker, and
   pushes to `cms-content`.
4. **Promote workflow** (`.github/workflows/promote-content.yml`): fires on a
   `[ship]` push to `cms-content`, enforces a **blog-only path allowlist**
   (anything outside `src/content/blog/en/` or `public/images/blog/` is
   refused), validates content, merges `cms-content → main`, and re-aligns the
   branches. In the sandbox "promote" = merged to `main` (no deploy).

Branch model here: `main` = "production", `cms-content` = holding branch.

### Already proven (2026-06-25)
- ✅ Positive: a post promoted to `main`, attributed to the picked editor, with
  the control fields stripped.
- ✅ Negative: a non-blog file pushed with `[ship]` was **refused** at the guard.
- ✅ A `cms-content` push **without** `[ship]` is skipped (no accidental promote).

---

## Your task on this dev server
Stand this machine up as the **always-on authoring host** so a human can drive
Sveltia in a browser and watch the publish flow:

1. `npm install` (Node 22).
2. `git checkout cms-content` (the watcher commits here).
3. Start the **Astro dev server** (`npm run dev`) — renders the live preview and
   serves `/admin/`.
4. Start the **publish watcher** (`node scripts/publish-watcher.mjs`).
5. Make `/admin/` reachable for the human's browser and confirm it loads.
6. When the human saves a post with the toggle on, **watch the `cms-content`
   push and the "Promote content to main" workflow** (`gh run watch`) and report
   what happened; debug anything that breaks.

You cannot operate the browser — the human ticks the toggle and Saves. You run
the servers and watch the git/Actions side.

### Environment notes (important)
- **Linux native FS = inotify works**, so the watcher reliably sees saves.
- **Sveltia local backend transport:** the File System Access API only works
  when the browser runs on the **same machine** as the files. If the human hits
  this server from a **remote** browser, FS Access API would touch *their*
  laptop, not this server — so run the **Sveltia local-backend proxy**
  (`npx @sveltia/cms-proxy-server`) so file I/O happens server-side, and/or front
  the dev server appropriately. Pick the transport that matches where the
  browser runs and verify a save actually lands on disk here.
- The dev server binds to localhost by default; expose it (`--host` / a reverse
  proxy) if the browser is remote. Use Chrome/Edge for FS Access API.
- `git push` needs a working credential for `cms-content` (the `gh` login or a
  deploy key). The watcher uses whatever git credential is configured.
- Edit the `EDITORS` map at the top of `scripts/publish-watcher.mjs` to match the
  names in the `publishedBy` dropdown (name → commit-author email).

## Reference
- `docs/cms/publish-on-save-spec.md` — the full **production** design (deploy key,
  nginx, OAuth gate, staging→main, attribution v2). This sandbox is its test rig.
- `TEST-PUBLISH-FLOW.md` — the quick test-drive steps (written for Windows; adapt
  to Linux: run the watcher + dev server directly instead of `author.cmd`).
- `scripts/publish-watcher.mjs`, `.github/workflows/promote-content.yml`.
