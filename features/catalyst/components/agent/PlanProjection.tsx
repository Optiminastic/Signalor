import { GREEN } from '@/features/catalyst/constants'
import type { AgentPlan } from '@/lib/api/agent'
import {
  CalendarClock,
  CheckCircle2,
  Inbox,
  ListTodo,
  TrendingUp,
  type LucideIcon,
} from '@/lib/icons'

const TICKS = 44
const BRAND_RED = '#e04a3d'

function clampScore(value: number): number {
  return Math.min(100, Math.max(0, value))
}

function shortDate(iso: string | null): string {
  if (!iso) return '—'
  const d = new Date(iso)
  return Number.isNaN(d.getTime())
    ? '—'
    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/** 0–100 tick meter in two tones: solid red = where you are, green = the gain
 *  you'd unlock by completing every open task, empty = still out of reach. */
function ProjectionMeter({
  current,
  projected,
}: {
  current: number
  projected: number
}): JSX.Element {
  const cur = Math.round((clampScore(current) / 100) * TICKS)
  const proj = Math.round((clampScore(projected) / 100) * TICKS)
  const tickColor = (i: number): string => {
    if (i < cur) return BRAND_RED
    if (i < proj) return GREEN
    return 'var(--cat-hover)'
  }
  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: TICKS }, (_, i) => (
        <span key={i} className="h-7 w-[4px] rounded-[1px]" style={{ background: tickColor(i) }} />
      ))}
    </div>
  )
}

function ScoreEnd({
  value,
  label,
  color,
}: {
  value: number
  label: string
  color: string
}): JSX.Element {
  return (
    <div className="shrink-0 text-center">
      <p className="text-[30px] leading-none font-bold tabular-nums" style={{ color }}>
        {Math.round(value)}
      </p>
      <p className="mt-1 text-[11px] font-medium tracking-wide text-[var(--cat-ink-3)] uppercase">
        {label}
      </p>
    </div>
  )
}

function CompactStat({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}): JSX.Element {
  return (
    <div className="flex items-center gap-2">
      <Icon size={15} className="shrink-0 text-[var(--cat-ink-3)]" />
      <span className="text-[12px] text-[var(--cat-ink-3)]">{label}</span>
      <span className="ml-auto text-[13px] font-semibold text-[var(--cat-ink)] tabular-nums">
        {value}
      </span>
    </div>
  )
}

function ProjectionHeader({ backlog, delta }: { backlog: number; delta: number }): JSX.Element {
  return (
    <div className="flex flex-wrap items-start justify-between gap-2">
      <div>
        <p className="text-[13px] font-semibold text-[var(--cat-ink)]">GEO Score Projection</p>
        <p className="mt-0.5 text-[12px] text-[var(--cat-ink-3)]">
          Where your score lands once all {backlog} open task{backlog === 1 ? '' : 's'} are done
        </p>
      </div>
      {delta > 0 && (
        <span className="inline-flex items-center gap-1 rounded-full bg-[#E7F7EF] px-2.5 py-1 text-[12px] font-semibold text-[#1e8a5c]">
          <TrendingUp size={13} /> +{delta} pts
        </span>
      )}
    </div>
  )
}

function CountsFooter({ plan }: { plan: AgentPlan }): JSX.Element {
  const { today, backlog, done } = plan.counts
  return (
    <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 border-t border-[var(--cat-border-soft)] pt-2.5 sm:grid-cols-2 lg:grid-cols-4">
      <CompactStat icon={ListTodo} label="Today" value={String(today)} />
      <CompactStat icon={Inbox} label="Backlog" value={String(backlog)} />
      <CompactStat icon={CheckCircle2} label="Done" value={String(done)} />
      <CompactStat
        icon={CalendarClock}
        label="Analyzed"
        value={shortDate(plan.brief.last_analyzed_at)}
      />
    </div>
  )
}

/**
 * Replaces the flat stat cards with a real before/after: the current GEO score
 * vs where it lands once every open task is done (backend `projected_score`,
 * grounded in each fix's headroom-clamped impact). Compact counts sit below.
 */
export function PlanProjection({ plan }: { plan: AgentPlan | undefined }): JSX.Element | null {
  if (!plan) return null
  const current = plan.brief.score ?? 0
  const projected = plan.brief.projected_score ?? current
  const delta = Math.max(0, Math.round((projected - current) * 10) / 10)

  return (
    <div className="rounded-md border border-[var(--cat-border)] bg-[var(--cat-card)] p-3">
      <ProjectionHeader backlog={plan.counts.backlog} delta={delta} />
      <div className="mt-3 flex items-center gap-4">
        <ScoreEnd value={current} label="Now" color="var(--cat-ink)" />
        <div className="min-w-0 flex-1 overflow-x-auto">
          <ProjectionMeter current={current} projected={projected} />
        </div>
        <ScoreEnd value={projected} label="Projected" color={GREEN} />
      </div>
      <CountsFooter plan={plan} />
    </div>
  )
}
