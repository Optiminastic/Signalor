import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UiState {
  /** Desktop: icon-only rail when true. Persisted. */
  collapsed: boolean
  /** Mobile: slide-in drawer open. Not persisted. */
  mobileOpen: boolean
  toggleCollapsed: () => void
  setMobileOpen: (open: boolean) => void
}

export const useUiStore = create<UiState>()(
  persist(
    set => ({
      collapsed: false,
      mobileOpen: false,
      toggleCollapsed: () => set(s => ({ collapsed: !s.collapsed })),
      setMobileOpen: mobileOpen => set({ mobileOpen }),
    }),
    { name: 'signalor.ui', partialize: s => ({ collapsed: s.collapsed }) },
  ),
)
