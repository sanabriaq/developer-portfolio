/* ============================================================
   02 — interações: contadores, reveal e scroll spy
   ============================================================ */

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- CONTADORES animados ---------- */
const counters = document.querySelectorAll('[data-count]');
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.count, 10);
    const suffixEl = el.querySelector('.plus');
    const suffix = suffixEl ? suffixEl.outerHTML : '';
    const duration = 1400;
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.innerHTML = Math.floor(eased * target) + suffix;
      if (t < 1) requestAnimationFrame(step);
      else el.innerHTML = target + suffix;
    }
    requestAnimationFrame(step);
    countObs.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach(c => countObs.observe(c));

/* ---------- REVEAL ao scroll ---------- */
const reveals = document.querySelectorAll('.services, .projects, .contact, .service, .card');
reveals.forEach(el => el.classList.add('reveal'));
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
reveals.forEach(el => revealObs.observe(el));

/* ---------- SCROLL SPY (nav .active acompanha a seção) ---------- */
const sections = ['home', 'services', 'about', 'projects', 'contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);
const navLinks = document.querySelectorAll('.nav a');

const spyObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => spyObs.observe(s));

/* ---------- PARALLAX leve na foto ---------- */
const photo = document.querySelector('.photo-wrap');
const backdrop = document.querySelector('.photo-backdrop');
if (photo && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 14;
    const y = (e.clientY / window.innerHeight - 0.5) * 14;
    photo.style.transform = `translate(${x}px, ${y}px)`;
    if (backdrop) backdrop.style.transform = `translate(${x * -0.5}px, ${y * -0.5}px)`;
  });
}

/* ---------- Easter egg no console ---------- */
console.log(
  '%c JP %c João Pedro · Front-End Developer ',
  'background:#ff6a1a;color:#fff;font-weight:700;padding:4px 8px;border-radius:4px 0 0 4px;',
  'background:#1c1c1e;color:#ff6a1a;padding:4px 8px;border-radius:0 4px 4px 0;'
);
console.log('%cse chegou até aqui, manda email: seu-email@exemplo.com', 'color:#9a9a9e;font-size:12px;');
