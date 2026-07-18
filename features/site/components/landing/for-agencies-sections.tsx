import { GridCornerHandles, GridHandle } from '@/features/site/components/landing/home-grid'
import { HomeSectionHeader } from '@/features/site/components/landing/home-section-header'
import { HOME_WELL } from '@/features/site/components/landing/home-styles'
import {
  FOR_AGENCIES_CAPABILITY_ROWS,
  FOR_AGENCIES_FEATURES_INTRO,
  FOR_AGENCIES_PROOF_METRICS,
} from '@/features/site/lib/landing-for-agencies-content'
import { cn } from '@/features/site/lib/utils'

function TickMeter({ value, ticks = 14 }: { value: number; ticks?: number }): JSX.Element {
  const filled = Math.round((value / 100) * ticks)
  return (
    <span className="flex items-center gap-[2px]" role="presentation">
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
  )
}

/** Roster list: every client as its own tracked project. */
function RosterIllo(): JSX.Element {
  const rows = [
    { name: 'Acme Retail', initial: 'A', meta: 'GEO 78 · 214 pages · run 2h ago' },
    { name: 'Northwind Labs', initial: 'N', meta: 'GEO 64 · 88 pages · run 1d ago' },
    { name: 'Vertex Cloud', initial: 'V', meta: 'GEO 52 · 132 pages · run 3d ago' },
  ]
  return (
    <ul className="w-full max-w-75 divide-y divide-border/70 rounded-xl bg-card px-3 py-1 shadow-sm shadow-black/5 ring-1 ring-border">
      {rows.map((row) => (
        <li key={row.name} className="flex items-center gap-2.5 py-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-[11px] font-semibold text-foreground ring-1 ring-border">
            {row.initial}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-semibold text-foreground">
              {row.name}
            </span>
            <span className="block truncate text-[10px] tabular-nums text-muted-foreground">
              {row.meta}
            </span>
          </span>
        </li>
      ))}
    </ul>
  )
}

