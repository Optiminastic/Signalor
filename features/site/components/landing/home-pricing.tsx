'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { ArrowRight, Check } from '@/features/site/components/icons'
import { GridCornerHandles, GridHandle } from '@/features/site/components/landing/home-grid'
import { HomeSectionHeader } from '@/features/site/components/landing/home-section-header'
import { LANDING_PRIMARY_CTA_CLASS } from '@/features/site/components/landing/constants'
import { CurrencyToggle } from '@/features/site/components/pricing/currency-toggle'
import { getPlanPrices, type DodoPlanPrice } from '@/features/site/lib/api/payments'
import { useCurrency, formatPrice, type Currency } from '@/features/site/lib/hooks/use-currency'
import { cn } from '@/features/site/lib/utils'

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  AUD: 'A$',
  CAD: 'C$',
  JPY: '¥',
  SGD: 'S$',
  AED: 'AED ',
  BRL: 'R$',
  MXN: 'MX$',
  ZAR: 'R',
}

// Plan ids must match the backend keys in /api/payments/plan-prices/ for the
// checkout-able tiers. The free tier is static; Enterprise links to sales.
type HomePlan = {
  id: string
  label: string
  price: number
  tagline: string
  popular?: boolean
  featuresLead?: string
  features: string[]
  href: string
  cta: string
}

const HOME_PLANS: HomePlan[] = [
  {
    id: 'free',
    label: 'Free',
    price: 0,
    tagline: 'Try Signalor on your own site, no credit card required.',
    features: [
      '50 tracked prompts included',
      'Free GEO score & audit',
      'Prioritized fix list preview',
      'Setup in 2 minutes',
    ],
    href: '/sign-up',
    cta: 'Start for free',
  },
  {
    id: 'starter',
    label: 'Self-Serve Brand',
    price: 69.99,
    tagline: 'Run it yourself - one brand, ten tracked prompts.',
    featuresLead: 'Everything in Free, plus:',
    features: [
      '1 brand · 10 prompts',
      'AI visibility score',
      'Prompt ranking & competitor tracking',
      'Recommendations & guidance',
    ],
    href: '/pricing?checkout=starter',
    cta: 'Get Self-Serve',
  },
  {
    id: 'pro',
    label: 'Managed Growth Brand',
    price: 99.69,
    tagline: 'One brand, 25 prompts, daily agency-style support.',
    popular: true,
    featuresLead: 'Everything in Self-Serve, plus:',
    features: [
      '1 brand · 25 prompts',
      'Daily agency-style support',
      'Guidance on fixes & actions',
      'Priority recommendations',
    ],
    href: '/pricing?checkout=pro',
    cta: 'Get Managed Growth',
  },
]

const ENTERPRISE_FEATURES = [
  'Custom prompt volume',
  'Multiple brands / domains',
  'Advanced & dedicated support',
  'Preferred currency & terms',
  'Custom reporting cadence',
  'Agency plans available',
]

