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
  headlineClass: z.string().optional(),
  eyebrow: t(z.string()).optional(),
  variant: z.string().optional(),
  subheadlines: z.array(t(z.string())).optional(),
  ctaLabel: t(z.string()).optional(),
  secondaryCtaLabel: t(z.string()).optional(),
  secondaryCtaUrl: z.string().optional(),
  image: asset(z.string()).optional(),
  imageSrcset: z.array(srcsetEntry).optional(),
  imageAlt: t(z.string()).optional(),
  trustImage: asset(z.string()).optional(),
  trustAlt: t(z.string()).optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const darkHeroSchema = z.object({
  type: z.literal('dark-hero'),
  title: tHtml(z.string()).optional(),
  mobileTitle: t(z.string()).optional(),
  subhead: tHtml(z.string()).optional(),
  variant: z.string().optional(),
  image: asset(z.string()).optional(),
  imageAlt: t(z.string()).optional(),
  imageSrcset: z.array(srcsetEntry).optional(),
  ctaLabel: t(z.string()).optional(),
  ctaHref: z.string().optional(),
  secondaryCtaLabel: t(z.string()).optional(),
  secondaryCtaHref: z.string().optional(),
  secondaryCtaClass: z.string().optional(),
  ctaClass: z.string().optional(),
  breadcrumbs: z.array(z.unknown()).optional(),
  accentColor: z.string().optional(),
  navmenuContainer: z.boolean().optional(),
  logos: z.array(
    z.object({
      src: asset(z.string()),
      alt: t(z.string()),
    }).passthrough()
  ).optional(),
  trustBadgeImage: asset(z.string()).optional(),
  trustBadgeAlt: t(z.string()).optional(),
  trustBadgeLine: t(z.string()).optional(),
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
  label: t(z.string()).optional(),
  wrapperClass: z.string().optional(),
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
  colSplit: z.enum(['7-5', '5-7', '6-6', '5-6']).optional(),
  cta: ctaSchema.optional(),
  slotContent: tHtml(z.string()).optional(),
  videoSrc: asset(z.string()).optional(),
  videoPoster: asset(z.string()).optional(),
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
  footnoteClass: z.string().optional(),
  iconSize: z.number().optional(),
  cardTitleTag: z.enum(['h3', 'p']).optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const comparisonTableSchema = z.object({
  type: z.literal('comparison-table'),
  eyebrow: t(z.string()).optional(),
  headline: tHtml(z.string()).optional(),
  subhead: tHtml(z.string()).optional(),
  subhead2: tHtml(z.string()).optional(),
  firstColumnLabel: t(z.string()).optional(),
  competitor: z.unknown().optional(),
  rows: z.array(z.unknown()),
  ctaBelow: t(z.string()).optional(),
  bg: z.enum(['gallery', 'white']).optional(),
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
  cards: z.array(z.object({
    text: z.string(),
    reviewer: z.string(),
    href: z.string().optional(),
  })).optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const customerQuoteSchema = z.object({
  type: z.literal('customer-quote'),
  quote: tHtml(z.string()),
  authorName: t(z.string()),
  authorTitle: t(z.string()),
  storyUrl: z.string().optional(),
  storyLabel: t(z.string()).optional(),
  image: asset(z.string()).optional(),
  imageAlt: t(z.string()).optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const faqSchema = z.object({
  type: z.literal('faq'),
  headline: t(z.string()).optional(),
  eyebrow: t(z.string()).optional(),
  variant: z.string().optional(),
  headlineSize: z.string().optional(),
  multiopen: z.boolean().optional(),
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
  headlineClass: z.string().optional(),
  body: tHtml(z.string()).optional(),
  ctaLabel: t(z.string()).optional(),
  ctaVariant: z.enum(['primary', 'outline-primary']).optional(),
  wrapperClass: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const ctaBlockSchema = z.object({
  type: z.literal('cta-block'),
  headline: tHtml(z.string()).optional(),
  subheadline: tHtml(z.string()).optional(),
  body2: tHtml(z.string()).optional(),
  ctaLabel: t(z.string()).optional(),
  ctaUrl: z.string().optional(),
  secondaryCtaLabel: t(z.string()).optional(),
  secondaryCtaUrl: z.string().optional(),
  demoModal: z.boolean().optional(),
  variant: z.string().optional(),
  image: asset(z.string()).optional(),
  imageSrcset: z.array(srcsetEntry).optional(),
  imageAlt: t(z.string()).optional(),
  bgColor: z.string().optional(),
  navmenuContainer: z.boolean().optional(),
  textColWidth: z.string().optional(),
  imageColWidth: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const quoteSliderItemSchema = z.object({
  quote: t(z.string()),
  authorName: t(z.string()),
  authorTitle: t(z.string()),
  storyUrl: z.string().optional(),
  storyLabel: t(z.string()).optional(),
  logoSrc: z.string().optional(),
  logoAlt: t(z.string()).optional(),
  image: asset(z.string()),
  imageSrcset: z.array(srcsetEntry).optional(),
  imageAlt: t(z.string()).optional(),
});

const quoteSliderSchema = z.object({
  type: z.literal('quote-slider'),
  eyebrow: t(z.string()).optional(),
  headline: tHtml(z.string()),
  items: z.array(quoteSliderItemSchema),
  anchor: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const ctaImageCardSchema = z.object({
  type: z.literal('cta-image-card'),
  headline: tHtml(z.string()),
  subheadline: tHtml(z.string()).optional(),
  ctaLabel: t(z.string()).optional(),
  ctaUrl: z.string().optional(),
  demoModal: z.boolean().optional(),
  bgColor: z.string().optional(),
  image: asset(z.string()),
  imageSrcset: z.array(srcsetEntry).optional(),
  imageAlt: t(z.string()).optional(),
  anchor: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const sectionHeaderSchema = z.object({
  type: z.literal('section-header'),
  headline: tHtml(z.string()),
  body: tHtml(z.string()).optional(),
  anchor: z.string().optional(),
  variant: z.string().optional(),
  headlineSize: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const leadFormSchema = z.object({
  type: z.literal('lead-form'),
  headline: tHtml(z.string()).optional(),
  body: tHtml(z.string()).optional(),
  anchor: z.string().optional(),
  formId: z.string().optional(),
  cardTitle: t(z.string()).optional(),
  thankYouHtml: tHtml(z.string()).optional(),
  submitLabel: t(z.string()).optional(),
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
  eyebrow: t(z.string()).optional(),
  srOnly: t(z.string()).optional(),
  viewAllLabel: t(z.string()).optional(),
  viewAllUrl: z.string().optional(),
  stories: z.array(z.object({
    slug: z.string(),
    industry: t(z.string()).optional(),
    quote: t(z.string()).optional(),
    author: t(z.string()).optional(),
    ctaLabel: t(z.string()).optional(),
  })),
  anchor: z.string().optional(),
  sectionClass: z.string().optional(),
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
  headlineClass: z.string().optional(),
  srOnly: t(z.string()).optional(),
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

const subnavSchema = z.object({
  type: z.literal('subnav'),
  links: z.array(z.object({
    label: t(z.string()),
    href: z.string(),
    nowrap: z.boolean().optional(),
  })),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const platformProcessCardSchema = z.object({
  type: z.literal('platform-process-card'),
  headline: tHtml(z.string()),
  steps: z.array(z.object({
    number: z.string(),
    label: t(z.string()),
    description: t(z.string()),
    icon: asset(z.string()),
    iconAlt: t(z.string()),
    stepClass: z.string().optional(),
  })),
  dataSources: z.array(z.object({
    icon: asset(z.string()),
    label: t(z.string()),
  })).optional(),
  footerText: t(z.string()).optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const darkCapabilitiesGridSchema = z.object({
  type: z.literal('dark-capabilities-grid'),
  headline: tHtml(z.string()),
  cards: z.array(z.object({
    icon: asset(z.string()),
    iconAlt: t(z.string()),
    title: t(z.string()),
    body: t(z.string()),
  })),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const verticalCardsSchema = z.object({
  type: z.literal('vertical-cards'),
  headline: tHtml(z.string()),
  subhead: tHtml(z.string()).optional(),
  cards: z.array(z.object({
    headerClass: z.string(),
    icon: asset(z.string()),
    iconAlt: t(z.string()),
    iconWidth: z.number().optional(),
    title: t(z.string()),
    bullets: z.array(t(z.string())),
  })),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const featureStickyScrollSchema = z.object({
  type: z.literal('feature-sticky-scroll'),
  headline: tHtml(z.string()),
  panels: z.array(z.object({
    title: t(z.string()),
    body: tHtml(z.string()),
    mobileBody: tHtml(z.string()).optional(),
    image960: asset(z.string()),
    image1600: asset(z.string()),
    imageAlt: t(z.string()),
    imageTitle: t(z.string()),
  })),
  anchor: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const metricBenefitGridSchema = z.object({
  type: z.literal('metric-benefit-grid'),
  eyebrow: t(z.string()).optional(),
  headline: tHtml(z.string()).optional(),
  subhead: tHtml(z.string()).optional(),
  cards: z.array(z.unknown()),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const dualChecklistSchema = z.object({
  type: z.literal('dual-checklist'),
  bgColor: z.string().optional(),
  leftColumn: z.unknown().optional(),
  rightColumn: z.unknown().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const lightFeatureTabsSchema = z.object({
  type: z.literal('light-feature-tabs'),
  eyebrow: t(z.string()).optional(),
  headline: tHtml(z.string()).optional(),
  intro: tHtml(z.string()).optional(),
  tabs: z.array(z.unknown()),
  anchor: z.string().optional(),
  bgColor: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const aiVideoBlockSchema = z.object({
  type: z.literal('ai-video-block'),
  headline: tHtml(z.string()),
  subhead: tHtml(z.string()).optional(),
  videoWebm: asset(z.string()),
  videoMp4: asset(z.string()),
  videoPoster: asset(z.string()),
  videoAlt: t(z.string()).optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const aiUnderHoodSchema = z.object({
  type: z.literal('ai-under-hood'),
  headline: tHtml(z.string()),
  subhead: tHtml(z.string()).optional(),
  footnote: tHtml(z.string()).optional(),
  pillars: z.array(z.object({
    icon: asset(z.string()),
    iconAlt: t(z.string()),
    title: tHtml(z.string()),
  })),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const aiEnterpriseGridSchema = z.object({
  type: z.literal('ai-enterprise-grid'),
  eyebrow: t(z.string()).optional(),
  headline: tHtml(z.string()),
  subhead: tHtml(z.string()).optional(),
  cards: z.array(z.object({
    icon: asset(z.string()),
    iconAlt: t(z.string()),
    iconColor: z.string().optional(),
    title: t(z.string()),
    body: tHtml(z.string()),
  })),
  controlHeadline: tHtml(z.string()).optional(),
  controlIntro: tHtml(z.string()).optional(),
  controlItems: z.array(z.object({
    title: t(z.string()),
    body: tHtml(z.string()),
  })).optional(),
  controlNote: tHtml(z.string()).optional(),
  controlImage: asset(z.string()).optional(),
  controlImageAlt: t(z.string()).optional(),
  controlImageSrcset: z.array(z.object({
    media: z.string(),
    srcset: z.string(),
  })).optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const aiStepFlowSchema = z.object({
  type: z.literal('ai-step-flow'),
  headline: tHtml(z.string()),
  footnote: tHtml(z.string()).optional(),
  steps: z.array(z.object({
    icon: asset(z.string()),
    iconAlt: t(z.string()),
    iconColor: z.string().optional(),
    title: t(z.string()),
    body: tHtml(z.string()),
  })),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const securityRiskTableSchema = z.object({
  type: z.literal('security-risk-table'),
  headline: tHtml(z.string()),
  rows: z.array(z.object({
    risk: tHtml(z.string()),
    category: t(z.string()),
    mitigation: tHtml(z.string()),
  })),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const securityArchCardsSchema = z.object({
  type: z.literal('security-arch-cards'),
  variant: z.enum(['cards', 'comparison']).optional(),
  cardVariant: z.string().optional(),
  eyebrow: t(z.string()).optional(),
  headline: tHtml(z.string()),
  subhead: tHtml(z.string()).optional(),
  ctaLink: z.string().optional(),
  ctaText: z.string().optional(),
  cards: z.array(z.object({
    icon: asset(z.string()).optional(),
    iconAlt: t(z.string()).optional(),
    title: tHtml(z.string()).optional(),
    titleClass: z.string().optional(),
    intro: tHtml(z.string()).optional(),
    introClass: z.string().optional(),
    cardClass: z.string().optional(),
    listClass: z.string().optional(),
    listVariant: z.enum(['blue-tick', 'mark-x-tick']).optional(),
    items: z.array(z.union([
      tHtml(z.string()),
      z.object({
        text: tHtml(z.string()),
        class: z.string().optional(),
      }),
    ])),
  })).optional(),
  comparisonLeft: t(z.string()).optional(),
  comparisonRight: t(z.string()).optional(),
  comparisonRows: z.array(z.object({
    left: t(z.string()),
    right: t(z.string()),
  })).optional(),
  linkText: t(z.string()).optional(),
  linkUrl: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const securityGradientBannerSchema = z.object({
  type: z.literal('security-gradient-banner'),
  headline: tHtml(z.string()),
  body: tHtml(z.string()),
  tags: z.array(z.object({
    label: t(z.string()),
  })),
  image: asset(z.string()),
  imageAlt: t(z.string()),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const gradientHeroSchema = z.object({
  type: z.literal('gradient-hero'),
  headline: t(z.string()),
  subhead: t(z.string()).optional(),
  ctaLabel: t(z.string()).optional(),
  ctaHref: z.string().optional(),
  image: asset(z.string()).optional(),
  imageAlt: t(z.string()).optional(),
  videoSrc: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const chartFilterGridSchema = z.object({
  type: z.literal('chart-filter-grid'),
  headline: tHtml(z.string()),
  subhead: tHtml(z.string()).optional(),
  filters: z.array(z.object({
    label: t(z.string()),
    value: z.string(),
    active: z.boolean().optional(),
  })),
  charts: z.array(z.object({
    name: t(z.string()),
    image: asset(z.string()),
    imageAlt: t(z.string()),
    categories: z.array(z.string()),
  })),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const connectorGridSchema = z.object({
  type: z.literal('connector-grid'),
  headline: t(z.string()),
  subhead: t(z.string()).optional(),
  anchor: z.string().optional(),
  connectors: z.array(z.object({
    name: t(z.string()),
    description: t(z.string()),
    icon: asset(z.string()),
    category: z.string().optional(),
  })),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const lightHeroSchema = z.object({
  type: z.literal('light-hero'),
  title: tHtml(z.string()),
  body: tHtml(z.string()).optional(),
  image: asset(z.string()).optional(),
  imageAlt: t(z.string()).optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const officeGridSchema = z.object({
  type: z.literal('office-grid'),
  headline: tHtml(z.string()),
  intro: tHtml(z.string()).optional(),
  anchor: z.string().optional(),
  headlineAnchor: z.string().optional(),
  offices: z.array(z.object({
    name: tHtml(z.string()),
    contactHtml: tHtml(z.string()),
  })),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const trialHeroSchema = z.object({
  type: z.literal('trial-hero'),
  headline: tHtml(z.string()),
  body: tHtml(z.string()).optional(),
  bullets: z.array(t(z.string())).optional(),
  boldBullets: z.boolean().optional(),
  ctaLabel: t(z.string()).optional(),
  ctaHref: z.string().optional(),
  image: asset(z.string()).optional(),
  imageAlt: t(z.string()).optional(),
  imageSrcset: z.array(srcsetEntry).optional(),
  formAnchor: z.string().optional(),
  formId: z.string().optional(),
  cardTitle: t(z.string()).optional(),
  cardHeaderClass: z.string().optional(),
  cardSubtext: t(z.string()).optional(),
  showTitle: z.boolean().optional(),
  submitLabel: t(z.string()).optional(),
  thankYouHtml: tHtml(z.string()).optional(),
  leadSourceNumber: z.string().optional(),
  eventType: z.string().optional(),
  eventDetail: z.string().optional(),
  googleEventLabel: z.string().optional(),
  redirectUrl: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const galleryHeroSchema = z.object({
  type: z.literal('gallery-hero'),
  headline: tHtml(z.string()),
  body: tHtml(z.string()).optional(),
  ctaLabel: t(z.string()).optional(),
  ctaHref: z.string().optional(),
  image: asset(z.string()).optional(),
  imageAlt: t(z.string()).optional(),
  imageSrcset: z.array(srcsetEntry).optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const textColumnsSchema = z.object({
  type: z.literal('text-columns'),
  headline: tHtml(z.string()),
  anchor: z.string().optional(),
  columns: z.array(z.object({
    title: tHtml(z.string()),
    body: tHtml(z.string()),
  })),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const quoteBandSchema = z.object({
  type: z.literal('quote-band'),
  logo: asset(z.string()).optional(),
  logoAlt: t(z.string()).optional(),
  quote: tHtml(z.string()),
  attribution: tHtml(z.string()).optional(),
  href: z.string().optional(),
  backgroundImage: asset(z.string()).optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const benefitCardsSchema = z.object({
  type: z.literal('benefit-cards'),
  headline: tHtml(z.string()),
  anchor: z.string().optional(),
  cards: z.array(z.object({
    icon: asset(z.string()).optional(),
    iconAlt: t(z.string()).optional(),
    title: tHtml(z.string()),
    body: tHtml(z.string()),
  })),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const logoRowSchema = z.object({
  type: z.literal('logo-row'),
  logos: z.array(
    z.object({
      src: asset(z.string()),
      alt: t(z.string()),
    }).passthrough()
  ),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const g2HeroSchema = z.object({
  type: z.literal('g2-hero'),
  headline: tHtml(z.string()),
  body: tHtml(z.string()).optional(),
  ctaLabel: t(z.string()).optional(),
  ctaHref: z.string().optional(),
  secondaryCtaLabel: t(z.string()).optional(),
  secondaryCtaHref: z.string().optional(),
  image: asset(z.string()).optional(),
  imageLazySrc: asset(z.string()).optional(),
  imageSrcset: z.string().optional(),
  imageAlt: t(z.string()).optional(),
  imageTitle: t(z.string()).optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const g2ReviewBandSchema = z.object({
  type: z.literal('g2-review-band'),
  headline: tHtml(z.string()),
  anchor: z.string().optional(),
  badgesLeft: z.array(z.object({
    src: asset(z.string()),
    alt: t(z.string()),
    title: t(z.string()).optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  })).optional(),
  centerBadge: z.object({
    src: asset(z.string()),
    alt: t(z.string()),
    title: t(z.string()).optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  }).optional(),
  badgesRight: z.array(z.object({
    src: asset(z.string()),
    alt: t(z.string()),
    title: t(z.string()).optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  })).optional(),
  reviews: z.array(z.object({
    text: tHtml(z.string()),
    rating: asset(z.string()),
    ratingAlt: t(z.string()).optional(),
    reviewer: tHtml(z.string()),
  })).optional(),
  calloutIcon: asset(z.string()).optional(),
  calloutText: tHtml(z.string()).optional(),
  calloutCtaLabel: t(z.string()).optional(),
  calloutCtaHref: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const g2TechStackRowSchema = z.object({
  type: z.literal('g2-tech-stack-row'),
  headline: tHtml(z.string()),
  body: tHtml(z.string()).optional(),
  anchor: z.string().optional(),
  topLogos: z.array(z.object({
    src: asset(z.string()),
    alt: t(z.string()),
    title: t(z.string()).optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  })).optional(),
  bottomLogos: z.array(z.object({
    src: asset(z.string()),
    alt: t(z.string()),
    title: t(z.string()).optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  })).optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const g2CtaFooterSchema = z.object({
  type: z.literal('g2-cta-footer'),
  headline: tHtml(z.string()),
  anchor: z.string().optional(),
  ctaLabel: t(z.string()).optional(),
  ctaHref: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const faqIndexSchema = z.object({
  type: z.literal('faq-index'),
  headline: tHtml(z.string()),
  headlineAnchor: z.string().optional(),
  indexColumns: z.array(z.object({
    title: tHtml(z.string()),
    links: z.array(z.object({
      label: t(z.string()),
      href: z.string(),
    })),
  })).optional(),
  items: z.array(z.object({
    anchor: z.string(),
    question: tHtml(z.string()),
    answer: tHtml(z.string()),
  })),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const downloadConfirmationSchema = z.object({
  type: z.literal('download-confirmation'),
  downloadUrl: z.string(),
  goalLabel: z.string().optional(),
  headline: tHtml(z.string()),
  lead: tHtml(z.string()),
  paragraphs: z.array(tHtml(z.string())),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const trustBadgeBandSchema = z.object({
  type: z.literal('trust-badge-band'),
  headline: tHtml(z.string()),
  subhead: tHtml(z.string()).optional(),
  anchor: z.string().optional(),
  badges: z.array(z.object({
    src: asset(z.string()),
    alt: t(z.string()),
    title: t(z.string()).optional(),
    width: z.number().optional(),
    height: z.number().optional(),
  })),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const demoVideoSplitSchema = z.object({
  type: z.literal('demo-video-split'),
  headline: tHtml(z.string()),
  videoPoster: asset(z.string()),
  videoMp4: asset(z.string()),
  cardTitle: tHtml(z.string()),
  cardBody: tHtml(z.string()),
  ctaLabel: t(z.string()),
  ctaHref: z.string().optional(),
  anchor: z.string().optional(),
  zone: z.number().int().nullable().optional(),
}).passthrough();

const resourceCardGridSchema = z.object({
  type: z.literal('resource-card-grid'),
  headline: tHtml(z.string()),
  body: tHtml(z.string()).optional(),
  cards: z.array(z.object({
    href: z.string(),
    icon: asset(z.string()),
    iconAlt: t(z.string()),
    title: tHtml(z.string()),
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
  customerQuoteSchema,
  faqSchema,
  inlineCtaSchema,
  ctaBlockSchema,
  quoteSliderSchema,
  ctaImageCardSchema,
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
  subnavSchema,
  platformProcessCardSchema,
  darkCapabilitiesGridSchema,
  verticalCardsSchema,
  featureStickyScrollSchema,
  metricBenefitGridSchema,
  dualChecklistSchema,
  lightFeatureTabsSchema,
  aiVideoBlockSchema,
  aiUnderHoodSchema,
  aiEnterpriseGridSchema,
  aiStepFlowSchema,
  securityRiskTableSchema,
  securityArchCardsSchema,
  securityGradientBannerSchema,
  gradientHeroSchema,
  chartFilterGridSchema,
  connectorGridSchema,
  lightHeroSchema,
  officeGridSchema,
  trialHeroSchema,
  galleryHeroSchema,
  textColumnsSchema,
  quoteBandSchema,
  benefitCardsSchema,
  logoRowSchema,
  g2HeroSchema,
  g2ReviewBandSchema,
  g2TechStackRowSchema,
  g2CtaFooterSchema,
  faqIndexSchema,
  trustBadgeBandSchema,
  downloadConfirmationSchema,
  demoVideoSplitSchema,
  resourceCardGridSchema,
]);

export const sectionSchema = sectionSchemaInternal;

// Optional block-based body for posts (the Sveltia `list` + `types` "＋ Add block"
// builder). Additive and fully optional: when `content` is present the layout
// renders these typed blocks; when absent it falls back to the freeform markdown
// body, so all existing posts are untouched. Mirrors the page section-dispatcher
// pattern, scoped to the few block types blog authors need.
const blogContentSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('text'), body: tHtml(z.string()) }),
  z.object({
    type: z.literal('comparison-table'),
    headers: t(z.string()),
    rows: z.array(t(z.string())).optional(),
  }),
  z.object({ type: z.literal('callout'), body: tHtml(z.string()) }),
  z.object({ type: z.literal('bonus-tip'), body: tHtml(z.string()) }),
  z.object({
    type: z.literal('cta-banner'),
    headline: t(z.string()).optional(),
    msg: tHtml(z.string()).optional(),
    buttonText: t(z.string()).optional(),
    buttonLink: z.string().optional(),
  }),
]);

// Shared schema for long-form posts. Blog and whitepapers use the same shape
// so editors get the same fields and the same in-body components (Callout,
// CTA Banner, Gate, Bonus Tip) across both collections. The route + layout
// branch (BlogLayout's isWhitepaper prop) is what makes a whitepaper look
// like a whitepaper, not a schema difference.
const postSchema = z.object({
  title: t(z.string()),
  description: t(z.string()).optional(),
  // Accept either a quoted string ("2026-06-22") or an unquoted YAML date — the
  // parser turns the latter into a Date object, and Sveltia writes dates unquoted.
  // Normalize a Date back to a YYYY-MM-DD string so all downstream code (blog.ts,
  // BlogLayout, sitemaps) keeps receiving a string in the expected format.
  date: z
    .preprocess((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v), z.string())
    .optional(),
  cover: asset(z.string()).optional(),
  heroImage: asset(z.string()).optional(),
  author: z.string().optional(),
  authorBio: tHtml(z.string()).optional(),
  category: t(z.string()).optional(),
  categories: z.array(t(z.string())).optional(),
  tags: z.array(t(z.string())).optional(),
  summary: tHtml(z.string()).optional(),
  takeaways: z.array(t(z.string())).optional(),
  // Hide the description from the visible hero subtitle (still used for SEO meta).
  // Use when the description is a CTA rather than a real article summary.
  hideHeroSubtitle: z.boolean().optional(),
  // Opt-in "Request a Demo" CTA banner rendered at the end of the post body.
  // Sveltia can't surface editor-component buttons yet, so this toggle is how
  // editors add the bottom CTA. The two *Text fields optionally override the
  // default headline/message.
  ctaDemo: z.boolean().optional(),
  ctaDemoHeadline: t(z.string()).optional(),
  ctaDemoBody: t(z.string()).optional(),
  // Optional block-based body (see blogContentSchema). When present, the layout
  // renders these blocks instead of the freeform markdown body.
  content: z.array(blogContentSchema).optional(),
});

const blogSchema = postSchema;

// Per-page SEO overrides. All optional; BaseLayout falls back to top-level
// title/description/cover when these are unset. See docs/seo/pass-2-*.md.
const seoFieldsSchema = z.object({
  title: t(z.string()).optional(),
  description: t(z.string()).optional(),
  ogType: z.enum(['website', 'article']).optional(),
  ogImage: asset(z.string()).optional(),
  ogImageAlt: t(z.string()).optional(),
  noindex: z.boolean().optional(),
  canonical: z.string().url().optional(),
});

const pageSchema = z.object({
  title: t(z.string()),
  description: t(z.string()).optional(),
  cover: asset(z.string()).optional(),
  minimalFooter: z.boolean().optional(),
  minimalNav: z.boolean().optional(),
  // Exclude this page from the on-site Pagefind search index (the page stays
  // live; it just won't appear in /search results).
  noSearch: z.boolean().optional(),
  seo: seoFieldsSchema.optional(),
  sections: z.array(sectionSchemaInternal).optional(),
  toc: z.array(z.object({ label: z.string(), anchor: z.string() })).optional(),
  articleVariant: z.enum(['default', 'guide']).optional(),
  articleTocTitle: z.string().optional(),
  breadcrumbLabel: z.string().optional(),
});

const whitepaperSchema = postSchema.extend({
  leadSourceNumber: z.string().optional(),
});

const webinarSchema = z.object({
  title: t(z.string()),
  description: t(z.string()).optional(),
  subhead: t(z.string()).optional(),
  date: z.string().optional(),
  datetime: z.string().optional(),
  time: z.string().optional(),
  duration: z.string().optional(),
  youtube_id: z.string().optional(),
  categories: z.array(z.string()).optional(),
  cover: asset(z.string()).optional(),
  presenter: t(z.string()).optional(),
});

const eventSchema = z.object({
  title: t(z.string()),
  description: t(z.string()).optional(),
  date: z.string(),
  location: t(z.string()),
  time: t(z.string()).optional(),
  seats: t(z.string()).optional(),
  tagline: t(z.string()).optional(),
  heroNote: t(z.string()).optional(),
  summary: t(z.string()).optional(),
  ctaLabel: t(z.string()).optional(),
  ctaHref: z.string().optional(),
  cover: asset(z.string()).optional(),
});

const storySchema = z.object({
  title: t(z.string()),
  description: t(z.string()).optional(),
  cover: asset(z.string()).optional(),
  logo: asset(z.string()).optional(),
  industry: t(z.string()).optional(),
  marketsServed: t(z.string()).optional(),
  topChallenges: z.array(t(z.string())).optional(),
  whyReveal: z.array(t(z.string())).optional(),
});

const glossarySchema = z.object({
  title: t(z.string()),
  heading: t(z.string()).optional(),
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
    loader: glob({ pattern: '**/*.md', base: './src/content/whitepapers' }),
    schema: whitepaperSchema,
  }),
  webinars: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/webinars' }),
    schema: webinarSchema,
  }),
  events: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
    schema: eventSchema,
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
