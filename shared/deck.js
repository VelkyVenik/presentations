/* ============================================================
   deck.js — shared runtime for talk decks
   Usage (at the end of <body>, after .deck-ui):
     <script src="../shared/deck.js" data-minutes="40"></script>
   Presenter-timer length = data-minutes (default 15).
   Nav: arrows / space / PageUp-Down · Home/End · F = fullscreen
             T = timer (show+start) · R = restart · dots = jump.
   Intentionally NO click-to-advance.
   ============================================================ */
(function () {
  const TALK_MINUTES = parseInt(document.currentScript?.dataset.minutes, 10) || 15;

  // Cloudflare Web Analytics beacon
  const cfb = document.createElement('script');
  cfb.defer = true;
  cfb.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  cfb.setAttribute('data-cf-beacon', '{"token": "95d29dbc70cd4b92bb094c8c52e9ca0d"}');
  document.head.appendChild(cfb);

  const slides = [...document.querySelectorAll('.slide')];
  const counter = document.querySelector('.deck-counter');
  const dotsWrap = document.querySelector('.deck-dots');
  const progressFill = document.querySelector('.deck-progress-fill');
  const hint = document.querySelector('.deck-hint');
  const timerEl = document.getElementById('timer');
  let i = 0;

  slides.forEach((_, k) => {
    const d = document.createElement('b');
    d.addEventListener('click', (e) => { e.stopPropagation(); show(k); });
    dotsWrap.appendChild(d);
  });
  const dots = [...dotsWrap.children];

  const MOBILE = window.matchMedia('(max-width: 819px)').matches;
  if (MOBILE) {
    document.documentElement.classList.add('m');
    const vp = document.querySelector('meta[name=viewport]');
    if (vp) vp.setAttribute('content', 'width=1100');
  }

  function fit(slide) {
    if (MOBILE) return;
    const stage = slide.querySelector('.stage');
    if (!stage) return;
    stage.style.transform = 'none';
    stage.style.zoom = '1';
    const w = stage.offsetWidth, h = stage.offsetHeight;
    if (!w || !h) return;
    const margin = 0.92;
    stage.style.zoom = Math.min((window.innerWidth * margin) / w, (window.innerHeight * margin) / h, 1.7);
  }

  function show(n) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach((s, k) => s.classList.toggle('active', k === i));
    dots.forEach((d, k) => d.classList.toggle('on', k === i));
    counter.textContent = (i + 1) + ' / ' + slides.length;
    progressFill.style.width = (slides.length > 1 ? i / (slides.length - 1) * 100 : 0) + '%';
    history.replaceState(null, '', '#' + (i + 1));
    requestAnimationFrame(() => fit(slides[i]));
    if (i > 0) hint.classList.add('gone');
  }

  document.addEventListener('keydown', (e) => {
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) { show(i + 1); e.preventDefault(); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { show(i - 1); e.preventDefault(); }
    else if (e.key === 'Home') show(0);
    else if (e.key === 'End') show(slides.length - 1);
    else if (e.key === 'f' || e.key === 'F') {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
      else document.exitFullscreen?.();
    }
    else if (e.key === 't' || e.key === 'T') {
      const nowHidden = timerEl.classList.toggle('hidden');
      if (!nowHidden) { timerStart = Date.now(); tickTimer(); }
    }
    else if (e.key === 'r' || e.key === 'R') { timerStart = Date.now(); tickTimer(); }
  });
  /* Intentionally no click-to-advance. */

  window.addEventListener('resize', () => { if (!MOBILE) fit(slides[i]); });
  window.addEventListener('load', () => { if (!MOBILE) slides.forEach(fit); });

  let timerStart = Date.now();
  function tickTimer() {
    const remain = TALK_MINUTES * 60 - (Date.now() - timerStart) / 1000;
    const over = remain < 0;
    const a = Math.abs(remain);
    const m = Math.floor(a / 60), s = Math.floor(a % 60);
    timerEl.textContent = (over ? '+' : '') + m + ':' + String(s).padStart(2, '0');
    timerEl.classList.toggle('danger', over || remain <= 60);
    timerEl.classList.toggle('warn', !over && remain > 60 && remain <= 5 * 60);
  }
  if (timerEl) { setInterval(tickTimer, 250); tickTimer(); }

  const start = parseInt(location.hash.slice(1), 10) - 1;
  const begin = () => { show(Number.isNaN(start) ? 0 : start); if (!MOBILE) slides.forEach(fit); };
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(begin);
    setTimeout(begin, 600);
  } else {
    begin();
  }
})();
