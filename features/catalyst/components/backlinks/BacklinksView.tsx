'use client'

import { ExternalLink } from 'lucide-react'

import { STATUS_STYLE, type BacklinkOpp } from '@/features/catalyst/backlinks-data'
import { DashHeader, DashStatRow } from '@/features/catalyst/components/dash/DashStat'
import { DataState } from '@/features/catalyst/components/DataState'
import { useActiveProject } from '@/hooks/useActiveProject'
import { useBacklinks } from '@/hooks/useBacklinks'

const TH =
  'px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--cat-ink-3)]'
const TD = 'px-4 py-3 align-middle text-[13px]'

function SourceCell({ item }: { item: BacklinkOpp }): JSX.Element {
  return (
    <div className="flex items-center gap-2.5">
      {item.domain ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=64`}
          alt=""
          className="h-5 w-5 shrink-0 rounded-sm"
        />
      ) : (
        <span className="h-5 w-5 shrink-0 rounded-sm bg-[var(--cat-hover)]" />
      )}
      <div className="min-w-0">
        <p className="font-medium text-[var(--cat-ink)]">{item.name}</p>
        <p className="text-[12px] text-[var(--cat-ink-3)]">{item.domain}</p>
      </div>
    </div>
  )
}

function LinkRow({ item }: { item: BacklinkOpp }): JSX.Element {
  return (
    <tr className="border-t border-[var(--cat-border)] transition-colors hover:bg-[var(--cat-hover)]">
      <td className={TD}>
        <SourceCell item={item} />
      </td>
      <td className={TD}>
        <span className="rounded-md bg-[var(--cat-hover)] px-2 py-0.5 text-[12px] font-medium text-[var(--cat-ink-2)]">
          {item.category}
        </span>
      </td>
      <td className={`${TD} font-semibold text-[var(--cat-ink)] tabular-nums`}>P{item.priority}</td>
      <td className={TD}>
        <span
          className={`rounded-md px-2 py-0.5 text-[11px] font-medium capitalize ${STATUS_STYLE[item.status]}`}
        >
          {item.status}
        </span>
      </td>
      <td className={`${TD} text-right`}>
        {item.submitUrl ? (
          <a
            href={item.submitUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[var(--cat-border)] px-3 text-[12px] font-medium text-[var(--cat-ink-2)] transition-colors hover:bg-[var(--cat-hover)]"
          >
            <ExternalLink size={13} />
            Submit
          </a>
        ) : (
          <span className="text-[12px] text-[var(--cat-ink-3)]">—</span>
        )}
      </td>
    </tr>
  )
}

function LinkTable({ opps }: { opps: BacklinkOpp[] }): JSX.Element {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--cat-border)] bg-[var(--cat-card)]">
      <table className="w-full min-w-[600px] border-collapse">
        <thead>
          <tr>
            {['Source', 'Category', 'Priority', 'Status', ''].map(h => (
              <th key={h || 'a'} className={TH}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {opps.map(b => (
            <LinkRow key={b.id} item={b} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function BacklinksView(): JSX.Element {
  const { slug, isLoading: projectLoading } = useActiveProject()
  const { data, isLoading, isError } = useBacklinks(slug)

  return (
    <div className="mx-auto w-full max-w-[1100px]">
      <DashHeader
        title="Backlinks"
        subtitle="Earn citations on high-authority sites — LLMs index and weight these heavily."
      />
      <DataState
        isLoading={projectLoading || isLoading}
        isError={isError}
        isEmpty={!slug || !data || data.opps.length === 0}
        emptyTitle="No backlink opportunities yet"
        emptyHint="Run an analysis for this project to surface citation and backlink opportunities."
      >
        {data && (
          <>
            <div className="mb-5">
              <DashStatRow stats={data.stats} />
            </div>
            <LinkTable opps={data.opps} />
          </>
        )}
      </DataState>
    </div>
  )
}
