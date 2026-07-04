import { ArrowRight } from 'lucide-react'

import { MODULES } from '@/features/landing/rankings-data'
import type { RankModule } from '@/features/landing/rankings-data'

const ICON_TILE = 'grid h-8 w-8 shrink-0 place-items-center rounded-md text-[#e04a3d]'
const BADGE = 'rounded-full px-2 py-0.5 text-[10px] font-semibold text-[#e04a3d]'

function ModuleCard({ module }: { module: RankModule }): JSX.Element {
  const { icon: Icon, title, desc, badge } = module
  return (
    <div className="rounded-md border border-[#ececec] bg-white p-5 transition-colors hover:border-[#dcdcdc]">
      <div className="flex items-center gap-2">
        <span className={ICON_TILE} style={{ background: 'rgba(224,74,61,0.10)' }}>
          <Icon size={16} />
        </span>
        <h4 className="text-[15px] font-semibold text-[#171717]">{title}</h4>
        {badge && (
          <span className={BADGE} style={{ background: 'rgba(224,74,61,0.10)' }}>
            New
          </span>
        )}
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-[#6b6b6b]">{desc}</p>
      <button
        type="button"
        className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[#171717] transition-colors hover:text-[#e04a3d]"
      >
        Learn More <ArrowRight size={14} strokeWidth={2.2} />
      </button>
    </div>
  )
}

export function ModuleCards(): JSX.Element {
  return (
    <div className="mt-8 grid gap-4 border-t border-[#ececec] pt-8 sm:grid-cols-2 lg:grid-cols-4">
      {MODULES.map(module => (
        <ModuleCard key={module.title} module={module} />
      ))}
    </div>
  )
}
