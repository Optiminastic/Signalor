import type { Metadata } from 'next'

import { JsonLd } from '@/features/site/components/seo/json-ld'
import {
  AGGREGATE_RATING,
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  SITE_URL,
} from '@/features/site/lib/seo'
import { URL_ANALYZER_FAQ } from '@/features/site/lib/tool-faqs'

export const metadata: Metadata = buildMetadata({
  title: 'Free GEO Score & AI Visibility Checker | URL Analyzer',
  description:
    'Paste any URL and get a free GEO score, schema audit, and top AI citation fixes, checked across ChatGPT, Claude, Gemini, Perplexity, and Google AI. No account required.',
  path: '/tools/url-analyzer',
  keywords: [
    'free GEO score',
    'AI visibility checker',
    'URL GEO audit',
    'free AI citation checker',
    'GEO analyzer tool',
    'Generative Engine Optimization audit',
    'AEO checker',
    'schema audit tool',
    'LLM readiness checker',
    'ChatGPT citation checker',
    'AI search visibility tool',
    'free SEO AI tool',
    'brand visibility score',
    'content AI audit',
    'llms.txt validator free',
  ],
})

const urlAnalyzerJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SignalorAI URL Analyzer',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: AGGREGATE_RATING,
  url: `${SITE_URL}/tools/url-analyzer`,
  description:
    'Free GEO and AEO score for any public URL. Reports schema coverage, llms.txt status, AI crawler permissions, trust signals, and citation patterns across ChatGPT, Claude, Gemini, Perplexity, and Google AI.',
  featureList: [
    '0-100 GEO score across six pillars',
    'Schema.org JSON-LD coverage audit',
    'llms.txt and robots.txt AI crawler check',
    'Per-engine citation signal analysis',
    'Prioritized fix list ranked by score impact',
  ],
}

export default function UrlAnalyzerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        id="ld-url-analyzer-breadcrumb"
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Free Tools', path: '/tools/url-analyzer' },
          { name: 'URL Analyzer', path: '/tools/url-analyzer' },
        ])}
      />
      <JsonLd id="ld-url-analyzer-tool" data={urlAnalyzerJsonLd} />
      <JsonLd id="ld-url-analyzer-faq" data={faqJsonLd(URL_ANALYZER_FAQ)} />
      {children}
    </>
  )
}
