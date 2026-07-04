export type IntegrationGroup = 'Platforms' | 'Analytics' | 'Automation & alerts'

export interface Integration {
  slug: string
  name: string
  group: IntegrationGroup
  logo: string
  description: string
  connected: boolean
}

export const INTEGRATION_GROUPS: IntegrationGroup[] = [
  'Platforms',
  'Analytics',
  'Automation & alerts',
]

export const INTEGRATIONS: Integration[] = [
  // ── Platforms ──────────────────────────────────────────────
  {
    slug: 'shopify',
    name: 'Shopify',
    group: 'Platforms',
    logo: '/logos/shopify.svg',
    description: 'Connect your store to auto-fix SEO/GEO issues and inject schema.',
    connected: true,
  },
  {
    slug: 'wordpress',
    name: 'WordPress',
    group: 'Platforms',
    logo: '/logos/wordpress.svg',
    description: 'Install the Signalor plugin to apply fixes and serve llms.txt.',
    connected: false,
  },
  {
    slug: 'webflow',
    name: 'Webflow',
    group: 'Platforms',
    logo: '/logos/webflow.svg',
    description: 'Run GEO analysis on your Webflow site — no plugin required.',
    connected: false,
  },
  {
    slug: 'framer',
    name: 'Framer',
    group: 'Platforms',
    logo: '/logos/framer.svg',
    description: 'Connect your Framer site via the Signalor plugin.',
    connected: false,
  },
  {
    slug: 'nextjs',
    name: 'Next.js',
    group: 'Platforms',
    logo: '/logos/nextjs.svg',
    description: 'Drop in the Signalor SDK to instrument your app.',
    connected: false,
  },
  // ── Analytics ──────────────────────────────────────────────
  {
    slug: 'google-analytics',
    name: 'Google Analytics',
    group: 'Analytics',
    logo: '/logos/google-analytics.svg',
    description: 'Track AI-referral traffic from ChatGPT, Perplexity and more.',
    connected: true,
  },
  {
    slug: 'search-console',
    name: 'Search Console',
    group: 'Analytics',
    logo: '/logos/search-console.svg',
    description: 'Monitor indexing, impressions and search performance.',
    connected: false,
  },
  // ── Automation & alerts ────────────────────────────────────
  {
    slug: 'slack',
    name: 'Slack',
    group: 'Automation & alerts',
    logo: '/logos/slack.svg',
    description: 'Get visibility drops and task updates in your channels.',
    connected: false,
  },
  {
    slug: 'zapier',
    name: 'Zapier',
    group: 'Automation & alerts',
    logo: '/logos/zapier.svg',
    description: 'Pipe Signalor events into 6,000+ apps and workflows.',
    connected: false,
  },
]
