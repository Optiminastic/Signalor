interface SparkleProps {
  size?: number
  className?: string
}

/** The 4-point brand sparkle (concave star) — reused in the logo, headline, and grid. */
export function Sparkle({ size = 24, className = '' }: SparkleProps): JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 1.5 Q12 12 22.5 12 Q12 12 12 22.5 Q12 12 1.5 12 Q12 12 12 1.5 Z" />
    </svg>
  )
}
