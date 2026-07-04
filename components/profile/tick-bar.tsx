/** Segmented tick meter (per UI convention) — filled ticks up to `value`%. */
export function TickBar({ value, ticks = 26 }: { value: number; ticks?: number }): JSX.Element {
  const filled = Math.round((Math.min(100, Math.max(0, value)) / 100) * ticks)
  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: ticks }, (_, i) => (
        <span
          key={i}
          className={`h-3.5 w-[3px] rounded-[1px] ${i < filled ? 'bg-[#e04a3d]' : 'bg-[var(--cat-border)]'}`}
        />
      ))}
    </div>
  )
}
