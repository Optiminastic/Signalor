import type { DashStatData } from '@/features/catalyst/components/dash/DashStat'

export const ANALYTICS_STATS: DashStatData[] = [
  { label: 'Sessions', value: '48.2k', delta: '+12%', positive: true },
  { label: 'AI referrals', value: '3,910', delta: '+34%', positive: true },
  { label: 'Conv. rate', value: '2.8%', delta: '+0.3%', positive: true },
  { label: 'Avg. position', value: '4.1', delta: '-0.6', positive: true },
]

export interface RefSource {
  source: string
  sessions: string
  share: number
}

export const AI_SOURCES: RefSource[] = [
  { source: 'ChatGPT', sessions: '1,842', share: 47 },
  { source: 'Perplexity', sessions: '968', share: 25 },
  { source: 'Gemini', sessions: '624', share: 16 },
  { source: 'Claude', sessions: '312', share: 8 },
  { source: 'Copilot', sessions: '164', share: 4 },
]

export interface TopPage {
  path: string
  sessions: string
  aiShare: number
}

export const TOP_PAGES: TopPage[] = [
  { path: '/pricing', sessions: '6,210', aiShare: 38 },
  { path: '/features/geo', sessions: '4,880', aiShare: 52 },
  { path: '/blog/what-is-geo', sessions: '3,140', aiShare: 61 },
  { path: '/', sessions: '9,020', aiShare: 22 },
  { path: '/integrations', sessions: '2,050', aiShare: 44 },
]
