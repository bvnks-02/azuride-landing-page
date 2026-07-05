# AZURID — Landing Page Design System

**Purpose of this document:** a design + IA spec for the AZURID landing page, derived directly from the AZURIDE PROD logo mark (`IMG_1222.PNG`). Colors below are sampled pixel values from the actual file, not invented — treat them as the source of truth unless official brand/vector files say otherwise. This doc is meant to be handed to a coding agent (or used as your own build reference) for the landing page and its branch pages.

---

## 1. Reading the Mark

The logo isn't decoration — it's already the sitemap.

- **The circle** = one unified company, AZURID.
- **The four white petals**, arranged in rotating symmetry around a shared center = the four business branches. They don't sit side by side like tiles; they pinwheel around one core, each occupying its own quadrant while touching the same center point. That's the visual definition of "four branches **revealed**" — the brief's own word already matches the mark's geometry.
- **The blue gradient ring** (bright cerulean at the rim → deep navy toward the center) = *Capturing Reality* — cool, optical, scanning/lens-like. It's the half of the motto that's about observation: LiDAR, drone capture, cameras, surgical broadcast.
- **The diamond core** (navy at its points → emerald at its center) = *Building Digital Intelligence* — the point where captured reality is transformed into something generative. Green reads as growth/health/intelligence, which conveniently also overlaps with the Healthcare branch.

Concretely: **the mark's own two gradients ARE the two halves of the motto.** That's the signature idea this whole system is built around — see §6.

### Naming — flag before you build
The logo lockup reads **"AZURIDE" / "PROD"**, but the company profile document uses **"AZURID"** (no E) as the umbrella brand, with "Audiovisual Production" as one of four business units. Two readings are possible:
1. "Azuride Prod" is the legacy name of the original production company, and "AZURID" is the newer umbrella tech-ecosystem name — in which case this specific logo may only belong on the Corporate Communication & Visual Production branch, not the whole site.
2. "AZURID" was a typo/simplification somewhere and the real brand name is "Azuride."

**I've defaulted to "AZURID"** as the site-wide name (matching the profile doc we already built), and treated "AZURIDE PROD" as the production division's own lockup. Flag if that's wrong — it changes what goes in the main nav logo.

### Logo usage
- **Clear space:** keep empty space around the mark equal to at least the radius of the inner diamond on all sides. Don't let nav items or copy crowd closer than that.
- **Minimum size:** mark alone ≥ 32px on digital; full lockup with wordmark ≥ 140px wide.
- **Don't:** recolor the mark to a flat single color (the gradient is the point), rotate it (breaks the pinwheel logic — it's designed for this exact orientation), place it on a busy photo without a scrim, or stretch it off-ratio.
- **Do:** let it sit on white or on Ink Navy (§2) — both give it full contrast.

---

## 2. Color System

### 2.1 Brand palette (sampled from the logo file)

| Token | Hex | RGB | Sampled from |
|---|---|---|---|
| Emerald | `#14B88B` | 20, 184, 139 | Diamond core (brightest point) |
| Cerulean | `#008FC3` | 0, 143, 195 | Ring outer rim |
| Harbor Blue | `#0075A1` | 0, 117, 161 | "PROD" wordmark (flat fill) |
| Ink Navy | `#004869` | 0, 72, 105 | Diamond points / ring inner edge |

These four are **the entire brand palette** — one continuous blue gradient (Ink Navy → Cerulean) plus the one emerald signature accent. Don't add other saturated hues; new colors should come from tinting/shading these four, not introducing new ones.

### 2.2 Named gradients

- **Capture Gradient** — `linear-gradient(135deg, #008FC3, #004869)`. Use for hero backgrounds, section dividers, and anywhere referencing the "reality capture" side of the business (construction, audiovisual, drone/LiDAR imagery treatments).
- **Intelligence Gradient** — `radial-gradient(circle, #14B88B, #004869)`. Use sparingly, reserved for the core signature moment (§6) and primary CTA hover states — this is the "digital intelligence" payoff, it should stay rare enough to feel earned.

### 2.3 Branch accent colors

Each of the four petals gets one of the four sampled hues — no invented colors, no overlap:

| Branch (nav label) | Business unit (formal) | Accent | Hex |
|---|---|---|---|
| Construction & Inspection | Digital Construction & Reality Capture | Ink Navy | `#004869` |
| Corporate Communication & Visual Production | Audiovisual Production & Corporate Communication | Harbor Blue | `#0075A1` |
| Tech & Innovation | Web Development & AI Engineering | Cerulean | `#008FC3` |
| Healthcare | Healthcare Innovation & Digital Transformation | Emerald | `#14B88B` |

