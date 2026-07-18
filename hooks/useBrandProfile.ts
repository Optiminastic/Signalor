'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { getBrandProfile, reviewBrandProfile, updateBrandProfile } from '@/lib/api/brand-profile'
import type { BrandProfile, BrandProfileSections, ReviewDecision } from '@/lib/api/brand-profile'
import { queryKeys } from '@/lib/query-keys'

interface BrandProfileQuery {
  data: BrandProfile | null
  isLoading: boolean
  isError: boolean
}

export function useBrandProfile(
  orgSlug: string | undefined,
  email: string | undefined,
): BrandProfileQuery {
  const query = useQuery({
    queryKey: queryKeys.catalyst.brandProfile(orgSlug ?? ''),
    enabled: Boolean(orgSlug && email),
    queryFn: () => getBrandProfile(orgSlug as string, email as string),
  })
  return { data: query.data ?? null, isLoading: query.isLoading, isError: query.isError }
}

interface BrandProfileMutations {
  save: (patch: BrandProfileSections) => void
  review: (decision: ReviewDecision) => void
  saving: boolean
  reviewing: boolean
}

export function useBrandProfileMutations(
  orgSlug: string | undefined,
  email: string | undefined,
): BrandProfileMutations {
  const qc = useQueryClient()
  const invalidate = (): void => {
    void qc.invalidateQueries({ queryKey: queryKeys.catalyst.brandProfile(orgSlug ?? '') })
  }

  const saveMutation = useMutation({
    mutationFn: (patch: BrandProfileSections) =>
      updateBrandProfile(orgSlug as string, email as string, patch),
    onSuccess: () => {
      invalidate()
      toast.success('Brand profile saved.')
    },
    onError: (error: Error) => toast.error(error.message || 'Could not save the profile.'),
  })

  const reviewMutation = useMutation({
    mutationFn: (decision: ReviewDecision) =>
      reviewBrandProfile(orgSlug as string, email as string, decision),
    onSuccess: (profile: BrandProfile) => {
      invalidate()
      toast.success(
        profile.status === 'approved' ? 'Brand profile approved.' : 'Brand profile rejected.',
      )
    },
    onError: (error: Error) => toast.error(error.message || 'Could not update the status.'),
  })

  return {
    save: patch => saveMutation.mutate(patch),
    review: decision => reviewMutation.mutate(decision),
    saving: saveMutation.isPending,
    reviewing: reviewMutation.isPending,
  }
}
