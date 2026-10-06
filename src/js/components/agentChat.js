import { site } from '../data/content.js';

const GREETING =
  "Hi, I'm Sam, Sameer's AI twin. Ask me about his work, how he can help your team, or how to learn AI/UX and automation with him.";

const MAX_TURNS = 10;

// Used when the live endpoint is unreachable (local dev without wrangler, missing API key, rate limit).
const FALLBACKS = [
  {
    match: /reloc|remote|visa|time ?zone|country|move/i,
    answer:
      'Yes. Sameer is open to full-time roles remote anywhere in the world, and to relocation for the right team. The hiring brief has the details: /hire.html',
  },
  {
    match: /hire|why|full.?time|role|job|recruit|resume|cv/i,
    answer:
      "Sameer is an AI-native product designer with 14 years and 105+ shipped products for brands like EasyWebinar, Lenovo, Decathlon and Mashreq. He doesn't stop at design: he builds agentic AI workflows and automation pipelines himself. Read the 30-second brief at /hire.html or download his resume.",
  },
  {
    match: /build|agent|automat|project|client|price|cost|rate|mvp|n8n|make/i,
    answer:
      'Sameer designs AI products and builds agents and automations, from idea to working MVP. Engagements range from focused agent builds to fractional design leadership; pricing depends on scope, so the best next step is a short intro call. Offers are at /work-with-me.html',
  },
  {
    match: /cohort|learn|course|mentor|student|teach|train|workshop|adplist/i,
    answer:
      "Sameer is a Top 1% ADPList mentor and has taught 650+ designers worldwide. You can book 1:1 mentorship on ADPList, join the waitlist for his AI/UX + automation cohort, or bring him in to train your team. Everything is at /learn.html",
  },
];

function fallbackAnswer(text) {
  const hit = FALLBACKS.find((f) => f.match.test(text));
  return hit
    ? hit.answer
    : `My live connection is resting right now. For anything specific, email Sameer at ${site.email} and he'll reply personally.`;
}

const escapeHTML = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function linkify(text) {
  return escapeHTML(text)
    .replace(/(https?:\/\/[^\s)]+[^\s).,])/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')
    .replace(/([\w.+-]+@[\w-]+\.[\w.]+[\w])/g, '<a href="mailto:$1">$1</a>')
    .replace(/(^|\s)(\/[\w-]+\.html(?:#[\w-]+)?)/g, '$1<a href="$2">$2</a>');
}

export function initAgentChat() {
  const chat = document.querySelector('[data-chat]');
  if (!chat) return;

  const log = chat.querySelector('.chat__log');
  const form = chat.querySelector('.chat__form');
  const input = chat.querySelector('.chat__input');
  const send = chat.querySelector('.chat__send');
  const history = [];
  let busy = false;

  function addMessage(role, text) {
    const el = document.createElement('div');
    el.className = `msg msg--${role === 'user' ? 'user' : 'bot'}`;
    if (text) el.innerHTML = linkify(text);
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  function typing() {
    const el = addMessage('bot', '');
    el.classList.add('msg--typing');
    el.setAttribute('aria-label', 'Agent is typing');
    el.innerHTML = '<span></span><span></span><span></span>';
    return el;
  }

  async function ask(text) {
    if (busy || !text.trim()) return;
    busy = true;
    send.disabled = true;
    addMessage('user', text);
    history.push({ role: 'user', content: text });
    const bubble = typing();
    let reply = '';

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.slice(-MAX_TURNS) }),
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      bubble.classList.remove('msg--typing');
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
      bubble.classList.remove('msg--typing');
      bubble.removeAttribute('aria-label');
    }

    bubble.innerHTML = linkify(reply);
    history.push({ role: 'assistant', content: reply });
    log.scrollTop = log.scrollHeight;
    busy = false;
    send.disabled = false;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = '';
    ask(text);
  });

  chat.querySelectorAll('.chat__suggest button').forEach((btn) =>
    btn.addEventListener('click', () => ask(btn.textContent))
  );

  addMessage('bot', GREETING);
}
