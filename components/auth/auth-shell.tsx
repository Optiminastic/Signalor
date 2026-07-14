import Image from 'next/image'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

const DEFAULT_EYEBROW = 'Answer-engine visibility'
const DEFAULT_HEADLINE = 'See how your brand shows up in AI chat, and fix what holds you back.'

interface AuthMarketingPanelProps {
  /** Right-panel illustration. Defaults to the sign-in/up hands visual. */
  imageSrc?: string
  /** Small uppercase kicker above the headline. */
  eyebrow?: string
  /** Bottom-right headline copy. */
  headline?: string
}

/**
 * Right-hand marketing panel: the illustration sits contained on a matching
 * light-gray surface with the eyebrow + headline anchored bottom-right. Hidden
 * below the lg breakpoint.
 */
export function AuthMarketingPanel({
  imageSrc = '/auth-illustration.png',
  eyebrow = DEFAULT_EYEBROW,
  headline = DEFAULT_HEADLINE,
}: AuthMarketingPanelProps): JSX.Element {
  return (
    <aside className="relative hidden min-h-svh p-3 lg:flex xl:p-4">
      <div className="relative flex flex-1 flex-col overflow-hidden rounded-[16px] bg-[#ebe9ea] p-10 xl:p-14">
        {/* Illustration, fully contained so nothing is cropped. */}
        <div className="relative flex-1">
          <Image
            src={imageSrc}
            alt="Illustration of hands holding phones"
            fill
            priority
            sizes="50vw"
            className="pointer-events-none object-contain object-center select-none"
          />
        </div>

        <div className="relative z-10 ml-auto max-w-md text-right">
          <p className="text-[10px] font-medium tracking-[0.14em] text-neutral-700/80 uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-3 ml-auto max-w-sm text-2xl leading-[1.15] font-semibold tracking-tight text-neutral-900 xl:text-[28px]">
            {headline}
          </h2>
        </div>
      </div>
    </aside>
  )
}

interface AuthShellProps {
  children: ReactNode
  /** Inner column max width. Auth forms use the default 360px. */
  contentClassName?: string
  /** Override the right-hand panel. Defaults to the marketing panel. */
  rightPanel?: ReactNode
}

/**
 * Split-screen auth layout: a card column on the left and a marketing panel on
 * the right.
 */
export function AuthShell({
  children,
  contentClassName = '',
  rightPanel,
}: AuthShellProps): JSX.Element {
  return (
    <div className="min-h-svh w-full text-[13px] leading-normal lg:grid lg:h-svh lg:grid-cols-2 lg:overflow-hidden lg:bg-white">
      {/* LEFT — scrolls independently so the right illustration stays fixed. */}
      <div className="relative flex min-h-svh flex-col justify-center px-4 py-8 sm:px-5 lg:h-svh lg:min-h-0 lg:overflow-y-auto lg:bg-white lg:px-10 xl:px-14">
        <div className="relative flex w-full flex-col justify-center py-4 lg:min-h-full">
          <div className={cn('relative z-10 mx-auto w-[360px] max-w-full', contentClassName)}>
            <div className="rounded-lg border border-black/6 bg-white p-6 shadow-xs sm:p-7 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      {rightPanel ?? <AuthMarketingPanel />}
    </div>
  )
}
