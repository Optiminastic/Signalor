import { Eye, Radar, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  desc: string
}

const FEATURES: Feature[] = [
  {
    icon: Eye,
    title: 'AI visibility scoring',
    desc: 'See how ChatGPT, Gemini, Perplexity and Google surface your brand — scored across every engine and refreshed continuously.',
  },
  {
    icon: Radar,
    title: 'Prompt tracking',
    desc: 'Monitor the exact prompts your buyers ask and watch your citations climb or slip over time.',
  },
  {
    icon: Sparkles,
    title: 'Actionable fixes',
    desc: 'Get prioritized recommendations that actually move visibility — not vague, generic SEO advice.',
  },
]

const ENGINES = ['ChatGPT', 'Gemini', 'Perplexity', 'Claude', 'Google AI Overviews', 'Copilot']

function FeatureCard({ icon: Icon, title, desc }: Feature): JSX.Element {
  return (
    <div className="rounded-2xl border border-[#ececec] bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(16,24,40,0.08)]">
      <span
        className="grid h-11 w-11 place-items-center rounded-xl"
        style={{ background: 'rgba(224,74,61,0.10)' }}
      >
        <Icon size={20} className="text-[#e04a3d]" />
      </span>
      <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-[#141414]">{title}</h3>
      <p className="mt-2 text-[14.5px] leading-relaxed text-[#6b6b6b]">{desc}</p>
    </div>
  )
}

function EnginesStrip(): JSX.Element {
  return (
    <div className="mx-auto mt-16 max-w-4xl border-t border-[#ececec] pt-10 text-center">
      <p className="text-[12px] font-semibold tracking-[0.18em] text-[#9ca3af] uppercase">
        Tracking visibility across every major engine
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
        {ENGINES.map(engine => (
          <span
            key={engine}
            className="inline-flex items-center gap-2 rounded-full border border-[#ececec] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#3f3f46]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#e04a3d]" />
            {engine}
          </span>
        ))}
      </div>
    </div>
  )
}

export function FeatureSection(): JSX.Element {
  return (
    <section className="bg-[#fbfbfa] px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[13px] font-semibold tracking-wider text-[#e04a3d] uppercase">
          Why Signalor
        </p>
        <h2 className="mt-3 text-[32px] font-semibold tracking-tight text-[#141414] sm:text-[40px]">
          Everything you need to win AI search
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-[#6b6b6b]">
          Measure, track, and improve how generative engines cite your brand — all from one place.
        </p>
      </div>
      <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(feature => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
      <EnginesStrip />
    </section>
  )
}
