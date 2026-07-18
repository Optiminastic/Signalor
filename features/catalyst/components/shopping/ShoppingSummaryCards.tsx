import { Card } from '@/features/catalyst/components/Card'
import { CardHead } from '@/features/catalyst/components/CardHead'
import { GaugeRing } from '@/features/catalyst/components/visibility/GaugeRing'
import { scoreColor, scoreStatus } from '@/features/catalyst/visibility-data'
import type { ShoppingReadiness } from '@/lib/api/shopping'

/** Catalog-wide readiness gauge + the numbers behind it. */
export function ShoppingScoreCard({ data }: { data: ShoppingReadiness }): JSX.Element {
  const color = scoreColor(data.avg_readiness)
  const perfect = data.products.filter(p => p.issues.length === 0).length
  return (
    <Card>
      <CardHead title="Shopping readiness" />
      <div className="mt-1 flex items-center gap-4">
        <GaugeRing value={data.avg_readiness} size={92} stroke={8} color={color}>
          <span className="text-[22px] font-bold text-[var(--cat-ink)]">{data.avg_readiness}</span>
        </GaugeRing>
        <div className="flex min-w-0 flex-col gap-1.5">
          <span className="text-[14px] font-semibold" style={{ color }}>
            {scoreStatus(data.avg_readiness)}
          </span>
          <span className="text-[12px] text-[var(--cat-ink-2)]">
            {data.product_count} products scored
          </span>
          <span className="text-[12px] text-[var(--cat-ink-2)]">
            <span className="font-semibold text-[#2FBE7E]">{perfect}</span> fully AI-ready
          </span>
        </div>
      </div>
      <p className="mt-3 border-t border-[var(--cat-border-soft)] pt-2.5 text-[11px] text-[var(--cat-ink-3)]">
        How extractable your catalog is for AI shopping assistants: descriptions, images with alt
        text, visible prices, types and tags.
      </p>
    </Card>
  )
}

/** Issue frequency across the catalog, worst first. */
export function ShoppingIssuesCard({ data }: { data: ShoppingReadiness }): JSX.Element {
  const max = Math.max(1, ...data.issues.map(i => i.count))
  return (
    <Card className="xl:col-span-2">
      <CardHead title="Issues across the catalog" />
      <div className="divide-y divide-[var(--cat-border-soft)]">
        {data.issues.length === 0 ? (
          <p className="py-3 text-[12px] text-[var(--cat-ink-3)]">
            No issues found. Your catalog is in great shape for AI shopping.
          </p>
        ) : (
          data.issues.map(issue => (
            <div key={issue.code} className="flex items-center gap-2.5 py-2 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-[var(--cat-ink)]">
                  {issue.label}
                </p>
                <span className="mt-1 flex h-1 w-full overflow-hidden rounded-full bg-[var(--cat-track)]">
                  <span
                    className="rounded-full bg-[#e04a3d]"
                    style={{ width: `${Math.max(6, Math.round((issue.count / max) * 100))}%` }}
                  />
                </span>
              </div>
              <span className="shrink-0 text-[12px] font-semibold text-[var(--cat-ink)] tabular-nums">
                {issue.count}
              </span>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
