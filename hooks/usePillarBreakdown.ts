'use client'

import { useQuery } from '@tanstack/react-query'

import { brandRootPage, GEO_PILLARS } from '@/hooks/usePillars'
import {
  getRunDetail,
  type PageScore,
  type Recommendation,
  type RunDetail,
} from '@/lib/api/analyzer'

const REC_PRIORITY: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 }

export interface PillarDetailItem {
  /** Backend pillar key (content, schema, eeat, technical, entity, ai_visibility). */
  key: string
  label: string
  /** Score of the brand's root page — what the dashboard radar shows. */
  score: number
  /** Mean of the pillar across every crawled page. */
  siteAvg: number
  recCount: number
  topRecs: Recommendation[]
}

export interface PillarBreakdown {
  composite: number
  pageCount: number
  recTotal: number
  pillars: PillarDetailItem[]
  strongest: PillarDetailItem | undefined
  weakest: PillarDetailItem | undefined
}

function numberOf(page: PageScore | undefined, field: keyof PageScore): number {
  const value = page?.[field]
  return typeof value === 'number' ? Math.round(value) : 0
}

function siteAverage(pages: PageScore[], field: keyof PageScore): number {
  const values = pages.map(p => p[field]).filter((v): v is number => typeof v === 'number')
  if (values.length === 0) return 0
  return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length)
}

function recsFor(recs: Recommendation[], pillarKey: string): Recommendation[] {
  return recs
    .filter(r => r.pillar === pillarKey)
    .sort((a, b) => (REC_PRIORITY[a.priority] ?? 4) - (REC_PRIORITY[b.priority] ?? 4))
}

function adapt(detail: RunDetail): PillarBreakdown {
  const root = brandRootPage(detail)
  const pillars = GEO_PILLARS.map(({ key, label }) => {
    const pillarKey = String(key).replace(/_score$/, '')
    const recs = recsFor(detail.recommendations, pillarKey)
    return {
      key: pillarKey,
      label,
      score: numberOf(root, key),
      siteAvg: siteAverage(detail.page_scores, key),
      recCount: recs.length,
      topRecs: recs.slice(0, 2),
    }
  })
  const ranked = [...pillars].sort((a, b) => b.score - a.score)
  return {
    composite: Math.round(detail.composite_score ?? 0),
    pageCount: detail.page_scores.length,
    recTotal: detail.recommendations.length,
    pillars,
    strongest: ranked[0],
    weakest: ranked[ranked.length - 1],
  }
}

interface UsePillarBreakdownResult {
  data: PillarBreakdown | undefined
  isLoading: boolean
  isError: boolean
}

/** Full pillar breakdown for the details page: root vs site-average scores and
 *  the open recommendations behind each pillar. */
export function usePillarBreakdown(slug: string | undefined): UsePillarBreakdownResult {
  const query = useQuery({
    queryKey: ['catalyst', 'pillar-breakdown', slug ?? ''],
    enabled: Boolean(slug),
    queryFn: async (): Promise<PillarBreakdown> => adapt(await getRunDetail(slug as string)),
  })
  return { data: query.data, isLoading: query.isLoading, isError: query.isError }
}
