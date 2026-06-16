---
name: Light editorial hero redesign
overview: Replace the particle-field hero with an editorial kinetic-type hero and convert the whole site to a warm light-mode palette — dropping Three.js entirely for a lighter, sharper, more legible site.
todos:
  - id: light-tokens
    content: Rewrite color tokens + base/sections CSS for light mode (paper bg, ink text, blue accent, shadows, curtain, grain)
    status: completed
  - id: editorial-hero
    content: "New editorial hero: markup, stacked/outlined type styles, SplitText entrance, word-swap slot, name marquee"
    status: completed
  - id: remove-three
    content: Remove Three.js scene, dependency, and canvas; simplify preloader and app.js wiring
    status: completed
  - id: light-audit
    content: Audit all sections + case study pages + work preview canvas + favicon/og-image for light mode
    status: completed
  - id: verify
    content: Build, preview smoke test, lint, reduced-motion check
    status: completed
isProject: false
---

# Light-Mode Editorial Redesign

## Direction
- **Palette**: warm paper background (#f7f5f1), ink-black text (#121212), one electric accent — ultramarine blue (#2418ec-ish, AA-safe) for labels, hovers, and the transition curtain (curtain flips to ink-black panels for contrast). Grain overlay stays at reduced opacity; `mix-blend-mode: difference` nav/cursor still work.
- **Hero concept — editorial kinetic type** (replaces the Three.js particle field):
  - Stacked oversized headline, e.g. `I DESIGN / PRODUCTS &` + a swapping word slot — `BUILD / SHIP / GROW / SCALE` — `THEM WITH AI`, with one line rendered as outlined (text-stroke) type for contrast.
  - SplitText char-stagger entrance after the preloader; the word slot flips vertically on a timer and nudges on scroll.
  - Full-width `SAMEER UL HAQUE —` marquee strip at the hero's bottom edge acting as the divider into About.
  - Meta row: availability badge, location/time, scroll cue. Role ticker is absorbed by the headline word-swap.
- **Three.js removed entirely**: no more WebGL context, `three` dropped from [package.json](package.json) — main bundle shrinks ~330 KB gzip→~56 KB, which helps the Lighthouse target.

## Changes by file
- [src/css/tokens.css](src/css/tokens.css) — rewrite color tokens for light mode (paper bg, ink text, blue accent, black-alpha borders/surfaces).
- [src/css/base.css](src/css/base.css) — selection colors, grain opacity (~0.05 works on light), transition panels to ink-black.
- [src/css/sections.css](src/css/sections.css) — new hero styles (stacked lines, outline text, word-slot mask, name marquee); audit cards/stats/timeline/testimonials for light surfaces and shadows (`box-shadow` replaces glow effects).
- [index.html](index.html) — new hero markup; remove `<canvas id="hero-canvas">`.
- New `src/js/anims/heroEditorial.js` — headline entrance, word-swap loop, scroll nudge, marquee.
- [src/js/app.js](src/js/app.js) — drop `HeroScene` import/scroll hookup; wire new hero module.
- [src/js/anims/preloader.js](src/js/anims/preloader.js) — remove scene-ready wait, straight count to 100.
- Delete [src/js/scene/heroScene.js](src/js/scene/heroScene.js); remove `three` dependency.
- [src/js/anims/workPreview.js](src/js/anims/workPreview.js) — preview card draws on paper-light base instead of #141414.
- [public/favicon.svg](public/favicon.svg), [public/og-image.svg](public/og-image.svg) — light versions.
- [work/*.html](work/gamana.html) — no structural change; `.case-visual` background/gradient tints adjusted for light via CSS.

## Verification
- `npm run build` + preview smoke test; lint check; confirm reduced-motion path still静 (static hero, no marquee).