# Open Items — confirm before deploy

Tracked from build spec §9 plus issues discovered during the build.

## 1. Brand name: AZURID vs AZURIDE

design.md and the build spec use both spellings. The site currently ships
**AZURID** everywhere via a single constant: `SITE_NAME` in `site/lib/site.ts`.
Flipping the name is a one-line change and propagates to the nav lockup,
`<title>` tags, footer, and alt text. The logo PNGs
(`site/public/logo-mark.png`, `logo-full.png`) contain no wordmark text, so
they are unaffected.

## 2. FR / AR internationalization

Undecided. If French (and especially Arabic/RTL) ships, add `next-intl` at the
`app/` routing level **before** further page work; retrofitting touches every
route. RTL specifically affects the nav layout and the petal-hover teaser
positioning in `ConvergenceHero.tsx` (screen-space projection assumes LTR
offsets).

## 3. Copy reconciliation against `azurid-company-profile.md`

The profile document was absent from the repo at build time. All copy was
drafted from design.md and centralized so replacement is one-touch:

- `site/lib/site.ts` — name, motto, contact email
- `site/lib/branches.ts` — branch titles, teasers (feeds petals, cards, teaser
  overlays)
- `site/lib/techSubpages.ts` — tech sub-page titles, intros, service lists
- Branch page intros/services live in each `site/app/*/page.tsx`

Reconcile every string against the profile before deploy.

## 4. 3D bundle budget contradiction (spec §4.3 vs §2)

The spec caps the 3D chunk at 180 KB gz but also mandates React Three Fiber.
`three` + `fiber` + `react-reconciler` floor is ~234 KB gz, which is what
ships after removing postprocessing and drei. Either accept the overage
(current state — the chunk is lazy, behind a poster, and never fetched by
mobile/css/static tiers) or drop to raw `three` without R3F to get under
180 KB, at the cost of rewriting `components/three/`.

## 5. Real photography and final poster

design.md §8 calls for real project photography; every image currently on the
site is the logo asset. The hero poster (`/logo-mark.png`) is an interim crop
of the mark — replace with an art-directed still of the 3D scene at rest when
brand assets arrive.
