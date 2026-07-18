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
        'pointer-events-none absolute z-10 size-1.5 bg-card shadow-sm shadow-black/10 ring-1 ring-foreground/10',
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
          <GridHandle className="-left-[3.5px] -top-[3.5px]" />
          <GridHandle className="-right-[3.5px] -top-[3.5px]" />
        </>
      ) : null}
      {bottom ? (
        <>
          <GridHandle className="-bottom-[3.5px] -left-[3.5px]" />
          <GridHandle className="-bottom-[3.5px] -right-[3.5px]" />
        </>
      ) : null}
    </>
  )
}
