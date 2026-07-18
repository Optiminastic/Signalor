import { GridCornerHandles, GridHandle } from '@/features/site/components/landing/home-grid'

// Proof metrics. Values carry over from the previous "Why Signalor" section —
// update here when real numbers land.
const HOME_STATS = [
  { value: '5k+', lead: 'Websites optimizing', rest: 'with Signalor to grow their AI citations.' },
  { value: '40%', lead: 'Average lift in AI citations', rest: 'after shipping the fix queue.' },
  { value: '40%', lead: 'Higher buyer intent', rest: 'from AI-referred visitors.' },
  { value: '24h', lead: 'To see visibility growth', rest: 'after your first shipped fix.' },
] as const

export function HomeStats(): JSX.Element {
  return (
    <section aria-labelledby="home-stats-heading">
      <div className="relative border-t border-border">
        <GridCornerHandles top />
        <GridHandle className="-top-[3.5px] left-1/2 -ml-[3.5px] hidden lg:block" />
        <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-border">
          <div className="flex flex-col justify-center px-6 py-14 max-lg:border-b max-lg:border-border sm:px-10 lg:py-20">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">
              Proof
            </p>
            <h2
              id="home-stats-heading"
              className="mt-3 max-w-md text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              The numbers behind the answers
            </h2>
            <p className="mt-4 max-w-sm text-pretty text-base leading-relaxed text-muted-foreground">
              Teams use Signalor to turn AI answers into{' '}
              <strong className="font-semibold text-foreground">measurable pipeline</strong>, not
              another vanity dashboard.
            </p>
          </div>
          <dl className="grid gap-x-10 gap-y-10 px-6 py-14 sm:grid-cols-2 sm:px-10 lg:py-20">
            {HOME_STATS.map((stat) => (
              <div key={stat.lead} className="border-l-2 border-foreground/15 pl-4 transition-colors duration-200 hover:border-primary">
                <dd className="text-3xl font-semibold tabular-nums tracking-tight text-foreground sm:text-4xl">
                  {stat.value}
                </dd>
                <dt className="mt-2 max-w-[16rem] text-pretty text-sm leading-relaxed text-muted-foreground">
                  <strong className="font-semibold text-foreground">{stat.lead}</strong>{' '}
                  {stat.rest}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
