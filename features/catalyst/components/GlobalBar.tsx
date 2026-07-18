'use client'

import { Bell, HelpCircle } from 'lucide-react'
import Link from 'next/link'

import { ICON_TILE } from '@/features/catalyst/components/control-styles'
import { FeedbackPopover } from '@/features/catalyst/components/FeedbackPopover'
import { GlobalSearch } from '@/features/catalyst/components/GlobalSearch'
import { MobileMenuButton } from '@/features/catalyst/components/MobileMenuButton'
import { SidebarToggle } from '@/features/catalyst/components/SidebarToggle'
import { ThemeToggleButton } from '@/features/catalyst/components/ThemeToggleButton'
import { TopbarUser } from '@/features/catalyst/components/TopbarUser'
import { useTopbarSlot } from '@/stores/useTopbarSlot'

/**
 * The single app-level top bar shown on every page: universal ⌘K search, the
 * current page's toolbar (injected via {@link useTopbarSlot}), and account chrome.
 * Pages no longer stack a second bar — they hand their actions to the slot.
 */
export function GlobalBar(): JSX.Element {
  const pageActions = useTopbarSlot(s => s.actions)

  return (
    <div className="cat-rise relative z-40 flex shrink-0 items-center gap-3 border-b border-[var(--cat-border)] pb-3">
      <MobileMenuButton />
      <SidebarToggle />
      <GlobalSearch />
      <div className="ml-auto flex items-center gap-1.5">
        {pageActions && (
          <>
            {pageActions}
            <span className="mx-1 hidden h-5 w-px bg-[var(--cat-border)] sm:block" />
          </>
        )}
        <ThemeToggleButton />
        <FeedbackPopover />
        <Link href="#" aria-label="Help & docs" className={ICON_TILE}>
          <HelpCircle size={17} strokeWidth={1.8} />
        </Link>
        <button type="button" aria-label="Notifications" className={`relative ${ICON_TILE}`}>
          <Bell size={17} strokeWidth={1.8} />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#e04a3d] ring-2 ring-[var(--cat-card)]" />
        </button>
        <span className="mx-1 h-5 w-px bg-[var(--cat-border)]" />
        <TopbarUser />
      </div>
    </div>
  )
}
