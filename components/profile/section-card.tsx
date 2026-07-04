import type { ReactNode } from 'react'

interface SectionCardProps {
  title: string
  description?: string
  action?: ReactNode
  children: ReactNode
  /** Render children flush (no padding) — e.g. for full-bleed row lists. */
  flush?: boolean
}

/** Shared chrome for a profile section: header strip + body. */
export function SectionCard({
  title,
  description,
  action,
  children,
  flush = false,
}: SectionCardProps): JSX.Element {
  return (
    <section className="overflow-hidden rounded-xl border border-[var(--cat-border)] bg-[var(--cat-card)]">
      <header className="flex items-start justify-between gap-3 border-b border-[var(--cat-border)] px-5 py-4">
        <div>
          <h2 className="text-[15px] font-semibold text-[var(--cat-ink)]">{title}</h2>
          {description && (
            <p className="mt-0.5 text-xs font-light text-[var(--cat-ink-3)]">{description}</p>
          )}
        </div>
        {action}
      </header>
      <div className={flush ? '' : 'p-5'}>{children}</div>
    </section>
  )
}
