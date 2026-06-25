#!/usr/bin/env node
// Fix the story sidebar metadata regression.
//
// 8 stories embed the right-column metadata block as body markdown:
//   - ### Industry
//
//     Supply Chain
//   - ### Markets Served
//     ...
//   - ### Top Challenges
//     - ...
//   - ### Why Reveal
//     - ...
//
// The story template renders an empty <aside> because frontmatter has no
// industry/markets/etc. This script extracts those four sections, writes them
// to frontmatter, and removes the block from the body. The schema must be
// extended with `industry`, `marketsServed`, `topChallenges`, `whyReveal` for
// these new fields to be exposed via `story.data`.
//
// Usage: node scripts/parity-fix-story-metadata.mjs [--dry-run]

import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const STORIES_DIR = join(here, '..', 'src/content/stories/en')
const DRY_RUN = process.argv.includes('--dry-run')

// The metadata block spans 4 consecutive "- ### Heading\n\n  body" entries.
// Body for Industry/Markets is plain text; for Top Challenges/Why Reveal it's
// a nested bullet list.
const BLOCK_RE =
  /\n?- ### Industry\s*\n\s*\n([\s\S]*?)\n- ### Markets Served\s*\n\s*\n([\s\S]*?)\n- ### Top Challenges\s*\n\s*\n([\s\S]*?)\n- ### Why Reveal\s*\n\s*\n([\s\S]*?)(?=\n\s*\n##|\n---|$)/

function parseBullets(text) {
  return text
    .split('\n')
    .map((l) => l.replace(/^\s*-\s+/, '').trim())
    .filter(Boolean)
}

function parsePlain(text) {
  return text.split('\n').map((l) => l.trim()).filter(Boolean).join(' ')
}

// YAML-escape a single-line string by wrapping in double quotes and escaping
// embedded backslashes / double quotes. Sufficient for our content (no
// multi-line values, no control chars).
function yamlStr(s) {
  return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
}

function injectFrontmatter(src, fields) {
  // The frontmatter block is the first --- ... --- region.
  const m = src.match(/^---\n([\s\S]*?)\n---\n/)
  if (!m) throw new Error('no frontmatter found')
  const head = m[1]
  const body = src.slice(m[0].length)

  // Append new fields just before the closing ---. Preserve key order: any
  // existing keys stay first, new keys go in a stable order.
  const lines = []
  if (fields.industry) lines.push(`industry: ${yamlStr(fields.industry)}`)
  if (fields.marketsServed) lines.push(`marketsServed: ${yamlStr(fields.marketsServed)}`)
  if (fields.topChallenges?.length) {
    lines.push('topChallenges:')
    for (const c of fields.topChallenges) lines.push(`  - ${yamlStr(c)}`)
  }
  if (fields.whyReveal?.length) {
    lines.push('whyReveal:')
    for (const c of fields.whyReveal) lines.push(`  - ${yamlStr(c)}`)
  }
  return `---\n${head}\n${lines.join('\n')}\n---\n${body}`
}

let touched = 0
let skipped = 0

for (const f of readdirSync(STORIES_DIR)) {
  if (!f.endsWith('.md')) continue
  const path = join(STORIES_DIR, f)
  const src = readFileSync(path, 'utf8')
  const m = src.match(BLOCK_RE)
  if (!m) { skipped++; continue }

  const fields = {
    industry: parsePlain(m[1]),
    marketsServed: parsePlain(m[2]),
    topChallenges: parseBullets(m[3]),
    whyReveal: parseBullets(m[4]),
  }

  // Strip the block from the body, leaving a single blank line in its place.
  const withoutBlock = src.replace(BLOCK_RE, '\n')
  const out = injectFrontmatter(withoutBlock, fields)

  console.log(`[ok] ${f}: industry="${fields.industry}", challenges=${fields.topChallenges.length}, why=${fields.whyReveal.length}`)
  if (!DRY_RUN) writeFileSync(path, out)
  touched++
}

console.log(`\nTouched: ${touched}, skipped: ${skipped}`)
if (DRY_RUN) console.log('[DRY RUN] No files written.')
