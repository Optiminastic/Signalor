import Image from 'next/image'

import { GridCornerHandles, GridHandle } from '@/features/site/components/landing/home-grid'
import { HomeSectionHeader } from '@/features/site/components/landing/home-section-header'
import { HOME_WELL } from '@/features/site/components/landing/home-styles'
import { FOR_BRANDS_PROOF_METRICS } from '@/features/site/lib/landing-for-brands-content'
import { cn } from '@/features/site/lib/utils'

/** How an AI answer actually mentions the brand — sentiment included. */
function AnswerSpotlightIllo(): JSX.Element {
  return (
    <div className="w-full max-w-sm space-y-3 text-[13px] leading-snug">
      <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-card px-3.5 py-2.5 text-foreground shadow-sm shadow-black/5 ring-1 ring-border">
        What are the best DTC sneaker brands?
      </div>
      <div className="ml-auto max-w-[92%] rounded-2xl rounded-br-md bg-foreground px-3.5 py-2.5 text-xs font-medium text-background/80 shadow-md shadow-black/10">
        For quality and fit, <span className="font-semibold text-orange-300">Vault Apparel</span>{' '}
        is a frequent pick - reviewers cite its sizing guide and repair program.
      </div>
      <div className="ml-auto flex w-fit items-center gap-2 rounded-full bg-card px-3 py-1 shadow-sm shadow-black/5 ring-1 ring-border">
        <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
        <span className="text-[11px] font-semibold text-foreground">Positive · Cited</span>
        <span className="text-[10px] tabular-nums text-muted-foreground">2 sources</span>
      </div>
    </div>
  )
}

/** Prompt coverage: where the brand shows up, and where it is absent. */
function PromptCoverageIllo(): JSX.Element {
  const rows = [
    { prompt: 'best crm for startups', engine: 'ChatGPT', logo: '/logos/chatgpt.svg', cited: true },
    { prompt: 'crm with a free tier', engine: 'Gemini', logo: '/logos/gemini.svg', cited: false },
    { prompt: 'top crm tools 2026', engine: 'Perplexity', logo: '/logos/perplexity.svg', cited: true },
  ]
  return (
    <ul className="w-full max-w-sm divide-y divide-border/70 rounded-xl bg-card px-3 py-1 shadow-sm shadow-black/5 ring-1 ring-border">
      {rows.map((row) => (
        <li key={row.prompt} className="flex items-center gap-2.5 py-2.5">
          <Image src={row.logo} alt={row.engine} width={16} height={16} className="h-4 w-4 shrink-0" />
          <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-foreground">
            &ldquo;{row.prompt}&rdquo;
          </span>
          <span
            className={cn(
              'shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase',
              row.cited
                ? 'bg-success/10 text-success'
                : 'bg-muted text-muted-foreground ring-1 ring-border',
            )}
          >
            {row.cited ? 'Cited' : 'Missing'}
          </span>
        </li>
      ))}
    </ul>
  )
}

