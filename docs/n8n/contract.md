# n8n Translation Contract

Source-of-truth files the n8n translation pipeline reads from / writes to, plus the rules every translation pass must respect.

## File inventory

### Page content (per locale)
```
src/content/pages/<lang>/<slug>.md
src/content/blog/<lang>/<slug>.md
src/content/whitepapers/<lang>/<slug>.md
src/content/webinars/<lang>/<slug>.md
src/content/stories/<lang>/<slug>.md
src/content/glossary/<lang>/<slug>.md
```
The English files are hand-edited. The pipeline produces matching files under `<lang>/` paths (`es/`, `ja/`, `ko/`, `pt-BR/`).

### Chrome strings (Header / Footer / DemoModal)
```
src/i18n/en.yml         ← hand-edited source of truth
src/i18n/es.yml         ← n8n output
src/i18n/ja.yml         ← n8n output
src/i18n/ko.yml         ← n8n output
src/i18n/pt-BR.yml      ← n8n output
```
Missing keys in non-English files fall back to `en.yml` at build time (see `src/i18n/index.ts`). A locale file containing just `{}` is valid — the site renders English for unknown keys.

### Translatable-keys reference
```
dist/translatable-keys.json
```
Generated at build time by `src/pages/translatable-keys.json.ts`. Lists every page-section field that should be translated (`translatable`, `translatable-html`) or preserved verbatim (`asset`). The pipeline consumes this so it doesn't have to re-derive the schema.

The annotations themselves live on the Zod schema (`src/content/config.ts`) via `.describe('translatable')` / `.describe('translatable-html')` / `.describe('asset')`.

## Write ownership

The editor (humans, via Sveltia) and n8n share write access to the locale folders, but the workflow architecture prevents racing:

| Path | Primary writer | Notes |
|---|---|---|
| `src/content/<collection>/en/*` | Editor | Source of truth. n8n only reads. |
| `src/content/<collection>/{es,ja,ko,pt-BR}/*` | Either | Editors may translate via Sveltia (locale tabs + OpenAI button); n8n fills in any file an editor hasn't created. **First writer wins.** |
| `src/i18n/en.yml` | Editor | Source of truth for chrome strings. |
| `src/i18n/{es,ja,ko,pt-BR}.yml` | Either | Same first-writer-wins rule. |
| `src/content/config.ts` (Zod schema, `.describe()` annotations) | Editor / engineering | Schema changes here drive `translatable-keys.json` regeneration. n8n must respect new annotations on next pass. |
| `n8n-contract.md`, `n8n-knowledgebase.md` | Engineering | Both sides read; only humans write. |

### Why first-writer-wins is safe

n8n is **missing-files-only**: its `Find Missing Pages` step lists EN entries whose non-EN counterpart doesn't exist, and the GitHub PUT (now idempotent with `sha`) treats existing non-EN files as untouchable. So an editor's translation written through Sveltia is preserved on every subsequent n8n pass.

### Re-translation

If you want n8n to regenerate a non-EN file an editor previously wrote, `git rm` it and push — the next n8n pass will recreate it. (See `n8n/knowledgebase.md` "Re-translate a JA page" for the playbook.) This is the only way to overwrite an editor translation.

### EN-edit drift

When an EN file is edited, the existing non-EN counterparts go stale (n8n won't re-translate them because they exist). Two ways to handle:
- **Manual:** delete the affected non-EN file, push, let n8n regenerate.
- **Editor refresh:** open the entry in Sveltia, switch to the non-EN tab, click "Translate" to re-fill from the new EN.

There's no automation that detects EN drift today — that's the trade-off for letting both writers coexist.

### Commit hygiene

A single commit must not touch both `en/` and any non-en locale. Split into two commits — one editor-owned, one n8n-owned (or one en, one translation). Keeps `git log` legible and lets either side audit its own commits.

Enforced by `scripts/check-locale-isolation.mjs` (run via `npm run check:locale-isolation`, or wire as a git pre-commit hook — see script header).

## Translation rules

### What to translate
- Any field that the schema marks `translatable` (plain text) or `translatable-html` (HTML body).
- Top-level `title` and `description` on every collection.
- Every leaf string in `src/i18n/en.yml`.

### What NOT to rewrite
- `image:`, `imageSrcset:`, `src:`, `cover:`, `icon:`, `logo:` — image paths.
- `href:`, `ctaHref:`, `ctaUrl:`, `secondaryCtaUrl:` — internal/external links.
- `type:`, `variant:`, `zone:`, `cols:`, `bgClass:` — schema discriminators and layout hints.
- `id:`, `slug:`, `class:` — DOM identifiers.
- `data-*` attribute values inside HTML bodies.

### HTML allowlist (for `translatable-html` fields)
- **Allowed tags:** `p`, `strong`, `em`, `a`, `ul`, `ol`, `li`, `br`, `h3`, `h4`, `h5`, `span`, `code`.
- **Allowed attributes:** `href`, `class`, `target`, `rel`.
- **`href` must start with** `/`, `https://`, `mailto:`, or `#`.
- **Banned:** `style`, `onclick` and other event handlers, `srcset`, `data-*`.

The pipeline must sanitize translated HTML against this allowlist *before* writing the YAML. As insurance, `scripts/validate-content.mjs` runs at the start of every build and fails CI on any violation in any locale.

### Frontmatter / body separation
- `.md` files use `---` frontmatter for structured fields and the body for free-form prose.
- The pipeline only translates frontmatter fields marked translatable in the schema, and the body content. It must preserve the `---` delimiters and field ordering verbatim outside of the translated values.

## Build-time enforcement

Run during `npm run build`:
1. `node scripts/validate-content.mjs` — scans every content file for HTML allowlist violations across all locales. Fails the build on any violation.
2. `astro build` — Zod's discriminated union catches typos in `type:` and missing required fields. `dist/translatable-keys.json` is emitted as a static endpoint.

Run manually:
- `npm run validate:content` — same scan without building.
