'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  getShoppingReadiness,
  syncShoppingCatalog,
  type ShoppingReadiness,
} from '@/lib/api/shopping'

interface UseShoppingResult {
  data: ShoppingReadiness | undefined
  isLoading: boolean
  isError: boolean
  sync: () => void
  isSyncing: boolean
}

/** Catalog readiness for the connected store, plus the re-sync mutation. */
export function useShopping(slug: string | undefined): UseShoppingResult {
  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: ['catalyst', 'shopping', slug ?? ''],
    enabled: Boolean(slug),
    queryFn: () => getShoppingReadiness(slug as string),
  })

  const syncMutation = useMutation({
    mutationFn: () => syncShoppingCatalog(slug as string),
    onSuccess: synced => {
      void queryClient.invalidateQueries({ queryKey: ['catalyst', 'shopping', slug ?? ''] })
      toast.success(`Catalog synced — ${synced} products scored.`)
    },
    onError: () => toast.error('Could not sync the catalog. Check the Shopify connection.'),
  })

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    sync: () => {
      if (slug) syncMutation.mutate()
    },
    isSyncing: syncMutation.isPending,
  }
}
