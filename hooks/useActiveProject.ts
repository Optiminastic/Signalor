'use client'

import { useQuery } from '@tanstack/react-query'

import { getRuns, type RunSummary } from '@/lib/api/analyzer'
import { getOrganizations, type Organization } from '@/lib/api/organizations'
import { useSession } from '@/lib/auth-client'
import { queryKeys } from '@/lib/query-keys'
import { useProjectStore } from '@/stores/useProjectStore'

export interface ActiveProject {
  /** Signed-in user email (auth key for every backend call). */
  email: string | undefined
  /** The user's organizations/projects. */
  projects: Organization[]
  /** Currently selected organization. */
  activeOrg: Organization | undefined
  /** Latest analysis run for the active org (prefers a completed run). */
  run: RunSummary | undefined
  /** Run slug — the key for all `runs/s/<slug>/…` endpoints. */
  slug: string | undefined
  /** True while orgs or runs are still loading. */
  isLoading: boolean
  /** No completed run exists yet for the active org. */
  hasData: boolean
  select: (orgId: number) => void
}

/** Pick the best run to surface: newest completed, else newest of any status. */
function pickRun(runs: RunSummary[]): RunSummary | undefined {
  if (runs.length === 0) return undefined
  const complete = runs.find(r => r.status === 'complete')
  return complete ?? runs[0]
}

/**
 * Resolves the dashboard's active project end-to-end: session email → orgs →
 * selected org → its latest run slug. This is the single source every catalyst
 * page uses to fetch real data.
 */
export function useActiveProject(): ActiveProject {
  const { data: session } = useSession()
  const email = session?.user?.email ?? undefined
  const { activeOrgId, setActiveOrgId } = useProjectStore()

  const orgsQuery = useQuery({
    queryKey: queryKeys.catalyst.orgs(email ?? ''),
    queryFn: () => getOrganizations(email as string),
    enabled: Boolean(email),
  })

  const projects = orgsQuery.data ?? []
  const activeOrg = projects.find(p => p.id === activeOrgId) ?? projects[0]

  const runsQuery = useQuery({
    queryKey: queryKeys.catalyst.runs(activeOrg?.id ?? 0, email ?? ''),
    queryFn: () => getRuns(email as string, activeOrg?.id),
    enabled: Boolean(email && activeOrg),
  })

  const run = pickRun(runsQuery.data ?? [])

  return {
    email,
    projects,
    activeOrg,
    run,
    slug: run?.slug,
    isLoading: orgsQuery.isLoading || runsQuery.isLoading,
    hasData: run?.status === 'complete',
    select: setActiveOrgId,
  }
}
