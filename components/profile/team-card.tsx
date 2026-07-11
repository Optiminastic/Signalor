'use client'

import { ChevronRight, Users2 } from 'lucide-react'
import Link from 'next/link'

import { useAgencyRole } from '@/hooks/useAgencyRole'

import { SectionCard } from './section-card'

/**
 * Agency-admin-only Team management shortcut. Relocated here from the dashboard
 * sidebar's AGENCY section — renders nothing for non-admins.
 */
export function TeamCard(): JSX.Element | null {
  const { isAdmin } = useAgencyRole()
  if (!isAdmin) return null

  return (
    <SectionCard title="Team" description="Invite teammates and manage agency access.">
      <Link
        href="/dashboard/team"
        className="flex items-center gap-2.5 rounded-md border border-[var(--cat-border)] bg-[var(--cat-card)] px-3 py-2.5 transition-colors hover:bg-[var(--cat-hover)]"
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[var(--cat-hover)] text-[var(--cat-ink-2)]">
          <Users2 size={16} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] font-medium text-[var(--cat-ink)]">Manage team</span>
          <span className="block text-[11px] text-[var(--cat-ink-3)]">
            Invite members and set roles
          </span>
        </span>
        <ChevronRight size={16} className="shrink-0 text-[var(--cat-ink-3)]" />
      </Link>
    </SectionCard>
  )
}
