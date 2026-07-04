import type { DashStatData } from '@/features/catalyst/components/dash/DashStat'

export type Category = 'Directory' | 'Review' | 'Press' | 'Community' | 'Resource'
export type LinkStatus = 'suggested' | 'submitted' | 'live'

export interface BacklinkOpp {
  id: number
  name: string
  domain: string
  category: Category
  dr: number
  status: LinkStatus
}

export const BACKLINKS: BacklinkOpp[] = [
  { id: 1, name: 'G2', domain: 'g2.com', category: 'Review', dr: 92, status: 'live' },
  {
    id: 2,
    name: 'Product Hunt',
    domain: 'producthunt.com',
    category: 'Community',
    dr: 91,
    status: 'submitted',
  },
  {
    id: 3,
    name: 'Capterra',
    domain: 'capterra.com',
    category: 'Review',
    dr: 90,
    status: 'suggested',
  },
  {
    id: 4,
    name: 'TechCrunch',
    domain: 'techcrunch.com',
    category: 'Press',
    dr: 94,
    status: 'suggested',
  },
  {
    id: 5,
    name: 'Crunchbase',
    domain: 'crunchbase.com',
    category: 'Directory',
    dr: 91,
    status: 'live',
  },
  {
    id: 6,
    name: 'Indie Hackers',
    domain: 'indiehackers.com',
    category: 'Community',
    dr: 78,
    status: 'suggested',
  },
  {
    id: 7,
    name: 'SaaSHub',
    domain: 'saashub.com',
    category: 'Directory',
    dr: 72,
    status: 'suggested',
  },
  {
    id: 8,
    name: 'AlternativeTo',
    domain: 'alternativeto.net',
    category: 'Resource',
    dr: 83,
    status: 'submitted',
  },
]

export const BACKLINK_STATS: DashStatData[] = [
  { label: 'Live links', value: '2' },
  { label: 'Opportunities', value: '5' },
  { label: 'Avg DR', value: '86' },
  { label: 'Submitted', value: '2' },
]

export const STATUS_STYLE: Record<LinkStatus, string> = {
  live: 'bg-[rgba(47,190,126,0.12)] text-[#2FBE7E]',
  submitted: 'bg-[rgba(59,158,246,0.14)] text-[#3B9EF6]',
  suggested: 'bg-[var(--cat-hover)] text-[var(--cat-ink-3)]',
}
