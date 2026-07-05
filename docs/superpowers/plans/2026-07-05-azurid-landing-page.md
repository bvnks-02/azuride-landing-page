# AZURID Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the AZURID multi-page marketing site (Next.js 16) with a scroll-scrubbed 3D "Convergence Reveal" hero, four accent-themed branch pages, and a Tech & Innovation sub-hub — per `design.md` and the build spec.

**Architecture:** Next.js 16 App Router site with all content in accessible DOM. One isolated R3F 3D scene (dynamic-imported, ssr:false) lives in the home hero, driven by a GSAP ScrollTrigger pin/scrub feeding a Zustand progress store. Motion handles all UI-level animation via a shared `<Reveal>` wrapper. Brand tokens live in CSS variables (single source), consumed by Tailwind v4 `@theme`, Motion, and shader uniforms via `/lib/tokens.ts`. Per-page accent via `data-branch` attribute + `--accent` variable.

**Tech Stack:** Next.js 16 (Turbopack, `reactCompiler: true`), React 19.2, TypeScript strict, Tailwind CSS v4, Motion (`motion/react`), GSAP + ScrollTrigger, React Three Fiber v9 + drei v10 + @react-three/postprocessing, Zustand, next/font (Space Grotesk + Inter), Lucide React, Vitest (logic-only tests).

## Global Constraints

- Brand hexes ONLY: Emerald `#14B88B`, Cerulean `#008FC3`, Harbor Blue `#0075A1`, Ink Navy `#004869`; neutrals Ink `#0A1E2B`, Slate `#5B6B75`, Hairline `#E2E8EC`, Surface Alt `#F5F8FA`, White `#FFFFFF`. No other saturated hues anywhere, including hover states.
- No hardcoded hex in components — everything through CSS variables / Tailwind theme tokens.
- Contrast rules (design.md §2.5): white text only on Ink Navy / Harbor Blue; Ink text on Cerulean / Emerald. White-on-emerald is forbidden.
- Fonts: Space Grotesk (500/700 display) + Inter (400/500/600 body) via `next/font` only. No other font families may render.
- 3D bundle (three + R3F + drei subset + postprocessing) gzipped ≤ 180KB; drei imported per-helper, never barrel. No `three` import outside `/components/three`.
- One 3D scene per session — hero only. Everything else is DOM/Motion.
- `prefers-reduced-motion` respected in 3D, GSAP, and Motion layers. Reduced-motion path = static poster + 2×2 branch grid.
- Fallbacks (§4.4) are mandatory: both paths land on identical four branch cards, same copy, same links.
- Motion timing: hover 200–300ms; reveals 500–600ms; ease `cubic-bezier(0.16, 1, 0.3, 1)`.
- Site name: **AZURID** (per design.md §1 default). "AZURIDE PROD" is only the production division's lockup. Open item #1 may flip this — keep name in one constant.
- Copy source caveat: `azurid-company-profile.md` is NOT present in this repo. All copy in this plan is drafted from design.md's derived content (motto, taglines, branch/service lists) in design.md §5 voice. **Reconcile against the profile doc before final deploy** — tracked in Task 14.
- Lighthouse mobile ≥ 85 every route.

## Copy Blocks (single source for all tasks — draft, pending profile reconciliation)

- **Motto / H1:** "Capturing Reality. Building Digital Intelligence."
- **Hero positioning line:** "AZURID is one technology ecosystem with four branches — reality capture, visual production, software engineering, and healthcare innovation — built around a single core."
- **Vision strip:** "Every project tells a story. Every building contains data."
- **Branch cards** (title / one-line teaser / route / accent):
  1. Construction & Inspection — "Drone LiDAR, photogrammetry, and digital twins that let you inspect infrastructure from anywhere." — `/construction-inspection` — Ink Navy
  2. Corporate Communication & Visual Production — "Film, broadcast, and event coverage that tells your story with precision." — `/corporate-communication` — Harbor Blue
  3. Tech & Innovation — "Web platforms, AI engineering, ERP and CRM systems built to run your business." — `/tech-innovation` — Cerulean
  4. Healthcare — "Surgical broadcast and digital transformation for modern medicine." — `/healthcare` — Emerald
- **Twin Up callout:** eyebrow "FLAGSHIP PLATFORM" / heading "Twin Up" / body "Our digital-twin platform, under active certification. Capture a site once. Inspect it forever." / CTA "See how it works →" (links `/construction-inspection`).
- **Industries strip:** Construction & Engineering · Energy · Healthcare · Government & Public Sector · Media & Events · Education.
- **Closing CTA:** heading "Let's build what's next." / body "Tell us what you need captured, built, or transformed." / button "Talk to us" (mailto link for now).
- **Tech sub-pages** (title / teaser):
  - Web Development — "Landing pages, corporate websites, and e-commerce platforms."
  - AI Engineering — "Chatbots, virtual assistants, and AI-powered dashboards."
  - ERP Systems — "Enterprise resource planning platforms."
  - CRM Systems — "Customer relationship management platforms."

