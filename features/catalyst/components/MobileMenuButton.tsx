'use client'

import { Menu } from 'lucide-react'

import { useUiStore } from '@/stores/useUiStore'

/** Hamburger that opens the sidebar drawer — mobile only. */
export function MobileMenuButton(): JSX.Element {
  const setMobileOpen = useUiStore(s => s.setMobileOpen)
  return (
    <button
      type="button"
      aria-label="Open menu"
      onClick={() => setMobileOpen(true)}
      className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-md border border-[var(--cat-border)] bg-[var(--cat-card)] text-[var(--cat-ink-2)] transition-colors hover:bg-[var(--cat-hover)] hover:text-[var(--cat-ink)] lg:hidden"
    >
      <Menu size={18} strokeWidth={1.8} />
    </button>
  )
}
