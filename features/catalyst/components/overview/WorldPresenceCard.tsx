import { Globe, MoreHorizontal } from 'lucide-react'

import { TickBar } from '@/features/catalyst/components/brands/BrandBits'
import { Card } from '@/features/catalyst/components/Card'
import { WorldMap } from '@/features/catalyst/components/overview/WorldMap'
import { BRAND } from '@/features/catalyst/constants'
import { WORLD_MARKERS, WORLD_META } from '@/features/catalyst/world-data'
import type { WorldMarker } from '@/features/catalyst/world-data'

function Header(): JSX.Element {
  return (
    <div className="mb-3 flex items-start justify-between">
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-[rgba(224,74,61,0.1)] text-[#e04a3d]">
          <Globe size={16} />
        </span>
        <div>
          <p className="text-[14px] font-semibold text-[var(--cat-ink)]">World Presence</p>
          <p className="text-[11px] text-[var(--cat-ink-3)]">Sessions by country</p>
        </div>
      </div>
      <span className="flex items-center gap-1.5">
        <span className="rounded-full bg-[var(--cat-hover)] px-2 py-0.5 text-[10px] font-medium text-[var(--cat-ink-3)]">
          Google Analytics
        </span>
        <button
          type="button"
          aria-label="More"
          className="grid h-6 w-6 place-items-center rounded-md text-[var(--cat-ink-3)] transition-colors hover:bg-[var(--cat-hover)]"
        >
          <MoreHorizontal size={15} />
        </button>
      </span>
    </div>
  )
}

function MarketRow({ marker, max }: { marker: WorldMarker; max: number }): JSX.Element {
  return (
    <div className="py-[7px]">
      <div className="mb-1.5 flex items-center gap-2">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: BRAND }} />
        <span className="flex-1 truncate text-[12.5px] font-medium text-[var(--cat-ink)]">
          {marker.country}
        </span>
        <span className="text-[12.5px] font-semibold text-[var(--cat-ink)] tabular-nums">
          {marker.share}%
        </span>
      </div>
      <TickBar value={(marker.share / max) * 100} ticks={16} showValue={false} />
    </div>
  )
}

function TopMarkets(): JSX.Element {
  const top = [...WORLD_MARKERS].sort((a, b) => b.share - a.share).slice(0, 5)
  const max = top[0]?.share ?? 1
  return (
    <div className="w-full shrink-0 lg:w-[210px] lg:border-l lg:border-[var(--cat-border-soft)] lg:pl-5">
      <div className="mb-1 text-[11px] font-semibold tracking-wide text-[var(--cat-ink-3)] uppercase">
        Top markets
      </div>
      <div className="divide-y divide-[var(--cat-border-soft)]">
        {top.map(m => (
          <MarketRow key={m.country} marker={m} max={max} />
        ))}
      </div>
    </div>
  )
}

export function WorldPresenceCard(): JSX.Element {
  return (
    <Card className="xl:col-span-2">
      <Header />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="min-w-0 flex-1">
          <WorldMap />
        </div>
        <TopMarkets />
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-[var(--cat-border-soft)] pt-2.5 text-[11px] text-[var(--cat-ink-3)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#2FBE7E]" />
        {WORLD_META.countries} countries reached · {WORLD_META.sessions} sessions this month
      </div>
    </Card>
  )
}
