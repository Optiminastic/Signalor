import { Card } from '@/features/catalyst/components/Card'
import { CardHead } from '@/features/catalyst/components/CardHead'
import { Metric } from '@/features/catalyst/components/Metric'
import { Radar, type RadarSeries } from '@/features/catalyst/components/Radar'
import { BRAND, GREEN } from '@/features/catalyst/constants'
import type { PillarBreakdown } from '@/hooks/usePillarBreakdown'

function LegendChip({ color, children }: { color: string; children: string }): JSX.Element {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm bg-[var(--cat-card)] px-2.5 py-[5px] text-xs font-semibold text-[var(--cat-ink)] shadow-sm">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {children}
    </span>
  )
}

/** Pillar balance radar — the root page's shape overlaid on the site average. */
export function PillarRadarCard({ data }: { data: PillarBreakdown }): JSX.Element {
  const axes = data.pillars.map(p => p.label)
  const series: RadarSeries[] = [
    { vals: data.pillars.map(p => p.siteAvg / 100), color: GREEN },
    { vals: data.pillars.map(p => p.score / 100), color: BRAND },
  ]
  return (
    <Card>
      <CardHead title="Pillar balance" />
      <Metric
        value={`${data.composite}`}
        positive
        badge={data.strongest ? `${data.strongest.label} leads` : '—'}
      />
      <div className="my-1.5 inline-flex gap-1 self-start rounded-md bg-[var(--cat-track)] p-[3px]">
        <LegendChip color={BRAND}>This page</LegendChip>
        <LegendChip color={GREEN}>Site average</LegendChip>
      </div>
      <Radar axes={axes} series={series} />
    </Card>
  )
}
