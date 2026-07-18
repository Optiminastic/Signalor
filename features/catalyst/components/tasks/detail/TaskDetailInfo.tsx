'use client'

import { TaskTypeIcon } from '@/features/catalyst/components/agent/TaskTypeIcon'
import { TickBar } from '@/features/catalyst/components/brands/BrandBits'
import { Card } from '@/features/catalyst/components/Card'
import { CardHead } from '@/features/catalyst/components/CardHead'
import { formatTaskDate, TASK_TYPE_LABEL, taskTypesOf } from '@/features/catalyst/tasks-data'
import { useActiveProject } from '@/hooks/useActiveProject'
import { GEO_PILLARS, usePillars } from '@/hooks/usePillars'
import type { TaskDetail } from '@/hooks/useTaskDetail'

const KIND_LABEL: Record<string, string> = {
  auto: 'Auto-fixable',
  draft: 'AI draft',
  open: 'Manual',
}

function InfoRow({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div className="flex items-center justify-between gap-3 text-[13px]">
      <span className="shrink-0 text-[var(--cat-ink-3)]">{label}</span>
      <span className="truncate font-medium text-[var(--cat-ink)]">{value}</span>
    </div>
  )
}

/** Every type the task matches, as icon chips — tasks can span several. */
function TypeChips({ task }: { task: TaskDetail }): JSX.Element {
  return (
    <div className="flex items-start justify-between gap-3 text-[13px]">
      <span className="shrink-0 text-[var(--cat-ink-3)]">Type</span>
      <span className="flex flex-wrap justify-end gap-1.5">
        {taskTypesOf(task).map(type => (
          <span
            key={type}
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--cat-border)] bg-[var(--cat-hover)] px-2 py-0.5 text-[11px] font-medium text-[var(--cat-ink-2)]"
          >
            <TaskTypeIcon type={type} size={12} />
            {TASK_TYPE_LABEL[type]}
          </span>
        ))}
      </span>
    </div>
  )
}

/** The affected pillar's current score — the number this task should move. */
function PillarScoreRow({ pillar }: { pillar: string }): JSX.Element | null {
  const { slug } = useActiveProject()
  const { data } = usePillars(slug)
  const label = GEO_PILLARS.find(p => String(p.key) === `${pillar}_score`)?.label
  const score = data?.pillars.find(p => p.label === label)?.score
  if (!label || score === undefined) return null
  return (
    <div className="flex items-center justify-between gap-3 text-[13px]">
      <span className="shrink-0 text-[var(--cat-ink-3)]">{label} today</span>
      <span className="flex items-center gap-2">
        <TickBar value={score} ticks={12} showValue={false} />
        <span className="font-medium text-[var(--cat-ink)] tabular-nums">{score}/100</span>
      </span>
    </div>
  )
}

function AutoFixRow({ available }: { available: boolean }): JSX.Element {
  return (
    <div className="flex items-center justify-between gap-3 text-[13px]">
      <span className="shrink-0 text-[var(--cat-ink-3)]">Auto-fix</span>
      {available ? (
        <span className="rounded-sm bg-[rgba(47,190,126,0.12)] px-1.5 py-0.5 text-[11px] font-semibold text-[#2FBE7E]">
          Available
        </span>
      ) : (
        <span className="font-medium text-[var(--cat-ink)]">Manual only</span>
      )}
    </div>
  )
}

/** The task's metadata sidebar: types, pillar context, execution and ownership. */
export function TaskDetailInfo({ task }: { task: TaskDetail }): JSX.Element {
  const pillarLabel = GEO_PILLARS.find(p => String(p.key) === `${task.pillar}_score`)?.label
  return (
    <Card>
      <CardHead title="Details" />
      <div className="flex flex-col gap-2.5">
        <TypeChips task={task} />
        <PillarScoreRow pillar={task.pillar} />
        <InfoRow label="Pillar" value={pillarLabel ?? (task.pillar || '—')} />
        <InfoRow label="Group" value={task.group || '—'} />
        <InfoRow
          label="Execution"
          value={task.planAction ? (KIND_LABEL[task.planAction.kind] ?? 'Manual') : 'Manual'}
        />
        <AutoFixRow available={task.canAutoFix} />
        <InfoRow label="Plan rank" value={task.rank > 0 ? `#${task.rank}` : '—'} />
        <InfoRow label="Top fix" value={task.isTopFix ? 'Yes' : 'No'} />
        <InfoRow label="Assignee" value={task.assigneeEmail || 'Unassigned'} />
        <InfoRow label="Created" value={formatTaskDate(task.createdAt)} />
      </div>
    </Card>
  )
}
