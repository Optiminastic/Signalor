import { create } from 'zustand'

import type { PriorityFilter, StatusTabKey } from '@/features/catalyst/tasks-data'

interface TaskFiltersState {
  search: string
  status: StatusTabKey
  /** '' = all assignees, UNASSIGNED_FILTER = unassigned, else a teammate email. */
  assignee: string
  priority: PriorityFilter
  setSearch: (search: string) => void
  setStatus: (status: StatusTabKey) => void
  setAssignee: (assignee: string) => void
  setPriority: (priority: PriorityFilter) => void
}

/** Shared toolbar filter state for the Tasks board (search, tab, assignee, priority). */
export const useTaskFiltersStore = create<TaskFiltersState>(set => ({
  search: '',
  status: 'all',
  assignee: '',
  priority: 'all',
  setSearch: search => set({ search }),
  setStatus: status => set({ status }),
  setAssignee: assignee => set({ assignee }),
  setPriority: priority => set({ priority }),
}))
