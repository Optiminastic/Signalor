import type { ReactNode } from 'react'

interface CallbackPanelProps {
  title: string
  icon?: JSX.Element
  children?: ReactNode
}

/** Centered single-message frame shared by the OAuth callback screens. */
export function CallbackPanel({ title, icon, children }: CallbackPanelProps): JSX.Element {
  return (
    <main className="grid min-h-svh place-items-center bg-white px-6 font-sans">
      <div className="flex w-full max-w-sm flex-col items-center gap-3 text-center">
        {icon}
        <h1 className="text-foreground text-lg font-semibold tracking-tight">{title}</h1>
        {children}
      </div>
    </main>
  )
}
