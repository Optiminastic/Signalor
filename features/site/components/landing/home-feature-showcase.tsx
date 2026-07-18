import Image from 'next/image'

import { GitFork, Radar, RefreshCw, ShieldCheck, Zap } from '@/features/site/components/icons'
import { GridCornerHandles, GridHandle } from '@/features/site/components/landing/home-grid'
import { HOME_WELL } from '@/features/site/components/landing/home-styles'
import { cn } from '@/features/site/lib/utils'

type EngineRow = {
  name: string
  logo: string
  cited: boolean
  /** Flips from "Missing" to "Cited" on hover — the win Signalor delivers. */
  flipsOnHover?: boolean
}

const ENGINE_ROWS: EngineRow[] = [
  { name: 'ChatGPT', logo: '/logos/chatgpt.svg', cited: true },
  { name: 'Claude', logo: '/logos/claude.svg', cited: true },
  { name: 'Gemini', logo: '/logos/gemini.svg', cited: false, flipsOnHover: true },
  { name: 'Perplexity', logo: '/logos/perplexity.svg', cited: true },
]

/** Engine coverage list; the missing engine flips to "Cited" on hover. */
function EngineCoverageIllo(): JSX.Element {
  return (
    <div className="w-full max-w-75 rounded-xl bg-card p-2 shadow-sm shadow-black/5 ring-1 ring-border">
      <p className="px-2.5 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Engines
      </p>
      <ul className="divide-y divide-border/70">
        {ENGINE_ROWS.map((row) => (
          <li key={row.name} className="flex items-center gap-2.5 px-2.5 py-2">
            <Image src={row.logo} alt="" width={16} height={16} className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-[13px] font-medium text-foreground">{row.name}</span>
            {row.flipsOnHover ? (
              <span className="relative inline-grid text-[10px] font-semibold uppercase">
                <span className="col-start-1 row-start-1 rounded-md bg-muted px-1.5 py-0.5 text-muted-foreground ring-1 ring-border transition-opacity duration-300 motion-safe:group-hover:opacity-0">
                  Missing
                </span>
                <span className="col-start-1 row-start-1 rounded-md bg-success/10 px-1.5 py-0.5 text-center text-success opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100">
                  Cited
                </span>
              </span>
            ) : (
              <span className="rounded-md bg-success/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-success">
                Cited
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

const RUN_EVENTS = [
  { label: 'Weekly run · 128 prompts', meta: 'done', tone: 'text-muted-foreground' },
  { label: 'New citation · perplexity.ai', meta: '12s ago', tone: 'text-muted-foreground' },
  { label: 'Fix suggested · Product schema', meta: '3s ago', tone: 'text-muted-foreground' },
  { label: 'GEO score +4', meta: 'now', tone: 'text-success' },
] as const

/** Automation timeline; events step up in sequence on hover. */
function AutopilotIllo(): JSX.Element {
  return (
    <div className="w-full max-w-75">
      <div className="relative mx-auto flex w-fit items-center gap-2 rounded-full bg-card px-3 py-1 shadow-sm shadow-black/5 ring-1 ring-border">
        <span className="h-2 w-2 rounded-full bg-success" aria-hidden />
        <span className="text-xs font-medium text-foreground">Run completed</span>
      </div>
      <ul className="relative mt-3 space-y-2 pl-4">
        <span
          aria-hidden
          className="absolute bottom-3 left-1 top-1 w-px border-l border-dashed border-border"
        />
        {RUN_EVENTS.map((event, index) => (
          <li
            key={event.label}
            className="relative flex items-center gap-2 rounded-lg bg-card px-3 py-2 shadow-sm shadow-black/5 ring-1 ring-border transition-all duration-300 ease-out motion-safe:translate-y-0.5 motion-safe:opacity-80 motion-safe:group-hover:translate-y-0 motion-safe:group-hover:opacity-100"
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <span
              aria-hidden
              className="absolute -left-3.75 h-1.5 w-1.5 rounded-full bg-foreground/25 ring-2 ring-[#fafafa]"
            />
            <span className="flex-1 truncate text-xs font-medium text-foreground">
              {event.label}
            </span>
            <span className={cn('shrink-0 text-[10px] font-semibold tabular-nums', event.tone)}>
              {event.meta}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const MINI_FEATURES = [
  {
    icon: Zap,
    title: 'llms.txt & crawler checks',
    description: 'Validates llms.txt and robots directives for GPTBot, ClaudeBot, and friends.',
  },
  {
    icon: Radar,
    title: 'AI crawler analytics',
    description: 'Watch AI bots read your pages in real time, page by page.',
  },
  {
    icon: RefreshCw,
    title: 'Scheduled re-audits',
    description: 'Re-score on a cadence you choose and catch drift early.',
  },
  {
    icon: ShieldCheck,
    title: 'E-E-A-T signals',
    description: 'Trust markers scored across all six GEO pillars.',
  },
] as const

interface SpotlightCellProps {
  title: React.ReactNode
  description: string
  children: React.ReactNode
}

function SpotlightCell({ title, description, children }: SpotlightCellProps): JSX.Element {
  return (
    <div className="group flex flex-col bg-card px-6 py-12 sm:px-10">
      <div className={cn(HOME_WELL, 'flex min-h-56 flex-1 items-center justify-center')}>
        {children}
      </div>
      <h3 className="mt-8 text-center text-base font-semibold tracking-tight text-foreground sm:text-lg">
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

export function HomeFeatureShowcase(): JSX.Element {
  return (
    <section aria-labelledby="home-showcase-heading">
      <h2 id="home-showcase-heading" className="sr-only">
        How Signalor works under the hood
      </h2>
      <div className="relative border-t border-border">
        <GridCornerHandles top />
        <GridHandle className="-top-[3.5px] left-1/2 -ml-[3.5px] hidden lg:block" />
        <div className="grid grid-cols-1 divide-border max-lg:divide-y lg:grid-cols-2 lg:divide-x">
          <SpotlightCell
            title={
              <>
                <GitFork
                  className="mr-1.5 inline-block h-4 w-4 -translate-y-px text-primary"
                  aria-hidden
                />
                Every engine, one view
              </>
            }
            description="ChatGPT, Claude, Gemini, Perplexity, Copilot, and Google AI Overviews — tracked side by side, so a gap in one engine never hides behind a win in another."
          >
            <EngineCoverageIllo />
          </SpotlightCell>
          <SpotlightCell
            title="Runs on autopilot"
            description="Prompts re-run weekly. Every new citation, drop, and suggested fix lands in your queue automatically — no babysitting."
          >
            <AutopilotIllo />
          </SpotlightCell>
        </div>
      </div>
      <div className="relative border-t border-border">
        <GridCornerHandles top />
        <GridHandle className="-top-[3.5px] left-1/4 -ml-[3.5px] hidden lg:block" />
        <GridHandle className="-top-[3.5px] left-1/2 -ml-[3.5px] hidden lg:block" />
        <GridHandle className="-top-[3.5px] left-3/4 -ml-[3.5px] hidden lg:block" />
        <div className="grid grid-cols-1 divide-border max-lg:divide-y sm:max-lg:grid-cols-2 lg:grid-cols-4 lg:divide-x">
          {MINI_FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-card px-6 py-8 sm:px-8">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" strokeWidth={2} aria-hidden />
                <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
