# Final QA Results — build spec §8 checklist

Date: 2026-07-06. Branch: `build/landing-page`. All evidence gathered against the
production build (`next build`, all 9 routes prerendered static) served via
`next start` on 127.0.0.1:3100.

## §8 checklist

### 1. Lighthouse mobile ≥ 85 on every route — PASS

Lighthouse (mobile emulation, production server) scored **93–94 performance on
all nine routes**, including the hero page:

`/`, `/construction-inspection`, `/corporate-communication`, `/healthcare`,
`/tech-innovation`, `/tech-innovation/web-development`,
`/tech-innovation/ai-engineering`, `/tech-innovation/erp-systems`,
`/tech-innovation/crm-systems`.

The hero route stays fast because the 3D chunk is dynamically imported with
`ssr: false` behind a static poster; mobile viewports never request it at all
(see item 2).

### 2. 3D bundle under the §4.3 budget (180 KB gz) — FAIL (documented, accepted)

Measured lazy 3D chunk: **~234 KB gzipped**. This is the floor imposed by the
spec's own stack choice: `three` alone is ~165 KB gz and
`@react-three/fiber` + `react-reconciler` add ~70 KB gz. The 180 KB budget and
the R3F mandate in §2 are mutually unsatisfiable; the spec contradiction is
recorded in `docs/OPEN-ITEMS.md`.

Mitigations shipped:

- Removed `@react-three/postprocessing` (SelectiveBloom) and `@react-three/drei`
  entirely; the emerald glow is now an emissive term in the core shader.
  This took the chunk from 333 KB gz down to the 234 KB floor.
- The chunk is lazy-loaded (`next/dynamic`, `ssr: false`) behind the poster —
  it never blocks first paint and is absent from the route's initial JS.
- The `css` and `static` tiers (mobile < 768 px, no WebGL, low cores, reduced
  motion) **never fetch the chunk**, so the devices the budget protects never
  pay it.
- Runtime FPS probe over the first second drops full3d → css if < 30 fps.

### 3. `prefers-reduced-motion` produces the static fallback — PASS

Verified in headless Chromium with `prefers-reduced-motion: reduce` emulated:
the hero renders the static poster only, **no `<canvas>` in the DOM**, and the
branch grid below is the plain 2×2 `StaticPetalGrid`. `MotionConfig
reducedMotion="user"` disables Motion transforms site-wide; the GSAP
ScrollTrigger pin is guarded by the same media query.

### 4. Low-end / WebGL-disabled fallback — PASS

`detectRenderTier()` (lib/device.ts, unit-tested) selects `css` when WebGL
context creation fails, viewport < 768 px, or `hardwareConcurrency` is low.
Verified with a 390×844 viewport: no canvas mounted; the SVG/Motion
`PetalGridCss` renders the same mark and unfold driven by `useScroll`, with
petals as tappable links.

### 5. Branch accent inheritance, no hardcoded hex — PASS

Computed-style checks on all four branch pages confirm `--accent` resolves to
navy / harbor / cerulean / emerald respectively via `data-branch` on `<body>`
(set by `BranchBody`) with the correct contrast pairing
(`--accent-contrast`). Grep evidence: `#`-hex literals exist only in
`lib/tokens.ts` and its test (`lib/tokens.test.ts` asserts the token values);
components reference `TOKENS.*`, `BRANCH_ACCENT`, or CSS variables. The last
two literals (`#F5F8FA` in PetalMesh and PetalGridCss) were replaced with
`TOKENS.surfaceAlt` in the taste pass.

### 6. Fonts via `next/font`, no FOUT/CLS — PASS

Space Grotesk (display) and Inter (body) load through `next/font/google` with
CSS variables mapped to `--font-display` / `--font-body` in `@theme`.
`next/font` self-hosts and applies `size-adjust` fallback metrics; Lighthouse
reported CLS 0 on all routes.

### 7. All copy from `azurid-company-profile.md` — BLOCKED (file absent)

The profile document was not present in the repo at build time. All copy was
drafted from design.md (motto, taglines, branch and service lists) and
centralized for one-touch replacement: `lib/site.ts`, `lib/branches.ts`,
`lib/techSubpages.ts`, and the plan's Copy Blocks. No Lorem Ipsum anywhere
(grep clean). Reconciliation is open item 3 in `docs/OPEN-ITEMS.md`.

### 8. Nav sharp-accent indicator animates between routes — PASS

`motion.span` with `layoutId="nav-indicator"` (NavBar.tsx); the rotated
accent square glides between active links on client navigation. Verified
manually in the browser during the accessibility pass.

### 9. Contrast per design.md §2.5 on every pairing used — PASS

Pairings actually shipped: white on Navy (9.85:1), white on Harbor (5.17:1),
Ink on Cerulean (4.63:1), Ink on Emerald (6.70:1), Ink/Slate on white and
SurfaceAlt. White-on-Emerald is never used. Two AA failures found and fixed in
the accessibility pass: small cerulean (3.9:1) and emerald (2.9:1) link text on
white — Explore links and teaser titles now use `text-ink` with the accent
confined to icons and diamond glyphs.

### 10. Taste/anti-slop pass (§1B) on every page — PASS (with design.md overrides)

Design read: corporate technology-ecosystem site for B2B buyers, restrained
precision-optical language, exactly one orchestrated 3D moment. Dials:
variance 5, motion 6, density 3.

Fixed during the pass: page titles switched to `| AZURID` separators; em/en
dashes removed from all user-visible copy (titles, alt text, hero positioning
line, branch and sub-page intros — dashes remain only in code comments); hero
min-height uses `100dvh`; last hex literals tokenized.

Where the taste skill and design.md conflict, design.md wins per the build
spec: Inter as body font, Lucide icons, the centered hero, and eyebrow kickers
are all prescribed by design.md §3 and kept.

## Verification greps (final)

- No em/en dash in user-visible strings — clean (comments only).
- No `#`-hex outside `lib/tokens.ts` + its test — clean.
- No `three` / `@react-three` import outside `components/three/` — clean.
- Unit tests: 7/7 passing (`vitest run`).
- `next build`: compiles, type-checks, 12/12 static pages generated.
