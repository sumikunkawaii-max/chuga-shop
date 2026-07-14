/* ========================================
   セレクト昆虫専門店 - メインスクリプト v2
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- プリローダー ---
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('loaded'), 600);
  });
  setTimeout(() => preloader.classList.add('loaded'), 2500);

  // --- ナビゲーション スクロール ---
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // --- ハンバーガーメニュー ---
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // --- スクロールアニメーション ---
  const fadeElements = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  fadeElements.forEach((el, index) => {
    const siblings = el.parentElement.querySelectorAll(':scope > .fade-up');
    const siblingIndex = Array.from(siblings).indexOf(el);
    el.dataset.delay = siblingIndex * 80;
    fadeObserver.observe(el);
  });

  // --- カテゴリフィルター ---
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // タブのアクティブ状態を更新
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.dataset.category;

      productCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.classList.remove('filtered-out');
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });

  // --- ヒーローパーティクル ---
  const particlesContainer = document.getElementById('heroParticles');

  function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const x = Math.random() * 100;
    const size = Math.random() * 2 + 1;
    const duration = Math.random() * 8 + 6;
    const delay = Math.random() * 4;
    particle.style.left = x + '%';
    particle.style.bottom = '-10px';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';
    particlesContainer.appendChild(particle);
    setTimeout(() => {
      particle.remove();
      createParticle();
    }, (duration + delay) * 1000);
  }

  for (let i = 0; i < 15; i++) createParticle();

  // --- スムーズスクロール ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // --- LINE固定ボタン表示（スクロール後に表示） ---
  const lineFloat = document.getElementById('lineFloat');
  const lineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // ヒーローが見えなくなったらLINEボタンを表示
      lineFloat.classList.toggle('visible', !entry.isIntersecting);
    });
  }, { threshold: 0 });

  const heroSection = document.getElementById('hero');
  lineObserver.observe(heroSection);

});
