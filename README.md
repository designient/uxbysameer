# uxbysameer — Portfolio

Story-card portfolio for Sameer Ul Haque, AI-Native Product Designer. Built with Vite, GSAP 3 (ScrollTrigger + SplitText), Lenis smooth scroll, and a Cloudflare Pages Function that powers the "Ask my AI agent" chat.

## Local development

```bash
npm install
npm run dev       # site at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build
```

### Running the AI agent locally

The chat calls `/api/chat`, which Vite proxies to a local Cloudflare Pages Functions server on port 8788. Without it (or without a key) the chat falls back to built-in canned answers.

```bash
cp .dev.vars.example .dev.vars   # then put your OPENAI_API_KEY in .dev.vars
npm run dev:api                  # terminal 1: functions on :8788
npm run dev                      # terminal 2: site on :5173
```

## Structure

```
index.html              Home: story deck hero, proof, work, AI lab, agent chat, three doors, testimonials, contact
hire.html               For hiring teams (full-time, remote or relocation)
work-with-me.html       For clients (offers, process, engagement models)
learn.html              For learners & teams (ADPList mentorship, cohort waitlist, corporate training)
work/*.html             Case study shells (head + nav); content is rendered from src/js/data/cases.js
functions/api/chat.js   Cloudflare Pages Function: OpenAI streaming, origin check, rate limit
functions/_middleware.js  Optional under-construction gate (SITE_PASSWORD)
functions/_lib/         Generated knowledge module (do not edit by hand)
scripts/                build-knowledge.mjs (knowledge → function), caseTemplate.mjs (case study renderer)
src/js/app.js           Home entry
src/js/page.js          Shared entry for audience and case pages
src/js/anims/           Preloader, hero, reveals, transitions, generative card art
src/js/components/      Story deck + sheet, agent chat, work/lab grids, testimonials, misc widgets
src/js/data/            content.js (site copy), cases.js (case studies), signature.js (logo), agentKnowledge.md (agent)
src/css/                tokens, base, sections, story (deck, sheet, card art), case (long-form case studies)
public/                 Favicon, OG image, sitemap, robots, resume PDF
```

## Editing content

- **Story cards, stats, projects, AI lab, testimonials, links:** `src/js/data/content.js`.
- **Real media:** add files to `public/images/` and fill the empty fields in `content.js`:
  - `site.avatar` — your photo (replaces the gradient initials in the nav).
  - `projects[].image` — work card cover images.
  - `lab[].video` — short screen recordings (MP4/WebM) for the AI lab cards; they autoplay muted unless the visitor prefers reduced motion.
  - `stories[].photo` — photo shown at the top of each story chapter sheet.
  - Add entries to `testimonials.trainees.items` to show the "Corporate trainees" tab.
  - Until a field is filled, generative card art is shown instead.
- **Case studies:** edit `src/js/data/cases.js`, one object per project, with a field guide at the top of the file. Sections follow a long-form story arc: hook, summary, context, goals, role and team, research insights and pull quote, key numbers, "How might we" reframe, solution features with media and credit captions, process, how it works (AI cases), what didn't work, impact, testimonial, reflection.
  - Empty fields are **hidden in production**. On `npm run dev` they show as dashed "Add: ..." slots so you can see what's missing.
  - Put media in `public/images/work/<slug>/` and reference it as `/images/work/<slug>/file.jpg` in `visual` or `features[]` (`image` or `video`). Videos autoplay muted unless the visitor prefers reduced motion.
  - To attach a testimonial, set `testimonial` to the person's name from `content.js`.
  - The "On this page" list, reading time, "More work" and "Next project" are generated automatically.
- **Logo:** the hand-drawn "uxbysameer" signature lives in `src/js/data/signature.js` (one path per stroke, in drawing order). It's inlined into every page's nav at build time and redraws on hover. On the homepage a large copy draws itself in the preloader, in step with the counter, then flies into the nav; other pages draw the nav logo on load. Swap in your own signature strokes to customise it.
- **What the agent knows:** edit `src/js/data/agentKnowledge.md`. It is compiled into `functions/_lib/knowledge.js` automatically by `npm run build` and `npm run dev:api` (or run `npm run knowledge`). Keep it factual — the agent is instructed to answer only from this file.

## Deploying to Cloudflare Pages

1. Push this repo to GitHub.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git** and select the repo.
3. Build settings:
   - Framework preset: **Vite** (or None)
   - Build command: `npm run build`
   - Build output directory: `dist`
4. **Settings → Variables and Secrets:** add `OPENAI_API_KEY` as a secret. Optionally set `OPENAI_MODEL` (defaults to `gpt-4o-mini`).
5. Deploy. The `functions/` folder is picked up automatically. Every push redeploys.
6. **Under construction mode:** add a `SITE_PASSWORD` secret. Visitors then see a branded "coming soon" page (`functions/_middleware.js`) with your contact links and a small "Have access?" password field; entering the password unlocks the full site for 30 days on that browser. Delete the secret and redeploy to go live. Test locally with `npm run build && npx wrangler pages dev dist --binding SITE_PASSWORD=yourpass`.
7. Recommended: add a Cloudflare WAF rate-limiting rule on `/api/chat` — the built-in limiter is per-isolate and best-effort only.

After connecting a custom domain, update the URLs in `public/sitemap.xml`, `public/robots.txt`, and the `canonical` / `og:url` tags in each HTML page.

## Performance & accessibility notes

- No WebGL — card art is lightweight inline SVG, paused when offscreen.
- `prefers-reduced-motion` disables smooth scroll, marquees, card art motion and heavy animations.
- Story chapters use the native `<dialog>` element (focus trap, Esc to close, arrow keys to step, focus returns to the card).
- Semantic HTML, skip link, keyboard-navigable nav, ARIA labels and live region for the chat.
