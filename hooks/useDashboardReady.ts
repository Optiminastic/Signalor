'use client'

import { useActiveProject } from '@/hooks/useActiveProject'
import { useCitations } from '@/hooks/useCitations'
import { useGeoScore } from '@/hooks/useGeoScore'
import { useOverview } from '@/hooks/useOverview'
import { usePillars } from '@/hooks/usePillars'
import { usePrompts } from '@/hooks/usePrompts'

/**
 * Whether the dashboard overview's primary data has finished loading.
 *
 * Aggregates the queries the visible overview cards depend on. React Query
 * dedupes by key, so calling these hooks here (as well as inside each card) adds
 * no extra fetches. Returns `true` (render the cards) once the project is
 * resolved and every card query has settled - including the no-project case,
 * where the queries are disabled and therefore report not-loading.
 */
export function useDashboardReady(): boolean {
  const { isLoading: projectLoading, slug } = useActiveProject()
  const overview = useOverview(slug)
  const geo = useGeoScore(slug, '1W')
  const pillars = usePillars(slug)
  const citations = useCitations(slug)
  const prompts = usePrompts(slug)
  return (
    !projectLoading &&
    !overview.isLoading &&
    !geo.isLoading &&
    !pillars.isLoading &&
    !citations.isLoading &&
    !prompts.isLoading
  )
}
