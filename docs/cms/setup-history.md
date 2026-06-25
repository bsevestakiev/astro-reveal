# Sveltia CMS Setup Plan — Astro Reveal

A leaner sibling of `keystatic-setup.md`. Sveltia is a modernized fork of Decap CMS — pure static admin (no SSR), git-backed, browser-only auth. It models our `{ type, ...flat }` section shape natively via the `list` widget's `types`, which is why we're switching after Keystatic K1.2 hit the `discriminant`/`value` wall.

---

## Why Sveltia (vs Keystatic, vs others)

- **Data shape match.** `list` widget with `types: [...]` writes exactly `- type: hero\n  headline: ...` — no schema migration of existing 110+ MD files.
- **Static admin.** Single HTML page + JS bundle. Drops into `/admin` on S3. No Node adapter, no env-gated build, no second deploy target.
- **Git-native.** Editors authenticate against GitHub in the browser; saves are PRs/commits to `bsevestakiev/astro-reveal`. n8n pipeline keeps working unchanged.
- **Active maintenance.** Decap is in slow mode; Sveltia is the actively-developed inheritor with the same config grammar.

---

## Phase S0 — Back out Keystatic (clean slate)

Don't carry dead weight forward. Revert the K1.1 install before adding Sveltia, so package.json stays minimal.

- Uninstall `@keystatic/core`, `@keystatic/astro`, `@astrojs/react`, `react`, `react-dom`, `cross-env`.
- Revert `astro.config.mjs` to the pre-Keystatic state (drop `keystaticEnabled`, the conditional integrations, both imports).
- Remove the `dev:cms` script from `package.json`.
- Delete `astro-reveal/keystatic.config.ts`.
- Verify `npm run build` is green.
- One commit: `chore(cms): revert Keystatic K1 — moving to Sveltia`.

The i18n SectionRenderer fix from `ea4e2b6` STAYS — that was independent of Keystatic.

---

## Phase S1 — Local-mode bootstrap

**Goal:** admin loads against the real repo content; one editor can read pages without errors.

### S1.1 Drop in the admin shell
Two files in `astro-reveal/public/admin/`:

- `index.html` — boilerplate, loads Sveltia's CDN bundle (`<script src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js">`). ~15 lines.
- `config.yml` — the full collection schema (the meaty file; see S2).

Astro serves `public/` verbatim, so `/admin` works in `npm run dev` and ships in `dist/admin/` on build. No integration, no plugin.

### S1.2 Minimum viable config
Start with one collection, no section types yet — just `title` and `description` editing on `pages/en/*`. Confirms file resolution, frontmatter parsing, and round-tripping work before piling on 27 section types.

```yaml
backend:
  name: github
  repo: bsevestakiev/astro-reveal
  branch: main
local_backend: true   # for `npm run dev` against local files via CLI proxy

media_folder: 'astro-reveal/public/images'
public_folder: '/images'

collections:
  - name: pages_en
    label: 'Pages (EN)'
    folder: 'astro-reveal/src/content/pages/en'
    extension: md
    format: yaml-frontmatter
    create: false           # no creating new pages from CMS in S1
    slug: '{{filename}}'
    fields:
      - { name: title, label: Title, widget: string }
      - { name: description, label: Description, widget: text, required: false }
      - { name: cover, label: Cover URL, widget: string, required: false }
      - { name: body, label: Body, widget: markdown, required: false }
```

