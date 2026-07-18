import Link from 'next/link'

import { ArrowRight, Check } from '@/features/site/components/icons'
import { GridCornerHandles, GridHandle } from '@/features/site/components/landing/home-grid'
import { LANDING_PRIMARY_CTA_CLASS } from '@/features/site/components/landing/constants'
import { cn } from '@/features/site/lib/utils'

type BrandPlan = {
  id: string
  label: string
  price: string
  priceNote?: string
  tagline: string
  popular?: boolean
  features: string[]
}

const BRAND_PLANS: BrandPlan[] = [
  {
    id: 'brand-starter',
    label: 'Starter',
    price: '79',
    priceNote: 'per month',
    tagline: 'One brand, one clear baseline for how AI describes you.',
    features: [
      '1 brand / domain',
      '10 prompts to track',
      'AI visibility score',
      'Prompt coverage across core engines',
      'Competitor visibility snapshot',
      'Fix recommendations with clear priorities',
    ],
  },
  {
    id: 'brand-growth',
    label: 'Growth',
    price: '149',
    priceNote: 'per month',
    tagline: 'Built for teams tracking more prompts and more momentum.',
    popular: true,
    features: [
      '3 brands / domains',
      '25 prompts to track',
      'Cross-engine visibility comparisons',
      'Analytics connect for AI referral traffic',
      'Weekly monitoring and alerts',
      'Priority fix queue with expected lift',
    ],
  },
  {
    id: 'brand-scale',
    label: 'Scale',
    price: '299',
    priceNote: 'per month',
    tagline: 'More brands, more coverage, more support for fast-moving teams.',
    features: [
      'Unlimited brands / domains',
      'Custom prompt volume',
      'Dedicated support and rollout guidance',
      'Expanded competitor and source coverage',
      'White-label reporting for stakeholders',
      'Advanced fix planning across launches',
    ],
  },
]

const BRAND_ENTERPRISE_FEATURES = [
  'Custom prompt volume for every product line',
  'Multi-brand rollouts across campaigns and regions',
  'Advanced reporting for executives and partners',
  'Priority support for launch-critical moments',
  'Flexible billing and rollout planning',
  'Connect your analytics stack and CRM workflows',
]

function PlanCell({ plan }: { plan: BrandPlan }): JSX.Element {
  return (
    <div
      className={cn(
        'grid gap-8 p-8 lg:row-span-4 lg:grid-rows-subgrid',
        plan.popular &&
          'rounded-xl bg-card shadow-md shadow-black/10 ring-2 ring-primary/60 max-lg:mx-2 max-lg:my-2 lg:my-2',
      )}
    >
      <div className="self-end">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium tracking-tight text-foreground">{plan.label}</h3>
          {plan.popular ? (
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
              Popular
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-balance text-sm text-muted-foreground">{plan.tagline}</p>
      </div>
      <div>
        <p className="text-3xl font-semibold tabular-nums tracking-tight text-foreground">
          ${plan.price}
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Per month{plan.priceNote ? ` · ${plan.priceNote}` : ''}
        </p>
      </div>
      <Link
        href="/contact-sales"
        className={cn(
          plan.popular
            ? LANDING_PRIMARY_CTA_CLASS
            : 'inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-card px-5 text-sm font-semibold text-foreground ring-1 ring-border shadow-sm shadow-black/5 transition-all hover:bg-muted/60',
        )}
      >
        Talk to us
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
      <ul className="space-y-3 text-sm">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 text-foreground/90 first:font-medium first:text-foreground"
          >
            <Check className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2.5} aria-hidden />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function BrandEnterpriseRow(): JSX.Element {
  return (
    <div className="relative border-t border-border">
      <GridHandle className="-top-[3.5px] left-1/3 -ml-[3.5px] hidden lg:block" />
      <div className="grid lg:grid-cols-[1fr_2fr] lg:divide-x lg:divide-border">
        <div className="p-8 max-lg:border-b max-lg:border-border">
          <h3 className="text-lg font-medium tracking-tight text-foreground">Enterprise brand</h3>
          <p className="mt-1 max-w-xs text-balance text-sm text-muted-foreground">
            For bigger portfolios, more frequent launches, and multiple stakeholders who need one
            source of truth.
          </p>
          <Link
            href="/contact-sales"
            className="mt-5 inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-card px-5 text-sm font-semibold text-foreground ring-1 ring-border shadow-sm shadow-black/5 transition-all hover:bg-muted/60"
          >
            Contact sales
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
        <ul className="grid content-center gap-x-10 gap-y-3 p-8 text-sm sm:grid-cols-2">
          {BRAND_ENTERPRISE_FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-foreground/90">
              <Check className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2.5} aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function ForBrandsPricing(): JSX.Element {
  return (
    <section
      id="brand-pricing"
      className="scroll-mt-20"
      aria-labelledby="for-brands-pricing-heading"
    >
      <div className="border-border mx-auto max-w-6xl border-x">
        <div className="relative border-t border-border px-6 py-14 sm:py-16">
          <GridCornerHandles top />
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">
              Brand pricing
            </p>
            <h2
              id="for-brands-pricing-heading"
              className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Pricing that scales with your brand story
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Start with one brand, expand when you need more coverage, and keep the work grounded in
              the answers your customers actually see.
            </p>
            <p className="mt-6 text-[13px] font-medium text-muted-foreground">
              <span className="font-semibold text-primary">Free audit available</span> · Simple plans
              for one brand or many ·{' '}
              <Link
                href="/pricing"
                className="font-semibold text-primary transition-colors hover:text-primary/80"
              >
                See full comparison →
              </Link>
            </p>
          </div>
        </div>
        <div className="relative border-t border-border">
          <GridCornerHandles top />
          <div className="grid grid-cols-1 divide-border max-lg:divide-y lg:grid-cols-3">
            {BRAND_PLANS.map((plan) => (
              <PlanCell key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
        <BrandEnterpriseRow />
      </div>
    </section>
  )
}
