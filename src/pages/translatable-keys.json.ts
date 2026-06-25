import type { APIRoute } from 'astro'
import { sectionSchema } from '../content.config'

export const prerender = true

type Entry = { path: string, kind: string }

function walk(schema: any, path: string[] = [], out: Entry[] = []): Entry[] {
  if (!schema || typeof schema !== 'object') return out
  const def = schema._def
  if (!def) return out

  // Description on this node
  const desc = def.description ?? schema.description
  if (typeof desc === 'string' && (desc === 'translatable' || desc === 'translatable-html' || desc === 'asset')) {
    out.push({ path: path.join('.'), kind: desc })
  }

  switch (def.typeName) {
    case 'ZodOptional':
    case 'ZodNullable':
    case 'ZodDefault':
    case 'ZodReadonly':
      walk(def.innerType, path, out)
      break
    case 'ZodEffects':
      walk(def.schema, path, out)
      break
    case 'ZodDiscriminatedUnion':
    case 'ZodUnion': {
      const opts = def.options ?? def.optionsMap?.values?.() ?? []
      const list = Array.from(opts as Iterable<any>)
      for (const opt of list) walk(opt, path, out)
      break
    }
    case 'ZodObject': {
      const shape = typeof def.shape === 'function' ? def.shape() : def.shape
      for (const [k, v] of Object.entries(shape ?? {})) {
        walk(v, [...path, k], out)
      }
      break
    }
    case 'ZodArray':
      walk(def.type, [...path, '[]'], out)
      break
  }
  return out
}

export const GET: APIRoute = () => {
  const entries = walk(sectionSchema)
  // Group by section type when path starts with a known discriminator
  const bySection: Record<string, Entry[]> = {}
  const general: Entry[] = []
  for (const e of entries) {
    bySection.section ??= []
    bySection.section.push(e)
  }
  const payload = {
    description: 'Auto-generated. Lists every section field that the n8n translation pipeline should translate (translatable / translatable-html) or preserve verbatim (asset). Path notation: `[]` denotes array elements; nested keys are dot-separated.',
    entries,
  }
  return new Response(JSON.stringify(payload, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  })
}
