#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const VERTICALS = [
  'banking-analytics',
  'crm-analytics',
  'crypto-analytics',
  'education-analytics',
  'embedded-analytics-statistics',
  'energy-analytics',
  'finance-analytics',
  'healthcare-analytics',
  'insurance-analytics',
  'isv-analytics',
  'it-analytics',
  'manufacturing-analytics',
  'mining-analytics',
  'on-prem-analytics',
  'real-estate-analytics',
  'retail-analytics',
  'supply-chain-analytics',
  'telecommunications-analytics',
  'white-label-analytics',
]

const MD_ROOT = resolve('src/content/pages/en')

function addVariantToFirst(md, type, value) {
  // Find first `  - type: <type>` block.
  const marker = `  - type: ${type}\n`
  const idx = md.indexOf(marker)
  if (idx === -1) return { md, changed: false, reason: 'no-section' }
  // Look at the lines immediately following — if `variant:` already present in the block, skip.
  const blockEnd = md.indexOf('\n  - type:', idx + marker.length)
  const block = md.slice(idx, blockEnd === -1 ? md.length : blockEnd)
  if (/^ {4}variant: /m.test(block)) return { md, changed: false, reason: 'has-variant' }
  // Insert `    variant: <value>\n` immediately after the `  - type:` line.
  const insertAt = idx + marker.length
  return {
    md: md.slice(0, insertAt) + `    variant: ${value}\n` + md.slice(insertAt),
    changed: true,
    reason: 'added',
  }
}

let total = { faq: 0, icon: 0, files: 0 }

for (const slug of VERTICALS) {
  const path = `${MD_ROOT}/${slug}.md`
  let md
  try {
    md = readFileSync(path, 'utf8')
  } catch {
    console.warn(`skip: ${slug}`)
    continue
  }

  const r1 = addVariantToFirst(md, 'icon-grid', 'vborder')
  const r2 = addVariantToFirst(r1.md, 'faq', 'flat')

  if (r1.changed || r2.changed) {
    writeFileSync(path, r2.md)
    total.files++
    if (r1.changed) total.icon++
    if (r2.changed) total.faq++
    console.log(`${slug}: icon-grid=${r1.reason} faq=${r2.reason}`)
  } else {
    console.log(`${slug}: no changes (icon-grid=${r1.reason}, faq=${r2.reason})`)
  }
}

console.log(`\nDone: ${total.files} files; ${total.icon} icon-grid vborder, ${total.faq} faq flat`)
