import { TransitionLink } from '@/components/TransitionLink'

interface CardHeadProps {
  title: string
  action?: string
  /** When set, the action renders as a link to this route. */
  href?: string
}

const ACTION_CLASS =
  'text-xs font-medium text-[var(--cat-ink-2)] transition-colors hover:text-[var(--cat-ink)]'

export function CardHead({ title, action, href }: CardHeadProps): JSX.Element {
  return (
    <div className="mb-1 flex items-start justify-between">
      <span className="text-[13px] font-medium text-[var(--cat-ink-2)]">{title}</span>
      {action &&
        (href ? (
          <TransitionLink href={href} className={ACTION_CLASS}>
            {action}
          </TransitionLink>
        ) : (
          <button className={ACTION_CLASS}>{action}</button>
        ))}
    </div>
  )
}
