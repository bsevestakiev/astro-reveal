---
description: Refit one reveal page to match the wget mirror via the parity-refitter subagent. Reads the audit verdict and surgically edits frontmatter / images / sections. Auto-adds new section types when justified.
---

Use the `parity-refitter` subagent to refit the reveal page: $ARGUMENTS

Pass the argument verbatim (e.g. `reveal-vs-tableau`, `/reveal-vs-tableau/`, `/`). The subagent will read `parity/verdicts/<slug>.json` (running an audit first if missing), apply surgical fixes to `src/content/.../<slug>.md`, add new section schemas + components when the original genuinely needs them, run `npx astro build` and `scripts/parity-snap.mjs` to verify, and update the `Diff` column of `parity-tracking.md`. It will not touch the `Fix` (signoff) column — that stays for human review. It will not edit non-en locale files.
