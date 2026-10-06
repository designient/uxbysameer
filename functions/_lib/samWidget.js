// "Ask Sam" launcher and chat panel for the coming-soon page. The page is rendered by the
// middleware, so the widget ships as inline CSS, markup and a self-contained script.

const QUESTIONS = [
  'What does an AI-native product designer actually do?',
  'What agents and automations has Sameer built?',
  'Which brands has he designed for?',
  'Is he open to full-time roles or relocation?',
  'Can he build an AI agent for my team?',
  'How can I learn AI/UX from him?',
  'What is his Weekly AI Digest about?',
  'How were you built, Sam?',
];

const EMAIL = 'uxbysameer@gmail.com';

// Used when the live endpoint is unreachable or rate limited. Never links to locked pages.
const FALLBACKS = [
  {
    match: 'ai-native|what does|actually do',
    answer:
      'Sameer designs AI products end to end and builds the agents and automations behind them, so ideas become working products, not just mockups. He has led UX for SaaS platforms like EasyWebinar and Cashel Family, and ships with an AI-first build stack (Cursor, Claude Code, MCP, Supabase).',
  },
  {
    match: 'reloc|remote|full.?time|hire|role|job|recruit|resume|cv',
    answer: `Yes. Sameer is open to full-time roles, remote anywhere in the world or relocation for the right team. Email him at ${EMAIL} or connect on LinkedIn: https://www.linkedin.com/in/sameerul`,
  },
  {
    match: 'brand|client|lenovo|decathlon|easywebinar|gamana|company|companies',
    answer:
      'Brands on his record include Gamana, The Organization Learning Labs, EasyWebinar, Lenovo (the Yoga 900 laptop and the Lenovo Australia website), Decathlon (a self-checkout experience), Mashreq Bank, Cashel Family, Catalyse Digital and Cybonet, across 15+ years and 105+ shipped products.',
  },
  {
    match: 'how were you|built you|how do you work|who made you|are you',
    answer:
      "Sameer designed and built me himself. I'm grounded in his real work, rate-limited, and run at the edge on Cloudflare with OpenAI.",
  },
  {
    match: 'newsletter|digest|weekly|article|write',
    answer:
      "The UXBYSAMEER Weekly AI Digest gives honest takes on new AI models, tools and shifts, and whether they're actually worth checking. Every edition is at /newsletter",
  },
  {
    match: 'learn|cohort|course|mentor|student|teach|train|workshop|adplist',
    answer: `Sameer is a Top 1% ADPList mentor and has taught 650+ designers worldwide. Book 1:1 mentorship at https://adplist.org/mentors/sameer-ul-haque-Bn4u. For his AI/UX + automation cohort or training for your team, email ${EMAIL}. His most recent training was for SDAIA in Riyadh, Saudi Arabia.`,
  },
  {
    match: 'agent|automat|build|team|project|n8n|make|price|cost|mvp',
    answer: `Sameer builds agents and automations himself, from agentic AI workflows to Make and n8n pipelines that run a lean team's operations. Pricing depends on scope, so the best next step is a short intro call: ${EMAIL} or +91 7780363087`,
  },
];

const GREETING =
  "Hi, I'm Sam, Sameer's AI twin. Ask me about his work, the agents he builds, or how to work and learn with him while his new site is on the way.";

const avatar = (size) => `<img src="/avatar.jpg" alt="" width="${size}" height="${size}" />`;

export function samMarkup() {
  const config = JSON.stringify({ questions: QUESTIONS, fallbacks: FALLBACKS, greeting: GREETING, email: EMAIL }).replace(
    /</g,
    '\\u003c'
  );
  return `<div class="sam" data-sam>
  <button class="sam-launch" type="button" aria-label="Ask Sam, Sameer's AI twin" aria-haspopup="dialog" aria-controls="sam-panel" aria-expanded="false">
    <span class="sam-av">${avatar(36)}<span class="sam-online" aria-hidden="true"></span></span>
    <span class="sam-launch__label">Ask Sam</span>
  </button>
  <section id="sam-panel" class="sam-panel" role="dialog" aria-labelledby="sam-title" hidden>
    <header class="sam-head">
      <span class="sam-av">${avatar(40)}<span class="sam-online" aria-hidden="true"></span></span>
      <div class="sam-head__text">
        <p id="sam-title" class="sam-title">Sam <span>· Sameer's AI twin</span></p>
        <p class="sam-status">Online · replies in seconds</p>
      </div>
      <button class="sam-close" type="button" aria-label="Close chat">✕</button>
    </header>
    <div class="sam-log" role="log" aria-live="polite" aria-label="Conversation with Sam"></div>
    <div class="sam-suggest" aria-label="Suggested questions"></div>
    <form class="sam-form">
      <label class="sam-sr" for="sam-input">Ask Sam a question</label>
      <input id="sam-input" class="sam-input" type="text" name="message" placeholder="Ask about Sameer's work…" autocomplete="off" maxlength="500" required />
      <button class="sam-send" type="submit">Send</button>
    </form>
    <p class="sam-fine">AI can make mistakes. For anything important, email <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
  </section>
  <script type="application/json" class="sam-config">${config}</script>
</div>`;
}

