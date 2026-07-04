import { IntegrationCard } from '@/features/catalyst/components/integrations/IntegrationCard'
import { INTEGRATION_GROUPS, INTEGRATIONS } from '@/features/catalyst/integrations-data'

export function IntegrationsView(): JSX.Element {
  const connectedCount = INTEGRATIONS.filter(i => i.connected).length

  return (
    <div className="mx-auto w-full max-w-[1100px]">
      <header className="mb-6">
        <h1 className="text-[22px] font-semibold tracking-tight text-[var(--cat-ink)]">
          Integrations
        </h1>
        <p className="mt-1 text-[13px] text-[var(--cat-ink-3)]">
          Connect your stack to power GEO analysis and auto-fixes ·{' '}
          <span className="font-medium text-[var(--cat-ink-2)]">
            {connectedCount} of {INTEGRATIONS.length} connected
          </span>
        </p>
      </header>

      <div className="space-y-8">
        {INTEGRATION_GROUPS.map(group => (
          <section key={group}>
            <h2 className="mb-3 text-[11px] font-semibold tracking-wider text-[var(--cat-ink-3)] uppercase">
              {group}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {INTEGRATIONS.filter(i => i.group === group).map(item => (
                <IntegrationCard key={item.slug} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
