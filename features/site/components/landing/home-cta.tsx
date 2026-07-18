import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight } from '@/features/site/components/icons'
import { LANDING_PRIMARY_CTA_CLASS } from '@/features/site/components/landing/constants'
import { GridCornerHandles, GridHandle } from '@/features/site/components/landing/home-grid'

/**
 * Pre-footer CTA, shared across all marketing pages: pitch + actions on the
 * left, the compass illustration drifting in a measured frame on the right.
 * Self-contained rails so it can sit outside a page's railed column.
 */
export function HomeCta(): JSX.Element {
  return (
    <section className="border-t border-border" aria-labelledby="home-cta-heading">
      <div className="relative mx-auto max-w-6xl border-x border-border">
        <GridCornerHandles top />
        <GridHandle className="-top-[3.5px] left-[53.5%] -ml-[3.5px] hidden lg:block" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_110%_at_18%_-10%,rgba(224,74,61,0.08),transparent_58%)]"
        />
        <div className="relative grid lg:grid-cols-[1.15fr_1fr] lg:divide-x lg:divide-border">
          <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:py-24">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">
              Get started
            </p>
            <h2
              id="home-cta-heading"
              className="mt-3 max-w-lg text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl xl:text-[2.75rem] xl:leading-[1.1]"
            >
              Turn AI search into your highest-intent pipeline
            </h2>
            <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Run a free GEO audit, track citations across models, and ship fixes that change how{' '}
              <strong className="font-semibold text-foreground">
                ChatGPT, Perplexity, and Gemini
              </strong>{' '}
              talk about you.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link href="/sign-up" className={`${LANDING_PRIMARY_CTA_CLASS} w-full sm:w-auto`}>
                Start for free
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/tools/url-analyzer"
                className="inline-flex h-9 w-full items-center justify-center rounded-md bg-card px-5 text-sm font-semibold text-foreground ring-1 ring-border shadow-sm shadow-black/5 transition-colors hover:bg-muted/60 sm:w-auto"
              >
                Run a free audit
              </Link>
            </div>
            <p className="mt-4 text-[13px] font-medium text-muted-foreground/80">
              No credit card required · 50 free prompts · Cancel anytime
            </p>
          </div>

          <div className="relative hidden items-center justify-center overflow-hidden bg-card px-8 py-12 lg:flex">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,rgba(224,74,61,0.08),transparent_70%)]"
            />
            <div className="relative bg-foreground/5 p-3">
              <span aria-hidden className="absolute left-1 top-1 size-[3px] rounded-full bg-foreground/20" />
              <span aria-hidden className="absolute right-1 top-1 size-[3px] rounded-full bg-foreground/20" />
              <span aria-hidden className="absolute bottom-1 left-1 size-[3px] rounded-full bg-foreground/20" />
              <span aria-hidden className="absolute bottom-1 right-1 size-[3px] rounded-full bg-foreground/20" />
              <Image
                src="/hero-compass.png"
                alt="Illustration of a hand holding a compass — Signalor guiding your AI search strategy"
                width={667}
                height={572}
                sizes="(max-width: 1024px) 0px, 420px"
                className="h-auto w-full max-w-[380px] select-none motion-safe:animate-float"
                style={{ animationDuration: '7s' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
