import {
  BarChart3,
  Blocks,
  Building2,
  Eye,
  LayoutGrid,
  Lightbulb,
  Link2,
  ListChecks,
  Network,
  Search,
  User,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { COMPETITORS } from '@/features/catalyst/competitors-data'

export interface SearchItem {
  type: string
  label: string
  sublabel?: string
  href: string
  icon: LucideIcon
}

const PAGE_ITEMS: SearchItem[] = [
  {
    type: 'Page',
    label: 'Overview',
    sublabel: 'Dashboard home',
    href: '/dashboard',
    icon: LayoutGrid,
  },
  {
    type: 'Page',
    label: 'Visibility',
    sublabel: 'Answer-engine visibility',
    href: '/dashboard/visibility',
    icon: Eye,
  },
  {
    type: 'Page',
    label: 'Brands',
    sublabel: 'Your tracked brands',
    href: '/dashboard/brands',
    icon: Building2,
  },
  {
    type: 'Page',
    label: 'Competitors',
    sublabel: 'Competitive landscape',
    href: '/dashboard/competitors',
    icon: Users,
  },
  {
    type: 'Page',
    label: 'Prompt Tracker',
    sublabel: 'Tracked prompts',
    href: '/dashboard/prompt-tracker',
    icon: Search,
  },
  {
    type: 'Page',
    label: 'Sitemap',
    sublabel: 'Crawl & audit URLs',
    href: '/dashboard/sitemap',
    icon: Network,
  },
  {
    type: 'Page',
    label: 'Backlinks',
    sublabel: 'Link profile',
    href: '/dashboard/backlinks',
    icon: Link2,
  },
  {
    type: 'Page',
    label: 'Analytics',
    sublabel: 'Traffic & trends',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    type: 'Page',
    label: 'Recommendations',
    sublabel: 'Suggested actions',
    href: '/dashboard/recommendations',
    icon: Lightbulb,
  },
  {
    type: 'Page',
    label: 'Tasks',
    sublabel: 'Your work queue',
    href: '/dashboard/tasks',
    icon: ListChecks,
  },
  {
    type: 'Page',
    label: 'Integrations',
    sublabel: 'Connect data sources',
    href: '/dashboard/integrations',
    icon: Blocks,
  },
  {
    type: 'Account',
    label: 'Profile & billing',
    sublabel: 'Manage your account',
    href: '/profile',
    icon: User,
  },
]

const BRANDS: SearchItem[] = COMPETITORS.map(c => ({
  type: 'Competitor',
  label: c.name,
  sublabel: c.domain,
  href: '/dashboard/competitors',
  icon: Users,
}))

export const SEARCH_INDEX: SearchItem[] = [...PAGE_ITEMS, ...BRANDS]

/** Case-insensitive substring match over label + sublabel; top 8. */
export function searchIndex(query: string): SearchItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return SEARCH_INDEX.filter(
    item =>
      item.label.toLowerCase().includes(q) || (item.sublabel?.toLowerCase().includes(q) ?? false),
  ).slice(0, 8)
}
