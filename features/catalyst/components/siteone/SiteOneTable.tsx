'use client'

import type { SiteOneColumn, SiteOneTable as SiteOneTableData } from '@/lib/api/siteone'

interface SiteOneTableProps {
  table: SiteOneTableData
}

/** Coerce any SiteOne cell value to display text ("-" when empty). */
function cellText(value: unknown): string {
  if (value === null || value === undefined || value === '') return '-'
  return String(value)
}

/** Use the report's columns, or fall back to the first row's keys. */
function resolveColumns(table: SiteOneTableData): SiteOneColumn[] {
  if (table.columns.length > 0) return table.columns
  if (table.rows.length === 0) return []
  return Object.keys(table.rows[0]).map(field => ({ field, label: field }))
}

function BodyRow({
  columns,
  row,
}: {
  columns: SiteOneColumn[]
  row: Record<string, unknown>
}): JSX.Element {
  return (
    <tr className="border-t border-[var(--cat-border)]">
      {columns.map(col => {
        const text = cellText(row[col.field])
        return (
          <td
            key={col.field}
            className="max-w-[340px] truncate px-2.5 py-1.5 text-[var(--cat-ink)]"
            title={text}
          >
            {text}
          </td>
        )
      })}
    </tr>
  )
}

/**
 * Generic renderer for one SiteOne analyzer table: a titled, horizontally
 * scrollable data table driven by the report's own columns + rows. Renders
 * nothing for an empty table.
 */
export function SiteOneTable({ table }: SiteOneTableProps): JSX.Element | null {
  if (table.rows.length === 0) return null
  const columns = resolveColumns(table)

  return (
    <div>
      <div className="mb-1.5 flex items-center gap-2">
        <h4 className="text-[12px] font-semibold text-[var(--cat-ink)]">{table.title}</h4>
        <span className="text-[11px] text-[var(--cat-ink-3)] tabular-nums">
          {table.rows.length}
        </span>
      </div>
      <div className="overflow-x-auto rounded-md border border-[var(--cat-border)]">
        <table className="w-full min-w-max border-collapse text-[12px]">
          <thead>
            <tr className="bg-[var(--cat-hover)]">
              {columns.map(col => (
                <th
                  key={col.field}
                  className="px-2.5 py-1.5 text-left font-medium whitespace-nowrap text-[var(--cat-ink-2)]"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <BodyRow key={i} columns={columns} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
