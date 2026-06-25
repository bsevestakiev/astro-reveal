/* Sitewide accordion behavior. Replaces the WP-frozen plugins.js accordion
 * (whose handler fought ours and re-toggled state). Works for any
 * .accordion / .accordion-item / .accordion-button / .accordion-collapse
 * tree on the page — FAQ section, raw-HTML accordions in page markdown
 * (download-sdk, security), etc.
 *
 * Behavior:
 * - Click a closed item → opens it.
 * - Click an open item → closes it.
 * - Default is single-open: opening one closes any others in the same
 *   accordion. Set data-accordion-multiopen="true" on the .accordion to
 *   allow multiple open at once.
 *
 * The data-faq-bound guard prevents duplicate listeners if this script
 * gets re-evaluated (HMR, re-renders).
 */
(function () {
  if (typeof window === 'undefined') return;

  // Neutralize the legacy accordion init from plugins.js so script.js's
  // accordion.init(...) becomes a no-op and doesn't double-bind.
  if (window.accordion && typeof window.accordion.init === 'function') {
    window.accordion.init = function () {};
  }

  function bind() {
    document.querySelectorAll('.accordion-button:not([data-faq-bound])').forEach(function (btn) {
      btn.setAttribute('data-faq-bound', '1');
      btn.addEventListener('click', function () {
        var item = btn.closest('.accordion-item');
        if (!item) return;
        var panel = item.querySelector('.accordion-collapse');
        if (!panel) return;
        var acc = btn.closest('.accordion');
        var multiOpen = acc && acc.getAttribute('data-accordion-multiopen') === 'true';
        var willOpen = !panel.classList.contains('show');
        if (willOpen && !multiOpen && acc) {
          acc.querySelectorAll('.accordion-collapse.show').forEach(function (p) {
            if (p !== panel) p.classList.remove('show');
          });
          acc.querySelectorAll('.accordion-button:not(.collapsed)').forEach(function (b) {
            if (b !== btn) {
              b.classList.add('collapsed');
              b.setAttribute('aria-expanded', 'false');
            }
          });
        }
        var open = panel.classList.toggle('show');
        btn.classList.toggle('collapsed', !open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
