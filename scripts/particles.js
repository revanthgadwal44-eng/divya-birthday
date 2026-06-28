/**
 * Particles — sparkles, hearts, cursor trail, scroll sparkles
 */

const Particles = (() => {
  let trailEnabled = false;

  function sparkleBurst(x, y, count = 12) {
    const burst = document.createElement('div');
    burst.className = 'sparkle-burst';
    burst.style.left = `${x}px`;
    burst.style.top = `${y}px`;
    document.body.appendChild(burst);

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'sparkle-particle';
      const angle = (Math.PI * 2 * i) / count;
      const dist = 30 + Math.random() * 40;
      p.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
      p.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
      p.style.background = ['#FFD6E8', '#DCC6FF', '#fff', '#FFE5D4'][i % 4];
      burst.appendChild(p);
    }

    setTimeout(() => burst.remove(), 700);
  }

  function floatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = ['❤️', '💕', '💖', '🩷'][Math.floor(Math.random() * 4)];
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  }

  function cursorTrail(x, y) {
    if (!trailEnabled) return;
    const star = document.createElement('div');
    star.className = 'trail-star';
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    document.getElementById('cursor-trail')?.appendChild(star);
    setTimeout(() => star.remove(), 800);
  }

  function scrollSparkle() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const s = document.createElement('div');
    s.className = 'scroll-sparkle';
    s.style.left = `${x}px`;
    s.style.top = `${y}px`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1000);
  }

  function initCursorTrail() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    trailEnabled = true;
    let lastTrail = 0;
    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastTrail > 50) {
        cursorTrail(e.clientX, e.clientY);
        lastTrail = now;
      }
    });
  }

  function initScrollSparkles() {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const now = Date.now();
      if (now - lastScroll > 300 && Math.random() < 0.4) {
        scrollSparkle();
        lastScroll = now;
      }
    }, { passive: true });
  }

  function initHeroSparkles(container) {
    if (!container) return;
    setInterval(() => {
      const s = document.createElement('div');
      s.style.cssText = `
        position:absolute;width:4px;height:4px;background:#fff;border-radius:50%;
        left:${Math.random() * 100}%;top:${Math.random() * 100}%;
        animation:scrollSparkle 1.5s ease-out forwards;pointer-events:none;
      `;
      container.appendChild(s);
      setTimeout(() => s.remove(), 1500);
    }, 800);
  }

  return {
    sparkleBurst,
    floatingHeart,
    cursorTrail,
    scrollSparkle,
    initCursorTrail,
    initScrollSparkles,
    initHeroSparkles
  };
})();

window.Particles = Particles;
