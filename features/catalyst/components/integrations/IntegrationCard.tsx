import { Check } from 'lucide-react'

import type { Integration } from '@/features/catalyst/integrations-data'

export function IntegrationCard({ item }: { item: Integration }): JSX.Element {
  return (
    <div className="flex flex-col rounded-lg border border-[var(--cat-border)] bg-[var(--cat-card)] p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-md border border-[var(--cat-border)] bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.logo} alt="" className="h-6 w-6 object-contain" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold text-[var(--cat-ink)]">{item.name}</p>
          {item.connected ? (
            <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-[#2FBE7E]">
              <Check size={12} strokeWidth={2.5} />
              Connected
            </span>
          ) : (
            <span className="mt-0.5 text-[11px] font-medium text-[var(--cat-ink-3)]">
              Not connected
            </span>
          )}
        </div>
      </div>

      <p className="mt-3 flex-1 text-[13px] leading-relaxed text-[var(--cat-ink-2)]">
        {item.description}
      </p>

      <button
        type="button"
        className={
          item.connected
            ? 'mt-4 h-9 rounded-md border border-[var(--cat-border)] bg-[var(--cat-card)] text-[13px] font-medium text-[var(--cat-ink)] transition-colors hover:bg-[var(--cat-hover)]'
            : 'mt-4 h-9 rounded-md text-[13px] font-medium text-white transition-colors'
        }
        style={item.connected ? undefined : { background: '#e04a3d' }}
      >
        {item.connected ? 'Manage' : 'Connect'}
      </button>
    </div>
  )
}
