'use client'

import Clarity from '@microsoft/clarity'
import { useEffect } from 'react'

import { env } from '@/lib/env'

import { useConsentStore } from '@/features/site/lib/stores/consent-store'

const CLARITY_PROJECT_ID = env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? 'wloufvwvwn'

let inited = false

/**
 * Microsoft Clarity init. Only initializes once the user has granted
 * analytics consent via the cookie banner. Renders nothing.
 */
export function ClarityInit() {
  const analytics = useConsentStore(s => s.analytics)
  const hydrated = useConsentStore(s => s.hydrated)

  useEffect(() => {
    if (!hydrated || !analytics) return
    if (inited) return
    if (!CLARITY_PROJECT_ID) return
    if (typeof window === 'undefined') return
    inited = true
    try {
      Clarity.init(CLARITY_PROJECT_ID)
    } catch {
      // SDK swallows most errors; nothing to do here.
    }
  }, [hydrated, analytics])

  return null
}
