# Signalor Marketing Site - Design System & Page Structure

> **Read this before creating or editing ANY marketing page.**
> Scope: everything rendered inside `MarketingShell` or `app/page.tsx` - the home page, feature pages, content pages, blog, tools, and the nav mega menu.
> The `/catalyst` dashboard has its own system: see `design.md`.
> Generic de-AI principles live in `DESIGN-NO-AI-FEEL.md`; this file is the concrete, repo-specific source of truth and wins on conflict.

The goal of this file: any page built from it must look hand-composed and identical in language to the existing pages.
If a rule here conflicts with what a page currently does, the page is drift - fix it toward this file (see section 10).

---

## 1. How to use this file (process, not vibes)

1. Identify the page type in section 6 and open its named reference page in the repo.
2. Copy the reference page's skeleton (section order, frame, dividers) exactly.
3. Build sections only from the shared components (section 4) and class recipes (section 5).
4. Never invent a new card, button, eyebrow, or shadow recipe - if a recipe is missing here, extend an existing one and add it to this file.
5. Run the smell test in section 9 before finishing.

Never compose from `features/landing/components/Hero.tsx`, `Footer.tsx`, `FeaturesGrid.tsx`, `LandingPage.tsx`, `Testimonials.tsx` - these are pre-redesign leftovers.
Live components from that folder are only: `MarketingShell`, `MarketingContent`, `LandingNav`, `LandingNavMenu`, `MegaPanels`, `FeaturedGraph`.
Ignore `features/site/styles/design-system.css` (dead file, indigo palette, imported nowhere).

---

## 2. The two section languages

The marketing site deliberately has two looks.
Every section you build must commit to one of them - mixing them in one section is the fastest way to look AI-generated.

### A. "Rail" (home page + global chrome)

- Content sits inside a `mx-auto max-w-6xl border-x border-border` rail, so vertical hairlines run the full page.
- Cards are soft: `rounded-xl bg-card ring-1 ring-border shadow-sm shadow-black/5` (use `HOME_CARD` from `features/site/components/landing/home-styles.ts`).
- Decorations: `GridCornerHandles` / `GridHandle` dots at rail intersections (`home-grid.tsx`).
- Used by: `/` sections, `HomeCta`, `HomeFooter`.

### B. "Sheet" (feature, blog, tools pages)

- Full-bleed sections on `max-w-7xl`, divided by `ScreenHR` (full-viewport `border-t border-black/6` with 5px diamonds at the rail crossings, from `features/site/components/ui/intersection-diamonds.tsx`).
- Cards are square: `rounded-none border border-black/8 bg-white shadow-xs`.
- Grid cells divide with `divide-x divide-y divide-black/6`, no gaps.
- Used by: `/ai-visibility`, `/prompt-tracking`, `/explorer`, `/blog`, `/tools`, `/integration`.

Rule: a new PAGE picks A or B by its page type (section 6) and uses it for every section on that page.

---

## 3. Tokens (the only palette)

All from `app/globals.css`. Use the Tailwind token classes, never raw hex, in new code.

| Role | Token / class | Value |
| --- | --- | --- |
| Brand (the ONLY accent) | `text-primary` / `bg-primary` | `#e04a3d` |
| Ink (headings) | `text-foreground` | `#171717` |
| Body / muted | `text-muted-foreground` | `#737373` |
| Page canvas | `bg-[#fafafa]` (set once by `MarketingShell`) | `#fafafa` |
| Card surface | `bg-card` / `bg-white` | `#ffffff` |
| Tinted panel | `bg-muted` | `#f5f5f5` |
| Hairline | `border-border` (A) or `border-black/6` `/8` `/10` (B) | ~8% black |
| Status only | `text-success #047857`, `text-warning #b45309`, `text-info #2563eb`, `text-feature-violet #6d28d9` | data meaning only |

- One accent: brand red carries every CTA, active state, and eyebrow highlight. Status colors appear only where they mean something (badges, category tones, live dots).
- Never introduce a new hex. Never use pure `#000` text or heavy `shadow-lg/xl` blacks.
- Shadows are whispers: `shadow-xs`, `shadow-sm shadow-black/5`, at most `shadow-md shadow-black/5` on floating panels.

### Type scale

| Slot | Classes |
| --- | --- |
| Hero h1 | `text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight` (Rail) or `font-bold leading-[1.08]` (Sheet) |
| Section h2 | `text-3xl sm:text-4xl font-semibold tracking-tight text-foreground` |
| Card title | `text-[15px]` or `text-[14px]` `font-semibold` / `font-medium text-foreground` |
| Body | `text-base leading-relaxed text-muted-foreground` |
| Small body / desc | `text-[13px]` or `text-[14px]` `text-muted-foreground` |
| Eyebrow | see recipes below - 11-12px uppercase tracked |
| Numbers | always `tabular-nums`; big stats `text-4xl font-semibold` |

