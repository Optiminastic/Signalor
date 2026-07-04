import Link from 'next/link'

import { Sparkle } from '@/features/landing/components/Sparkle'

import { IntegrationBeams } from './LandingHeroIllstration'

function SparkleBadge(): JSX.Element {
  return (
    <span className="mx-1.5 inline-flex h-[42px] w-[42px] translate-y-[6px] items-center justify-center rounded-2xl bg-white shadow-[0_6px_20px_rgba(16,24,40,0.1)] ring-1 ring-black/[0.06] sm:h-[56px] sm:w-[56px]">
      <Sparkle size={26} className="text-[#e04a3d]" />
    </span>
  )
}

function HeroCtas(): JSX.Element {
  return (
    <div className="mt-9 flex items-center justify-center">
      <Link
        href="/sign-in"
        className="auth-cta-btn inline-flex h-10 items-center rounded-md px-4 text-[14px] font-semibold text-white"
      >
        Start now
      </Link>
    </div>
  )
}

export function Hero(): JSX.Element {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-20 pb-28 text-center sm:pt-28">
      <h1 className="text-[38px] leading-[1.06] font-semibold tracking-tight text-[#141414] sm:text-[58px]">
        The{' '}
        <span className="text-[#e04a3d] underline decoration-[#e04a3d]/45 decoration-dotted decoration-2 underline-offset-[10px]">
          growth
        </span>{' '}
        engine for your AI Search
        <SparkleBadge />
        visibility
      </h1>
      <p className="mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-[#6b6b6b]">
        Track and optimize visibility in ChatGPT, Gemini and other AI Search engines to drive
        traffic to your website that converts.
      </p>
      <HeroCtas />
      <IntegrationBeams />
    </section>
  )
}
