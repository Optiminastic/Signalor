'use client'

import { MarketingShell } from '@/features/landing/components/MarketingShell'

import { ToolPage } from '@/features/site/components/tools/tool-page'
import { URL_ANALYZER_FAQ } from '@/features/site/lib/tool-faqs'
import { UrlAnalyzerToolInline } from '@/features/site/components/tools/url-analyzer-inline'

export default function UrlAnalyzerToolPage() {
  return (
    <MarketingShell>
      <p className="sr-only">
        The SignalorAI URL Analyzer is a free Generative Engine Optimization (GEO) and Answer Engine
        Optimization (AEO) audit tool that scores any public URL for AI citation readiness. It
        checks schema.org JSON-LD coverage across Organization, Product, Article, FAQPage, and HowTo
        types, validates llms.txt presence and structure, parses robots.txt for GPTBot, ClaudeBot,
        PerplexityBot, and Google-Extended directives, and evaluates on-page trust signals including
        canonical tags, Open Graph metadata, and authorship markers. The free GEO score report
        surfaces the three highest-impact fixes ranked by expected citation lift across ChatGPT,
        Claude, Gemini, Perplexity, and Google AI Overviews. No sign-up is required for the summary
        audit. Signing up unlocks the full fix queue, live per-engine AI probes, competitor
        benchmarking, and scheduled weekly or monthly re-analysis to catch score drift.
      </p>
      <ToolPage
        faq={URL_ANALYZER_FAQ}
        theme="orange"
        eyebrow="[ free tool · url analyzer ]"
        title="Score any URL for"
        titleAccent="AI visibility"
        description="Paste a domain and see how AI engines summarize, cite, or skip it. Free, no sign-up required for the summary."
        secondaryDescription="The analyzer checks schema coverage, on-page trust signals, llms.txt, AI-bot crawler permissions, and citation patterns across ChatGPT, Claude, Gemini, and Perplexity. You get a 0-100 GEO score plus the three highest-impact fixes, no account needed."
        form={<UrlAnalyzerToolInline />}
        features={[
          {
            title: 'Full GEO score',
            description:
              'Structure, schema, citability and trust signals rolled into one 0-100 read.',
          },
          {
            title: 'Per-engine view',
            description: 'See how each AI surface sees the page,cited, paraphrased, or absent.',
          },
          {
            title: 'Fix list',
            description: 'Prioritized recommendations ranked by impact on the score.',
          },
          {
            title: 'Free forever',
            description: 'Run unlimited audits on public URLs without an account.',
          },
        ]}
      />
    </MarketingShell>
  )
}
