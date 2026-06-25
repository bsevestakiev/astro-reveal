#!/usr/bin/env node
// One-shot cleanup. cascade-vs-competitor.mjs's earlier wave-lines insertion
// dropped `image:` / `imageAlt:` AFTER the YAML closing `---` instead of
// inside the cta-block. Move them back, idempotent.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const PAGES_DIR = join(here, '..', 'src', 'content', 'pages', 'en')

let fixed = 0
for (const f of readdirSync(PAGES_DIR)) {
  if (!/^reveal-vs-.+\.md$/.test(f)) continue
  const path = join(PAGES_DIR, f)
  const yaml = readFileSync(path, 'utf8')
  // Match: `\n---\n    image: "..."\n    imageAlt: "..."\n` at end of file.
  const re = /\n---\s*\n(\s+image:\s*"[^"]*"\s*\n\s+imageAlt:\s*"[^"]*"\s*\n?)/
  const m = yaml.match(re)
  if (!m) continue
  const orphaned = m[1]
  // Strip trailing newline normalization, then move.
  const cleaned = yaml.replace(re, '\n' + orphaned.replace(/\s+$/, '') + '\n---\n')
  writeFileSync(path, cleaned)
  console.log(`✓ ${f}`)
  fixed++
}
console.log(`fixed ${fixed} files`)
