/* Sveltia/Decap editor components: registers toolbar buttons that surface
 * in every `widget: markdown` field defined in config.yml. Each component
 * round-trips between a structured form and a markdown block, so editors
 * never type the wrapping HTML themselves.
 *
 * Add new components below by calling CMS.registerEditorComponent(...).
 * Sveltia exposes the same API as Decap CMS for editor components.
 *
 * The runtime rendering for these blocks lives in public/js/, e.g.
 * public/js/reveal-expandable-table.js.
 */
(function () {
  if (typeof window === 'undefined' || !window.CMS || typeof window.CMS.registerEditorComponent !== 'function') {
    console.warn('[editor-components] CMS global not available; skipping registration')
    return
  }

  const splitCells = (line) =>
    line
      .replace(/^\s*\|/, '')
      .replace(/\|\s*$/, '')
      .split('|')
      .map((c) => c.trim())

  const joinCells = (cells) => '| ' + cells.join(' | ') + ' |'

  CMS.registerEditorComponent({
    id: 'expandable-table',
    label: 'Comparison Table',
    summary: ({ headers }) => 'Comparison table: ' + (headers || '(empty)'),
    fields: [
      {
        name: 'headers',
        label: 'Header row',
        widget: 'string',
        hint: 'Separate column headers with | — e.g.  Old approach | New approach',
      },
      {
        name: 'rows',
        label: 'Data rows',
        widget: 'list',
        hint: 'One row per entry. Separate cells with | — same number of cells as the header.',
        field: { name: 'row', label: 'Row', widget: 'string' },
      },
    ],
    pattern: /<reveal-expandable-table>\s*([\s\S]*?)\s*<\/reveal-expandable-table>/,
    fromBlock: function (match) {
      const inner = (match[1] || '').trim()
      const lines = inner.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.startsWith('|'))
      if (lines.length < 2) return { headers: '', rows: [] }
      const headers = splitCells(lines[0]).join(' | ')
      // Skip the |---|---| separator at lines[1]
      const rows = lines.slice(2).map((l) => splitCells(l).join(' | '))
      return { headers: headers, rows: rows }
    },
    toBlock: function (data) {
      const headerCells = (data.headers || '').split('|').map((c) => c.trim()).filter(Boolean)
      const rows = (data.rows || []).filter((r) => r && r.trim())
      if (headerCells.length === 0) {
        return '<reveal-expandable-table>\n\n</reveal-expandable-table>'
      }
      const sep = '| ' + headerCells.map(() => '---').join(' | ') + ' |'
      const headerLine = joinCells(headerCells)
      const rowLines = rows.map((r) => joinCells(splitCells(r)))
      return (
        '<reveal-expandable-table>\n\n' +
        headerLine + '\n' +
        sep + '\n' +
        rowLines.join('\n') +
        '\n\n</reveal-expandable-table>'
      )
    },
    toPreview: function (data) {
      const headerCells = (data.headers || '').split('|').map((c) => c.trim())
      const rows = (data.rows || []).map((r) => (r || '').split('|').map((c) => c.trim()))
      const ths = headerCells.map((h) => '<th style="background:#666;color:#fff;padding:8px">' + (h || '&nbsp;') + '</th>').join('')
      const trs = rows
        .map(
          (r, i) =>
            '<tr>' +
            r
              .map(
                (c, j) =>
                  '<td style="padding:8px;background:' +
                  (i % 2 === 0 ? '#fff' : '#f5f6fb') +
                  ';' +
                  (j === 0 ? 'background:#ec417a;color:#fff;font-weight:600;' : '') +
                  '">' +
                  (c || '&nbsp;') +
                  '</td>',
              )
              .join('') +
            '</tr>',
        )
        .join('')
      return (
        '<table style="border-collapse:collapse;width:100%;border:1px solid #e5e7eb">' +
        '<thead><tr>' + ths + '</tr></thead>' +
        '<tbody>' + trs + '</tbody>' +
        '</table>'
      )
    },
  })

  // Highlight / definition callout — renders as Bootstrap alert-danger box.
  // Pattern matches <aside class="alert alert-danger ..."> blocks regardless
  // of additional classes (e.g. rounded-xl). Body is markdown so it can hold
  // headings, links, lists.
  CMS.registerEditorComponent({
    id: 'callout',
    label: 'Callout (highlight)',
    summary: ({ body }) => 'Callout: ' + (body || '').slice(0, 60).replace(/\s+/g, ' '),
    fields: [
      {
        name: 'body',
        label: 'Callout body (markdown)',
        widget: 'text',
        hint: 'Markdown is processed. Use ## for a heading inside the box.',
      },
    ],
    pattern: /<aside class="alert alert-danger[^"]*">\s*([\s\S]*?)\s*<\/aside>/,
    fromBlock: function (match) {
      return { body: (match[1] || '').trim() }
    },
    toBlock: function (data) {
      const body = (data.body || '').trim()
      return '<aside class="alert alert-danger rounded-xl">\n\n' + body + '\n\n</aside>'
    },
    toPreview: function (data) {
      const body = (data.body || '').replace(/\n/g, '<br>')
      return (
        '<div style="border:1px solid #f5c2c7;background:#f8d7da;color:#842029;' +
        'padding:1rem 1.25rem;border-radius:0.5rem">' +
        body +
        '</div>'
      )
    },
  })

  // In-body CTA banner — renders as the Reveal pink/orange gradient banner
  // (.banner.banner--embedded). Replaces the legacy [cta_banner ...] WP shortcode.
  const escAttr = (s) => String(s || '').replace(/"/g, '&quot;')
  const escHtml = (s) =>
    String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  CMS.registerEditorComponent({
    id: 'cta-banner',
    label: 'CTA Banner',
    summary: ({ headline }) => 'CTA: ' + (headline || '(no headline)'),
    fields: [
      { name: 'headline', label: 'Headline', widget: 'string' },
      { name: 'msg', label: 'Message', widget: 'text' },
      { name: 'buttonText', label: 'Button text', widget: 'string', default: 'START TODAY' },
      {
        name: 'buttonLink',
        label: 'Button link',
        widget: 'string',
        default: 'https://www.revealbi.io/request-demo',
      },
    ],
    pattern: /<div class="banner banner--embedded[^"]*">\s*([\s\S]*?)\s*<\/div>/,
    fromBlock: function (match) {
      const inner = match[1] || ''
      const head = inner.match(/<p class="banner__headline">([\s\S]*?)<\/p>/)
      const msg = inner.match(/<p class="banner__msg">([\s\S]*?)<\/p>/)
      const btn = inner.match(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/)
      return {
        headline: head ? head[1].trim() : '',
        msg: msg ? msg[1].trim() : '',
        buttonLink: btn ? btn[1].trim() : 'https://www.revealbi.io/request-demo',
        buttonText: btn ? btn[2].trim() : 'START TODAY',
      }
    },
    toBlock: function (data) {
      return (
        '<div class="banner banner--embedded text-left text-white">\n' +
        '  <p class="banner__headline">' + escHtml(data.headline) + '</p>\n' +
        '  <p class="banner__msg">' + escHtml(data.msg) + '</p>\n' +
        '  <a href="' + escAttr(data.buttonLink) + '" class="btn btn-secondary">' +
        escHtml(data.buttonText) +
        '</a>\n' +
        '</div>'
      )
    },
    toPreview: function (data) {
      return (
        '<div style="background:linear-gradient(135deg,#fbb365,#ec417a);color:#fff;' +
        'padding:1.5rem 2rem;border-radius:0.5rem">' +
        '<div style="font-size:1.5rem;font-weight:700;margin-bottom:0.25rem">' +
        escHtml(data.headline) +
        '</div>' +
        '<div style="margin-bottom:0.75rem">' + escHtml(data.msg) + '</div>' +
        '<span style="display:inline-block;background:#fff;color:#ec417a;font-weight:700;' +
        'padding:0.5rem 1rem;border-radius:999px;text-transform:uppercase;font-size:0.85rem">' +
        escHtml(data.buttonText) +
        '</span>' +
        '</div>'
      )
    },
  })

  // One-click "Request a Demo" bottom CTA. Emits the standard pink/orange banner
  // pre-filled to point at /request-demo, so editors drop the end-of-post call to
  // action in a single click (all fields are pre-defaulted; tweak if desired).
  // It carries an extra `banner--demo` marker class so this component and the
  // generic `cta-banner` component have mutually exclusive patterns and never
  // fight over the same block — styling is identical, since `.banner--embedded`
  // does all the work and `banner--demo` has no CSS of its own.
  CMS.registerEditorComponent({
    id: 'request-demo',
    label: 'Request a Demo (bottom CTA)',
    summary: ({ headline }) => 'Request a Demo: ' + (headline || 'Ready to see Reveal in action?'),
    fields: [
      { name: 'headline', label: 'Headline', widget: 'string', default: 'Ready to see Reveal in action?' },
      {
        name: 'msg',
        label: 'Message',
        widget: 'text',
        default: 'See how easily you can embed beautiful, self-service analytics into your own app.',
      },
      { name: 'buttonText', label: 'Button text', widget: 'string', default: 'REQUEST A DEMO' },
      {
        name: 'buttonLink',
        label: 'Button link',
        widget: 'string',
        default: 'https://www.revealbi.io/request-demo',
      },
    ],
    pattern: /<div class="banner banner--demo banner--embedded[^"]*">\s*([\s\S]*?)\s*<\/div>/,
    fromBlock: function (match) {
      const inner = match[1] || ''
      const head = inner.match(/<p class="banner__headline">([\s\S]*?)<\/p>/)
      const msg = inner.match(/<p class="banner__msg">([\s\S]*?)<\/p>/)
      const btn = inner.match(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/)
      return {
        headline: head ? head[1].trim() : 'Ready to see Reveal in action?',
        msg: msg ? msg[1].trim() : '',
        buttonLink: btn ? btn[1].trim() : 'https://www.revealbi.io/request-demo',
        buttonText: btn ? btn[2].trim() : 'REQUEST A DEMO',
      }
    },
    toBlock: function (data) {
      return (
        '<div class="banner banner--demo banner--embedded text-left text-white">\n' +
        '  <p class="banner__headline">' + escHtml(data.headline) + '</p>\n' +
        '  <p class="banner__msg">' + escHtml(data.msg) + '</p>\n' +
        '  <a href="' + escAttr(data.buttonLink) + '" class="btn btn-secondary">' +
        escHtml(data.buttonText) +
        '</a>\n' +
        '</div>'
      )
    },
    toPreview: function (data) {
      return (
        '<div style="background:linear-gradient(135deg,#fbb365,#ec417a);color:#fff;' +
        'padding:1.5rem 2rem;border-radius:0.5rem">' +
        '<div style="font-size:1.5rem;font-weight:700;margin-bottom:0.25rem">' +
        escHtml(data.headline) +
        '</div>' +
        '<div style="margin-bottom:0.75rem">' + escHtml(data.msg) + '</div>' +
        '<span style="display:inline-block;background:#fff;color:#ec417a;font-weight:700;' +
        'padding:0.5rem 1rem;border-radius:999px;text-transform:uppercase;font-size:0.85rem">' +
        escHtml(data.buttonText) +
        '</span>' +
        '</div>'
      )
    },
  })

  // Lead-form gate marker — splits a whitepaper-category blog post into
  // preview (above) and gated (below) halves. BlogLayout looks for this
  // comment in the rendered body and inserts the lead-form_1 between the
  // two halves. Inserting this button on a non-whitepaper post is harmless
  // (the comment is invisible in normal rendering).
  CMS.registerEditorComponent({
    id: 'lead-form-gate',
    label: 'Lead-form gate',
    summary: () => 'Lead-form gate — content below is hidden until form submit',
    fields: [],
    pattern: /<!--\s*gate\s*-->/,
    fromBlock: function () {
      return {}
    },
    toBlock: function () {
      return '<!-- gate -->'
    },
    toPreview: function () {
      return (
        '<div style="border:2px dashed #ec417a;background:#fff5f8;color:#ec417a;' +
        'text-align:center;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;' +
        'padding:0.75rem 1rem;border-radius:0.5rem;font-size:0.85rem">' +
        '🔒 Lead-form gate — content below is gated' +
        '</div>'
      )
    },
  })

  // Bonus tip alert — Bootstrap .alert-secondary with the icon--tips class.
  // Used in whitepaper preview blurbs (e.g. bi-deployment-guide.md) to
  // highlight "Bonus tip" callouts. Body is markdown.
  CMS.registerEditorComponent({
    id: 'bonus-tip',
    label: 'Bonus tip',
    summary: ({ body }) => 'Bonus tip: ' + (body || '').slice(0, 60).replace(/\s+/g, ' '),
    fields: [
      {
        name: 'body',
        label: 'Tip body (markdown)',
        widget: 'text',
        hint: 'Lead with a short bold phrase like "Bonus Tip:" if you want a header. Markdown is processed.',
      },
    ],
    pattern: /<div class="alert alert-secondary icon--tips[^"]*">\s*([\s\S]*?)\s*<\/div>/,
    fromBlock: function (match) {
      return { body: (match[1] || '').trim() }
    },
    toBlock: function (data) {
      const body = (data.body || '').trim()
      return '<div class="alert alert-secondary icon--tips">\n\n' + body + '\n\n</div>'
    },
    toPreview: function (data) {
      const body = (data.body || '').replace(/\n/g, '<br>')
      return (
        '<div style="border:1px solid #d6d8db;background:#e2e3e5;color:#383d41;' +
        'padding:1rem 1.25rem;border-radius:0.5rem">' +
        '💡 ' + body +
        '</div>'
      )
    },
  })
})()
