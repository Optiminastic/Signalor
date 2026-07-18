import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight } from '@/features/site/components/icons'
import { GridCornerHandles, GridHandle } from '@/features/site/components/landing/home-grid'
import { LANDING_PRIMARY_CTA_CLASS } from '@/features/site/components/landing/constants'
import { INTEGRATION_HUB_CARDS } from '@/features/site/lib/landing-integration-content'

type FloatingLogo = {
  name: string
  src: string
  /** Percentage position inside the hero block. */
  left: string
  top: string
  size: number
  delay: string
  duration: string
}

const FLOATING_LOGOS: FloatingLogo[] = [
  { name: 'Shopify', src: '/logos/shopify.svg', left: '16%', top: '18%', size: 60, delay: '0s', duration: '4.6s' },
  { name: 'Google Analytics', src: '/logos/google-analytics.svg', left: '6%', top: '48%', size: 52, delay: '1.2s', duration: '5.4s' },
  { name: 'Slack', src: '/logos/slack.svg', left: '15%', top: '74%', size: 56, delay: '0.6s', duration: '5s' },
  { name: 'WordPress', src: '/logos/wordpress.svg', left: '80%', top: '16%', size: 60, delay: '0.9s', duration: '5.2s' },
  { name: 'Search Console', src: '/logos/search-console.svg', left: '91%', top: '46%', size: 52, delay: '0.3s', duration: '4.8s' },
  { name: 'Zapier', src: '/logos/zapier.svg', left: '82%', top: '72%', size: 56, delay: '1.5s', duration: '5.6s' },
  { name: 'Framer', src: '/logos/framer.svg', left: '49%', top: '86%', size: 48, delay: '0.4s', duration: '5.8s' },
]

// Small empty squares scattered between the logo bubbles, like the reference's
// unresolved "slots" waiting for the next integration.
const FLOATING_SLOTS = [
  { left: '27%', top: '38%' },
  { left: '22%', top: '60%' },
  { left: '73%', top: '34%' },
  { left: '77%', top: '62%' },
] as const

function FloatingLogos(): JSX.Element {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
      {FLOATING_LOGOS.map((logo) => (
        <span key={logo.name} className="absolute" style={{ left: logo.left, top: logo.top }}>
          <span
            className="flex items-center justify-center rounded-full bg-card shadow-md shadow-black/5 ring-1 ring-border motion-safe:animate-float"
            style={{
              width: logo.size,
              height: logo.size,
              animationDelay: logo.delay,
              animationDuration: logo.duration,
            }}
          >
            <Image
              src={logo.src}
              alt=""
              width={Math.round(logo.size * 0.46)}
              height={Math.round(logo.size * 0.46)}
              className="object-contain"
            />
          </span>
        </span>
      ))}
      {FLOATING_SLOTS.map((slot) => (
        <span
          key={`${slot.left}-${slot.top}`}
          className="absolute h-6 w-6 rounded-lg bg-muted ring-1 ring-border/60"
          style={{ left: slot.left, top: slot.top }}
        />
      ))}
    </div>
  )
}

function IntegrationCards(): JSX.Element {
  return (
    <div className="relative border-t border-border">
      <GridCornerHandles top />
      <GridHandle className="-top-[3.5px] left-1/2 -ml-[3.5px] hidden sm:block" />
      <div className="grid divide-border max-sm:divide-y sm:grid-cols-2 sm:divide-x">
        {INTEGRATION_HUB_CARDS.map((card) => (
          <Link
            key={card.slug}
            href={card.href}
            className="group flex flex-col bg-card px-6 py-10 transition-colors duration-200 hover:bg-muted/30 sm:px-10"
          >
            <span className="flex items-center gap-3">
              <Image
                src={card.logoSrc}
                alt={`${card.title} logo`}
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-success">
                Live
              </span>
            </span>
            <span className="mt-4 text-lg font-semibold tracking-tight text-foreground">
              {card.title}
            </span>
            <span className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
              {card.description}
            </span>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              View integration
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function IntegrationHero(): JSX.Element {
  return (
    <section className="border-y border-border" aria-labelledby="integration-hero-heading">
      <div className="relative mx-auto max-w-6xl border-x border-border">
        <div className="relative px-6 py-20 sm:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_50%_30%,rgba(224,74,61,0.05),transparent_70%)]"
          />
          <FloatingLogos />
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">
              Integrations
            </p>
            <h1
              id="integration-hero-heading"
              className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
            >
              Plug your stack into Signalor
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Connect Shopify and WordPress so GEO audits, scores, and recommendations use live
              catalog and CMS data - not a stale crawl snapshot.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/sign-up" className={`${LANDING_PRIMARY_CTA_CLASS} w-full sm:w-auto`}>
                Connect workspace
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/tools/url-analyzer"
                className="inline-flex h-9 w-full items-center justify-center rounded-md bg-card px-5 text-sm font-semibold text-foreground ring-1 ring-border shadow-sm shadow-black/5 transition-colors hover:bg-muted/60 sm:w-auto"
              >
                Run a free audit
              </Link>
            </div>
            <p className="mt-5 text-[13px] font-medium text-muted-foreground/80">
              Read-oriented syncs · disconnect anytime from workspace settings
            </p>
          </div>
        </div>
        <IntegrationCards />
      </div>
    </section>
  )
}
