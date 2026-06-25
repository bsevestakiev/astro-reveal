---
description: Audit one reveal page against the wget mirror via the parity-auditor subagent. Read-only — produces a verdict + tracker update, no source edits.
---

Use the `parity-auditor` subagent to audit the reveal page: $ARGUMENTS

Pass the argument verbatim (e.g. `reveal-vs-tableau`, `/reveal-vs-tableau/`, `/`). The subagent will resolve it to a tracker row, run `npx astro build` and `scripts/parity-snap.mjs`, then produce a four-dimension delta report (copy / layout / images / DOM-class), write `parity/verdicts/<slug>.json`, and update the `Diff` column of `parity-tracking.md`. It will not touch the `Fix` (signoff) column and it will not edit any source file.
