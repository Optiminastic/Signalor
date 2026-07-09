import { z } from 'zod'

import { apiGet } from './client'

/**
 * A single GEO AnalysisRun (a "project run"). The public, opaque `slug` is what
 * every `/runs/s/<slug>/...` endpoint keys on — see backend CLAUDE.md.
 */
const analysisRunSchema = z.object({
  id: z.number(),
  slug: z.string(),
  url: z.string(),
  country: z.string().nullish(),
  run_type: z.string().nullish(),
  status: z.string(),
  progress: z.number().nullish(),
  composite_score: z.number().nullish(),
  created_at: z.string(),
})

export type AnalysisRun = z.infer<typeof analysisRunSchema>

interface ListRunsParams {
  orgId?: number
  email?: string
}

/**
 * GET /api/analyzer/runs/?org_id=|email= → the user's runs, newest first.
 * Backend requires exactly one of `org_id` or `email`.
 */
export async function listRuns({ orgId, email }: ListRunsParams): Promise<AnalysisRun[]> {
  const params: Record<string, string | undefined> = orgId
    ? { org_id: String(orgId) }
    : { email: email?.toLowerCase().trim() }
  const data = await apiGet<unknown>('/api/analyzer/runs/', { params })
  return z.array(analysisRunSchema).parse(data)
}

/**
 * The slug of the most relevant run for a project: the newest completed run if
 * any, otherwise the newest run. Runs come back newest-first from the backend.
 */
export function pickActiveRunSlug(runs: AnalysisRun[]): string | null {
  if (!runs.length) return null
  const complete = runs.find(r => r.status === 'complete')
  return (complete ?? runs[0]).slug
}
