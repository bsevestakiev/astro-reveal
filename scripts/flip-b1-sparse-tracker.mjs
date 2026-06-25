#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'

const sparse = [
  'energy-analytics', 'insurance-analytics', 'manufacturing-analytics',
  'embedded-analytics-statistics', 'on-prem-analytics',
]
// white-label-analytics deferred (structurally distinct: video + container, not a DarkHero)

const path = 'parity-tracking.md'
let text = readFileSync(path, 'utf8')
let count = 0
for (const slug of sparse) {
  const lines = text.split('\n')
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith(`| \`/${slug}/\` |`) && lines[i].includes('B1 vertical')) {
      const before = lines[i]
      lines[i] = lines[i]
        .replace('⚪ not run', '🟡 in progress')
        .replace('⚪ not started', '🟡 in progress')
      const cells = lines[i].split('|')
      cells[cells.length - 2] = ' Sparse hero variant applied (flat-split / tech-centered) '
      lines[i] = cells.join('|')
      if (lines[i] !== before) count++
    }
  }
  text = lines.join('\n')
}
writeFileSync(path, text)
console.log(`updated ${count} rows`)
