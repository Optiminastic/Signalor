'use client'

import { useQuery } from '@tanstack/react-query'

import { useActiveProject } from '@/hooks/useActiveProject'
import { getCompetitors, type Competitor } from '@/lib/api/analyzer'

interface UseAgentCompetitorsResult {
  competitors: Competitor[]
  isLoading: boolean
  hasData: boolean
}

/** Top rivals discovered for this run, best-scored first. */
export function useAgentCompetitors(limit = 5): UseAgentCompetitorsResult {
  const { slug } = useActiveProject()

  const query = useQuery({
    queryKey: ['catalyst', 'agent-competitors', slug ?? ''],
    enabled: Boolean(slug),
    queryFn: () => getCompetitors(slug as string),
  })

  const competitors = (query.data ?? [])
    .slice()
    .sort((a, b) => (b.composite_score ?? 0) - (a.composite_score ?? 0))
    .slice(0, limit)

  return {
    competitors,
    isLoading: query.isLoading,
    hasData: competitors.length > 0,
  }
}
