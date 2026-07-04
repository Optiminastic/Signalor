import { z } from 'zod'

import { apiGet } from './client'

const usageSchema = z.object({
  plan: z.string(),
  limits: z.object({
    max_projects: z.number(),
    max_prompts: z.number(),
    engines: z.array(z.string()),
  }),
  usage: z.object({
    projects: z.number(),
    prompts: z.number(),
    runs_this_month: z.number(),
  }),
})

export type Usage = z.infer<typeof usageSchema>

const subscriptionSchema = z.object({
  is_active: z.boolean(),
  status: z.string(),
  current_period_end: z.string().nullable(),
  currency: z.string(),
  plan: z.string(),
  plan_label: z.string(),
  limits: z.object({
    label: z.string(),
    price_gbp: z.number(),
    max_projects: z.number(),
    max_prompts: z.number(),
    engines: z.array(z.string()),
  }),
  account_type: z.enum(['individual', 'agency']).optional(),
})

export type Subscription = z.infer<typeof subscriptionSchema>

const invoiceSchema = z.object({
  payment_id: z.string(),
  created_at: z.string().nullable(),
  amount: z.number().nullable(),
  currency: z.string().nullable(),
  status: z.string().nullable(),
})

const invoiceListSchema = z.object({
  items: z.array(invoiceSchema),
})

export type Invoice = z.infer<typeof invoiceSchema>

/** GET /api/payments/usage/?email= — usage against plan limits. */
export async function getUsage(email: string): Promise<Usage> {
  return usageSchema.parse(await apiGet<unknown>('/api/payments/usage/', { params: { email } }))
}

/** GET /api/payments/status/?email= — subscription status + plan. */
export async function getSubscriptionStatus(email: string): Promise<Subscription> {
  return subscriptionSchema.parse(
    await apiGet<unknown>('/api/payments/status/', { params: { email } }),
  )
}

/** GET /api/payments/invoices/?email= — past invoices. */
export async function listInvoices(email: string): Promise<Invoice[]> {
  const data = await apiGet<unknown>('/api/payments/invoices/', { params: { email } })
  return invoiceListSchema.parse(data).items
}
