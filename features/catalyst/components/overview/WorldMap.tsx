import { BRAND } from '@/features/catalyst/constants'
import { WORLD_MARKERS } from '@/features/catalyst/world-data'

const W = 48
const H = 22
const LAT_TOP = 84
const LAT_SPAN = 144 // 84°N .. -60°S

function projX(lon: number): number {
  return ((lon + 180) / 360) * W
}
function projY(lat: number): number {
  return ((LAT_TOP - lat) / LAT_SPAN) * H
}

// Coarse equirectangular land mask: inclusive [startCol, endCol] spans per row
// (row 0 = north). Filled as a dot grid — reads as a recognizable world map.
const LAND_SPANS: Array<Array<[number, number]>> = [
  [
    [9, 13],
    [19, 22],
    [31, 40],
  ],
  [
    [6, 15],
    [18, 23],
    [26, 45],
  ],
  [
    [4, 16],
    [19, 22],
    [24, 46],
  ],
  [
    [5, 16],
    [23, 46],
  ],
  [
    [6, 16],
    [23, 46],
  ],
  [
    [7, 15],
    [24, 45],
  ],
  [
    [7, 16],
    [24, 45],
  ],
  [
    [8, 16],
    [22, 45],
  ],
  [
    [9, 14],
    [22, 44],
  ],
  [
    [11, 14],
    [22, 44],
  ],
  [
    [12, 14],
    [22, 38],
    [41, 45],
  ],
  [
    [15, 19],
    [23, 34],
    [40, 46],
  ],
  [
    [15, 21],
    [25, 33],
    [40, 46],
  ],
  [
    [15, 21],
    [27, 33],
    [41, 46],
  ],
  [
    [15, 21],
    [28, 33],
    [42, 46],
  ],
  [
    [16, 21],
    [28, 33],
    [41, 46],
  ],
  [
    [16, 20],
    [29, 33],
    [41, 46],
  ],
  [
    [16, 20],
    [30, 32],
    [41, 45],
  ],
  [
    [17, 19],
    [44, 44],
  ],
  [[17, 18]],
  [[17, 18]],
  [[17, 17]],
]

interface Dot {
  x: number
  y: number
}

const LAND_DOTS: Dot[] = []
LAND_SPANS.forEach((spans, row) => {
  spans.forEach(([a, b]) => {
    for (let c = a; c <= b; c += 1) LAND_DOTS.push({ x: c, y: row })
  })
})

function Marker({ lon, lat, share }: { lon: number; lat: number; share: number }): JSX.Element {
  const x = projX(lon)
  const y = projY(lat)
  const solid = 0.5 + share * 0.03
  return (
    <g>
      <circle cx={x} cy={y} r={solid + 1.2} fill={BRAND} opacity={0.13} />
      <circle cx={x} cy={y} r={solid} fill={BRAND} />
      <circle cx={x} cy={y} r={solid * 0.4} fill="#fff" opacity={0.6} />
    </g>
  )
}

export function WorldMap(): JSX.Element {
  return (
    <svg viewBox="-1 -1 50 24" preserveAspectRatio="xMidYMid meet" className="h-[172px] w-full">
      {LAND_DOTS.map(d => (
        <circle
          key={`${d.x}-${d.y}`}
          cx={d.x}
          cy={d.y}
          r={0.34}
          fill="var(--cat-ink-3)"
          opacity={0.3}
        />
      ))}
      {WORLD_MARKERS.map(m => (
        <Marker key={m.country} lon={m.lon} lat={m.lat} share={m.share} />
      ))}
    </svg>
  )
}
