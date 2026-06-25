#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'

const fixed = [
  'banking-analytics', 'crm-analytics', 'crypto-analytics', 'education-analytics',
  'finance-analytics', 'healthcare-analytics', 'isv-analytics', 'it-analytics',
  'mining-analytics', 'real-estate-analytics', 'retail-analytics',
  'supply-chain-analytics', 'telecommunications-analytics',
]

const path = 'parity-tracking.md'
let text = readFileSync(path, 'utf8')
let count = 0

for (const slug of fixed) {
  const lines = text.split('\n')
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith(`| \`/${slug}/\` |`) && lines[i].includes('B1 vertical')) {
      const before = lines[i]
      lines[i] = lines[i]
        .replace('⚪ not run', '🟡 in progress')
        .replace('⚪ not started', '🟡 in progress')
      // Set notes (last cell)
      const cells = lines[i].split('|')
      cells[cells.length - 2] = ' Hero+body cascade applied; content review pending '
      lines[i] = cells.join('|')
      if (lines[i] !== before) count++
    }
  }
  text = lines.join('\n')
}

writeFileSync(path, text)
console.log(`updated ${count} rows`)
