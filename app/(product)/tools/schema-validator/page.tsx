'use client'

import { MarketingShell } from '@/features/landing/components/MarketingShell'

import { SchemaValidatorInline } from '@/features/site/components/tools/schema-validator-inline'
import { ToolPage } from '@/features/site/components/tools/tool-page'
import { SCHEMA_VALIDATOR_FAQ } from '@/features/site/lib/tool-faqs'

export default function SchemaValidatorToolPage() {
  return (
    <MarketingShell>
      <p className="sr-only">
        The SignalorAI Schema Validator is a free JSON-LD and Schema.org coverage checker that scans
        any public URL for structured data completeness. It detects 18 schema types including
        Organization, Product, Article, FAQPage, HowTo, BreadcrumbList, Event, Review,
        AggregateRating, LocalBusiness, SoftwareApplication, and more. The validator flags missing
        required fields by property name, identifies partial definitions that confuse language model
        parsers, and catches conflicting duplicate JSON-LD blocks that cause AI engines to discard
        structured data entirely. Complete, valid schema is one of the strongest signals generative
        engines use when deciding whether to cite, paraphrase, or attribute a page. The free scan
        covers one URL with no account required. Pro plans add site-wide coverage rollups per
        template and ready-to-paste JSON-LD fix snippets ranked by projected GEO score improvement.
      </p>
      <ToolPage
        faq={SCHEMA_VALIDATOR_FAQ}
        theme="violet"
        eyebrow="[ free tool · schema validator ]"
        title="Check JSON-LD coverage in"
        titleAccent="seconds"
        description="Paste any URL and we'll scan the page for Organization, Product, Article, FAQ, and other JSON-LD schemas, flagging missing, partial, or malformed entries."
        secondaryDescription="The validator checks 18 schema types including Organization, Product, Article, FAQPage, HowTo, BreadcrumbList, Event, and more. It surfaces missing required fields, partial definitions, and conflicting duplicate blocks that confuse AI engines and cost you citation opportunities. Free, no account needed."
        form={<SchemaValidatorInline />}
        features={[
          {
            title: '18 schema types',
            description:
              'Organization, Product, Article, FAQ, HowTo, BreadcrumbList, and more checked automatically.',
          },
          {
            title: 'Field-level flags',
            description:
              'Missing required fields highlighted with the property name so engineers fix fast.',
          },
          {
            title: 'Duplicate detection',
            description: 'Catch duplicate or conflicting JSON-LD blocks that confuse AI engines.',
          },
          {
            title: 'Exportable',
            description:
              'Download a JSON summary of all findings for your engineering or SEO team.',
          },
        ]}
      />
    </MarketingShell>
  )
}
