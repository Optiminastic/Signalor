'use client'

import { usePathname, useRouter } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

type NavigateWithTransition = (href: string) => void

const ViewTransitionContext = createContext<NavigateWithTransition | null>(null)

type DocumentWithViewTransition = Document & {
  startViewTransition?: (update: () => Promise<void>) => unknown
}

function canTransition(): boolean {
  const doc = document as DocumentWithViewTransition
  if (typeof doc.startViewTransition !== 'function') return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Cross-fades client navigations via the View Transitions API. The router push
 * runs inside `startViewTransition`; the returned promise settles once the new
 * pathname has rendered, which is when the browser plays old → new. Falls back
 * to a plain push on unsupported browsers and under reduced motion.
 */
export function ViewTransitionProvider({ children }: { children: ReactNode }): JSX.Element {
  const router = useRouter()
  const pathname = usePathname()
  const settleRef = useRef<(() => void) | null>(null)

  // The new route is on screen — release the captured transition.
  useEffect(() => {
    settleRef.current?.()
    settleRef.current = null
  }, [pathname])

  const navigate = useCallback<NavigateWithTransition>(
    href => {
      const targetPath = href.split(/[?#]/)[0]
      if (targetPath === pathname || !canTransition()) {
        router.push(href)
        return
      }
      settleRef.current?.()
      const doc = document as DocumentWithViewTransition
      doc.startViewTransition?.(() => {
        const settled = new Promise<void>(resolve => {
          settleRef.current = resolve
        })
        router.push(href)
        return settled
      })
    },
    [pathname, router],
  )

  return (
    <ViewTransitionContext.Provider value={navigate}>{children}</ViewTransitionContext.Provider>
  )
}

/** Navigate with a page cross-fade; a plain `router.push` outside the provider. */
export function useViewTransitionNavigate(): NavigateWithTransition {
  const router = useRouter()
  const fromContext = useContext(ViewTransitionContext)
  return fromContext ?? (href => router.push(href))
}
