import { createMarkdownProcessor, type MarkdownProcessor } from '@astrojs/markdown-remark'
import remarkHeadingId from 'remark-heading-id'

let processorPromise: Promise<MarkdownProcessor> | null = null

function getProcessor() {
  if (!processorPromise) {
    // Mirror astro.config.mjs `markdown.remarkPlugins` so the whitepaper
    // gate-split renderer accepts the same `## Title {#id}` syntax as the
    // main Astro markdown pipeline.
    processorPromise = createMarkdownProcessor({
      remarkPlugins: [remarkHeadingId],
    })
  }
  return processorPromise
}

// Renders an arbitrary markdown string to HTML using Astro's own remark
// pipeline. Used to render the two halves of a gate-split whitepaper body
// after splitting on `<!-- gate -->`, since Astro's render(entry) only
// renders the whole entry as one Content component.
export async function renderMarkdown(md: string): Promise<string> {
  const processor = await getProcessor()
  const result = await processor.render(md)
  return result.code
}
