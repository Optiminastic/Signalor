## What does this PR do?

<!-- One or two sentences. Keep the PR to a single concern. -->

## Type of change

- [ ] Bug fix
- [ ] New feature
- [ ] Refactor (no behaviour change)
- [ ] Chore / dependency update

## Checklist

- [ ] `pnpm lint` passes with **no errors** (`--max-warnings 0`)
- [ ] `pnpm type-check` passes
- [ ] `pnpm build` succeeds
- [ ] `pnpm test` passes (if tests exist for this area)
- [ ] Scope is a **single concern**; no unrelated changes
- [ ] No file exceeds 500 lines; no new `any`; no `console.log`
- [ ] New env vars added to `lib/env.ts` and `.env`
- [ ] No new dependency added without asking first

## UI / dashboard changes (fill in if any pixels moved)

Ground the change in what already exists — most bad UI PRs come from reinventing
a primitive that was already there.

- [ ] I read `DESIGN.md` (Part B for `/dashboard`) and `features/catalyst/COMPONENTS.md`
- [ ] I **reused** existing primitives (`Card`/`CardHead`, `GaugeRing`/`Sparkline`,
      `TickBar`, `PrimaryButton`, `control-styles`, `EngineLogo`, `hooks/use*`) — I did
      not hand-roll a card, button, meter, chart, or dropdown that already exists
- [ ] Colors/surfaces use `--cat-*` tokens or `constants.ts` — **no** raw hex /
      `bg-white` / `text-gray-*`, no inline styles except dynamic SVG colors/sizes
- [ ] Any progress/score/% uses `TickBar`; any brand CTA uses `PrimaryButton`
- [ ] Every button / select / dropdown is **wired and working** (not decorative)
- [ ] Data comes from a typed `hooks/use*` (TanStack Query) — no `fetch()` in a component
- [ ] Handles empty / loading / error states
- [ ] Responsive (mobile → `sm` → `xl`) and looks correct in **light and dark**

## Screenshots (required for any UI change)

<!--
Before / after. Include BOTH light and dark. Lint and type-check cannot see
"it looks wrong" — the screenshot is the only proof the pixels are right.
-->
