'use client'

import { AiCitationCard } from '@/features/catalyst/components/cards/AiCitationCard'
import { ConversionRateCard } from '@/features/catalyst/components/cards/ConversionRateCard'
import { GeoScoreCard } from '@/features/catalyst/components/cards/GeoScoreCard'
import { UserRetentionCard } from '@/features/catalyst/components/cards/UserRetentionCard'
import { VisitorsChannelsCard } from '@/features/catalyst/components/cards/VisitorsChannelsCard'
import { WeeklyVisitorsCard } from '@/features/catalyst/components/cards/WeeklyVisitorsCard'
import { DashboardSkeleton } from '@/features/catalyst/components/DashboardSkeleton'
import { WorldPresenceCard } from '@/features/catalyst/components/overview/WorldPresenceCard'
import { Topbar } from '@/features/catalyst/components/Topbar'
import { useDashboardReady } from '@/hooks/useDashboardReady'

export function DashboardContent(): JSX.Element {
  const ready = useDashboardReady()

  return (
    <>
      <Topbar />
      {ready ? (
        <section className="cat-stagger mt-2.5 grid min-h-0 flex-1 auto-rows-min grid-cols-1 gap-2 overflow-y-auto pr-0.5 sm:grid-cols-2 xl:grid-cols-3">
          <GeoScoreCard />
          <AiCitationCard />
          <ConversionRateCard />
          <VisitorsChannelsCard />
          <UserRetentionCard />
          <WeeklyVisitorsCard />
          <WorldPresenceCard />
        </section>
      ) : (
        <DashboardSkeleton />
      )}
    </>
  )
}
