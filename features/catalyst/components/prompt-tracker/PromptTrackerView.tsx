import { Plus, TrendingDown, TrendingUp } from 'lucide-react'

import { TickBar } from '@/features/catalyst/components/brands/BrandBits'
import { DashHeader, DashStatRow } from '@/features/catalyst/components/dash/DashStat'
import { PROMPTS, TRACKER_STATS, type TrackedPrompt } from '@/features/catalyst/prompt-tracker-data'
import { scoreColor } from '@/features/catalyst/visibility-data'

function TrendIcon({ trend }: { trend: TrackedPrompt['trend'] }): JSX.Element | null {
  if (trend === 'up') return <TrendingUp size={14} className="text-[#2FBE7E]" />
  if (trend === 'down') return <TrendingDown size={14} className="text-[#E5484D]" />
  return <span className="text-[var(--cat-ink-3)]">—</span>
}

function CitedChip({ cited }: { cited: boolean }): JSX.Element {
  return cited ? (
    <span className="rounded-sm bg-[rgba(47,190,126,0.12)] px-1.5 py-0.5 text-[10px] font-medium text-[#2FBE7E]">
      Cited
    </span>
  ) : (
    <span className="rounded-sm bg-[var(--cat-hover)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--cat-ink-3)]">
      Not cited
    </span>
  )
}

function EngineChips({ engines }: { engines: string[] }): JSX.Element {
  return (
    <div className="hidden w-40 shrink-0 flex-wrap gap-1 sm:flex">
      {engines.length === 0 && <span className="text-[11px] text-[var(--cat-ink-3)]">—</span>}
      {engines.map(e => (
        <span
          key={e}
          className="rounded-sm border border-[var(--cat-border)] px-1.5 py-0.5 text-[10px] text-[var(--cat-ink-2)]"
        >
          {e}
        </span>
      ))}
    </div>
  )
}

function PromptRow({ item }: { item: TrackedPrompt }): JSX.Element {
  return (
    <div className="flex items-center gap-4 px-4 py-3.5">
      <span
        className="w-8 shrink-0 text-center text-[15px] font-semibold tabular-nums"
        style={{ color: scoreColor(item.score) }}
      >
        {item.score}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-[var(--cat-ink)]">{item.prompt}</p>
        <div className="mt-1.5 flex items-center gap-2">
          <TickBar value={item.score} ticks={16} />
          <CitedChip cited={item.cited} />
        </div>
      </div>
      <EngineChips engines={item.engines} />
      <span className="hidden w-12 shrink-0 text-right text-[12px] text-[var(--cat-ink-3)] tabular-nums sm:inline">
        {item.runs}
      </span>
      <span className="w-5 shrink-0 text-center">
        <TrendIcon trend={item.trend} />
      </span>
    </div>
  )
}

export function PromptTrackerView(): JSX.Element {
  return (
    <div className="w-full">
      <DashHeader
        title="Prompt Tracker"
        subtitle="Watch how AI engines answer the prompts that matter to your category."
        action={
          <button
            type="button"
            className="flex h-9 items-center gap-1.5 rounded-md px-3.5 text-[13px] font-medium text-white"
            style={{ background: '#e04a3d' }}
          >
            <Plus size={15} />
            New prompt
          </button>
        }
      />
      <div className="mb-5">
        <DashStatRow stats={TRACKER_STATS} />
      </div>
      <div className="divide-y divide-[var(--cat-border)] overflow-hidden rounded-lg border border-[var(--cat-border)] bg-[var(--cat-card)]">
        {PROMPTS.map(p => (
          <PromptRow key={p.id} item={p} />
        ))}
      </div>
    </div>
  )
}
