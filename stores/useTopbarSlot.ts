import type { ReactNode } from 'react'
import { create } from 'zustand'

interface TopbarSlotState {
  /** Page-specific toolbar actions injected into the shared GlobalBar. */
  actions: ReactNode | null
  setActions: (actions: ReactNode | null) => void
}

/**
 * Lets a page render its toolbar (filters, New Analysis, …) inside the single
 * app-level GlobalBar instead of stacking a second bar underneath it. A page
 * sets its actions on mount and clears them on unmount.
 */
export const useTopbarSlot = create<TopbarSlotState>(set => ({
  actions: null,
  setActions: actions => set({ actions }),
}))
