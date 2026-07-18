'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const REFERRAL_PENDING_KEY = 'signalor.referral.pendingCode'

/**
 * Stashes any `?ref=CODE` query param into localStorage on mount.
 *
 * Lives in the root layout so it runs no matter where the user first lands
 * (home, blog post, pricing). The sign-up flow reads this key when the
 * session is created and records the referral link.
 */
export function ReferralCapture() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const ref = searchParams.get('ref')
    if (!ref) return
    try {
      // Only set if we don't already have one stashed — first-touch attribution.
      if (!localStorage.getItem(REFERRAL_PENDING_KEY)) {
        localStorage.setItem(REFERRAL_PENDING_KEY, ref)
      }
    } catch {
      /* ignore */
    }
  }, [searchParams])

  return null
}
