import { Card } from '@/features/catalyst/components/Card'
import { CardHead } from '@/features/catalyst/components/CardHead'
import { Sparkline } from '@/features/catalyst/components/visibility/Sparkline'
import { GREEN, NEG } from '@/features/catalyst/constants'
import { engineLogo } from '@/features/catalyst/engine-logos'
import type { TopSources } from '@/lib/api/analyzer'

function sentimentColor(sentiment: number): string {
  if (sentiment >= 60) return GREEN
  if (sentiment >= 40) return 'var(--cat-ink-3)'
  return NEG
}

function EngineRow({ source }: { source: TopSources['sources'][number] }): JSX.Element {
  const logo = engineLogo(source.engine)
  return (
    <div className="flex items-center gap-2.5 py-2 first:pt-0 last:pb-0">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-[var(--cat-border)] bg-[var(--cat-card)]">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="" className="h-4 w-4" />
        ) : (
          <span className="text-[9px] text-[var(--cat-ink-2)] uppercase">
            {source.engine.slice(0, 2)}
          </span>
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-[var(--cat-ink)]">{source.name}</p>
        <p className="text-[11px] text-[var(--cat-ink-3)]">
          {source.mentions} {source.mentions === 1 ? 'mention' : 'mentions'} · {source.impact}
        </p>
      </div>
      <div className="w-[72px] shrink-0">
        <Sparkline points={source.spark} color={sentimentColor(source.sentiment)} className="h-7" />
      </div>
      <span
        className="w-9 shrink-0 text-right text-[12px] font-semibold tabular-nums"
        style={{ color: sentimentColor(source.sentiment) }}
      >
        {Math.round(source.sentiment)}
      </span>
    </div>
  )
}

/** Per-engine mention volume, weekly shape and sentiment score. */
export function TopEnginesCard({ sources }: { sources: TopSources['sources'] }): JSX.Element {
  return (
    <Card>
      <CardHead title="Top AI engines" />
      <div className="divide-y divide-[var(--cat-border-soft)]">
        {sources.length === 0 ? (
          <p className="py-3 text-[12px] text-[var(--cat-ink-3)]">No engine data yet.</p>
        ) : (
          sources.map(source => <EngineRow key={source.engine} source={source} />)
        )}
      </div>
    </Card>
  )
}
