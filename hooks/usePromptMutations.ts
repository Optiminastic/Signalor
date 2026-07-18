'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ApiError } from '@/lib/api/client'
import { addPrompt, deletePrompt, recheckPrompt } from '@/lib/api/prompts'
import { queryKeys } from '@/lib/query-keys'

interface UsePromptMutationsResult {
  add: (text: string) => void
  recheck: (trackId: number) => void
  remove: (trackId: number) => void
  isAdding: boolean
  /** Track id with a recheck/delete in flight, for per-row spinners. */
  busyId: number | null
}

function addErrorMessage(err: unknown): string {
  if (err instanceof ApiError && err.status === 403) {
    return 'Prompt limit reached for your plan. Remove a prompt or upgrade to track more.'
  }
  return 'Could not add the prompt. Please try again.'
}

/** Create / recheck / delete tracked prompts, keeping the list query fresh. */
export function usePromptMutations(slug: string | undefined): UsePromptMutationsResult {
  const queryClient = useQueryClient()

  const invalidate = (): void => {
    void queryClient.invalidateQueries({ queryKey: queryKeys.catalyst.prompts(slug ?? '') })
  }

  const addMutation = useMutation({
    mutationFn: (text: string) => addPrompt(slug as string, text),
    onSuccess: () => {
      invalidate()
      toast.success('Prompt added. Engines are answering it now; results land shortly.')
    },
    onError: (err: unknown) => toast.error(addErrorMessage(err)),
  })

  const recheckMutation = useMutation({
    mutationFn: (trackId: number) => recheckPrompt(slug as string, trackId),
    onSuccess: () => {
      invalidate()
      toast.success('Recheck started. Fresh answers arrive in about a minute.')
    },
    onError: () => toast.error('Could not start the recheck. Please try again.'),
  })

  const removeMutation = useMutation({
    mutationFn: (trackId: number) => deletePrompt(slug as string, trackId),
    onSuccess: () => {
      invalidate()
      toast.success('Prompt removed.')
    },
    onError: () => toast.error('Could not remove the prompt. Please try again.'),
  })

  const busyId = recheckMutation.isPending
    ? (recheckMutation.variables ?? null)
    : removeMutation.isPending
      ? (removeMutation.variables ?? null)
      : null

  return {
    add: text => {
      if (slug) addMutation.mutate(text)
      else toast.error('Run an analysis first to track prompts.')
    },
    recheck: trackId => slug && recheckMutation.mutate(trackId),
    remove: trackId => slug && removeMutation.mutate(trackId),
    isAdding: addMutation.isPending,
    busyId,
  }
}
