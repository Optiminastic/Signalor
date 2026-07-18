import Link from 'next/link'

import { ArrowRight, Gauge, Globe, Link2, Rocket } from '@/features/site/components/icons'
import { GridCornerHandles, GridHandle } from '@/features/site/components/landing/home-grid'
import { HOME_WELL } from '@/features/site/components/landing/home-styles'
import {
  HOW_IT_WORKS_STEPS,
  type HowItWorksStep,
} from '@/features/site/lib/landing-how-it-works-content'
import { cn } from '@/features/site/lib/utils'

const STEP_LABELS: Record<HowItWorksStep['illo'], string> = {
  connect: 'Connect',
  audit: 'Audit',
  track: 'Track',
  ship: 'Ship',
}

/** Browser-bar mock: paste a domain, hit Connect. */
function ConnectIllo(): JSX.Element {
  return (
    <div className="flex w-full max-w-sm items-center gap-2.5 rounded-xl bg-card px-3.5 py-3 shadow-sm shadow-black/5 ring-1 ring-border">
      <Globe className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
      <span className="flex-1 truncate font-mono text-xs text-foreground">
        signalor.ai
        <span
          aria-hidden
          className="ml-0.5 inline-block h-3 w-[1.5px] translate-y-0.5 bg-foreground/70 motion-safe:animate-blink"
        />
      </span>
      <span className="rounded-md bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground shadow-sm shadow-black/10 transition-transform duration-200 motion-safe:group-hover:scale-105">
        Connect
      </span>
    </div>
  )
}

const AUDIT_PILLARS = [
  { label: 'Content', value: 82 },
  { label: 'Schema', value: 71 },
  { label: 'E-E-A-T', value: 76 },
  { label: 'Technical', value: 84 },
  { label: 'Entity', value: 69 },
  { label: 'AI visibility', value: 74 },
] as const

/** Six-pillar audit readout with segmented tick meters. */
function AuditIllo(): JSX.Element {
  return (
    <div className="w-full max-w-sm rounded-xl bg-card p-4 shadow-sm shadow-black/5 ring-1 ring-border">
      <div className="flex items-baseline justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          GEO audit
        </p>
        <p className="text-lg font-semibold tabular-nums tracking-tight text-foreground">
          78<span className="text-xs font-medium text-muted-foreground">/100</span>
        </p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2.5">
        {AUDIT_PILLARS.map((pillar) => {
          const filled = Math.round((pillar.value / 100) * 12)
          return (
            <div key={pillar.label}>
              <div className="flex items-center justify-between text-[10px] font-medium text-muted-foreground">
                <span>{pillar.label}</span>
                <span className="tabular-nums">{pillar.value}</span>
              </div>
              <div className="mt-1 flex items-center gap-[2px]">
                {Array.from({ length: 12 }, (_, i) => (
                  <span
                    key={i}
                    className={cn(
                      'h-3.5 w-[3px] rounded-[1px]',
                      i < filled ? 'bg-primary' : 'bg-neutral-200',
                    )}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/** Citation log: fresh mentions arriving engine by engine. */
function TrackIllo(): JSX.Element {
  const rows = [
    { engine: 'perplexity.ai', count: 8, fresh: true },
    { engine: 'gemini', count: 5, fresh: false },
    { engine: 'chatgpt', count: 3, fresh: false },
  ]
  return (
    <div className="w-full max-w-sm rounded-xl bg-card p-4 shadow-sm shadow-black/5 ring-1 ring-border">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        <Link2 className="h-3.5 w-3.5" aria-hidden />
        Citations this week
      </div>
      <ul className="mt-2.5 divide-y divide-border/70">
        {rows.map((row) => (
          <li key={row.engine} className="flex items-center gap-2.5 py-2.5">
            {row.fresh ? (
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span
                  aria-hidden
                  className="absolute inline-flex h-full w-full rounded-full bg-success/50 motion-safe:animate-ping [animation-duration:2.2s]"
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
            ) : (
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/20" />
            )}
            <span className="flex-1 truncate font-mono text-xs text-foreground">{row.engine}</span>
            {row.fresh ? (
              <span className="rounded-md bg-success/10 px-1.5 py-0.5 text-[10px] font-semibold text-success">
                +2 new
              </span>
            ) : null}
            <span className="w-5 text-right text-xs font-semibold tabular-nums text-muted-foreground">
              {row.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Fix shipping: the critical item flips to shipped on hover. */
function ShipIllo(): JSX.Element {
  return (
    <div className="w-full max-w-sm rounded-xl bg-card p-4 shadow-sm shadow-black/5 ring-1 ring-border">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        <Rocket className="h-3.5 w-3.5" aria-hidden />
        Fix queue
      </div>
      <div className="mt-2.5 flex items-center gap-2.5 rounded-lg bg-muted/60 px-3 py-2.5 ring-1 ring-border/70">
        <Gauge className="h-4 w-4 shrink-0 text-primary" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-foreground">Organization JSON-LD</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">High impact · ~2h</p>
        </div>
        <span className="relative inline-grid shrink-0 text-[10px] font-semibold uppercase">
          <span className="col-start-1 row-start-1 rounded-md bg-destructive/10 px-2 py-0.5 text-destructive transition-opacity duration-300 motion-safe:group-hover:opacity-0">
            Critical
          </span>
          <span className="col-start-1 row-start-1 rounded-md bg-success/10 px-2 py-0.5 text-center text-success opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100">
            Shipped
          </span>
        </span>
      </div>
      <p className="mt-2.5 text-[11px] leading-relaxed text-muted-foreground">
        Cited by Perplexity four days after shipping.
      </p>
    </div>
  )
}

const STEP_ILLOS: Record<HowItWorksStep['illo'], () => JSX.Element> = {
  connect: ConnectIllo,
  audit: AuditIllo,
  track: TrackIllo,
  ship: ShipIllo,
}

function StepBlock({ step }: { step: HowItWorksStep }): JSX.Element {
  const Illo = STEP_ILLOS[step.illo]
  return (
    <article className="group bg-card px-6 py-12 sm:px-10">
      <p className="font-mono text-[13px] text-muted-foreground">
        {String(step.n).padStart(2, '0')}. {STEP_LABELS[step.illo]}
      </p>
      <p className="mt-3 max-w-md text-pretty text-lg leading-snug text-muted-foreground">
        <strong className="font-semibold text-foreground">{step.title}.</strong> {step.body}
      </p>
      <div className={cn(HOME_WELL, 'mt-8 flex justify-center py-8')}>
        <Illo />
      </div>
    </article>
  )
}

export function HomeHowItWorks(): JSX.Element {
  return (
    <section id="how-it-works" className="scroll-mt-20" aria-labelledby="home-how-it-works-heading">
      <div className="relative border-t border-border">
        <GridCornerHandles top />
        <GridHandle className="-top-[3.5px] left-1/2 -ml-[3.5px] hidden lg:block" />
        <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-border">
          <div className="relative max-lg:border-b max-lg:border-border">
            <div className="px-6 py-14 sm:px-10 lg:sticky lg:top-24 lg:py-20">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">
                How it works
              </p>
              <h2
                id="home-how-it-works-heading"
                className="mt-3 max-w-md text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
              >
                From pasted URL to shipped fix
              </h2>
              <p className="mt-4 max-w-sm text-pretty text-base leading-relaxed text-muted-foreground">
                Sign up, paste a URL, get a score. No setup calls, no separate tools.
              </p>
              <Link
                href="/sign-up"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Start step one
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
          <div className="divide-y divide-border">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <StepBlock key={step.n} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
