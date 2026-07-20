// Deterministic mesh-gradient cover art for blog cards — vibrant, reference-style
// backgrounds generated purely in CSS so no external images are needed. Each post
// slug maps to a stable palette + colour rotation, so the same post always renders
// the same gradient while different posts vary.

// Each palette is [c1, c2, c3, c4, baseColor].
const PALETTES: readonly (readonly string[])[] = [
  ['#a5b4fc', '#6366f1', '#22d3ee', '#818cf8', '#4f46e5'], // indigo / cyan
  ['#fda4af', '#fb7185', '#f43f5e', '#fbcfe8', '#e11d48'], // rose / pink
  ['#c4b5fd', '#a855f7', '#e879f9', '#d8b4fe', '#7c3aed'], // violet / fuchsia
  ['#5eead4', '#2dd4bf', '#34d399', '#99f6e4', '#0d9488'], // teal / emerald
  ['#fed7aa', '#fb923c', '#f59e0b', '#fdba74', '#ea580c'], // orange / amber
  ['#fca5a5', '#f87171', '#e04a3d', '#fecaca', '#dc2626'], // brand coral
  ['#7dd3fc', '#38bdf8', '#60a5fa', '#bae6fd', '#0284c7'], // sky / blue
  ['#c084fc', '#818cf8', '#38bdf8', '#e9d5ff', '#6d28d9'], // purple / blue
  ['#f0abfc', '#e879f9', '#c026d3', '#f5d0fe', '#a21caf'], // magenta
  ['#bef264', '#a3e635', '#4ade80', '#d9f99d', '#65a30d'], // lime / green
] as const

const POSITIONS = ['at 12% 18%', 'at 88% 8%', 'at 22% 88%', 'at 92% 72%', 'at 50% 45%'] as const

function hash(seed: string): number {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/**
 * Returns a CSS `background` value: a soft mesh of overlapping radial gradients
 * over a solid base colour, chosen deterministically from `seed`.
 */
export function getBlogGradient(seed: string): string {
  const h = hash(seed)
  const palette = PALETTES[h % PALETTES.length]
  const base = palette[palette.length - 1]
  const colors = palette.slice(0, -1)
  const offset = (h >>> 4) % colors.length
  const layers = POSITIONS.map(
    (pos, i) =>
      `radial-gradient(${pos}, ${colors[(i + offset) % colors.length]} 0px, transparent 55%)`,
  )
  return `${layers.join(', ')}, ${base}`
}
