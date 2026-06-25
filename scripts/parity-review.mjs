#!/usr/bin/env node
// Drive Sonnet subagents via `claude -p` to review parity screenshots.
// Reads parity/last-run.json, skips already-verdicted pages, spawns N concurrent
// subprocesses, expects each subagent to write parity/verdicts/<slug>.json.
//
// Usage:
//   node scripts/parity-review.mjs                       # default concurrency 5
//   node scripts/parity-review.mjs --concurrency 8
//   node scripts/parity-review.mjs --only /pricing/ /ai/
//   node scripts/parity-review.mjs --max 10              # cap pages reviewed this run

import { readFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const here = dirname(fileURLToPath(import.meta.url))
const repo = join(here, '..')
const RUN_JSON = join(repo, 'parity', 'last-run.json')
const VERDICTS_DIR = join(repo, 'parity', 'verdicts')

const MODEL = 'sonnet'
const TIMEOUT_MS = 360_000

function parseArgs(argv) {
  const out = { concurrency: 5, only: [], max: Infinity }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--concurrency') out.concurrency = Number(argv[++i])
    else if (a === '--max') out.max = Number(argv[++i])
    else if (a === '--only') { while (argv[i + 1] && !argv[i + 1].startsWith('--')) out.only.push(argv[++i]) }
  }
  return out
}

function promptFor(page) {
  const reads = page.viewports.flatMap(v => [v.originalPng, v.builtPng]).map(p => `- ${p}`).join('\n')
  const verdictFile = join(VERDICTS_DIR, page.slug + '.json')
  return `Visual parity review. Page: \`${page.path}\`

Read these 6 PNGs in parallel as your FIRST action (no "now let me…" narration):
${reads}

Rubric:
- "match"  — equivalent OR differs only by additive content (FAQs/testimonials/stats/fuller footer/related-articles = approved enhancements) or state (accordion open vs closed).
- "minor"  — small regression: spacing, color shade, one image swapped. No missing content.
- "major"  — ORIGINAL content missing in BUILT, broken layout, wrong copy in headings/CTAs, missing inline images that are part of the article body.
- "broken" — BUILT unusable.

Confidence: high|medium|low. Cite a specific ORIGINAL heading or element when claiming missing content. Page-height alone is not evidence.

Write \`${verdictFile}\`:
{"path":"${page.path}","verdict":"...","confidence":"...","summary":"one sentence","deltas":[{"viewport":"mobile|tablet|desktop","severity":"minor|major|broken","where":"...","description":"cite ORIGINAL heading when claiming missing content"}],"notes":"additive/state/ambiguity"}

Empty deltas ⇒ verdict must be "match".`
}

function runClaude(prompt) {
  return new Promise((resolve) => {
    const proc = spawn('claude', [
      '-p',
      '--model', MODEL,
      '--permission-mode', 'bypassPermissions',
    ], { stdio: ['pipe', 'pipe', 'pipe'], cwd: repo })
    let stdout = '', stderr = ''
    const timer = setTimeout(() => { proc.kill('SIGTERM') }, TIMEOUT_MS)
    proc.stdout.on('data', d => stdout += d.toString())
    proc.stderr.on('data', d => stderr += d.toString())
    proc.on('close', (code) => {
      clearTimeout(timer)
      resolve({ code, stdout, stderr })
    })
    proc.stdin.write(prompt)
    proc.stdin.end()
  })
}

async function reviewPage(page) {
  const verdictFile = join(VERDICTS_DIR, page.slug + '.json')
  if (existsSync(verdictFile)) return { skipped: true, slug: page.slug }
  const start = Date.now()
  await runClaude(promptFor(page))
  const elapsed = ((Date.now() - start) / 1000).toFixed(1)
  if (existsSync(verdictFile)) {
    let verdict = 'unknown'
    try { verdict = JSON.parse(readFileSync(verdictFile, 'utf-8')).verdict } catch {}
    return { ok: true, slug: page.slug, path: page.path, verdict, elapsed }
  }
  return { ok: false, slug: page.slug, path: page.path, elapsed }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  mkdirSync(VERDICTS_DIR, { recursive: true })
  const run = JSON.parse(readFileSync(RUN_JSON, 'utf-8'))
  let pages = run.filter(p => p.path !== '/admin/')
  if (args.only.length > 0) {
    const want = new Set(args.only.map(p => p.endsWith('/') ? p : p + '/'))
    pages = pages.filter(p => want.has(p.path))
  }
  pages = pages.filter(p => !existsSync(join(VERDICTS_DIR, p.slug + '.json')))
  if (Number.isFinite(args.max)) pages = pages.slice(0, args.max)
  console.log(`reviewing ${pages.length} pages, concurrency=${args.concurrency}`)

  let done = 0
  const queue = [...pages]
  async function worker() {
    while (true) {
      const p = queue.shift()
      if (!p) return
      const r = await reviewPage(p)
      done++
      const tag = r.ok ? r.verdict.toUpperCase().padEnd(6) : (r.skipped ? 'SKIP  ' : 'FAIL  ')
      console.log(`[${done}/${pages.length}] ${tag} ${p.path} (${r.elapsed || '?'}s)`)
    }
  }
  await Promise.all(Array.from({ length: args.concurrency }, () => worker()))

  const remaining = pages.filter(p => !existsSync(join(VERDICTS_DIR, p.slug + '.json'))).length
  console.log(`\ndone. ${pages.length - remaining} verdicts written, ${remaining} failed`)
}

main().catch(e => { console.error(e); process.exit(1) })
