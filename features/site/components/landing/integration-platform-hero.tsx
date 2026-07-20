'use client'

import Image from 'next/image'
import { Breadcrumbs } from '@/features/site/components/seo/breadcrumbs'

export type IntegrationPlatformCopy = {
  title: string
  headline: string
  subhead: string
  bullets: readonly string[]
}

export function IntegrationPlatformHero({
  copy,
  logoSrc,
}: {
  copy: IntegrationPlatformCopy
  logoSrc: string
}) {
  return (
    <section className="bg-background relative px-6 pt-14 pb-14 lg:px-12 lg:pt-16 lg:pb-20">
      <div className="relative z-10 mx-auto max-w-3xl">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Integrations', href: '/integration' },
            { name: copy.title },
          ]}
        />
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-none border border-black/8 bg-white shadow-sm">
            <Image
              src={logoSrc}
              alt={`${copy.title} logo`}
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
          </span>
          <div>
            <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
              Integration
            </p>
            <h1 className="text-foreground mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
              {copy.headline}
            </h1>
          </div>
        </div>
        <p className="text-muted-foreground mt-5 text-base leading-relaxed font-light sm:text-lg">
          {copy.subhead}
        </p>
        <ul className="mt-8 space-y-3 border-t border-black/8 pt-8">
          {copy.bullets.map(line => (
            <li
              key={line}
              className="text-foreground flex gap-3 text-sm leading-relaxed sm:text-sm"
            >
              <span className="bg-primary mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden />
              {line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
