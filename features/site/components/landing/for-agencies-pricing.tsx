import Link from 'next/link'

import { ArrowRight, Check } from '@/features/site/components/icons'
import { GridCornerHandles, GridHandle } from '@/features/site/components/landing/home-grid'
import { LANDING_PRIMARY_CTA_CLASS } from '@/features/site/components/landing/constants'
import { cn } from '@/features/site/lib/utils'

// Display-only agency pricing — mirrors the Agency flow on /pricing (no public
// checkout exists for agency plans; every CTA routes to Contact Sales).
type AgencyPlan = {
  id: string
  label: string
  price: string
  priceNote?: string
  tagline: string
  popular?: boolean
  features: string[]
}

const AGENCY_PLANS: AgencyPlan[] = [
  {
    id: 'agency-brand-10',
    label: 'Per Brand · 10 prompts',
    price: '69.99',
    priceNote: 'per brand',
    tagline: 'Each client brand you onboard, billed per brand.',
    features: [
      '1 brand / domain per client',
      '10 prompts to rank & track',
      'AI visibility score',
      'Prompt ranking across AI engines',
      'Competitor visibility tracking',
      'Recommendations & improvement guidance',
      '15% agency discount applied',
    ],
  },
  {
    id: 'agency-account',
    label: 'Agency Account',
    price: '99.69',
    tagline: 'Manage multiple client brands from one Signalor workspace.',
    popular: true,
    features: [
      'One workspace for all your clients',
      'Add & manage multiple client brands',
      'Consolidated visibility across clients',
      '15% off every brand you onboard',
      'Roster-wide fix planning',
      'White-label, exportable client reports',
    ],
  },
  {
    id: 'agency-brand-25',
    label: 'Per Brand · 25 prompts',
    price: '99.69',
    priceNote: 'per brand',
    tagline: 'More prompt coverage per client brand.',
    features: [
      'Everything in the 10-prompt brand, plus:',
      '25 prompts to rank & track',
      'Broader competitor coverage per client',
      'Recommendations & improvement guidance',
      '15% agency discount applied',
    ],
  },
]

const AGENCY_ENTERPRISE_FEATURES = [
  'Custom prompt volume',
  'Multiple brands / domains',
  'Advanced & dedicated support',
  'Choose the AI engines you track',
  'Preferred currency & billing terms',
  'White-label, exportable client reports',
]

function PlanCell({ plan }: { plan: AgencyPlan }): JSX.Element {
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
          £{plan.price}
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

function AgencyEnterpriseRow(): JSX.Element {
  return (
    <div className="relative border-t border-border">
      <GridHandle className="-top-[3.5px] left-1/3 -ml-[3.5px] hidden lg:block" />
      <div className="grid lg:grid-cols-[1fr_2fr] lg:divide-x lg:divide-border">
        <div className="p-8 max-lg:border-b max-lg:border-border">
          <h3 className="text-lg font-medium tracking-tight text-foreground">Enterprise agency</h3>
          <p className="mt-1 max-w-xs text-balance text-sm text-muted-foreground">
            For larger rosters with higher prompt volumes, multi-domain clients, and advanced
            reporting needs.
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
          {AGENCY_ENTERPRISE_FEATURES.map((feature) => (
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

export function ForAgenciesPricing(): JSX.Element {
  return (
    <section
      id="agency-pricing"
      className="scroll-mt-20"
      aria-labelledby="for-agencies-pricing-heading"
    >
      <div className="border-border mx-auto max-w-6xl border-x">
        <div className="relative border-t border-border px-6 py-14 sm:py-16">
          <GridCornerHandles top />
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">
              Agency pricing
            </p>
            <h2
              id="for-agencies-pricing-heading"
              className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              One workspace, per-brand pricing
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              All agency plans start with a conversation - no public checkout, no surprises.
            </p>
            <p className="mt-6 text-[13px] font-medium text-muted-foreground">
              <span className="font-semibold text-primary">Save 15%</span> on every brand you
              onboard · Prices in GBP ·{' '}
              <Link
                href="/pricing"
                className="font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Full plan comparison →
              </Link>
            </p>
          </div>
        </div>
        <div className="relative border-t border-border">
          <GridCornerHandles top />
          <div className="grid grid-cols-1 divide-border max-lg:divide-y lg:grid-cols-3">
            {AGENCY_PLANS.map((plan) => (
              <PlanCell key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
        <AgencyEnterpriseRow />
      </div>
    </section>
  )
}
