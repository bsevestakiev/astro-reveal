#!/usr/bin/env node
// Fix #3 — replace lazy-load placeholder URLs in story markdown bodies with
// the real dashboard image URLs.
//
// The WP source had `<img src="...lazy-load.jpg" data-src="...real.jpg">`.
// The markdown migration captured only `src` (a gray placeholder image), so
// 3 stories render gray rectangles. This script:
//   1. reads the original wget mirror HTML at ../www.revealbi.io/stories/<slug>.html
//   2. extracts data-src URLs in document order, filtered to the customer-success namespace
//   3. replaces each `*-lazy-load.<ext>` URL in the .md with the corresponding data-src in order
//
// Usage: node scripts/parity-fix-story-lazy-load.mjs [--dry-run]

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoAstro = join(here, '..')
const repoRoot = resolve(repoAstro, '..')
const ORIGINAL_ROOT = join(repoRoot, 'www.revealbi.io', 'stories')
const STORIES_DIR = join(repoAstro, 'src/content/stories/en')

const DRY_RUN = process.argv.includes('--dry-run')

const TARGETS = [
  'avion',
  'lanxing-drives-data-driven-decision-making-in-the-supply-chain-with-reveal',
  'overwhelming-data-easy-to-digest-and-use-for-decision-making-with-reveal',
]

function getDataSrcs(html) {
  const out = []
  const re = /data-src="(https:\/\/static\.infragistics\.com\/marketing\/reveal\/customer-success\/[^"]+)"/g
  for (const m of html.matchAll(re)) out.push(m[1])
  return out
}

for (const slug of TARGETS) {
  const htmlPath = join(ORIGINAL_ROOT, `${slug}.html`)
  const mdPath = join(STORIES_DIR, `${slug}.md`)
  if (!existsSync(htmlPath)) { console.log(`[skip] no mirror: ${slug}`); continue }
  if (!existsSync(mdPath)) { console.log(`[skip] no md: ${slug}`); continue }

  const dataSrcs = getDataSrcs(readFileSync(htmlPath, 'utf8'))
  const md = readFileSync(mdPath, 'utf8')
  const lazyRe = /https:\/\/static\.infragistics\.com\/marketing\/reveal\/customer-success\/[^\s)]+-lazy-load\.[a-z]+/g
  const lazyMatches = md.match(lazyRe) || []

  if (lazyMatches.length !== dataSrcs.length) {
    console.log(`[mismatch] ${slug}: md has ${lazyMatches.length} lazy-load refs, html has ${dataSrcs.length} data-srcs — skipping`)
    continue
  }

  let i = 0
  const out = md.replace(lazyRe, () => dataSrcs[i++])

  console.log(`[ok] ${slug}: ${lazyMatches.length} refs rewritten`)
  if (!DRY_RUN) writeFileSync(mdPath, out)
}

if (DRY_RUN) console.log('\n[DRY RUN] No files written.')
