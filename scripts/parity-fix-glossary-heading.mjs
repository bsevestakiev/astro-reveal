#!/usr/bin/env node
// Fix #4 — glossary H1 mismatch.
//
// The WP source serves a long Yoast/SEO `<title>` and a short noun `<h1>`:
//   <title>What Is SaaS Analytics? KPIs, Challenges And Limitations</title>
//   <h1>SaaS Analytics</h1>
// The Astro migration only captured `title`, and the template uses it for
// both the document title and the H1. Built renders the long SEO copy as
// H1, which the reviewer flags as a copy regression.
//
// Fix: add a `heading` frontmatter field (translatable), populated from the
// WP mirror's `<h1>`. Template uses `heading ?? title` for the H1; `title`
// stays as the document title.
//
// Usage: node scripts/parity-fix-glossary-heading.mjs [--dry-run]

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoAstro = join(here, '..')
const repoRoot = resolve(repoAstro, '..')
const MIRROR = join(repoRoot, 'www.revealbi.io', 'glossary')
const GLOSSARY = join(repoAstro, 'src/content/glossary/en')

const DRY_RUN = process.argv.includes('--dry-run')

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

let touched = 0
let skipped = 0
let alreadyMatch = 0

for (const f of readdirSync(GLOSSARY)) {
  if (!f.endsWith('.md')) continue
  const slug = f.replace(/\.md$/, '')
  const htmlPath = join(MIRROR, `${slug}.html`)
  if (!existsSync(htmlPath)) { console.log(`[skip] no mirror: ${slug}`); skipped++; continue }

  const html = readFileSync(htmlPath, 'utf8')
  const m = html.match(/<h1[^>]*>([^<]+)<\/h1>/)
  if (!m) { console.log(`[skip] no h1: ${slug}`); skipped++; continue }
  const heading = decodeEntities(m[1].trim())

  const mdPath = join(GLOSSARY, f)
  const src = readFileSync(mdPath, 'utf8')

  // Already has a heading field?
  if (/^heading:\s/m.test(src)) { alreadyMatch++; continue }

  const titleMatch = src.match(/^title:\s*"([^"]+)"/m)
  if (!titleMatch) { console.log(`[skip] no title: ${slug}`); skipped++; continue }
  const title = titleMatch[1]

  // If short heading already equals title, no fix needed.
  if (heading === title) { alreadyMatch++; continue }

  const next = src.replace(
    /^(title:\s*"[^"]+"\n)/m,
    `$1heading: "${heading.replace(/"/g, '\\"')}"\n`,
  )
  console.log(`[ok] ${slug}: heading="${heading}" (was title="${title}")`)
  if (!DRY_RUN) writeFileSync(mdPath, next)
  touched++
}

console.log(`\nTouched: ${touched}, alreadyMatch: ${alreadyMatch}, skipped: ${skipped}`)
if (DRY_RUN) console.log('[DRY RUN] No files written.')
