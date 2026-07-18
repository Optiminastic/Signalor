/**
 * Read the identity out of a Google OAuth `state` parameter.
 *
 * The backend signs `state` as `{"data": {"org_id", "email"}, "sig"}` and echoes
 * it through Google unchanged. The frontend only needs to *read* `data.email` to
 * point the property picker at the same org the tokens were stored for — the HMAC
 * is verified server-side, so we never trust this for authorization, only to keep
 * the multi-step flow consistent with itself.
 */
export function emailFromState(state: string | null): string | undefined {
  if (!state) return undefined
  try {
    const parsed: unknown = JSON.parse(state)
    if (parsed && typeof parsed === 'object' && 'data' in parsed) {
      const data = (parsed as { data?: unknown }).data
      if (data && typeof data === 'object' && 'email' in data) {
        const email = (data as { email?: unknown }).email
        return typeof email === 'string' ? email : undefined
      }
    }
  } catch {
    // Malformed state — the exchange will fail server-side anyway.
  }
  return undefined
}
