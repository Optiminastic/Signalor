'use client'

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query'

import {
  getBacklinkSchedule,
  getOurBacklinks,
  setBacklinkSchedule,
  type BacklinkSchedule,
  type OurBacklinks,
} from '@/lib/api/backlinks'
import { queryKeys } from '@/lib/query-keys'

/** The published auto-backlinks for a run. Disabled until a slug resolves. */
export function useAutoBacklinks(slug: string | null): UseQueryResult<OurBacklinks> {
  return useQuery<OurBacklinks>({
    queryKey: queryKeys.backlinks.auto(slug ?? ''),
    queryFn: () => getOurBacklinks(slug as string),
    enabled: Boolean(slug),
  })
}

/** The daily auto-backlinks schedule state for a run. */
export function useBacklinkSchedule(slug: string | null): UseQueryResult<BacklinkSchedule> {
  return useQuery<BacklinkSchedule>({
    queryKey: queryKeys.backlinks.schedule(slug ?? ''),
    queryFn: () => getBacklinkSchedule(slug as string),
    enabled: Boolean(slug),
  })
}

/** Toggle the daily schedule, writing the fresh state straight into the cache. */
export function useToggleSchedule(
  slug: string | null,
): UseMutationResult<BacklinkSchedule, Error, boolean> {
  const qc = useQueryClient()
  return useMutation<BacklinkSchedule, Error, boolean>({
    mutationFn: (isActive: boolean) => setBacklinkSchedule(slug as string, isActive),
    onSuccess: next => {
      qc.setQueryData(queryKeys.backlinks.schedule(slug ?? ''), next)
    },
  })
}
