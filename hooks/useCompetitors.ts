'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { domainOf, relationFor, type Competitor } from '@/features/catalyst/competitors-data'
import { BRAND } from '@/features/catalyst/constants'
import { getCompetitors, type Competitor as ApiCompetitor } from '@/lib/api/analyzer'
import { queryKeys } from '@/lib/query-keys'

/** Deterministic swatch palette for competitor avatars (own brand uses BRAND). */
const PALETTE = [
  '#111827',
  '#0EA5A4',
  '#6366F1',
  '#F59E0B',
  '#2563EB',
  '#DB2777',
  '#059669',
  '#7C3AED',
]

/** The signed-in user's own brand, surfaced as the first ("mine") card. */
export interface MineBrand {
  name: string
  url: string
  score: number
}

function scoreOf(competitor: ApiCompetitor): number {
  return Math.round(competitor.composite_score ?? competitor.relevance_score ?? 0)
}

function adapt(apiComps: ApiCompetitor[], mine: MineBrand | undefined): Competitor[] {
  const out: Competitor[] = []
  if (mine) {
    out.push({
      name: mine.name,
      initial: (mine.name[0] ?? '?').toUpperCase(),
      color: BRAND,
      domain: domainOf(mine.url),
      score: Math.round(mine.score),
      relation: 'mine',
      positioning: '',
    })
  }
  apiComps.forEach((competitor, index) => {
    out.push({
      id: competitor.id,
      name: competitor.name,
      initial: (competitor.name[0] ?? '?').toUpperCase(),
      color: PALETTE[index % PALETTE.length],
      domain: domainOf(competitor.url),
      score: scoreOf(competitor),
      relation: relationFor(competitor.tier),
      positioning: competitor.positioning,
    })
  })
  return out
}

interface UseCompetitorsOptions {
  slug: string | undefined
  mine: MineBrand | undefined
}

interface UseCompetitorsResult {
  data: Competitor[] | undefined
  isLoading: boolean
  isError: boolean
}

/** Fetches discovered competitors for a run slug and prepends the user's brand. */
export function useCompetitors({ slug, mine }: UseCompetitorsOptions): UseCompetitorsResult {
  const query = useQuery({
    queryKey: queryKeys.catalyst.competitors(slug ?? ''),
    enabled: Boolean(slug),
    queryFn: () => getCompetitors(slug as string),
  })

  const data = useMemo(() => (query.data ? adapt(query.data, mine) : undefined), [query.data, mine])

  return { data, isLoading: query.isLoading, isError: query.isError }
}
