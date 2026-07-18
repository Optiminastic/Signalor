'use client'

import { useQuery } from '@tanstack/react-query'

import { useIntegrations } from '@/hooks/useIntegrations'
import { getGAData, type GAData } from '@/lib/api/integrations'
import { useSession } from '@/lib/auth-client'

const SYNC_POLL_MS = 15000

interface UseGaDataResult {
  data: GAData | null
  isLoading: boolean
  /** True when GA has synced but the selected property has zero traffic. */
  isEmpty: boolean
  /** The GA integration is connected for this account. */
  connected: boolean
  /** Connected, but the first (or a re-)sync hasn't landed data yet. */
  syncing: boolean
}

function isSettled(data: GAData | null | undefined): boolean {
  return Boolean(data && data.sync_status !== 'pending' && data.sync_status !== 'syncing')
}

/** The latest GA4 snapshot for the signed-in account's connected property. */
export function useGaData(): UseGaDataResult {
  const { data: session } = useSession()
  const email = session?.user?.email ?? undefined
  const { connected } = useIntegrations()
  const gaConnected = connected.has('google-analytics')

  const query = useQuery({
    queryKey: ['catalyst', 'ga-data', email ?? ''],
    enabled: Boolean(email),
    queryFn: () => getGAData(email as string),
    // While connected but unsynced (the first sync runs in the background),
    // keep polling so dashboards fill in without a manual refresh.
    refetchInterval: q =>
      gaConnected && !isSettled(q.state.data as GAData | null | undefined) ? SYNC_POLL_MS : false,
  })

  const data = query.data ?? null
  return {
    data,
    isLoading: query.isLoading,
    isEmpty: data !== null && isSettled(data) && data.sessions === 0,
    connected: gaConnected,
    syncing: gaConnected && !query.isLoading && !isSettled(data),
  }
}
