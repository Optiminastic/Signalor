import { z } from 'zod'

import { apiGet, apiPatch, apiPost } from './client'

/** A content section is a free-form object (shape varies per section). */
const sectionObject = z.record(z.string(), z.unknown())

export const brandProfileSchema = z
  .object({
    status: z.string().optional().default('pending'),
    confidence: z.number().optional().default(0),
    last_verified_at: z.string().nullable().optional(),
    identity: sectionObject.optional().default({}),
    positioning: sectionObject.optional().default({}),
    audience: sectionObject.optional().default({}),
    voice: sectionObject.optional().default({}),
    canonical_facts: sectionObject.optional().default({}),
    competitors: z.array(sectionObject).optional().default([]),
    sources: sectionObject.optional().default({}),
  })
  .passthrough()

export type BrandProfile = z.infer<typeof brandProfileSchema>

/** The sections a reviewer may edit (workflow fields are backend-managed). */
export type BrandProfileSections = Partial<
  Pick<
    BrandProfile,
    'identity' | 'positioning' | 'audience' | 'voice' | 'canonical_facts' | 'competitors'
  >
>

export type ReviewDecision = 'approve' | 'reject'

/** GET the org's brand profile. Returns null when none has been bootstrapped yet. */
export async function getBrandProfile(
  orgSlug: string,
  email: string,
): Promise<BrandProfile | null> {
  const raw = await apiGet<unknown>(`/api/organizations/${orgSlug}/brand-profile/`, {
    params: { email },
  })
  if (!raw || typeof raw !== 'object' || Object.keys(raw as object).length === 0) return null
  return brandProfileSchema.parse(raw)
}

/** PATCH edited content sections. */
export async function updateBrandProfile(
  orgSlug: string,
  email: string,
  patch: BrandProfileSections,
): Promise<BrandProfile> {
  return brandProfileSchema.parse(
    await apiPatch<unknown>(`/api/organizations/${orgSlug}/brand-profile/`, { email, ...patch }),
  )
}

/** POST an approve/reject decision. */
export async function reviewBrandProfile(
  orgSlug: string,
  email: string,
  decision: ReviewDecision,
): Promise<BrandProfile> {
  return brandProfileSchema.parse(
    await apiPost<unknown>(`/api/organizations/${orgSlug}/brand-profile/review/`, {
      email,
      decision,
    }),
  )
}
