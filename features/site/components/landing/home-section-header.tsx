import { cn } from '@/features/site/lib/utils'

interface HomeSectionHeaderProps {
  eyebrow: string
  headingId: string
  title: React.ReactNode
  description?: string
  align?: 'left' | 'center'
}

export function HomeSectionHeader({
  eyebrow,
  headingId,
  title,
  description,
  align = 'center',
}: HomeSectionHeaderProps): JSX.Element {
  const centered = align === 'center'
  return (
    <div className={cn('max-w-2xl', centered ? 'mx-auto text-center' : 'text-left')}>
      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </p>
      <h2
        id={headingId}
        className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg',
            centered && 'mx-auto',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
