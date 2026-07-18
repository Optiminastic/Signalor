'use client'

import { Check, ChevronLeft } from 'lucide-react'
import { useParams } from 'next/navigation'

import { TransitionLink } from '@/components/TransitionLink'
import { ActionCtaButton } from '@/features/catalyst/components/agent/ActionCtaButton'
import { TaskTypeIcon } from '@/features/catalyst/components/agent/TaskTypeIcon'
import { DataState } from '@/features/catalyst/components/DataState'
import { TaskAutoFixButton } from '@/features/catalyst/components/tasks/detail/TaskAutoFixButton'
import { TaskDescriptionCard } from '@/features/catalyst/components/tasks/detail/TaskDescriptionCard'
import { TaskDetailInfo } from '@/features/catalyst/components/tasks/detail/TaskDetailInfo'
import { TaskDetailStats } from '@/features/catalyst/components/tasks/detail/TaskDetailStats'
import { TaskFixGuide } from '@/features/catalyst/components/tasks/detail/TaskFixGuide'
import { TaskFixResultCard } from '@/features/catalyst/components/tasks/detail/TaskFixResultCard'
import { TaskShareMenu } from '@/features/catalyst/components/tasks/detail/TaskShareMenu'
import { formatStatus, TASK_TYPE_LABEL, taskTypeOf } from '@/features/catalyst/tasks-data'
import { useAgentMutations } from '@/hooks/useAgentPlan'
import { useBrandPath } from '@/hooks/useBrandPath'
import { useTaskAutoFix, type TaskAutoFix } from '@/hooks/useTaskAutoFix'
import { useTaskDetail, type TaskDetail } from '@/hooks/useTaskDetail'

function BackLink(): JSX.Element {
  const brandPath = useBrandPath()
  return (
    <TransitionLink
      href={brandPath('tasks')}
      className="inline-flex items-center gap-0.5 text-[12px] font-medium text-[var(--cat-ink-2)] transition-colors hover:text-[var(--cat-ink)]"
    >
      <ChevronLeft size={14} />
      All tasks
    </TransitionLink>
  )
}

const STATUS_PILL: Record<string, string> = {
  completed: 'bg-[#E7F7EF] text-[#1e8a5c]',
  verified: 'bg-[#E7F7EF] text-[#1e8a5c]',
  in_progress: 'bg-[rgba(246,185,59,0.15)] text-[#a06f0a]',
}

function StatusPill({ status }: { status: string }): JSX.Element {
  const tone = STATUS_PILL[status] ?? 'bg-[var(--cat-hover)] text-[var(--cat-ink-2)]'
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${tone}`}
    >
      {formatStatus(status)}
    </span>
  )
}

function CompleteButton({ task }: { task: TaskDetail }): JSX.Element | null {
  const { setStatus, busyActionId } = useAgentMutations()
  if (task.status === 'completed' || task.status === 'verified') return null
  const busy = busyActionId === task.id
  return (
    <button
      type="button"
      disabled={busy}
      onClick={() => setStatus(task.id, 'completed')}
      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[var(--cat-border)] bg-[var(--cat-card)] px-3 text-[12px] font-medium text-[var(--cat-ink-2)] transition-colors hover:bg-[var(--cat-hover)] disabled:opacity-60"
    >
      <Check size={13} />
      Mark complete
    </button>
  )
}

interface DetailHeaderProps {
  task: TaskDetail
  fix: TaskAutoFix
}

function DetailHeader({ task, fix }: DetailHeaderProps): JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="min-w-0 flex-1">
        <BackLink />
        <h1 className="mt-1 flex items-center gap-2.5 text-[19px] font-bold tracking-tight text-[var(--cat-ink)]">
          <span
            title={TASK_TYPE_LABEL[taskTypeOf(task)]}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[var(--cat-hover)] text-[var(--cat-ink-2)]"
          >
            <TaskTypeIcon type={taskTypeOf(task)} size={17} />
          </span>
          {task.isTopFix && <span className="shrink-0 text-[#e04a3d]">★</span>}
          <span className="truncate">{task.title}</span>
        </h1>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <StatusPill status={task.status} />
        <TaskShareMenu task={task} />
        <TaskAutoFixButton fix={fix} />
        {task.planAction && <ActionCtaButton action={task.planAction} />}
        <CompleteButton task={task} />
      </div>
    </div>
  )
}

/** Full-page view of a single task, routed at /dashboard/[slug]/tasks/[taskId]. */
export function TaskDetailView(): JSX.Element {
  const params = useParams()
  const taskId = Number(typeof params?.taskId === 'string' ? params.taskId : NaN)
  const { task, isLoading, isError, notFound } = useTaskDetail(taskId)
  const fix = useTaskAutoFix(task)

  return (
    <>
      {/* z-20: the cat-rise transform creates a stacking context, so without an
          explicit z-index the header's dropdowns paint under the body cards. */}
      <div className="cat-rise relative z-20 shrink-0 border-b border-[var(--cat-border)] pb-4">
        {task ? <DetailHeader task={task} fix={fix} /> : <BackLink />}
      </div>
      <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-0.5">
        <DataState
          isLoading={isLoading}
          isError={isError}
          isEmpty={notFound || !task}
          emptyTitle="Task not found"
          emptyHint="This task does not exist for your account. It may have been removed when the plan was refreshed."
        >
          {task && (
            <div className="cat-stagger flex flex-col gap-2">
              <TaskDetailStats task={task} />
              <div className="grid grid-cols-1 items-start gap-2 xl:grid-cols-3">
                <div className="flex flex-col gap-2 xl:col-span-2">
                  <TaskFixResultCard fix={fix} />
                  <TaskDescriptionCard task={task} />
                  {task.actionGuide && <TaskFixGuide guide={task.actionGuide} />}
                </div>
                <TaskDetailInfo task={task} />
              </div>
            </div>
          )}
        </DataState>
      </div>
    </>
  )
}
