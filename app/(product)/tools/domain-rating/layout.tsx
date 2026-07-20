import type { Metadata } from 'next'

import { JsonLd } from '@/features/site/components/seo/json-ld'
import {
  AGGREGATE_RATING,
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  SITE_URL,
} from '@/features/site/lib/seo'
import { DOMAIN_RATING_FAQ } from '@/features/site/lib/tool-faqs'

export const metadata: Metadata = buildMetadata({
  title: 'Free Domain Rating (DR) Checker & Authority Score',
  description:
    "Check any domain's Domain Rating (DR) on a 0-100 scale plus its global rank in seconds. Free domain authority checker sourced from open backlink data, no sign-up.",
  path: '/tools/domain-rating',
  keywords: [
    'domain rating checker',
    'DR checker',
    'free domain rating tool',
    'domain authority checker',
    'website authority checker',
    'domain rank checker',
    'DR score',
    'free DA checker',
    'open pagerank',
    'domain authority score',
    'check domain rating',
    'authority score checker',
    'free SEO authority tool',
    'global domain rank',
    'domain trust score',
  ],
})

const domainRatingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SignalorAI Domain Rating Checker',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: AGGREGATE_RATING,
  url: `${SITE_URL}/tools/domain-rating`,
  description:
    'Free Domain Rating (DR) checker. Returns a 0-100 Domain Rating and global rank for any domain, sourced from open backlink data (Common Crawl).',
  featureList: [
    '0-100 Domain Rating (DR) score',
    'Worldwide global rank',
    'Sourced from open backlink data',
    'No account required',
    'Unlimited free checks',
  ],
}

export default function DomainRatingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        id="ld-domain-rating-breadcrumb"
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Free Tools', path: '/tools/domain-rating' },
          { name: 'Domain Rating Checker', path: '/tools/domain-rating' },
        ])}
      />
      <JsonLd id="ld-domain-rating-tool" data={domainRatingJsonLd} />
      <JsonLd id="ld-domain-rating-faq" data={faqJsonLd(DOMAIN_RATING_FAQ)} />
      {children}
    </>
  )
}