// Kept as a raw string: the Functions bundler injects helpers into real functions, so toString() won't run in the browser.
export const SAM_SCRIPT = String.raw`(() => {
  const root = document.querySelector('[data-sam]');
  if (!root) return;
  const config = JSON.parse(root.querySelector('.sam-config').textContent);
  const launch = root.querySelector('.sam-launch');
  const panel = root.querySelector('.sam-panel');
  const close = root.querySelector('.sam-close');
  const log = root.querySelector('.sam-log');
  const suggest = root.querySelector('.sam-suggest');
  const form = root.querySelector('.sam-form');
  const input = root.querySelector('.sam-input');
  const send = root.querySelector('.sam-send');
  const history = [];
  const asked = new Set();
  let busy = false;
  let started = false;

  const footer = document.querySelector('footer');
  let baseBottom = 0;
  let liftQueued = false;
  function measureBase() {
    root.style.setProperty('--sam-lift', '0px');
    baseBottom = window.innerHeight - launch.getBoundingClientRect().bottom;
  }
  function updateLift() {
    liftQueued = false;
    if (!footer) return;
    const overlap = window.innerHeight - footer.getBoundingClientRect().top + 12 - baseBottom;
    root.style.setProperty('--sam-lift', Math.max(0, Math.round(overlap)) + 'px');
  }
  function queueLift() {
    if (liftQueued) return;
    liftQueued = true;
    requestAnimationFrame(updateLift);
  }
  measureBase();
  updateLift();
  window.addEventListener('scroll', queueLift, { passive: true });
  window.addEventListener('resize', () => {
    measureBase();
    updateLift();
  });

  const escapeHTML = (s) =>
    s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  function linkify(text) {
    return escapeHTML(text)
      .replace(/(https?:\/\/[^\s)]+[^\s).,])/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')
      .replace(/([\w.+-]+@[\w-]+\.[\w.]+[\w])/g, '<a href="mailto:$1">$1</a>')
      .replace(/\+\d[\d ]{8,}\d/g, (n) => '<a href="tel:' + n.replace(/ /g, '') + '">' + n + '</a>')
      .replace(/(^|\s)(\/newsletter)\b/g, '$1<a href="$2">$2</a>');
  }

  function fallbackAnswer(text) {
    const hit = config.fallbacks.find((f) => new RegExp(f.match, 'i').test(text));
    return hit
      ? hit.answer
      : 'My live connection is resting right now. For anything specific, email Sameer at ' +
          config.email +
          " and he'll reply personally.";
  }

  function addMessage(role, text) {
    const el = document.createElement('div');
    el.className = 'sam-msg sam-msg--' + role;
    if (text) el.innerHTML = linkify(text);
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  function renderSuggestions(list, withMore) {
    suggest.innerHTML = '';
    list.forEach((q) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'sam-chip';
      b.textContent = q;
      b.addEventListener('click', () => ask(q));
      suggest.appendChild(b);
    });
    if (withMore) {
      const more = document.createElement('button');
      more.type = 'button';
      more.className = 'sam-chip sam-chip--more';
      more.textContent = 'More questions';
      more.addEventListener('click', () => {
        renderSuggestions(config.questions.filter((q) => !asked.has(q)), false);
        suggest.querySelector('.sam-chip')?.focus();
      });
      suggest.appendChild(more);
    }
  }

  const unused = () => config.questions.filter((q) => !asked.has(q));

  async function ask(text) {
    text = text.trim();
    if (busy || !text) return;
    busy = true;
    send.disabled = true;
    asked.add(text);
    suggest.innerHTML = '';
    addMessage('user', text);
    history.push({ role: 'user', content: text });

    const bubble = addMessage('bot', '');
    bubble.classList.add('sam-msg--typing');
    bubble.setAttribute('aria-label', 'Sam is typing');
    bubble.innerHTML = '<span></span><span></span><span></span>';
    let reply = '';

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.slice(-10), context: 'preview' }),
      });
      if (!res.ok || !res.body) throw new Error('HTTP ' + res.status);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      bubble.classList.remove('sam-msg--typing');
      bubble.removeAttribute('aria-label');
      bubble.textContent = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        bubble.textContent = reply;
        log.scrollTop = log.scrollHeight;
      }
      if (!reply.trim()) throw new Error('Empty reply');
    } catch {
      reply = fallbackAnswer(text);
      bubble.classList.remove('sam-msg--typing');
      bubble.removeAttribute('aria-label');
    }

    bubble.innerHTML = linkify(reply);
    history.push({ role: 'assistant', content: reply });
    log.scrollTop = log.scrollHeight;
    renderSuggestions(unused().slice(0, 2), false);
    busy = false;
    send.disabled = false;
  }

  function open() {
    panel.hidden = false;
    root.classList.add('is-open');
    launch.setAttribute('aria-expanded', 'true');
    if (!started) {
      started = true;
      addMessage('bot', config.greeting);
      renderSuggestions(config.questions.slice(0, 4), true);
    }
    requestAnimationFrame(() => input.focus({ preventScroll: true }));
  }

  function hide() {
    panel.hidden = true;
    root.classList.remove('is-open');
    launch.setAttribute('aria-expanded', 'false');
    launch.focus();
  }

  launch.addEventListener('click', () => (panel.hidden ? open() : hide()));
  close.addEventListener('click', hide);
  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) hide();
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = '';
    ask(text);
  });
})();`;