Rationale: Navy reads structural/grounded (fits engineering), Cerulean reads bright/digital (fits tech), Emerald reads care/growth (fits health) — and Harbor Blue, sitting between navy and cerulean, is the calm communicative middle. Nothing here was picked arbitrarily; it's the same order the colors appear across the ring's own gradient.

### 2.4 Supporting neutrals (not sampled — standard companions)

| Token | Hex | Use |
|---|---|---|
| Ink (text) | `#0A1E2B` | Primary body text, dark-mode surfaces |
| Slate (muted text) | `#5B6B75` | Secondary text, captions |
| Hairline | `#E2E8EC` | Borders, dividers |
| Surface Alt | `#F5F8FA` | Alternating section backgrounds |
| White | `#FFFFFF` | Base background |

### 2.5 Contrast — checked, not guessed

Measured WCAG contrast ratios so text choices are actually accessible:

| Combination | Ratio | Verdict |
|---|---|---|
| White text on Ink Navy | 9.85:1 | Passes AAA — safe for any text size |
| White text on Harbor Blue | 5.17:1 | Passes AA normal text |
| White text on Cerulean | 3.67:1 | **Large/bold text only** (fails AA normal) |
| White text on Emerald | 2.54:1 | **Fails even at large sizes** — don't use white on emerald |
| Ink text on Cerulean | 4.63:1 | Passes AA normal text |
| Ink text on Emerald | 6.70:1 | Passes AA normal, near-AAA |

**Rule of thumb:** white text sits safely on Ink Navy and Harbor Blue. On Cerulean and Emerald, switch to Ink (`#0A1E2B`) text instead — those two are accent/highlight colors, not text-background colors.

---

## 3. Typography

**Display: Space Grotesk** (weights 500/700). Geometric with a slightly technical, engineered character in details like the "G" and "R" — fits a company that's literally about engineering + intelligence, without reaching for Poppins/Montserrat (the default "tech startup" choice everyone else also reaches for).

**Body: Inter** (weights 400/500/600). Neutral, highly legible at small sizes, holds up in both English and French. Also keeps continuity with your other projects' type systems without being identical — Space Grotesk is the differentiator here.

*Alternates if you want to test something else: swap Space Grotesk for Manrope or General Sans — both share the same geometric-with-personality quality.*

### Type scale

| Role | Desktop | Mobile | Weight | Family |
|---|---|---|---|---|
| H1 / Hero | 64px / 1.05 | 36px / 1.1 | 700 | Space Grotesk |
| H2 / Section | 40px / 1.1 | 28px / 1.15 | 700 | Space Grotesk |
| H3 / Card title | 24px / 1.2 | 20px / 1.2 | 500 | Space Grotesk |
| Body | 18px / 1.6 | 16px / 1.6 | 400 | Inter |
| Small | 14px / 1.5 | 14px / 1.5 | 400 | Inter |
| Eyebrow/label | 13px / 1 | 12px / 1 | 600 | Inter, uppercase, +0.12em tracking |

The eyebrow/label style (uppercase, wide tracking) deliberately echoes how "PROD" is set under "AZURIDE" in the logo — reuse that exact treatment for section kickers site-wide (e.g. "HEALTHCARE", "TECH & INNOVATION" labels above headings) so the wordmark's own type habit becomes a recurring site pattern instead of a one-off.

---

## 4. Shape Language & Spacing

The mark mixes two geometries on purpose: soft curved petals + one sharp rotated-square (diamond) at the core. Carry both into the UI instead of flattening to one style:

- **Default corner radius:** 16px on cards, 12px on inputs, full/999px (pill) on buttons and tags — echoes the circle/petal curves.
- **Signature sharp accent:** a 45°-rotated square (small, ~8–12px) used as a bullet marker, active-nav indicator, or hover accent — echoes the diamond core. Use it sparingly; it's a signature detail, not a repeated pattern.
- **Spacing scale (4px base):** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128.
- **Breakpoints:** mobile < 640px · tablet 640–1024px · desktop 1024–1440px · wide > 1440px.
- **Container:** max-width 1200px, 24px side padding on mobile, 64px on desktop.

---

## 5. Voice

The existing profile copy is already confident and declarative ("Every project tells a story. Every building contains data."). Keep landing-page copy in that register: short sentences, present tense, no filler adjectives. Section headers name what the visitor gets to do, not how the system works internally (e.g. "Explore Healthcare," not "Healthcare Module").

