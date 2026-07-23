'use client'

import { useEffect, useState } from 'react'

import { useActiveProject } from '@/hooks/useActiveProject'

const COOLDOWN_MS = 24 * 60 * 60 * 1000
const TICK_MS = 60_000

export interface AnalysisCooldown {
  /** True while the brand's last completed analysis is under 24h old. */
  onCooldown: boolean
  /** Remaining time until the next allowed run, formatted "20h 20m" / "8m". */
  label: string
  /** Fraction of the 24h window already elapsed (0–1), for the countdown ring. */
  progress: number
}

const IDLE: AnalysisCooldown = { onCooldown: false, label: '', progress: 0 }

function formatRemaining(ms: number): string {
  const totalMinutes = Math.max(0, Math.ceil(ms / 60_000))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
}

/**
 * Mirrors the backend's once-per-24h analysis cooldown (see `run_guard.py`) so
 * the Overview toolbar can show a live "Next check in" countdown and disable
 * Re-analyze instead of letting the request 429. Keyed on the active project's
 * last completed run, ticking each minute. Returns idle until measured on the
 * client, which also avoids an SSR/hydration mismatch on `Date.now()`.
 */
export function useAnalysisCooldown(): AnalysisCooldown {
  const { run } = useActiveProject()
  // Key on a COMPLETE run only, mirroring the backend: a failed or still-running
  // run never starts the clock, so a first/in-flight analysis shows no countdown.
  const completedAt = run?.status === 'complete' ? run.created_at : undefined
  const startedAt = completedAt ? new Date(completedAt).getTime() : null
  const readyAt = startedAt !== null ? startedAt + COOLDOWN_MS : null
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), TICK_MS)
    return () => clearInterval(id)
  }, [])

  if (now === null || readyAt === null || startedAt === null || now >= readyAt) return IDLE

  return {
    onCooldown: true,
    label: formatRemaining(readyAt - now),
    progress: Math.min(1, Math.max(0, (now - startedAt) / COOLDOWN_MS)),
  }
}
