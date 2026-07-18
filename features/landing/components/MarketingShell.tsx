import type { ReactNode } from 'react'

import { LandingNav } from '@/features/landing/components/LandingNav'
import { HomeCta } from '@/features/site/components/landing/home-cta'
import { HomeFooter } from '@/features/site/components/landing/home-footer'

interface MarketingShellProps {
  children: ReactNode
}

/**
 * Marketing chrome — top nav + pre-footer CTA + footer — shared by every
 * non-home marketing/tool/blog page, mirroring the home page's chrome (the
 * hairline-grid CTA band and footer). The announcement pill lives inside each
 * page's hero now, not above the nav. Page bodies are passed through untouched.
 */
export function MarketingShell({ children }: MarketingShellProps): JSX.Element {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans">
      <LandingNav />
      {children}
      <HomeCta />
      <HomeFooter />
    </div>
  )
}
