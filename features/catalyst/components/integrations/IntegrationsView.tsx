'use client'

import { useState } from 'react'

import { IntegrationCard } from '@/features/catalyst/components/integrations/IntegrationCard'
import { IntegrationsSummary } from '@/features/catalyst/components/integrations/IntegrationsSummary'
import { ShopifyConnectModal } from '@/features/catalyst/components/integrations/ShopifyConnectModal'
import { INTEGRATION_GROUPS, INTEGRATIONS } from '@/features/catalyst/integrations-data'
import type { IntegrationGroup, IntegrationWithStatus } from '@/features/catalyst/integrations-data'
import { isConnectable, useIntegrationConnect } from '@/hooks/useIntegrationConnect'
import { useIntegrations } from '@/hooks/useIntegrations'

// Where a connected integration's manage gear links. GA opens property selection
// so a user can switch which GA4 property feeds the brand without reconnecting.
const MANAGE_HREF: Record<string, string> = {
  'google-analytics': '/settings/integrations/google-analytics/property',
}

interface GroupSectionProps {
  group: IntegrationGroup
  items: IntegrationWithStatus[]
  busySlug: string
  onToggle: (slug: string, next: boolean) => void
}

function GroupSection({ group, items, busySlug, onToggle }: GroupSectionProps): JSX.Element {
  return (
    <section>
      <h2 className="mb-3 text-[11px] font-semibold tracking-wider text-[var(--cat-ink-3)] uppercase">
        {group}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items
          .filter(i => i.group === group)
          .map(item => (
            <IntegrationCard
              key={item.slug}
              item={item}
              onToggle={
                isConnectable(item.slug) ? (next: boolean) => onToggle(item.slug, next) : undefined
              }
              busy={busySlug === item.slug}
              manageHref={MANAGE_HREF[item.slug]}
            />
          ))}
      </div>
    </section>
  )
}

function IntegrationsHeader({
  connected,
  total,
}: {
  connected: number
  total: number
}): JSX.Element {
  return (
    <header className="cat-rise mb-4">
      <h1 className="text-[20px] font-semibold tracking-tight text-[var(--cat-ink)]">
        Integrations
      </h1>
      <p className="mt-0.5 text-[13px] text-[var(--cat-ink-3)]">
        Connect your stack to power GEO analysis and auto-fixes ·{' '}
        <span className="font-medium text-[var(--cat-ink-2)]">
          {connected} of {total} connected
        </span>
      </p>
    </header>
  )
}

export function IntegrationsView(): JSX.Element {
  const { connected } = useIntegrations()
  const { toggle, busySlug, error } = useIntegrationConnect()
  const [shopifyOpen, setShopifyOpen] = useState(false)
  const items = INTEGRATIONS.map(i => ({ ...i, connected: connected.has(i.slug) }))
  const connectedCount = items.filter(i => i.connected).length

  // Shopify connect opens the custom-app token modal (works without OAuth env);
  // disconnect and every other provider go through the normal toggle.
  const handleToggle = (slug: string, next: boolean): void => {
    if (slug === 'shopify' && next) return setShopifyOpen(true)
    void toggle(slug, next)
  }

  return (
    <div className="w-full">
      {shopifyOpen && <ShopifyConnectModal onClose={() => setShopifyOpen(false)} />}
      <IntegrationsHeader connected={connectedCount} total={items.length} />

      {error && (
        <p className="mb-3 rounded-md bg-[#E5484D]/8 px-3 py-2 text-[12.5px] text-[#E5484D]">
          {error}
        </p>
      )}

      <IntegrationsSummary connected={connectedCount} total={INTEGRATIONS.length} />

      <div className="space-y-5">
        {INTEGRATION_GROUPS.map(group => (
          <GroupSection
            key={group}
            group={group}
            items={items}
            busySlug={busySlug}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  )
}
