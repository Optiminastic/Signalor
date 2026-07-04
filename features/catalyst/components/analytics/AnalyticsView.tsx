import { AI_SOURCES, ANALYTICS_STATS, TOP_PAGES } from '@/features/catalyst/analytics-data'
import { TickBar } from '@/features/catalyst/components/brands/BrandBits'
import { DashHeader, DashStatRow } from '@/features/catalyst/components/dash/DashStat'

const PANEL = 'rounded-lg border border-[var(--cat-border)] bg-[var(--cat-card)]'
const PANEL_HEAD =
  'border-b border-[var(--cat-border)] px-4 py-3 text-[13px] font-semibold text-[var(--cat-ink)]'

function SourcesPanel(): JSX.Element {
  return (
    <div className={PANEL}>
      <p className={PANEL_HEAD}>AI referral sources</p>
      <div className="divide-y divide-[var(--cat-border)]">
        {AI_SOURCES.map(s => (
          <div key={s.source} className="flex items-center gap-3 px-4 py-3">
            <span className="w-20 shrink-0 text-[13px] font-medium text-[var(--cat-ink)]">
              {s.source}
            </span>
            <div className="flex-1">
              <TickBar value={s.share} ticks={18} />
            </div>
            <span className="w-14 shrink-0 text-right text-[12px] text-[var(--cat-ink-3)] tabular-nums">
              {s.sessions}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TopPagesPanel(): JSX.Element {
  return (
    <div className={PANEL}>
      <p className={PANEL_HEAD}>Top pages · AI share</p>
      <div className="divide-y divide-[var(--cat-border)]">
        {TOP_PAGES.map(p => (
          <div key={p.path} className="flex items-center gap-3 px-4 py-3">
            <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-[var(--cat-ink)]">
              {p.path}
            </span>
            <span className="w-16 shrink-0 text-right text-[12px] text-[var(--cat-ink-3)] tabular-nums">
              {p.sessions}
            </span>
            <span className="w-12 shrink-0 text-right text-[12px] font-semibold text-[#e04a3d] tabular-nums">
              {p.aiShare}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AnalyticsView(): JSX.Element {
  return (
    <div className="w-full">
      <DashHeader
        title="Analytics"
        subtitle="How much traffic AI engines send you, and where it lands."
      />
      <div className="mb-5">
        <DashStatRow stats={ANALYTICS_STATS} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <SourcesPanel />
        <TopPagesPanel />
      </div>
    </div>
  )
}
