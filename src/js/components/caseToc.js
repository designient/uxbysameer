const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Highlights the "On this page" link for the section currently in view. Clicks are handled by initAnchorScroll. */
export function initCaseToc() {
  const links = [...document.querySelectorAll('[data-toc-link]')];
  if (!links.length) return;

  const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const setActive = (id) => links.forEach((a) => a.classList.toggle('is-active', a === byId.get(id)));

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length) setActive(visible[0].target.id);
    },
    { rootMargin: '-35% 0px -60% 0px' }
  );
  byId.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}

/** Case media videos autoplay muted unless the visitor prefers reduced motion. */
export function initCaseMedia() {
  if (reducedMotion) return;
  document.querySelectorAll('video[data-autoplay]').forEach((video) => {
    video.autoplay = true;
    video.play().catch(() => {});
  });
}
