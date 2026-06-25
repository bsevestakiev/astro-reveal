#!/usr/bin/env node
// Surgical fix for the lang-switcher href bug — walk all localized HTML
// files and rewrite each .wovn-switch anchor's href so it points to the
// equivalent page in the target locale, not the donor's homepage.
//
// Background: apply-batch.mjs splices chrome (mega menu + footer) from
// dist/<locale>/index.html onto every translated page. That donor's
// switcher hrefs are homepage-relative (/, /es, /ja, ...), so every
// inner page ended up with those same wrong hrefs.
//
// Future apply-batch runs apply the same rewrite inline; this script
// patches existing dist/ + public/ trees in place.
//
// Usage:
//   node scripts/translation/fix-lang-switcher-hrefs.mjs

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { resolve, join, relative } from 'node:path'

const ROOT = resolve(process.cwd())
const LOCALES = ['es', 'ja', 'ko', 'pt-BR']
const TREES = ['dist', 'public']

function* walkHtml(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) yield* walkHtml(full)
    else if (st.isFile() && entry.endsWith('.html')) yield full
  }
}

function computeHref(target, slugPath) {
  if (!target || target === 'en') return slugPath
  return slugPath === '/' ? `/${target}` : `/${target}${slugPath}`
}

let totalFiles = 0
let totalEdits = 0

for (const tree of TREES) {
  for (const locale of LOCALES) {
    const base = resolve(ROOT, tree, locale)
    if (!existsSync(base)) continue

    for (const file of walkHtml(base)) {
      const rel = relative(base, file).replace(/\\/g, '/')
      const slug = rel === 'index.html' ? '' : rel.replace(/\/index\.html$/, '')
      const slugPath = slug ? `/${slug}/` : '/'

      const html = readFileSync(file, 'utf-8')
      let edits = 0

      const next = html.replace(
        /<a\b[^>]*class="[^"]*\bwovn-switch\b[^"]*"[^>]*>/g,
        (tag) => {
          const dv = tag.match(/data-value="([^"]+)"/)
          if (!dv) return tag
          const want = computeHref(dv[1], slugPath)
          const hrefMatch = tag.match(/href="([^"]*)"/)
          if (!hrefMatch) return tag
          if (hrefMatch[1] === want) return tag
          edits++
          return tag.replace(/href="[^"]*"/, `href="${want}"`)
        }
      )

      if (edits > 0) {
        writeFileSync(file, next, 'utf-8')
        totalFiles++
        totalEdits += edits
      }
    }
  }
}

console.log(`Patched ${totalFiles} files, ${totalEdits} hrefs rewritten`)
