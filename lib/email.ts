import { Resend } from 'resend'

import { env } from '@/lib/env'
import { createLogger } from '@/lib/logger'

const log = createLogger('email')

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null

/**
 * Send a one-time-code email via Resend.
 * Falls back to logging the code in development when Resend isn't configured.
 */
export async function sendOtpEmail(to: string, otp: string): Promise<void> {
  const from = env.FROM_EMAIL

  if (!resend || !from) {
    log.info({ to, otp }, 'Email OTP (Resend not configured — dev log)')
    return
  }

  try {
    await resend.emails.send({
      from: `Signalor <${from}>`,
      to,
      subject: 'Your Signalor verification code',
      text: `Your Signalor verification code is ${otp}. It expires in 10 minutes.`,
    })
  } catch (error) {
    log.error({ error }, 'Resend send failed')
    throw new Error('Failed to send verification email.')
  }
}
