#!/usr/bin/env node
// One-shot: 5 glossary MD files have H2 sections duplicated 2-3x in body.
// Walk H2-by-H2, keep the first occurrence of each title, drop subsequent
// duplicate sections. Sections sharing identical content — verified manually.

import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..', 'src', 'content', 'glossary', 'en')

const TARGETS = [
  'analytics-modernization.md',
  'business-analytics.md',
  'business-intelligence.md',
  'integrated-analytics.md',
  'machine-learning.md',
]

for (const file of TARGETS) {
  const path = join(root, file)
  const before = readFileSync(path, 'utf-8')
  const lines = before.split('\n')
  const out = []
  const seenH2 = new Set()
  let skipping = false

  for (const line of lines) {
    if (line.startsWith('## ')) {
      const title = line.slice(3).trim()
      if (seenH2.has(title)) {
        skipping = true
        continue
      }
      seenH2.add(title)
      skipping = false
    }
    if (!skipping) out.push(line)
  }

  // Trim trailing whitespace runs from the dedupe
  while (out.length > 1 && out.at(-1) === '' && out.at(-2) === '') out.pop()

  const after = out.join('\n')
  const droppedH2s = (before.match(/^## /gm) || []).length - (after.match(/^## /gm) || []).length
  writeFileSync(path, after)
  console.log(`${file}: ${before.length}b → ${after.length}b, dropped ${droppedH2s} duplicate H2 sections`)
}
