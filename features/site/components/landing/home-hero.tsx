import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight } from '@/features/site/components/icons'
import { LANDING_PRIMARY_CTA_CLASS } from '@/features/site/components/landing/constants'
import { GridCornerHandles, GridHandle } from '@/features/site/components/landing/home-grid'

/**
 * Announcement pill inside a faint "measurement" box with corner dots —
 * the annotated, drafting-table look of the hairline-grid system.
 */
function HeroAnnouncement(): JSX.Element {
  return (
    <div className="relative mx-auto w-fit bg-foreground/5 p-2">
      <span aria-hidden className="absolute left-1 top-1 size-[3px] rounded-full bg-foreground/20" />
      <span aria-hidden className="absolute right-1 top-1 size-[3px] rounded-full bg-foreground/20" />
      <span aria-hidden className="absolute bottom-1 left-1 size-[3px] rounded-full bg-foreground/20" />
      <span aria-hidden className="absolute bottom-1 right-1 size-[3px] rounded-full bg-foreground/20" />
      <div className="relative flex h-fit items-center gap-2 rounded-full bg-card px-3 py-1 shadow-sm shadow-black/5 ring-1 ring-border">
        <span className="text-sm text-foreground">Track your first 50 prompts free</span>
        <span aria-hidden className="block h-3 w-px bg-foreground/10" />
        <Link
          href="/sign-up"
          className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Claim
        </Link>
      </div>
    </div>
  )
}

/**
 * Primary conversion path: paste a URL, land on the free analyzer with it
 * prefilled (the analyzer reads `?url=`). Plain GET form — zero JS.
 */
function HeroAuditForm(): JSX.Element {
  return (
    <div className="mx-auto mt-8 w-full max-w-md">
      <form action="/tools/url-analyzer" method="GET" className="flex gap-2">
        <label htmlFor="hero-audit-url" className="sr-only">
          Website URL
        </label>
        <input
          id="hero-audit-url"
          type="text"
          name="url"
          required
          inputMode="url"
          autoComplete="url"
          placeholder="yourdomain.com"
          className="h-9 min-w-0 flex-1 rounded-md bg-card px-3 text-sm text-foreground shadow-sm shadow-black/5 ring-1 ring-border placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button type="submit" className={`${LANDING_PRIMARY_CTA_CLASS} h-9 shrink-0`}>
          Get free GEO score
        </button>
      </form>
      <p className="mt-3 text-[13px] font-medium text-muted-foreground/80">
        Free score in ~60 seconds · No sign-up needed ·{' '}
        <Link
          href="/sign-up"
          className="inline-flex items-center gap-0.5 text-foreground/70 underline decoration-border underline-offset-2 transition-colors hover:text-foreground"
        >
          or start a free account
          <ArrowRight className="h-3 w-3" aria-hidden />
        </Link>
      </p>
    </div>
  )
}

/**
 * Full-bleed screenshot band: the dashboard sits in its own bordered box
 * whose vertical edges cross the section rules, marked with grid handles.
 */
function HeroScreenshot(): JSX.Element {
  return (
    <div className="border-b border-border">
      <div className="relative mx-auto max-w-6xl border-x border-border px-4 sm:px-6 md:px-12">
        <GridCornerHandles top bottom />
        <GridHandle className="-top-[3.5px] left-[12.5px] sm:left-[20.5px] md:left-[44.5px]" />
        <GridHandle className="-top-[3.5px] right-[12.5px] sm:right-[20.5px] md:right-[44.5px]" />
        <GridHandle className="-bottom-[3.5px] left-[12.5px] sm:left-[20.5px] md:left-[44.5px]" />
        <GridHandle className="-bottom-[3.5px] right-[12.5px] sm:right-[20.5px] md:right-[44.5px]" />
        <div className="overflow-hidden border-x border-border bg-card">
          <Image
            src="/carousel1.png"
            alt="Signalor dashboard showing GEO score, tracked prompts, and AI citation analytics"
            width={2000}
            height={2000}
            priority
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="h-auto max-h-[560px] w-full select-none object-cover object-top"
            style={{
              maskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export function HomeHero(): JSX.Element {
  return (
    <section aria-labelledby="home-hero-heading">
      <div className="relative mx-auto max-w-6xl border-x border-b border-border px-6 pb-12 pt-14 md:pb-16 md:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_65%_at_50%_0%,rgba(224,74,61,0.05),transparent_70%)]"
        />
        <div className="relative">
          <HeroAnnouncement />
          <div className="mx-auto mt-8 max-w-3xl text-center md:mt-10">
            <h1
              id="home-hero-heading"
              className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Get your brand cited in AI answers
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground">
              Signalor scores your site, tracks prompts across ChatGPT, Claude, Gemini, and
              Perplexity, and hands you the exact fixes that win citations.
            </p>
            <HeroAuditForm />
          </div>
        </div>
      </div>
      <HeroScreenshot />
    </section>
  )
}
