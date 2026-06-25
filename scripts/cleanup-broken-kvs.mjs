#!/usr/bin/env node
/**
 * Bulk cleanup of broken CloudFront KVS redirects.
 *
 * Reads /tmp/site-audit/cache/kvs-audit.json (from scripts/site-audit.mjs)
 * and for every entry where status === 'BROKEN' (source 301s, destination
 * 404/403), either:
 *   - Repoints the redirect to the closest category landing page that DOES
 *     exist in Astro (e.g. /blog/<renamed> → /blog/, /webinars/<renamed> →
 *     /webinars/, etc.), so users from old backlinks/Google don't hit a
 *     dead-end.
 *   - Or deletes the entry entirely for paths where no sensible repoint
 *     exists (e.g. /jp/* legacy locale → no Astro equivalent → 404 is
 *     cleaner than a chain to nowhere).
 *
 * Repoint rules (in order):
 *   /blog/...        → /blog/         (blog rename, target removed)
 *   /webinars/...    → /webinars/     (webinar rename, only 1 webinar in Astro)
 *   /licenses/...    → /licenses/     (Astro owns /licenses/ but redirect
 *                                      was pointing at non-existent /license-agreements/)
 *   /jp/...          → delete         (Japanese legacy URLs, no Astro equivalent)
 *   /ja/blog/...     → delete         (Japanese-character blog URLs, no Astro target)
 *   /in-the-news/... → /in-the-news/  (if landing exists, else delete)
 *   /<anything>      → delete         (everything else — PPC test pages, etc.)
 *
 * Usage:
 *   node scripts/cleanup-broken-kvs.mjs            # dry-run (default)
 *   node scripts/cleanup-broken-kvs.mjs --apply    # actually modify the KVS
 */

import { readFileSync, existsSync } from 'node:fs'
import { execSync } from 'node:child_process'

const AUDIT_TSV = '/tmp/kvs-dump/kvs-audit.tsv'
const KVS_ARN = 'arn:aws:cloudfront::130516034950:key-value-store/65996af2-9de8-4133-badd-e96feab92b6b'
const AWS_PROFILE_NAME = 'AdministratorAccess-130516034950'
const AWS_REGION = 'us-east-1'
const APPLY = process.argv.includes('--apply')

// Prefixes to skip — these are KVS entries that route to a different host
// (the CloudFront Function rewrites them to help.revealbi.io etc.). The
// audit's "BROKEN" verdict for these is a false positive because we probed
// against www.revealbi.io.
const SKIP_PREFIXES = ['/help/', '/help', '/datasources-help/', '/datasources-help', '/training/', '/training']

if (!existsSync(AUDIT_TSV)) {
  console.error(`error: ${AUDIT_TSV} not found. Run scripts/audit-redirects-kvs.sh first.`)
  process.exit(1)
}

const broken = readFileSync(AUDIT_TSV, 'utf8').trim().split('\n')
  .map(line => {
    const [status, src, dst, srcCode, dstCode] = line.split('\t')
    return { status, src, dst, srcCode, dstCode }
  })
  .filter(r => r.status === 'BROKEN' && !SKIP_PREFIXES.some(p => r.src.startsWith(p)))
console.log(`Total broken KVS entries: ${broken.length}`)

// Decide action per entry. Returns either:
//   { action: 'delete' }
//   { action: 'repoint', to: '/path/' }
function decide(src) {
  if (src.startsWith('/blog/')) return { action: 'repoint', to: '/blog/' }
  if (src.startsWith('/webinars/')) return { action: 'repoint', to: '/webinars/' }
  if (src.startsWith('/licenses/')) return { action: 'repoint', to: '/licenses/' }
  if (src.startsWith('/in-the-news/')) return { action: 'repoint', to: '/in-the-news/' }
  if (src.startsWith('/jp/')) return { action: 'delete' }
  if (src.startsWith('/ja/blog/')) return { action: 'delete' }
  return { action: 'delete' }
}

const repoints = []
const deletes = []
for (const r of broken) {
  const d = decide(r.src)
  if (d.action === 'delete') deletes.push(r.src)
  else repoints.push({ key: r.src, value: d.to })
}

console.log(`\nPlan:`)
console.log(`  DELETE: ${deletes.length} keys`)
console.log(`  REPOINT: ${repoints.length} keys`)

// Group repoints by destination for readability
const byDest = {}
for (const r of repoints) (byDest[r.value] ??= []).push(r.key)
console.log(`\nRepoint destinations:`)
for (const [dst, keys] of Object.entries(byDest)) {
  console.log(`  → ${dst}  (${keys.length} keys)`)
}

console.log(`\nDelete prefixes (top 10):`)
const delPrefixes = {}
for (const k of deletes) {
  const p = '/' + (k.split('/').filter(Boolean)[0] || '')
  delPrefixes[p] = (delPrefixes[p] || 0) + 1
}
for (const [p, c] of Object.entries(delPrefixes).sort((a,b)=>b[1]-a[1]).slice(0, 10)) {
  console.log(`  ${c.toString().padStart(3)}  ${p}/...`)
}

if (!APPLY) {
  console.log(`\nDRY RUN — use --apply to actually modify the KVS.`)
  process.exit(0)
}

// AWS update-keys caps at ~50 key changes per call. Batch into chunks.
const BATCH_SIZE = 25
const allOps = [
  ...repoints.map(r => ({ type: 'put', key: r.key, value: r.value })),
  ...deletes.map(k => ({ type: 'delete', key: k })),
]

function chunked(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

const batches = chunked(allOps, BATCH_SIZE)
console.log(`\nApplying in ${batches.length} batch(es) of up to ${BATCH_SIZE} ops each...`)

for (let i = 0; i < batches.length; i++) {
  const batch = batches[i]
  // Fresh ETag per batch — each update-keys call bumps it
  const etag = execSync(
    `aws cloudfront-keyvaluestore describe-key-value-store --region ${AWS_REGION} --profile ${AWS_PROFILE_NAME} --kvs-arn ${KVS_ARN} --query 'ETag' --output text`,
    { encoding: 'utf8' },
  ).trim()

  const puts = batch.filter(op => op.type === 'put').map(op => ({ Key: op.key, Value: op.value }))
  const dels = batch.filter(op => op.type === 'delete').map(op => ({ Key: op.key }))
  const args = [`--if-match ${etag}`]
  if (puts.length) args.push(`--puts '${JSON.stringify(puts)}'`)
  if (dels.length) args.push(`--deletes '${JSON.stringify(dels)}'`)

  console.log(`  batch ${i + 1}/${batches.length}: puts=${puts.length} deletes=${dels.length} etag=${etag}`)
  execSync(
    `aws cloudfront-keyvaluestore update-keys --region ${AWS_REGION} --profile ${AWS_PROFILE_NAME} --kvs-arn ${KVS_ARN} ${args.join(' ')}`,
    { stdio: 'inherit' },
  )
}

console.log(`\nDone. Don't forget to invalidate CloudFront edge cache:`)
console.log(`  aws cloudfront create-invalidation --profile ${AWS_PROFILE_NAME} --distribution-id EUJ6ARE0Y6LO0 --paths '/*'`)
