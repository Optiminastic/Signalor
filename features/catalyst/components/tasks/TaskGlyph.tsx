'use client'

import { Favicon } from '@/components/Favicon'
import { TaskTypeIcon } from '@/features/catalyst/components/agent/TaskTypeIcon'
import { LOGO_SIZE } from '@/features/catalyst/constants'
import { TASK_TYPE_LABEL, taskTypeOf, type TaskType } from '@/features/catalyst/tasks-data'

interface TaskGlyphProps {
  title: string
  description?: string
  size?: number
}

/** First domain-like token in the text (e.g. "youtube.com"), or '' if none. */
function domainInText(text: string): string {
  const match = text.match(/\b((?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,})\b/i)
  return match ? match[1].toLowerCase() : ''
}

/** The task-type category icon in a muted tile — used when there's no site logo. */
function TypeTile({ type, size }: { type: TaskType; size: number }): JSX.Element {
  return (
    <span
      title={TASK_TYPE_LABEL[type]}
      className="grid h-full w-full place-items-center rounded-md bg-[var(--cat-hover)] text-[var(--cat-ink-2)]"
    >
      <TaskTypeIcon type={type} size={Math.round(size * 0.62)} />
    </span>
  )
}

/**
 * A task's leading glyph: the referenced site's real favicon for placement tasks
 * (e.g. "Get mentioned on youtube.com"), otherwise the task-type category icon.
 * Keeps a consistent square footprint so task-name columns stay aligned.
 */
export function TaskGlyph({
  title,
  description,
  size = LOGO_SIZE.base,
}: TaskGlyphProps): JSX.Element {
  const type = taskTypeOf({ title, description })
  const domain = domainInText(title)
  return (
    <span
      className="grid shrink-0 place-items-center overflow-hidden"
      style={{ width: size, height: size }}
    >
      {domain ? (
        <Favicon
          url={domain}
          size={size}
          className="h-full w-full rounded object-contain"
          fallback={<TypeTile type={type} size={size} />}
        />
      ) : (
        <TypeTile type={type} size={size} />
      )}
    </span>
  )
}
