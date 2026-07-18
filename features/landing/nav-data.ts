import {
  IconApps,
  IconBook2,
  IconBriefcase,
  IconBuildingStore,
  IconEye,
  IconFileText,
  IconGauge,
  IconLifebuoy,
  IconMessageChatbot,
  IconMessages,
  IconMovie,
  IconNews,
  IconSitemap,
  IconSpeakerphone,
  IconSwords,
  IconUsers,
} from '@tabler/icons-react'
import type { TablerIcon } from '@tabler/icons-react'

export interface MenuLink {
  label: string
  desc: string
  href: string
  icon: TablerIcon
  badge?: string
}

export interface MenuSection {
  title: string
  cols: 1 | 2
  links: MenuLink[]
}

export interface QuickLink {
  label: string
  href: string
  icon: TablerIcon
}

export const PRODUCT_FEATURES: MenuSection = {
  title: 'Features',
  cols: 1,
  links: [
    {
      label: 'AI Visibility',
      desc: 'Track how you show up in AI',
      href: '/ai-visibility',
      icon: IconEye,
    },
    {
      label: 'Prompt Tracker',
      desc: 'Watch how engines answer',
      href: '/prompt-tracking',
      icon: IconMessageChatbot,
      badge: 'New',
    },
    {
      label: 'Competitors',
      desc: 'Benchmark your share of voice',
      href: '/solutions/competitive-lens',
      icon: IconSwords,
    },
  ],
}

export const PRODUCT_MORE: MenuSection = {
  title: 'More features',
  cols: 1,
  links: [
    {
      label: 'Sitemap Audit',
      desc: 'Score every page for AI',
      href: '/site-map',
      icon: IconSitemap,
    },
    {
      label: 'GEO Report',
      desc: 'Instant brand audit, free',
      href: '/explorer',
      icon: IconGauge,
      badge: 'Free',
    },
    {
      label: 'Integrations',
      desc: 'Connect your stack',
      href: '/integration',
      icon: IconApps,
    },
  ],
}

export const RESOURCE_MAIN: MenuSection = {
  title: 'Resources',
  cols: 2,
  links: [
    { label: 'Blog', desc: 'The latest GEO research', href: '/blog', icon: IconNews },
    { label: 'Guides', desc: 'Playbooks & strategy', href: '/guides', icon: IconBook2 },
    { label: 'Videos', desc: 'Product walkthroughs', href: '/videos', icon: IconMovie },
    { label: 'Docs', desc: 'How the platform works', href: '/docs', icon: IconFileText },
  ],
}

export const RESOURCE_PRODUCT: MenuSection = {
  title: 'Product',
  cols: 1,
  links: [
    { label: 'Integrations', desc: 'Connect your stack', href: '/integration', icon: IconApps },
    {
      label: 'GEO Report',
      desc: 'Instant brand audit',
      href: '/explorer',
      icon: IconGauge,
      badge: 'Free',
    },
  ],
}

export const RESOURCE_SUPPORT: { title: string; links: QuickLink[] } = {
  title: 'Support',
  links: [
    { label: 'Community', href: '/community', icon: IconUsers },
    { label: 'Help Center', href: '/help', icon: IconLifebuoy },
    { label: 'Changelog', href: '/changelog', icon: IconSpeakerphone },
  ],
}

export const PRICING_SECTION: MenuSection = {
  title: 'Pricing models',
  cols: 1,
  links: [
    {
      label: 'For Agencies',
      desc: 'Track AI search for clients',
      href: '/for-agencies',
      icon: IconBriefcase,
    },
    {
      label: 'For Brands',
      desc: 'Learn how AI talks about you',
      href: '/for-brands',
      icon: IconBuildingStore,
    },
    {
      label: 'Talk to Sales',
      desc: 'Find the right plan together',
      href: '/contact-sales',
      icon: IconMessages,
    },
  ],
}
