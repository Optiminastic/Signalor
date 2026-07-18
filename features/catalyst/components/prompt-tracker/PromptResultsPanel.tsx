import { engineLogo } from '@/features/catalyst/engine-logos'
import type { PromptEngineResult } from '@/features/catalyst/prompt-tracker-data'
import { formatTaskDate } from '@/features/catalyst/tasks-data'

const SENTIMENT_TONE: Record<string, string> = {
  positive: 'bg-[rgba(47,190,126,0.12)] text-[#2FBE7E]',
  negative: 'bg-[#FDECEC] text-[#E5484D]',
}

function EngineBadge({ result }: { result: PromptEngineResult }): JSX.Element {
  const logo = engineLogo(result.engine)
  return (
    <span className="flex items-center gap-1.5 text-[12px] font-semibold text-[var(--cat-ink)]">
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt="" className="h-3.5 w-3.5" />
      )}
      {result.engineLabel}
    </span>
  )
}

function ResultMeta({ result }: { result: PromptEngineResult }): JSX.Element {
  return (
    <span className="ml-auto flex items-center gap-1.5">
      {result.position !== null && result.position > 0 && (
        <span className="rounded-sm bg-[var(--cat-hover)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--cat-ink-2)] tabular-nums">
          #{result.position}
        </span>
      )}
      {result.sentiment && (
        <span
          className={`rounded-sm px-1.5 py-0.5 text-[10px] font-medium capitalize ${SENTIMENT_TONE[result.sentiment] ?? 'bg-[var(--cat-hover)] text-[var(--cat-ink-3)]'}`}
        >
          {result.sentiment}
        </span>
      )}
      <span
        className={`rounded-sm px-1.5 py-0.5 text-[10px] font-medium ${
          result.mentioned
            ? 'bg-[rgba(47,190,126,0.12)] text-[#2FBE7E]'
            : 'bg-[var(--cat-hover)] text-[var(--cat-ink-3)]'
        }`}
      >
        {result.mentioned ? 'Mentioned' : 'Not mentioned'}
      </span>
    </span>
  )
}

function ResultCard({ result }: { result: PromptEngineResult }): JSX.Element {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-[var(--cat-border)] bg-[var(--cat-content)] p-3">
      <div className="flex items-center gap-2">
        <EngineBadge result={result} />
        <ResultMeta result={result} />
      </div>
      <p className="line-clamp-4 text-[12px] leading-relaxed text-[var(--cat-ink-2)]">
        {result.snippet || 'No answer text captured for this run.'}
      </p>
      {result.checkedAt && (
        <p className="text-[10px] text-[var(--cat-ink-3)]">
          Checked {formatTaskDate(result.checkedAt)}
        </p>
      )}
    </div>
  )
}

/** The expanded body of a prompt row — each engine's latest answer. */
export function PromptResultsPanel({ results }: { results: PromptEngineResult[] }): JSX.Element {
  if (results.length === 0) {
    return (
      <p className="px-4 pb-3.5 text-[12px] text-[var(--cat-ink-3)]">
        No engine answers yet. They arrive within a minute of tracking; this list refreshes
        automatically.
      </p>
    )
  }
  return (
    <div className="grid grid-cols-1 gap-2 px-4 pb-3.5 md:grid-cols-2">
      {results.map(result => (
        <ResultCard key={result.id} result={result} />
      ))}
    </div>
  )
}
