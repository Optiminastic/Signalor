import type { DashStatData } from '@/features/catalyst/components/dash/DashStat'

export type Priority = 'High' | 'Medium' | 'Low'
export type RecStatus = 'open' | 'in-progress' | 'done'

export interface Recommendation {
  id: number
  title: string
  pillar: string
  priority: Priority
  impact: number
  effort: string
  status: RecStatus
  auto: boolean
}

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: 1,
    title: 'Add FAQ schema to your top 12 product pages',
    pillar: 'Schema',
    priority: 'High',
    impact: 8,
    effort: '5 min',
    status: 'open',
    auto: true,
  },
  {
    id: 2,
    title: 'Serve an llms.txt for AI crawler discovery',
    pillar: 'Technical',
    priority: 'High',
    impact: 7,
    effort: '2 min',
    status: 'open',
    auto: true,
  },
  {
    id: 3,
    title: 'Strengthen author bios with credentials (E-E-A-T)',
    pillar: 'E-E-A-T',
    priority: 'Medium',
    impact: 5,
    effort: '30 min',
    status: 'in-progress',
    auto: false,
  },
  {
    id: 4,
    title: 'Fix 6 pages with missing meta descriptions',
    pillar: 'Content',
    priority: 'Medium',
    impact: 4,
    effort: '15 min',
    status: 'open',
    auto: true,
  },
  {
    id: 5,
    title: 'Add Organization entity markup to homepage',
    pillar: 'Entity',
    priority: 'High',
    impact: 6,
    effort: '10 min',
    status: 'open',
    auto: true,
  },
  {
    id: 6,
    title: 'Improve LCP on 4 slow templates',
    pillar: 'Technical',
    priority: 'Low',
    impact: 3,
    effort: '2 h',
    status: 'open',
    auto: false,
  },
  {
    id: 7,
    title: 'Publish a comparison page targeting rival prompts',
    pillar: 'Content',
    priority: 'Medium',
    impact: 5,
    effort: '1 h',
    status: 'done',
    auto: false,
  },
  {
    id: 8,
    title: 'Get cited on 3 high-authority industry directories',
    pillar: 'AI Visibility',
    priority: 'High',
    impact: 7,
    effort: '45 min',
    status: 'open',
    auto: false,
  },
]

export const REC_STATS: DashStatData[] = [
  { label: 'Open fixes', value: '6' },
  { label: 'Potential lift', value: '+31', delta: 'GEO pts', positive: true },
  { label: 'Auto-fixable', value: '4' },
  { label: 'Completed', value: '1 / 8' },
]

export const PRIORITY_STYLE: Record<Priority, string> = {
  High: 'bg-[rgba(229,72,77,0.12)] text-[#E5484D]',
  Medium: 'bg-[rgba(246,185,59,0.15)] text-[#F6B93B]',
  Low: 'bg-[var(--cat-hover)] text-[var(--cat-ink-2)]',
}
