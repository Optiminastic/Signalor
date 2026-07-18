import { z } from 'zod'

import { apiGet } from './client'

/** Weekly per-engine brand mention rate, from tracked prompt results. */
export const citationTrendPointSchema = z.object({
  week_start: z.string().nullable(),
  engine: z.string(),
  rate_pct: z.number(),
})
export type CitationTrendPoint = z.infer<typeof citationTrendPointSchema>

/** GET runs/s/<slug>/citation-trend/ → weekly mention-rate series per engine. */
export async function getCitationTrend(slug: string): Promise<CitationTrendPoint[]> {
  return z
    .array(citationTrendPointSchema)
    .parse(await apiGet<unknown>(`/api/analyzer/runs/s/${slug}/citation-trend/`))
}
