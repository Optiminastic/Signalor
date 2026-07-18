'use client'

import { useQuery } from '@tanstack/react-query'

import { getVisibilityMatrix, type VisibilityMatrix } from '@/lib/api/prompts'

const MAX_ROWS = 12

export interface MatrixRow {
  name: string
  domain: string
  isBrand: boolean
  cells: Record<string, number>
}

export interface CompetitorMatrix {
  engines: string[]
  rows: MatrixRow[]
  /** Highest cell value across the table — scales the heat colour. */
  max: number
}

function bestOf(cells: Record<string, number>): number {
  return Math.max(0, ...Object.values(cells))
}

/** Brand row first, competitors by their best cell; capped for the card. */
function adapt(data: VisibilityMatrix): CompetitorMatrix {
  const rows: MatrixRow[] = data.rows.map(row => ({
    name: row.name,
    domain: row.domain,
    isBrand: row.is_brand,
    cells: row.cells,
  }))
  const brand = rows.filter(r => r.isBrand)
  const competitors = rows
    .filter(r => !r.isBrand)
    .sort((a, b) => bestOf(b.cells) - bestOf(a.cells))
    .slice(0, MAX_ROWS)
  const all = [...brand, ...competitors]
  return {
    engines: data.engines,
    rows: all,
    max: Math.max(1, ...all.map(r => bestOf(r.cells))),
  }
}

interface UseCompetitorMatrixResult {
  data: CompetitorMatrix | undefined
  isLoading: boolean
  isError: boolean
}

/** Brand vs competitor visibility per AI engine, for the dashboard heatmap. */
export function useCompetitorMatrix(slug: string | undefined): UseCompetitorMatrixResult {
  const query = useQuery({
    queryKey: ['catalyst', 'competitor-matrix', slug ?? ''],
    enabled: Boolean(slug),
    queryFn: async (): Promise<CompetitorMatrix> =>
      adapt(await getVisibilityMatrix(slug as string)),
  })
  return { data: query.data, isLoading: query.isLoading, isError: query.isError }
}
