# n8n Translation Knowledge Base

Operational knowledge for the JA translation pipeline at `n8n/ja-translation.json`. Companion to `n8n-contract.md` — the contract is the spec (what to translate, what to preserve), this file is the troubleshooting log (what fails, why, how it's been patched).

Update this when you fix a new failure mode or learn something non-obvious. The recurring patterns section near the bottom is the cheatsheet.

## Workflow architecture

Two parallel branches that converge at the end:

### Page flow (top branch)
```
Manual Trigger → Get Tree → Find Missing Pages → Has Files
  → Loop Items
      → Get EN Content
      → Build Pages Prompt
      → Call Ollama (pages)
      → Encode Page Output
      → Check Existing JA Page
      → Create JA Page
    (loop)
  → Wait for Both
```
Translates `.md` files under `src/content/pages/en/` whose `ja/` counterpart doesn't exist. The LLM emits the **full file** (frontmatter + body) — this is what makes the path fragile. Every recorded failure has been the LLM mangling YAML/Markdown structure.

### i18n flow (bottom branch)
```
Manual Trigger → Get EN i18n → Get JA i18n → Diff i18n Keys → Has Missing Keys
  → Build i18n Prompt → Call Ollama (i18n)
  → Validate & Build YAML → PUT JA i18n
  → Wait for Both
```
Translates new keys in `src/i18n/en.yml` not yet present in `src/i18n/ja.yml`. The LLM emits a flat `{path: translation}` JSON map; `Validate & Build YAML` then **deterministically rebuilds** `ja.yml` by line-walking `en.yml` and substituting values with safe quoting. The LLM never emits YAML, so this branch has zero recorded LLM-formatting failures.

Both branches converge at `Wait for Both → Trigger Build`, which fires a `repository_dispatch` of type `translation-complete` to start the deploy workflow.

### Model
`gemma4:31b` via Ollama at `http://10.20.14.98:11434/api/generate`, `num_ctx: 16384`, `num_predict: 16384`, `temperature: 0.2` for i18n (default for pages).

## Page-flow LLM failure modes

The LLM emits the entire .md file as text, and the `Encode Page Output` Code node post-processes it before encoding to base64 for the GitHub PUT. Every fix has been a defensive transform inside that node.

| # | Failure mode | Repair | Symptom |
|---|---|---|---|
| 1 | Output wrapped in ```` ```markdown ```` / ```` ```yaml ```` code fence | Regex strip of the opening fence and trailing ```` ``` ```` | Build fails on unparseable content; raw output looks like a rendered code block |
| 2 | Missing opening `---` (~5% of early runs) | Prepend `---\n` if not at byte 0 (after fence/blank-line strip) | Astro content collection rejects the file |
| 3 | Missing closing `---` (commit `63901a3`) | Scan for `---` line; insert before first `<...>` line, else append at EOF | Frontmatter never terminates; everything is parsed as YAML |
| 4 | Specific JA pages had blank line before opening `---` (commit `71ea547`) | Hand-patched 3 affected files; workflow now strips leading blanks pre-check | Same as #2, but harder to trigger |
| 5 | YAML quote mismatches in frontmatter scalars (commit `4b55044`) | Greedy regex re-quotes scalars with deterministic safe wrapper | `Missing closing "quote at line N` from `validate-content.mjs` |

### Quote-mismatch detail (#5)
The LLM emits one of three broken shapes when a translatable value contains inline HTML:

```yaml
answer: "...<a href="/foo">...</a>..."   # unescaped " inside "..." wrapper
answer: "...<a href='/foo'>...'         # close quote is ' instead of " (typo)
answer: 'It's broken'                   # un-doubled ' inside '...' wrapper
```

**EN-source convention to know:** the EN files pick the outer wrapper *opposite* to the inner `<a href=…>` attribute quote (`'...'` outer when inner uses `"`, `"..."` outer when inner uses `'`). The LLM tends to "normalize" everything to `"..."` and breaks when the value has unescaped `"`.

The repair greedy-regex matches `^(\s*(?:-\s+)?[\w-]+:\s*)(['"])(.*)(['"])(\s*(?:#.*)?)$`, detects each shape, and re-emits with deterministic quoting:

- If value contains `"` but no `'` → outer `'...'` (with `''` doubling for any internal `'`).
- Otherwise → `JSON.stringify(value)` — always a valid YAML double-quoted scalar.

Multi-line scalars (block `|` / `>`) and unquoted bare scalars don't fit the regex and are intentionally skipped — they don't exhibit this failure mode.

## Page-flow operational issues (non-LLM)

### 422 "sha wasn't supplied" on re-runs

**Symptom:** `Create JA Page` returns `422 Invalid request. "sha" wasn't supplied.`

**Root cause:** GitHub's `PUT /repos/.../contents/{path}` is "create OR update" — updates require `sha`, creates don't. The original node never sent `sha`, so any race or re-run where the path already existed at PUT time failed. Triggers:
1. Workflow re-triggered while a previous run already committed the same file.
2. `Get Tree` returned a stale snapshot (GitHub's tree endpoint isn't strict read-after-write).
3. Two parallel runs racing on the same path.

**Fix (`f450b47`):** inserted `Check Existing JA Page` HTTP node before `Create JA Page`:
- `GET /contents/{ja_path}?ref=main` with `onError: continueRegularOutput` so a 404 doesn't halt the workflow.
- `Create JA Page` body is now `Object.assign({...base}, ($json && typeof $json.sha === 'string') ? { sha: $json.sha } : {})`.
- Missing path → no sha → CREATE; existing path → sha included → UPDATE.

PUT is now idempotent. Safe to re-run, safe under stale-tree, safe under races.

## Operational playbook

### Re-translate a JA page
1. `git rm src/content/pages/ja/<slug>.md`
2. Commit and push to main.
3. `Find Missing Pages` flags it on the next workflow run.

### Re-translate an i18n key
The i18n flow only translates **missing** keys (it deep-merges `ja.yml` over `en.yml`, so any present JA key is treated as up-to-date). To force re-translation, manually delete the line from `src/i18n/ja.yml`, commit, re-trigger.

### Deploy a workflow change
The repo's `n8n/ja-translation.json` is a **source-of-truth snapshot** — the running n8n instance does not auto-sync. After committing changes:
1. n8n → Workflows → "Astro Reveal — JA Translation".
2. Workflows → Import from File → upload the updated JSON.
3. Save and re-trigger.

If you skip this step, the running workflow keeps the old broken behavior. Symptom: the change committed to git isn't reflected in the next workflow run.

### Local build to check what n8n produced
```
powershell.exe -NoProfile -Command "npm run build"
```
`scripts/validate-content.mjs` runs first and fails fast on YAML/HTML allowlist violations — that's where most n8n output bugs surface.

## Architectural opportunity: make pages deterministic

The page flow is fragile because the LLM controls output syntax. Every recorded failure (#1–#5) is the LLM mangling structure. The i18n flow has zero such failures because it uses **value-only translation**: LLM emits `{path: translation}`, deterministic rebuilder reconstructs YAML.

The same pattern would work for pages:
1. Walk EN .md → extract `{path: value}` for every translatable scalar (per `dist/translatable-keys.json`).
2. Send to LLM with strict "return same keys, translated values" prompt.
3. Parse LLM JSON → rebuild JA .md by line-walking EN and substituting values with safe quoting.
4. Body content (free text + raw HTML after the closing `---`) translated separately or as a single block scalar.

Block scalars (`|`, `>`) and the body's HTML make this nontrivial — but it would eliminate failure modes #1–#5 simultaneously and replace targeted regex patches with a structural guarantee. Worth doing on the next major regression.

## Recurring patterns to recognize

- **`translate(pages): … [skip ci]`** commits authored by `bsevestakiev` are n8n outputs. The `[skip ci]` keeps each page commit from triggering CI; the deploy fires from the `repository_dispatch` after both branches complete.
- **`translate(i18n): ja.yml [skip ci]`** is the i18n branch's commit message.
- A failure in `Encode Page Output` post-LLM almost always means a new LLM-formatting shape. Inspect the broken file, identify the shape, add a regex repair to the node. Update this doc's failure-modes table.
- A failure in `Create JA Page` with 422 means a state mismatch (file exists/absent vs. expected). Check `origin/main` against the `Get Tree` snapshot timing. Should no longer happen since `f450b47`.
- A failure in `Validate & Build YAML` (i18n branch) usually means `Call Ollama (i18n)` truncated output (`done_reason: 'length'`) or returned non-JSON. The node throws with diagnostic info — read the message rather than the stack.
- The pages branch processes items via `Loop Items` (splitInBatches). On any item failure the workflow halts; remaining items are not processed. After fixing the cause, re-trigger and `Find Missing Pages` will pick up only the still-missing items.
