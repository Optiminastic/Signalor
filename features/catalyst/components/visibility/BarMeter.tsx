const BARS = 44

interface BarMeterProps {
  value: number
  color: string
}

/** A segmented meter — first `value%` of the bars are filled with `color`. */
export function BarMeter({ value, color }: BarMeterProps): JSX.Element {
  const pct = Math.max(0, Math.min(100, value))
  const filled = Math.round((pct / 100) * BARS)
  return (
    <div className="flex h-8 items-stretch gap-[2px]">
      {Array.from({ length: BARS }, (_, i) => (
        <span
          key={i}
          className="flex-1 rounded-[2px]"
          style={{ background: i < filled ? color : 'var(--cat-track)' }}
        />
      ))}
    </div>
  )
}
