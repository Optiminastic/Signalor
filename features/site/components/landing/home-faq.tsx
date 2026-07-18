'use client'

import { useState } from 'react'

import { ChevronDown } from '@/features/site/components/icons'
import { GridCornerHandles, GridHandle } from '@/features/site/components/landing/home-grid'
import { MailLink } from '@/features/site/components/mail-link'
import { cn } from '@/features/site/lib/utils'

type FaqItem = { question: string; answer: string }

interface HomeFaqProps {
  items: FaqItem[]
}

interface FaqRowProps {
  item: FaqItem
  index: number
  isOpen: boolean
  onToggle: () => void
}

function FaqRow({ item, index, isOpen, onToggle }: FaqRowProps): JSX.Element {
  const panelId = `home-faq-panel-${index}`
  const buttonId = `home-faq-trigger-${index}`
  return (
    <li
      className={cn(
        'rounded-lg transition-all duration-200',
        isOpen
          ? 'bg-card shadow-sm shadow-black/5 ring-1 ring-primary/40'
          : 'hover:bg-muted/40',
      )}
    >
      <h3 className="m-0 text-[15px] font-medium leading-snug text-foreground">
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
        >
          <span className="min-w-0 pr-2">{item.question}</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
              isOpen && 'rotate-180',
            )}
            aria-hidden
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="px-4 pb-5 pr-10 text-sm leading-relaxed text-muted-foreground sm:px-5">
            {item.answer}
          </p>
        </div>
      </div>
    </li>
  )
}

export function HomeFaq({ items }: HomeFaqProps): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-20" aria-labelledby="home-faq-heading">
      <div className="relative border-t border-border">
        <GridCornerHandles top />
        <GridHandle className="-top-[3.5px] left-[40%] -ml-[3.5px] hidden lg:block" />
        <div className="grid lg:grid-cols-[2fr_3fr] lg:divide-x lg:divide-border">
          <div className="relative max-lg:border-b max-lg:border-border">
            <div className="px-6 py-14 sm:px-10 lg:sticky lg:top-24 lg:py-20">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">
                FAQ
              </p>
              <h2
                id="home-faq-heading"
                className="mt-3 max-w-sm text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
              >
                Your questions, answered
              </h2>
              <p className="mt-4 max-w-sm text-pretty text-base leading-relaxed text-muted-foreground">
                Can&rsquo;t find what you&rsquo;re looking for?{' '}
                <MailLink
                  user="hello"
                  subject="Question about Signalor"
                  className="font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Contact our support team
                </MailLink>
                .
              </p>
            </div>
          </div>
          <div className="px-4 py-10 sm:px-8 lg:py-14">
            <ul className="space-y-1.5">
              {items.map((item, index) => (
                <FaqRow
                  key={item.question}
                  item={item}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
