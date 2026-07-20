import type { Metadata } from 'next'

import { JsonLd } from '@/features/site/components/seo/json-ld'
import {
  AGGREGATE_RATING,
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  SITE_URL,
} from '@/features/site/lib/seo'
import { COMPETITORS_FAQ } from '@/features/site/lib/tool-faqs'

export const metadata: Metadata = buildMetadata({
  title: 'Free AI Competitor Analysis | Who Wins in Your Category',
  description:
    "See which brands AI engines recommend alongside yours. Paste your domain and SignalorAI ranks competitors by co-mention frequency in live 'vs', 'alternatives', and comparison queries, free, no sign-up.",
  path: '/tools/competitors-analysis',
  keywords: [
    'AI competitor analysis',
    'GEO competitor tracking',
    'AI search competitor tool',
    'brand co-mention analysis',
    'vs query analysis',
    'alternatives query tracker',
    'competitor citation analysis',
    'AI search share of voice',
    'ChatGPT competitor rankings',
    'AI category leader tracker',
    'competitor GEO audit',
    'brand comparison AI',
    'search autocomplete competitors',
    'LLM competitor mentions',
    'free competitor analysis tool',
  ],
})

const competitorsToolJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SignalorAI Competitor Analysis',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: AGGREGATE_RATING,
  url: `${SITE_URL}/tools/competitors-analysis`,
  description:
    "Free AI competitor analysis. Ranks brands by co-mention frequency in live 'vs' and 'alternatives' autocomplete queries. Upgrade for per-engine AI citation benchmarks across ChatGPT, Claude, Gemini, and Perplexity.",
  featureList: [
    "Live competitor discovery from 'vs' and 'alternatives' search queries",
    'Co-mention frequency ranking',
    'Per-engine AI citation benchmarking (Pro)',
    'Prompt-level gap analysis showing where rivals are cited and you are not',
  ],
}

export default function CompetitorsAnalysisLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        id="ld-competitors-breadcrumb"
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Free Tools', path: '/tools/competitors-analysis' },
          { name: 'Competitor Analysis', path: '/tools/competitors-analysis' },
        ])}
      />
      <JsonLd id="ld-competitors-tool" data={competitorsToolJsonLd} />
      <JsonLd id="ld-competitors-faq" data={faqJsonLd(COMPETITORS_FAQ)} />
      {children}
    </>
  )
}
