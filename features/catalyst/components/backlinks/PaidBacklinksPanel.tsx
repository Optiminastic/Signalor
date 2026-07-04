import { BACKLINKS } from '@/features/catalyst/backlinks-data'
import { OppTable } from '@/features/catalyst/components/backlinks/OppTable'

// The marketplace is a curated slice of high-DR placements you can buy.
const PAID = BACKLINKS.filter(b => b.dr >= 90)

/** Paid marketplace — sponsored placements and guest posts on premium domains. */
export function PaidBacklinksPanel(): JSX.Element {
  return (
    <div>
      <p className="mb-4 text-[13px] text-[var(--cat-ink-3)]">
        Premium placements and guest posts on high-authority domains, fulfilled by our partners.
      </p>
      <OppTable items={PAID} />
    </div>
  )
}
