import type { LucideIcon } from 'lucide-react'

import { GREEN, NEG, YELLOW } from '@/features/catalyst/constants'

export type Priority = 'High' | 'Medium' | 'Low'

/** Concrete task state (drives the To Do / In Progress / Completed tabs). */
export type TaskStatusKey = 'todo' | 'in_progress' | 'completed'

/** A status tab's filter key — task states plus the synthetic "overdue"/"all". */
export type StatusTabKey = TaskStatusKey | 'overdue' | 'all'

/** Priority dropdown value ('all' = no filter). */
export type PriorityFilter = 'all' | Priority

/** Assignee dropdown sentinel for "assigned to nobody". */
export const UNASSIGNED_FILTER = '__unassigned__'

export interface ProjectRef {
  name: string
  initial: string
  color: string
}

export interface TaskItem {
  /** Backend UserAction id — the key for assign / status mutations. */
  taskId: number
  name: string
  child: boolean
  project: ProjectRef
  description: string
  /** Email of the assigned teammate, or '' when unassigned. */
  assigneeEmail: string
  due: string
  priority: Priority
  /** 0 = Not Started, 100 = Done, else "N% Completed". */
  progress: number
  /** Concrete task state, used by the status tabs to filter the board. */
  statusKey: TaskStatusKey
  /** Linked Recommendation id — the key for Auto-fix (undefined = not fixable). */
  recommendationId?: number
}

export interface StatCard {
  icon: LucideIcon
  color: string
  label: string
  value: string
  fill?: boolean
}

export interface StatusTab {
  label: string
  count: number
  key: StatusTabKey
}

export const PRIORITY_COLOR: Record<Priority, string> = {
  High: NEG,
  Medium: YELLOW,
  Low: GREEN,
}

/** Maps a backend UserAction.status to the board's concrete task state. */
export function statusKeyOf(status: string): TaskStatusKey {
  if (status === 'in_progress') return 'in_progress'
  if (status === 'completed' || status === 'verified') return 'completed'
  return 'todo'
}

export interface TaskFilters {
  search: string
  status: StatusTabKey
  /** '' = all, UNASSIGNED_FILTER = unassigned, else a teammate email. */
  assignee: string
  priority: PriorityFilter
}

function matchesAssignee(row: TaskItem, assignee: string): boolean {
  if (!assignee) return true
  const target = assignee === UNASSIGNED_FILTER ? '' : assignee
  return row.assigneeEmail === target
}

function matchesSearch(row: TaskItem, query: string): boolean {
  if (!query) return true
  return row.name.toLowerCase().includes(query) || row.description.toLowerCase().includes(query)
}

/** Applies the toolbar filters (status tab, assignee, priority, search) to the rows. */
export function filterTasks(rows: TaskItem[], filters: TaskFilters): TaskItem[] {
  const query = filters.search.trim().toLowerCase()
  return rows.filter(row => {
    // "overdue" has no backend due date, so it never matches any task.
    if (filters.status === 'overdue') return false
    if (filters.status !== 'all' && row.statusKey !== filters.status) return false
    if (filters.priority !== 'all' && row.priority !== filters.priority) return false
    return matchesAssignee(row, filters.assignee) && matchesSearch(row, query)
  })
}
