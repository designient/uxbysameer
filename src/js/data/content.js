// Site content. Media fields (`image`, `video`, `photo`) are optional: when empty,
// the generative card art is shown instead, so drop real files into /public/images
// and /public/videos and reference them here.

export const site = {
  name: 'Sameer Ul Haque',
  title: 'AI-Native Product Designer',
  email: 'uxbysameer@gmail.com',
  location: 'Bengaluru, India',
  timeZone: 'Asia/Kolkata',
  linkedin: 'https://www.linkedin.com/in/uxbysameer',
  adplist: 'https://adplist.org/mentors/sameer-ul-haque-Bn4u',
  resume: '/Sameer Ul Haque Resume Final.pdf',
  booking: 'mailto:uxbysameer@gmail.com?subject=Intro%20call%20with%20Sameer',
  avatar: '/avatar.jpg',
};

export const stats = [
  { value: 14, suffix: '+', label: 'Years shipping products' },
  { value: 105, suffix: '+', label: 'Products shipped' },
  { value: 650, suffix: '+', label: 'Designers taught & mentored' },
  { value: 40, suffix: '+', label: 'SaaS engagements' },
];

export const brands = [
  'Lenovo', 'Decathlon', 'Mashreq Bank', 'TCS', 'Infosys',
  'EasyWebinar', 'Cashel Family', 'Catalyse Digital', 'Cybonet',
];

// Hero story deck. Each card opens a chapter sheet; order is the reading order.
export const stories = [
  {
    id: 'who',
    label: 'Who I Am',
    titleSans: 'Who',
    titleSerif: 'I am',
    art: { pattern: 'checker', colors: ['#4b22d6', '#f5b8f0'] },
    photo: '/sameer-who-i-am.webp',
    body: [
      "I'm Sameer. For 14 years I've designed and shipped products, more than 105 of them, for brands like Lenovo, Decathlon and Mashreq.",
      'Today I design AI-native products and build the agents and automations behind them. I take an idea from first sketch to a working MVP, without waiting on a large team.',
    ],
    facts: ['14+ years', '105+ products', 'MIT-certified in AI & ML'],
    cta: { label: 'Read the hiring brief', href: '/hire.html' },
  },
  {
    id: 'agent',
    label: 'Agent Builder',
    titleSans: 'Agent',
    titleSerif: 'builder',
    art: { pattern: 'nodes', colors: ['#111111', '#c6f65a'] },
    body: [
      'I founded Gamana, an AI-native travel concierge, and took it from zero to MVP. I designed the agentic workflows that generate personalised itineraries, and shipped the product with an AI-first build stack.',
      'Behind the product, I run lean operations on automation pipelines built with Make and n8n. At Designient, bringing AI into the design workflow cut prototype cycles by 40%.',
    ],
    facts: ['Agentic workflows', 'Make + n8n', '40% faster prototyping'],
    cta: { label: 'Ask my AI agent', href: '#agent' },
  },
  {
    id: 'mentor',
    label: 'Top 1% Mentor',
    titleSans: 'Top 1%',
    titleSerif: 'mentor',
    art: { pattern: 'rings', colors: ['#ff6a2b', '#ffd84a'] },
    body: [
      'ADPList has recognised me as a Top 1% mentor multiple times. Designers from around the world book sessions with me for portfolio reviews, career moves and AI-native ways of working.',
      'Mentoring keeps me honest: explaining a design decision to someone else is the fastest way to find out if it holds up.',
    ],
    facts: ['Top 1% on ADPList', 'Multiple times', 'Global mentees'],
    cta: { label: 'Book a session', href: 'https://adplist.org/mentors/sameer-ul-haque-Bn4u', external: true },
  },
  {
    id: 'teacher',
    label: '650+ Designers',
    titleSans: '650+',
    titleSerif: 'designers',
    art: { pattern: 'dots', colors: ['#2f5bff', '#63d8ea'] },
    body: [
      "I've taught and mentored more than 650 product designers worldwide.",
      'At Designient School, over 350 of my students landed roles at companies like Mashreq Bank, TCS and Infosys. Now I teach the skill set I use every day: AI/UX, automation and agent building.',
    ],
    facts: ['650+ taught', '350+ placed', 'AI/UX curriculum'],
    cta: { label: 'Learn with me', href: '/learn.html' },
  },
  {
    id: 'trainer',
    label: 'Corporate Trainer',
    titleSans: 'Boardroom',
    titleSerif: 'trainer',
    art: { pattern: 'stripes', colors: ['#2f8a66', '#f5b8f0'] },
    body: [
      "I've led international corporate trainings for teams that want to design and build with AI, not just talk about it.",
      'Workshops are hands-on: teams leave with their own prototypes, automations and a playbook they can keep using.',
    ],
    facts: ['International', 'Hands-on workshops', 'AI-native teams'],
    cta: { label: 'Train your team', href: '/learn.html#corporate' },
  },
  {
    id: 'global',
    label: 'Global Talent',
    titleSans: 'Global',
    titleSerif: 'talent',
    art: { pattern: 'waves', colors: ['#e8322f', '#63d8ea'] },
    body: [
      "I've shipped for international teams across time zones, from Lenovo's Australian web presence to Decathlon's self-checkout experience and Mashreq's design team.",
      "I'm open to full-time roles, remote anywhere in the world or with relocation for the right team.",
    ],
    facts: ['Remote worldwide', 'Open to relocation', 'Async-first'],
    cta: { label: 'Hire me full-time', href: '/hire.html' },
  },
];

