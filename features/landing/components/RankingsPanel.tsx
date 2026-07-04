import { ModuleCards } from '@/features/landing/components/ModuleCards'
import { RankChart } from '@/features/landing/components/RankChart'
import { RankPanelHeader } from '@/features/landing/components/RankPanelHeader'

export function RankingsPanel(): JSX.Element {
  return (
    <section className="bg-[#fbfbfa] px-5 pt-6 pb-16 sm:px-8 lg:px-12">
      <RankPanelHeader />
      <RankChart />
      <ModuleCards />
    </section>
  )
}
