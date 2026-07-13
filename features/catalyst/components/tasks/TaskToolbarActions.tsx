'use client'

import { Plus, UserRound } from 'lucide-react'

import { PrimaryButton } from '@/features/catalyst/components/PrimaryButton'
import { FilterMenu, type FilterOption } from '@/features/catalyst/components/tasks/FilterMenu'
import { UNASSIGNED_FILTER, type PriorityFilter } from '@/features/catalyst/tasks-data'
import { useTaskFiltersStore } from '@/stores/useTaskFiltersStore'

const PRIORITY_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All priorities' },
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' },
]

function assigneeOptions(emails: string[]): FilterOption[] {
  return [
    { value: '', label: 'All assignees' },
    { value: UNASSIGNED_FILTER, label: 'Unassigned' },
    ...emails.map(email => ({ value: email, label: email })),
  ]
}

function assigneeLabel(value: string): string {
  if (!value) return 'Assignee'
  if (value === UNASSIGNED_FILTER) return 'Unassigned'
  return value.split('@')[0]
}

export function TaskToolbarActions({
  assignableEmails,
}: {
  assignableEmails: string[]
}): JSX.Element {
  const assignee = useTaskFiltersStore(s => s.assignee)
  const setAssignee = useTaskFiltersStore(s => s.setAssignee)
  const priority = useTaskFiltersStore(s => s.priority)
  const setPriority = useTaskFiltersStore(s => s.setPriority)

  return (
    <div className="flex items-center gap-2">
      <FilterMenu
        icon={UserRound}
        label={assigneeLabel(assignee)}
        options={assigneeOptions(assignableEmails)}
        value={assignee}
        onChange={setAssignee}
        className="hidden md:block"
      />
      <FilterMenu
        label={priority === 'all' ? 'Priority' : priority}
        options={PRIORITY_OPTIONS}
        value={priority}
        onChange={next => setPriority(next as PriorityFilter)}
        className="hidden sm:block"
      />
      <PrimaryButton icon={Plus}>Create Task</PrimaryButton>
    </div>
  )
}
