// Shared control recipes for the auth flow — the landing page's hairline
// treatment: no hard borders, a 1px foreground ring + whisper shadow
// (`shadow ring-1 ring-foreground/10`), brand-red focus.

export const AUTH_FIELD =
  'h-10 w-full rounded-md bg-card px-3 text-[13px] text-foreground shadow ring-1 ring-foreground/10 outline-none transition placeholder:text-muted-foreground/55 focus:ring-2 focus:ring-primary/50 disabled:opacity-60'

export const AUTH_SECONDARY_BUTTON =
  'flex h-10 w-full items-center justify-center gap-2 rounded-md bg-card text-[13px] font-medium text-foreground shadow ring-1 ring-foreground/10 transition hover:bg-muted/60 disabled:cursor-not-allowed disabled:opacity-60'
