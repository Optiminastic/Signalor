'use client'

import Script from 'next/script'

const AHREFS_DATA_KEY = 'Ii1VFS6QFRSKltNUh1aCZA'

/**
 * Ahrefs Web Analytics. Lightweight, cookieless page-view pixel used for
 * marketing attribution. Loads on every page like the previous frontend did.
 */
export function AhrefsAnalytics() {
  return (
    <Script
      src="https://analytics.ahrefs.com/analytics.js"
      data-key={AHREFS_DATA_KEY}
      strategy="afterInteractive"
    />
  )
}