---

### Task 1: Scaffold, fonts, config

**Files:**
- Create: entire Next.js app in `/home/bvnks/azuride/landing-page/site/` (scaffold in subdir to keep design docs at repo root), then `next.config.ts`, `app/layout.tsx`
- Create: `.gitignore`, git repo at `/home/bvnks/azuride/landing-page`

**Interfaces:**
- Produces: running app shell; `displayFont`/`bodyFont` CSS variables `--font-display`, `--font-body`; `SITE_NAME` constant in `lib/site.ts`.

- [ ] **Step 1: Init git repo at repo root** (design docs + site together)

```bash
cd /home/bvnks/azuride/landing-page && git init -b main && git add design.md docs && git commit -m "docs: design system and implementation plan"
```

- [ ] **Step 2: Scaffold Next.js 16**

```bash
cd /home/bvnks/azuride/landing-page && npx create-next-app@latest site --ts --tailwind --app --no-src-dir --import-alias "@/*" --turbopack --yes
```

- [ ] **Step 3: Enable React Compiler + view transitions in `site/next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: { viewTransition: true },
};

export default nextConfig;
```

(If `next build` rejects either key on the installed minor version, check the key's current name in Next 16 docs — `reactCompiler` moved out of `experimental` in 16; `viewTransition` may still be experimental. Adjust placement, not intent.)

- [ ] **Step 4: Fonts in `site/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
});
const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "AZURID — Capturing Reality. Building Digital Intelligence.",
  description:
    "One technology ecosystem, four branches: reality capture, visual production, software engineering, and healthcare innovation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="bg-white font-body text-ink antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 5: Create `site/lib/site.ts`**

```ts
export const SITE_NAME = "AZURID"; // Open item: confirm vs "AZURIDE" before deploy
```

- [ ] **Step 6: Verify dev build**

Run: `cd site && npm run build`
Expected: build succeeds; routes list shows `/`.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: scaffold Next.js 16 app with fonts and config"
```

---

### Task 2: Design tokens (CSS vars + Tailwind v4 theme + JS export)

**Files:**
- Modify: `site/app/globals.css` (replace scaffold content)
- Create: `site/lib/tokens.ts`
- Test: `site/lib/tokens.test.ts` (vitest)

**Interfaces:**
- Produces: Tailwind classes `bg-emerald`, `bg-cerulean`, `bg-harbor`, `bg-navy`, `text-ink`, `text-slate`, `border-hairline`, `bg-surface-alt`, `rounded-card|input|pill`, `font-display|body`, `bg-accent`/`text-accent` (per-branch); JS `TOKENS` object `{ emerald, cerulean, harbor, navy, ink, slate }` for shader uniforms; `data-branch` accent mechanism.

- [ ] **Step 1: Write `site/app/globals.css`** — tokens exactly per spec §3, mapped via Tailwind v4 `@theme` so CSS vars and utility classes share one source:

```css
@import "tailwindcss";

:root {
  --color-emerald: #14b88b;
  --color-cerulean: #008fc3;
  --color-harbor: #0075a1;
  --color-navy: #004869;
  --color-ink: #0a1e2b;
  --color-slate: #5b6b75;
  --color-hairline: #e2e8ec;
  --color-surface-alt: #f5f8fa;
  --gradient-capture: linear-gradient(135deg, var(--color-cerulean), var(--color-navy));
  --gradient-intelligence: radial-gradient(circle, var(--color-emerald), var(--color-navy));
  --ease-out-brand: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-hover: 250ms;
  --duration-reveal: 600ms;
  --accent: var(--color-navy); /* default; overridden per branch */
  --accent-contrast: #ffffff;  /* text color that sits on --accent */
}

/* Branch accent inheritance — set data-branch on <body> per route */
[data-branch="construction"] { --accent: var(--color-navy); --accent-contrast: #ffffff; }
[data-branch="communication"] { --accent: var(--color-harbor); --accent-contrast: #ffffff; }
[data-branch="tech"] { --accent: var(--color-cerulean); --accent-contrast: var(--color-ink); }
[data-branch="healthcare"] { --accent: var(--color-emerald); --accent-contrast: var(--color-ink); }

@theme inline {
  --color-emerald: var(--color-emerald);
  --color-cerulean: var(--color-cerulean);
  --color-harbor: var(--color-harbor);
  --color-navy: var(--color-navy);
  --color-ink: var(--color-ink);
  --color-slate: var(--color-slate);
  --color-hairline: var(--color-hairline);
  --color-surface-alt: var(--color-surface-alt);
  --color-accent: var(--accent);
  --color-accent-contrast: var(--accent-contrast);
  --font-display: var(--font-display);
  --font-body: var(--font-body);
  --radius-card: 16px;
  --radius-input: 12px;
  --radius-pill: 999px;
}
```

(Tailwind v4 note: if `@theme inline` self-reference loops, define the raw hexes inside `@theme` and alias `:root` vars to them instead — same single-source outcome. Verify generated utilities with a scratch page.)

- [ ] **Step 2: Write `site/lib/tokens.ts`**

```ts
export const TOKENS = {
  emerald: "#14B88B",
  cerulean: "#008FC3",
  harbor: "#0075A1",
  navy: "#004869",
  ink: "#0A1E2B",
  slate: "#5B6B75",
} as const;

export type Branch = "construction" | "communication" | "tech" | "healthcare";

export const BRANCH_ACCENT: Record<Branch, string> = {
  construction: TOKENS.navy,
  communication: TOKENS.harbor,
  tech: TOKENS.cerulean,
  healthcare: TOKENS.emerald,
};

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const DURATION = { hover: 0.25, reveal: 0.6 } as const;
```

- [ ] **Step 3: Install vitest + write `site/lib/tokens.test.ts`** asserting the four brand hexes match design.md exactly and `BRANCH_ACCENT` mapping matches §2.3:

```ts
import { describe, expect, it } from "vitest";
import { BRANCH_ACCENT, TOKENS } from "./tokens";

describe("brand tokens", () => {
  it("matches sampled logo hexes exactly", () => {
    expect(TOKENS.emerald).toBe("#14B88B");
    expect(TOKENS.cerulean).toBe("#008FC3");
    expect(TOKENS.harbor).toBe("#0075A1");
    expect(TOKENS.navy).toBe("#004869");
  });
  it("maps branch accents per design.md §2.3", () => {
    expect(BRANCH_ACCENT.construction).toBe(TOKENS.navy);
    expect(BRANCH_ACCENT.communication).toBe(TOKENS.harbor);
    expect(BRANCH_ACCENT.tech).toBe(TOKENS.cerulean);
    expect(BRANCH_ACCENT.healthcare).toBe(TOKENS.emerald);
  });
});
```

Run: `npx vitest run` — Expected: PASS.

- [ ] **Step 4: Type scale utilities** — add to `globals.css` (fluid between mobile/desktop values from design.md §3):

```css
@layer utilities {
  .text-h1 { font-family: var(--font-display); font-weight: 700; font-size: clamp(36px, 5vw, 64px); line-height: 1.05; }
  .text-h2 { font-family: var(--font-display); font-weight: 700; font-size: clamp(28px, 3.2vw, 40px); line-height: 1.1; }
  .text-h3 { font-family: var(--font-display); font-weight: 500; font-size: clamp(20px, 1.8vw, 24px); line-height: 1.2; }
  .text-body-lg { font-size: clamp(16px, 1.3vw, 18px); line-height: 1.6; }
  .text-eyebrow { font-size: 13px; line-height: 1; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; }
}
```

- [ ] **Step 5: Verify + commit**

Run: `npm run build && npx vitest run` — Expected: both pass.

```bash
git add -A && git commit -m "feat: design tokens — CSS vars, Tailwind theme, JS export"
```

---

### Task 3: Core UI — Button, Reveal, sharp accent, NavBar, Footer

**Files:**
- Create: `site/components/ui/Button.tsx`, `site/components/ui/Reveal.tsx`, `site/components/ui/SharpAccent.tsx`, `site/components/ui/NavBar.tsx`, `site/components/ui/Footer.tsx`, `site/lib/motion.ts`
- Modify: `site/app/layout.tsx` (mount NavBar/Footer)

**Interfaces:**
- Consumes: tokens (Task 2), `SITE_NAME` (Task 1).
- Produces: `<Reveal delay?>{children}</Reveal>`; `<Button href variant="primary"|"accent">`; `<SharpAccent className?>` (the 45°-rotated square, 8–12px); `NAV_LINKS` export from `NavBar.tsx`: `{ label, href, branch }[]`.

- [ ] **Step 1: Install motion + lucide**

```bash
npm i motion lucide-react
```

- [ ] **Step 2: `site/lib/motion.ts`** — shared reduced-motion-aware constants:

```ts
import { EASE_OUT, DURATION } from "@/lib/tokens";
export const revealTransition = { duration: DURATION.reveal, ease: EASE_OUT };
export const revealViewport = { once: true, margin: "-100px" } as const;
export const revealVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};
```

- [ ] **Step 3: `site/components/ui/Reveal.tsx`** ("use client"; wraps `motion.div` with `initial="hidden" whileInView="visible"`, `viewport={revealViewport}`, `variants={revealVariants}`, `transition={{...revealTransition, delay}}`. Motion respects `prefers-reduced-motion` when wrapped in `<MotionConfig reducedMotion="user">` — mount that in layout, Step 6.)

```tsx
"use client";
import { motion } from "motion/react";
import { revealTransition, revealViewport, revealVariants } from "@/lib/motion";

export function Reveal({ children, delay = 0, className }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div className={className} initial="hidden" whileInView="visible"
      viewport={revealViewport} variants={revealVariants}
      transition={{ ...revealTransition, delay }}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: `SharpAccent.tsx`** — `<span aria-hidden className="inline-block size-2.5 rotate-45 bg-accent" />` used as list bullet + nav indicator base.

- [ ] **Step 5: `Button.tsx`** — pill radius, Motion `whileHover={{ scale: 1.02 }}`, 250ms. `primary` = Harbor fill + white text (nav CTA per design.md §7); `accent` = `bg-accent text-accent-contrast`. Renders `next/link` when `href` given.

- [ ] **Step 6: `NavBar.tsx`** — "use client". Logo (use `logo.png` copied to `site/public/logo.png`, `next/image`, height 40) + `NAV_LINKS`:

```ts
export const NAV_LINKS = [
  { label: "Construction & Inspection", href: "/construction-inspection", branch: "construction" },
  { label: "Communication", href: "/corporate-communication", branch: "communication" },
  { label: "Tech & Innovation", href: "/tech-innovation", branch: "tech" },
  { label: "Healthcare", href: "/healthcare", branch: "healthcare" },
] as const;
```

Active indicator: `SharpAccent` rendered under the active link via Motion `layoutId="nav-indicator"` (slides between items on route change; use `usePathname()`). CTA `<Button variant="primary" href="mailto:contact@azurid.com">Talk to us</Button>`. Mobile: simple disclosure menu (button + vertical list), no third-party lib.

Also wrap the app in `<MotionConfig reducedMotion="user">` inside a small `site/components/ui/Providers.tsx` client component, mounted in `layout.tsx`.

- [ ] **Step 7: `Footer.tsx`** — Ink Navy bg, white text, four branch links (reuse `NAV_LINKS`), contact mailto, © line with `SITE_NAME`.

- [ ] **Step 8: Verify + commit**

Run: `npm run build`; then `npm run dev` and check `/` renders nav/footer, indicator sits under nothing on home, fonts are Space Grotesk/Inter (inspect computed styles — no system fallback).

```bash
git add -A && git commit -m "feat: core UI — nav with layoutId indicator, footer, button, reveal"
```

---

### Task 4: Device capability heuristics

**Files:**
- Create: `site/lib/device.ts`
- Test: `site/lib/device.test.ts`

**Interfaces:**
- Produces: `getRenderTier(input): "full3d" | "css" | "static"` — pure function taking `{ reducedMotion, viewportWidth, webglOk, hardwareConcurrency }`; plus browser wrapper `detectRenderTier(): RenderTier` that gathers inputs (`matchMedia("(prefers-reduced-motion: reduce)")`, `window.innerWidth`, canvas WebGL probe, `navigator.hardwareConcurrency`).

- [ ] **Step 1: Failing test first** (`device.test.ts`):

```ts
import { describe, expect, it } from "vitest";
import { getRenderTier } from "./device";

describe("getRenderTier", () => {
  const base = { reducedMotion: false, viewportWidth: 1440, webglOk: true, hardwareConcurrency: 8 };
  it("full 3d on capable desktop", () => expect(getRenderTier(base)).toBe("full3d"));
  it("static when reduced motion", () => expect(getRenderTier({ ...base, reducedMotion: true })).toBe("static"));
  it("css fallback under 768px", () => expect(getRenderTier({ ...base, viewportWidth: 767 })).toBe("css"));
  it("css fallback when webgl fails", () => expect(getRenderTier({ ...base, webglOk: false })).toBe("css"));
  it("css fallback on low core count", () => expect(getRenderTier({ ...base, hardwareConcurrency: 2 })).toBe("css"));
});
```

Run: `npx vitest run` — Expected: FAIL (module not found).

- [ ] **Step 2: Implement `device.ts`** (reduced-motion wins over everything → `"static"`; then width < 768 OR !webglOk OR cores < 4 → `"css"`; else `"full3d"`). Include `detectRenderTier()` guarded for SSR (`typeof window === "undefined"` → `"static"`).

- [ ] **Step 3: Run tests** — Expected: PASS. Commit: `feat: render-tier capability heuristics`.

---

### Task 5: BranchCard + StaticPetalGrid (the content-first fallback path)

**Files:**
- Create: `site/components/ui/BranchCard.tsx`, `site/components/fallback/StaticPetalGrid.tsx`, `site/lib/branches.ts`

**Interfaces:**
- Consumes: copy blocks (header of this plan), `Branch` type, `Reveal`.
- Produces: `BRANCHES: { branch: Branch; title: string; teaser: string; href: string }[]` in `lib/branches.ts` (the single copy source for hero, fallback, footer teasers, petal userData); `<BranchCard {...branch} index={n}>`; `<StaticPetalGrid animated?: boolean>` — 2×2 grid of the four BranchCards (animated=false for reduced-motion, true for the CSS-fallback tier with Motion `useScroll`/color-lerp behavior).

- [ ] **Step 1: `lib/branches.ts`** with the four branch objects verbatim from the Copy Blocks section.
- [ ] **Step 2: `BranchCard.tsx`** — card radius 16px, thin-stroke Lucide icon per branch (`HardHat`→construction is too literal/filled — use `ScanLine` construction, `Clapperboard` communication, `Cpu` tech, `HeartPulse` healthcare, stroke 1.5), title (text-h3), teaser, "Explore →" link. Accent applied via `data-branch` on the card element so `--accent` scopes locally. Hover: lift + soft shadow, 250ms, no tilt. Cards must NOT be forced equal-height; grid uses `items-start`.
- [ ] **Step 3: `StaticPetalGrid.tsx`** — 2×2 grid (1-col below 640px). When `animated`, wrap cards in `Reveal` with 80ms stagger (`delay={i * 0.08}`).
- [ ] **Step 4: Verify with a temporary render on `/`; `npm run build`. Commit:** `feat: branch data, cards, and static petal grid fallback`.

---

### Task 6: Home page — full DOM version (works before any 3D exists)

**Files:**
- Create: `site/app/(marketing)/page.tsx`, `site/components/home/HeroSection.tsx`, `site/components/home/TwinUpSection.tsx`, `site/components/home/IndustriesSection.tsx`, `site/components/home/ClosingCta.tsx`
- Move: `layout.tsx` nav/footer already global; add `(marketing)` group only if route groups needed — otherwise keep pages at `app/` root level per spec §6 structure.

**Interfaces:**
- Consumes: `BRANCHES`, `Reveal`, `Button`, copy blocks.
- Produces: `HeroSection` accepts `heroSlot?: React.ReactNode` — Task 9 injects the 3D canvas there; DOM branch grid always renders after the hero (this is the §4.2 handoff target, id=`branch-grid`).

- [ ] **Step 1: `HeroSection`** — full-viewport section, Capture Gradient background band is NOT used here (hero sits on white per logo usage §1 "Do"); H1 motto, positioning line, poster image placeholder (`site/public/poster-mark.png` — generate in Task 8 Step 6), `heroSlot` renders over/instead of the poster.
- [ ] **Step 2: Sections in order per design.md §7**: Hero → vision strip (eyebrow style, the "Every project tells a story..." line) → `StaticPetalGrid animated` (`id="branch-grid"`) → `TwinUpSection` (Capture Gradient bg, white text — navy end guarantees contrast; keep text over the navy side) → `IndustriesSection` (Surface Alt bg, tag cloud of pill tags) → `ClosingCta` (Intelligence Gradient bg; per contrast rules set body/H text in white ONLY over the navy outer region — practical rule: center the copy block, gradient circle center emerald behind a card with Ink text, or simplest compliant layout: navy panel with emerald radial glow at low opacity behind white text. Choose the navy-dominant version; never white-on-emerald).
- [ ] **Step 3: Each section wrapped in `Reveal`. Eyebrow labels use `.text-eyebrow` + `SharpAccent` bullet.**
- [ ] **Step 4: Verify:** `npm run build`; keyboard-tab through the page — all links reachable; Lighthouse quick pass (`npx lighthouse http://localhost:3000 --preset=perf --quiet` optional here, formal in Task 14). Commit: `feat: home page DOM sections`.

---

### Task 7: Branch pages ×4 + accent inheritance

**Files:**
- Create: `site/app/construction-inspection/page.tsx`, `site/app/corporate-communication/page.tsx`, `site/app/healthcare/page.tsx`, `site/app/tech-innovation/page.tsx`
- Create: `site/components/ui/BranchPageShell.tsx`, `site/components/ui/BranchBody.tsx` (client component that sets `document.body.dataset.branch` via effect and clears on unmount)

**Interfaces:**
- Consumes: `Branch`, copy blocks, `Reveal`, `Button`, `SharpAccent`.
- Produces: `<BranchPageShell branch title intro services={string[]} children?>` — eyebrow (branch label uppercase), H1, intro paragraph, services list with SharpAccent bullets, accent-filled CTA. All accent styling via `bg-accent`/`text-accent`/`text-accent-contrast` classes only.

- [ ] **Step 1: `BranchBody.tsx`** — `"use client"`; `useEffect(() => { document.body.dataset.branch = branch; return () => { delete document.body.dataset.branch; }; }, [branch])`; renders null.
- [ ] **Step 2: `BranchPageShell`** — neutral white/Surface-Alt layout, accent only on headings' eyebrow, links, button fills, SharpAccent bullets (design.md §7 "single highlight color").
- [ ] **Step 3: Four pages.** Services lists (draft, from design.md-derived services; flag for profile reconciliation):
  - Construction & Inspection: Drone LiDAR capture · Photogrammetry & point-cloud processing · Digital twin modeling · Remote infrastructure inspection · Progress documentation.
  - Corporate Communication: Corporate film & brand video · Event coverage · Live broadcast · Photography · Content strategy.
  - Healthcare: Surgical broadcast & OR integration · Medical training content · Digital transformation for clinics · Health-data dashboards.
  - Tech & Innovation page: hub layout — intro + the four sub-cards (Task 8's `SubGrid`), NOT a services list.
- [ ] **Step 4: Verify:** navigate all four; nav indicator slides correctly (layoutId); each page's accent computed style matches its hex; white-on-emerald nowhere (healthcare CTA must be `bg-accent text-accent-contrast` → Ink on Emerald). `npm run build`. Commit: `feat: four branch pages with data-branch accent inheritance`.

---

### Task 8: Tech & Innovation sub-hub grid + 4 sub-pages

**Files:**
- Create: `site/components/tech/SubGrid.tsx`, `site/app/tech-innovation/web-development/page.tsx`, `.../ai-engineering/page.tsx`, `.../erp-systems/page.tsx`, `.../crm-systems/page.tsx`
- Create: `site/lib/techSubpages.ts` (titles/teasers/services from Copy Blocks)

**Interfaces:**
- Consumes: `Reveal`, cerulean accent (pages set `data-branch="tech"`), copy blocks.
- Produces: `<SubGrid>` — pure DOM/Motion 2×2 card grid with central hub icon (Lucide `Aperture` or the logo mark small) that pulses subtly once on load (`animate={{ scale: [1, 1.06, 1] }}`, 1.2s, respects MotionConfig), cards fan in `whileInView` with 80ms stagger. No Three.js (spec §4.3: one 3D scene per session).

- [ ] **Step 1: `techSubpages.ts`** with the four sub-page objects + per-page service bullets:
  - Web Development: Landing pages · Corporate websites · E-commerce platforms.
  - AI Engineering: Chatbots · Virtual assistants · AI-powered dashboards.
  - ERP Systems: Process mapping · Custom ERP builds · Integration & migration.
  - CRM Systems: Sales pipelines · Customer data platforms · Automation & reporting.
- [ ] **Step 2: `SubGrid`** per the interface above; mount on `/tech-innovation`.
- [ ] **Step 3: Sub-pages** reuse `BranchPageShell` with `branch="tech"`.
- [ ] **Step 4: Verify + commit:** `feat: tech sub-hub grid and four sub-pages`.

---

### Task 9: 3D Convergence Reveal — scene

**Files:**
- Create: `site/components/three/scrollStore.ts`, `site/components/three/RingMaterial.ts`, `site/components/three/PetalMesh.tsx`, `site/components/three/ConvergenceScene.tsx`, `site/components/three/ConvergenceHero.tsx` (the dynamic-import wrapper + tier switch)
- Modify: `site/components/home/HeroSection.tsx` (pass `<ConvergenceHero />` as heroSlot)

**Interfaces:**
- Consumes: `TOKENS`, `BRANCHES`, `getRenderTier`/`detectRenderTier`, poster image.
- Produces: `useScrollStore` zustand store `{ progress: number; setProgress(p: number): void; hovered: Branch | null; setHovered(b: Branch | null): void }`; `<ConvergenceScene />` (inside Canvas); `<ConvergenceHero />` — decides tier client-side: `full3d` → dynamic-imported Canvas, `css` → `StaticPetalGrid animated` styled as petal layout, `static` → poster + plain 2×2 grid.

- [ ] **Step 1: Install 3D deps**

```bash
npm i three @react-three/fiber @react-three/drei @react-three/postprocessing zustand
npm i -D @types/three
```

- [ ] **Step 2: `scrollStore.ts`** (zustand, as specced — no prop drilling into Canvas).

- [ ] **Step 3: `RingMaterial.ts`** — `THREE.ShaderMaterial` factory, vertex-based radial gradient:

```ts
import * as THREE from "three";
import { TOKENS } from "@/lib/tokens";

export function createRingMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uOuter: { value: new THREE.Color(TOKENS.cerulean) },
      uInner: { value: new THREE.Color(TOKENS.navy) },
      uInnerRadius: { value: 0.62 }, // torus hole edge in local units
      uOuterRadius: { value: 1.0 },
    },
    vertexShader: /* glsl */ `
      varying float vRadial;
      uniform float uInnerRadius; uniform float uOuterRadius;
      void main() {
        float r = length(position.xy);
        vRadial = clamp((r - uInnerRadius) / (uOuterRadius - uInnerRadius), 0.0, 1.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      varying float vRadial;
      uniform vec3 uOuter; uniform vec3 uInner;
      void main() { gl_FragColor = vec4(mix(uInner, uOuter, vRadial), 1.0); }`,
  });
}

export function createCoreMaterial() {
  // Navy at points -> emerald center, emissive emerald for glow (bloom target)
  return new THREE.ShaderMaterial({ /* same pattern: mix(navy, emerald, 1.0 - vRadial), plus uEmissive uniform added to color; layer 1 for selective bloom */ 
    uniforms: {
      uEdge: { value: new THREE.Color(TOKENS.navy) },
      uCenter: { value: new THREE.Color(TOKENS.emerald) },
      uEmissive: { value: 0.35 },
    },
    vertexShader: /* glsl */ `
      varying float vR;
      void main() { vR = clamp(length(position) , 0.0, 1.0); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: /* glsl */ `
      varying float vR; uniform vec3 uEdge; uniform vec3 uCenter; uniform float uEmissive;
      void main() { vec3 c = mix(uCenter, uEdge, vR); gl_FragColor = vec4(c + uCenter * uEmissive, 1.0); }`,
  });
}
```

(Exact `uInnerRadius`/normalization values need tuning against the actual geometry dimensions — tune visually, keep uniforms.)

- [ ] **Step 4: `PetalMesh.tsx`** — lathe/curved-plane geometry, matte near-white `MeshStandardMaterial`, `userData.branch`, props `{ branch, index, progress }`. Per §4.2 progress mapping:
  - p 0→0.4: rotate/translate outward along petal's own local axis (`useMemo` a per-index axis quaternion; `useFrame` lerps).
  - p 0.4→0.7: rotate to face camera, scale 1→1.15, lerp `material.color` white → `BRANCH_ACCENT[branch]`.
  - Hover (only when progress < 0.05): full accent tint + `setHovered(branch)`; `onPointerOut` clears.
- [ ] **Step 5: `ConvergenceScene.tsx`** — Canvas `dpr={[1, 2]}` (caps pixelRatio), `gl={{ antialias: true, powerPreference: "high-performance" }}`; soft `directionalLight` + drei `Environment` (individual import) preset "city" low intensity; `Points` particle field 200 pts, opacity 0.15, slow drift in `useFrame`; ring torus + core octahedron with materials from Step 3; four `PetalMesh`; `EffectComposer` + `Bloom` restricted via layers to the core (selective); whole scene group opacity fades to 0 over p 0.7→1.0 (drive material opacities; `transparent: true`).
  - FPS probe: in the first ~60 frames measure avg delta in `useFrame`; if avg fps < 30, call an `onDegrade()` prop → parent swaps to CSS tier and unmounts Canvas. Also disable Bloom below `hardwareConcurrency >= 6`.
- [ ] **Step 6: Poster** — render the scene once at rest, screenshot via `gl.domElement.toDataURL()` in dev, save as `site/public/poster-mark.png` (or crop `logo.png` as interim). Poster shows immediately; Canvas fades in over it when ready.
- [ ] **Step 7: `ConvergenceHero.tsx`** — `"use client"`; `useState(tier)` from `detectRenderTier()` in effect (SSR renders poster); `next/dynamic(() => import("./ConvergenceCanvas"), { ssr: false, loading: () => poster })`. Hover teaser overlay: DOM absolutely-positioned div; a `useFrame` in the scene projects the hovered petal position (`vector.project(camera)`) and writes screen coords into the zustand store; overlay reads coords + `hovered` and renders the branch teaser (from `BRANCHES`) — also focusable via the DOM branch cards below (a11y §7).
- [ ] **Step 8: Verify:** scene renders at rest on `/`, 60fps on this machine (check with browser FPS meter), no `three` import outside `components/three` (`grep -rn "from \"three\"" site --include="*.ts*" | grep -v components/three` → empty). Commit: `feat: R3F convergence scene with shader materials and selective bloom`.

---

### Task 10: GSAP ScrollTrigger pin/scrub + DOM handoff

**Files:**
- Create: `site/components/three/ScrollDriver.tsx`
- Modify: `site/components/three/ConvergenceHero.tsx`, `site/components/home/HeroSection.tsx`

**Interfaces:**
- Consumes: `useScrollStore.setProgress`.
- Produces: pinned hero container scroll region (~150vh scrub distance); progress 0–1 into store; DOM `#branch-grid` opacity/entrance tied to p 0.7→1.0 (crossfade handoff — grid is real HTML below the pinned section, revealed as canvas fades).

- [ ] **Step 1: Install GSAP** — `npm i gsap`.
- [ ] **Step 2: `ScrollDriver.tsx`** — `"use client"`, `useLayoutEffect` with `gsap.context`; `ScrollTrigger.create({ trigger, start: "top top", end: "+=150%", pin: true, scrub: true, onUpdate: (self) => setProgress(self.progress) })`; kill on unmount. Skip creation entirely when reduced-motion or tier ≠ full3d.
- [ ] **Step 3: Handoff** — branch grid section directly after pinned hero; canvas opacity → 0 by p=1 (Task 9 Step 5) as grid scrolls into view naturally. Ensure focus/tab order skips canvas (`tabIndex={-1}` on canvas container, `aria-hidden` on the WebGL layer).
- [ ] **Step 4: Verify:** scroll scrubs petal animation both directions; releasing pin lands on branch grid; reduced-motion (emulate in DevTools) → no pin, static grid; WebGL disabled → CSS tier, page still scrolls normally. Commit: `feat: scroll-scrubbed convergence reveal with DOM handoff`.

---

### Task 11: CSS/SVG fallback petal animation (css tier)

**Files:**
- Create: `site/components/fallback/PetalGridCss.tsx`
- Modify: `site/components/three/ConvergenceHero.tsx` (css tier renders this instead of plain grid)

**Interfaces:**
- Consumes: `BRANCHES`, Motion `useScroll`/`useTransform`.
- Produces: four absolutely-positioned SVG petal shapes around a center mark, scroll-linked unfold into the same 2×2 `BranchCard` grid (`layout` transitions), same color-lerp white→accent via `useTransform` on scroll progress. Lands on identical cards/copy/links as 3D path.

- [ ] **Step 1: Petal SVG path** — single `<path>` quarter-petal shape reused ×4 with rotation transforms (0/90/180/270deg), fill white, stroke hairline.
- [ ] **Step 2: Scroll wiring** — `useScroll({ target: sectionRef, offset: ["start start", "end start"] })`; `useTransform` maps progress to rotation/translate/fill per petal.
- [ ] **Step 3: Verify with DevTools device emulation (<768px) and hardware acceleration off. Commit:** `feat: CSS/SVG petal fallback for low-end devices`.

---

### Task 12: Accessibility pass

**Files:** touch-ups across components.

- [ ] **Step 1: Keyboard walk every route** — tab order must hit nav → page links → footer; canvas never focused.
- [ ] **Step 2: Reduced-motion audit** — grep every `motion.`/`gsap`/`useFrame` usage; confirm each is inside MotionConfig scope, tier-gated, or explicitly checks. GSAP: ScrollDriver already tier-gated; any other gsap usage must check `matchMedia`.
- [ ] **Step 3: Alt text** — every `next/image` has meaningful alt ("AZURID logo mark — four petals around an emerald core", etc.). Poster: descriptive alt.
- [ ] **Step 4: Contrast sweep** — computed-style check on every accent/background pairing in use, verify against design.md §2.5 table. Healthcare page especially.
- [ ] **Step 5: Commit:** `fix: accessibility pass — focus order, reduced motion, alt text, contrast`.

---

### Task 13: Performance budget enforcement

- [ ] **Step 1: Bundle analysis** — `ANALYZE=true npm run build` with `@next/bundle-analyzer`; measure gzipped 3D chunk. If > 180KB: replace drei `Environment` with two hand-placed lights, drop postprocessing for a shader-side glow (the core material already has an emissive term — bloom is enhancement), and verify tree-shaking of drei imports.
- [ ] **Step 2: Confirm `next/dynamic ssr:false` split** — 3D chunk absent from `/healthcare` etc. route JS.
- [ ] **Step 3: Lighthouse mobile on every route** (`npx lighthouse <url> --form-factor=mobile --screenEmulation.mobile --quiet --only-categories=performance`), all ≥ 85. Fix images (AVIF/WebP via next/image), preload fonts (next/font handles), defer GSAP to hero-visible.
- [ ] **Step 4: Commit:** `perf: bundle budget + lighthouse fixes`.

---

### Task 14: Final QA — spec §8 checklist + taste pass + open items

- [ ] **Step 1: Run the full §8 checklist** from the build spec, item by item, recording pass/fail evidence in `docs/superpowers/plans/qa-results.md`.
- [ ] **Step 2: Taste/anti-slop pass (§1B) on every route:** no centered-text-over-photo outside hero; no forced equal-height card grids; fonts confined to Space Grotesk/Inter (computed styles); every animation traceable to spec §4/§5; no non-brand colors (grep for `#` hexes in components → only tokens files may contain them).
- [ ] **Step 3: Open items memo** — write `docs/OPEN-ITEMS.md`: (1) AZURID vs AZURIDE naming — one constant `SITE_NAME` to flip; (2) FR/AR i18n decision — note that adding `next-intl` later touches routing + petal-teaser positioning; (3) **copy reconciliation against `azurid-company-profile.md` (file was absent at build time — all copy is drafted from design.md).**
- [ ] **Step 4: Final commit.**

---

## Self-Review Notes

- Spec coverage: §1 skills (available in env, referenced per-task), §2 stack (Tasks 1, 3, 9, 10), §3 tokens (Task 2), §4 scene/scroll/budget/fallbacks (Tasks 4, 9, 10, 11, 13), §5 motion patterns (Tasks 3, 8), §6 architecture (Tasks 5–9 file layout matches; `(marketing)` group optional — flat `app/` routes acceptable, spec's group adds nothing without a second layout), §7 a11y (Task 12 + inline), §8 QA (Task 14), §9 open items (Task 14 Step 3).
- Known deviation: copy source file missing → drafted copy centralized in Copy Blocks + `lib/branches.ts`/`lib/techSubpages.ts` for one-touch replacement.
- Type consistency: `Branch` type defined once (Task 2), consumed by Tasks 4–11; `BRANCHES` defined Task 5, consumed 6, 9, 11.
