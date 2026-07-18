import type { TrendSeries } from '@/hooks/useInsights'

const W = 680
const H = 180
const PAD_L = 30
const PAD_R = 8
const PAD_T = 8
const PAD_B = 20
const PLOT_W = W - PAD_L - PAD_R
const PLOT_H = H - PAD_T - PAD_B
const TICKS = [0, 25, 50, 75, 100]

function yOf(value: number): number {
  return PAD_T + (1 - Math.max(0, Math.min(100, value)) / 100) * PLOT_H
}

function xOf(index: number, count: number): number {
  if (count <= 1) return PAD_L + PLOT_W / 2
  return PAD_L + (index / (count - 1)) * PLOT_W
}

function linePoints(points: number[]): string {
  return points.map((v, i) => `${xOf(i, points.length).toFixed(1)},${yOf(v).toFixed(1)}`).join(' ')
}

function GridLines(): JSX.Element {
  return (
    <>
      {TICKS.map(tick => (
        <g key={tick}>
          <line x1={PAD_L} x2={W - PAD_R} y1={yOf(tick)} y2={yOf(tick)} stroke="var(--cat-grid)" />
          <text
            x={PAD_L - 6}
            y={yOf(tick) + 3}
            fontSize={9}
            textAnchor="end"
            fill="var(--cat-ink-3)"
          >
            {tick}
          </text>
        </g>
      ))}
    </>
  )
}

function XLabels({ labels }: { labels: string[] }): JSX.Element {
  const shown =
    labels.length <= 6 ? labels : labels.filter((_, i) => i % Math.ceil(labels.length / 6) === 0)
  return (
    <>
      {shown.map(label => {
        const i = labels.indexOf(label)
        return (
          <text
            key={`${label}-${i}`}
            x={xOf(i, labels.length)}
            y={H - 6}
            fontSize={9}
            textAnchor="middle"
            fill="var(--cat-ink-3)"
          >
            {label}
          </text>
        )
      })}
    </>
  )
}

interface MultiLineChartProps {
  series: TrendSeries[]
  xLabels: string[]
}

/** Multi-series 0-100% line chart (inline SVG, no chart lib). */
export function MultiLineChart({ series, xLabels }: MultiLineChartProps): JSX.Element {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <GridLines />
      <XLabels labels={xLabels} />
      {series.map(s => (
        <g key={s.key}>
          <polyline
            points={linePoints(s.points)}
            fill="none"
            stroke={s.color}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {s.points.map((v, i) => (
            <circle
              key={i}
              cx={xOf(i, s.points.length)}
              cy={yOf(v)}
              r={2.5}
              fill="var(--cat-card)"
              stroke={s.color}
              strokeWidth={1.5}
            />
          ))}
        </g>
      ))}
    </svg>
  )
}
