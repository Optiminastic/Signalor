const CELL = 150

/** Quadratic 4-point sparkle path centred at (cx, cy) with reach r. */
function sparkle(cx: number, cy: number, r: number): string {
  return `M${cx} ${cy - r} Q${cx} ${cy} ${cx + r} ${cy} Q${cx} ${cy} ${cx} ${cy + r} Q${cx} ${cy} ${cx - r} ${cy} Q${cx} ${cy} ${cx} ${cy - r} Z`
}

/**
 * Hero backdrop: a centred section of large white boxes with light-gray grid
 * lines and a gray sparkle ornament at every intersection. Fades out at the
 * bottom; plain margins on the sides (it never runs edge-to-edge).
 */
export function GridBackdrop(): JSX.Element {
  const h = CELL / 2
  return (
    <div className="pointer-events-none absolute inset-y-0 left-1/2 w-full max-w-[1200px] -translate-x-1/2 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="lp-grid" width={CELL} height={CELL} patternUnits="userSpaceOnUse">
            <path d={`M0 ${h} H${CELL} M${h} 0 V${CELL}`} stroke="#ededed" strokeWidth="1" />
            <path d={sparkle(h, h, 6)} fill="#d2d2d2" />
          </pattern>
          <linearGradient id="lp-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.62" stopColor="#fbfbfa" stopOpacity="0" />
            <stop offset="1" stopColor="#fbfbfa" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#lp-grid)" />
        <rect width="100%" height="100%" fill="url(#lp-fade)" />
      </svg>
    </div>
  )
}
