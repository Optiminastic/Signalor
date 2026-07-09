'use client'

import type { SiteMeta } from '@/features/catalyst/backlinks-data'
import { AutoBacklinkTable } from '@/features/catalyst/components/backlinks/AutoBacklinkTable'
import { CategoryHeader } from '@/features/catalyst/components/backlinks/CategoryHeader'
import type { AutoBacklink } from '@/lib/api/backlinks'

interface CategoryAccordionProps {
  site: SiteMeta
  rows: AutoBacklink[]
  open: boolean
  onToggle: () => void
}

/** One collapsible satellite-site section. Rows reuse the Tasks table chrome. */
export function CategoryAccordion({
  site,
  rows,
  open,
  onToggle,
}: CategoryAccordionProps): JSX.Element {
  const liveCount = rows.filter(r => Boolean(r.url)).length

  return (
    <div className="border-t border-[var(--cat-border)] first:border-t-0">
      <CategoryHeader
        site={site}
        count={rows.length}
        liveCount={liveCount}
        open={open}
        onToggle={onToggle}
      />
      {open && (
        <div className="overflow-x-auto border-t border-[var(--cat-border-soft)]">
          {rows.length === 0 ? (
            <p className="px-4 py-6 text-[13px] text-[var(--cat-ink-3)]">
              No backlinks published to {site.label} yet.
            </p>
          ) : (
            <AutoBacklinkTable rows={rows} />
          )}
        </div>
      )}
    </div>
  )
}
