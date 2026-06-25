// One-shot: flip the 14 B2 vs-competitor tracker rows from "🟡 in progress"
// to "✅ matches" after the visual-diff sample-snap pass + content fixes
// (sisense hero space, 13× "Why Teams Switch" headings, logi 5th row).
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const path = join(import.meta.dirname, '..', 'parity-tracking.md')
let txt = readFileSync(path, 'utf8')

const slugs = [
  'bold-bi', 'domo', 'gooddata', 'logi-analytics', 'looker', 'luzmo',
  'metabase', 'panintelligence', 'power-bi', 'qrvey', 'sisense', 'tableau',
  'thoughtspot', 'toucan-toco',
]

let n = 0
for (const slug of slugs) {
  const note = slug === 'power-bi'
    ? 'Hand-edited reference; visual diff matches WP — hero, comparison table, family-of-features rows, FAQ, wave-lines CTA all parity'
    : 'Visual diff vs WP confirms parity — hero, "Why Teams Switch" panel, comparison table, family-of-features rows, FAQ, CTA all match (lazy-loaded Atanasoft quote and motion videos accepted as known divergences)'

  const escSlug = slug.replace(/[-]/g, '\\-')
  const re = new RegExp(
    '^(\\| `/reveal-vs-' + escSlug + '/` \\| B2 vs-competitor \\| `/reveal-vs-' + escSlug + '\\.html` \\| (?:wget|chrome-save) \\| )' +
    '🟡 in progress( \\| )🟡 in progress( \\| )[^|]*\\|',
    'gm',
  )

  const before = txt
  txt = txt.replace(re, `$1✅ matches$2✅ matches$3${note} |`)
  if (txt !== before) {
    n++
    console.log(`${slug}: flipped`)
  } else {
    console.warn(`${slug}: no row matched`)
  }
}

writeFileSync(path, txt)
console.log(`\n${n}/${slugs.length} rows flipped`)
