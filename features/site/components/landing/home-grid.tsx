import type { ReactNode } from 'react'

import { cn } from '@/features/site/lib/utils'

// Hairline-grid primitives for the homepage's "drafting table" layout:
// a max-w-6xl column with 1px vertical rails, horizontal rules per section,
// and tiny square handles marking where the lines intersect.

interface GridHandleProps {
  /** Positioning classes, e.g. "-top-[3.5px] -left-[3.5px]". */
  className: string
}

/**
 * 6px square marker centered on a hairline intersection. Offset by -3.5px
 * (half the 6px size + the 1px line) from the crossing point.
 */
export function GridHandle({ className }: GridHandleProps): JSX.Element {
  return (
    <span
      aria-hidden
      className={cn(
        'bg-card ring-foreground/10 pointer-events-none absolute z-10 size-1.5 shadow-sm ring-1 shadow-black/10',
        className,
      )}
    />
  )
}

/**
 * Handles for the four corners of a railed block (where its top and bottom
 * rules cross the vertical rails).
 */
export function GridCornerHandles({
  top = false,
  bottom = false,
}: {
  top?: boolean
  bottom?: boolean
}): JSX.Element {
  return (
    <>
      {top ? (
        <>
          <GridHandle className="-top-[3.5px] -left-[3.5px]" />
          <GridHandle className="-top-[3.5px] -right-[3.5px]" />
        </>
      ) : null}
      {bottom ? (
        <>
          <GridHandle className="-bottom-[3.5px] -left-[3.5px]" />
          <GridHandle className="-right-[3.5px] -bottom-[3.5px]" />
        </>
      ) : null}
    </>
  )
}

interface MeasureBoxProps {
  children: ReactNode
  /** Extra classes for the box, e.g. a larger padding or width. */
  className?: string
}

/**
 * Faint "measurement" box with a dot in each corner — the annotated
 * drafting-table signature around floating content (hero announcement,
 * CTA compass, logo cloud).
 */
export function MeasureBox({ children, className }: MeasureBoxProps): JSX.Element {
  return (
    <div className={cn('bg-foreground/5 relative p-2', className)}>
      <span
        aria-hidden
        className="bg-foreground/20 absolute top-1 left-1 size-[3px] rounded-full"
      />
      <span
        aria-hidden
        className="bg-foreground/20 absolute top-1 right-1 size-[3px] rounded-full"
      />
      <span
        aria-hidden
        className="bg-foreground/20 absolute bottom-1 left-1 size-[3px] rounded-full"
      />
      <span
        aria-hidden
        className="bg-foreground/20 absolute right-1 bottom-1 size-[3px] rounded-full"
      />
      {children}
    </div>
  )
}
