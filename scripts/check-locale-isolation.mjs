#!/usr/bin/env node
// Fails if a single commit (or ref range) touches both en/ and any non-en locale.
// Enforces the write-ownership contract documented in n8n-contract.md.
//
// Usage:
//   node scripts/check-locale-isolation.mjs            # checks staged files (pre-commit hook mode)
//   node scripts/check-locale-isolation.mjs <range>    # checks a git ref range, e.g. origin/main...HEAD (CI mode)
//
// Wire as pre-commit hook:
//   echo '#!/bin/sh\nexec node scripts/check-locale-isolation.mjs' > .git/hooks/pre-commit
//   chmod +x .git/hooks/pre-commit
//
// Override (only for coordinated cross-locale cleanups):
//   git commit --no-verify

import { execSync } from 'node:child_process'

const LOCALES = ['en', 'es', 'ja', 'ko', 'pt-BR']
const NON_EN = LOCALES.filter((l) => l !== 'en')

const refRange = process.argv[2]
const cmd = refRange
  ? `git diff --name-only ${refRange}`
  : `git diff --cached --name-only`

let files
try {
  files = execSync(cmd, { encoding: 'utf8' }).split('\n').filter(Boolean)
} catch (err) {
  console.error('Failed to read git diff:', err.message)
  process.exit(2)
}

const localeOf = (file) => {
  const m1 = file.match(/^src\/content\/[^/]+\/([^/]+)\//)
  if (m1 && LOCALES.includes(m1[1])) return m1[1]
  const m2 = file.match(/^src\/i18n\/([^.]+)\.yml$/)
  if (m2 && LOCALES.includes(m2[1])) return m2[1]
  return null
}

const byLocale = new Map()
for (const f of files) {
  const locale = localeOf(f)
  if (!locale) continue
  if (!byLocale.has(locale)) byLocale.set(locale, [])
  byLocale.get(locale).push(f)
}

const hasEn = byLocale.has('en')
const hasNonEn = NON_EN.some((l) => byLocale.has(l))

if (hasEn && hasNonEn) {
  console.error('check-locale-isolation: this commit touches both en/ and non-en locale files.')
  console.error('')
  console.error('  en/ is editor-owned (source of truth).')
  console.error('  non-en locales are n8n-owned (auto-generated).')
  console.error('  Split into two commits: one for en/, one for non-en.')
  console.error('')
  for (const [locale, paths] of [...byLocale.entries()].sort()) {
    console.error(`  [${locale}]`)
    for (const p of paths) console.error(`    ${p}`)
  }
  console.error('')
  console.error('  See n8n-contract.md "Write ownership". Override with --no-verify only for coordinated cleanups.')
  process.exit(1)
}

if (refRange) console.log(`check-locale-isolation: OK (${files.length} files, locales touched: ${[...byLocale.keys()].sort().join(', ') || 'none'})`)
