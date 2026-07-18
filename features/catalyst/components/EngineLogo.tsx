import { engineLogo } from '@/features/catalyst/engine-logos'

interface EngineLogoProps {
  /** Engine / company name (e.g. "ChatGPT", "Perplexity", "Gemini"). */
  name: string
  /** Tile edge length in px; the glyph scales with it. */
  size?: number
  /** Fallback dot colour when no bundled logo exists (e.g. "Others"). */
  color?: string
}

/**
 * The engine/company logo used wherever a model name is shown — the Topbar
 * engine filter, share-of-voice, citations, etc. Renders the bundled SVG in a
 * hairline tile, falling back to a coloured dot when there's no logo.
 */
export function EngineLogo({ name, size = 18, color }: EngineLogoProps): JSX.Element {
  const logo = engineLogo(name)
  if (logo) {
    const glyph = Math.round(size * 0.6)
    return (
      <span
        title={name}
        className="grid shrink-0 place-items-center overflow-hidden rounded-[5px] border border-[var(--cat-border)] bg-white"
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt={name}
          className="object-contain"
          style={{ width: glyph, height: glyph }}
        />
      </span>
    )
  }
  const dot = Math.max(8, Math.round(size * 0.5))
  return (
    <span
      title={name}
      className="shrink-0 rounded-full"
      style={{ width: dot, height: dot, background: color ?? 'var(--cat-ink-3)' }}
    />
  )
}
