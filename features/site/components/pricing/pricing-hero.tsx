'use client'

import Link from 'next/link'
import { ArrowLeft } from '@/features/site/components/icons'

import { routes } from '@/features/site/lib/config'
import { cn } from '@/features/site/lib/utils'

type PricingHeroProps = {
  showBackLink?: boolean
  backHref: string
  backLabel: string
  onboardingBanner?: boolean
}

export function PricingHero({
  showBackLink,
  backHref,
  backLabel,
  onboardingBanner,
}: PricingHeroProps) {
  return (
    <section className="bg-background relative px-6 pt-14 pb-14 lg:px-12 lg:pt-16 lg:pb-16">
      <div className="relative z-10 mx-auto max-w-7xl">
        {showBackLink ? (
          <Link
            href={backHref}
            className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {backLabel}
          </Link>
        ) : null}

        <p className="text-muted-foreground text-[11px] font-medium tracking-[0.22em] uppercase">
          [ pricing ]
        </p>

        <h1 className="text-foreground mt-4 max-w-4xl text-3xl leading-[1.12] font-bold tracking-tight sm:text-4xl lg:text-[2.65rem] xl:text-5xl">
          Simple plans for{' '}
          <span className="text-primary relative whitespace-nowrap">
            serious GEO teams
            <span
              className="border-primary/45 absolute right-0 -bottom-1 left-0 border-b-2 border-dashed"
              aria-hidden
            />
          </span>
        </h1>

        <p className="text-accent-foreground mt-5 max-w-2xl text-base leading-relaxed font-light lg:text-lg">
          Every tier includes GEO scoring, recommendations, and exports. Upgrade for more projects,
          prompts, AI engines, and integrations,pricing in GBP, billed monthly.
        </p>

        <p className="text-muted-foreground mt-4 max-w-xl text-sm font-medium">
          New here?{' '}
          <Link
            href={routes.signUp}
            className="text-primary font-semibold underline-offset-4 hover:underline"
          >
            Create an account
          </Link>{' '}
          or{' '}
          <Link
            href={routes.signIn}
            className="text-foreground font-semibold underline-offset-4 hover:underline"
          >
            log in
          </Link>{' '}
          to subscribe.
        </p>

        {onboardingBanner ? (
          <p
            className={cn(
              'border-success/80 bg-success/90 text-success mt-8 max-w-lg rounded-none border px-4 py-3 text-sm leading-relaxed',
            )}
          >
            You&apos;ve finished setup, choose a plan below to launch GEO analysis from the final
            step.
          </p>
        ) : null}
      </div>
    </section>
  )
}
