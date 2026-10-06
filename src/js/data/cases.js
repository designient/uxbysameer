// Case study content. Each object renders into work/<slug>.html at dev and build time
// (see scripts/caseTemplate.mjs). Any empty field ('' or []) is left out of the page in
// production; on `npm run dev` it shows as a dashed "Add: ..." slot so you can see gaps.
//
// FIELD GUIDE
// hook         One or two sentences that set up the story (shown large under the title).
// meta         Up to 4 facts for the hero row: role, timeline, team size, platform, stack.
// summary      Problem / approach / outcome in one line each — the 30-second read.
// visual       Hero media. `image` or `video` path under /public/images/work/<slug>/; falls back to `art`.
// problem      The core problem, in a short paragraph.
// context      Background: the company, the product, what was happening and why it mattered.
// goals        Numbered goals or success criteria agreed at the start.
// role         What you owned, who you worked with, and what you didn't do.
// team         Collaborators by role, e.g. 'CTO', '2 engineers', 'Researcher'.
// tools        Tools and stack used.
// insights     Research findings: [{ title, text }]. Aim for 3–4.
// quote        A pull quote: { text, cite }. A user quote, stakeholder line or your key realisation.
// numbers      Data that framed the problem: [{ value, label }], e.g. { value: '50%', label: 'of users skip setup' }.
// reframe      The "How might we..." question the insights led to.
// features     The solution, one block per idea: [{ title, text, image, video, caption }].
//              `caption` is for credits, e.g. 'Motion study in collaboration with ...'.
// process      What you did, as short bullets.
// flow         How the agent/automation works, step by step: [{ title, text }].
// failed       What didn't work and what you learned: [{ title, text }].
// impact       Results: [{ value, label }]. Use relative numbers if exact ones are confidential.
// impactNote   Small print under the impact grid, e.g. a confidentiality note.
// outcome      A sentence or two on the result, shown with the impact section.
// testimonial  Name of a person in content.js testimonials whose quote belongs to this project.
// reflection   What you'd do differently, what's next, what this taught you.
// nda          true to show a note that confidential details were omitted.

