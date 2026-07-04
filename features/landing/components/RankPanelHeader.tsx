import { BarChart3, ChevronDown, LineChart } from 'lucide-react'

import { PLATFORMS } from '@/features/landing/rankings-data'
import type { Platform } from '@/features/landing/rankings-data'

function PlatformPill({ platform }: { platform: Platform }): JSX.Element {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-[#ececec] bg-white px-3 py-2 text-[13px]">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: platform.color }} />
      <span className="font-semibold text-[#171717]">{platform.name}</span>
      <span className="text-[#d4d4d8]">|</span>
      <span className="font-medium text-[#6b6b6b] tabular-nums">{platform.count}</span>
    </span>
  )
}

function Controls(): JSX.Element {
  return (
    <div className="ml-auto flex items-center gap-2">
      <div className="flex items-center rounded-md border border-[#ececec] bg-white p-0.5">
        <span className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] font-medium text-[#9ca3af]">
          <LineChart size={15} /> Line
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-[#f4f4f4] px-2.5 py-1.5 text-[13px] font-semibold text-[#171717]">
          <BarChart3 size={15} /> Bar
        </span>
      </div>
      <span className="inline-flex items-center gap-1.5 rounded-md border border-[#ececec] bg-white px-3 py-2 text-[13px] font-medium text-[#171717]">
        This week <ChevronDown size={15} className="text-[#9ca3af]" />
      </span>
    </div>
  )
}

export function RankPanelHeader(): JSX.Element {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-[#171717]">AI Platform Rankings</h3>
        <span className="hidden text-[14px] text-[#9ca3af] lg:block">
          Citations by platform · this week
        </span>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2.5">
        {PLATFORMS.map(platform => (
          <PlatformPill key={platform.name} platform={platform} />
        ))}
        <Controls />
      </div>
    </>
  )
}
