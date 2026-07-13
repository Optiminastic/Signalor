'use client'

import { Check, ChevronDown, type LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export interface FilterOption {
  value: string
  label: string
}

interface FilterMenuProps {
  icon?: LucideIcon
  /** Text shown on the trigger (usually the active selection). */
  label: string
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  /** Extra classes for responsive show/hide on the trigger. */
  className?: string
}

const TRIGGER =
  'inline-flex h-[34px] items-center gap-1.5 rounded-md border border-[var(--cat-border)] bg-[var(--cat-card)] px-3 text-[13px] font-medium text-[var(--cat-ink)] transition-colors hover:bg-[var(--cat-hover)]'

interface MenuListProps {
  options: FilterOption[]
  value: string
  onPick: (value: string) => void
}

function MenuList({ options, value, onPick }: MenuListProps): JSX.Element {
  return (
    <div className="absolute top-[calc(100%+4px)] right-0 z-30 min-w-[180px] overflow-hidden rounded-md border border-[var(--cat-border)] bg-[var(--cat-card)] p-1 shadow-lg">
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onPick(opt.value)}
          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] text-[var(--cat-ink)] transition-colors hover:bg-[var(--cat-hover)]"
        >
          <span className="min-w-0 flex-1 truncate">{opt.label}</span>
          {opt.value === value && <Check size={14} className="shrink-0 text-[#e04a3d]" />}
        </button>
      ))}
    </div>
  )
}

export function FilterMenu({
  icon: Icon,
  label,
  options,
  value,
  onChange,
  className = '',
}: FilterMenuProps): JSX.Element {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDown(e: MouseEvent): void {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const pick = (next: string): void => {
    onChange(next)
    setOpen(false)
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button type="button" onClick={() => setOpen(o => !o)} className={TRIGGER}>
        {Icon && <Icon size={15} className="text-[var(--cat-ink-2)]" />}
        {label}
        <ChevronDown size={14} className="text-[var(--cat-ink-3)]" />
      </button>
      {open && <MenuList options={options} value={value} onPick={pick} />}
    </div>
  )
}