Font is Mona Sans app-wide via `font-sans`. No serif, no second font, no italics.

### Icons

- Marketing sections use the in-house icon set: `@/features/site/components/icons` (24px viewBox, `strokeWidth 1.75-2`, one filled signal-dot accent per glyph). Prefer it - it is a brand signature.
- The nav mega menu uses `@tabler/icons-react` (`stroke={1.75}`) - keep that surface consistent with itself.
- Never mix a third icon library into marketing pages. Never use emoji as icons.

---

## 4. Shared components (reuse before you build)

| Component | File | Job |
| --- | --- | --- |
| `MarketingShell` | `features/landing/components/MarketingShell.tsx` | Page wrapper: canvas + `LandingNav` + children + `HomeCta` + `HomeFooter` |
| `LandingNav` / `LandingNavMenu` / `MegaPanels` | `features/landing/components/` | Header + mega menu (section 7) |
| `MarketingContent` | `features/landing/components/MarketingContent.tsx` | Content-stub page body (eyebrow/title/subtitle/cta/sections) |
| `HomeSectionHeader` | `features/site/components/landing/home-section-header.tsx` | Canonical Rail section header (eyebrow + h2 + desc) |
| `HomeCta` | `features/site/components/landing/home-cta.tsx` | Pre-footer CTA band (already in shell) |
| `HomeFooter` | `features/site/components/landing/home-footer.tsx` | Footer (already in shell) |
| `LandingFaq` | `features/site/components/landing/landing-faq.tsx` | FAQ accordion for Sheet pages |
| `RelatedLinks` | `features/site/components/seo/related-links.tsx` | Internal-link cluster, required on feature pages |
| `ScreenHR`, `CornerDiamonds` | `features/site/components/ui/intersection-diamonds.tsx` | Sheet section dividers |
| `GridCornerHandles` | `features/site/components/landing/home-grid.tsx` | Rail intersection dots |
| `Button` | `features/site/components/ui/button.tsx` | Form/base button primitive |
| `PromptTrackingHero` / `PromptTrackingFeaturesGrid` / `PromptTrackingWhySection` | `features/site/components/landing/` | The reusable, content-driven feature-page sections (themeable) |
| `JsonLd` helpers | existing usage in `app/page.tsx`, `app/integration/page.tsx` | SEO structured data |

---

## 5. Class recipes (copy exactly)

### Primary CTA (the only filled button)

Use `LANDING_PRIMARY_CTA_CLASS` from `features/site/components/landing/constants.ts`:

```
auth-cta-btn inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md px-5 text-sm font-semibold text-white shadow-sm transition-all motion-safe:hover:-translate-y-px hover:text-white
```

Always brand red. The dark `bg-foreground text-background` CTA on `/creators-program` is drift - do not copy it.

### Secondary button

```
inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-card px-5 text-sm font-semibold text-foreground ring-1 ring-border shadow-sm shadow-black/5 transition-all hover:bg-muted/60
```

### Eyebrows (two sanctioned variants)

- Rail: `text-[12px] font-semibold uppercase tracking-[0.18em] text-primary` - plain text, e.g. `How it works`.
- Sheet: `text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground` - rendered bracketed, e.g. `[ free tools ]`.

No third variant. `MarketingContent`'s red hex eyebrow counts as the Rail variant and should migrate to `text-primary`.

### Headline accent

One accented word per hero, done with a dashed underline, never a gradient:

```
underline decoration-primary/60 decoration-dashed decoration-2 underline-offset-4
```

(Sheet pages may theme the decoration color via their section theme, e.g. orange/blue/violet on the feature pages.)

### Cards

- Rail card: `HOME_CARD` = `rounded-xl bg-card ring-1 ring-border shadow-sm shadow-black/5`; padded `p-4` or `p-5`.
- Rail frame (screenshot/mock wrapper): `HOME_FRAME` = `rounded-2xl bg-card/75 p-1.5 ring-1 ring-border shadow-lg shadow-black/5 backdrop-blur-[2px]`.
- Rail well (inset): `HOME_WELL` = `rounded-xl bg-muted/50 p-4 ring-1 ring-border/50`.
- Sheet card: `rounded-none border border-black/8 bg-white p-4 shadow-xs`; hover `hover:-translate-y-0.5` only when the card is a link.
- Link-cluster card (`RelatedLinks`): `rounded-xl border border-black/8 bg-white p-5 hover:-translate-y-0.5 hover:border-black/12 hover:shadow-md`.

