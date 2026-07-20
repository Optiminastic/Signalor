'use client'

import type { ReactNode } from 'react'

import { BlogCardFrame } from '@/features/site/components/blog/blog-card-frame'
import { HomeFaq } from '@/features/site/components/landing/home-faq'
import { GridCornerHandles, MeasureBox } from '@/features/site/components/landing/home-grid'
import type { ToolFaqItem } from '@/features/site/lib/tool-faqs'
import { cn } from '@/features/site/lib/utils'

export type ToolTheme = 'orange' | 'blue' | 'emerald' | 'violet'

const THEME: Record<
  ToolTheme,
  {
    accentBg: string
    accentDecoration: string
  }
> = {
  orange: {
    accentBg: 'bg-primary',
    accentDecoration: 'decoration-primary/60',
  },
  blue: {
    accentBg: 'bg-info',
    accentDecoration: 'decoration-info/60',
  },
  emerald: {
    accentBg: 'bg-success',
    accentDecoration: 'decoration-success/60',
  },
  violet: {
    accentBg: 'bg-[var(--feature-violet)]',
    accentDecoration: 'decoration-[var(--feature-violet)]/60',
  },
}

/** `[ free tool · url analyzer ]` → `free tool · url analyzer` for the hero pill. */
function pillLabel(eyebrow: string): string {
  return eyebrow.replace(/^\[\s*/, '').replace(/\s*\]$/, '')
}

export type ToolFeature = { title: string; description: string }

export function ToolPage({
  theme,
  eyebrow,
  title,
  titleAccent,
  description,
  secondaryDescription,
  form,
  features,
  faq,
}: {
  theme: ToolTheme
  /** Uppercase eyebrow, wrap the topic in brackets e.g. `[ free tool ]` */
  eyebrow: string
  title: string
  /** Optional dashed-underline accent span within the title */
  titleAccent?: string
  description: string
  secondaryDescription?: string
  form: ReactNode
  features: ToolFeature[]
  /** Visible FAQ items; must mirror the layout's FAQPage JSON-LD. */
  faq?: ToolFaqItem[]
}) {
  const t = THEME[theme]
  const featuresCols = Math.min(features.length, 4)

  return (
    <div className="border-border relative mx-auto max-w-6xl border-x">
      <GridCornerHandles top bottom />

      {/* ── Hero (landing language: pill · centered · dashed accent) ────── */}
      <section className="relative overflow-hidden px-6 pt-14 pb-16 md:pt-20 md:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_65%_at_50%_0%,rgba(224,74,61,0.05),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <MeasureBox className="mx-auto w-fit">
            <div className="bg-card ring-border relative flex items-center gap-2 rounded-full px-3 py-1 shadow-sm ring-1 shadow-black/5">
              <span className={cn('h-1.5 w-1.5 rounded-full', t.accentBg)} aria-hidden />
              <span className="text-foreground text-sm">{pillLabel(eyebrow)}</span>
            </div>
          </MeasureBox>
          <h1 className="text-foreground mt-8 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {title}{' '}
            {titleAccent && (
              <span
                className={cn(
                  'underline decoration-dashed decoration-2 underline-offset-[6px]',
                  t.accentDecoration,
                )}
              >
                {titleAccent}
              </span>
            )}
          </h1>
          <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-balance">
            {description}
          </p>
          {secondaryDescription && <p className="sr-only">{secondaryDescription}</p>}
          <div className="mx-auto mt-8 max-w-xl text-left">{form}</div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section
        className="border-border relative border-t px-6 py-14 lg:px-12 lg:py-16"
        aria-labelledby="tool-features-heading"
      >
        <GridCornerHandles top />
        <h2 id="tool-features-heading" className="sr-only">
          Features
        </h2>
        <div
          className={cn(
            'grid gap-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12',
            featuresCols === 3 && 'lg:grid-cols-3',
            featuresCols >= 4 && 'lg:grid-cols-4',
          )}
        >
          {features.map(f => (
            <div key={f.title} className="group flex flex-col">
              <BlogCardFrame seed={`${theme}-${f.title}`}>
                <span className="ring-foreground/10 grid h-12 w-12 place-items-center rounded-xl bg-white shadow-md ring-1">
                  <span className={cn('h-2.5 w-2.5 rounded-full', t.accentBg)} aria-hidden />
                </span>
              </BlogCardFrame>
              <h3 className="text-foreground mt-4 text-lg font-bold tracking-tight">{f.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ (shared landing design; mirrors layout FAQPage JSON-LD) ──── */}
      {faq && faq.length > 0 && <HomeFaq items={faq} />}
    </div>
  )
}