/** AI referral traffic moving after fixes ship. */
function ReferralTrafficIllo(): JSX.Element {
  const rows = [
    { source: 'chatgpt.com', share: 46, delta: '+38%' },
    { source: 'perplexity.ai', share: 31, delta: '+21%' },
    { source: 'gemini.google.com', share: 23, delta: '+9%' },
  ]
  return (
    <div className="w-full max-w-sm rounded-xl bg-card p-4 shadow-sm shadow-black/5 ring-1 ring-border">
      <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        <span>AI referral traffic</span>
        <span className="tabular-nums normal-case tracking-normal">30d</span>
      </div>
      <ul className="mt-3 space-y-2.5">
        {rows.map((row) => {
          const ticks = 14
          const filled = Math.round((row.share / 100) * ticks)
          return (
            <li key={row.source} className="flex items-center gap-3">
              <span className="w-28 shrink-0 truncate font-mono text-[11px] text-foreground">
                {row.source}
              </span>
              <span className="flex flex-1 items-center gap-[2px]" role="presentation">
                {Array.from({ length: ticks }, (_, i) => (
                  <span
                    key={i}
                    className={cn(
                      'h-3.5 w-[3px] rounded-[1px]',
                      i < filled ? 'bg-primary' : 'bg-neutral-200',
                    )}
                  />
                ))}
              </span>
              <span className="shrink-0 rounded-full bg-success/10 px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-success">
                {row.delta}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const REPUTATION_CELLS = [
  {
    title: 'See the exact answer',
    description:
      'Read how each engine describes you - phrasing, sentiment, and which sources it leans on.',
    illo: <AnswerSpotlightIllo />,
  },
  {
    title: 'Find the missing prompts',
    description:
      'Track the buyer questions where rivals get cited and you are absent, engine by engine.',
    illo: <PromptCoverageIllo />,
  },
  {
    title: 'Watch referrals move',
    description:
      'Connect analytics and see AI referral traffic shift as your fixes ship and citations land.',
    illo: <ReferralTrafficIllo />,
  },
]

function ReputationGrid(): JSX.Element {
  return (
    <section aria-labelledby="for-brands-reputation-heading">
      <div className="relative border-b border-border px-6 py-14 sm:py-16">
        <HomeSectionHeader
          eyebrow="Your AI reputation"
          headingId="for-brands-reputation-heading"
          title="From vague worry to a working plan"
          description="Stop guessing what ChatGPT says about you. See the answers, find the gaps, and measure the recovery."
        />
      </div>
      <div className="relative">
        <GridHandle className="-top-[3.5px] left-1/3 -ml-[3.5px] hidden lg:block" />
        <GridHandle className="-top-[3.5px] left-2/3 -ml-[3.5px] hidden lg:block" />
        <div className="grid grid-cols-1 divide-border max-lg:divide-y lg:grid-cols-3 lg:divide-x">
          {REPUTATION_CELLS.map((cell) => (
            <div key={cell.title} className="group flex flex-col bg-card px-6 py-10 sm:px-8">
              <div className={cn(HOME_WELL, 'flex min-h-44 flex-1 items-center justify-center')}>
                {cell.illo}
              </div>
              <h3 className="mt-7 text-center text-base font-semibold tracking-tight text-foreground">
                {cell.title}
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-center text-sm leading-relaxed text-muted-foreground">
                {cell.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BrandStats(): JSX.Element {
  return (
    <section aria-labelledby="for-brands-stats-heading">
      <div className="relative border-t border-border">
        <GridCornerHandles top />
        <GridHandle className="-top-[3.5px] left-1/2 -ml-[3.5px] hidden lg:block" />
        <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-border">
          <div className="flex flex-col justify-center px-6 py-14 max-lg:border-b max-lg:border-border sm:px-10 lg:py-20">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">
              Proof
            </p>
            <h2
              id="for-brands-stats-heading"
              className="mt-3 max-w-md text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Brands measure the shift, not the vibes
            </h2>
            <p className="mt-4 max-w-sm text-pretty text-base leading-relaxed text-muted-foreground">
              AI-referred visitors arrive with the answer already read - what changes is{' '}
              <strong className="font-semibold text-foreground">
                whether that answer cites you
              </strong>
              .
            </p>
          </div>
          <dl className="grid gap-x-10 gap-y-10 px-6 py-14 sm:grid-cols-2 sm:px-10 lg:py-20">
            {FOR_BRANDS_PROOF_METRICS.map((stat) => (
              <div
                key={stat.label}
                className="border-l-2 border-foreground/15 pl-4 transition-colors duration-200 hover:border-primary"
              >
                <dd className="text-3xl font-semibold tabular-nums tracking-tight text-foreground sm:text-4xl">
                  {stat.value}
                </dd>
                <dt className="mt-2 max-w-[15rem] text-pretty text-sm leading-relaxed text-muted-foreground">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

/** The mid-page sections for /for-brands, inside the page rail. */
export function ForBrandsSections(): JSX.Element {
  return (
    <div className="border-border mx-auto max-w-6xl border-x">
      <ReputationGrid />
      <BrandStats />
    </div>
  )
}
