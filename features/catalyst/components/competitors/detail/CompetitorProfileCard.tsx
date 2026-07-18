import { Card } from '@/features/catalyst/components/Card'
import { CardHead } from '@/features/catalyst/components/CardHead'
import type { Competitor } from '@/lib/api/analyzer'

function ProfileRow({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div className="flex items-center justify-between gap-3 text-[13px]">
      <span className="shrink-0 text-[var(--cat-ink-3)]">{label}</span>
      <span className="truncate text-right font-medium text-[var(--cat-ink)] capitalize">
        {value || '—'}
      </span>
    </div>
  )
}

/** Who this competitor is: positioning plus the profiler's firmographics. */
export function CompetitorProfileCard({ competitor }: { competitor: Competitor }): JSX.Element {
  return (
    <Card>
      <CardHead title="Profile" />
      {competitor.positioning && (
        <p className="mb-3 text-[13px] leading-relaxed text-[var(--cat-ink-2)]">
          {competitor.positioning}
        </p>
      )}
      <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 md:grid-cols-2">
        <ProfileRow label="Industry" value={competitor.industry} />
        <ProfileRow label="Tier" value={competitor.tier} />
        <ProfileRow label="Target market" value={competitor.target_market} />
        <ProfileRow label="Geography" value={competitor.geography} />
        <ProfileRow label="Pricing model" value={competitor.pricing_model} />
        <ProfileRow label="Est. revenue" value={competitor.estimated_revenue_band} />
      </div>
    </Card>
  )
}
