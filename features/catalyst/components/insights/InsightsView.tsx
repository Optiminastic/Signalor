'use client'

import { Card } from '@/features/catalyst/components/Card'
import { CardHead } from '@/features/catalyst/components/CardHead'
import { DataState } from '@/features/catalyst/components/DataState'
import { GaSnapshotCard } from '@/features/catalyst/components/insights/GaSnapshotCard'
import { MultiLineChart } from '@/features/catalyst/components/insights/MultiLineChart'
import { TopDomainsCard } from '@/features/catalyst/components/insights/TopDomainsCard'
import { TopEnginesCard } from '@/features/catalyst/components/insights/TopEnginesCard'
import { TaskStatCard } from '@/features/catalyst/components/tasks/TaskStatCard'
import { useActiveProject } from '@/hooks/useActiveProject'
import { useInsights, type InsightsData } from '@/hooks/useInsights'

function LegendDot({ color, children }: { color: string; children: string }): JSX.Element {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--cat-ink-2)]">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {children}
    </span>
  )
}

function TrendCard({ data }: { data: InsightsData }): JSX.Element {
  return (
    <Card>
      <CardHead title="AI citation activity" />
      <div className="mb-1 flex flex-wrap items-center gap-3">
        {data.series.map(s => (
          <LegendDot key={s.key} color={s.color}>
            {s.label}
          </LegendDot>
        ))}
        <span className="ml-auto text-[11px] text-[var(--cat-ink-3)]">
          Weekly brand mention rate per engine, %
        </span>
      </div>
      {data.series.length === 0 ? (
        <p className="py-8 text-center text-[12px] text-[var(--cat-ink-3)]">
          Trend data appears after prompts have been checked across more than one week.
        </p>
      ) : (
        <MultiLineChart series={data.series} xLabels={data.weeks} />
      )}
    </Card>
  )
}

function Body({ data }: { data: InsightsData }): JSX.Element {
  return (
    <div className="cat-stagger flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-5">
        {data.stats.map(stat => (
          <TaskStatCard key={stat.label} stat={stat} />
        ))}
      </div>
      <TrendCard data={data} />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
        <TopEnginesCard sources={data.engines} />
        <TopDomainsCard domains={data.domains} />
        <GaSnapshotCard />
      </div>
    </div>
  )
}

/** 360 Insights — how AI engines cite, mention and send traffic to the brand. */
export function InsightsView(): JSX.Element {
  const { slug, isLoading: projectLoading } = useActiveProject()
  const { data, isLoading, isError } = useInsights(slug)

  return (
    <>
      <div className="cat-rise flex shrink-0 flex-wrap items-center gap-3 border-b border-[var(--cat-border)] pb-4">
        <div className="min-w-0">
          <h1 className="text-[19px] font-bold tracking-tight text-[var(--cat-ink)]">
            360 Insights
          </h1>
          <p className="text-[13px] text-[var(--cat-ink-2)]">
            How AI engines cite your brand, where the citations point, and the traffic behind them
          </p>
        </div>
      </div>
      <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-0.5">
        <DataState
          isLoading={projectLoading || isLoading}
          isError={isError}
          isEmpty={!slug || !data}
          emptyTitle="No insight data yet"
          emptyHint="Run an analysis and track prompts to populate citation insights."
        >
          {data && <Body data={data} />}
        </DataState>
      </div>
    </>
  )
}
