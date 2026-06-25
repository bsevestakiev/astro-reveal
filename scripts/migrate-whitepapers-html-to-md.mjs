#!/usr/bin/env node
/*
 * One-time migration: strip WordPress-export HTML cruft from whitepaper
 * bodies and convert chapter-divider H2s to Markdown.
 *
 * Mirrors the four transforms Phase 3 applied by hand to
 * bi-deployment-guide.md (see docs/handoff/whitepapers-markdown-refactor-plan.md):
 *
 *   1. <h2 class="wp-block-heading whitepapers__headline-dividers" id="chapter-N">
 *        (<strong>)+ Title (</strong>)+
 *      </h2>
 *      → ## **Title** {#chapter-N}      (collapses nested <strong>)
 *
 *   2. Strip standalone `class="wp-block-heading"` (h3s, ul, figure, etc).
 *      Leaves any *other* classes on the element intact.
 *
 *   3. Unwrap standalone single-line <p>text</p> paragraphs.
 *      Skipped: <p> with attributes (e.g. class), multi-line <p> blocks.
 *
 *   4. Delete empty <p></p>.
 *
 * Run modes:
 *   node scripts/migrate-whitepapers-html-to-md.mjs --dry-run   # preview
 *   node scripts/migrate-whitepapers-html-to-md.mjs             # write
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const DIR = 'src/content/whitepapers/en'
const DRY_RUN = process.argv.includes('--dry-run')

function migrate(src) {
  let out = src

  out = out.replace(
    /<h2 class="wp-block-heading whitepapers__headline-dividers" id="(chapter-[0-9]+)">(?:<strong>)+([^<]+)(?:<\/strong>)+<\/h2>/g,
    '## **$2** {#$1}'
  )

  out = out.replace(/ class="wp-block-heading"/g, '')

  out = out.replace(/^<p>(.+)<\/p>$/gm, '$1')

  out = out.replace(/^<p><\/p>\r?\n?/gm, '')

  return out
}

function countLineDiff(a, b) {
  const al = a.split('\n')
  const bl = b.split('\n')
  let count = 0
  const max = Math.max(al.length, bl.length)
  for (let i = 0; i < max; i++) {
    if (al[i] !== bl[i]) count++
  }
  return count
}

const files = readdirSync(DIR).filter((f) => f.endsWith('.md')).sort()
let filesChanged = 0
let totalLines = 0

for (const fname of files) {
  const path = join(DIR, fname)
  const orig = readFileSync(path, 'utf-8')
  const next = migrate(orig)
  if (next === orig) {
    console.log(`  ${fname.padEnd(72)}  unchanged`)
    continue
  }
  const diff = countLineDiff(orig, next)
  filesChanged++
  totalLines += diff
  if (DRY_RUN) {
    console.log(`  ${fname.padEnd(72)}  ${String(diff).padStart(4)} lines (dry-run)`)
  } else {
    writeFileSync(path, next, 'utf-8')
    console.log(`  ${fname.padEnd(72)}  ${String(diff).padStart(4)} lines`)
  }
}

const verb = DRY_RUN ? 'would change' : 'changed'
console.log(`\n${filesChanged} file(s) ${verb}, ~${totalLines} lines total.`)
