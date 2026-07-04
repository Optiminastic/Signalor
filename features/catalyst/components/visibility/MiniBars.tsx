import type { SovBar } from '@/features/catalyst/visibility-data'

interface MiniBarsProps {
  bars: SovBar[]
  color: string
}

/** Compact labelled bar chart (share of voice per engine). */
export function MiniBars({ bars, color }: MiniBarsProps): JSX.Element {
  const max = Math.max(...bars.map(b => b.value), 1)
  return (
    <div className="flex items-end gap-1.5">
      {bars.map(bar => (
        <div key={bar.name} className="flex flex-1 flex-col items-center gap-1.5">
          <div className="flex h-12 w-full items-end">
            <div
              className="w-full rounded-t-sm"
              style={{
                height: `${(bar.value / max) * 100}%`,
                minHeight: bar.value > 0 ? 4 : 2,
                background: bar.value > 0 ? color : 'var(--cat-track)',
              }}
            />
          </div>
          <span className="w-full truncate text-center text-[9px] text-[var(--cat-ink-3)]">
            {bar.name}
          </span>
        </div>
      ))}
    </div>
  )
}
