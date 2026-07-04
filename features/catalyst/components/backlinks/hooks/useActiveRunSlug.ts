'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { listRuns, pickActiveRunSlug } from '@/lib/api/runs'
import { useSession } from '@/lib/auth-client'
import { queryKeys } from '@/lib/query-keys'

// Mirrors the key WorkspaceSwitcher writes when the user picks a project (org id).
const ACTIVE_KEY = 'signalor.activeProjectId'

function useActiveOrgId(): number | null {
  const [orgId, setOrgId] = useState<number | null>(null)

  useEffect(() => {
    const read = (): void => {
      const saved = Number(localStorage.getItem(ACTIVE_KEY))
      setOrgId(saved > 0 ? saved : null)
    }
    read()
    window.addEventListener('storage', read)
    return () => window.removeEventListener('storage', read)
  }, [])

  return orgId
}

export interface ActiveRunSlug {
  slug: string | null
  isLoading: boolean
  isError: boolean
}

/**
 * Resolves the current project's newest run slug — the key every backlinks
 * endpoint needs. Sourced from the active org (WorkspaceSwitcher) when present,
 * otherwise the signed-in email.
 */
export function useActiveRunSlug(): ActiveRunSlug {
  const { data: session } = useSession()
  const email = session?.user?.email ?? undefined
  const orgId = useActiveOrgId()

  const enabled = Boolean(orgId || email)
  const key = orgId ? queryKeys.runs.byOrg(orgId) : queryKeys.runs.byEmail(email ?? '')

  const { data, isLoading, isError } = useQuery({
    queryKey: key,
    queryFn: () => listRuns({ orgId: orgId ?? undefined, email }),
    enabled,
  })

  return {
    slug: data ? pickActiveRunSlug(data) : null,
    isLoading: enabled ? isLoading : false,
    isError,
  }
}