export const projects = [
  {
    slug: 'gamana',
    title: 'Gamana',
    subtitle: 'AI-native travel concierge, zero to MVP',
    tags: ['AI Agents', 'Founder', 'Zero to MVP'],
    art: { pattern: 'nodes', colors: ['#4b22d6', '#c6f65a'] },
    image: '',
    href: '/work/gamana.html',
    featured: true,
  },
  {
    slug: 'ops-automation',
    title: 'Lean Ops Autopilot',
    subtitle: 'Make + n8n pipelines that run a startup with a tiny team',
    tags: ['Automation', 'n8n', 'Make'],
    art: { pattern: 'stripes', colors: ['#111111', '#ffd84a'] },
    image: '',
    href: '/work/ops-automation.html',
  },
  {
    slug: 'portfolio-agent',
    title: 'Ask Sameer Agent',
    subtitle: 'A grounded AI agent that answers recruiters and clients',
    tags: ['LLM', 'Agent UX', 'Edge'],
    art: { pattern: 'dots', colors: ['#5b3bff', '#f5b8f0'] },
    image: '',
    href: '/work/portfolio-agent.html',
  },
  {
    slug: 'cashel',
    title: 'Cashel Family',
    subtitle: 'Fintech web app, drop-off reduction',
    tags: ['Fintech', 'UX Lead'],
    art: { pattern: 'rings', colors: ['#a78bfa', '#ffffff'] },
    image: '',
    href: '/work/cashel.html',
  },
  {
    slug: 'catalyse',
    title: 'Catalyse Referrer',
    subtitle: 'Hiring and referral SaaS platform',
    tags: ['SaaS', 'B2B'],
    art: { pattern: 'checker', colors: ['#2f8a66', '#c6f65a'] },
    image: '',
    href: '/work/catalyse.html',
  },
  {
    slug: 'cybonet',
    title: 'Cybonet Mail Secure',
    subtitle: 'Enterprise mobile security app',
    tags: ['Enterprise', 'Mobile'],
    art: { pattern: 'waves', colors: ['#f472b6', '#111111'] },
    image: '',
    href: '/work/cybonet.html',
  },
];