export const cases = [
  {
    slug: 'gamana',
    title: 'Gamana',
    subtitle: 'AI-native travel concierge, zero to MVP',
    hook: '',
    meta: [
      { label: 'Role', value: 'Founder & Product Lead' },
      { label: 'Timeline', value: 'Mar 2025 — Present' },
      { label: 'Stack', value: 'Claude API, GPT-4o, Cursor' },
      { label: 'Scope', value: 'Zero to MVP' },
    ],
    summary: {
      problem: 'Travel planning is fragmented across dozens of apps, tabs and spreadsheets.',
      approach: 'Agentic AI workflows for personalised itineraries, shipped with an AI-first build stack.',
      outcome: 'Launched the MVP from zero, compressing multi-week development cycles into days.',
    },
    visual: { art: { pattern: 'nodes', colors: ['#4b22d6', '#c6f65a'] }, image: '', video: '', alt: '' },
    problem:
      "Travel planning is fragmented across dozens of apps, tabs and spreadsheets. Travellers need a single intelligent concierge that understands preferences, builds itineraries and stays helpful after booking, without the overhead of a human travel agent.",
    context: '', // Why you founded Gamana, the market, who it's for.
    goals: [], // e.g. the North Star metrics you set (activation rate, 30-day retention) and targets.
    role: '', // Founder scope: what you did yourself vs. with partners.
    team: [],
    tools: ['Claude API', 'GPT-4o', 'Cursor', 'Framer', 'Bolt', 'Make', 'n8n'],
    insights: [], // What you learned from travellers before building.
    quote: null,
    numbers: [],
    reframe: '',
    features: [], // Itinerary generation, concierge after booking, etc. Add screenshots or screen recordings.
    process: [
      'Defined the product vision and North Star metrics (activation rate, 30-day retention)',
      'Designed agentic AI workflows for personalised itinerary generation',
      'Shipped the core product with an AI-first build stack: Cursor, Framer and Bolt',
      'Built internal ops pipelines with Make and n8n so a lean team could execute',
      'Designed growth loops across referral, content and partnership channels',
    ],
    flow: [], // How the itinerary agent works: inputs, model steps, tools, output.
    failed: [],
    impact: [],
    impactNote: '',
    outcome:
      'Launched the MVP from zero with end-to-end ownership of product strategy, UX, go-to-market and growth. AI-assisted prototyping compressed multi-week development cycles into days.',
    testimonial: '',
    reflection: '',
    nda: false,
  },
  {
    slug: 'ops-automation',
    title: 'Lean Ops Autopilot',
    subtitle: 'Make + n8n pipelines that run a startup with a tiny team',
    hook: '',
    meta: [
      { label: 'Role', value: 'Designer & builder' },
      { label: 'Context', value: 'Gamana' },
      { label: 'Stack', value: 'n8n, Make, webhooks' },
      { label: 'Scope', value: 'Internal operations' },
    ],
    summary: {
      problem: 'A small startup team was losing its time to repetitive operational work.',
      approach: 'Designed each pipeline like a product, then built it in Make and n8n.',
      outcome: 'A lean team runs operations that would normally need more people.',
    },
    visual: { art: { pattern: 'stripes', colors: ['#111111', '#ffd84a'] }, image: '', video: '', alt: '' },
    problem:
      "An early-stage startup cannot afford to hire people for every repetitive operational task, but those tasks still have to happen reliably every day. Without automation, the founding team spends its time on busywork instead of the product.",
    context: '',
    goals: [],
    role: '',
    team: [],
    tools: ['n8n', 'Make', 'Webhooks'],
    insights: [], // Which tasks ate the most time, and why they were automatable.
    quote: null,
    numbers: [], // e.g. hours per week spent on manual ops before.
    reframe: '',
    features: [], // One block per pipeline, ideally with a screenshot of the workflow canvas.
    process: [
      'Mapped the recurring operational work across the team and picked the highest-leverage flows',
      'Designed each pipeline like a product: clear triggers, steps, owners and failure states',
      'Built the pipelines in Make and n8n, connecting the tools the team already used',
      'Iterated with the team so the automations matched how work actually happens',
    ],
    flow: [], // Trigger → steps → output for your most important pipeline.
    failed: [],
    impact: [], // e.g. hours saved per week, tasks automated.
    impactNote: '',
    outcome:
      'A lean team runs operations that would normally need more people, and spends its time on the product and its users instead of manual busywork.',
    testimonial: '',
    reflection: '',
    nda: false,
  },
  {
    slug: 'portfolio-agent',
    title: "Sam, Sameer's AI twin",
    subtitle: 'A grounded AI agent that answers recruiters and clients',
    hook: '',
    meta: [
      { label: 'Role', value: 'Designer & builder' },
      { label: 'Model', value: 'OpenAI' },
      { label: 'Runtime', value: 'Cloudflare Pages Functions' },
      { label: 'Status', value: 'Live on this site' },
    ],
    summary: {
      problem: 'Visitors’ real questions usually go unanswered until a call.',
      approach: 'A grounded, rate-limited agent with a streaming chat UI, running at the edge.',
      outcome: 'Instant, grounded answers at any hour, and a working demo of how I build AI products.',
    },
    visual: { art: { pattern: 'dots', colors: ['#5b3bff', '#f5b8f0'] }, image: '', video: '', alt: '' },
    problem:
      'Recruiters and founders skim a portfolio in seconds, and their real questions ("Is he open to relocation?", "Can he build our agent?") usually go unanswered until a call. I wanted visitors to get those answers instantly, without the risk of an AI making things up.',
    context: '',
    goals: [
      'Answer only from real, curated facts, and say so when something isn’t known',
      'Always end with a useful next step: a page, a booking link or an email',
      'Keep the API key server-side and protect the endpoint from abuse',
      'Never dead-end: work even when the model is unavailable',
    ],
    role: 'I designed the conversation, wrote the knowledge base and system prompt, built the chat interface and shipped the serverless backend.',
    team: [],
    tools: ['OpenAI API', 'Cloudflare Pages Functions', 'Streaming', 'Vanilla JS'],
    insights: [],
    quote: null,
    numbers: [
      { value: '8', label: 'requests per minute per visitor' },
      { value: '10', label: 'messages of context sent to the model' },
      { value: '110', label: 'word cap on every answer' },
      { value: '0', label: 'API keys in the browser' },
    ],
    reframe: '',
    features: [],
    process: [
      'Wrote a curated knowledge base so every answer is grounded in real work, offers and availability',
      'Designed guardrails in the system prompt: stay on topic, never invent facts, always offer a next step',
      'Built a streaming chat UI with suggested prompts, accessible live-region updates and clickable next steps',
      'Ran the model behind a Cloudflare Pages Function with origin checks, rate limiting and token caps, keeping the API key server-side',
      'Added a graceful offline fallback so the experience never dead-ends',
    ],
    flow: [
      { title: 'Visitor asks', text: 'The chat UI offers suggested prompts and sends the last 10 messages to /api/chat.' },
      { title: 'Edge function', text: 'A Cloudflare Pages Function checks the origin, rate-limits each visitor and validates the messages.' },
      { title: 'Grounded prompt', text: 'A system prompt plus the curated knowledge base: answer only from it, under 110 words, with a next step.' },
      { title: 'OpenAI streams', text: 'The model’s reply streams back token by token as plain text, with links made clickable.' },
      { title: 'Fallback', text: 'If the model is unavailable, keyword answers still point visitors to the right page.' },
    ],
    failed: [],
    impact: [],
    impactNote: '',
    outcome:
      'Visitors get instant, grounded answers at any hour, and the agent itself is a working demonstration of how I design and build AI products.',
    testimonial: '',
    reflection: '',
    nda: false,
  },
  {
    slug: 'cashel',
    title: 'Cashel Family',
    subtitle: 'Fintech web app, drop-off reduction',
    hook: '',
    meta: [
      { label: 'Role', value: 'UX Lead' },
      { label: 'Timeline', value: '2022 — 2023' },
      { label: 'Platform', value: 'Web application' },
      { label: 'Focus', value: 'Drop-off reduction' },
    ],
    summary: {
      problem: 'Critical drop-off points in onboarding and transaction completion.',
      approach: 'Research-led redesign of the core flows, from discovery through usability testing.',
      outcome: 'Improved satisfaction and reduced abandonment in critical transaction paths.',
    },
    visual: { art: { pattern: 'rings', colors: ['#a78bfa', '#ffffff'] }, image: '', video: '', alt: '' },
    problem:
      "Cashel Family's fintech platform had critical drop-off points in core user flows. Stakeholder interviews and user research revealed friction in onboarding and transaction completion that directly affected satisfaction and retention.",
    context: '',
    goals: [],
    role: '',
    team: [],
    tools: [],
    insights: [], // The friction points research uncovered.
    quote: null,
    numbers: [], // Drop-off rates per step before the redesign.
    reframe: '',
    features: [], // Before/after of the redesigned onboarding and transaction flows.
    process: [
      'Ran stakeholder interviews and user research to map friction points',
      'Redesigned core flows to address the identified drop-off stages',
      'Owned the full design lifecycle from discovery through usability testing',
      'Drove alignment between product, engineering and business',
    ],
    flow: [],
    failed: [],
    impact: [],
    impactNote: '',
    outcome:
      'Redesigned core flows that directly addressed the friction points, improving user satisfaction and reducing abandonment in critical transaction paths.',
    testimonial: '',
    reflection: '',
    nda: false,
  },
  {
    slug: 'catalyse',
    title: 'Catalyse Referrer',
    subtitle: 'Hiring and referral SaaS platform',
    hook: '',
    meta: [
      { label: 'Role', value: 'Product Designer' },
      { label: 'Timeline', value: '2023' },
      { label: 'Platform', value: 'Web SaaS' },
      { label: 'Client', value: 'Catalyse Digital' },
    ],
    summary: {
      problem: 'A clunky referral experience discouraged participation.',
      approach: 'Turned complex referral workflows into intuitive designs, hand in hand with the CTO.',
      outcome: 'An intuitive referral platform the CTO praised for creativity and attention to detail.',
    },
    visual: { art: { pattern: 'checker', colors: ['#2f8a66', '#c6f65a'] }, image: '', video: '', alt: '' },
    problem:
      'Catalyse needed a referral hiring app that made employee referrals intuitive and trackable. The existing experience was clunky, which discouraged participation and limited the referral pipeline.',
    context: '',
    goals: [],
    role: '',
    team: ['CTO', 'Engineering'],
    tools: [],
    insights: [],
    quote: null,
    numbers: [],
    reframe: '',
    features: [], // Referral submission, tracking and rewards screens.
    process: [
      'Worked closely with the CTO and engineering on technical constraints',
      'Turned complex referral workflows into intuitive, friendly designs',
      'Iterated on interaction patterns for referral tracking and rewards',
      'Delivered high-fidelity prototypes for fast engineering handoff',
    ],
    flow: [],
    failed: [],
    impact: [],
    impactNote: '',
    outcome:
      'Delivered an intuitive referral platform that the CTO praised for its creativity, attention to detail and collaborative approach.',
    testimonial: 'Manoj Bhaskaran Pillai',
    reflection: '',
    nda: false,
  },
  {
    slug: 'cybonet',
    title: 'Cybonet Mail Secure',
    subtitle: 'Enterprise mobile security app',
    hook: '',
    meta: [
      { label: 'Role', value: 'Product Designer' },
      { label: 'Timeline', value: '2022' },
      { label: 'Platform', value: 'Mobile app' },
      { label: 'Focus', value: 'Enterprise security UX' },
    ],
    summary: {
      problem: 'Enterprise mail security apps often sacrifice usability for compliance.',
      approach: 'Mobile-first security patterns grounded in enterprise users’ mental models.',
      outcome: 'Compliance and usability in balance, enabling faster adoption across client organisations.',
    },
    visual: { art: { pattern: 'waves', colors: ['#f472b6', '#111111'] }, image: '', video: '', alt: '' },
    problem:
      'Enterprise mail security apps often sacrifice usability for compliance. Cybonet needed a mobile experience that enterprise users could adopt without extensive training, while keeping rigorous security standards.',
    context: '',
    goals: [],
    role: '',
    team: [],
    tools: [],
    insights: [], // What you learned about enterprise users' security mental models.
    quote: null,
    numbers: [],
    reframe: '',
    features: [],
    process: [
      'Researched enterprise users’ mental models for security workflows',
      'Designed mobile-first interaction patterns for mail security actions',
      'Balanced security requirements with intuitive touch interactions',
      'Created design system components for consistent enterprise deployment',
    ],
    flow: [],
    failed: [],
    impact: [],
    impactNote: '',
    outcome:
      'Delivered a mobile security app that balanced enterprise compliance with user-friendly design, enabling faster adoption across client organisations.',
    testimonial: '',
    reflection: '',
    nda: false,
  },
];
