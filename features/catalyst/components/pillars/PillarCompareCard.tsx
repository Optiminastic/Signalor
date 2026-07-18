import { Card } from '@/features/catalyst/components/Card'
import { CardHead } from '@/features/catalyst/components/CardHead'
import { GroupedColumns } from '@/features/catalyst/components/GroupedColumns'
import { BRAND, GREEN } from '@/features/catalyst/constants'
import type { PillarBreakdown } from '@/hooks/usePillarBreakdown'

const SHORT_LABEL: Record<string, string> = {
  'E-E-A-T': 'EEAT',
  Technical: 'Tech',
  'AI Visibility': 'AI Vis',
}

function LegendDot({ color, children }: { color: string; children: string }): JSX.Element {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {children}
    </span>
  )
}

/** Grouped columns — each pillar's root-page score next to the site average. */
export function PillarCompareCard({ data }: { data: PillarBreakdown }): JSX.Element {
  const groups = data.pillars.map(pillar => ({
    label: SHORT_LABEL[pillar.label] ?? pillar.label,
    a: pillar.score,
    b: pillar.siteAvg,
  }))
  return (
    <Card className="xl:col-span-2">
      <CardHead title="Scores by pillar" />
      <div className="mb-1 flex items-center gap-4 text-[11px] text-[var(--cat-ink-2)]">
        <LegendDot color={BRAND}>This page</LegendDot>
        <LegendDot color={GREEN}>
          {`Site average · ${data.pageCount} ${data.pageCount === 1 ? 'page' : 'pages'}`}
        </LegendDot>
      </div>
      <GroupedColumns groups={groups} colorA={BRAND} colorB={GREEN} className="mt-auto w-full" />
    </Card>
  )
}
