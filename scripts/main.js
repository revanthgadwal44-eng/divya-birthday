/**
 * Main application — intro, sections, interactions, animations
 */

(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let musicPlaying = false;
  let titleClickCount = 0;

  function resolveMemory(id) {
    return SITE_DATA.memories.find((m) => m.id === id);
  }

  function resolveTimelineImage(item) {
    if (item.memoryId) {
      const memory = resolveMemory(item.memoryId);
      return memory ? memory.src : null;
    }
    return item.image || null;
  }

  function startBackgroundMusic() {
    const bgMusic = document.getElementById('bg-music');
    const btn = document.getElementById('music-btn');
    if (!bgMusic || musicPlaying) return;

    bgMusic.volume = 0.35;
    bgMusic.muted = false;
    bgMusic.play().then(() => {
      musicPlaying = true;
      btn?.classList.add('playing');
    }).catch(() => {});
  }

  function initAutoplayFallback() {
    const unlock = () => startBackgroundMusic();
    document.addEventListener('click', unlock, { once: true });
    document.addEventListener('keydown', unlock, { once: true });
    document.addEventListener('touchstart', unlock, { once: true, passive: true });
  }

  /* ---------- Intro Sequence ---------- */
  function runIntro() {
    const overlay = document.getElementById('intro-overlay');
    const line1 = document.getElementById('intro-line1');
    const title = document.getElementById('intro-title');
    const main = document.getElementById('main-content');

    if (reducedMotion) {
      overlay.classList.add('fade-out');
      main.classList.remove('hidden');
      main.style.opacity = '1';
      main.style.visibility = 'visible';
      ButterflySystem.start();
      initAll();
      startBackgroundMusic();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        overlay.classList.add('fade-out');
        main.classList.remove('hidden');
        gsap.to(main, { opacity: 1, visibility: 'visible', duration: 0.8 });
        ButterflySystem.start();
        initAll();
      }
    });

    ButterflySystem.animateIntroButterfly(() => {
      tl.to(line1, { opacity: 1, duration: 1.5, ease: 'power2.out' }, 0);
    });

    tl.to(line1, { opacity: 0, duration: 0.8, delay: 2.5 })
      .set(title, { className: 'intro-title' })
      .to(title, { opacity: 1, visibility: 'visible', duration: 1, ease: 'power2.out' })
      .from(title.querySelector('h1'), { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
      .from(title.querySelector('h2'), { y: 20, opacity: 0, duration: 0.8 }, '-=0.4')
      .call(() => {
        Confetti.create('intro-confetti', 3500);
        startBackgroundMusic();
      }, null, '-=0.3')
      .to(overlay, { opacity: 0, duration: 1.2, delay: 2 });
  }

  /* ---------- Build Dynamic Content ---------- */
  function buildTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    SITE_DATA.timeline.forEach((item, i) => {
      const side = i % 2 === 0 ? 'left' : 'right';
      const el = document.createElement('div');
      const imageSrc = resolveTimelineImage(item);
      const hasPhoto = Boolean(imageSrc);
      el.className = `timeline-item ${side}${hasPhoto ? '' : ' timeline-item--text'}`;

      const photoBlock = hasPhoto
        ? `<img src="${imageSrc}" alt="${item.title}" class="timeline-photo" loading="lazy" width="380" height="180">`
        : `<div class="timeline-emoji" aria-hidden="true">${item.emoji || '✨'}</div>`;

      el.innerHTML = `
        <div class="timeline-dot" aria-hidden="true"></div>
        <div class="timeline-card glass${hasPhoto ? '' : ' timeline-card--text'}">
          ${photoBlock}
          <div class="timeline-year">${item.label}</div>
          <p class="timeline-title">${item.title}</p>
          <p class="timeline-desc">${item.description}</p>
        </div>
      `;
      container.appendChild(el);
    });
    Placeholders.init(container);
  }

  function buildGallery() {
    const container = document.getElementById('gallery-container');
    if (!container) return;

    SITE_DATA.memories.forEach((photo) => {
      const el = document.createElement('div');
      el.className = 'gallery-item reveal';
      el.innerHTML = `
        <img src="${photo.src}" alt="${photo.alt}" loading="lazy">
        <p class="gallery-caption">${photo.caption}</p>
      `;
      el.addEventListener('click', () => openModal(photo.src, photo.alt));
      container.appendChild(el);
    });
    Placeholders.init(container);
  }

  function buildReasons() {
    const container = document.getElementById('reasons-container');
    if (!container) return;

    SITE_DATA.reasons.forEach((r) => {
      const el = document.createElement('div');
      el.className = 'reason-card glass reveal';
      el.innerHTML = `<span class="emoji">${r.emoji}</span><p>${r.text}</p>`;
      container.appendChild(el);
    });
  }

  function buildWishes() {
    const container = document.getElementById('wishes-container');
    if (!container) return;

    SITE_DATA.wishes.forEach((text, i) => {
      const el = document.createElement('div');
      el.className = 'wish-card glass reveal';
      el.textContent = text;
      el.style.animationDelay = `${i * 0.3}s`;
      container.appendChild(el);
    });
  }

  function buildCandles() {
    const container = document.getElementById('cake-candles');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
      const candle = document.createElement('div');
      candle.className = 'candle';
      candle.setAttribute('role', 'button');
      candle.setAttribute('tabindex', '0');
      candle.setAttribute('aria-label', `Candle ${i + 1}`);
      candle.innerHTML = '<div class="flame"></div>';
      candle.addEventListener('click', () => lightCandle(candle));
      candle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          lightCandle(candle);
        }
      });
      container.appendChild(candle);
    }
  }

  function buildCarousel() {
    const track = document.getElementById('carousel-track');
    const indicators = document.getElementById('carousel-indicators');
    if (!track || !indicators) return;

    const slides = [
      { src: SITE_DATA.hero.src, alt: SITE_DATA.hero.alt },
      ...SITE_DATA.memories.map((p) => ({ src: p.src, alt: p.alt }))
    ];

    slides.forEach((slide, i) => {
      const slideEl = document.createElement('div');
      slideEl.className = 'carousel-slide';
      slideEl.innerHTML = `<img src="${slide.src}" alt="${slide.alt}" loading="lazy">`;
      track.appendChild(slideEl);

      const dot = document.createElement('button');
      dot.className = `carousel-dot${i === 0 ? ' active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      indicators.appendChild(dot);
    });

    const cloneSlide = document.createElement('div');
    cloneSlide.className = 'carousel-slide';
    cloneSlide.innerHTML = `<img src="${slides[0].src}" alt="${slides[0].alt}" loading="lazy">`;
    track.appendChild(cloneSlide);

    initCarousel(slides.length);
    Placeholders.init(track);
  }

  let carouselIndex = 0;
  let carouselTotal = 0;
  let carouselInterval = null;
  let touchStartX = 0;
  let carouselAnimating = false;

  function initCarousel(total) {
    carouselTotal = total;
    carouselIndex = 0;
    const track = document.getElementById('carousel-track');
    if (!track) return;

    carouselInterval = setInterval(nextSlide, 4000);

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? nextSlide() : prevSlide();
      }
    }, { passive: true });

    track.addEventListener('transitionend', () => {
      const trackEl = document.getElementById('carousel-track');
      if (!trackEl || carouselIndex !== carouselTotal) return;
      trackEl.style.transition = 'none';
      carouselIndex = 0;
      trackEl.style.transform = 'translateX(0)';
      requestAnimationFrame(() => {
        trackEl.style.transition = '';
        carouselAnimating = false;
      });
    });
  }

  function updateCarouselDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    const active = carouselIndex >= carouselTotal ? 0 : carouselIndex;
    dots.forEach((d, i) => d.classList.toggle('active', i === active));
  }

  function goToSlide(index) {
    carouselIndex = index;
    const track = document.getElementById('carousel-track');
    if (track) track.style.transform = `translateX(-${carouselIndex * 100}%)`;
    updateCarouselDots();
  }

  function nextSlide() {
    if (carouselAnimating) return;
    carouselAnimating = true;
    carouselIndex++;
    const track = document.getElementById('carousel-track');
    if (track) track.style.transform = `translateX(-${carouselIndex * 100}%)`;
    updateCarouselDots();
    if (carouselIndex < carouselTotal) carouselAnimating = false;
  }

  function prevSlide() {
    if (carouselAnimating) return;
    const track = document.getElementById('carousel-track');
    if (!track) return;

    if (carouselIndex === 0) {
      track.style.transition = 'none';
      carouselIndex = carouselTotal;
      track.style.transform = `translateX(-${carouselIndex * 100}%)`;
      requestAnimationFrame(() => {
        track.style.transition = '';
        carouselIndex--;
        track.style.transform = `translateX(-${carouselIndex * 100}%)`;
        updateCarouselDots();
      });
    } else {
      carouselIndex--;
      track.style.transform = `translateX(-${carouselIndex * 100}%)`;
      updateCarouselDots();
    }
  }

  /* ---------- Typing Effect ---------- */
  function initTyping() {
    const el = document.getElementById('hero-typing');
    if (!el) return;

    const lines = SITE_DATA.heroTypingLines;
    let lineIndex = 0;
    let charIndex = 0;

    function type() {
      if (lineIndex >= lines.length) return;

      const line = lines[lineIndex];
      el.innerHTML = lines.slice(0, lineIndex).join('<br>') +
        (lineIndex > 0 ? '<br>' : '') +
        line.substring(0, charIndex + 1) +
        '<span class="typing-cursor">|</span>';

      charIndex++;
      if (charIndex > line.length) {
        lineIndex++;
        charIndex = 0;
        setTimeout(type, 400);
      } else {
        setTimeout(type, 50 + Math.random() * 30);
      }
    }

    setTimeout(type, 1500);
  }

  /* ---------- Scroll Reveal ---------- */
  function initScrollReveal() {
    gsap.utils.toArray('.reveal').forEach((el) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    gsap.utils.toArray('.timeline-item').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out'
        }
      );
    });

    gsap.to('.hero-photo-wrapper', {
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: 60,
      ease: 'none'
    });
  }

  /* ---------- Stats Counter ---------- */
  function initStats() {
    const cards = document.querySelectorAll('.stat-value[data-target]');

    cards.forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => animateCount(el, target, suffix)
      });
    });
  }

  function animateCount(el, target, suffix) {
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  /* ---------- Modal ---------- */
  function openModal(src, alt) {
    const modal = document.getElementById('image-modal');
    const img = document.getElementById('modal-image');
    if (!modal || !img) return;

    img.src = src;
    img.alt = alt;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    Particles.floatingHeart(window.innerWidth / 2, window.innerHeight / 2);
  }

  function closeModal() {
    const modal = document.getElementById('image-modal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  /* ---------- Envelope ---------- */
  function initEnvelope() {
    const envelope = document.getElementById('envelope');
    if (!envelope) return;

    const open = () => envelope.classList.add('open');

    envelope.addEventListener('click', open);
    envelope.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });
  }

  /* ---------- Cake ---------- */
  let litCount = 0;

  function lightCandle(candle) {
    if (candle.classList.contains('lit')) return;
    candle.classList.add('lit');
    litCount++;
    Particles.sparkleBurst(
      candle.getBoundingClientRect().left + 4,
      candle.getBoundingClientRect().top
    );

    if (litCount >= 20) {
      document.getElementById('blow-candles-btn')?.classList.remove('hidden');
      document.getElementById('cake-hint').textContent = 'All candles lit! Make a wish and blow them out 🎂';
    }
  }

  function blowCandles() {
    const candles = document.querySelectorAll('.candle.lit');
    const smoke = document.getElementById('cake-smoke');
    const btn = document.getElementById('blow-candles-btn');

    candles.forEach((c) => c.classList.remove('lit'));
    litCount = 0;
    if (btn) btn.classList.add('hidden');

    if (smoke) {
      for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'smoke-particle';
        p.style.left = `${-20 + Math.random() * 40}px`;
        p.style.animationDelay = `${i * 0.1}s`;
        smoke.appendChild(p);
      }
      setTimeout(() => { smoke.innerHTML = ''; }, 2500);
    }

    Confetti.fullscreen(5000);
    ButterflySystem.burst(25);

    const celebMusic = document.getElementById('celebration-music');
    if (celebMusic) {
      celebMusic.volume = 0.5;
      celebMusic.play().catch(() => {});
    }

    document.getElementById('cake-hint').textContent = 'Wish granted! Happy Birthday Divya! 🎉';
  }

  /* ---------- Quotes Rotation ---------- */
  function initQuotes() {
    const el = document.getElementById('quote-text');
    if (!el) return;

    let index = 0;
    el.textContent = `"${SITE_DATA.quotes[0]}"`;

    setInterval(() => {
      el.classList.add('fade-out');
      setTimeout(() => {
        index = (index + 1) % SITE_DATA.quotes.length;
        el.textContent = `"${SITE_DATA.quotes[index]}"`;
        el.classList.remove('fade-out');
      }, 800);
    }, 5000);
  }

  /* ---------- Music Toggle ---------- */
  function initMusic() {
    const btn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    if (!btn || !bgMusic) return;

    btn.addEventListener('click', () => {
      if (musicPlaying) {
        bgMusic.pause();
        btn.classList.remove('playing');
        musicPlaying = false;
      } else {
        bgMusic.muted = false;
        bgMusic.play().then(() => {
          btn.classList.add('playing');
          musicPlaying = true;
        }).catch(() => {});
      }
    });
  }

  /* ---------- Easter Egg ---------- */
  function initEasterEgg() {
    const title = document.getElementById('birthday-title');
    if (!title) return;

    title.addEventListener('click', () => {
      titleClickCount++;
      if (titleClickCount >= 5) {
        titleClickCount = 0;
        const egg = document.getElementById('easter-egg');
        if (egg) {
          egg.classList.remove('hidden');
          Confetti.fullscreen(6000);
          ButterflySystem.burst(40);
          setTimeout(() => egg.classList.add('hidden'), 4000);
        }
      }
    });
  }

  /* ---------- Hero Photo Hearts ---------- */
  function initPhotoHearts() {
    document.querySelector('.hero-photo')?.addEventListener('click', (e) => {
      Particles.floatingHeart(e.clientX, e.clientY);
      Particles.sparkleBurst(e.clientX, e.clientY);
    });
  }

  /* ---------- Replay ---------- */
  function initReplay() {
    document.getElementById('replay-btn')?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const overlay = document.getElementById('intro-overlay');
      const main = document.getElementById('main-content');
      if (overlay && main) {
        overlay.classList.remove('fade-out');
        main.classList.add('hidden');
        titleClickCount = 0;
        setTimeout(runIntro, 500);
      }
    });
  }

  /* ---------- Modal & Keyboard ---------- */
  function initModal() {
    document.querySelector('.modal-close')?.addEventListener('click', closeModal);
    document.getElementById('image-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'image-modal') closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  function initCakeButton() {
    document.getElementById('blow-candles-btn')?.addEventListener('click', blowCandles);
  }

  /* ---------- Init All ---------- */
  function initAll() {
    initTyping();
    initScrollReveal();
    initStats();
    initEnvelope();
    initQuotes();
    initMusic();
    initAutoplayFallback();
    initEasterEgg();
    initPhotoHearts();
    initReplay();
    initModal();
    initCakeButton();
    Particles.initCursorTrail();
    Particles.initScrollSparkles();
    Particles.initHeroSparkles(document.querySelector('.hero-sparkles'));
  }

  /* ---------- DOM Ready ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    const heroImg = document.querySelector('.hero-photo');
    if (heroImg && SITE_DATA.hero) {
      heroImg.src = SITE_DATA.hero.src;
      heroImg.alt = SITE_DATA.hero.alt;
      Placeholders.bind(heroImg);
    }

    buildTimeline();
    buildGallery();
    buildReasons();
    buildWishes();
    buildCandles();
    buildCarousel();

    document.getElementById('main-content').style.opacity = '0';
    document.getElementById('main-content').style.visibility = 'hidden';

    runIntro();
  });
})();
