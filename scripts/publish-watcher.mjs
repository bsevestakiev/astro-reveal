#!/usr/bin/env node
// Publish-on-Save watcher (TEST). Watches the EN blog folder; when a post is
// saved with `publishNow: true`, it strips the two control fields, commits the
// post authored to the person in `publishedBy`, and pushes to the holding
// branch (cms-content). The promote-content.yml workflow takes it from there.
//
// Run on the authoring host with cms-content checked out:
//     node scripts/publish-watcher.mjs            # watch mode
//     node scripts/publish-watcher.mjs --once <f> # process one file (for testing)
//
// In production the push credential is a deploy key scoped to cms-content; for
// local testing it just uses whatever git credential is already configured.

import { readFileSync, writeFileSync, watch, existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { parse as parseYaml } from 'yaml'

const here = dirname(fileURLToPath(import.meta.url))
const repo = resolve(here, '..')
const BLOG_DIR = join(repo, 'src', 'content', 'blog', 'en')
const BRANCH = 'cms-content'

// name (as shown in the Sveltia "Published by" dropdown) → git commit author.
// In production these become GitHub no-reply emails so commits link to profiles.
const EDITORS = {
  'Casey Ciniello':  { name: 'Casey Ciniello',  email: 'casey@revealbi.io' },
  'Bilyana Petrova': { name: 'Bilyana Petrova', email: 'bilyana@revealbi.io' },
  'Martin Atanasov': { name: 'Martin Atanasov', email: 'martin@revealbi.io' },
  'Zdravko Kolev':   { name: 'Zdravko Kolev',   email: 'zdravko@revealbi.io' },
  'Jason Beres':     { name: 'Jason Beres',     email: 'jason@revealbi.io' },
}
const FALLBACK_AUTHOR = { name: 'Reveal Publisher', email: 'publisher@revealbi.io' }

const git = (...args) =>
  execFileSync('git', args, { cwd: repo, encoding: 'utf8' }).trim()

function readFrontmatter(text) {
  if (!text.startsWith('---')) return null
  const end = text.indexOf('\n---', 3)
  if (end === -1) return null
  return text.slice(3, end)
}

// Remove a top-level `key:` line (and any indented continuation) from the
// frontmatter, surgically, so comments/order of everything else are preserved.
function stripKey(text, key) {
  const re = new RegExp(`^[ \\t]*${key}:.*(\\r?\\n([ \\t]+.*)?)*\\r?\\n`, 'm')
  return text.replace(re, '')
}

function processFile(file) {
  if (!existsSync(file) || !file.endsWith('.md')) return
  const text = readFileSync(file, 'utf8')
  const fmText = readFrontmatter(text)
  if (!fmText) return

  let fm
  try { fm = parseYaml(fmText) || {} } catch { return }
  if (fm.publishNow !== true) return // normal save → leave it local

  const who = EDITORS[fm.publishedBy] || FALLBACK_AUTHOR
  const slug = file.split('/').pop().replace(/\.md$/, '')
  console.log(`▶ publishing "${slug}" as ${who.name} <${who.email}>`)

  // Strip the two transient control fields, then write back.
  let stripped = text
  stripped = stripped.replace(/^[ \t]*publishNow:.*\r?\n/m, '')
  stripped = stripped.replace(/^[ \t]*publishedBy:.*\r?\n/m, '')
  writeFileSync(file, stripped)

  // Commit ONLY this post (per-post scope avoids shipping other drafts) and push.
  git('add', file)
  git('commit', `--author=${who.name} <${who.email}>`,
      '-m', `content(blog): ${slug} — publish [ship]`)
  git('push', 'origin', BRANCH)
  console.log(`✔ pushed to ${BRANCH}; promote workflow will take it to main`)
}

// ── entry ───────────────────────────────────────────────────────────────────
const onceIdx = process.argv.indexOf('--once')
if (onceIdx !== -1) {
  const f = process.argv[onceIdx + 1]
  processFile(resolve(f))
  process.exit(0)
}

console.log(`👀 watching ${BLOG_DIR} (branch ${BRANCH}) — tick "Publish to production now" + Save`)
const pending = new Set()
watch(BLOG_DIR, (_event, filename) => {
  if (!filename || !filename.endsWith('.md')) return
  const file = join(BLOG_DIR, filename)
  if (pending.has(file)) return
  pending.add(file)
  // debounce: editors/Sveltia write in bursts
  setTimeout(() => { pending.delete(file); try { processFile(file) } catch (e) { console.error('✖', e.message) } }, 400)
})
