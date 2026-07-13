import { Check } from 'lucide-react'

import { useTaskFix } from '@/features/catalyst/components/autofix/AutoFixContext'
import { AutoFixControl } from '@/features/catalyst/components/autofix/AutoFixControl'
import { AssigneeStack } from '@/features/catalyst/components/tasks/AssigneeStack'
import { PriorityTag } from '@/features/catalyst/components/tasks/PriorityTag'
import { ProgressCell } from '@/features/catalyst/components/tasks/ProgressCell'
import { ProjectTag } from '@/features/catalyst/components/tasks/ProjectTag'
import type { TaskItem } from '@/features/catalyst/tasks-data'

export interface TaskCardProps {
  row: TaskItem
  canAssign: boolean
  assignableEmails: string[]
  onAssign: (taskId: number, assigneeEmail: string) => void
  onToggleDone: (taskId: number, done: boolean) => void
  busy: boolean
}

function DoneToggle({
  done,
  busy,
  onClick,
}: {
  done: boolean
  busy: boolean
  onClick: () => void
}): JSX.Element {
  return (
    <button
      type="button"
      disabled={busy}
      onClick={onClick}
      aria-label={done ? 'Mark task not done' : 'Mark task done'}
      className={`grid h-[16px] w-[16px] shrink-0 place-items-center rounded-sm border disabled:opacity-50 ${
        done
          ? 'border-[#e04a3d] bg-[#e04a3d] text-white'
          : 'border-[var(--cat-border)] hover:border-[#e04a3d]'
      }`}
    >
      {done && <Check size={11} strokeWidth={3} />}
    </button>
  )
}

function CardAssignee({
  row,
  canAssign,
  assignableEmails,
  onAssign,
  busy,
}: Omit<TaskCardProps, 'onToggleDone'>): JSX.Element {
  if (!canAssign) return <AssigneeStack email={row.assigneeEmail} />
  return (
    <select
      value={row.assigneeEmail}
      disabled={busy}
      onChange={e => onAssign(row.taskId, e.target.value)}
      className="h-8 w-full rounded-md border border-[var(--cat-border)] bg-[var(--cat-card)] px-2 text-[12px] font-medium text-[var(--cat-ink-2)] outline-none disabled:opacity-60"
    >
      <option value="">Unassigned</option>
      {assignableEmails.map(email => (
        <option key={email} value={email}>
          {email}
        </option>
      ))}
    </select>
  )
}

function CardAutoFix({ recommendationId }: { recommendationId?: number }): JSX.Element | null {
  const fix = useTaskFix(recommendationId)
  if (!fix) return null
  return <AutoFixControl state={fix.state} onFix={fix.onFix} />
}

export function TaskCard(props: TaskCardProps): JSX.Element {
  const { row } = props
  const done = row.progress === 100
  return (
    <div className="flex flex-col gap-3 rounded-md border border-[var(--cat-border)] bg-[var(--cat-card)] p-3.5 transition-colors hover:bg-[var(--cat-hover)]">
      <div className="flex items-start gap-2">
        <DoneToggle
          done={done}
          busy={props.busy}
          onClick={() => props.onToggleDone(row.taskId, !done)}
        />
        <span className="min-w-0 flex-1 text-[13px] font-semibold text-[var(--cat-ink)]">
          {row.name}
        </span>
        <PriorityTag priority={row.priority} />
      </div>
      <p className="line-clamp-2 text-[12px] text-[var(--cat-ink-2)]">{row.description}</p>
      <div className="flex items-center justify-between gap-2">
        <ProjectTag project={row.project} />
        <span className="text-[12px] whitespace-nowrap text-[var(--cat-ink-3)]">{row.due}</span>
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-[var(--cat-border-soft)] pt-3">
        <div className="min-w-0 flex-1">
          <CardAssignee
            row={row}
            canAssign={props.canAssign}
            assignableEmails={props.assignableEmails}
            onAssign={props.onAssign}
            busy={props.busy}
          />
        </div>
        <ProgressCell value={row.progress} />
      </div>
      <CardAutoFix recommendationId={row.recommendationId} />
    </div>
  )
}
