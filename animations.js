/* ═══════════════════════════════════════════════
   Lavesh Health Care — Global Animation Engine
   ═══════════════════════════════════════════════ */

document.documentElement.classList.add('js-anim');

/* ── Intersection Observer — scroll reveal ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('anim-visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-anim]').forEach(el => revealObs.observe(el));
window._revealObs = revealObs;

/* ── Stagger children (grids, lists) ── */
document.querySelectorAll('[data-stagger]').forEach(container => {
  Array.from(container.children).forEach((child, i) => {
    child.setAttribute('data-anim', child.getAttribute('data-anim') || 'fade-up');
    child.setAttribute('data-delay', Math.min(i + 1, 9));
    revealObs.observe(child);
  });
});

/* ── Number counter ── */
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const isDecimal = el.dataset.decimal === 'true';
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const val = target * ease;
      el.textContent = prefix + (isDecimal ? val.toFixed(1) : Math.floor(val)) + suffix;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = prefix + (isDecimal ? target.toFixed(1) : target) + suffix;
    }
    requestAnimationFrame(step);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-counter]').forEach(el => counterObs.observe(el));

/* ── Typewriter ── */
function runTypewriter(el) {
  const text = el.dataset.typewriter || el.textContent;
  const speed = parseInt(el.dataset.speed || '55');
  el.textContent = '';
  el.classList.add('typewriter-cursor');
  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(type, speed + Math.random() * 20);
    } else {
      setTimeout(() => el.classList.remove('typewriter-cursor'), 800);
    }
  }
  setTimeout(type, parseInt(el.dataset.twDelay || '300'));
}

const twObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      runTypewriter(e.target);
      twObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-typewriter]').forEach(el => twObs.observe(el));

/* ── Card 3-D tilt on hover ── */
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── Nav stagger on load ── */
document.querySelectorAll('.nav-anim-item').forEach((el, i) => {
  el.style.animationDelay = (i * 0.07 + 0.1) + 's';
});

/* ── Button ripple ── */
document.querySelectorAll('.btn-ripple').forEach(btn => {
  btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.addEventListener('click', e => {
    const r = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(r.width, r.height) * 2;
    ripple.style.cssText = `
      position:absolute;width:${size}px;height:${size}px;
      left:${e.clientX - r.left - size/2}px;top:${e.clientY - r.top - size/2}px;
      background:rgba(255,255,255,0.25);border-radius:50%;
      transform:scale(0);animation:ripple-anim 0.55s ease-out forwards;
      pointer-events:none;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* Ripple keyframe injected dynamically */
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple-anim{to{transform:scale(1);opacity:0}}`;
document.head.appendChild(rippleStyle);

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
