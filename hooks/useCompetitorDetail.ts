'use client'

import { useQuery } from '@tanstack/react-query'

import { getCompetitors, type Competitor } from '@/lib/api/analyzer'
import { queryKeys } from '@/lib/query-keys'

interface UseCompetitorDetailResult {
  competitor: Competitor | undefined
  isLoading: boolean
  isError: boolean
  notFound: boolean
}

/** One discovered competitor by id — shares the competitors list query cache. */
export function useCompetitorDetail(
  slug: string | undefined,
  competitorId: number,
): UseCompetitorDetailResult {
  const query = useQuery({
    queryKey: queryKeys.catalyst.competitors(slug ?? ''),
    enabled: Boolean(slug),
    queryFn: () => getCompetitors(slug as string),
  })
  const competitor = query.data?.find(c => c.id === competitorId)
  return {
    competitor,
    isLoading: query.isLoading,
    isError: query.isError,
    notFound: Boolean(query.data) && !competitor,
  }
}
