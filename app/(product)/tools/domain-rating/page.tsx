'use client'

import { MarketingShell } from '@/features/landing/components/MarketingShell'

import { DomainRatingInline } from '@/features/site/components/tools/domain-rating-inline'
import { ToolPage } from '@/features/site/components/tools/tool-page'
import { DOMAIN_RATING_FAQ } from '@/features/site/lib/tool-faqs'

export default function DomainRatingToolPage() {
  return (
    <MarketingShell>
      <p className="sr-only">
        The SignalorAI Domain Rating checker is a free tool that scores any website&rsquo;s
        authority on a 0&ndash;100 Domain Rating (DR) scale. Enter a domain and the checker returns
        its DR, sourced from Ahrefs&rsquo; authority index. Domain Rating reflects the strength of
        the sites linking to a domain, an important off-page signal that AI engines and search
        engines weigh when deciding which sources to trust and cite. Results are instant with no
        account required.
      </p>
      <ToolPage
        faq={DOMAIN_RATING_FAQ}
        theme="blue"
        eyebrow="[ free tool · domain rating ]"
        title="Check the authority of"
        titleAccent="any domain"
        description="Enter a domain and we'll return its Domain Rating (0-100), free, no sign-up."
        secondaryDescription="The checker returns a 0-100 Domain Rating sourced from Ahrefs' authority index. Domain Rating reflects how authoritative the sites linking to a domain are, an off-page signal search and AI engines weigh when choosing sources to cite."
        form={<DomainRatingInline />}
        features={[
          {
            title: 'Domain Rating (DR)',
            description:
              "A 0-100 score of a domain's authority, the strength of the sites linking to it.",
          },
          {
            title: 'Powered by Ahrefs',
            description:
              "DR is sourced live from Ahrefs' authority index, the industry-standard backlink dataset.",
          },
          {
            title: 'Instant results',
            description: 'Enter a domain and get its DR in seconds, no account or setup.',
          },
          { title: 'Free forever', description: 'Run unlimited domain checks without an account.' },
        ]}
      />
    </MarketingShell>
  )
}
