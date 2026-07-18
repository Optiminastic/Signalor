import { Card } from '@/features/catalyst/components/Card'
import { CardHead } from '@/features/catalyst/components/CardHead'
import type { CrawlerBot, CrawlerLogsData } from '@/hooks/useCrawlerLogs'

function VolumeRow({
  label,
  hits,
  max,
  color,
}: {
  label: string
  hits: number
  max: number
  color: string
}): JSX.Element {
  const width = Math.max(6, Math.round((hits / max) * 100))
  return (
    <div className="flex items-center gap-2.5 py-2 first:pt-0 last:pb-0">
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-[var(--cat-ink)]">{label}</p>
        <span className="mt-1 flex h-1 w-full overflow-hidden rounded-full bg-[var(--cat-track)]">
          <span className="rounded-full" style={{ width: `${width}%`, background: color }} />
        </span>
      </div>
      <span className="shrink-0 text-[12px] font-semibold text-[var(--cat-ink)] tabular-nums">
        {hits}
      </span>
    </div>
  )
}

/** Which AI bots hit the site most in the last 30 days. */
export function TopCrawlersCard({ bots }: { bots: CrawlerBot[] }): JSX.Element {
  const max = Math.max(1, ...bots.map(b => b.hits))
  return (
    <Card>
      <CardHead title="Top crawlers" />
      <div className="divide-y divide-[var(--cat-border-soft)]">
        {bots.slice(0, 8).map(bot => (
          <VolumeRow key={bot.bot} label={bot.label} hits={bot.hits} max={max} color={bot.color} />
        ))}
      </div>
    </Card>
  )
}

/** Which pages AI bots visit most. */
export function TopPagesCard({ data }: { data: CrawlerLogsData }): JSX.Element {
  const pages = data.raw.pages
  const max = Math.max(1, ...pages.map(p => p.hits))
  return (
    <Card>
      <CardHead title="Top pages" />
      <div className="divide-y divide-[var(--cat-border-soft)]">
        {pages.length === 0 ? (
          <p className="py-3 text-[12px] text-[var(--cat-ink-3)]">No page data yet.</p>
        ) : (
          pages.map(page => (
            <VolumeRow
              key={page.path}
              label={page.path || '/'}
              hits={page.hits}
              max={max}
              color="#3B9EF6"
            />
          ))
        )}
      </div>
    </Card>
  )
}
