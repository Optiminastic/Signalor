import { TrendingUp } from 'lucide-react'

import { Card } from '@/features/catalyst/components/Card'
import { CardHead } from '@/features/catalyst/components/CardHead'
import type { TaskDetail } from '@/hooks/useTaskDetail'

/** What the task is and why it matters, with the analyzer's impact estimate. */
export function TaskDescriptionCard({ task }: { task: TaskDetail }): JSX.Element {
  return (
    <Card>
      <CardHead title="Why this matters" />
      <p className="text-[13px] leading-relaxed whitespace-pre-line text-[var(--cat-ink-2)]">
        {task.description || 'No description was generated for this task.'}
      </p>
      {task.impactNote && (
        <p className="mt-3 flex items-center gap-1.5 border-t border-[var(--cat-border-soft)] pt-2.5 text-[12px] font-medium text-[#2FBE7E]">
          <TrendingUp size={14} strokeWidth={2.2} />
          {task.impactNote}
        </p>
      )}
    </Card>
  )
}
