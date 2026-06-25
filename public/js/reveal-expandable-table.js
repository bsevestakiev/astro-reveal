/* <reveal-expandable-table>: progressive-enhancement custom element
 * that wraps a markdown <table>, adds a click-to-fullscreen affordance,
 * and applies the comparison-table styling.
 *
 * Authoring (markdown body):
 *   <reveal-expandable-table>
 *
 *   | Old | New |
 *   | --- | --- |
 *   | ... | ... |
 *
 *   </reveal-expandable-table>
 *
 * Without JS: a plain markdown table renders. With JS: it becomes the
 * sticky-first-column comparison table with the expand button. */
(function () {
  if (typeof window === 'undefined' || customElements.get('reveal-expandable-table')) return

  const STYLE_ID = 'reveal-expandable-table-style'
  const STYLES = `
    reveal-expandable-table { display: block; margin: 1rem 0 1.5rem; }
    reveal-expandable-table .ret-controls { display: flex; justify-content: flex-end; align-items: center; margin-bottom: 10px; position: relative; }
    reveal-expandable-table .ret-expand { background: #fff; border: 1px solid #e5e7eb; border-radius: 6px; width: 40px; height: 40px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: transform .2s ease, background .2s ease; }
    reveal-expandable-table .ret-expand:hover { background: #f8f9fa; transform: scale(1.05); }
    reveal-expandable-table .ret-expand svg { width: 18px; height: 18px; }
    reveal-expandable-table .ret-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; max-width: 100vw; position: relative; border-radius: 0.375rem; box-shadow: inset -5px 0 11px 1px #00000014; transition: all .4s ease; }
    reveal-expandable-table table { min-width: 700px; margin: 0; border-collapse: collapse; width: 100%; }
    reveal-expandable-table th, reveal-expandable-table td { padding: 12px 8px; min-width: 50px; border: none; }
    reveal-expandable-table thead tr th { background: #666; color: #fff; font-weight: 600; position: sticky; top: 0; z-index: 10; }
    reveal-expandable-table tbody tr:nth-of-type(odd) td { background: #fff; }
    reveal-expandable-table tbody tr:nth-of-type(even) td { background: #f5f6fb; }
    reveal-expandable-table tbody td:first-child, reveal-expandable-table thead th:first-child { position: sticky; left: 0; z-index: 5; min-width: 130px; font-weight: 600; }
    reveal-expandable-table tbody tr:nth-of-type(odd) td:first-child { background: #fff; }
    reveal-expandable-table tbody tr:nth-of-type(even) td:first-child { background: #f5f6fb; }
    reveal-expandable-table thead th:first-child { background: #ec417a; color: #fff; width: 290px; }
    reveal-expandable-table tbody td:first-child::after, reveal-expandable-table thead th:first-child::after { content: ""; position: absolute; top: 0; right: 0; bottom: 0; width: 10px; pointer-events: none; box-shadow: 10px 0 10px 0 #00000014; }
    reveal-expandable-table .ret-scroll::after { content: "← Swipe to see more →"; display: block; text-align: center; font-size: 12px; color: #6c757d; padding: 8px; background: #f8f9fa; border-top: 1px solid #dee2e6; }
    @media (min-width: 1200px) { reveal-expandable-table .ret-scroll::after { display: none; } }
    reveal-expandable-table.is-expanded { position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 999999; background: rgba(255,255,255,0.97); margin: 0; padding: 56px 16px 16px; overflow: auto; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); display: flex; flex-direction: column; }
    reveal-expandable-table.is-expanded .ret-controls { display: none; }
    reveal-expandable-table.is-expanded .ret-scroll { max-width: none; max-height: none; box-shadow: 0 10px 30px rgba(0,0,0,.2); border-radius: 8px; background: #fff; flex: 1; }
    reveal-expandable-table.is-expanded .ret-scroll::after { display: none; }
    reveal-expandable-table.is-expanded table { min-width: 0; }
    reveal-expandable-table.is-expanded th, reveal-expandable-table.is-expanded td { white-space: normal; }
    .ret-close { position: fixed; top: 16px; right: 16px; z-index: 1000000; background: #dc3545; color: #fff; border: 0; border-radius: 50%; width: 44px; height: 44px; font-size: 20px; line-height: 1; cursor: pointer; box-shadow: 0 4px 8px rgba(0,0,0,.2); transition: transform .2s ease, background .2s ease; }
    .ret-close:hover { background: #c82333; transform: scale(1.08); }
    @media (max-width: 768px) {
      reveal-expandable-table .ret-expand { width: 36px; height: 36px; }
      reveal-expandable-table.is-expanded { padding: 56px 8px 8px; }
      reveal-expandable-table.is-expanded th, reveal-expandable-table.is-expanded td { font-size: 12px; padding: 8px 6px; }
    }
  `

  const EXPAND_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>'

  function injectStyleOnce() {
    if (document.getElementById(STYLE_ID)) return
    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = STYLES
    document.head.appendChild(style)
  }

  class RevealExpandableTable extends HTMLElement {
    connectedCallback() {
      if (this.dataset.enhanced === '1') return
      const table = this.querySelector('table')
      if (!table) return
      injectStyleOnce()

      // Wrap the table in a scroll container; prepend a header-controls bar
      // with an expand button. We move the table into the scroll wrapper
      // rather than re-rendering, so the original DOM (including any links
      // or markup the markdown emitted) survives.
      const controls = document.createElement('div')
      controls.className = 'ret-controls'
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'ret-expand'
      btn.setAttribute('aria-label', 'Expand table to fullscreen')
      btn.innerHTML = EXPAND_SVG
      controls.appendChild(btn)

      const scroll = document.createElement('div')
      scroll.className = 'ret-scroll'
      this.insertBefore(scroll, table)
      scroll.appendChild(table)
      this.insertBefore(controls, scroll)

      btn.addEventListener('click', () => this.expand())
      this.dataset.enhanced = '1'
    }

    expand() {
      this.classList.add('is-expanded')
      const close = document.createElement('button')
      close.type = 'button'
      close.className = 'ret-close'
      close.setAttribute('aria-label', 'Close expanded table')
      close.textContent = '✕'
      document.body.appendChild(close)
      this._close = close
      this._prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      const collapse = () => this.collapse()
      close.addEventListener('click', collapse)
      this._onKey = (e) => { if (e.key === 'Escape') collapse() }
      document.addEventListener('keydown', this._onKey)
    }

    collapse() {
      this.classList.remove('is-expanded')
      if (this._close && this._close.parentNode) this._close.parentNode.removeChild(this._close)
      this._close = null
      document.body.style.overflow = this._prevOverflow || ''
      if (this._onKey) document.removeEventListener('keydown', this._onKey)
      this._onKey = null
    }

    disconnectedCallback() {
      if (this.classList.contains('is-expanded')) this.collapse()
    }
  }

  customElements.define('reveal-expandable-table', RevealExpandableTable)
})()
