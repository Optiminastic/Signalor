export type LinkStatus = 'suggested' | 'submitted' | 'live'

/** UI shape a backlink opportunity row renders — adapted by `useBacklinks`. */
export interface BacklinkOpp {
  id: number
  name: string
  domain: string
  category: string
  priority: number
  status: LinkStatus
  submitUrl: string
}

export const STATUS_STYLE: Record<LinkStatus, string> = {
  live: 'bg-[rgba(47,190,126,0.12)] text-[#2FBE7E]',
  submitted: 'bg-[rgba(59,158,246,0.14)] text-[#3B9EF6]',
  suggested: 'bg-[var(--cat-hover)] text-[var(--cat-ink-3)]',
}
