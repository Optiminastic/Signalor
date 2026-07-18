import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight } from '@/features/site/components/icons'
import { GridCornerHandles, GridHandle } from '@/features/site/components/landing/home-grid'
import { cn } from '@/features/site/lib/utils'

type MosaicTile = {
  name: string
  logo: string
  /** 0-indexed grid position in the 3×3 mosaic. */
  row: number
  col: number
  live?: boolean
}

// Staircase arrangement descending toward the bottom-left, like a constellation
// settling around the two Live integrations.
const MOSAIC_TILES: MosaicTile[] = [
  { name: 'Slack', logo: '/logos/slack.svg', row: 0, col: 2 },
  { name: 'Shopify', logo: '/logos/shopify.svg', row: 1, col: 1, live: true },
  { name: 'Google Analytics', logo: '/logos/google-analytics.svg', row: 1, col: 2 },
  { name: 'Search Console', logo: '/logos/search-console.svg', row: 2, col: 0 },
  { name: 'WordPress', logo: '/logos/wordpress.svg', row: 2, col: 1, live: true },
  { name: 'Zapier', logo: '/logos/zapier.svg', row: 2, col: 2 },
]

function LogoMosaic(): JSX.Element {
  const cells = Array.from({ length: 9 }, (_, index) => {
    const row = Math.floor(index / 3)
    const col = index % 3
    return MOSAIC_TILES.find((tile) => tile.row === row && tile.col === col) ?? null
  })
  return (
    <div className="grid w-full max-w-md grid-cols-3">
      {cells.map((tile, index) =>
        tile ? (
          <div
            key={tile.name}
            title={tile.name}
            className="group relative -ml-px -mt-px flex aspect-square items-center justify-center border border-dashed border-border bg-card transition-colors duration-200 hover:bg-muted/40"
          >
            {tile.live ? (
              <span className="absolute right-2 top-2 rounded-full bg-success/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-success">
                Live
              </span>
            ) : null}
            <Image
              src={tile.logo}
              alt={tile.name}
              width={34}
              height={34}
              className={cn(
                'h-8 w-8 object-contain transition-transform duration-200 motion-safe:group-hover:scale-110 sm:h-[34px] sm:w-[34px]',
                !tile.live && 'opacity-80',
              )}
            />
          </div>
        ) : (
          <div key={`empty-${index}`} aria-hidden />
        ),
      )}
    </div>
  )
}

export function HomeIntegrations(): JSX.Element {
  return (
    <section id="integrations" className="scroll-mt-20" aria-labelledby="home-integrations-heading">
      <div className="relative border-t border-border">
        <GridCornerHandles top />
        <GridHandle className="-top-[3.5px] left-1/2 -ml-[3.5px] hidden lg:block" />
        <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-border">
          <div className="flex flex-col justify-center px-6 py-14 max-lg:border-b max-lg:border-border sm:px-10 lg:py-20">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">
              Integrations
            </p>
            <h2
              id="home-integrations-heading"
              className="mt-3 max-w-md text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Works where your team already ships
            </h2>
            <p className="mt-4 max-w-sm text-pretty text-base leading-relaxed text-muted-foreground">
              Auto-fix schema and meta on{' '}
              <strong className="font-semibold text-foreground">Shopify and WordPress</strong>,
              pull search data from Google, and pipe alerts into Slack. More on the way.
            </p>
            <Link
              href="/integration"
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Browse integrations
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
          <div className="flex items-center justify-center bg-card px-6 py-14 sm:px-10 lg:py-16">
            <LogoMosaic />
          </div>
        </div>
      </div>
    </section>
  )
}
