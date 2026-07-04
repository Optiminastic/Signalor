'use client'

import { PanelLeft } from 'lucide-react'

import { useUiStore } from '@/stores/useUiStore'

/** Collapse/expand the desktop sidebar rail — lives in the top bar (desktop only). */
export function SidebarToggle(): JSX.Element {
  const collapsed = useUiStore(s => s.collapsed)
  const toggle = useUiStore(s => s.toggleCollapsed)
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      className="hidden h-[34px] w-[34px] shrink-0 place-items-center rounded-md border border-[var(--cat-border)] bg-[var(--cat-card)] text-[var(--cat-ink-2)] transition-colors hover:bg-[var(--cat-hover)] hover:text-[var(--cat-ink)] lg:grid"
    >
      <PanelLeft size={18} strokeWidth={1.8} />
    </button>
  )
}