function formatLiveAmount(amount: number, ccy: string): string {
  if (ccy === 'INR' || ccy === 'JPY') return Math.round(amount).toLocaleString()
  return amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

type LocalizedPrice = { ccy: string; amount: number; symbol: string }

function localizedPrice(
  live: DodoPlanPrice | null | undefined,
  userCcy: string | null,
): LocalizedPrice | null {
  if (!live) return null
  const baseCcy = live.currency.toUpperCase()
  const useLocal =
    !!userCcy && userCcy !== baseCcy && live.prices_by_currency?.[userCcy] !== undefined
  const ccy = useLocal && userCcy ? userCcy : baseCcy
  const amount =
    useLocal && userCcy ? (live.prices_by_currency?.[userCcy] ?? live.amount) : live.amount
  return { ccy, amount, symbol: CURRENCY_SYMBOLS[ccy] ?? `${ccy} ` }
}

interface PlanPriceOptions {
  plan: HomePlan
  live: DodoPlanPrice | null
  userCcy: string | null
  currency: Currency
  currencyReady: boolean
}

function planPriceLabel({ plan, live, userCcy, currency, currencyReady }: PlanPriceOptions): {
  symbol: string
  amount: string
  resolved: boolean
} {
  if (plan.price === 0) {
    return { symbol: currencyReady ? currency.symbol : '£', amount: '0', resolved: true }
  }
  const localized = localizedPrice(live, userCcy)
  if (localized) {
    return {
      symbol: localized.symbol,
      amount: formatLiveAmount(localized.amount, localized.ccy),
      resolved: true,
    }
  }
  if (currencyReady) {
    return { symbol: currency.symbol, amount: formatPrice(plan.price, currency), resolved: true }
  }
  return { symbol: '£', amount: plan.price.toFixed(2), resolved: false }
}

interface PlanCellProps {
  plan: HomePlan
  symbol: string
  amount: string
  resolved: boolean
}

function PlanContent({ plan, symbol, amount, resolved }: PlanCellProps): JSX.Element {
  return (
    <>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold tracking-tight text-foreground">{plan.label}</h3>
          {plan.popular ? (
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
              Popular
            </span>
          ) : null}
        </div>
        <p className="mt-1.5 min-h-10 text-[13px] leading-relaxed text-muted-foreground">
          {plan.tagline}
        </p>
      </div>
      <div className="mt-5 flex items-start">
        <span className="mt-1 text-base font-semibold text-foreground">{symbol}</span>
        <span
          className={cn(
            'text-4xl font-semibold tabular-nums tracking-tight text-foreground transition-opacity duration-300',
            !resolved && 'opacity-40',
          )}
        >
          {amount}
        </span>
        <span className="ml-1.5 mt-4 text-xs font-medium text-muted-foreground">/ month</span>
      </div>
      <Link
        href={plan.href}
        className={cn(
          'mt-6',
          plan.popular
            ? LANDING_PRIMARY_CTA_CLASS
            : 'inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-card px-4 text-[13px] font-semibold text-foreground ring-1 ring-border shadow-sm shadow-black/5 transition-colors hover:bg-muted/60',
        )}
      >
        {plan.cta}
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
      <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
        {plan.featuresLead ? (
          <li className="text-[13px] font-semibold text-foreground">{plan.featuresLead}</li>
        ) : null}
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-[13px] leading-snug text-foreground/90"
          >
            <Check
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
              strokeWidth={2.5}
              aria-hidden
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

function EnterpriseRow(): JSX.Element {
  return (
    <div className="relative border-t border-border">
      <GridCornerHandles top />
      <GridHandle className="-top-[3.5px] left-1/3 -ml-[3.5px] hidden lg:block" />
      <div className="grid lg:grid-cols-[1fr_2fr] lg:divide-x lg:divide-border">
        <div className="bg-card px-6 py-10 max-lg:border-b max-lg:border-border sm:px-10">
          <h3 className="text-base font-semibold tracking-tight text-foreground">Enterprise</h3>
          <p className="mt-1.5 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
            Higher prompt volumes, multiple domains, and advanced support for larger teams.
          </p>
          <Link
            href="/contact-sales"
            className="mt-5 inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-card px-4 text-[13px] font-semibold text-foreground ring-1 ring-border shadow-sm shadow-black/5 transition-colors hover:bg-muted/60"
          >
            Contact sales
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
        <ul className="grid content-center gap-x-10 gap-y-3 bg-card px-6 py-10 sm:grid-cols-2 sm:px-10">
          {ENTERPRISE_FEATURES.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-[13px] leading-snug text-foreground/90"
            >
              <Check
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
                strokeWidth={2.5}
                aria-hidden
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function HomePricing(): JSX.Element {
  const { currency, ready: currencyReady, selectCurrency } = useCurrency()
  const [livePrices, setLivePrices] = useState<Record<string, DodoPlanPrice | null> | null>(null)

  useEffect(() => {
    getPlanPrices()
      .then((res) => {
        if (res.source === 'dodo') {
          setLivePrices({ starter: res.starter, pro: res.pro, business: res.business })
        }
      })
      .catch(() => {
        /* graceful: fall back to static GBP-rate display */
      })
  }, [])

  const userCcy = currencyReady ? currency.code : null

  return (
    <section id="pricing" className="scroll-mt-20" aria-labelledby="home-pricing-heading">
      <div className="relative border-t border-border px-6 py-14 sm:py-16">
        <GridCornerHandles top />
        <HomeSectionHeader
          eyebrow="Pricing"
          headingId="home-pricing-heading"
          title="One clear monthly number"
          description="Cancel anytime. No setup fees, no seats, no surprise usage bills."
        />
        <div className="mt-8 flex items-center justify-center gap-3">
          <CurrencyToggle currency={currency} onSelect={selectCurrency} />
          <Link
            href="/pricing"
            className="text-[13px] font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Full plan comparison →
          </Link>
        </div>
      </div>
      <div className="relative border-t border-border">
        <GridCornerHandles top />
        <GridHandle className="-top-[3.5px] left-1/3 -ml-[3.5px] hidden lg:block" />
        <GridHandle className="-top-[3.5px] left-2/3 -ml-[3.5px] hidden lg:block" />
        <div className="grid grid-cols-1 divide-border max-lg:divide-y lg:grid-cols-3 lg:divide-x">
          {HOME_PLANS.map((plan) => {
            const price = planPriceLabel({
              plan,
              live: livePrices?.[plan.id] ?? null,
              userCcy,
              currency,
              currencyReady,
            })
            return (
              <div
                key={plan.id}
                className={cn('flex bg-card', plan.popular ? 'p-4 lg:p-5' : 'px-6 py-9 sm:px-8')}
              >
                {plan.popular ? (
                  <div className="relative z-10 flex w-full flex-col rounded-xl bg-card p-6 shadow-md shadow-black/10 ring-2 ring-primary/60 sm:p-7">
                    <PlanContent
                      plan={plan}
                      symbol={price.symbol}
                      amount={price.amount}
                      resolved={price.resolved}
                    />
                  </div>
                ) : (
                  <div className="flex w-full flex-col">
                    <PlanContent
                      plan={plan}
                      symbol={price.symbol}
                      amount={price.amount}
                      resolved={price.resolved}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <EnterpriseRow />
    </section>
  )
}
