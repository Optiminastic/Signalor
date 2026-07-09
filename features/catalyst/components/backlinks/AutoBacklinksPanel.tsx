'use client'

import { AUTO_SITES } from '@/features/catalyst/backlinks-data'
import { AutoCategoryList } from '@/features/catalyst/components/backlinks/AutoCategoryList'
import { BacklinksMessage } from '@/features/catalyst/components/backlinks/BacklinksMessage'
import { useActiveRunSlug } from '@/features/catalyst/components/backlinks/hooks/useActiveRunSlug'
import {
  useAutoBacklinks,
  useBacklinkSchedule,
  useToggleSchedule,
} from '@/features/catalyst/components/backlinks/hooks/useAutoBacklinks'
import { ScheduleToggle } from '@/features/catalyst/components/backlinks/ScheduleToggle'
import { DashStatRow, type DashStatData } from '@/features/catalyst/components/dash/DashStat'
import type { AutoBacklink } from '@/lib/api/backlinks'

export function AutoBacklinksPanel(): JSX.Element {
  const { slug, isLoading: slugLoading, isError: slugError } = useActiveRunSlug()
  const auto = useAutoBacklinks(slug)
  const schedule = useBacklinkSchedule(slug)
  const toggleSchedule = useToggleSchedule(slug)

  const rows = auto.data?.rows ?? []
  const scheduleOn = schedule.data?.is_active ?? false
  const loading = slugLoading || (Boolean(slug) && auto.isLoading)
  const error = slugError || auto.isError

  const onToggle = (): void => {
    if (slug) toggleSchedule.mutate(!scheduleOn)
  }

  return (
    <div>
      <div className="mb-5">
        <DashStatRow stats={buildStats(rows, scheduleOn)} />
      </div>
      <div className="mb-4 flex flex-wrap items-center justify-end gap-3">
        <ScheduleToggle enabled={scheduleOn} onToggle={onToggle} />
      </div>
      <AutoBody loading={loading} error={error} hasSlug={Boolean(slug)} rows={rows} />
    </div>
  )
}

interface AutoBodyProps {
  loading: boolean
  error: boolean
  hasSlug: boolean
  rows: AutoBacklink[]
}

function AutoBody({ loading, error, hasSlug, rows }: AutoBodyProps): JSX.Element {
  if (loading) return <BacklinksMessage title="Loading your auto-backlinks…" />
  if (error) {
    return (
      <BacklinksMessage
        title="Couldn’t load auto-backlinks"
        detail="Please refresh — if it keeps failing, the analysis backend may be unreachable."
      />
    )
  }
  if (!hasSlug) {
    return (
      <BacklinksMessage
        title="No analysis run yet"
        detail="Run an analysis for this brand to start publishing auto-backlinks."
      />
    )
  }
  return <AutoCategoryList rows={rows} />
}

function buildStats(rows: AutoBacklink[], scheduleOn: boolean): DashStatData[] {
  const liveCount = rows.filter(r => Boolean(r.url)).length
  return [
    { label: 'Blogs published', value: String(rows.length) },
    { label: 'Live backlinks', value: String(liveCount) },
    { label: 'Categories', value: String(AUTO_SITES.length) },
    { label: 'Daily auto-run', value: scheduleOn ? 'On' : 'Off' },
  ]
}
