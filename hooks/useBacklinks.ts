'use client'

import { useQuery } from '@tanstack/react-query'

import type { BacklinkOpp } from '@/features/catalyst/backlinks-data'
import type { DashStatData } from '@/features/catalyst/components/dash/DashStat'
import { getBacklinksFree, type BacklinkRow } from '@/lib/api/analyzer'

function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

function toOpp(row: BacklinkRow, index: number): BacklinkOpp {
  return {
    id: row.id || index,
    name: row.name,
    domain: domainOf(row.submit_url),
    category: row.category ? row.category.charAt(0).toUpperCase() + row.category.slice(1) : '—',
    priority: row.priority,
    status: 'suggested',
    submitUrl: row.submit_url,
  }
}

function buildStats(opps: BacklinkOpp[]): DashStatData[] {
  const highPriority = opps.filter(o => o.priority <= 1).length
  const categories = new Set(opps.map(o => o.category)).size
  return [
    { label: 'Opportunities', value: String(opps.length) },
    { label: 'High priority', value: String(highPriority) },
    { label: 'Categories', value: String(categories) },
    { label: 'Submitted', value: String(opps.filter(o => o.status === 'submitted').length) },
  ]
}

export interface BacklinksData {
  opps: BacklinkOpp[]
  stats: DashStatData[]
}

interface UseBacklinksResult {
  data: BacklinksData | undefined
  isLoading: boolean
  isError: boolean
}

/** Fetches free backlink/citation opportunities for a run slug. */
export function useBacklinks(slug: string | undefined): UseBacklinksResult {
  const query = useQuery({
    queryKey: ['catalyst', 'backlinks', slug ?? ''],
    enabled: Boolean(slug),
    queryFn: async (): Promise<BacklinksData> => {
      const res = await getBacklinksFree(slug as string)
      const opps = res.rows.map(toOpp)
      return { opps, stats: buildStats(opps) }
    },
  })
  return { data: query.data, isLoading: query.isLoading, isError: query.isError }
}
