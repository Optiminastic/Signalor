import Image from 'next/image'

import { GridCornerHandles, GridHandle } from '@/features/site/components/landing/home-grid'
import { HomeSectionHeader } from '@/features/site/components/landing/home-section-header'
import { HOME_WELL } from '@/features/site/components/landing/home-styles'
import { cn } from '@/features/site/lib/utils'

/**
 * Segmented tick meter — the project-wide convention for score/progress
 * (adapted from `TickBar` in features/catalyst BrandBits; kept local because
 * features must not import from other features).
 */
function TickMeter({
  value,
  ticks = 24,
  gain = 0,
}: {
  value: number
  ticks?: number
  gain?: number
}): JSX.Element {
  const filled = Math.round((value / 100) * ticks)
  return (
    <div className="flex items-center gap-[2px]" role="presentation">
      {Array.from({ length: ticks }, (_, i) => {
        const isGain = gain > 0 && i >= filled && i < filled + gain
        return (
          <span
            key={i}
            className={cn(
              'h-3.5 w-[3px] rounded-[1px]',
              i < filled ? 'bg-primary' : 'bg-neutral-200',
              isGain &&
                'bg-neutral-200 transition-colors duration-300 group-hover:bg-primary/60',
            )}
            style={isGain ? { transitionDelay: `${(i - filled) * 90}ms` } : undefined}
          />
        )
      })}
    </div>
  )
}

/** Chat exchange: blinking caret in the prompt, answer slides in on hover. */
function PromptTrackingIllo(): JSX.Element {
  return (
    <div className="w-full max-w-xs space-y-3 text-[13px] leading-snug">
      <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-card px-3.5 py-2.5 text-foreground shadow-sm shadow-black/5 ring-1 ring-border">
        What CRM do you recommend for a small sales team?
        <span
          aria-hidden
          className="ml-0.5 inline-block h-3.5 w-[1.5px] translate-y-0.5 bg-foreground/70 motion-safe:animate-blink"
        />
      </div>
      <div className="ml-auto max-w-[90%] rounded-2xl rounded-br-md bg-foreground px-3.5 py-2.5 text-xs font-medium text-background/80 shadow-md shadow-black/10 transition-all duration-300 ease-out motion-safe:translate-y-1 motion-safe:opacity-80 motion-safe:group-hover:translate-y-0 motion-safe:group-hover:opacity-100">
        Popular picks include <span className="font-semibold text-orange-300">HubSpot</span> and{' '}
        <span className="text-background underline decoration-background/40">Salesforce</span> for
        pipeline and reporting.
      </div>
    </div>
  )
}

