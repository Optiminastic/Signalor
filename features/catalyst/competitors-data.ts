import { BRAND } from '@/features/catalyst/constants'

export type Relation = 'mine' | 'direct' | 'indirect'

/** UI shape a CompetitorCard renders — adapted from the API by `useCompetitors`. */
export interface Competitor {
  /** Backend Competitor id; absent for the user's own brand card. */
  id?: number
  name: string
  initial: string
  color: string
  domain: string
  score: number
  relation: Relation
  positioning: string
}

export const RELATION_META: Record<Relation, { label: string; color: string }> = {
  mine: { label: 'My brand', color: BRAND },
  direct: { label: 'Direct competitors', color: '#D97706' },
  indirect: { label: 'Indirect competitors', color: 'var(--cat-ink-2)' },
}

/** Bare domain from a URL (no protocol, path or www). */
export function domainOf(url: string): string {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '')
    .replace(/^www\./, '')
}

/** Backend tier string → card relation (tier 1 = direct, everything else indirect). */
export function relationFor(tier: string): Relation {
  return tier.includes('1') ? 'direct' : 'indirect'
}