### Badges / pills

- Status: `rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-success` (swap token per meaning).
- "New"/"Free" in nav: `rounded-full bg-[#e9f9ef] px-1.5 py-px text-[10px] font-semibold text-[#12a150]`.
- Category tones on blog cards: map category -> one status token, keep the map stable.

### Score / progress

Any progress or score meter is the segmented tick bar (`TickBar` convention from `CLAUDE.md`): ticks `h-3.5 w-[3px] rounded-[1px]`, filled `bg-primary`, empty `bg-neutral-200`, 2px gap.
Never a solid rounded fill bar, never a circular gauge on marketing pages.

---

## 6. Page templates (the structure of every page)

### 6a. Feature page - Sheet

Reference: `app/prompt-tracking/page.tsx` (best), `app/ai-visibility/page.tsx`.
Applies to: `/ai-visibility`, `/prompt-tracking`, `/explorer`, `/integration`, and any future product/feature/solution page.

```
MarketingShell
  sr-only h2 + SEO paragraph block
  JsonLd (FAQ + breadcrumb minimum)
  <FeatureHero>            hero: bracketed eyebrow, h1 with one dashed-underline word,
                           subcopy, primary + secondary CTA, mock-UI cards (real components, dummy data)
  ScreenHR
  <FeaturesGrid theme=X>   divided cells, each: icon chip + title + desc + mock-card preview
  ScreenHR
  <WhySection>             editorial split: copy column + one anchor stat or mock card
  LandingFaq
  RelatedLinks page="/route"
```

- Theme prop picks the accent (orange/blue/emerald/violet) for decoration + previews; chrome stays neutral.
- JsonLd and `RelatedLinks` are mandatory (missing on `/explorer` today - that is drift).
- Illustrations are always mock product UI assembled from Sheet cards with realistic dummy data, never abstract blobs or stock-style SVG scenes.

### 6b. Content page - stub via MarketingContent

Reference: `app/guides/page.tsx` (all ~37 lines).
Applies to: `/guides`, `/videos`, `/docs`, `/for-agencies`, `/for-brands`, `/changelog`, `/community`, `/help`, `/api` while they are stubs.

```
MarketingShell
  MarketingContent({ eyebrow, title, subtitle, cta?, sections: [{ heading, body }] })
```

- Frame is `max-w-4xl px-6 py-16 md:px-10 md:py-24`; h1 `text-4xl font-semibold md:text-5xl`; sections in a 2-col grid.
- Keep copy specific: one concrete claim or number per section body, no "seamless/unlock/empower".

### 6c. Content page - grown into a listing (guides index, videos/walkthroughs, changelog)

When a stub gets real content, it becomes a Sheet listing page.
Reference: `app/blog/page.tsx` (media cards) and `app/tools/page.tsx` (link cells).

```
MarketingShell
  <Hero>            max-w-7xl, bracketed eyebrow, h1 with dashed accent, one-line sub
  ScreenHR
  <Grid>            max-w-7xl grid divide-x divide-y divide-black/6 md:grid-cols-3
                    cells: bg-white p-6 (tools) or media card (blog pattern)
  ScreenHR
  <Stats band / closing section>
```

- Guides index: blog `PostCard` pattern - 16:9 image or mock-card, tone badge, title `text-[15px] font-semibold`, meta row with reading time.
- Videos / walkthroughs: same grid, thumbnail keeps 16:9, a duration pill (`rounded-full bg-black/70 px-2 py-0.5 text-[10px] text-white` over the corner), play affordance from the in-house icon set.
- Changelog grown: single `max-w-4xl` column, date `text-[12px] font-mono text-muted-foreground`, entry title semibold, hairline `border-b border-black/6` between entries. No cards.
- Docs grown: do not improvise - propose a docs layout separately before building.

### 6d. Utility page

- Sitemap (`app/site-map/page.tsx`): plain `max-w-5xl` link groups, no cards - keep it.
- Contact/sales (`app/contact-sales/page.tsx`): `max-w-3xl` form, Sheet-square fields (`rounded-none border border-border bg-white px-3 py-2.5 text-sm`), pill toggles, primary submit.

### 6e. Home page

Reference: `app/page.tsx`. Rail system throughout; section order is fixed:
Hero -> LogoCloud -> Features -> FeatureShowcase -> HowItWorks -> Stats -> Testimonials -> Integrations -> Pricing -> Faq -> Cta -> Footer.
New home sections must use `HomeSectionHeader` + `HOME_CARD`/`HOME_WELL` and sit inside the rail.

