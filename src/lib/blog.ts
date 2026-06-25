import { getCollection, type CollectionEntry } from 'astro:content'

export interface BlogCategory {
  name: string
  slug: string
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { name: 'AI Analytics', slug: 'ai-analytics' },
  { name: 'BI', slug: 'business-intelligence' },
  { name: 'Embedded Analytics', slug: 'embedded-analytics' },
  { name: 'Product Reviews', slug: 'product-reviews' },
  { name: 'Product Updates', slug: 'product-updates' },
  { name: 'SaaS Analytics Trends', slug: 'saas-analytics-trends' },
  { name: 'Technical Insights', slug: 'technical-insights' },
]

export const BLOG_PAGE_SIZE = 10

export function slugifyCategory(name: string): string {
  return name.toLowerCase().trim().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

const CATEGORY_NAME_BY_SLUG: Record<string, string> =
  Object.fromEntries(BLOG_CATEGORIES.map((c) => [c.slug, c.name]))

export function categoryNameFromSlug(slug: string): string | undefined {
  return CATEGORY_NAME_BY_SLUG[slug]
}

export function postCategories(post: CollectionEntry<'blog'>): string[] {
  const list = post.data.categories ?? (post.data.category ? [post.data.category] : [])
  return list.filter(Boolean)
}

export function postHasCategorySlug(post: CollectionEntry<'blog'>, slug: string): boolean {
  return postCategories(post).some((c) => slugifyCategory(c) === slug)
}

export async function getEnPosts(): Promise<CollectionEntry<'blog'>[]> {
  const all = await getCollection('blog')
  return all
    .filter((p) => p.id.startsWith('en/') && p.id !== 'en/index')
    .sort((a, b) => (b.data.date ?? '').localeCompare(a.data.date ?? ''))
}

export async function getLocalePosts(lang: string): Promise<CollectionEntry<'blog'>[]> {
  const all = await getCollection('blog')
  // Case-insensitive: Astro lowercases collection ids, so `pt-BR/...` → `pt-br/...`.
  const prefix = `${lang.toLowerCase()}/`
  return all
    .filter((p) => p.id.toLowerCase().startsWith(prefix) && p.id.toLowerCase() !== `${prefix}index`)
    .sort((a, b) => (b.data.date ?? '').localeCompare(a.data.date ?? ''))
}

export interface PaginationLinks {
  prev: string | null
  next: string | null
  pages: { num: number; href: string; current: boolean }[]
}

export function buildPagination(currentPage: number, totalPages: number, basePath: string): PaginationLinks {
  const hrefFor = (n: number) => (n === 1 ? `${basePath}` : `${basePath}/page/${n}`)
  const prev = currentPage > 1 ? hrefFor(currentPage - 1) : null
  const next = currentPage < totalPages ? hrefFor(currentPage + 1) : null

  const nums: number[] = []
  const window = 2
  const start = Math.max(1, currentPage - window)
  const end = Math.min(totalPages, currentPage + window)
  for (let i = start; i <= end; i++) nums.push(i)
  if (start > 1) {
    if (start > 2) nums.unshift(-1)
    nums.unshift(1)
  }
  if (end < totalPages) {
    if (end < totalPages - 1) nums.push(-1)
    nums.push(totalPages)
  }

  const pages = nums.map((n) =>
    n === -1
      ? { num: -1, href: '', current: false }
      : { num: n, href: hrefFor(n), current: n === currentPage }
  )
  return { prev, next, pages }
}
