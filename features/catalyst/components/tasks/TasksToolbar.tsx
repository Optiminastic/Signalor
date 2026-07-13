import { TaskSearchInput } from '@/features/catalyst/components/tasks/TaskSearchInput'
import { TaskStatusTabs } from '@/features/catalyst/components/tasks/TaskStatusTabs'
import { TasksViewToggle } from '@/features/catalyst/components/tasks/TasksViewToggle'
import { TaskToolbarActions } from '@/features/catalyst/components/tasks/TaskToolbarActions'
import type { StatusTab } from '@/features/catalyst/tasks-data'

interface TasksToolbarProps {
  tabs: StatusTab[]
  assignableEmails: string[]
}

export function TasksToolbar({ tabs, assignableEmails }: TasksToolbarProps): JSX.Element {
  return (
    <div className="cat-rise flex shrink-0 flex-wrap items-center gap-2 border-b border-[var(--cat-border)] pb-3">
      <TaskSearchInput />
      <TasksViewToggle />
      <div className="hidden lg:block">
        <TaskStatusTabs tabs={tabs} />
      </div>
      <div className="ml-auto">
        <TaskToolbarActions assignableEmails={assignableEmails} />
      </div>
    </div>
  )
}
