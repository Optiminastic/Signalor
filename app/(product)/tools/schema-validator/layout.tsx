import type { Metadata } from 'next'

import { JsonLd } from '@/features/site/components/seo/json-ld'
import {
  AGGREGATE_RATING,
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  SITE_URL,
} from '@/features/site/lib/seo'
import { SCHEMA_VALIDATOR_FAQ } from '@/features/site/lib/tool-faqs'

export const metadata: Metadata = buildMetadata({
  title: 'Free Schema.org Validator | JSON-LD Coverage & AI Citation Check',
  description:
    'Scan any URL for Organization, Product, Article, FAQ, HowTo, BreadcrumbList, and 15 other JSON-LD types. SignalorAI flags missing required fields, partial definitions, and duplicate blocks that reduce AI citation chances. Free, no account needed.',
  path: '/tools/schema-validator',
  keywords: [
    'Schema.org validator',
    'JSON-LD validator',
    'free schema checker',
    'Organization schema validator',
    'Product schema checker',
    'Article JSON-LD validator',
    'FAQ schema checker',
    'HowTo schema validator',
    'BreadcrumbList schema',
    'structured data AI',
    'schema for AI citations',
    'JSON-LD missing fields',
    'schema coverage audit',
    'AI structured data checker',
    'free JSON-LD tool',
  ],
})

const schemaValidatorJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SignalorAI Schema Validator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: AGGREGATE_RATING,
  url: `${SITE_URL}/tools/schema-validator`,
  description:
    'Free Schema.org JSON-LD validator. Checks Organization, Product, Article, FAQ, HowTo, BreadcrumbList, and 12 more types for completeness, required fields, and duplicate blocks that reduce AI citation rates.',
  featureList: [
    '18 Schema.org type coverage',
    'Required field detection with property-level flags',
    'Duplicate and conflicting JSON-LD block detection',
    'GEO score impact ranking per finding',
    'Site-wide coverage rollup (Pro)',
    'Ready-to-paste fix snippets (Pro)',
  ],
}

export default function SchemaValidatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        id="ld-schema-validator-breadcrumb"
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Free Tools', path: '/tools/schema-validator' },
          { name: 'Schema Validator', path: '/tools/schema-validator' },
        ])}
      />
      <JsonLd id="ld-schema-validator-tool" data={schemaValidatorJsonLd} />
      <JsonLd id="ld-schema-validator-faq" data={faqJsonLd(SCHEMA_VALIDATOR_FAQ)} />
      {children}
    </>
  )
}