/** Per-client score card with pillar tick meters. */
function ClientScoreIllo(): JSX.Element {
  const pillars = [
    { label: 'Schema', value: 71 },
    { label: 'Content', value: 74 },
    { label: 'E-E-A-T', value: 61 },
  ]
  return (
    <div className="w-full max-w-75 rounded-xl bg-card p-4 shadow-sm shadow-black/5 ring-1 ring-border">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Acme Retail · GEO
          </p>
          <p className="mt-1 text-3xl font-semibold tabular-nums tracking-tight text-foreground">
            78<span className="text-base font-medium text-muted-foreground">/100</span>
          </p>
        </div>
        <span className="mb-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-bold tabular-nums text-success">
          +12
        </span>
      </div>
      <div className="mt-3 space-y-2 border-t border-border pt-3">
        {pillars.map((pillar) => (
          <div key={pillar.label} className="flex items-center justify-between gap-3">
            <span className="w-14 shrink-0 text-[11px] font-medium text-muted-foreground">
              {pillar.label}
            </span>
            <TickMeter value={pillar.value} />
            <span className="w-6 text-right text-[11px] font-semibold tabular-nums text-foreground">
              {pillar.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Client-scoped fix queue with estimated GEO lift. */
function FixQueueIllo(): JSX.Element {
  return (
    <ul className="w-full max-w-75 divide-y divide-border rounded-xl bg-card px-4 py-1 text-xs font-medium shadow-sm shadow-black/5 ring-1 ring-border">
      <li className="flex items-center gap-2.5 py-3">
        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-foreground">Organization JSON-LD · Acme</span>
          <span className="block truncate text-[10px] font-normal text-muted-foreground">
            Site-wide · est +4 GEO
          </span>
        </span>
        <span className="shrink-0 rounded-md bg-destructive/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-destructive">
          Critical
        </span>
      </li>
      <li className="flex items-center gap-2.5 py-3">
        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-foreground">FAQ schema · Northwind</span>
          <span className="block truncate text-[10px] font-normal text-muted-foreground">
            Template · est +2 GEO
          </span>
        </span>
        <span className="shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground ring-1 ring-border">
          Next
        </span>
      </li>
      <li className="flex items-center gap-2.5 py-3">
        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-foreground">Author bios · Vertex</span>
          <span className="block truncate text-[10px] font-normal text-muted-foreground">
            Shipped · cite lift
          </span>
        </span>
        <span className="shrink-0 rounded-md bg-success/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-success">
          Done
        </span>
      </li>
    </ul>
  )
}

const ROSTER_CELLS = [
  {
    title: 'One roster, every brand',
    description:
      'See each client as its own tracked project - GEO score, page count, and last run - without switching workspaces.',
    illo: <RosterIllo />,
  },
  {
    title: 'Per-client GEO score',
    description:
      'One 0-100 read per brand across schema, content, E-E-A-T, and technical, so each review opens on a number.',
    illo: <ClientScoreIllo />,
  },
  {
    title: 'White-label fix queue',
    description:
      'Each audit becomes a ranked, client-scoped task list - execute it in-house or hand it to their developers.',
    illo: <FixQueueIllo />,
  },
]

function RosterGrid(): JSX.Element {
  return (
    <section aria-labelledby="for-agencies-roster-heading">
      <div className="relative border-b border-border px-6 py-14 sm:py-16">
        <HomeSectionHeader
          eyebrow="For agencies"
          headingId="for-agencies-roster-heading"
          title={`${FOR_AGENCIES_FEATURES_INTRO.titleBefore} ${FOR_AGENCIES_FEATURES_INTRO.titleAccent}`}
          description="Answer engines cite structure, schema, and trust signals - not blue-link rankings. Signalor keeps those markers healthy across every client."
        />
      </div>
      <div className="relative">
        <GridHandle className="-top-[3.5px] left-1/3 -ml-[3.5px] hidden lg:block" />
        <GridHandle className="-top-[3.5px] left-2/3 -ml-[3.5px] hidden lg:block" />
        <div className="grid grid-cols-1 divide-border max-lg:divide-y lg:grid-cols-3 lg:divide-x">
          {ROSTER_CELLS.map((cell) => (
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

function AgencyStats(): JSX.Element {
  return (
    <section aria-labelledby="for-agencies-stats-heading">
      <div className="relative border-t border-border">
        <GridCornerHandles top />
        <GridHandle className="-top-[3.5px] left-1/2 -ml-[3.5px] hidden lg:block" />
        <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-border">
          <div className="flex flex-col justify-center px-6 py-14 max-lg:border-b max-lg:border-border sm:px-10 lg:py-20">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">
              Built for rosters
            </p>
            <h2
              id="for-agencies-stats-heading"
              className="mt-3 max-w-md text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              One login, a full book of business
            </h2>
            <p className="mt-4 max-w-sm text-pretty text-base leading-relaxed text-muted-foreground">
              Rolled-up scores and shared prompt libraries mean{' '}
              <strong className="font-semibold text-foreground">
                one strategist runs AI search for twenty clients
              </strong>{' '}
              without spreadsheets.
            </p>
          </div>
          <dl className="grid gap-x-10 gap-y-10 px-6 py-14 sm:grid-cols-2 sm:px-10 lg:py-20">
            {FOR_AGENCIES_PROOF_METRICS.map((stat) => (
              <div
                key={stat.label}
                className="border-l-2 border-foreground/15 pl-4 transition-colors duration-200 hover:border-primary"
              >
                <dd className="text-3xl font-semibold tabular-nums tracking-tight text-foreground sm:text-4xl">
                  {stat.value}
                </dd>
                <dt className="mt-2 max-w-[14rem] text-pretty text-sm leading-relaxed text-muted-foreground">
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

function AgencyCapabilities(): JSX.Element {
  return (
    <section aria-labelledby="for-agencies-capabilities-heading">
      <div className="relative border-t border-border px-6 py-14 sm:py-16">
        <GridCornerHandles top />
        <HomeSectionHeader
          eyebrow="Retainer-ready"
          headingId="for-agencies-capabilities-heading"
          title="Deliverables your account managers can present"
          description="Every audit ends in something a client meeting can open with: a score, a report, and a ranked plan."
        />
      </div>
      <div className="relative border-t border-border">
        <GridCornerHandles top />
        <GridHandle className="-top-[3.5px] left-1/4 -ml-[3.5px] hidden lg:block" />
        <GridHandle className="-top-[3.5px] left-1/2 -ml-[3.5px] hidden sm:block" />
        <GridHandle className="-top-[3.5px] left-3/4 -ml-[3.5px] hidden lg:block" />
        <div className="grid divide-border max-sm:divide-y sm:grid-cols-2 lg:grid-cols-4 lg:divide-x">
          {FOR_AGENCIES_CAPABILITY_ROWS.map(({ icon: Icon, title, description }, index) => (
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
    </section>
  )
}

/** The three mid-page sections for /for-agencies, inside the page rail. */
export function ForAgenciesSections(): JSX.Element {
  return (
    <div className="mx-auto max-w-6xl border-x border-border">
      <RosterGrid />
      <AgencyStats />
      <AgencyCapabilities />
    </div>
  )
}
