import { AnnouncementBar } from '@/features/landing/components/AnnouncementBar'
import { FeatureSection } from '@/features/landing/components/FeatureSection'
import { FloatingChat } from '@/features/landing/components/FloatingChat'
import { Footer } from '@/features/landing/components/Footer'
import { GridBackdrop } from '@/features/landing/components/GridBackdrop'
import { Hero } from '@/features/landing/components/Hero'
import { LandingNav } from '@/features/landing/components/LandingNav'
import { RankingsPanel } from '@/features/landing/components/RankingsPanel'

export function LandingPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#fbfbfa] font-sans">
      <AnnouncementBar />
      <div className="relative overflow-hidden">
        <GridBackdrop />
        <div className="relative z-10">
          <LandingNav />
          <Hero />
        </div>
      </div>
      <RankingsPanel />
      <FeatureSection />
      <Footer />
      <FloatingChat />
    </div>
  )
}
