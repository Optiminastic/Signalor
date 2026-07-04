import { MentionsCard } from '@/features/catalyst/components/visibility/MentionsCard'
import { OverallVisibilityCard } from '@/features/catalyst/components/visibility/OverallVisibilityCard'
import { PlatformScoreCard } from '@/features/catalyst/components/visibility/PlatformScoreCard'
import { ShareOfVoiceCard } from '@/features/catalyst/components/visibility/ShareOfVoiceCard'
import { VisibilityHeader } from '@/features/catalyst/components/visibility/VisibilityHeader'
import { PLATFORM_SCORES } from '@/features/catalyst/visibility-data'

export function VisibilityView(): JSX.Element {
  return (
    <>
      <VisibilityHeader />
      <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-0.5">
        <div className="cat-stagger grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
          <OverallVisibilityCard />
          <ShareOfVoiceCard />
          <MentionsCard />
          {PLATFORM_SCORES.map(platform => (
            <PlatformScoreCard key={platform.key} platform={platform} />
          ))}
        </div>
      </div>
    </>
  )
}
