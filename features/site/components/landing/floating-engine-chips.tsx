import Image from 'next/image'

import { cn } from '@/features/site/lib/utils'

export interface EngineChip {
  engine: string
  logo: string
  cited: boolean
  left: string
  top: string
  delay: string
  duration: string
}

export interface FloatingSlot {
  left: string
  top: string
}

interface FloatingEngineChipsProps {
  chips: readonly EngineChip[]
  /** Small empty tiles that suggest more engines waiting to be filled in. */
  slots?: readonly FloatingSlot[]
  className?: string
}

/**
 * Decorative floating engine-mention chips for hero side gutters — how each
 * AI surface treats the brand, drifting on the sanctioned `animate-float`
 * loop. Purely visual: hidden from readers and from smaller screens.
 */
export function FloatingEngineChips({
  chips,
  slots = [],
  className,
}: FloatingEngineChipsProps): JSX.Element {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 hidden lg:block', className)}
    >
      {chips.map(chip => (
        <span key={chip.engine} className="absolute" style={{ left: chip.left, top: chip.top }}>
          <span
            className="bg-card ring-border motion-safe:animate-float flex items-center gap-2 rounded-xl px-3 py-2 shadow-md ring-1 shadow-black/5"
            style={{ animationDelay: chip.delay, animationDuration: chip.duration }}
          >
            <Image src={chip.logo} alt="" width={16} height={16} className="h-4 w-4" />
            <span className="text-foreground text-xs font-semibold">{chip.engine}</span>
            <span
              className={cn(
                'rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase',
                chip.cited
                  ? 'bg-success/10 text-success'
                  : 'bg-muted text-muted-foreground ring-border ring-1',
              )}
            >
              {chip.cited ? 'Cited' : 'Missing'}
            </span>
          </span>
        </span>
      ))}
      {slots.map(slot => (
        <span
          key={`${slot.left}-${slot.top}`}
          className="bg-muted ring-border/60 absolute h-6 w-6 rounded-lg ring-1"
          style={{ left: slot.left, top: slot.top }}
        />
      ))}
    </div>
  )
}
