'use client'

import { Moon, Sun } from 'lucide-react'

import { useCatalystTheme } from '@/features/catalyst/components/CatalystThemeProvider'
import { ICON_TILE } from '@/features/catalyst/components/control-styles'

/** Compact icon-only theme toggle for the top bar. */
export function ThemeToggleButton(): JSX.Element {
  const { dark, toggle } = useCatalystTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={ICON_TILE}
    >
      {dark ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
    </button>
  )
}
