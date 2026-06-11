---
name: Award-worthy dark portfolio
overview: Build a dark-mode, Awwwards-caliber portfolio for Sameer from scratch using Vite + vanilla Three.js + GSAP + Lenis, with hybrid "design leader who builds with AI" positioning, real content from the resume/Framer site, and ready for Cloudflare Pages deployment.
todos:
  - id: scaffold
    content: "Scaffold Vite multi-page project: deps (three, gsap, lenis), folder structure, base CSS design tokens + fluid type scale"
    status: completed
  - id: hero-scene
    content: "Build Three.js hero: GPU particle field with mouse interaction, scroll morph, DPR cap, reduced-motion/mobile fallbacks"
    status: completed
  - id: preloader
    content: Preloader with counter + name reveal, synced to scene ready; Lenis + custom cursor + magnetic buttons
    status: completed
  - id: sections
    content: "Build index sections: hero copy, about/stats, work list with WebGL hover distortion, services stack, timeline, testimonials, contact footer"
    status: completed
  - id: case-studies
    content: Create shared case study template + 4 pages (Gamana, CashelFamily, Catalyse, Cybonet) with page transitions
    status: completed
  - id: animations
    content: "GSAP pass: SplitText reveals, ScrollTrigger pins/parallax, marquees, counters, transition curtain"
    status: completed
  - id: polish
    content: SEO/OG meta, favicon + og-image, accessibility, Lighthouse pass, responsive QA
    status: completed
  - id: deploy-ready
    content: README with Cloudflare Pages deploy steps, .gitignore, production build verification
    status: completed
isProject: false
---

# Award-Worthy Dark Portfolio — Three.js + GSAP

## Direction
- **Positioning**: "Design leader who builds with AI" — 14 yrs, 105+ projects, Lenovo/Decathlon credibility, AI-native builder (Gamana, agentic workflows). Targets both recruiters and clients.
- **Aesthetic (2026 dark-mode trends)**: near-black canvas (#0a0a0a) with a single electric accent, oversized kinetic typography, film grain/noise overlay, generous whitespace, monospace micro-labels, glass-subtle surfaces. Inspired by current Awwwards SOTD patterns.
- **Content**: real — pulled from the resume and existing Framer site (case studies: CashelFamily Fintech, Catalyse Referrer Hiring, Cybonet Mail Secure, Gamana AI Travel Concierge; testimonials from Lenovo, Decathlon, Catalyse, Mashreq). Polished dummy detail fills gaps; placeholder visuals he can swap later.

## Stack
- Vite (multi-page), vanilla JS, Three.js, GSAP 3 (ScrollTrigger + SplitText — all plugins now free), Lenis smooth scroll.
- No framework, no CSS libs — hand-written modern CSS (custom properties, fluid `clamp()` type scale).
- Static `dist/` output → push to GitHub → Cloudflare Pages (build command `npm run build`, output `dist`).

## Site structure
```
index.html            — main single-page experience
work/gamana.html      — case study detail (template shared x4)
work/cashel.html, work/catalyse.html, work/cybonet.html
src/
  js/ (app.js, scene/ three.js modules, anims/ gsap modules)
  css/ (tokens, base, sections)
public/ (favicon, og-image, placeholder visuals, resume PDF)
```

## Page experience (index)
1. **Preloader** — percentage counter + name mask-reveal, syncs with Three.js scene ready state.
2. **Hero** — full-viewport Three.js scene: interactive particle field (~50k GPU particles) that drifts and reacts to cursor with subtle mouse-repulsion + scroll-based morph; layered behind oversized split-text headline ("Sameer Ul Haque — I design products and build them with AI"), rotating role ticker, scroll cue.
3. **About / Proof bar** — animated stat counters (14 yrs, 105+ projects, 500+ mentored, 40+ SaaS engagements), short bio, brand name marquee (Lenovo, Decathlon, Mashreq, TCS, Infosys).
4. **Selected Work** — 4 case studies as large interactive rows/cards: WebGL hover-distortion image preview, title slide, index numbers; each links to a detail page.
5. **Services** — three offerings for clients: Fractional Product Leadership, AI & Agentic Workflow Builds, Product/UX Design Systems. Sticky-stack card reveal on scroll.
6. **Experience timeline** — Gamana → Designient → Softobiz → earlier, pinned horizontal-scroll or line-draw vertical timeline.
7. **Testimonials** — Lenovo, Decathlon, Catalyse, Mashreq quotes, auto-advancing with drag.
8. **Contact / Footer** — giant magnetic "Let's build something" CTA, email copy-to-clipboard, LinkedIn/ADPList links, local time widget, back-to-top.

Case study pages: hero stat strip (role, timeline, outcome metrics), problem → process → outcome narrative with scroll reveals, next-project footer link. One shared template, four content variants.

## Signature interactions (GSAP)
- Lenis smooth scroll wired into ScrollTrigger; custom cursor with hover states; magnetic buttons.
- SplitText line/char reveals on every heading; parallax media; section pinning for services.
- Page-transition curtain between index and case studies.

## Performance & accessibility (what makes it "award-worthy" instead of just heavy)
- Single WebGL context, capped DPR, particles via custom shader points (cheap on GPU); scene pauses when offscreen.
- `prefers-reduced-motion`: kill smooth scroll/heavy anims, static hero fallback; mobile gets a lighter particle count.
- Semantic HTML, keyboard-navigable, meta/OG tags, sitemap, 90+ Lighthouse target.

## Deployment
- `README.md` with run/build steps and exact Cloudflare Pages settings; commit-ready repo (`.gitignore`, `package.json`). User pushes to GitHub and connects Cloudflare Pages — no config file needed.