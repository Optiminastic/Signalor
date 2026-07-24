import { TaskRow } from '@/features/catalyst/components/tasks/TaskRow'
import type { TaskItem } from '@/features/catalyst/tasks-data'
import { ChevronsUpDown } from '@/lib/icons'

// Project is dropped — the dashboard is scoped to one brand, so it was the same
// value on every row. The table is fixed-layout (never scrolls horizontally):
// Task flexes to fill, the rest have capped widths, and Description / Due Date
// collapse on narrower widths. Column widths here MUST stay in sync with TaskRow's
// cells, which truncate to fit.
const COLS: { label: string; className: string }[] = [
  { label: 'Task', className: 'px-3' },
  { label: 'Description', className: 'hidden px-3 xl:table-cell' },
  { label: 'Assignee', className: 'px-3 w-[150px]' },
  { label: 'Due Date', className: 'hidden px-3 lg:table-cell w-[120px]' },
  { label: 'Priority', className: 'px-3 w-[128px]' },
  { label: 'Progress', className: 'px-3 w-[128px]' },
  { label: 'Auto-fix', className: 'px-3 w-[120px]' },
]

function TaskTableHead(): JSX.Element {
  return (
    <thead>
      <tr className="border-b border-[var(--cat-border)] bg-[var(--cat-hover)]">
        {COLS.map(col => (
          <th
            key={col.label}
            className={`py-2.5 text-left text-[12px] font-medium text-[var(--cat-ink-2)] ${col.className}`}
          >
            <span className="inline-flex items-center gap-1">
              {col.label}
              <ChevronsUpDown size={12} className="text-[var(--cat-ink-3)]" />
            </span>
          </th>
        ))}
      </tr>
    </thead>
  )
}

export interface TaskTableProps {
  rows: TaskItem[]
  canAssign: boolean
  assignableEmails: string[]
  onAssign: (taskId: number, assigneeEmail: string) => void
  onToggleDone: (taskId: number, done: boolean) => void
  busy: boolean
}

export function TaskTable({
  rows,
  canAssign,
  assignableEmails,
  onAssign,
  onToggleDone,
  busy,
}: TaskTableProps): JSX.Element {
  return (
    <div className="w-full">
      <table className="w-full table-fixed border-collapse text-[13px]">
        <TaskTableHead />
        <tbody>
          {rows.map(row => (
            <TaskRow
              key={row.taskId}
              row={row}
              canAssign={canAssign}
              assignableEmails={assignableEmails}
              onAssign={onAssign}
              onToggleDone={onToggleDone}
              busy={busy}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
