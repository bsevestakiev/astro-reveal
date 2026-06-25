#!/usr/bin/env node
// Walk every content frontmatter, find string values containing HTML, and
// fail the build if those values use tags or attributes outside the allowlist.
// Cheap insurance against an n8n-generated YAML emitting unsanitized HTML.

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'

const here = dirname(fileURLToPath(import.meta.url))
const repo = join(here, '..')

const ALLOWED_TAGS = new Set(['p', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'br', 'h3', 'h4', 'h5', 'span', 'code', 'div', 'img'])
const ALLOWED_ATTRS = new Set(['href', 'class', 'target', 'rel', 'src', 'alt', 'title', 'loading', 'decoding', 'aria-hidden', 'width', 'height'])

function walkContent(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const s = statSync(p)
    if (s.isDirectory()) out.push(...walkContent(p))
    else if (name.endsWith('.md') || name.endsWith('.yml') || name.endsWith('.yaml')) out.push(p)
  }
  return out
}

function extractFrontmatter(text) {
  if (!text.startsWith('---')) return text
  const end = text.indexOf('\n---', 3)
  if (end === -1) return text
  return text.slice(3, end)
}

function walkValues(node, path, visit) {
  if (typeof node === 'string') {
    visit(node, path)
  } else if (Array.isArray(node)) {
    node.forEach((v, i) => walkValues(v, [...path, String(i)], visit))
  } else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) walkValues(v, [...path, k], visit)
  }
}

function findViolations(html) {
  const violations = []
  const tagRe = /<\s*\/?\s*([a-zA-Z][a-zA-Z0-9]*)([^>]*)>/g
  let match
  while ((match = tagRe.exec(html)) !== null) {
    const tag = match[1].toLowerCase()
    const attrs = match[2] || ''
    if (!ALLOWED_TAGS.has(tag)) {
      violations.push(`disallowed tag <${tag}>`)
      continue
    }
    const attrRe = /([a-zA-Z][a-zA-Z0-9-]*)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/g
    let attrMatch
    while ((attrMatch = attrRe.exec(attrs)) !== null) {
      const attr = attrMatch[1].toLowerCase()
      const valueRaw = attrMatch[2]
      const value = valueRaw.replace(/^["']|["']$/g, '')
      if (!ALLOWED_ATTRS.has(attr)) {
        violations.push(`disallowed attribute ${attr} on <${tag}>`)
        continue
      }
      if (attr === 'href' && !/^(\/|https?:\/\/|mailto:|#)/.test(value)) {
        violations.push(`href must start with /, https://, mailto: or # — got ${value}`)
      }
      if (attr === 'src' && !/^(\/|https?:\/\/)/.test(value)) {
        violations.push(`src must start with / or https:// — got ${value}`)
      }
    }
  }
  return violations
}

const errors = []
const contentRoot = join(repo, 'src', 'content')
for (const file of walkContent(contentRoot)) {
  let frontmatter
  try {
    const raw = readFileSync(file, 'utf-8')
    frontmatter = file.endsWith('.md') ? parse(extractFrontmatter(raw)) : parse(raw)
  } catch (err) {
    errors.push(`${file}: failed to parse — ${err.message}`)
    continue
  }
  if (!frontmatter) continue
  walkValues(frontmatter, [], (text, path) => {
    if (!text.includes('<')) return
    const violations = findViolations(text)
    for (const v of violations) {
      errors.push(`${file} @ ${path.join('.')}: ${v}`)
    }
  })
}

if (errors.length > 0) {
  console.error(`\nset:html allowlist violations (${errors.length}):\n`)
  for (const e of errors) console.error(`  - ${e}`)
  console.error('\nAllowlist is defined at the top of scripts/validate-content.mjs.')
  process.exit(1)
}
console.log('content HTML allowlist: ok')
