'use client'

import Link from 'next/link'
import type { ComponentProps, MouseEvent } from 'react'

import { useViewTransitionNavigate } from '@/components/providers/view-transition-provider'

type TransitionLinkProps = ComponentProps<typeof Link>

function isPlainLeftClick(event: MouseEvent<HTMLAnchorElement>): boolean {
  return (
    event.button === 0 &&
    !event.defaultPrevented &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  )
}

/**
 * Drop-in `next/link` that runs same-tab navigations through the View
 * Transitions provider for a page cross-fade. Prefetching, modified clicks and
 * new-tab targets keep the default Link behavior.
 */
export function TransitionLink({
  href,
  onClick,
  target,
  ...rest
}: TransitionLinkProps): JSX.Element {
  const navigate = useViewTransitionNavigate()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    onClick?.(event)
    if (typeof href !== 'string' || !isPlainLeftClick(event)) return
    if (target && target !== '_self') return
    event.preventDefault()
    navigate(href)
  }

  return <Link href={href} target={target} onClick={handleClick} {...rest} />
}
