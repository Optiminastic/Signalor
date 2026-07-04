import { Bot, MapPin, MessagesSquare, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Platform {
  name: string
  count: string
  color: string
}

export const PLATFORMS: Platform[] = [
  { name: 'ChatGPT', count: '11,815', color: '#e04a3d' },
  { name: 'Claude', count: '8,984', color: '#F6B93B' },
  { name: 'DeepSeek', count: '6,103', color: '#3B9EF6' },
  { name: 'Grok', count: '3,979', color: '#8B5CF6' },
]

export interface DayBars {
  label: string
  /** Segment count per bar — grows across the week. */
  bars: number[]
}

export const DAYS: DayBars[] = [
  { label: 'Mon', bars: [5, 6, 5, 4, 5] },
  { label: 'Tue', bars: [6, 7, 6, 5, 6] },
  { label: 'Wed', bars: [8, 9, 7, 8, 7] },
  { label: 'Thu', bars: [9, 10, 8, 9, 8] },
  { label: 'Fri', bars: [11, 12, 10, 11, 10] },
  { label: 'Sat', bars: [13, 14, 12, 13, 12] },
  { label: 'Sun', bars: [15, 16, 14, 15, 16] },
]

export interface RankModule {
  icon: LucideIcon
  title: string
  desc: string
  badge?: boolean
}

export const MODULES: RankModule[] = [
  {
    icon: Bot,
    title: 'Agent Analytics',
    badge: true,
    desc: 'See which AI crawlers hit your pages, how often, and how deep — down to the URL.',
  },
  {
    icon: Sparkles,
    title: 'Answer Engine Insights',
    badge: true,
    desc: 'Find the exact questions where ChatGPT and Perplexity cite you — or cite a rival instead.',
  },
  {
    icon: MapPin,
    title: 'Local Rank Tracker',
    desc: 'Track visibility by city and ZIP on a geo grid, and catch regional gaps before they cost you.',
  },
  {
    icon: MessagesSquare,
    title: 'Conversation Explorer',
    badge: true,
    desc: 'Read real AI conversations that name your brand, tagged by sentiment and intent.',
  },
]
