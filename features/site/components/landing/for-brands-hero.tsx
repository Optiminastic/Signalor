import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight, Gauge, Link2, ListChecks, TrendingUp } from '@/features/site/components/icons'
import { GridCornerHandles, GridHandle } from '@/features/site/components/landing/home-grid'
import { LANDING_PRIMARY_CTA_CLASS } from '@/features/site/components/landing/constants'
import { cn } from '@/features/site/lib/utils'

type EngineChip = {
  engine: string
  logo: string
  cited: boolean
  left: string
  top: string
  delay: string
  duration: string
}

// Floating mock engine-mention chips — how each AI surface treats the brand.
const ENGINE_CHIPS: EngineChip[] = [
  { engine: 'ChatGPT', logo: '/logos/chatgpt.svg', cited: true, left: '8%', top: '20%', delay: '0s', duration: '5s' },
  { engine: 'Perplexity', logo: '/logos/perplexity.svg', cited: true, left: '10%', top: '62%', delay: '1.2s', duration: '5.5s' },
  { engine: 'Gemini', logo: '/logos/gemini.svg', cited: false, left: '80%', top: '22%', delay: '0.6s', duration: '4.8s' },
  { engine: 'Claude', logo: '/logos/claude.svg', cited: true, left: '79%', top: '64%', delay: '1.7s', duration: '5.8s' },
]

const FLOATING_SLOTS = [
  { left: '22%', top: '42%' },
  { left: '74%', top: '44%' },
] as const

const BRAND_VALUE_CELLS = [
  {
    icon: Link2,
    title: 'Know your AI reputation',
    description:
      'Track brand mentions, sentiment, and citations across the major AI engines so you know exactly where you stand.',
  },
  {
    icon: Gauge,
    title: 'One score, six pillars',
    description:
      'A single GEO score backed by content, schema, E-E-A-T, technical, entity, and AI-visibility checks you can act on.',
  },
  {
    icon: ListChecks,
    title: 'Fixes, not just findings',
    description:
      'Every audit ends in a ranked list of changes - and connectors that can apply many of them for you.',
  },
  {
    icon: TrendingUp,
    title: 'Measure the impact',
    description:
      'Connect analytics to watch AI referral traffic move as your visibility improves over time.',
  },
] as const

function FloatingEngineChips(): JSX.Element {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {ENGINE_CHIPS.map((chip) => (
        <span key={chip.engine} className="absolute" style={{ left: chip.left, top: chip.top }}>
          <span
            className="flex items-center gap-2 rounded-xl bg-card px-3 py-2 shadow-md shadow-black/5 ring-1 ring-border motion-safe:animate-float"
            style={{ animationDelay: chip.delay, animationDuration: chip.duration }}
          >
            <Image src={chip.logo} alt="" width={16} height={16} className="h-4 w-4" />
            <span className="text-xs font-semibold text-foreground">{chip.engine}</span>
            <span
              className={cn(
                'rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase',
                chip.cited ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground ring-1 ring-border',
              )}
            >
              {chip.cited ? 'Cited' : 'Missing'}
            </span>
          </span>
        </span>
      ))}
      {FLOATING_SLOTS.map((slot) => (
        <span
          key={`${slot.left}-${slot.top}`}
          className="absolute h-6 w-6 rounded-lg bg-muted ring-1 ring-border/60"
          style={{ left: slot.left, top: slot.top }}
        />
      ))}
    </div>
  )
}

function BrandAuditForm(): JSX.Element {
  return (
    <div className="mx-auto mt-8 w-full max-w-md">
      <form action="/tools/url-analyzer" method="GET" className="flex gap-2">
        <label htmlFor="brand-audit-url" className="sr-only">
          Website URL
        </label>
        <input
          id="brand-audit-url"
          type="text"
          name="url"
          required
          inputMode="url"
          autoComplete="url"
          placeholder="yourbrand.com"
          className="h-9 min-w-0 flex-1 rounded-md bg-card px-3 text-sm text-foreground shadow-sm shadow-black/5 ring-1 ring-border placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button type="submit" className={`${LANDING_PRIMARY_CTA_CLASS} h-9 shrink-0`}>
          Get free GEO score
        </button>
      </form>
      <p className="mt-3 text-[13px] font-medium text-muted-foreground/80">
        Free score in ~60 seconds · No sign-up needed ·{' '}
        <Link
          href="/sign-up"
          className="inline-flex items-center gap-0.5 text-foreground/70 underline decoration-border underline-offset-2 transition-colors hover:text-foreground"
        >
          or start a free account
          <ArrowRight className="h-3 w-3" aria-hidden />
        </Link>
      </p>
    </div>
  )
}

function BrandValueCells(): JSX.Element {
  return (
    <div className="relative border-t border-border">
      <GridCornerHandles top />
      <GridHandle className="-top-[3.5px] left-1/4 -ml-[3.5px] hidden lg:block" />
      <GridHandle className="-top-[3.5px] left-1/2 -ml-[3.5px] hidden sm:block" />
      <GridHandle className="-top-[3.5px] left-3/4 -ml-[3.5px] hidden lg:block" />
      <div className="grid divide-border max-sm:divide-y sm:grid-cols-2 lg:grid-cols-4 lg:divide-x">
        {BRAND_VALUE_CELLS.map(({ icon: Icon, title, description }, index) => (
          <div
            key={title}
            className={cn(
              'flex flex-col bg-card px-6 py-8 sm:px-8',
              index % 2 === 1 && 'sm:max-lg:border-l sm:max-lg:border-border',
              index >= 2 && 'sm:max-lg:border-t sm:max-lg:border-border',
            )}
          >
            <span className="flex items-center gap-2.5">
              <Icon className="h-4.5 w-4.5 text-primary" strokeWidth={2} aria-hidden />
              <span className="text-[15px] font-semibold tracking-tight text-foreground">
                {title}
              </span>
            </span>
            <span className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              {description}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ForBrandsHero(): JSX.Element {
  return (
    <section className="border-y border-border" aria-labelledby="for-brands-hero-heading">
      <div className="relative mx-auto max-w-6xl border-x border-border">
        <div className="relative px-6 py-20 sm:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_50%_30%,rgba(224,74,61,0.05),transparent_70%)]"
          />
          <FloatingEngineChips />
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">
              For brands
            </p>
            <h1
              id="for-brands-hero-heading"
              className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
            >
              Learn how AI talks about{' '}
              <span className="underline decoration-primary/60 decoration-dashed decoration-2 underline-offset-4">
                your brand
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              See how ChatGPT, Gemini, and Perplexity describe and cite you today - then close the
              gaps with a clear, prioritized plan.
            </p>
            <BrandAuditForm />
          </div>
        </div>
        <BrandValueCells />
      </div>
    </section>
  )
}
