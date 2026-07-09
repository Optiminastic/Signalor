import { Settings2 } from 'lucide-react'

import { ConnectSwitch } from '@/features/catalyst/components/integrations/ConnectSwitch'
import type { Integration } from '@/features/catalyst/integrations-data'

export function IntegrationCard({ item }: { item: Integration }): JSX.Element {
  const { connected, accent } = item
  return (
    <div
      className={`group relative flex flex-col rounded-md border bg-[var(--cat-card)] p-3.5 transition-all duration-200 hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(16,24,40,.07)] ${
        connected
          ? 'border-[rgba(47,190,126,0.4)] bg-[rgba(47,190,126,0.035)]'
          : 'border-[var(--cat-border)]'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-md"
          style={{ background: `${accent}14` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.logo} alt="" className="h-5 w-5 object-contain" />
        </span>
        <div className="flex items-center gap-1">
          {connected && (
            <button
              type="button"
              aria-label={`Manage ${item.name}`}
              className="grid h-7 w-7 place-items-center rounded-md text-[var(--cat-ink-3)] transition-colors hover:bg-[var(--cat-hover)] hover:text-[var(--cat-ink)]"
            >
              <Settings2 size={15} strokeWidth={2} />
            </button>
          )}
          <ConnectSwitch defaultOn={connected} label={item.name} />
        </div>
      </div>

      <p className="mt-3 text-[13.5px] font-semibold text-[var(--cat-ink)]">{item.name}</p>
      <p className="mt-1 text-[12px] leading-snug text-[var(--cat-ink-2)]">{item.description}</p>
    </div>
  )
}
