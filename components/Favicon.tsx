'use client'

import { useState, type ReactNode } from 'react'

interface FaviconProps {
  /** A URL or bare domain — e.g. "https://www.crunchbase.com/add-new" → crunchbase.com. */
  url: string
  size?: number
  className?: string
  /** Rendered when there's no usable URL or the favicon fails to load. */
  fallback?: ReactNode
}

/** Extract the registrable host from a URL or bare domain. */
function domainOf(url: string): string {
  const raw = (url || '').trim()
  if (!raw) return ''
  try {
    return new URL(raw.includes('://') ? raw : `https://${raw}`).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

/**
 * A site's real favicon (via Google's favicon service) with a graceful fallback —
 * used wherever we show a named brand/site/directory (opportunities, sources, …).
 */
export function Favicon({ url, size = 20, className, fallback = null }: FaviconProps): JSX.Element {
  const [failed, setFailed] = useState(false)
  const domain = domainOf(url)
  if (!domain || failed) return <>{fallback}</>
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  )
}
