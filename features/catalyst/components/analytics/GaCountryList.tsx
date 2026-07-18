import { BRAND } from '@/features/catalyst/constants'
import type { GACountry } from '@/lib/api/integrations'

/** Sessions-by-country rows with a share bar, sorted high to low. */
export function GaCountryList({ countries }: { countries: GACountry[] }): JSX.Element {
  const total = countries.reduce((sum, c) => sum + c.sessions, 0) || 1
  const top = [...countries].sort((a, b) => b.sessions - a.sessions).slice(0, 8)

  return (
    <div className="divide-y divide-[var(--cat-border-soft)]">
      {top.map(c => {
        const pct = Math.round((c.sessions / total) * 1000) / 10
        return (
          <div key={c.country_id || c.country} className="py-2">
            <div className="mb-1 flex items-center justify-between gap-2 text-[12.5px]">
              <span className="truncate font-medium text-[var(--cat-ink)]">{c.country}</span>
              <span className="text-[var(--cat-ink-2)] tabular-nums">
                {c.sessions.toLocaleString()} · {pct}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--cat-hover)]">
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, background: BRAND }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