---

## 7. Header + mega menu (the nav system)

Files: `LandingNav.tsx` (bar), `LandingNavMenu.tsx` (triggers + morphing viewport), `MegaPanels.tsx` (panel layouts), `nav-data.ts` (all links + icons).

### Structure

- All menu content lives in `nav-data.ts` as typed `MenuSection` / `QuickLink` data with `@tabler/icons-react` icons. To add a link you edit data, not JSX.
- Panels are wide and compact (~200-240px tall): white section cards (`rounded-xl border border-black/6 bg-white p-2`) with an 11px tracked uppercase label, side by side inside a `p-2` panel, plus at most one card-less `QuickList` column and at most one gradient `FeaturedCard`.
- Item row: 40px icon tile (`rounded-lg border border-black/7 bg-[#FAFAFA] shadow-[0_1px_2px_rgba(0,0,0,0.04)]`, icon 18/1.75) + 14px medium label + 13px muted desc, row hover `bg-black/3`.
- Panel widths are fixed per panel (`w-220`, `w-230`, `w-78`) so descriptions never truncate; if you add items, widen the panel.

### Motion (do not change casually)

- Viewport morphs width/height 300ms, opens with `origin-top` scale 0.95 -> 1 + fade 200ms.
- Panels cross-fade with a 200px directional slide, 200ms.
- Tailwind v4 gotcha: `translate-*` / `scale-*` are standalone CSS properties - transitions must name `translate` / `scale` explicitly (`transition-[translate,opacity]`), or the animation silently snaps.

---

## 8. Motion rules (site-wide)

- Hover: `motion-safe:hover:-translate-y-px` on buttons, `hover:-translate-y-0.5` on link cards. Nothing else moves on hover.
- Ambient: only the existing `--animate-float` (hero logo bubbles) and `--animate-blink` (chat caret). No new ambient loops.
- Entrances: none on marketing pages (the dashboard's `cat-rise` stays in the dashboard).
- Everything respects `prefers-reduced-motion`.

---

## 9. The anti-AI-generated checklist

Forbidden (instant AI tells - never ship):

- Purple/indigo/teal gradients, glassmorphism, glow blobs, mesh backgrounds.
- `rounded-3xl` cards, `shadow-2xl`, colored shadows.
- Centered 3-col icon+title+text feature grids with big pastel icon circles.
- Emoji anywhere in UI, icon libraries other than the two sanctioned ones.
- New hex colors, pure black text, `#fff`-on-`#fff` with heavy shadow separation.
- Buzzword copy: seamless, unlock, empower, supercharge, revolutionize, "We're excited".
- Default-shadcn look: untouched `Card`/`Badge` styling, `p-6 space-y-4` rhythm everywhere.
- Abstract illustration SVGs or stock 3D renders - illustrations are mock product UI.

Required (what makes it look like this site):

- Hairline borders do the separating; shadows only whisper.
- One brand-red accent per screen region; status colors only with meaning.
- Eyebrow + tight tracking + one dashed-underline word in the headline.
- Sheet pages: square cards, divided grids, ScreenHR diamonds. Rail pages: border-x rails, soft ring cards, grid handles.
- Real, specific copy with a number ("Track 50 prompts free", "Score in ~60 seconds").
- Dense type: 13-15px body in cards, `tabular-nums` on every figure.
- Reused skeletons: a new page is a sibling page's skeleton with new content.

---

## 10. Known drift (fix toward this file when touching these)

1. `/explorer`: add `RelatedLinks` + JsonLd; rename `ExplorerPage` export sensibly.
2. `/creators-program` `PrimaryCta` and `/contact-sales` success button: dark fill -> brand `LANDING_PRIMARY_CTA_CLASS`.
3. `MarketingContent`, `LandingNav`: hex literals (`#171717`, `#52525b`, `#e04a3d`) -> `text-foreground` / `text-muted-foreground` / `text-primary`.
4. Secondary-button recipe is copy-pasted in `home-cta`, `integration-hero`, `home-pricing` - extract to `constants.ts` next time one changes.
5. Two FAQ components (`HomeFaq`, `LandingFaq`) - do not create a third; converge on `LandingFaq` for all non-home pages.
6. Eyebrow variant #3 in `MarketingContent` (13px, tracking-wider) -> Rail variant.
7. Delete `features/site/styles/design-system.css` and the pre-redesign `features/landing/components` leftovers when convenient.
