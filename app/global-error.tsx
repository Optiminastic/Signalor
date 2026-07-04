'use client'

import type { CSSProperties } from 'react'

// Root error boundary — replaces the whole document, so it must render its own
// <html>/<body> and can't rely on the app's stylesheet. Inline styles only.
const WRAP: CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
  background: '#fafafa',
  textAlign: 'center',
  padding: '0 24px',
}

const BTN: CSSProperties = {
  height: 40,
  padding: '0 16px',
  borderRadius: 8,
  background: '#e04a3d',
  color: '#fff',
  fontWeight: 500,
  fontSize: 14,
  border: 'none',
  cursor: 'pointer',
}

export default function GlobalError({ reset }: { reset: () => void }): JSX.Element {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Inter, system-ui, sans-serif' }}>
        <main style={WRAP}>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: '#171717', margin: 0 }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: 13, color: '#737373', margin: 0 }}>
            An unexpected error occurred. Please try again.
          </p>
          <button type="button" onClick={reset} style={BTN}>
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}