`local_backend: true` requires the [@sveltia/cms-proxy-server](https://github.com/sveltia/sveltia-cms#local-development) running locally — a one-line `npx sveltia-cms-proxy-server` to read/write files without OAuth. Use this for S1 only.

### S1.3 Smoke test
Visit `localhost:4321/admin` → the local-backend prompt appears → click in → list shows 55 pages. Open `about-us`, edit `description`, save, `git diff` should show only the description line.

---

## Phase S2 — Section schema (the big work)

This is where most of the implementation time goes. ~300-500 lines of YAML config defining all 27 section types under one `list` widget.

### S2.1 Pattern
```yaml
- name: sections
  label: Sections
  widget: list
  types:                     # this is the key — generates `{type: 'X', ...flat}`
    - name: hero            # writes as `type: hero`
      label: Hero
      fields:
        - { name: headline, label: Headline (HTML allowed), widget: text }
        - { name: subheadlines, label: Subheadlines, widget: list,
            field: { name: line, widget: string } }
        - { name: ctaLabel, label: CTA Label, widget: string, required: false }
        - { name: secondaryCtaLabel, label: Secondary CTA Label, widget: string, required: false }
        - { name: secondaryCtaUrl, label: Secondary CTA URL, widget: string, required: false }
        - { name: image, label: Image URL, widget: string, required: false }
        - { name: imageAlt, label: Image Alt, widget: string, required: false }
        - { name: zone, label: Zone, widget: number, value_type: int, required: false }
    - name: dark-hero
      label: Dark Hero
      fields: [...]
    # 25 more
```

### S2.2 Reuse the Keystatic config as input
The 623-line `keystatic.config.ts` we wrote (now deleted in S0) had the field-by-field breakdown for all 27 sections — judgment calls already made. Recover it from git history (`git show <sha>:astro-reveal/keystatic.config.ts`) and translate the field shapes into Sveltia YAML. Mechanical translation, no fresh design.

### S2.3 Field-type cheat sheet (Keystatic → Sveltia)
| Keystatic | Sveltia |
|---|---|
| `fields.text` | `widget: string` |
| `fields.text({ multiline: true })` | `widget: text` |
| `fields.integer` | `widget: number, value_type: int` |
| `fields.checkbox` | `widget: boolean` |
| `fields.select(options)` | `widget: select, options: [...]` |
| `fields.array(field)` | `widget: list, field: {...}` |
| `fields.array(fields.object({...}))` | `widget: list, fields: [...]` |
| `fields.object({...})` | `widget: object, fields: [...]` |
| `fields.markdoc` | `widget: markdown` |
| `fields.blocks({...})` | `widget: list, types: [...]` ← **the key one** |

### S2.4 Validation
Run `npm run dev`, open every page once in the admin (no save). Any "field not defined" warning means our schema is missing something n8n produced. Fix iteratively. No saves until a clean read pass.

---

## Phase S3 — GitHub auth

**Goal:** drop `local_backend: true`; editors authenticate via GitHub from a deployed admin URL.

### S3.1 Pick auth strategy
Sveltia supports three (Decap-compatible):

- **OAuth App + proxy** — needs a tiny auth-proxy endpoint to do the code-for-token exchange (browser can't hold a client secret). Cloudflare Worker or AWS Lambda, ~30 lines. **Most flexible.**
- **GitHub PAT** — editor pastes a personal access token. **Zero infra**, but security smell (PATs in browser localStorage) and no per-editor revocation flow.
- **Device Flow** (newer Sveltia option) — no proxy needed, no PAT — uses GitHub's device-code grant. **Best of both** if Sveltia's support is solid in our version.

Recommendation: try **Device Flow** first; fall back to a Cloudflare Worker proxy if it doesn't work.

### S3.2 OAuth App (proxy or device flow path)
- Create GitHub OAuth App owned by `bsevestakiev` (or Infragistics org once that's decided).
- Authorization callback URL: `https://revealbi.io/admin/` (proxy path) or unused (device flow).
- Permissions: `repo` scope on `astro-reveal` only.
- Store `GITHUB_CLIENT_ID` in `config.yml` (public OK for OAuth client ID); secret only in the proxy if used.

### S3.3 Auth allowlist
Sveltia uses GitHub's collaborator list. Make sure the repo's "Settings → Collaborators" only has people you want editing. No additional allowlist file needed.

---

## Phase S4 — Production deploy

### S4.1 Where the admin lives
Two viable paths:

- **A. Same site, `/admin` path** (recommended). Files build into `dist/admin/`, sync to S3 alongside the rest. Editors hit `revealbi.io/admin/`. CloudFront cache rule: short TTL on `/admin/*` so config updates propagate.
- **B. Separate subdomain** `admin.revealbi.io`. Different S3 bucket + CloudFront distribution. Cleaner separation; more infra. Only worth it if you want isolation for security/auditing.

Default to A. The "few MB of static JS" argument from earlier still stands.

### S4.2 CI changes
Zero. The admin is just files in `public/`. Existing `npm run build && aws s3 sync && cloudfront invalidate` picks them up.

### S4.3 Drop `local_backend`
After S3 ships and editors sign in successfully, remove `local_backend: true` from `config.yml` (or env-gate it for dev). Commit.

---

## Phase S5 — n8n coexistence

Identical rules to keystatic-setup.md K3 — paths don't change, only the editor tool does:

- Editors edit only `pages/en/*` and `i18n/en.yml` via the admin.
- n8n writes only `{es,ja,ko,pt-BR}/*`.
- No conflicts because paths don't overlap.
- Optional: add a banner in non-EN collections via `description: "Auto-generated — edit /en instead"`.

Single-direction fan-out: editor commits EN → n8n webhook → translates → commits non-EN → CI builds.

---

## Out of scope for this plan

- Visual page builder / WYSIWYG (Sveltia is structured forms, like Keystatic was).
- Migrating CDN images into a Sveltia-managed media library — keep using `widget: string` for `static.infragistics.com` URLs; only use file upload for new locally-stored assets.
- Blog / whitepapers / glossary collections — pages first; layer the rest on once pages is validated.
- Scheduled publishing — same workaround as before (staged branch + GH Actions cron).

---

## Decisions to make before starting

1. **Auth strategy:** Device Flow vs OAuth proxy vs PAT (S3.1). Probably Device Flow.
2. **Admin location:** `/admin` path vs subdomain (S4.1). Probably `/admin`.
3. **Local-only smoke test first:** spend a half-day on S1+S2 with `local_backend: true` before any auth/deploy work, to confirm the data shape really does round-trip cleanly. If it doesn't, this plan is wrong and we stop.

---

## Sequence and effort estimate

| Phase | Effort | Blocking? |
|---|---|---|
| S0 — Back out Keystatic | 30 min | Yes — clean slate before anything new |
| S1 — Local bootstrap (title/desc only) | 1-2h | Yes — proves the shell works |
| S2 — All 27 section types in YAML | 4-8h | Yes — this is the bulk of the work |
| S3 — GitHub auth | 1-3h | No (can defer if local-only is enough for now) |
| S4 — Production deploy | 1h | No |
| S5 — n8n doc | 30 min | No |

S0 + S1 + S2 = ~half a day to first usable local CMS. Decide after S2 whether the editing UX is good enough to invest in S3/S4.
