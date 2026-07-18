'use client'

import { Card } from '@/features/catalyst/components/Card'
import { CardHead } from '@/features/catalyst/components/CardHead'
import { GroupedColumns } from '@/features/catalyst/components/GroupedColumns'
import { BLUE, BRAND } from '@/features/catalyst/constants'
import { useActiveProject } from '@/hooks/useActiveProject'
import { usePillars } from '@/hooks/usePillars'
import type { Competitor, PageScore } from '@/lib/api/analyzer'

/** The static pillars competitors are scored on (no LLM probes for rivals). */
const STATIC_PILLARS: { field: keyof PageScore; label: string; short: string }[] = [
  { field: 'content_score', label: 'Content', short: 'Content' },
  { field: 'schema_score', label: 'Schema', short: 'Schema' },
  { field: 'eeat_score', label: 'E-E-A-T', short: 'EEAT' },
  { field: 'technical_score', label: 'Technical', short: 'Tech' },
]

function numberOf(page: PageScore, field: keyof PageScore): number {
  const value = page[field]
  return typeof value === 'number' ? Math.round(value) : 0
}

function LegendDot({ color, children }: { color: string; children: string }): JSX.Element {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {children}
    </span>
  )
}

/** Pillar-by-pillar columns: the user's brand vs this competitor's crawled page. */
export function CompetitorCompareCard({ competitor }: { competitor: Competitor }): JSX.Element {
  const { slug } = useActiveProject()
  const { data: mine } = usePillars(slug)
  const page = competitor.page_score

  if (!page) {
    return (
      <Card className="xl:col-span-2">
        <CardHead title="Pillar comparison" />
        <p className="my-auto py-6 text-center text-[12px] text-[var(--cat-ink-3)]">
          This competitor has not been crawled and scored yet. Run a new analysis to benchmark its
          pages.
        </p>
      </Card>
    )
  }

  const groups = STATIC_PILLARS.map(pillar => ({
    label: pillar.short,
    a: Math.round(mine?.pillars.find(p => p.label === pillar.label)?.score ?? 0),
    b: numberOf(page, pillar.field),
  }))

  return (
    <Card className="xl:col-span-2">
      <CardHead title="Pillar comparison" />
      <div className="mb-1 flex items-center gap-4 text-[11px] text-[var(--cat-ink-2)]">
        <LegendDot color={BRAND}>Your brand</LegendDot>
        <LegendDot color={BLUE}>{competitor.name}</LegendDot>
      </div>
      <GroupedColumns groups={groups} colorA={BRAND} colorB={BLUE} className="mt-auto w-full" />
    </Card>
  )
}