// AI Lab: agents, automations and experiments. Set `video` to a looping .mp4/.webm in /public/videos.
export const lab = [
  {
    title: 'Itinerary agent',
    kind: 'Agent',
    outcome: 'Turns a traveller’s preferences into a personalised day-by-day plan inside Gamana.',
    stack: ['LLM APIs', 'Agentic workflow', 'Cursor'],
    art: { pattern: 'nodes', colors: ['#4b22d6', '#c6f65a'] },
    video: '',
    href: '/work/gamana.html',
  },
  {
    title: 'Ops autopilot',
    kind: 'Automation',
    outcome: 'Make and n8n pipelines that handle the repetitive operations work of a lean team.',
    stack: ['n8n', 'Make', 'Webhooks'],
    art: { pattern: 'stripes', colors: ['#111111', '#ffd84a'] },
    video: '',
    href: '/work/ops-automation.html',
  },
  {
    title: 'Ask Sameer',
    kind: 'Agent',
    outcome: 'The agent on this site: grounded in my work, rate-limited, running at the edge.',
    stack: ['OpenAI', 'Cloudflare', 'Streaming UI'],
    art: { pattern: 'dots', colors: ['#5b3bff', '#f5b8f0'] },
    video: '',
    href: '#agent',
  },
  {
    title: 'AI prototyping loop',
    kind: 'Workflow',
    outcome: 'An AI-assisted design-to-prototype workflow that cut prototype cycles by 40% at Designient.',
    stack: ['Figma', 'AI codegen', 'Vibe coding'],
    art: { pattern: 'checker', colors: ['#ff6a2b', '#f5b8f0'] },
    video: '',
    href: '/work-with-me.html',
  },
];

export const experience = [
  {
    period: 'Mar 2025 — Present',
    role: 'Founder, Head of Product & Growth',
    company: 'Gamana',
    description:
      'Founded and launched the MVP of an AI-native travel concierge. Designed agentic AI workflows, shipped with an AI-first build stack, and built growth loops from zero.',
  },
  {
    period: 'Aug 2023 — Feb 2025',
    role: 'Director',
    company: 'Designient Technologies',
    description:
      'Led product strategy across 40+ SaaS engagements for global clients including Lenovo. Brought AI-assisted design into the workflow, cutting prototype cycles by 40%.',
  },
  {
    period: 'Aug 2022 — Aug 2023',
    role: 'UX Lead',
    company: 'Softobiz Technologies',
    description:
      'Led UX research and product design for SaaS platforms including EasyWebinar and Cashel Family. Won the Leadership Excellence Award in July 2023.',
  },
  {
    period: 'Nov 2018 — Jan 2022',
    role: 'UX Lead & Mentor',
    company: 'Designient School',
    description:
      'Taught and mentored hundreds of aspiring product designers; 350+ secured placements at Mashreq Bank, TCS and Infosys.',
  },
  {
    period: 'Apr 2014 — Sep 2018',
    role: 'Senior Product Designer',
    company: 'Salsoft Technologies',
    description:
      'Led product design for international clients across fintech, edtech and e-commerce.',
  },
];

// Testimonials grouped by audience. Groups with no entries are hidden automatically.
export const testimonials = {
  clients: {
    label: 'Employers & clients',
    items: [
      {
        quote:
          'Working with Sameer on the Lenovo Yoga 900 laptop and the Lenovo Australia website was a remarkable experience. His collaborative spirit and seamless communication made him an invaluable asset to our team.',
        name: 'Donna Bedford',
        role: 'Lenovo — Global SEO Strategist',
      },
      {
        quote:
          "Sameer's knack for understanding our needs and transforming them into intuitive, user-friendly designs was exceptional. His creativity and attention to detail on the Catalyse Referrer web app was very friendly and collaborative.",
        name: 'Manoj Bhaskaran Pillai',
        role: 'Catalyse Digital — CTO',
      },
      {
        quote:
          "Collaborating with Sameer on the self-checkout experience was fantastic. His innovative ideas and attention to detail significantly improved our app. Sameer's dedication made the project enjoyable and successful.",
        name: 'Sabrina Vigil',
        role: 'Decathlon — Lead Designer',
      },
    ],
  },
  mentees: {
    label: 'Mentees & students',
    items: [
      {
        quote:
          'Sameer is an excellent mentor and an extremely staunch UX Designer. He brings integrity and intelligence to his work, and his overall presence positively impacted the success of Designient.',
        name: 'Saumya Agarwal',
        role: 'Mashreq — Lead UX Designer',
      },
    ],
  },
  trainees: {
    label: 'Corporate trainees',
    items: [],
  },
};

// Learning offers, shown on /learn.html
export const learn = {
  cohort: {
    name: 'AI/UX + Automation Cohort',
    status: 'Waitlist open',
  },
};
