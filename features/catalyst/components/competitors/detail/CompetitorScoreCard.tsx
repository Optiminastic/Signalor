import { Card } from '@/features/catalyst/components/Card'
import { CardHead } from '@/features/catalyst/components/CardHead'
import { Delta } from '@/features/catalyst/components/Delta'
import { GaugeRing } from '@/features/catalyst/components/visibility/GaugeRing'
import { scoreColor, scoreStatus } from '@/features/catalyst/visibility-data'
import type { Competitor } from '@/lib/api/analyzer'

interface CompetitorScoreCardProps {
  competitor: Competitor
  /** The signed-in brand's composite, for the gap readout. */
  myScore: number
}

function GapRow({ diff }: { diff: number }): JSX.Element {
  if (diff === 0) {
    return <span className="text-[12px] text-[var(--cat-ink-3)]">Level with your brand</span>
  }
  return (
    <Delta positive={diff < 0}>
      {`${Math.abs(diff)} pts ${diff < 0 ? 'behind your brand' : 'ahead of your brand'}`}
    </Delta>
  )
}

/** The competitor's AI score gauge, band and gap vs the user's own brand. */
export function CompetitorScoreCard({
  competitor,
  myScore,
}: CompetitorScoreCardProps): JSX.Element {
  const score = Math.round(competitor.composite_score ?? competitor.relevance_score ?? 0)
  const mine = Math.round(myScore)
  const color = scoreColor(score)
  return (
    <Card>
      <CardHead title="AI Score" />
      <div className="mt-1 flex items-center gap-4">
        <GaugeRing value={score} size={92} stroke={8} color={color}>
          <span className="text-[22px] font-bold text-[var(--cat-ink)]">{score}</span>
        </GaugeRing>
        <div className="flex min-w-0 flex-col gap-1.5">
          <span className="text-[14px] font-semibold" style={{ color }}>
            {scoreStatus(score)}
          </span>
          <span className="text-[12px] text-[var(--cat-ink-2)]">
            Your brand: <span className="font-semibold text-[var(--cat-ink)]">{mine}</span>
          </span>
          <GapRow diff={score - mine} />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-[var(--cat-border-soft)] pt-3 text-[12px]">
        <span className="text-[var(--cat-ink-3)]">Relevance to your market</span>
        <span className="font-semibold text-[var(--cat-ink)] tabular-nums">
          {competitor.relevance_score !== null && competitor.relevance_score !== undefined
            ? `${Math.round(competitor.relevance_score)}/100`
            : '—'}
        </span>
      </div>
    </Card>
  )
}
