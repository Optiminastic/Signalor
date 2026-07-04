import { Check, Zap } from 'lucide-react'

import { DashHeader, DashStatRow } from '@/features/catalyst/components/dash/DashStat'
import {
  PRIORITY_STYLE,
  RECOMMENDATIONS,
  REC_STATS,
  type Recommendation,
} from '@/features/catalyst/recommendations-data'

function RecAction({ item }: { item: Recommendation }): JSX.Element {
  if (item.status === 'done') {
    return (
      <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#2FBE7E]">
        <Check size={14} />
        Done
      </span>
    )
  }
  if (item.auto) {
    return (
      <button
        type="button"
        className="inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-[12px] font-medium text-white"
        style={{ background: '#e04a3d' }}
      >
        <Zap size={13} />
        Auto fix
      </button>
    )
  }
  return (
    <button
      type="button"
      className="inline-flex h-8 items-center rounded-md border border-[var(--cat-border)] px-3 text-[12px] font-medium text-[var(--cat-ink-2)] transition-colors hover:bg-[var(--cat-hover)]"
    >
      View steps
    </button>
  )
}

function RecRow({ item }: { item: Recommendation }): JSX.Element {
  return (
    <div className="flex items-center gap-4 px-4 py-3.5">
      <span
        className={`w-16 shrink-0 rounded-md px-2 py-0.5 text-center text-[11px] font-semibold ${PRIORITY_STYLE[item.priority]}`}
      >
        {item.priority}
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-[13px] font-medium text-[var(--cat-ink)] ${item.status === 'done' ? 'line-through opacity-60' : ''}`}
        >
          {item.title}
        </p>
        <div className="mt-1 flex items-center gap-2 text-[11px] text-[var(--cat-ink-3)]">
          <span className="rounded-sm bg-[var(--cat-hover)] px-1.5 py-0.5 font-medium text-[var(--cat-ink-2)]">
            {item.pillar}
          </span>
          <span>+{item.impact} pts</span>
          <span>· {item.effort}</span>
        </div>
      </div>
      <div className="shrink-0">
        <RecAction item={item} />
      </div>
    </div>
  )
}

export function RecommendationsView(): JSX.Element {
  return (
    <div className="mx-auto w-full max-w-[1100px]">
      <DashHeader
        title="Recommendations"
        subtitle="Prioritised fixes ranked by expected GEO lift — start at the top."
      />
      <div className="mb-5">
        <DashStatRow stats={REC_STATS} />
      </div>
      <div className="divide-y divide-[var(--cat-border)] overflow-hidden rounded-lg border border-[var(--cat-border)] bg-[var(--cat-card)]">
        {RECOMMENDATIONS.map(r => (
          <RecRow key={r.id} item={r} />
        ))}
      </div>
    </div>
  )
}
