// One-shot: rewrite the "Why Teams Switch ..." feature-row headline + imageAlt
// in each reveal-vs-*.md to match the actual WP <h2 id="why-teams-switch-*">
// text. The cascade-vs-competitor.mjs run hard-coded "Why Teams Switch from X"
// for every page, but WP uses 4 distinct phrasings ("off X", "from X to
// Reveal", "to Reveal", and the literal-with-trailing-colon Bold BI case).
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const repoRoot = join(import.meta.dirname, '..', '..')
const wpRoot = join(repoRoot, 'www.revealbi.io')
const contentDir = join(import.meta.dirname, '..', 'src', 'content', 'pages', 'en')

const slugs = [
  'bold-bi', 'domo', 'gooddata', 'logi-analytics', 'looker', 'luzmo',
  'metabase', 'panintelligence', 'qrvey', 'sisense', 'tableau',
  'thoughtspot', 'toucan-toco',
]

let touched = 0
for (const slug of slugs) {
  const html = readFileSync(join(wpRoot, `reveal-vs-${slug}.html`), 'utf8')
  const m = html.match(/<h2 id="why-teams-switch[^"]*">([^<]+)<\/h2>/)
  if (!m) {
    console.warn(`${slug}: no WP h2 found, skipping`)
    continue
  }
  const wpHeading = m[1].trim()

  const mdPath = join(contentDir, `reveal-vs-${slug}.md`)
  const before = readFileSync(mdPath, 'utf8')
  const after = before
    .replace(/^(    headline: ")Why Teams Switch[^"]*(")$/m, `$1${wpHeading}$2`)
    .replace(/^(    imageAlt: ")Why Teams Switch[^"]*(")$/m, `$1${wpHeading}$2`)
  if (after === before) {
    console.warn(`${slug}: no change applied (regex miss)`)
    continue
  }
  writeFileSync(mdPath, after)
  console.log(`${slug}: ${wpHeading}`)
  touched++
}
console.log(`\n${touched}/${slugs.length} files updated`)
