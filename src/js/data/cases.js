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
//
// Optional blocks (used by Gamana, ignored when absent):
// shipped      { asOf, items: [{ name, status: 'shipped' | 'designed' | 'cut' }], note } — hero "Shipped state" strip.
// research     { method, personas: [{ name, job, friction }], anxieties: [], limits } — shown in Research & insights.
// decisions    [{ id, title, status, situation, decision, outcome, screens: [{ image, alt, label, node }] }]
//              One anchored card per decision (#decision-<id>), so each can be linked or posted on its own.
//              Screens without an image are hidden in production; `node` is the Figma node id to export.

export const cases = [
  {
    slug: 'gamana',
    title: 'Gamana',
    subtitle: 'Travel with Confidence: from audio app to confidence companion',
    hook: "Gamana began as an audio-storytelling app. The research said travellers weren't short of content. They were short of confidence. I led the repositioning and the first public release.",
    meta: [
      { label: 'Role', value: 'Head of Product & Growth' },
      { label: 'Timeline', value: 'Apr 2025 — Present' },
      { label: 'Platform', value: 'Flutter · Android live, iOS rolling out' },
      { label: 'Scope', value: 'Strategy, UX, UI, growth' },
    ],
    summary: {
      problem: 'Travellers hesitate because they cannot tell what is legit, worth the price, safe, and right for their trip.',
      approach: 'Reframed the product from audio content to "Travel with Confidence", then shaped research, design and growth around that promise.',
      outcome: 'Android MVP live since 10 Oct 2026, iOS rolling out. 600+ users across beta and live registration. Marketing starts next.',
    },
    shipped: {
      asOf: 'Android live 10 Oct 2026 · iOS rolling out',
      items: [
        { name: 'Onboarding redesign', status: 'shipped' },
        { name: 'Stories, walking tours, narrators and languages', status: 'shipped' },
        { name: 'Coins and in-app purchases', status: 'shipped' },
        { name: 'Notification system', status: 'shipped' },
        { name: 'SOS and emergency flow', status: 'shipped' },
        { name: 'Offline downloads', status: 'shipped' },
        { name: 'Experience booking and pre-experience brief', status: 'shipped' },
        { name: 'Family Tracking', status: 'designed' },
      ],
      note: '',
    },
    // Hero media: export a phone frame from Figma (e.g. Store Screenshots v3) to /public/images/work/gamana/hero.webp, then set image + alt.
    visual: { art: { pattern: 'nodes', colors: ['#4b22d6', '#c6f65a'] }, image: '', video: '', alt: '' },
    problem:
      'Travellers are not short of information. They hesitate because they cannot tell whether an experience is legit, worth the price, safe, and right for their trip, and no listing answers those questions in one place.',
    context:
      'Gamana started as an audio-storytelling app: narrated stories at real places and tours, unlocked with coins. The research changed the frame. People were not stopped by a lack of content or inspiration. They were stopped by four questions: Is it legit? Is it worth the price? What if plans change or go wrong? Will it fit my trip and style? "Travel with Confidence" is the answer to those, and it explains what Gamana chooses not to be: another discovery app competing with Viator or GetYourGuide.',
    goals: [],
    role:
      'Head of Product & Growth and a core team member. I led positioning and research, owned product design and the design system across the sprints, shaped the booking layer and the growth plan, and worked with engineering to ship the Flutter app.',
    team: [],
    tools: ['Figma', 'FigJam', 'Flutter', 'Cursor', 'Claude', 'Notion'],
    research: {
      method:
        'Signal synthesis from public traveller conversation (Reddit, Quora, TripAdvisor, operator and blogger content), cross-checked against OTA, government and search-trend data. Booking data shows what people bought. Forums show what almost stopped them.',
      personas: [
        { name: 'Solo', job: 'Proof, more than escape. Showing she can do this safely.', friction: 'Convincing a sceptical household.' },
        { name: 'Couple', job: 'Romance with a quiet logistical filter.', friction: 'Accommodation and privacy, especially for unmarried couples.' },
        { name: 'Family', job: 'A time-boxed trip with older parents.', friction: 'Pacing, rest points and honest walking distances.' },
        { name: 'Friends', job: 'A shared memory without wrecking the friendship.', friction: 'Coordination and mismatched budgets.' },
      ],
      anxieties: ['Is it legit?', 'Is it worth the price?', 'What if plans change or go wrong?', 'Will it fit my trip and style?'],
      limits:
        'This is a synthesis of signal, not primary research or usability testing. The journey-map quotes are constructed in persona voice and the emotion curves are estimated shapes. The 6 to 8 traveller intercepts I recommended have not been run yet.',
    },
    insights: [
      { title: 'Parents are the real barrier', text: 'For solo women the trip is not the hard part. Convincing the household is, and the persuasion tool is a documented itinerary: hotels, trains, budget.' },
      { title: 'Couples see a filter booking data hides', text: 'Unmarried couples avoid certain destinations entirely. That shows up as a place never searched, not a cancelled booking.' },
      { title: 'Varanasi restates the positioning', text: 'Fake blessings, donation pressure and inflated boat rides are a near-exact list of what a confidence product should defuse.' },
      { title: 'Ladakh is an offline story', text: 'Connectivity is mapped network by network in planning content. Offline download was already built and undersold.' },
      { title: 'Jorhat has no peer reassurance', text: 'Fast-growing, with almost no organic travel community. A first-mover window for credible content.' },
    ],
    quote: null,
    numbers: [
      { value: '4', label: 'personas, each with one job' },
      { value: '9', label: 'destinations mapped against them' },
      { value: '12', label: 'journey maps across three trip segments' },
      { value: '4', label: 'anxiety clusters behind the product and the store listing' },
    ],
    reframe: 'Know before you book. Understand when you’re there.',
    features: [],
    // One card per decision. Screens: export frames from Figma to /public/images/work/gamana/<id>-<n>.webp
    // (402x874 phone frames, WebP, ~2x), then fill `image` and `alt`. `node` is the Figma node id to export.
    decisions: [
      {
        id: 'onboarding',
        title: 'Onboarding, redesigned twice',
        status: 'shipped',
        situation: 'The first onboarding went through a new flow in Sprints 6 and 7, and one direction was rejected along the way.',
        // TODO(Sameer): why the first direction was rejected, and what the Sprint 25 hook changed.
        decision: 'Rebuilt it as four steps: a hook, stories, the walking tour, and creating your own tour.',
        outcome: 'The Sprint 25 flow shipped in the Android MVP.',
        screens: [
          { image: '', alt: 'Onboarding step 1, the hook', label: 'Hook', node: '9084:172' },
          { image: '', alt: 'Onboarding step 2, stories', label: 'Stories', node: '9084:182' },
          { image: '', alt: 'Onboarding step 3, the walking tour', label: 'Walking tour', node: '9084:192' },
          { image: '', alt: 'Onboarding step 4, create your own tour', label: 'Create a tour', node: '9084:202' },
        ],
      },
      {
        id: 'coins',
        title: 'Coins first, subscription later',
        status: 'shipped',
        situation: 'Audio and guide apps in this category sell per tour, by subscription, or give it away. Gamana’s value is confidence, not minutes of audio.',
        decision: 'Coins as an internal value layer, priced by content type: story, walk, tour, city pass. A subscription sits above coins later, once purchases are instrumented, so it does not cannibalise one-time unlocks.',
        outcome: 'Coins and in-app purchases shipped in the Android MVP.',
        screens: [
          { image: '', alt: 'Gamana Coins screen', label: 'Coins', node: '3343:8865' },
          { image: '', alt: 'Profile and coin wallet', label: 'Profile and wallet', node: '6175:10282' },
          { image: '', alt: 'In-app purchase coin pack', label: 'Coin pack', node: '6049:6795' },
        ],
      },
      {
        id: 'safety',
        title: 'Safety built into the product',
        status: 'shipped',
        situation: 'One of the four anxiety clusters was "what if plans change or go wrong?" For solo travellers and families that includes personal safety.',
        decision: 'An SOS and emergency flow, and a safety advisory tier inside the notification system, rather than a help page. Family Tracking was designed in Sprint 17 and is not in this release.',
        outcome: 'SOS and emergency flows shipped in the Android MVP.',
        screens: [
          { image: '', alt: 'SOS system screens', label: 'SOS', node: '1772:8117' },
          { image: '', alt: 'Emergency flow screens', label: 'Emergency flow', node: '1785:11173' },
        ],
      },
      {
        id: 'notifications',
        title: 'Notifications as a lifecycle system',
        status: 'shipped',
        situation: 'Most of Gamana’s useful moments happen away from the app: landing in a city, losing signal, running low on coins or storage.',
        decision: 'Designed notifications as a system of 166 triggers, including a safety advisory tier, instead of one-off pushes. Sprint 15 alone produced about 35 notification designs, from arrival alerts to offline-ready and low-coins updates.',
        outcome: 'Shipped in the Android MVP.',
        screens: [
          { image: '', alt: 'Alerts main screen', label: 'Alerts', node: '4934:702' },
          { image: '', alt: 'Airport alert notification', label: 'Airport alert', node: '5000:11486' },
          { image: '', alt: 'Offline ready notification', label: 'Offline ready', node: '5000:9978' },
        ],
      },
      {
        id: 'offline',
        title: 'Offline as a first-class feature',
        status: 'shipped',
        situation: 'The research found Ladakh’s connectivity gap mapped network by network in planning content. Gamana already had offline download and undersold it.',
        decision: 'Reworked the offline download flow across Sprints 10 to 16, added a dedicated download manager in Sprint 23, and made stories trigger offline through geofences.',
        outcome: 'June QA passed online walking tours and offline geofence triggers on iOS and Android.',
        screens: [
          { image: '', alt: 'Offline downloads', label: 'Offline downloads', node: '3551:12255' },
          { image: '', alt: 'New offline download flow', label: 'New download flow', node: '5256:6004' },
          { image: '', alt: 'Download manager', label: 'Download manager', node: '8485:311' },
        ],
      },
      {
        id: 'booking',
        title: 'Booking, plus the layer around it',
        status: 'shipped',
        situation: 'Confidence does not end at "book now". The doubt sits before the booking and carries on until the traveller turns up.',
        decision: 'Add experiences without becoming a marketplace. Supply comes through Bókun and the operator’s own checkout handles payment. Gamana designs what surrounds the booking: a pre-experience brief, upcoming booking details, and a rating step after.',
        outcome: 'Booking and the pre-experience brief shipped in the Android MVP.',
        screens: [
          { image: '', alt: 'Experiences on the home screen', label: 'Experiences', node: '7718:266' },
          { image: '', alt: 'Booking review', label: 'Booking review', node: '8135:1623' },
          { image: '', alt: 'Pre-experience brief', label: 'Pre-experience brief', node: '8136:219' },
          { image: '', alt: 'Upcoming booking details', label: 'Booking details', node: '8136:337' },
        ],
      },
    ],
    process: [
      'Led the repositioning from audio content to "Travel with Confidence" after the research showed travellers stall on trust, not on content',
      'Ran the Traveller Decision Research: four personas, nine destinations, twelve journey maps and five interaction-model hypotheses',
      'Owned the design system and the design sprints, from Main UI v1.0 through Sprint 25',
      'Built the App Store and Play listing around the four anxieties, as an arc from doubt to clarity to trust to go',
      'Planned the first marketing push around a CAC-versus-first-purchase gate, and chose Traffic and Engagement objectives over App Installs because small daily budgets cannot clear Meta’s learning phase',
      'Defined the approach for AI assistants: enter as the cultural-intelligence layer, not as another trip planner',
    ],
    flow: [],
    failed: [
      { title: 'Validation is still pending', text: 'I recommended 6 to 8 traveller intercepts before committing engineering time. They have not run yet, and later work, the interaction models and the ad plan, builds on findings that still need that check.' },
      { title: 'Content lags the promise', text: 'Most of the nine destinations I mapped have no Gamana content yet, including Kerala, the biggest gap. Confidence is only as wide as the library behind it.' },
      { title: 'Catalog depth limits conversion', text: 'Experience listings are curated by hand. Automated catalog sync and manual booking inquiries were specified and deferred, so how many experiences can convert depends on how many the team adds.' },
      { title: 'Family Tracking did not ship', text: 'Designed in Sprint 17 and left out of this release.' },
    ],
    impact: [
      { value: '600+', label: 'users across beta and live registration' },
      { value: '18', label: 'months from first design file to public release' },
      { value: '10 Oct', label: 'Android MVP live, iOS rolling out' },
    ],
    impactNote:
      'Early traction, not outcome data. Marketing begins the week after launch. I will add install, activation and CAC numbers here when there are real ones.',
    outcome:
      'A product that says one thing, travel with confidence, and builds every layer toward it: research, design system, listing, safety, offline and booking.',
    testimonial: '',
    reflection:
      'The research told us where confidence is missing. The library has not caught up, and the findings still need the intercepts I recommended. Next: run them, then read real activation and CAC data from the first marketing push before building further on the interaction models.',
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
