/* ========================================
   セレクト昆虫専門店 - メインスクリプト v4
   全機能: フィルター/検索/モーダル/お気に入り/FAQ/タブ
   ======================================== */

// --- 商品の飼育データ ---
const careData = {
  gbb:  { temp: '24-28°C', humidity: '60-70%', food: 'コオロギ・デュビア', lifespan: 'メス12-15年 / オス3-4年', notes: '新世界種。刺激毛を飛ばすことがあるため素手での取り扱いは避ける。美しい青い体色と独特のウェブが最大の魅力。' },
  mrk:  { temp: '24-28°C', humidity: '60-70%', food: 'コオロギ・デュビア', lifespan: 'メス25-30年 / オス5-7年', notes: '世界で最も人気のあるタランチュラ。非常に温厚で動きも緩やか。CITES付属書IIに掲載されており、正規ルートでの入手が重要。' },
  cb:   { temp: '24-28°C', humidity: '70-80%', food: 'コオロギ・デュビア', lifespan: 'メス15-20年 / オス3-4年', notes: '旧世界種のため刺激毛がなく、代わりに噛みつきで防御する。動きが非常に速く、取り扱いには十分な経験が必要。' },
  glt:  { temp: '26-30°C', humidity: '75-85%', food: 'コオロギ・デュビア・ピンクマウス', lifespan: 'メス15-25年 / オス3-6年', notes: '世界最大のタランチュラ。体重は170gを超えることも。威嚇時に後ろ脚を擦り合わせて音を出す独特の行動が特徴。' },
  emp:  { temp: '25-30°C', humidity: '70-80%', food: 'コオロギ・デュビア', lifespan: '6-8年', notes: 'アフリカ産の大型サソリ。毒性は弱いが鋏の力は強い。群れでの飼育も可能で、複数匹での飼育が観察の面白さを増す。' },
  afs:  { temp: '24-28°C', humidity: '70-80%', food: 'コオロギ・デュビア', lifespan: '5-7年', notes: 'アジア産の森林棲サソリ。毒性が弱く温厚で、サソリ飼育の入門種として最適。湿度管理がやや重要。' },
  vrc:  { temp: '25-30°C', humidity: '70-80%', food: 'コオロギ・デュビア', lifespan: '5-8年', notes: '東南アジア産の大型ムカデ。動きが速く攻撃的なため、必ずピンセットで取り扱う。深紅の脚が非常に美しい。' },
  mp:   { temp: '20-25°C', humidity: '60-70%', food: '落ち葉・野菜くず・フィッシュフード', lifespan: '2-3年', notes: '紫と橙のツートンカラーが特徴のワラジムシ。繁殖も容易で、コロニーの成長を楽しめる。多湿すぎると逆に弱るので注意。' },
  zb:   { temp: '20-25°C', humidity: '60-70%', food: '落ち葉・野菜くず', lifespan: '2-3年', notes: '白と黒のゼブラ模様が美しいダンゴムシの仲間。飼育は容易で、丸まる姿が愛らしい。' },
  mhc:  { temp: '25-30°C', humidity: '60-70%', food: '野菜・果物・ドッグフード', lifespan: '3-5年', notes: 'マダガスカル原産の大型ゴキブリ。翅がなく飛べない。危険を感じると「シュー」と音を出す。毒なし・噛まない・臭くないの三拍子で入門に最適。' },
  kit:  null,
  feed: null
};

