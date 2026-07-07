import { IntegrationCard } from '@/features/catalyst/components/integrations/IntegrationCard'
import { IntegrationsSummary } from '@/features/catalyst/components/integrations/IntegrationsSummary'
import {
  INTEGRATION_GROUPS,
  INTEGRATIONS,
  type IntegrationGroup,
} from '@/features/catalyst/integrations-data'

function GroupSection({ group }: { group: IntegrationGroup }): JSX.Element {
  const items = INTEGRATIONS.filter(i => i.group === group)
  const connected = items.filter(i => i.connected).length
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-[11px] font-semibold tracking-wider text-[var(--cat-ink-3)] uppercase">
          {group}
        </h2>
        <span className="rounded-full bg-[var(--cat-hover)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--cat-ink-3)] tabular-nums">
          {connected}/{items.length}
        </span>
      </div>
      <div className="cat-stagger grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {items.map(item => (
          <IntegrationCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  )
}

export function IntegrationsView(): JSX.Element {
  const connectedCount = INTEGRATIONS.filter(i => i.connected).length

  return (
    <div className="w-full">
      <header className="cat-rise mb-4">
        <h1 className="text-[20px] font-semibold tracking-tight text-[var(--cat-ink)]">
          Integrations
        </h1>
        <p className="mt-0.5 text-[13px] text-[var(--cat-ink-3)]">
          Connect your stack to power GEO analysis and auto-fixes ·{' '}
          <span className="font-medium text-[var(--cat-ink-2)]">
            {connectedCount} of {INTEGRATIONS.length} connected
          </span>
        </p>
      </header>

      <IntegrationsSummary connected={connectedCount} total={INTEGRATIONS.length} />

      <div className="space-y-5">
        {INTEGRATION_GROUPS.map(group => (
          <GroupSection key={group} group={group} />
        ))}
      </div>
    </div>
  )
}
