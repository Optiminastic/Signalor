import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps): JSX.Element {
  return (
    <div
      className={`flex flex-col rounded-md border border-[var(--cat-border)] bg-[var(--cat-card)] p-3 ${className}`}
    >
      {children}
    </div>
  )
}
