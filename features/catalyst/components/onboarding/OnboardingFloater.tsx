'use client'

import { Check, ChevronRight, ListChecks, Minus, PartyPopper } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { TickBar } from '@/features/catalyst/components/brands/BrandBits'
import { useActiveProject } from '@/hooks/useActiveProject'
import { useMounted } from '@/hooks/useMounted'
import { useOnboardingSteps, type OnboardingStep } from '@/hooks/useOnboardingSteps'

const DISMISS_KEY = 'signalor.onboarding.dismissed'
const OPEN_KEY = 'signalor.onboarding.open'

/** Read a persisted boolean flag, guarding SSR where localStorage is absent. */
function readFlag(key: string, fallback: boolean): boolean {
  if (typeof window === 'undefined') return fallback
  const value = window.localStorage.getItem(key)
  return value === null ? fallback : value === '1'
}

function StepIcon({ done }: { done: boolean }): JSX.Element {
  if (done) {
    return (
      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#e04a3d] text-white">
        <Check size={13} strokeWidth={3} />
      </span>
    )
  }
  return (
    <span className="h-5 w-5 shrink-0 rounded-full border-2 border-dashed border-[var(--cat-border)]" />
  )
}

function StepRow({ step, active }: { step: OnboardingStep; active: boolean }): JSX.Element {
  return (
    <Link
      href={step.href}
      className={`block rounded-md px-2.5 py-2 transition-colors ${
        active ? 'bg-[var(--cat-hover)]' : 'hover:bg-[var(--cat-hover)]'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <StepIcon done={step.done} />
        <span
          className={`flex-1 truncate text-[13px] font-medium ${
            step.done ? 'text-[var(--cat-ink-3)] line-through' : 'text-[var(--cat-ink)]'
          }`}
        >
          {step.title}
        </span>
        {!step.done && <ChevronRight size={15} className="shrink-0 text-[var(--cat-ink-3)]" />}
      </div>
      {active && !step.done && (
        <div className="mt-1.5 pl-[30px]">
          <p className="text-[12px] leading-relaxed text-[var(--cat-ink-3)]">{step.description}</p>
          <span className="mt-2 inline-flex h-8 items-center gap-1.5 rounded-md bg-[#e04a3d] px-3 text-[12px] font-semibold text-white">
            {step.cta}
            <ChevronRight size={14} strokeWidth={2.4} />
          </span>
        </div>
      )}
    </Link>
  )
}

function CollapsedTrigger({
  completed,
  total,
  onOpen,
}: {
  completed: number
  total: number
  onOpen: () => void
}): JSX.Element {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="inline-flex items-center gap-2 rounded-full bg-[var(--cat-card)] py-2 pr-3.5 pl-2.5 text-[13px] font-semibold text-[var(--cat-ink)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] ring-1 ring-black/10 transition-transform hover:-translate-y-0.5 dark:ring-white/10"
    >
      <span className="grid h-6 w-6 place-items-center rounded-full bg-[#e04a3d]/10 text-[#e04a3d]">
        <ListChecks size={14} />
      </span>
      Getting started
      <span className="rounded-full bg-[var(--cat-hover)] px-2 py-0.5 text-[11px] text-[var(--cat-ink-2)] tabular-nums">
        {completed}/{total}
      </span>
    </button>
  )
}

interface CardProps {
  steps: OnboardingStep[]
  completed: number
  total: number
  allDone: boolean
  onCollapse: () => void
  onDismiss: () => void
}

function CardHeader({
  completed,
  total,
  onCollapse,
}: {
  completed: number
  total: number
  onCollapse: () => void
}): JSX.Element {
  return (
    <div className="flex items-start justify-between gap-2 px-4 pt-4">
      <div>
        <p className="text-[14px] font-semibold text-[var(--cat-ink)]">Get started with Signalor</p>
        <p className="mt-0.5 text-[12px] text-[var(--cat-ink-3)]">
          {completed} of {total} complete
        </p>
      </div>
      <button
        type="button"
        aria-label="Minimize"
        onClick={onCollapse}
        className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-[var(--cat-ink-3)] transition-colors hover:bg-[var(--cat-hover)] hover:text-[var(--cat-ink)]"
      >
        <Minus size={16} />
      </button>
    </div>
  )
}

function OnboardingCard({
  steps,
  completed,
  total,
  allDone,
  onCollapse,
  onDismiss,
}: CardProps): JSX.Element {
  const activeId = steps.find(s => !s.done)?.id
  return (
    <div className="w-[330px] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-xl bg-[var(--cat-card)] shadow-[0_20px_50px_-16px_rgba(0,0,0,0.35)] ring-1 ring-black/10 dark:ring-white/10">
      <CardHeader completed={completed} total={total} onCollapse={onCollapse} />
      <div className="px-4 pt-3">
        <TickBar value={(completed / total) * 100} ticks={total * 4} showValue={false} />
      </div>
      {allDone ? (
        <div className="flex flex-col items-center gap-2 px-4 py-6 text-center">
          <PartyPopper size={22} className="text-[#e04a3d]" />
          <p className="text-[13px] font-semibold text-[var(--cat-ink)]">You’re all set!</p>
          <button
            type="button"
            onClick={onDismiss}
            className="mt-1 rounded-md bg-[#e04a3d] px-3 py-1.5 text-[12px] font-semibold text-white"
          >
            Dismiss
          </button>
        </div>
      ) : (
        <div className="space-y-0.5 p-2">
          {steps.map(s => (
            <StepRow key={s.id} step={s} active={s.id === activeId} />
          ))}
        </div>
      )}
    </div>
  )
}

export function OnboardingFloater(): JSX.Element | null {
  const mounted = useMounted()
  const { orgSlug } = useActiveProject()
  const { steps, completed, total, allDone } = useOnboardingSteps()
  // Open by default; the lazy initializers read the user's saved preference on
  // the client (SSR-guarded), so there's no set-state-in-effect churn.
  const [open, setOpen] = useState(() => readFlag(OPEN_KEY, true))
  const [dismissed, setDismissed] = useState(() => readFlag(DISMISS_KEY, false))

  const setOpenPersisted = (next: boolean): void => {
    setOpen(next)
    localStorage.setItem(OPEN_KEY, next ? '1' : '0')
  }
  const dismiss = (): void => {
    setDismissed(true)
    localStorage.setItem(DISMISS_KEY, '1')
  }

  if (!mounted || !orgSlug || dismissed) return null

  return (
    <div className="fixed right-5 bottom-5 z-40 flex flex-col items-end print:hidden">
      {open ? (
        <OnboardingCard
          steps={steps}
          completed={completed}
          total={total}
          allDone={allDone}
          onCollapse={() => setOpenPersisted(false)}
          onDismiss={dismiss}
        />
      ) : (
        <CollapsedTrigger
          completed={completed}
          total={total}
          onOpen={() => setOpenPersisted(true)}
        />
      )}
    </div>
  )
}
