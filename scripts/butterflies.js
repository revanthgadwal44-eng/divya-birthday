/**
 * Floating butterfly system — natural movement, wing flapping, tap sparkle explosion
 */

const ButterflySystem = (() => {
  const COLORS = ['#FFD6E8', '#DCC6FF', '#FFE5D4', '#E8D5FF', '#FFB8D0'];
  let container = null;
  let butterflies = [];
  let active = false;

  function createSVG(color) {
    return `
      <svg viewBox="0 0 60 40" class="butterfly-svg">
        <ellipse class="wing wing-left" cx="18" cy="20" rx="16" ry="12" fill="${color}" opacity="0.85"/>
        <ellipse class="wing wing-right" cx="42" cy="20" rx="16" ry="12" fill="${color}" opacity="0.85"/>
        <ellipse cx="30" cy="20" rx="3" ry="10" fill="#9B7BB8"/>
      </svg>`;
  }

  function createButterfly(options = {}) {
    const size = options.size || (20 + Math.random() * 25);
    const color = options.color || COLORS[Math.floor(Math.random() * COLORS.length)];
    const el = document.createElement('div');
    el.className = 'butterfly';
    el.setAttribute('role', 'presentation');
    el.innerHTML = `<div class="butterfly-inner">${createSVG(color)}</div>`;
    el.style.width = `${size}px`;
    el.style.height = `${size * 0.67}px`;
    el.style.opacity = options.opacity ?? (0.5 + Math.random() * 0.4);
    el.style.zIndex = Math.floor(Math.random() * 3);

    const state = {
      el,
      x: options.x ?? Math.random() * window.innerWidth,
      y: options.y ?? Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.6,
      wingPhase: Math.random() * Math.PI * 2,
      depth: 0.6 + Math.random() * 0.4,
      size
    };

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.Particles) Particles.sparkleBurst(e.clientX, e.clientY);
    });

    container.appendChild(el);
    butterflies.push(state);
    return state;
  }

  function flapWings(state) {
    state.wingPhase += 0.15;
    const scale = 1 + Math.sin(state.wingPhase) * 0.15;
    const inner = state.el.querySelector('.butterfly-inner');
    if (inner) {
      inner.style.transform = `scaleX(${scale})`;
    }
  }

  function update() {
    if (!active) return;

    butterflies.forEach((b) => {
      b.x += b.vx * b.depth;
      b.y += b.vy * b.depth;

      if (b.x < -50) b.x = window.innerWidth + 30;
      if (b.x > window.innerWidth + 50) b.x = -30;
      if (b.y < -50) b.y = window.innerHeight + 30;
      if (b.y > window.innerHeight + 50) b.y = -30;

      if (Math.random() < 0.008) {
        b.vx += (Math.random() - 0.5) * 0.3;
        b.vy += (Math.random() - 0.5) * 0.3;
        b.vx = Math.max(-1.2, Math.min(1.2, b.vx));
        b.vy = Math.max(-1, Math.min(1, b.vy));
      }

      b.el.style.transform = `translate(${b.x}px, ${b.y}px) scale(${b.depth})`;
      flapWings(b);
    });

    requestAnimationFrame(update);
  }

  function init(count = 12) {
    container = document.getElementById('butterflies-container');
    if (!container) return;

    for (let i = 0; i < count; i++) {
      createButterfly();
    }
    active = true;
    update();
  }

  function start() {
    active = true;
    if (butterflies.length === 0) init(12);
    update();
  }

  function burst(count = 30) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        createButterfly({
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + 20,
          vy: -2 - Math.random() * 2
        });
      }, i * 80);
    }
  }

  function animateIntroButterfly(callback) {
    const intro = document.getElementById('intro-butterfly');
    if (!intro || typeof gsap === 'undefined') {
      if (callback) callback();
      return;
    }

    gsap.set(intro, { opacity: 1, x: -80, y: '50vh' });
    gsap.to(intro, {
      x: window.innerWidth + 80,
      y: '40vh',
      duration: 3,
      ease: 'power1.inOut',
      onComplete: callback
    });

    const wings = intro.querySelectorAll('.wing');
    gsap.to(wings, {
      scaleX: 0.7,
      duration: 0.15,
      repeat: 20,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  return { init, start, burst, createButterfly, animateIntroButterfly };
})();

window.ButterflySystem = ButterflySystem;
