/* ========================================
   セレクト昆虫専門店 - メインスクリプト
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- プリローダー ---
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 800);
  });

  // フォールバック（3秒後に強制非表示）
  setTimeout(() => {
    preloader.classList.add('loaded');
  }, 3000);

  // --- ナビゲーション スクロール処理 ---
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // --- ハンバーガーメニュー ---
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  // モバイルメニューのリンクをクリックしたら閉じる
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // --- スクロールアニメーション（Intersection Observer） ---
  const fadeElements = document.querySelectorAll('.fade-up');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // 少しずつ遅延させて順番にフェードイン
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach((el, index) => {
    // 同じセクション内の要素に連続した遅延を設定
    const siblings = el.parentElement.querySelectorAll('.fade-up');
    const siblingIndex = Array.from(siblings).indexOf(el);
    el.dataset.delay = siblingIndex * 100;
    fadeObserver.observe(el);
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

    // アニメーション終了後に要素を削除して再生成
    setTimeout(() => {
      particle.remove();
      createParticle();
    }, (duration + delay) * 1000);
  }

  // パーティクル20個を生成
  for (let i = 0; i < 20; i++) {
    createParticle();
  }

  // --- スムーズスクロール（アンカーリンク） ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
