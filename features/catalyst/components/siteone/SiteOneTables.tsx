'use client'

import { SiteOneTable } from '@/features/catalyst/components/siteone/SiteOneTable'
import type { SiteOneTable as SiteOneTableData } from '@/lib/api/siteone'

interface SiteOneTablesProps {
  tables: SiteOneTableData[]
}

interface Section {
  title: string
  tables: SiteOneTableData[]
}

// Logical grouping of SiteOne's tables. Any table not listed here (e.g. a new
// analyzer in a future SiteOne version) is collected under "Other".
const GROUPS: { title: string; keys: string[] }[] = [
  {
    title: 'SEO',
    keys: ['seo', 'seo-headings', 'non-unique-titles', 'non-unique-descriptions', 'open-graph'],
  },
  { title: 'Security & TLS', keys: ['security', 'certificate-info'] },
  {
    title: 'Performance',
    keys: [
      'slowest-urls',
      'fastest-urls',
      'caching-per-content-type',
      'caching-per-domain',
      'caching-per-domain-and-content-type',
    ],
  },
  { title: 'Accessibility', keys: ['accessibility'] },
  { title: 'Best practices', keys: ['best-practices'] },
  { title: 'HTTP headers', keys: ['headers', 'headers-values'] },
  {
    title: 'Content types',
    keys: ['content-types', 'content-types-raw', 'content-processors-stats'],
  },
  {
    title: 'URLs & network',
    keys: [
      '404',
      'redirects',
      'external-urls',
      'skipped',
      'skipped-summary',
      'source-domains',
      'dns',
    ],
  },
  { title: 'Crawl stats', keys: ['analysis-stats'] },
]

/** Group the non-empty tables into display sections, preserving group order. */
function buildSections(tables: SiteOneTableData[]): Section[] {
  const byKey = new Map(tables.filter(t => t.rows.length > 0).map(t => [t.key, t]))
  const claimed = new Set<string>()
  const sections: Section[] = []
  for (const group of GROUPS) {
    const groupTables: SiteOneTableData[] = []
    for (const key of group.keys) {
      const table = byKey.get(key)
      if (table) {
        groupTables.push(table)
        claimed.add(key)
      }
    }
    if (groupTables.length > 0) sections.push({ title: group.title, tables: groupTables })
  }
  const other = [...byKey.values()].filter(t => !claimed.has(t.key))
  if (other.length > 0) sections.push({ title: 'Other', tables: other })
  return sections
}

/** Every SiteOne analyzer table, grouped into labelled sections. */
export function SiteOneTables({ tables }: SiteOneTablesProps): JSX.Element | null {
  const sections = buildSections(tables)
  if (sections.length === 0) return null

  return (
    <div className="flex flex-col gap-5">
      {sections.map(section => (
        <section key={section.title} className="flex flex-col gap-3">
          <h3 className="text-[11px] font-semibold tracking-wider text-[var(--cat-ink-3)] uppercase">
            {section.title}
          </h3>
          {section.tables.map(table => (
            <SiteOneTable key={table.key} table={table} />
          ))}
        </section>
      ))}
    </div>
  )
}
