import { TrendingUp } from 'lucide-react'

import { MetricDelta } from '@/features/catalyst/components/visibility/MetricDelta'
import { MiniBars } from '@/features/catalyst/components/visibility/MiniBars'
import { VisCardHead } from '@/features/catalyst/components/visibility/VisCardHead'
import { BRAND } from '@/features/catalyst/constants'
import { SOV, SOV_META } from '@/features/catalyst/visibility-data'

export function ShareOfVoiceCard(): JSX.Element {
  return (
    <div className="flex flex-col gap-3 rounded-md border border-[var(--cat-border)] bg-[var(--cat-card)] p-4">
      <VisCardHead icon={TrendingUp} title="Share of Voice" iconColor={BRAND} />
      <div className="flex items-end gap-2.5">
        <span className="text-[32px] leading-none font-bold tracking-tight text-[var(--cat-ink)]">
          {SOV_META.avg}
          <span className="ml-1 text-[14px] font-medium text-[var(--cat-ink-3)]">avg SOV</span>
        </span>
        <span className="mb-0.5">
          <MetricDelta value={SOV_META.delta} positive={SOV_META.positive} />
        </span>
      </div>
      <MiniBars bars={SOV} color={BRAND} />
      <div className="text-[12px] text-[var(--cat-ink-3)]">{SOV_META.prompts} tracked</div>
    </div>
  )
}
