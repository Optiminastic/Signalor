'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { useSession } from '@/lib/auth-client'

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || 'U'
}

/** Bottom user card — links to the profile page, shows the signed-in user. */
export function SidebarUser({ collapsed }: { collapsed?: boolean }): JSX.Element {
  const { data: session } = useSession()
  const name = session?.user?.name?.trim() || 'Your account'
  const email = session?.user?.email ?? 'Manage profile & billing'

  if (collapsed) {
    return (
      <Link
        href="/profile"
        title={name}
        aria-label={name}
        className="mt-3 flex justify-center border-t border-[var(--cat-border-soft)] pt-3"
      >
        <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-[#e04a3d] text-[12px] font-semibold text-white">
          {initials(name)}
        </span>
      </Link>
    )
  }

  return (
    <Link
      href="/profile"
      className="mt-3.5 flex items-center gap-2.5 rounded-md border-t border-[var(--cat-border-soft)] pt-3 transition-colors"
    >
      <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-[#e04a3d] text-[12px] font-semibold text-white">
        {initials(name)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-semibold text-[var(--cat-ink)]">
          {name}
        </span>
        <span className="block truncate text-xs text-[var(--cat-ink-3)]">{email}</span>
      </span>
      <ChevronRight size={16} className="shrink-0 text-[var(--cat-ink-3)]" />
    </Link>
  )
}
