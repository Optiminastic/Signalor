'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import {
  CITATION_PALETTE,
  engineColor,
  type AllocItem,
  type RankRow,
} from '@/features/catalyst/components/agent/insights/types'
import { useActiveProject } from '@/hooks/useActiveProject'
import { getCitations, getTopSources } from '@/lib/api/analyzer'

const ENGINE_LABEL: Record<string, string> = {
  chatgpt: 'ChatGPT',
  perplexity: 'Perplexity',
  gemini: 'Gemini',
  claude: 'Claude',
  google: 'Google AI',
  bing: 'Bing',
}

function label(engine: string, fallback: string): string {
  return ENGINE_LABEL[engine.toLowerCase()] ?? fallback
}

interface AgentInsights {
  /** Share of mentions across answer engines (sums to ~100%). */
  platforms: AllocItem[]
  /** Engines ranked by mentions. */
  engineRank: RankRow[]
  /** Top cited domains — owned vs rival. */
  citationRank: RankRow[]
  brandCitations: number
  competitorCitations: number
  hasData: boolean
  isLoading: boolean
}

export function useAgentInsights(): AgentInsights {
  const { slug } = useActiveProject()

  const topSources = useQuery({
    queryKey: ['catalyst', 'agent-top-sources', slug ?? ''],
    enabled: Boolean(slug),
    queryFn: () => getTopSources(slug as string),
  })
  const citations = useQuery({
    queryKey: ['catalyst', 'agent-citations', slug ?? ''],
    enabled: Boolean(slug),
    queryFn: () => getCitations(slug as string),
  })

  return useMemo<AgentInsights>(() => {
    const sources = topSources.data?.sources ?? []
    const totalMentions = sources.reduce((sum, s) => sum + s.mentions, 0)

    const platforms: AllocItem[] = sources
      .filter(s => s.mentions > 0)
      .map(s => ({
        name: label(s.engine, s.name),
        pct: totalMentions > 0 ? Math.round((s.mentions / totalMentions) * 1000) / 10 : 0,
        color: engineColor(s.engine),
      }))

    const engineRank: RankRow[] = sources.map(s => ({
      name: label(s.engine, s.name),
      value: String(s.mentions),
      color: engineColor(s.engine),
    }))

    const domains = citations.data?.domains ?? []
    const citationRank: RankRow[] = domains.slice(0, 6).map((d, i) => ({
      name: d.domain,
      value: String(d.total),
      color: CITATION_PALETTE[i % CITATION_PALETTE.length],
      owned: d.is_brand,
    }))

    return {
      platforms,
      engineRank,
      citationRank,
      brandCitations: citations.data?.brand_citations ?? 0,
      competitorCitations: citations.data?.competitor_citations ?? 0,
      hasData: platforms.length > 0 || citationRank.length > 0,
      isLoading: topSources.isLoading || citations.isLoading,
    }
  }, [topSources.data, topSources.isLoading, citations.data, citations.isLoading])
}
