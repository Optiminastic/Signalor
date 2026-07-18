import { BLUE, BRAND, GREEN, PURPLE, YELLOW } from '@/features/catalyst/constants'

export interface RankRow {
  name: string
  value: string
  color: string
  owned?: boolean
}

export interface AllocItem {
  name: string
  pct: number
  color: string
}

const TEAL = '#1FA8A0'
const GRAY = '#94A3B8'

/** Stable colour per answer engine so the allocation bar and rank list agree. */
const ENGINE_COLOR: Record<string, string> = {
  chatgpt: BRAND,
  perplexity: TEAL,
  gemini: PURPLE,
  claude: BLUE,
  google: GREEN,
  bing: YELLOW,
}

export function engineColor(engine: string, fallbackIndex = 0): string {
  const palette = [BRAND, TEAL, PURPLE, BLUE, GREEN, YELLOW, GRAY]
  return ENGINE_COLOR[engine.toLowerCase()] ?? palette[fallbackIndex % palette.length]
}

export const CITATION_PALETTE = [BRAND, PURPLE, TEAL, BLUE, YELLOW, GRAY]
