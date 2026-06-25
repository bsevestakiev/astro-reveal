# Editor snippets — paste-in blocks for blog & whitepaper bodies

Sveltia registers our custom editor components, but the version we run (0.167.x)
**does not yet show an "Insert" button** for them in the editor toolbar
([sveltia-cms #560](https://github.com/sveltia/sveltia-cms/discussions/560) — slated
for after the 1.0 release). Until then, to add one of these inline blocks:

1. In the post's **Body** field, switch from the rich-text view to **Markdown** view.
2. **Copy a block below** and paste it where you want it.
3. Edit the text inside.

The blocks render exactly the same as the existing posts that already use them.
When Sveltia ships the Insert UI, these same blocks also become toolbar buttons —
no rework needed.

> **Bottom "Request a Demo" CTA is the exception** — don't paste it. Use the
> **"Add a 'Request a Demo' CTA banner at the bottom"** checkbox in the post's
> fields instead; it renders the banner automatically at the end of the post.

---

## Comparison Table

```html
<reveal-expandable-table>

| Old approach | New approach |
| --- | --- |
| Row 1 cell A | Row 1 cell B |
| Row 2 cell A | Row 2 cell B |

</reveal-expandable-table>
```

## Callout (highlight)

```html
<aside class="alert alert-danger rounded-xl">

**Watch out:** Put your key warning or definition here. Markdown works inside — use
`##` for a heading, `-` for bullets, `[text](url)` for links.

</aside>
```

## Bonus Tip

```html
<div class="alert alert-secondary icon--tips">

**Bonus Tip:** Put the tip here. Markdown is processed.

</div>
```

## CTA Banner (custom — anywhere in the body)

For a custom banner mid-post or with a non-demo link. (For the standard
end-of-post "Request a Demo" CTA, use the field checkbox instead.)

```html
<div class="banner banner--embedded text-left text-white">
  <p class="banner__headline">Your headline</p>
  <p class="banner__msg">Your supporting message.</p>
  <a href="https://www.revealbi.io/request-demo" class="btn btn-secondary">START TODAY</a>
</div>
```

## Lead-form gate (whitepapers)

Splits a gated whitepaper into a free preview (above) and gated content (below).
Place it at the point where the lead form should appear.

```html
<!-- gate -->
```
