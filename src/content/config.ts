import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const t = (s: z.ZodTypeAny) => s.describe('translatable');
const tHtml = (s: z.ZodTypeAny) => s.describe('translatable-html');
const asset = (s: z.ZodTypeAny) => s.describe('asset');

const srcsetEntry = z.object({
  media: z.string(),
  srcset: z.string(),
});

const ctaSchema = z.object({
  label: t(z.string()),
  href: z.string(),
}).passthrough();

const heroSchema = z.object({
  type: z.literal('hero'),
  headline: tHtml(z.string()),
  subheadlines: z.array(t(z.string())).optional(),
  ctaLabel: t(z.string()).optional(),
  secondaryCtaLabel: t(z.string()).optional(),
  secondaryCtaUrl: z.string().optional(),
  image: asset(z.string()).optional(),
  imageSrcset: z.array(srcsetEntry).optional(),
  imageAlt: t(z.string()).optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const darkHeroSchema = z.object({
  type: z.literal('dark-hero'),
  title: tHtml(z.string()).optional(),
  subhead: tHtml(z.string()).optional(),
  variant: z.string().optional(),
  image: asset(z.string()).optional(),
  imageAlt: t(z.string()).optional(),
  imageSrcset: z.array(srcsetEntry).optional(),
  ctaLabel: t(z.string()).optional(),
  ctaHref: z.string().optional(),
  secondaryCtaLabel: t(z.string()).optional(),
  secondaryCtaHref: z.string().optional(),
  breadcrumbs: z.array(z.unknown()).optional(),
  accentColor: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const pricingHeroSchema = z.object({
  type: z.literal('pricing-hero'),
  headline: tHtml(z.string()).optional(),
  subhead: tHtml(z.string()).optional(),
  features: z.array(z.unknown()).optional(),
  ctaLabel: t(z.string()).optional(),
  ratingsImage: asset(z.string()).optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const logoSliderSchema = z.object({
  type: z.literal('logo-slider'),
  logos: z.array(
    z.object({
      src: asset(z.string()),
      alt: t(z.string()),
    }).passthrough()
  ),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const featureRowSchema = z.object({
  type: z.literal('feature-row'),
  headline: tHtml(z.string()).optional(),
  eyebrow: t(z.string()).optional(),
  image: asset(z.string()).optional(),
  imageSrcset: z.array(srcsetEntry).optional(),
  imageAlt: t(z.string()).optional(),
  imageClass: z.string().optional(),
  reversed: z.boolean().optional(),
  variant: z.string().optional(),
  textColClass: z.string().optional(),
  cta: ctaSchema.optional(),
  slotContent: tHtml(z.string()).optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const iconGridSchema = z.object({
  type: z.literal('icon-grid'),
  eyebrow: t(z.string()).optional(),
  headline: tHtml(z.string()).optional(),
  subhead: tHtml(z.string()).optional(),
  subhead2: tHtml(z.string()).optional(),
  variant: z.string().optional(),
  cols: z.number().optional(),
  cards: z.array(z.unknown()),
  footnote: tHtml(z.string()).optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const comparisonTableSchema = z.object({
  type: z.literal('comparison-table'),
  eyebrow: t(z.string()).optional(),
  headline: tHtml(z.string()).optional(),
  subhead: tHtml(z.string()).optional(),
  competitor: z.unknown().optional(),
  rows: z.array(z.unknown()),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const featureStepsSchema = z.object({
  type: z.literal('feature-steps'),
  eyebrow: t(z.string()).optional(),
  headline: tHtml(z.string()).optional(),
  subhead: tHtml(z.string()).optional(),
  steps: z.array(z.unknown()),
  footnote: tHtml(z.string()).optional(),
  variant: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const aiDarkSectionSchema = z.object({
  type: z.literal('ai-dark-section'),
  rows: z.array(z.unknown()),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const fastImplementationSchema = z.object({
  type: z.literal('fast-implementation'),
  eyebrow: t(z.string()).optional(),
  headline: tHtml(z.string()).optional(),
  subhead: tHtml(z.string()).optional(),
  compareBefore: z.unknown().optional(),
  compareAfter: z.unknown().optional(),
  benefits: z.array(t(z.string())).optional(),
  footnote: tHtml(z.string()).optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const statsBandSchema = z.object({
  type: z.literal('stats-band'),
  headline: tHtml(z.string()).optional(),
  subhead: tHtml(z.string()).optional(),
  stats: z.array(z.unknown()),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const pricingTeaserSchema = z.object({
  type: z.literal('pricing-teaser'),
  eyebrow: t(z.string()).optional(),
  headline: tHtml(z.string()).optional(),
  subhead: tHtml(z.string()).optional(),
  features: z.array(z.unknown()).optional(),
  pillars: z.array(z.unknown()).optional(),
  ctaLabel: t(z.string()).optional(),
  ctaHref: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const reviewsSchema = z.object({
  type: z.literal('reviews'),
  headline: tHtml(z.string()).optional(),
  subhead: tHtml(z.string()).optional(),
  quote: tHtml(z.string()).optional(),
  badges: z.array(z.unknown()).optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const faqSchema = z.object({
  type: z.literal('faq'),
  headline: t(z.string()).optional(),
  variant: z.string().optional(),
  items: z.array(
    z.object({
      question: t(z.string()),
      answer: tHtml(z.string()),
      open: z.boolean().optional(),
    }).passthrough()
  ),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const inlineCtaSchema = z.object({
  type: z.literal('inline-cta'),
  icon: asset(z.string()).optional(),
  iconAlt: t(z.string()).optional(),
  headline: tHtml(z.string()).optional(),
  body: tHtml(z.string()).optional(),
  ctaLabel: t(z.string()).optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const ctaBlockSchema = z.object({
  type: z.literal('cta-block'),
  headline: tHtml(z.string()).optional(),
  subheadline: tHtml(z.string()).optional(),
  ctaLabel: t(z.string()).optional(),
  ctaUrl: z.string().optional(),
  secondaryCtaLabel: t(z.string()).optional(),
  secondaryCtaUrl: z.string().optional(),
  demoModal: z.boolean().optional(),
  variant: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const sectionHeaderSchema = z.object({
  type: z.literal('section-header'),
  headline: tHtml(z.string()),
  body: tHtml(z.string()).optional(),
  anchor: z.string().optional(),
  variant: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const leadFormSchema = z.object({
  type: z.literal('lead-form'),
  headline: tHtml(z.string()).optional(),
  body: tHtml(z.string()).optional(),
  anchor: z.string().optional(),
  formId: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const bannerSchema = z.object({
  type: z.literal('banner'),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const featuresSchema = z.object({
  type: z.literal('features'),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const teamSchema = z.object({
  type: z.literal('team'),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const videoSplitHeroSchema = z.object({
  type: z.literal('video-split-hero'),
  title: tHtml(z.string()),
  subhead: t(z.string()).optional(),
  ctaLabel: t(z.string()).optional(),
  ctaHref: z.string().optional(),
  videoSrc: asset(z.string()),
  videoPoster: asset(z.string()).optional(),
  videoTitle: t(z.string()).optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const competitorMatrixSchema = z.object({
  type: z.literal('competitor-matrix'),
  topEyebrow: t(z.string()).optional(),
  preHeadline: tHtml(z.string()).optional(),
  headline: tHtml(z.string()),
  summary: z.array(z.unknown()).optional(),
  middleEyebrow: t(z.string()).optional(),
  middleHeadline: tHtml(z.string()).optional(),
  middleSubhead: tHtml(z.string()).optional(),
  columns: z.array(t(z.string())),
  rows: z.array(z.unknown()),
  anchor: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const storyTeaserSchema = z.object({
  type: z.literal('story-teaser'),
  headline: tHtml(z.string()),
  subhead: tHtml(z.string()).optional(),
  viewAllLabel: t(z.string()).optional(),
  viewAllUrl: z.string().optional(),
  stories: z.array(z.unknown()),
  anchor: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const aiCompareListSchema = z.object({
  type: z.literal('ai-compare-list'),
  headline: tHtml(z.string()),
  columns: z.array(z.unknown()),
  footnote: tHtml(z.string()).optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const blogTeaserSchema = z.object({
  type: z.literal('blog-teaser'),
  headline: tHtml(z.string()),
  subhead: tHtml(z.string()).optional(),
  viewAllLabel: t(z.string()).optional(),
  viewAllUrl: z.string().optional(),
  slugs: z.array(z.string()),
  anchor: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const featureTabsSchema = z.object({
  type: z.literal('feature-tabs'),
  topEyebrow: t(z.string()).optional(),
  headline: tHtml(z.string()),
  intro: t(z.string()).optional(),
  anchor: z.string().optional(),
  tabs: z.array(z.object({
    id: z.string(),
    label: t(z.string()),
    title: tHtml(z.string()),
    image: asset(z.string()).optional(),
    imageAlt: t(z.string()).optional(),
    video: asset(z.string()).optional(),
    videoPoster: asset(z.string()).optional(),
    body: tHtml(z.string()),
  })),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const sectionSchemaInternal = z.discriminatedUnion('type', [
  heroSchema,
  darkHeroSchema,
  pricingHeroSchema,
  logoSliderSchema,
  featureRowSchema,
  iconGridSchema,
  comparisonTableSchema,
  featureStepsSchema,
  aiDarkSectionSchema,
  fastImplementationSchema,
  statsBandSchema,
  pricingTeaserSchema,
  reviewsSchema,
  faqSchema,
  inlineCtaSchema,
  ctaBlockSchema,
  sectionHeaderSchema,
  leadFormSchema,
  bannerSchema,
  featuresSchema,
  teamSchema,
  videoSplitHeroSchema,
  blogTeaserSchema,
  aiCompareListSchema,
  storyTeaserSchema,
  competitorMatrixSchema,
  featureTabsSchema,
]);

export const sectionSchema = sectionSchemaInternal;

const blogSchema = z.object({
  title: t(z.string()),
  description: t(z.string()).optional(),
  date: z.string().optional(),
  cover: asset(z.string()).optional(),
  heroImage: asset(z.string()).optional(),
  author: z.string().optional(),
  category: t(z.string()).optional(),
  tags: z.array(t(z.string())).optional(),
  summary: tHtml(z.string()).optional(),
  takeaways: z.array(t(z.string())).optional(),
});

const pageSchema = z.object({
  title: t(z.string()),
  description: t(z.string()).optional(),
  cover: asset(z.string()).optional(),
  sections: z.array(sectionSchemaInternal).optional(),
});

const whitepaperSchema = z.object({
  title: t(z.string()),
  description: t(z.string()).optional(),
  cover: asset(z.string()).optional(),
  date: z.string().optional(),
  author: z.string().optional(),
  authorBio: tHtml(z.string()).optional(),
});

const whitepaperGatedSchema = z.object({
  title: t(z.string()).optional(),
});

const webinarSchema = z.object({
  title: t(z.string()),
  description: t(z.string()).optional(),
  date: z.string().optional(),
  duration: z.string().optional(),
  youtubeId: z.string().optional(),
  cover: asset(z.string()).optional(),
});

const storySchema = z.object({
  title: t(z.string()),
  description: t(z.string()).optional(),
  cover: asset(z.string()).optional(),
  logo: asset(z.string()).optional(),
  industry: z.string().optional(),
  markets: z.string().optional(),
});

const glossarySchema = z.object({
  title: t(z.string()),
  description: t(z.string()).optional(),
});

export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: blogSchema,
  }),
  pages: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
    schema: pageSchema,
  }),
  whitepapers: defineCollection({
    loader: glob({ pattern: ['**/*.md', '!**/*.gated.md'], base: './src/content/whitepapers' }),
    schema: whitepaperSchema,
  }),
  whitepapersGated: defineCollection({
    loader: glob({ pattern: '**/*.gated.md', base: './src/content/whitepapers' }),
    schema: whitepaperGatedSchema,
  }),
  webinars: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/webinars' }),
    schema: webinarSchema,
  }),
  stories: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
    schema: storySchema,
  }),
  glossary: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/glossary' }),
    schema: glossarySchema,
  }),
};