/** Score readout with the segmented tick meter; gain ticks light up on hover. */
function GeoScoreIllo(): JSX.Element {
  return (
    <div className="w-full max-w-[260px] rounded-xl bg-card p-4 shadow-sm shadow-black/5 ring-1 ring-border">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            GEO score
          </p>
          <p className="mt-1 text-3xl font-semibold tabular-nums tracking-tight text-foreground">
            78<span className="text-base font-medium text-muted-foreground">/100</span>
          </p>
        </div>
        <span className="mb-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-bold tabular-nums text-success">
          +12
        </span>
      </div>
      <div className="mt-3">
        <TickMeter value={78} gain={3} />
      </div>
      <div className="mt-3 space-y-2 border-t border-border pt-3">
        {[
          { label: 'Citability', value: 82 },
          { label: 'Schema', value: 71 },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3">
            <span className="w-16 shrink-0 text-[11px] font-medium text-muted-foreground">
              {row.label}
            </span>
            <TickMeter value={row.value} ticks={16} />
            <span className="w-6 text-right text-[11px] font-semibold tabular-nums text-foreground">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Cited-pages list with tick meters per page. */
function CitationsIllo(): JSX.Element {
  return (
    <div className="w-full max-w-[260px] rounded-xl bg-card p-4 shadow-sm shadow-black/5 ring-1 ring-border">
      <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        <span>Cited pages · 7d</span>
        <span className="tabular-nums normal-case tracking-normal">24 citations</span>
      </div>
      <ul className="mt-3 space-y-2.5">
        {[
          { path: '/blog/geo-guide', pct: 62 },
          { path: '/docs/schema', pct: 38 },
          { path: '/pricing', pct: 26 },
        ].map((row) => (
          <li key={row.path} className="flex items-center justify-between gap-3">
            <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-foreground">
              {row.path}
            </span>
            <TickMeter value={row.pct} ticks={14} />
            <span className="w-8 text-right text-[11px] font-semibold tabular-nums text-muted-foreground">
              {row.pct}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Task list; the critical dot pings, the done check pops on hover. */
function FixQueueIllo(): JSX.Element {
  return (
    <ul className="w-full max-w-[260px] divide-y divide-border rounded-xl bg-card px-4 py-1 text-xs font-medium shadow-sm shadow-black/5 ring-1 ring-border">
      <li className="flex items-center gap-2.5 py-3">
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span
            aria-hidden
            className="absolute inline-flex h-full w-full rounded-full bg-destructive/60 motion-safe:animate-ping"
          />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-destructive" />
        </span>
        <span className="flex-1 truncate text-foreground">Add Organization JSON-LD</span>
        <span className="shrink-0 rounded-md bg-destructive/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-destructive">
          Critical
        </span>
      </li>
      <li className="flex items-center gap-2.5 py-3">
        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
        <span className="flex-1 truncate text-foreground">Rewrite meta for /pricing</span>
        <span className="shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground ring-1 ring-border">
          Next
        </span>
      </li>
      <li className="flex items-center gap-2.5 py-3">
        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
        <span className="flex-1 truncate text-foreground">Publish FAQ block on /docs</span>
        <span className="shrink-0 rounded-md bg-success/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-success transition-transform duration-200 motion-safe:group-hover:scale-110">
          Done
        </span>
      </li>
    </ul>
  )
}

/** Citation-share race lanes; the "You" marker advances on hover. */
function CompetitorIllo(): JSX.Element {
  const lanes = [
    { name: 'Acme', pct: 44, you: false },
    { name: 'You', pct: 38, you: true },
    { name: 'Northwind', pct: 18, you: false },
  ]
  return (
    <div className="w-full max-w-[260px] rounded-xl bg-card p-4 shadow-sm shadow-black/5 ring-1 ring-border">
      <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        <span>Share of AI citations</span>
        <span className="tabular-nums normal-case tracking-normal">7d</span>
      </div>
      <div className="mt-3 space-y-3.5">
        {lanes.map((lane) => (
          <div key={lane.name} className="flex items-center gap-2.5">
            <span
              className={cn(
                'w-16 shrink-0 truncate text-[11px]',
                lane.you ? 'font-bold text-primary' : 'font-medium text-muted-foreground',
              )}
            >
              {lane.name}
            </span>
            <div className="relative h-4 flex-1">
              <span
                aria-hidden
                className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border"
              />
              <span
                aria-hidden
                className={cn(
                  'absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ring-2 ring-card',
                  lane.you
                    ? 'bg-primary shadow-sm shadow-primary/40 transition-all duration-500 ease-out motion-safe:group-hover:left-[58%]'
                    : 'bg-foreground/30',
                )}
                style={{ left: `${lane.pct}%` }}
              />
            </div>
            <span
              className={cn(
                'w-8 shrink-0 text-right text-[11px] font-semibold tabular-nums',
                lane.you ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              {lane.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Auto-fix toggle: the switch flips on and the badge confirms on hover. */
function AutoFixIllo(): JSX.Element {
  return (
    <div className="w-full max-w-[260px] rounded-xl bg-card p-4 shadow-sm shadow-black/5 ring-1 ring-border">
      <div className="flex items-center gap-2.5">
        <Image src="/logos/shopify.svg" alt="Shopify" width={22} height={22} className="h-[22px] w-[22px]" />
        <Image src="/logos/wordpress.svg" alt="WordPress" width={22} height={22} className="h-[22px] w-[22px]" />
        <span className="ml-auto rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-success opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100">
          Applied
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2.5 ring-1 ring-border/70">
        <div>
          <p className="text-xs font-semibold text-foreground">Auto-fix schema</p>
          <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">Organization · FAQ · Product</p>
        </div>
        <span
          aria-hidden
          className="relative inline-flex h-5 w-9 shrink-0 rounded-full bg-neutral-300 transition-colors duration-300 motion-safe:group-hover:bg-primary"
        >
          <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 motion-safe:group-hover:translate-x-4" />
        </span>
      </div>
      <p className="mt-2.5 text-[11px] leading-relaxed text-muted-foreground">
        Fixes ship straight to your theme. No engineer needed.
      </p>
    </div>
  )
}

type Feature = {
  title: string
  description: string
  illo: JSX.Element
}

const FEATURES_ROW_ONE: Feature[] = [
  {
    title: 'Prompt tracking',
    description: 'Run real user prompts weekly and see exactly when AI mentions your brand.',
    illo: <PromptTrackingIllo />,
  },
  {
    title: 'GEO score',
    description: 'One 0-100 read on citability, schema, and content. Know where you stand.',
    illo: <GeoScoreIllo />,
  },
  {
    title: 'Citations analysis',
    description: 'See which pages actually drive citations, and double down on what works.',
    illo: <CitationsIllo />,
  },
]

const FEATURES_ROW_TWO: Feature[] = [
  {
    title: 'Fix queue',
    description: 'Ranked fixes with impact estimates. Ship what moves citations first.',
    illo: <FixQueueIllo />,
  },
  {
    title: 'Competitor lens',
    description: 'Compare your citation share with rivals and close gaps before they widen.',
    illo: <CompetitorIllo />,
  },
  {
    title: 'Auto-fix for Shopify & WordPress',
    description: 'Push schema and meta fixes straight into your store or CMS in one click.',
    illo: <AutoFixIllo />,
  },
]

function FeatureCell({ feature }: { feature: Feature }): JSX.Element {
  return (
    <div className="group flex flex-col bg-card px-6 py-10 sm:px-8">
      <div className={cn(HOME_WELL, 'flex min-h-44 flex-1 items-center justify-center')}>
        {feature.illo}
      </div>
      <h3 className="mt-7 text-center text-base font-semibold tracking-tight text-foreground">
        {feature.title}
      </h3>
      <p className="mx-auto mt-2 max-w-xs text-center text-sm leading-relaxed text-muted-foreground">
        {feature.description}
      </p>
    </div>
  )
}

function FeatureRow({
  features,
  rule,
}: {
  features: Feature[]
  rule: 'top' | 'none'
}): JSX.Element {
  return (
    <div className={cn('relative', rule === 'top' && 'border-t border-border')}>
      {rule === 'top' ? (
        <>
          <GridCornerHandles top />
          <GridHandle className="-top-[3.5px] left-1/3 -ml-[3.5px] hidden lg:block" />
          <GridHandle className="-top-[3.5px] left-2/3 -ml-[3.5px] hidden lg:block" />
        </>
      ) : null}
      <div className="grid grid-cols-1 divide-border max-lg:divide-y lg:grid-cols-3 lg:divide-x">
        {features.map((feature) => (
          <FeatureCell key={feature.title} feature={feature} />
        ))}
      </div>
    </div>
  )
}

export function HomeFeatures(): JSX.Element {
  return (
    <section id="features" className="scroll-mt-20" aria-labelledby="home-features-heading">
      <div className="relative border-y border-border px-6 py-14 sm:py-16">
        <GridCornerHandles top />
        <HomeSectionHeader
          eyebrow="Platform"
          headingId="home-features-heading"
          title="Everything you need to win in AI search"
          description="Score, track, and improve how AI engines cite your brand — one workspace instead of five tools."
        />
      </div>
      <div className="relative">
        <FeatureRow features={FEATURES_ROW_ONE} rule="none" />
        <FeatureRow features={FEATURES_ROW_TWO} rule="top" />
        <div aria-hidden className="relative border-t border-border">
          <GridCornerHandles top />
          <GridHandle className="-top-[3.5px] left-1/3 -ml-[3.5px] hidden lg:block" />
          <GridHandle className="-top-[3.5px] left-2/3 -ml-[3.5px] hidden lg:block" />
        </div>
      </div>
    </section>
  )
}
