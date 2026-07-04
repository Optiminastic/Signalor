'use client'

import { Moon, Sun } from 'lucide-react'

import { useCatalystTheme } from '@/features/catalyst/components/CatalystThemeProvider'

const BTN =
  'grid h-[34px] w-[34px] shrink-0 place-items-center rounded-md border border-[var(--cat-border)] bg-[var(--cat-card)] text-[var(--cat-ink-2)] transition-colors hover:bg-[var(--cat-hover)] hover:text-[var(--cat-ink)]'

/** Compact icon-only theme toggle for the top bar. */
export function ThemeToggleButton(): JSX.Element {
  const { dark, toggle } = useCatalystTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={BTN}
    >
      {dark ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
    </button>
  )
}
