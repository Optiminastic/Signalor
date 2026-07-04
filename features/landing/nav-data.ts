export interface MenuLink {
  label: string
  desc: string
  href: string
  badge?: string
}

export interface MenuColumn {
  title: string
  links: MenuLink[]
}

export const PRODUCT_COLS: MenuColumn[] = [
  {
    title: 'Product',
    links: [
      {
        label: 'AI Visibility',
        desc: 'Track how you show up in AI',
        href: '/dashboard/visibility',
      },
      {
        label: 'Prompt Tracker',
        desc: 'Watch how engines answer',
        href: '/dashboard/prompt-tracker',
        badge: 'New',
      },
      {
        label: 'Competitors',
        desc: 'Benchmark your share of voice',
        href: '/dashboard/competitors',
      },
      { label: 'Sitemap Audit', desc: 'Score every page for AI', href: '/dashboard/sitemap' },
    ],
  },
]

export const RESOURCE_COLS: MenuColumn[] = [
  {
    title: 'Resources',
    links: [
      { label: 'Blog', desc: 'The latest GEO research', href: '#' },
      { label: 'Guides', desc: 'Playbooks & strategy', href: '#' },
      { label: 'Videos', desc: 'Product walkthroughs', href: '#' },
    ],
  },
  {
    title: 'Product',
    links: [
      { label: 'Docs', desc: 'How the platform works', href: '#' },
      { label: 'Integrations', desc: 'Connect your stack', href: '/dashboard/integrations' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Community', desc: 'Join the Slack', href: '#' },
      { label: 'Help Center', desc: 'Find answers fast', href: '#' },
    ],
  },
  {
    title: 'Free tools',
    links: [{ label: 'GEO Report', desc: 'Instant brand audit', href: '#', badge: 'Free' }],
  },
]

export const PRICING_LINKS: MenuLink[] = [
  { label: 'For Agencies', desc: 'Track AI search for clients', href: '#' },
  { label: 'For Brands', desc: 'Learn how AI talks about you', href: '#' },
]