export const SAM_CSS = `
  footer{margin-top:48px}
  .sam{font-family:Inter,system-ui,sans-serif;text-align:left}
  .sam-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
  .sam-av{position:relative;flex:none;width:36px;height:36px;border-radius:50%;background:conic-gradient(from 200deg,var(--violet),var(--pink),#ff6a2b,var(--violet))}
  .sam-av img{width:100%;height:100%;border-radius:50%;object-fit:cover;display:block}
  .sam-online{position:absolute;right:-1px;bottom:-1px;width:11px;height:11px;border-radius:50%;background:#22c55e;border:2px solid var(--bg)}
  .sam-launch{position:fixed;right:clamp(16px,3vw,32px);bottom:calc(clamp(16px,3vw,28px) + var(--sam-lift,0px));z-index:50;display:inline-flex;align-items:center;gap:12px;padding:8px 22px 8px 8px;border:0;border-radius:999px;background:var(--text);color:var(--bg);font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.08em;text-transform:uppercase;box-shadow:0 10px 30px rgba(17,17,17,.22);transition:transform .25s cubic-bezier(.16,1,.3,1),background .2s}
  .sam-launch:hover{transform:translateY(-2px);background:var(--violet)}
  .sam-launch:focus-visible,.sam-close:focus-visible,.sam-chip:focus-visible,.sam-send:focus-visible,.sam-input:focus-visible{outline:2px solid var(--violet);outline-offset:3px}
  .sam-launch .sam-online{border-color:var(--text)}
  .sam.is-open .sam-launch{background:var(--violet)}
  .sam-panel{position:fixed;right:clamp(16px,3vw,32px);bottom:calc(clamp(16px,3vw,28px) + 68px + var(--sam-lift,0px));z-index:60;display:flex;flex-direction:column;width:min(400px,calc(100vw - 32px));height:min(620px,calc(100dvh - 120px - var(--sam-lift,0px)));background:var(--bg);border:1px solid var(--line);border-radius:24px;box-shadow:0 24px 60px rgba(17,17,17,.2);overflow:hidden}
  .sam-panel[hidden]{display:none}
  @media (prefers-reduced-motion:no-preference){.sam-panel{animation:sam-in .35s cubic-bezier(.16,1,.3,1)}}
  @keyframes sam-in{from{opacity:0;transform:translateY(16px) scale(.98)}}
  .sam-head{display:flex;align-items:center;gap:12px;padding:16px 16px 14px 18px;border-bottom:1px solid var(--line);background:#fff}
  .sam-head .sam-av{width:40px;height:40px}
  .sam-head .sam-online{border-color:#fff}
  .sam-head__text{flex:1;min-width:0}
  .sam-title{font-family:Archivo,sans-serif;font-weight:900;font-stretch:78%;font-size:20px;text-transform:uppercase;line-height:1}
  .sam-title span{font-family:'Instrument Serif',serif;font-weight:400;font-stretch:normal;text-transform:none;font-size:18px;color:var(--violet)}
  .sam-status{margin-top:4px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
  .sam-close{flex:none;width:36px;height:36px;border-radius:50%;border:1px solid var(--line);background:transparent;color:var(--text);font-size:14px}
  .sam-close:hover{background:var(--text);color:var(--bg)}
  .sam-log{flex:1;min-height:88px;overflow-y:auto;overscroll-behavior:contain;display:flex;flex-direction:column;gap:10px;padding:18px}
  .sam-msg{max-width:88%;padding:11px 14px;border-radius:18px;font-size:14.5px;line-height:1.5;overflow-wrap:anywhere}
  .sam-msg--bot{align-self:flex-start;background:#fff;border-bottom-left-radius:6px}
  .sam-msg--user{align-self:flex-end;background:var(--text);color:var(--bg);border-bottom-right-radius:6px}
  .sam-msg a{color:var(--violet);text-decoration:underline;text-underline-offset:2px}
  .sam-msg--typing{display:flex;gap:4px;align-items:center}
  .sam-msg--typing span{width:6px;height:6px;border-radius:50%;background:var(--muted);animation:sam-dot 1s ease-in-out infinite}
  .sam-msg--typing span:nth-child(2){animation-delay:.15s}
  .sam-msg--typing span:nth-child(3){animation-delay:.3s}
  @keyframes sam-dot{50%{opacity:.25;transform:translateY(-3px)}}
  .sam-suggest{flex:none;display:flex;flex-wrap:wrap;gap:6px;max-height:30%;overflow-y:auto;padding:0 18px 12px}
  .sam-suggest:empty{display:none}
  .sam-chip{padding:8px 12px;border-radius:999px;border:1px solid var(--line);background:#fff;color:var(--text);font:inherit;font-size:13px;line-height:1.3;text-align:left;transition:border-color .2s,background .2s}
  .sam-chip:hover{border-color:var(--violet);color:var(--violet)}
  .sam-chip--more{background:transparent;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.06em;text-transform:uppercase}
  .sam .sam-form{display:flex;flex-direction:row;align-items:stretch;gap:8px;margin:0;padding:12px 14px;border-top:1px solid var(--line);background:#fff}
  .sam .sam-input{flex:1;min-width:0;padding:12px 16px;border-radius:999px;border:1px solid var(--line);background:var(--bg);font:inherit;font-size:16px}
  .sam-send{flex:none;padding:0 18px;border:0;border-radius:999px;background:var(--text);color:var(--bg);font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.08em;text-transform:uppercase}
  .sam-send:hover{background:var(--violet)}
  .sam-send:disabled{opacity:.5}
  .sam-fine{padding:0 14px 12px;background:#fff;font-size:11.5px;color:var(--muted)}
  .sam-fine a{color:inherit}
  @media (max-width:560px){
    .sam-launch{padding:6px;gap:0}
    .sam-launch .sam-av{width:44px;height:44px}
    .sam-launch__label{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
    .sam-panel{left:0;right:0;bottom:0;width:100%;height:min(88dvh,680px);border-radius:24px 24px 0 0;border-bottom:0}
    .sam.is-open .sam-launch{display:none}
  }
  @media (max-width:360px){
    footer{margin-top:0}
    .sam{display:flex;justify-content:center;padding:8px 20px 0}
    .sam-launch{position:static;padding:6px 20px 6px 6px;gap:10px}
    .sam-launch .sam-av{width:36px;height:36px}
    .sam-launch__label{position:static;width:auto;height:auto;overflow:visible;clip:auto}
    .sam.is-open .sam-launch{display:inline-flex}
  }
  @media (prefers-reduced-motion:reduce){.sam-msg--typing span{animation:none}}
`;
