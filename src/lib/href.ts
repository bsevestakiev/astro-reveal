const KNOWN_LOCALES = ['es', 'pt-BR', 'ko', 'ja'] as const

export function localizedHref(href: string, lang?: string): string {
  if (!lang || lang === 'en') return href
  if (!href || typeof href !== 'string') return href
  if (/^(https?:|mailto:|tel:|javascript:|#)/i.test(href)) return href
  if (href.startsWith('//')) return href
  if (!href.startsWith('/')) return href

  const prefix = `/${lang}`
  if (href === prefix || href.startsWith(`${prefix}/`)) return href

  for (const l of KNOWN_LOCALES) {
    const lp = `/${l}`
    if (href === lp) return prefix
    if (href.startsWith(`${lp}/`)) return prefix + href.slice(lp.length)
  }

  return prefix + href
}
