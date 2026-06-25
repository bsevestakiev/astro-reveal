#!/usr/bin/env node
// Fix #5 — whitepaper frontmatter regressions:
//   - title: 20/21 markdown files have Title-Case or SEO-suffixed titles;
//            WP <h1> is the canonical heading
//   - author: 20/21 are "Featured Story"; WP renders the real author bio,
//             which is what unlocks the About-the-Author block
//
// For each .md file, scrape the matching wget-mirror HTML for the canonical
// <h1> and the author shown in About-the-Author. Rewrite frontmatter to match.
// (Bios live in `src/lib/blog-authors.ts`, so no bio field is written here.)
//
// Usage: node scripts/parity-fix-whitepaper-meta.mjs [--dry-run]

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoAstro = join(here, '..')
const repoRoot = resolve(repoAstro, '..')
const MIRROR = join(repoRoot, 'www.revealbi.io', 'whitepapers')
const WP = join(repoAstro, 'src/content/whitepapers/en')

const DRY_RUN = process.argv.includes('--dry-run')

function decodeEntities(s) {
  return s
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, '’')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim()
}

let titleChanged = 0
let authorChanged = 0
let skipped = 0

for (const f of readdirSync(WP)) {
  if (!f.endsWith('.md')) continue
  const slug = f.replace(/\.md$/, '')
  const htmlPath = join(MIRROR, `${slug}.html`)
  if (!existsSync(htmlPath)) { console.log(`[skip] no mirror: ${slug}`); skipped++; continue }

  const html = readFileSync(htmlPath, 'utf8')
  const h1m = html.match(/<h1[^>]*>([^<]+)<\/h1>/)
  if (!h1m) { console.log(`[skip] no h1: ${slug}`); skipped++; continue }
  const newTitle = decodeEntities(h1m[1])

  // Extract author name from "About the Author" block.
  const authorBlock = html.match(/About the Author[\s\S]{0,2000}?<h3[^>]*>([^<]+)<\/h3>/)
  const newAuthor = authorBlock ? decodeEntities(authorBlock[1]) : null

  const mdPath = join(WP, f)
  let src = readFileSync(mdPath, 'utf8')
  let changed = false

  const titleM = src.match(/^title:\s*"([^"]+)"/m)
  if (titleM && titleM[1] !== newTitle) {
    src = src.replace(
      /^title:\s*"[^"]+"/m,
      `title: "${newTitle.replace(/"/g, '\\"')}"`,
    )
    console.log(`[title] ${slug}\n  was: ${titleM[1]}\n  new: ${newTitle}`)
    titleChanged++
    changed = true
  }

  if (newAuthor) {
    const authorM = src.match(/^author:\s*"([^"]+)"/m)
    if (authorM && authorM[1] !== newAuthor) {
      src = src.replace(
        /^author:\s*"[^"]+"/m,
        `author: "${newAuthor.replace(/"/g, '\\"')}"`,
      )
      console.log(`[author] ${slug}: ${authorM[1]} → ${newAuthor}`)
      authorChanged++
      changed = true
    }
  }

  if (changed && !DRY_RUN) writeFileSync(mdPath, src)
}

console.log(`\nTitles changed: ${titleChanged}, authors changed: ${authorChanged}, skipped: ${skipped}`)
if (DRY_RUN) console.log('[DRY RUN] No files written.')
