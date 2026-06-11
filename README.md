# uxbysameer — Portfolio

Dark-mode portfolio for Sameer Ul Haque, built with Vite, vanilla Three.js, GSAP 3 (ScrollTrigger + SplitText), and Lenis smooth scroll.

## Local development

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build
```

## Structure

```
index.html          Main single-page experience
work/*.html         Case study pages (Gamana, Cashel, Catalyse, Cybonet)
src/js/scene/       Three.js particle hero scene
src/js/anims/       GSAP animations (preloader, reveals, transitions, work previews)
src/js/components/  Role ticker, testimonials slider, misc widgets
src/js/data/        Site content (edit copy here)
src/css/            Design tokens, base styles, section styles
public/             Favicon, OG image, sitemap, robots, resume PDF
```

## Editing content

- Copy for testimonials and the hero role ticker lives in `src/js/data/content.js`.
- Section copy, work list, services, and the timeline are in `index.html`.
- Case study copy is in each `work/*.html` file.
- Replace the placeholder case visuals (`.case-visual`) with real project imagery when ready.

## Deploying to Cloudflare Pages

1. Push this repo to GitHub.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git** and select the repo.
3. Use these build settings:
   - Framework preset: **Vite** (or None)
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy. Every push to the default branch redeploys automatically.

After connecting a custom domain, update the URLs in `public/sitemap.xml`, `public/robots.txt`, and the `og:url` meta tag in `index.html`.

## Performance & accessibility notes

- Single WebGL context with capped device pixel ratio (1.5); particle count drops on mobile.
- `prefers-reduced-motion` disables smooth scroll, the particle scene, and heavy animations.
- Semantic HTML, keyboard-navigable nav, ARIA labels on interactive controls.
