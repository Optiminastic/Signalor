'use client'

import { IntegrationCard } from '@/features/catalyst/components/integrations/IntegrationCard'
import { IntegrationsSummary } from '@/features/catalyst/components/integrations/IntegrationsSummary'
import { INTEGRATION_GROUPS, INTEGRATIONS } from '@/features/catalyst/integrations-data'
import { useIntegrations } from '@/hooks/useIntegrations'

export function IntegrationsView(): JSX.Element {
  const { connected } = useIntegrations()
  const items = INTEGRATIONS.map(i => ({ ...i, connected: connected.has(i.slug) }))

  // Platforms: only show the platform this project connected during onboarding —
  // hide the other platform options. Other groups still list all their integrations.
  const visibleItems = items.filter(i => i.group !== 'Platforms' || i.connected)
  const connectedCount = visibleItems.filter(i => i.connected).length

  return (
    <div className="w-full">
      <header className="cat-rise mb-4">
        <h1 className="text-[20px] font-semibold tracking-tight text-[var(--cat-ink)]">
          Integrations
        </h1>
        <p className="mt-0.5 text-[13px] text-[var(--cat-ink-3)]">
          Connect your stack to power GEO analysis and auto-fixes ·{' '}
          <span className="font-medium text-[var(--cat-ink-2)]">
            {connectedCount} of {visibleItems.length} connected
          </span>
        </p>
      </header>

      <IntegrationsSummary connected={connectedCount} total={visibleItems.length} />

      <div className="space-y-5">
        {INTEGRATION_GROUPS.map(group => {
          const groupItems = visibleItems.filter(i => i.group === group)
          if (groupItems.length === 0) return null
          return (
            <section key={group}>
              <h2 className="mb-3 text-[11px] font-semibold tracking-wider text-[var(--cat-ink-3)] uppercase">
                {group}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {groupItems.map(item => (
                  <IntegrationCard key={item.slug} item={item} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
