'use client'

import { Search } from 'lucide-react'

import { useTaskFiltersStore } from '@/stores/useTaskFiltersStore'

export function TaskSearchInput(): JSX.Element {
  const search = useTaskFiltersStore(s => s.search)
  const setSearch = useTaskFiltersStore(s => s.setSearch)
  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute top-1/2 left-3 -translate-y-1/2 text-[var(--cat-ink-3)]"
      />
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search..."
        className="h-[36px] w-[200px] rounded-md border border-[var(--cat-border)] bg-[var(--cat-card)] pr-3 pl-9 text-[13px] text-[var(--cat-ink)] placeholder:text-[var(--cat-ink-3)] focus:border-[#e04a3d] focus:outline-none"
      />
    </div>
  )
}
