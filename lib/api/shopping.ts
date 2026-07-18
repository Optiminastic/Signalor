import { z } from 'zod'

import { apiGet, apiPost } from './client'

/** AI-shopping readiness of the connected Shopify catalog. */

export const shoppingProductSchema = z.object({
  product_id: z.string(),
  handle: z.string().default(''),
  title: z.string().default(''),
  status: z.string().default(''),
  price: z.string().default(''),
  readiness: z.number().default(0),
  issues: z.array(z.string()).default([]),
  images_total: z.number().default(0),
  images_missing_alt: z.number().default(0),
  description_chars: z.number().default(0),
})
export type ShoppingProduct = z.infer<typeof shoppingProductSchema>

export const shoppingReadinessSchema = z.object({
  connected: z.boolean().default(false),
  shop_domain: z.string().default(''),
  product_count: z.number().default(0),
  avg_readiness: z.number().default(0),
  last_synced: z.string().nullable().default(null),
  issues: z.array(z.object({ code: z.string(), label: z.string(), count: z.number() })).default([]),
  products: z.array(shoppingProductSchema).default([]),
})
export type ShoppingReadiness = z.infer<typeof shoppingReadinessSchema>

/** GET runs/s/<slug>/shopping/ → per-product AI-shopping readiness rollup. */
export async function getShoppingReadiness(slug: string): Promise<ShoppingReadiness> {
  return shoppingReadinessSchema.parse(
    await apiGet<unknown>(`/api/analyzer/runs/s/${slug}/shopping/`),
  )
}

/** POST runs/s/<slug>/shopping/sync/ → re-pull and re-score the catalog. */
export async function syncShoppingCatalog(slug: string): Promise<number> {
  const data = await apiPost<unknown>(`/api/analyzer/runs/s/${slug}/shopping/sync/`, undefined, {
    signal: AbortSignal.timeout(120_000),
  })
  return z.object({ synced: z.number() }).parse(data).synced
}
