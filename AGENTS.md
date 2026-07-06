# AGENTS.md — AZURID landing page

Monorepo layout: this root holds the design spec and pre-deploy checklist; the
entire Next.js app lives in `site/`. Run all commands from `site/`.

- `design.md` — design system spec (colors, type, shape, motion, IA). The
  brand palette and branch-accent mapping are sampled from the logo and are
  the source of truth; `site/lib/tokens.ts` and `site/app/globals.css` mirror
  it. Update both together.
- `docs/OPEN-ITEMS.md` — pre-deploy blockers (brand name AZURID vs AZURIDE,
  i18n retrofit risk, copy reconciliation, 3D bundle budget, real photography).
  Read before any deploy-adjacent change.
- `site/` — the app. `site/AGENTS.md` carries the create-next-app Next.js
  rules block; preserve it.

## Commands (run from `site/`)

```bash
npm run dev        # next dev (Turbopack)
npm run build      # next build
npm run lint       # eslint (no `--` prefix; flat config in eslint.config.mjs)
npm test           # vitest run
npx tsc --noEmit   # typecheck — there is NO npm script for it
```

Single test / focused run:

```bash
npx vitest run lib/tokens.test.ts
npx vitest run lib/device.test.ts
npx vitest -t "static when reduced motion"   # by test name
```

Tests are vitest, colocated as `*.test.ts` next to the source (only `lib/` has
tests today). No vitest config file — defaults apply.

## Stack quirks (these will bite if assumed)

- **Next.js 16 + React 19 + App Router + Turbopack + React Compiler.** This is
  newer than most training data. `site/AGENTS.md` already says: read
  `node_modules/next/dist/docs/` before writing Next.js code. Heed it.
- **Tailwind v4** via `@tailwindcss/postcss`. There is **no `tailwind.config`**.
  The default palette is disabled (`--color-*: initial` in `globals.css`); only
  the four brand hues + neutrals exist, so off-brand colors can't be typed by
  accident. Add new colors as `@theme` tokens in `app/globals.css`, not via
  config. Branch accents are switched with a `data-branch="...|construction|communication|tech|healthcare"` attribute, not utility classes.
- **Path alias `@/*` → `./*` from `site/`** (e.g. `@/lib/tokens`).
- **`three` is aliased to `site/lib/three-slim.ts`** via `next.config.ts`
  (`turbopack.resolveAlias`). It re-exports a curated subset of
  `three/src/Three.js` to keep the lazy 3D chunk within the bundle budget. If
  you add a new three class or JSX intrinsic (`<sphereGeometry>`, `<pointLight>`,
  …) to `components/three/**`, **add its export to `three-slim.ts` or it will
  be `undefined` at runtime.** Do not import `three` directly elsewhere.
- **ESLint:** `react-hooks/immutability` is intentionally disabled **only** in
  `components/three/**` — R3F `useFrame` callbacks mutate memoized
  materials/uniforms every frame on purpose. Keep the rule on everywhere else.
- **Fonts:** Space Grotesk (display) + Inter (body) via `next/font/google` in
  `app/layout.tsx`, exposed as `--font-space-grotesk` / `--font-inter`.

## Hero — Convergence Reveal (the one orchestrated moment)

`components/three/ConvergenceHero.tsx` picks one of three render tiers via
`lib/device.ts` (`detectRenderTier`):

- `full3d` — R3F canvas, scroll-scrubbed (desktop, WebGL, ≥4 cores, no
  reduced-motion). Canvas is `dynamic(..., { ssr: false })` behind a poster.
- `css` — DOM/Motion petal fallback (`components/fallback/PetalGridCss.tsx`),
  used on `<768px` viewport, no WebGL, or `<4` cores.
- `static` — poster + plain 2×2 grid (`components/fallback/StaticPetalGrid.tsx`),
  used for SSR first paint and `prefers-reduced-motion`.

SSR always returns `static`; the tier is re-read once on the client via
`useSyncExternalStore`. Mobile/css/static tiers never fetch the 3D chunk. If
you change the tier logic, update `lib/device.test.ts` accordingly.

Shared scroll/hover state between the GSAP `ScrollDriver` (DOM) and the R3F
scene lives in `components/three/scrollStore.ts` (zustand) — do not prop-drill
through the `Canvas`.

## Copy is centralized — one-touch replacement

All user-facing copy is meant to be replaced before deploy (see
`docs/OPEN-ITEMS.md` §3). It is centralized, so edit in one place:

- `lib/site.ts` — site name, motto, contact email.
- `lib/branches.ts` — branch titles + teasers (feeds hero petals, cards,
  hover teasers, nav).
- `lib/techSubpages.ts` — Tech & Innovation sub-page titles, intros, services.
- Branch page intros/services live inline in each `app/<branch>/page.tsx`.

Brand name flip (AZURID ↔ AZURIDE) is a one-line change to `SITE_NAME` in
`lib/site.ts` and propagates to nav, `<title>`, footer, alt text.

## Design tokens — don't invent colors

Four brand hues only (sampled from the logo): emerald `#14B88B`, cerulean
`#008FC3`, harbor `#0075A1`, navy `#004869`. Branch accent mapping is fixed
(`lib/tokens.ts` `BRANCH_ACCENT`): construction→navy, communication→harbor,
tech→cerulean, healthcare→emerald. Contrast rule (design.md §2.5): white text
on navy/harbor; **ink** text on cerulean/emerald (white fails AA there). The
`data-branch` CSS already sets `--accent-contrast` correctly — use it.

Motion timing lives in `lib/tokens.ts` (`EASE_OUT`, `DURATION`) and
`lib/motion.ts`; CSS equivalents in `globals.css`. Respect
`prefers-reduced-motion` everywhere — the hero already does.