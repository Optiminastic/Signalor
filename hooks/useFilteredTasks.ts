'use client'

import { useMemo } from 'react'

import { filterTasks, type TaskItem } from '@/features/catalyst/tasks-data'
import { useTaskFiltersStore } from '@/stores/useTaskFiltersStore'

import type { TasksData } from './useTasks'

/** Applies the shared toolbar filters (search, status tab, assignee, priority)
 *  to the fetched task rows. Returns [] until data has loaded. */
export function useFilteredTasks(data: TasksData | undefined): TaskItem[] {
  const search = useTaskFiltersStore(s => s.search)
  const status = useTaskFiltersStore(s => s.status)
  const assignee = useTaskFiltersStore(s => s.assignee)
  const priority = useTaskFiltersStore(s => s.priority)

  return useMemo(
    () => (data ? filterTasks(data.rows, { search, status, assignee, priority }) : []),
    [data, search, status, assignee, priority],
  )
}