---

## 6. Signature Moment — "The Convergence Reveal"

This is the one deliberate, memorable move for the whole site; everything else stays quiet around it.

**Concept:** the hero opens on the mark at rest — circle, four petals closed, emerald core glowing faintly. On scroll (or a tap on mobile), the four petals separate outward along their natural rotational axes and unfold into the four branch cards, each tinted with its own accent color from §2.3 as it opens. The emerald core stays fixed at the center as the "Home" anchor throughout. Hovering a petal (desktop) tints it fully with its accent and surfaces its one-line teaser; clicking navigates to that branch page.

This does three things at once: it's the literal mechanism of "four branches revealed," it's built entirely from the client's own mark (nothing generic bolted on), and it gives you exactly one orchestrated animation moment rather than scattered scroll effects everywhere else on the page.

Respect `prefers-reduced-motion`: fall back to the four branches simply appearing as a static 2×2 grid, no motion.

---

## 7. Site Architecture

```
Home (/)
├── Hero — Convergence Reveal (§6)
├── Vision strip (short, from motto)
├── Four branches (reveal grid) → links to:
│
├── /construction-inspection          [Ink Navy]
├── /corporate-communication          [Harbor Blue]
├── /healthcare                       [Emerald]
└── /tech-innovation                  [Cerulean]
    ├── /tech-innovation/web-development
    ├── /tech-innovation/ai-engineering
    ├── /tech-innovation/erp-systems
    └── /tech-innovation/crm-systems
```

**Proposed grouping for the 4 Tech & Innovation sub-pages** (based on the services we already wrote into the company profile — adjust freely):

| Sub-page | Covers |
|---|---|
| Web Development | Landing pages, corporate websites, e-commerce platforms |
| AI Engineering | Chatbots, virtual assistants, AI-powered dashboards |
| ERP Systems | Enterprise resource planning platforms |
| CRM Systems | Customer relationship management platforms |

### Home page, section by section
1. **Nav** — logo mark (left), four branch links + language switcher if needed, CTA button (Harbor Blue fill, white text — passes contrast per §2.5).
2. **Hero** — Convergence Reveal, motto as the hero line, one-sentence positioning under it.
3. **Four branches** — the unfolded petal cards from the hero interaction, each: icon, one-line description, accent color, "Explore →" link.
4. **Twin Up / flagship tech callout** — short, since it's the platform under active certification; Capture Gradient background.
5. **Industries served** — logo strip or simple tag cloud, Surface Alt background.
6. **Closing CTA** — Intelligence Gradient background, white/Ink text per contrast rule, single clear action (e.g. "Talk to us").
7. **Footer** — dark Ink Navy, four branch links repeated, contact, social.

### Branch pages
Each of the four branch pages inherits its accent color as the page's single highlight color (headings, links, button fills) against an otherwise neutral (white/Surface Alt) layout — so the site stays visually unified while each branch still feels distinct. Tech & Innovation's page additionally reveals its own four-card grid (same reveal pattern as the homepage, one level down) linking to the four sub-pages above.

---

## 8. Imagery & Icons

- **Photography over illustration** wherever real project footage/photos exist (drone stills, LiDAR point-cloud renders, OR/surgical suite photos, event coverage) — this is a company whose actual work product is visual capture, so stock imagery would undercut the pitch.
- **Treatment:** on hover or as a section transition, apply a subtle duotone using the Capture Gradient (Cerulean → Ink Navy) over photography — ties every image back to the brand system without a heavy filter.
- **Icons:** thin-line (1.5–2px stroke), geometric, consistent corner rounding matching §4. Avoid filled/glyph-style icons — they'll clash with the mark's linework quality.

---

## 9. Motion Principles

- One orchestrated moment (§6) beats scattered micro-animations — per the mark's own restraint, don't add hover-bounce or parallax everywhere just because it's easy.
- Transitions: 200–300ms ease-out for hover states, 500–700ms for the petal reveal itself.
- Always respect `prefers-reduced-motion`.

---

## 10. Open Questions Before Build

1. **Naming:** confirm "AZURID" (umbrella) vs. "AZURIDE" — affects the nav logo and every page title.
2. **Tech & Innovation's 4 sub-pages:** confirmed as Web Development / AI Engineering / ERP Systems / CRM Systems, or different split?
3. **Language:** the profile doc is English-only, but AZURID positions itself across Africa — do you need a French version (common for Algeria/Francophone markets)? If yes, I'll add RTL/typography notes for Arabic too, matching what you've done on other projects.
