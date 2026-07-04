interface SparklineProps {
  points: number[]
  color: string
  className?: string
}

/** Fixed-height mini line chart with a soft area fill (non-scaling stroke). */
export function Sparkline({ points, color, className = 'h-10' }: SparklineProps): JSX.Element {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const coords = points.map((v, i) => {
    const x = (i / (points.length - 1)) * 100
    const y = 92 - ((v - min) / range) * 84
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  const id = `spark-${color.replace(/[^a-z0-9]/gi, '')}`
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={`w-full ${className}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.2" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M${coords.join(' L')} L100,100 L0,100 Z`} fill={`url(#${id})`} />
      <polyline
        points={coords.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
