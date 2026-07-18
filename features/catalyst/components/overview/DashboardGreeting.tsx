'use client'

import { useActiveProject } from '@/hooks/useActiveProject'
import { useSession } from '@/lib/auth-client'

function firstNameOf(raw: string): string {
  const trimmed = raw.trim()
  if (trimmed.includes('@')) return trimmed.split('@')[0]
  return trimmed.split(' ')[0] || trimmed
}

/**
 * Lightweight page title for the dashboard Overview. Replaces the old second
 * top bar — the account avatar/search/notifications now live once in the shared
 * GlobalBar, so this is just a warm greeting in the content flow.
 */
export function DashboardGreeting(): JSX.Element {
  const { data: session } = useSession()
  const { activeOrg } = useActiveProject()

  const raw = session?.user?.name || session?.user?.email || 'there'
  const name = firstNameOf(raw)

  return (
    <div className="cat-rise col-span-full mb-0.5">
      <h1 className="text-[19px] font-semibold tracking-tight text-[var(--cat-ink)]">
        Welcome back, {name} 👋
      </h1>
      <p className="mt-0.5 text-[13px] text-[var(--cat-ink-2)]">
        {activeOrg
          ? `Here’s what’s happening with ${activeOrg.name} today.`
          : 'Here’s what’s happening today.'}
      </p>
    </div>
  )
}
