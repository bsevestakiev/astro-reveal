import { parse } from 'yaml'

const yamlFiles = import.meta.glob('./*.yml', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>

const all: Record<string, Record<string, unknown>> = {}
for (const [path, raw] of Object.entries(yamlFiles)) {
  const lang = path.replace(/^\.\//, '').replace(/\.yml$/, '')
  all[lang] = (parse(raw) as Record<string, unknown>) ?? {}
}

const en: Record<string, unknown> = all.en ?? {}

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function deepMerge<T>(base: T, override: unknown): T {
  if (override === undefined) return base
  if (!isObj(override) || !isObj(base)) return override as T
  const out: Record<string, unknown> = { ...base }
  for (const key of Object.keys(override)) {
    out[key] = key in base ? deepMerge((base as any)[key], (override as any)[key]) : (override as any)[key]
  }
  return out as T
}

export type Strings = typeof en

export function getStrings(lang: string = 'en'): Strings {
  if (lang === 'en') return en as Strings
  const override = all[lang]
  if (!override || Object.keys(override).length === 0) return en as Strings
  return deepMerge(en, override) as Strings
}
