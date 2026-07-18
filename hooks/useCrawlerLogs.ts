'use client'

import { useQuery } from '@tanstack/react-query'

import { BLUE, BRAND, GREEN, YELLOW } from '@/features/catalyst/constants'
import { getCrawlerLogs, type CrawlerLogs } from '@/lib/api/crawler'

const BOT_COLORS = [BRAND, BLUE, '#8B5CF6', YELLOW, GREEN, '#0EA5A4', '#DB2777', '#64748B']
const WAITING_POLL_MS = 30000

export interface CrawlerBot {
  bot: string
  label: string
  hits: number
  color: string
}

export interface CrawlerDay {
  date: string
  /** Segment heights in the same order as `bots`. */
  counts: number[]
  total: number
}

export interface CrawlerLogsData {
  raw: CrawlerLogs
  bots: CrawlerBot[]
  days: CrawlerDay[]
  maxDay: number
}

function shortDay(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function adapt(raw: CrawlerLogs): CrawlerLogsData {
  const bots = raw.bots.map((b, i) => ({ ...b, color: BOT_COLORS[i % BOT_COLORS.length] }))
  const days = raw.days.map(day => {
    const counts = bots.map(b => day.bots[b.bot] ?? 0)
    return {
      date: shortDay(day.date),
      counts,
      total: counts.reduce((sum, n) => sum + n, 0),
    }
  })
  return { raw, bots, days, maxDay: Math.max(1, ...days.map(d => d.total)) }
}

interface UseCrawlerLogsResult {
  data: CrawlerLogsData | undefined
  isLoading: boolean
  isError: boolean
}

/** AI crawler activity for the brand. Polls while no hits have arrived yet so
 *  the page fills in on its own right after the site integration goes live. */
export function useCrawlerLogs(slug: string | undefined): UseCrawlerLogsResult {
  const query = useQuery({
    queryKey: ['catalyst', 'crawler-logs', slug ?? ''],
    enabled: Boolean(slug),
    queryFn: async (): Promise<CrawlerLogsData> => adapt(await getCrawlerLogs(slug as string)),
    refetchInterval: q =>
      (q.state.data as CrawlerLogsData | undefined)?.raw.total_hits === 0 ? WAITING_POLL_MS : false,
  })
  return { data: query.data, isLoading: query.isLoading, isError: query.isError }
}
