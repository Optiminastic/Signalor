// Shared card treatment for the redesigned homepage sections.
//
// Recipe extracted from Tailark Pro's production CSS: cards are a 1px neutral
// ring (~7.5% black — our `--border` token is 8%, visually identical) plus a
// very soft low-opacity black shadow, instead of hard borders. Panels that
// frame screenshots step up to `shadow-md`.
export const HOME_CARD = 'rounded-xl bg-card ring-1 ring-border shadow-sm shadow-black/5'

export const HOME_CARD_MD = 'rounded-xl bg-card ring-1 ring-border shadow-md shadow-black/5'

// Padded frame around large screenshots/panels (hero, CTA imagery).
export const HOME_FRAME =
  'rounded-2xl bg-card/75 p-1.5 ring-1 ring-border shadow-lg shadow-black/5 backdrop-blur-[2px] sm:p-2'

// Recessed gray "well" inside a white cell that hosts a mini product visual —
// the promptwatch-style layering: gray page → white cell → gray well → white
// illustration card.
export const HOME_WELL = 'rounded-xl bg-muted/50 p-4 ring-1 ring-border/50 sm:p-5'
