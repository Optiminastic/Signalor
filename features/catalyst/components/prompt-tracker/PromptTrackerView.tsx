'use client'

import { Loader2, Plus } from 'lucide-react'
import { useState } from 'react'

import { DataState } from '@/features/catalyst/components/DataState'
import { PrimaryButton } from '@/features/catalyst/components/PrimaryButton'
import { FaqBuilderCard } from '@/features/catalyst/components/prompt-tracker/FaqBuilderCard'
import { NewPromptForm } from '@/features/catalyst/components/prompt-tracker/NewPromptForm'
import { PromptRow } from '@/features/catalyst/components/prompt-tracker/PromptRow'
import { TaskStatCard } from '@/features/catalyst/components/tasks/TaskStatCard'
import { useActiveProject } from '@/hooks/useActiveProject'
import { usePromptMutations } from '@/hooks/usePromptMutations'
import { usePrompts, type PromptTrackerData } from '@/hooks/usePrompts'

interface ResultsProps {
  data: PromptTrackerData
  busyId: number | null
  onRecheck: (trackId: number) => void
  onRemove: (trackId: number) => void
}

function PromptResults({ data, busyId, onRecheck, onRemove }: ResultsProps): JSX.Element {
  return (
    <>
      <div className="cat-stagger mb-3 grid grid-cols-2 gap-2 xl:grid-cols-4">
        {data.stats.map(stat => (
          <TaskStatCard key={stat.label} stat={stat} />
        ))}
      </div>
      {data.hasPending && (
        <p className="mb-2 flex items-center gap-1.5 text-[11px] text-[var(--cat-ink-3)]">
          <Loader2 size={12} className="animate-spin" />
          Some prompts are still being answered. This list refreshes automatically.
        </p>
      )}
      <div className="cat-rise divide-y divide-[var(--cat-border)] overflow-hidden rounded-md border border-[var(--cat-border)] bg-[var(--cat-card)]">
        {data.prompts.map(p => (
          <PromptRow
            key={p.id}
            item={p}
            busy={busyId === p.id}
            onRecheck={onRecheck}
            onRemove={onRemove}
          />
        ))}
      </div>
    </>
  )
}

function TrackerHeader({ onNewPrompt }: { onNewPrompt: () => void }): JSX.Element {
  return (
    <div className="cat-rise mb-4 flex flex-wrap items-center gap-3">
      <div className="min-w-0">
        <h1 className="text-[19px] font-bold tracking-tight text-[var(--cat-ink)]">
          Prompt Tracker
        </h1>
        <p className="text-[13px] text-[var(--cat-ink-2)]">
          Watch how AI engines answer the prompts that matter to your category
        </p>
      </div>
      <div className="ml-auto">
        <PrimaryButton icon={Plus} onClick={onNewPrompt}>
          New prompt
        </PrimaryButton>
      </div>
    </div>
  )
}

export function PromptTrackerView(): JSX.Element {
  const { slug, isLoading: projectLoading } = useActiveProject()
  const { data, isLoading, isError } = usePrompts(slug)
  const { add, recheck, remove, isAdding, busyId } = usePromptMutations(slug)
  const [composing, setComposing] = useState(false)

  return (
    <div className="w-full">
      <TrackerHeader onNewPrompt={() => setComposing(c => !c)} />
      {composing && (
        <NewPromptForm isAdding={isAdding} onSubmit={add} onClose={() => setComposing(false)} />
      )}
      <DataState
        isLoading={projectLoading || isLoading}
        isError={isError}
        isEmpty={!slug || !data || data.prompts.length === 0}
        emptyTitle="No prompts tracked yet"
        emptyHint="Track a prompt to see how ChatGPT, Gemini, Perplexity and the rest answer it."
      >
        {data && (
          <>
            <PromptResults data={data} busyId={busyId} onRecheck={recheck} onRemove={remove} />
            {slug && data.prompts.length > 0 && <FaqBuilderCard slug={slug} />}
          </>
        )}
      </DataState>
    </div>
  )
}
