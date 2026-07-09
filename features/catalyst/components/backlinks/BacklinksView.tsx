'use client'

import { useState } from 'react'

import { AutoBacklinksPanel } from '@/features/catalyst/components/backlinks/AutoBacklinksPanel'
import {
  BacklinksTabs,
  type BacklinkTab,
} from '@/features/catalyst/components/backlinks/BacklinksTabs'
import { FreeBacklinksPanel } from '@/features/catalyst/components/backlinks/FreeBacklinksPanel'
import { PaidBacklinksPanel } from '@/features/catalyst/components/backlinks/PaidBacklinksPanel'
import { DashHeader } from '@/features/catalyst/components/dash/DashStat'

export function BacklinksView(): JSX.Element {
  const [tab, setTab] = useState<BacklinkTab>('auto')

  return (
    <div className="w-full">
      <DashHeader
        title="Backlinks"
        subtitle="Earn citations on high-authority sites — LLMs index and weight these heavily."
      />
      <BacklinksTabs active={tab} onChange={setTab} />
      {tab === 'auto' && <AutoBacklinksPanel />}
      {tab === 'free' && <FreeBacklinksPanel />}
      {tab === 'paid' && <PaidBacklinksPanel />}
    </div>
  )
}
