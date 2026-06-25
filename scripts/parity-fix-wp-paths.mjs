#!/usr/bin/env node
// Fix #2 — rewrite WP-era image paths in blog markdown.
//
// Markdown files under src/content/blog/en/ reference body images at three
// shapes:
//   ![..](/wp-content/uploads/YYYY/MM/foo.png)
//   ![..](../wp-content/uploads/YYYY/MM/foo.png)
//   ![..](/../wp-staging.revealbi.io/wp-content/uploads/YYYY/MM/foo.png)
//
// And frontmatter `heroImage:` strings with the same shapes.
//
// `public/wp-content/` does not exist; assets live under `public/images/YYYY/MM/`.
// For each broken ref:
//   1. If `public/images/YYYY/MM/foo.png` exists → just rewrite path to /images/...
//   2. Else if the WP export sibling has `assets/images/foo.png` (flat dump),
//      copy it into `public/images/YYYY/MM/foo.png`, then rewrite.
//   3. Else log MISSING.
//
// Usage:
//   node scripts/parity-fix-wp-paths.mjs --dry-run                  # show plan, no writes
//   node scripts/parity-fix-wp-paths.mjs --only path1.md path2.md   # limit to specific files
//   node scripts/parity-fix-wp-paths.mjs                            # apply to all blogs

import { existsSync, mkdirSync, copyFileSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoAstro = join(here, '..')
const repoRoot = resolve(repoAstro, '..')
const BLOG_DIR = join(repoAstro, 'src/content/blog/en')
const PUBLIC_IMAGES = join(repoAstro, 'public/images')
const WP_EXPORT_FLAT = join(repoRoot, 'wp-export/output/assets/images')

const args = process.argv.slice(2)
const DRY_RUN = args.includes('--dry-run')
const onlyIdx = args.indexOf('--only')
const ONLY = onlyIdx >= 0 ? args.slice(onlyIdx + 1).map((p) => resolve(p)) : null

// Matches the path portion of any WP-content image ref.
// Captures group 1 = YYYY/MM/filename.ext
const WP_RE =
  /(?:\/\.\.\/wp-staging\.revealbi\.io)?(?:\.\.)?\/?wp-content\/uploads\/(\d{4}\/\d{2}\/[^"\s\)]+)/g

const stats = {
  filesTouched: 0,
  refsRewritten: 0,
  assetsAlreadyLocal: 0,
  assetsCopiedFromExport: 0,
  refsMissing: 0,
  missingList: [],
}

function listMarkdown() {
  const out = []
  for (const f of readdirSync(BLOG_DIR)) {
    if (!f.endsWith('.md')) continue
    out.push(join(BLOG_DIR, f))
  }
  return out
}

function ensureAsset(relPath) {
  // relPath = "YYYY/MM/filename.ext"
  const dest = join(PUBLIC_IMAGES, relPath)
  if (existsSync(dest)) {
    stats.assetsAlreadyLocal++
    return true
  }
  const fname = basename(relPath)
  const candidate = join(WP_EXPORT_FLAT, fname)
  if (existsSync(candidate)) {
    if (!DRY_RUN) {
      mkdirSync(dirname(dest), { recursive: true })
      copyFileSync(candidate, dest)
    }
    stats.assetsCopiedFromExport++
    return true
  }
  return false
}

function processFile(file) {
  const orig = readFileSync(file, 'utf8')
  let touched = false
  const next = orig.replace(WP_RE, (match, rel) => {
    if (ensureAsset(rel)) {
      stats.refsRewritten++
      touched = true
      return `/images/${rel}`
    }
    stats.refsMissing++
    stats.missingList.push({ file: basename(file), ref: match })
    return match
  })
  if (touched) {
    stats.filesTouched++
    if (!DRY_RUN) writeFileSync(file, next)
  }
}

function main() {
  const files = listMarkdown().filter((f) => !ONLY || ONLY.includes(f))
  for (const f of files) processFile(f)

  console.log(`Files touched:           ${stats.filesTouched}`)
  console.log(`Refs rewritten:          ${stats.refsRewritten}`)
  console.log(`  - already in public:   ${stats.assetsAlreadyLocal}`)
  console.log(`  - copied from export:  ${stats.assetsCopiedFromExport}`)
  console.log(`Refs MISSING (unfixed):  ${stats.refsMissing}`)
  if (stats.refsMissing) {
    console.log('\nMissing refs (first 30):')
    for (const m of stats.missingList.slice(0, 30)) {
      console.log(`  ${m.file}: ${m.ref}`)
    }
  }
  if (DRY_RUN) console.log('\n[DRY RUN] No files written.')
}

main()
