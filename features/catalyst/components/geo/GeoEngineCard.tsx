import { TickBar } from '@/features/catalyst/components/brands/BrandBits'
import { Card } from '@/features/catalyst/components/Card'
import { CardHead } from '@/features/catalyst/components/CardHead'
import { Delta } from '@/features/catalyst/components/Delta'
import type { EngineShare, GeoDetail } from '@/hooks/useGeoScore'

function EngineRow({ engine }: { engine: EngineShare }): JSX.Element {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2 text-[13px]">
        <engine.icon size={16} className="text-[var(--cat-ink-2)]" />
        <span className="truncate font-medium text-[var(--cat-ink)]">{engine.name}</span>
        <span className="ml-auto">
          <Delta positive={engine.positive}>{engine.mentions} mentions</Delta>
        </span>
      </div>
      <TickBar value={engine.pct} />
    </div>
  )
}

/** Per-engine share of voice, anchored by the overall mention rate. */
export function GeoEngineCard({ data }: { data: GeoDetail }): JSX.Element {
  const rate =
    data.totalPrompts > 0 ? Math.round((data.totalMentions / data.totalPrompts) * 100) : 0

  return (
    <Card>
      <CardHead title="Share of voice by engine" />
      <div className="flex items-baseline gap-1.5">
        <span className="text-[26px] font-bold tracking-tight text-[var(--cat-ink)]">{rate}%</span>
        <span className="text-[12px] text-[var(--cat-ink-3)]">
          mention rate · {data.totalMentions} of {data.totalPrompts} prompts
        </span>
      </div>
      <div className="mt-3 flex flex-col gap-3">
        {data.engines.map(engine => (
          <EngineRow key={engine.key} engine={engine} />
        ))}
      </div>
    </Card>
  )
}
