import { DAYS } from '@/features/landing/rankings-data'

/**
 * Bottom→top bands, one per platform identity so colour maps to *who* was
 * cited (ChatGPT → Claude → DeepSeek → Grok), not decoration.
 */
function bandColor(fraction: number): string {
  if (fraction < 0.4) return '#e04a3d' // ChatGPT
  if (fraction < 0.65) return '#F6B93B' // Claude
  if (fraction < 0.85) return '#3B9EF6' // DeepSeek
  return '#8B5CF6' // Grok
}

function Bar({ segments }: { segments: number }): JSX.Element {
  return (
    <div className="flex flex-col-reverse gap-[3px]">
      {Array.from({ length: segments }, (_, i) => (
        <span
          key={i}
          className="h-[9px] w-[4px] rounded-full"
          style={{ background: bandColor(i / Math.max(segments - 1, 1)) }}
        />
      ))}
    </div>
  )
}

export function RankChart(): JSX.Element {
  return (
    <div className="mt-8 flex items-end justify-between gap-1 sm:gap-4">
      {DAYS.map(day => (
        <div key={day.label} className="flex flex-1 flex-col items-center gap-3">
          <div className="flex items-end gap-1 sm:gap-1.5">
            {day.bars.map((h, i) => (
              <Bar key={`${day.label}-${i}`} segments={h} />
            ))}
          </div>
          <span className="text-[13px] font-medium text-[#9ca3af]">{day.label}</span>
        </div>
      ))}
    </div>
  )
}
