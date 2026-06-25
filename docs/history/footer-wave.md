# Footer Wave Issue

## What was attempted

Replaced the SVG wave's `fill="#fff"` with a `fill="url(#wave-grad)"` using an inline `<linearGradient>` that matched the footer's orange-to-pink gradient colors (`rgba(251,179,101,1)` → `rgba(236,65,122,1)`).

## User feedback

**Bullshit.** Not what was wanted.

## What actually needs to happen

Must inspect the original scraped revealbi.io homepage HTML to see exactly how the wave is implemented there — what element it lives on, what fill it uses, where it sits in the DOM relative to the footer section — and replicate that approach exactly instead of improvising.

The goal: a wave like the original site, with no white line above the footer.
