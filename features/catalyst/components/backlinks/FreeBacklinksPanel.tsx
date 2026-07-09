import { BACKLINKS } from '@/features/catalyst/backlinks-data'
import { OppTable } from '@/features/catalyst/components/backlinks/OppTable'

/** Free suggestions — high-authority sites you can submit to yourself. */
export function FreeBacklinksPanel(): JSX.Element {
  return (
    <div>
      <p className="mb-4 text-[13px] text-[var(--cat-ink-3)]">
        Curated directories, reviews and communities you can submit to for free. LLMs index and
        weight these citations heavily.
      </p>
      <OppTable items={BACKLINKS} />
    </div>
  )
}