document.addEventListener('DOMContentLoaded', () => {

  // --- プリローダー ---
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => setTimeout(() => preloader.classList.add('loaded'), 600));
  setTimeout(() => preloader.classList.add('loaded'), 2500);

  // --- ナビ スクロール ---
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));

  // --- ハンバーガー ---
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
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), entry.target.dataset.delay || 0);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.fade-up').forEach((el) => {
    const siblings = el.parentElement.querySelectorAll(':scope > .fade-up');
    el.dataset.delay = Array.from(siblings).indexOf(el) * 80;
    fadeObserver.observe(el);
  });

  // --- カテゴリフィルター ---
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.category;
      productCards.forEach(card => {
        card.classList.toggle('filtered-out', cat !== 'all' && card.dataset.category !== cat);
      });
    });
  });

  // --- 商品検索 ---
  const searchInput = document.getElementById('productSearch');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    // フィルタータブを「すべて」に戻す
    if (query) {
      filterTabs.forEach(t => t.classList.remove('active'));
      filterTabs[0].classList.add('active');
    }
    productCards.forEach(card => {
      if (!query) {
        card.classList.remove('filtered-out');
        return;
      }
      const name = card.querySelector('.product-name').textContent.toLowerCase();
      const sci = card.querySelector('.product-scientific')?.textContent.toLowerCase() || '';
      const cat = card.querySelector('.product-category')?.textContent.toLowerCase() || '';
      card.classList.toggle('filtered-out', !name.includes(query) && !sci.includes(query) && !cat.includes(query));
    });
  });

  // --- お気に入り ---
  let favorites = JSON.parse(localStorage.getItem('selectInsectsFav') || '[]');
  const favBtns = document.querySelectorAll('.fav-btn');

  function updateFavUI() {
    favBtns.forEach(btn => {
      btn.classList.toggle('active', favorites.includes(btn.dataset.id));
    });
  }

  favBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const idx = favorites.indexOf(id);
      if (idx > -1) favorites.splice(idx, 1);
      else favorites.push(id);
      localStorage.setItem('selectInsectsFav', JSON.stringify(favorites));
      updateFavUI();
    });
  });
  updateFavUI();

  // --- 商品モーダル ---
  const modalOverlay = document.getElementById('modalOverlay');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  function openModal(card) {
    const id = card.dataset.id;
    const care = careData[id];
    if (!care) return; // 用品はモーダルなし

    const name = card.querySelector('.product-name').textContent;
    const sci = card.querySelector('.product-scientific').textContent;
    const cat = card.querySelector('.product-category').textContent;
    const desc = card.querySelector('.product-desc').textContent;
    const price = card.querySelector('.product-price').innerHTML;
    const statusEl = card.querySelector('.product-status');
    const statusHTML = statusEl ? statusEl.outerHTML : '';
    const detailsEl = card.querySelector('.product-details');
    const details = detailsEl ? detailsEl.innerHTML : '';

    modalBody.innerHTML = `
      <span class="modal-category">${cat}</span>
      <h2 class="modal-name">${name}</h2>
      <p class="modal-scientific">${sci}</p>
      <div class="modal-status-price">
        ${statusHTML}
        <span class="modal-price">${price}</span>
      </div>
      <p class="modal-desc">${desc}</p>
      <div class="product-details" style="margin-bottom:20px">${details}</div>
      <h3 class="modal-care-title">飼育情報</h3>
      <div class="modal-care-grid">
        <div class="modal-care-item"><strong>適温</strong>${care.temp}</div>
        <div class="modal-care-item"><strong>湿度</strong>${care.humidity}</div>
        <div class="modal-care-item"><strong>餌</strong>${care.food}</div>
        <div class="modal-care-item"><strong>寿命</strong>${care.lifespan}</div>
      </div>
      <p class="modal-desc">${care.notes}</p>
      <div class="modal-actions">
        <a href="#contact" class="modal-cta" id="modalCta">LINEで問い合わせる</a>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // モーダル内のリンククリックでモーダルを閉じる
    document.getElementById('modalCta').addEventListener('click', () => closeModal());
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // 商品カードクリックでモーダルを開く（リンクやボタン以外の部分）
  productCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      openModal(card);
    });
    card.style.cursor = careData[card.dataset.id] ? 'pointer' : 'default';
  });

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // --- ご利用案内タブ ---
  const infoTabs = document.querySelectorAll('.info-tab');
  const infoPanels = document.querySelectorAll('.info-panel');
  infoTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      infoTabs.forEach(t => t.classList.remove('active'));
      infoPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.panel).classList.add('active');
    });
  });

  // --- FAQ アコーディオン ---
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      // 他を全部閉じる
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // --- パーティクル ---
  const particlesContainer = document.getElementById('heroParticles');
  function createParticle() {
    const p = document.createElement('div');
    p.classList.add('particle');
    const dur = Math.random() * 8 + 6;
    const delay = Math.random() * 4;
    p.style.cssText = `left:${Math.random()*100}%;bottom:-10px;width:${Math.random()*2.5+1.5}px;height:${Math.random()*2.5+1.5}px;animation-duration:${dur}s;animation-delay:${delay}s`;
    particlesContainer.appendChild(p);
    setTimeout(() => { p.remove(); createParticle(); }, (dur + delay) * 1000);
  }
  for (let i = 0; i < 12; i++) createParticle();

  // --- スムーズスクロール ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 32, behavior: 'smooth' });
      }
    });
  });

  // --- LINE固定ボタン ---
  const lineFloat = document.getElementById('lineFloat');
  new IntersectionObserver((entries) => {
    entries.forEach(entry => lineFloat.classList.toggle('visible', !entry.isIntersecting));
  }).observe(document.getElementById('hero'));

});
