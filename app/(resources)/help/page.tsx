import type { Metadata } from 'next'

import { MarketingShell } from '@/features/landing/components/MarketingShell'

import { HelpContact } from '@/features/site/components/help/help-contact'
import { HomeFaq } from '@/features/site/components/landing/home-faq'
import { GridCornerHandles } from '@/features/site/components/landing/home-grid'
import { JsonLd } from '@/features/site/components/seo/json-ld'
import { HELP_FAQ } from '@/features/site/lib/help-content'
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from '@/features/site/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Help & Support',
  description:
    'Get support for SignalorAI, contact sales, reach the team, and find answers on getting started, billing, integrations, and onboarding.',
  path: '/help',
})

export default function HelpPage(): JSX.Element {
  return (
    <MarketingShell>
      <JsonLd
        id="ld-help-breadcrumb"
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Help', path: '/help' },
        ])}
      />
      <JsonLd id="ld-help-faq" data={faqJsonLd(HELP_FAQ)} />

      <div className="border-border relative mx-auto max-w-6xl border-x">
        <GridCornerHandles top bottom />
        <HelpContact />
        <HomeFaq items={HELP_FAQ} />
      </div>
    </MarketingShell>
  )
}
