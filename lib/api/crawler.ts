import { z } from 'zod'

import { apiGet } from './client'

/**
 * Crawler Logs — AI-bot traffic against the brand's site, reported by the
 * site's edge/log integration through the org-scoped ingest endpoint.
 */

export const crawlerLogsSchema = z.object({
  ingest_token: z.string(),
  total_hits: z.number().default(0),
  days: z.array(z.object({ date: z.string(), bots: z.record(z.string(), z.number()) })).default([]),
  bots: z.array(z.object({ bot: z.string(), label: z.string(), hits: z.number() })).default([]),
  pages: z.array(z.object({ path: z.string(), hits: z.number() })).default([]),
})
export type CrawlerLogs = z.infer<typeof crawlerLogsSchema>

/** GET runs/s/<slug>/crawler-logs/ → daily per-bot activity + setup token. */
export async function getCrawlerLogs(slug: string): Promise<CrawlerLogs> {
  return crawlerLogsSchema.parse(
    await apiGet<unknown>(`/api/analyzer/runs/s/${slug}/crawler-logs/`),
  )
}
