import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

import { GREEN, NEG } from '@/features/catalyst/constants'

interface MetricDeltaProps {
  value: string
  positive: boolean
}

export function MetricDelta({ value, positive }: MetricDeltaProps): JSX.Element {
  if (value === '0%' || value === '0') {
    return <span className="text-[13px] font-medium text-[var(--cat-ink-3)]">—</span>
  }
  const Icon = positive ? ArrowUpRight : ArrowDownRight
  return (
    <span
      className="inline-flex items-center gap-0.5 text-[13px] font-semibold"
      style={{ color: positive ? GREEN : NEG }}
    >
      <Icon size={14} strokeWidth={2.4} />
      {positive ? '+' : '−'}
      {value}
    </span>
  )
}
