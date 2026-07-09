'use client'

import { useState } from 'react'

interface ConnectSwitchProps {
  defaultOn: boolean
  label: string
}

/** Toggle used to connect / disconnect an integration. */
export function ConnectSwitch({ defaultOn, label }: ConnectSwitchProps): JSX.Element {
  const [on, setOn] = useState(defaultOn)
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={`${on ? 'Disconnect' : 'Connect'} ${label}`}
      onClick={() => setOn(v => !v)}
      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 ${
        on ? 'bg-[#e04a3d]' : 'bg-[var(--cat-hover)]'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-[0_1px_2px_rgba(16,24,40,.2)] transition-transform duration-200 ${
          on ? 'translate-x-[18px]' : 'translate-x-[2px]'
        }`}
      />
    </button>
  )
}
