'use client'

import { BRAND, BRAND_SOFT, BRAND_STRONG } from '@/features/catalyst/constants'
import type { StatusTab } from '@/features/catalyst/tasks-data'
import { useTaskFiltersStore } from '@/stores/useTaskFiltersStore'

export function TaskStatusTabs({ tabs }: { tabs: StatusTab[] }): JSX.Element {
  const status = useTaskFiltersStore(s => s.status)
  const setStatus = useTaskFiltersStore(s => s.setStatus)
  return (
    <div className="flex items-center gap-1 overflow-x-auto">
      {tabs.map(tab => {
        const active = tab.key === status
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => setStatus(tab.key)}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors"
            style={
              active
                ? { background: BRAND_SOFT, color: BRAND_STRONG }
                : { color: 'var(--cat-ink-2)' }
            }
          >
            {tab.label}
            <span
              className="grid h-[18px] min-w-[18px] place-items-center rounded-sm px-1 text-[10px] font-semibold"
              style={
                active
                  ? { background: BRAND, color: '#fff' }
                  : { background: 'var(--cat-track)', color: 'var(--cat-ink-2)' }
              }
            >
              {tab.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
