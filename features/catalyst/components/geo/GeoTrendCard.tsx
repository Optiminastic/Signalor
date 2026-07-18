import { Badge } from '@/features/catalyst/components/Badge'
import { Card } from '@/features/catalyst/components/Card'
import { CardHead } from '@/features/catalyst/components/CardHead'
import { AnimatedScore } from '@/features/catalyst/components/cards/AnimatedScore'
import { Delta } from '@/features/catalyst/components/Delta'
import { LineChart } from '@/features/catalyst/components/LineChart'
import type { GeoDetail } from '@/hooks/useGeoScore'

interface SubStatProps {
  label: string
  children: React.ReactNode
}

function SubStat({ label, children }: SubStatProps): JSX.Element {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] text-[var(--cat-ink-3)]">{label}</span>
      <span className="text-[13px] font-semibold text-[var(--cat-ink)] tabular-nums">
        {children}
      </span>
    </div>
  )
}

/** Hero of the GEO details page: the score, its delta and the trend line. */
export function GeoTrendCard({ data }: { data: GeoDetail }): JSX.Element {
  return (
    <Card className="xl:col-span-2">
      <CardHead title="Score trend" />
      <div className="flex items-center gap-2.5">
        <AnimatedScore value={data.score} />
        <Badge positive={data.positive}>{data.delta}</Badge>
      </div>
      <LineChart data={data.points} heightClass="h-[180px]" />
      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[var(--cat-border-soft)] pt-3">
        <SubStat label="Previous score">{data.previous}</SubStat>
        <SubStat label="Change">
          <Delta positive={data.positive}>{data.delta}</Delta>
        </SubStat>
        <SubStat label="Engines tracked">{data.engines.length}</SubStat>
      </div>
    </Card>
  )
}
