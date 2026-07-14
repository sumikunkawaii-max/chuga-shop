/* ========================================
   セレクト昆虫専門店 - メインスクリプト v5
   ダンゴムシ・ワラジムシ特化 + 飼育環境マニュアル
   ======================================== */

// --- 飼育環境マニュアルデータ ---
const careData = {
  zebra: {
    origin: 'フランス南部・南ヨーロッパ',
    maxSize: '最大約1.8cm',
    lifespan: '2-3年',
    case: 'プラケース（20×15cm以上）。蓋に通気口があるもの。コバエ防止シート推奨',
    substrate: '腐葉土 5 : 砕き石灰石 3 : 赤玉土 2 の配合。厚さ3-5cm。表面に落ち葉を敷く',
    temp: '20-25°C（18°C以下では活動が鈍る。30°C以上は危険）',
    humidity: 'ケースの片側を湿らせ、片側を乾燥に保つ（湿度勾配）。霧吹きは2-3日に1回、湿った側のみ',
    food: '【主食】クヌギ・コナラの落ち葉（乾燥させたもの）\n【副食】にんじん・きゅうり・かぼちゃ等の野菜くず（週2回交換）\n【タンパク源】フィッシュフード・乾燥エビを週1回少量\n【カルシウム】カトルボーンまたは石灰石を常設',
    breeding: '比較的容易。安定した環境（22-24°C、適切な湿度）を維持すれば自然繁殖する。メスは育児嚢で約1ヶ月間稚虫を育て、10-30匹を産む。稚虫は親と同じ環境で飼育可能',
    tips: '乾燥に比較的強い種だが、脱皮時は湿度が重要。脱皮不全を防ぐため、常にケースの一部は湿っている状態を保つ。白い部分が黄ばんできたら石灰石の補充サイン。落ち葉は食べ残しても取り除かず、自然に分解させる'
  },
  mp: {
    origin: '品種改良種（原種: Armadillidium vulgare / ヨーロッパ原産）',
    maxSize: '最大約2cm',
    lifespan: '2-3年',
    case: 'プラケース（20×15cm以上）。通気口付きの蓋。群れで飼育するため少し広めが理想',
    substrate: '腐葉土 5 : 砕き石灰石 3 : 赤玉土 2。厚さ3-5cm。表面に広葉樹の落ち葉を敷く',
    temp: '20-25°C（高温に弱いため夏場は注意。エアコン管理推奨）',
    humidity: '60-70%。片側湿潤・片側乾燥の湿度勾配を作る。霧吹きは2-3日に1回',
    food: '【主食】クヌギ・コナラの落ち葉\n【副食】にんじん・かぼちゃ等の野菜くず\n【タンパク源】フィッシュフードまたはドッグフードを週1回\n【カルシウム】カトルボーン常設。色の維持にカルシウムが重要',
    breeding: '容易。原種(A. vulgare)は繁殖力が高く、安定環境で自然に増える。一度に20-40匹の稚虫を産む。マジックポーションの色は遺伝するが、まれに原種カラーが出ることもある',
    tips: '紫と橙の発色を維持するにはカルシウムの十分な供給が重要。色が薄くなってきたらカトルボーンを追加する。多湿すぎるとダニの発生原因になるため、通気性を確保すること。コロニーが大きくなったら定期的に間引き（販売・譲渡）するとよい'
  },
  wo: {
    origin: 'ギリシャ',
    maxSize: '最大約1.5cm',
    lifespan: '2-3年',
    case: 'プラケース（15×10cm以上）。小型種のため隙間からの脱走に注意',
    substrate: '腐葉土 4 : 砕き石灰石 4 : 赤玉土 2。石灰石多めがポイント。厚さ2-4cm',
    temp: '18-24°C（高温に弱い。25°C以上が続くと調子を崩す）',
    humidity: '60-65%。やや乾燥気味を好む。霧吹きは3-4日に1回、軽く',
    food: '【主食】落ち葉（クヌギ・コナラ）\n【副食】にんじんの薄切り\n【タンパク源】フィッシュフード少量を週1回\n【カルシウム】石灰石を床材に多めに配合 + カトルボーン常設',
    breeding: 'やや難しい。成長速度が遅く、繁殖サイクルも長い。1回の出産で5-15匹程度。焦らず安定した環境を維持することが大切',
    tips: '高温に弱いため、夏場のエアコン管理は必須。直射日光は厳禁。乾燥気味の環境を好むが、脱皮のために湿った場所も必要。オレンジの発色は健康のバロメーター。色が褪せたら環境を見直す'
  },
  mn: {
    origin: 'モンテネグロ（バルカン半島）',
    maxSize: '最大約2cm',
    lifespan: '2-3年',
    case: 'プラケース（20×15cm以上）。ヨーロッパ産のため比較的丈夫',
    substrate: '腐葉土 5 : 砕き石灰石 3 : 赤玉土 2。厚さ3-5cm',
    temp: '18-24°C（冷涼な環境を好む。夏場の高温対策が重要）',
    humidity: '60-70%。片側湿潤・片側乾燥。霧吹きは2-3日に1回',
    food: '【主食】落ち葉（クヌギ・コナラ）\n【副食】野菜くず各種\n【タンパク源】フィッシュフード・乾燥エビを週1回\n【カルシウム】カトルボーン常設',
    breeding: 'やや難しい。繁殖ペースは遅めだが、安定した環境なら着実に増える。1回10-20匹程度',
    tips: 'バルカン半島原産のため冷涼な環境を好む。日本の夏は高温になりがちなので、エアコンのある部屋で管理すること。落ち葉は十分に乾燥させてから投入すると、カビの発生を抑えられる'
  },
  pk: {
    origin: 'タイ（石灰岩地帯）',
    maxSize: '最大約1.5cm',
    lifespan: '3-5年',
    case: 'プラケース（20×15cm以上）。密閉性が高いケースが適する（高湿度維持のため）。通気口は小さめに',
    substrate: '腐葉土 3 : 砕き石灰石 5 : 赤玉土 2。石灰石を非常に多めに配合するのがCubaris飼育のポイント。厚さ4-6cm。石灰岩の塊もいくつか置く',
    temp: '22-27°C（20°C以下では活動が著しく低下。30°C以上は危険）',
    humidity: '75-85%。高湿度が必須。霧吹きは毎日〜2日に1回。ただし水浸しにはしない',
    food: '【主食】落ち葉（広葉樹）。Cubaris系は落ち葉の消費が多い\n【副食】にんじん・かぼちゃ\n【タンパク源】フィッシュフード・乾燥エビ。Armadillidiumより多めに与える\n【カルシウム】石灰石を大量に。カトルボーン常設。Cubaris系はカルシウム要求量が高い',
    breeding: '難しい。繁殖サイクルが非常に遅く、1回の出産で5-10匹程度。稚虫の成長も遅い。「増えない」と感じても、最低6ヶ月は辛抱強く待つ',
    tips: '石灰岩の洞窟に生息する種のため、石灰石の量が飼育成功のカギ。床材の半分近くを石灰石にするくらいでちょうどよい。コルクバークや石灰岩の塊でシェルターを作ると、その下に集まって生活する。高湿度を維持しつつもカビには注意。通気が悪いとカビが発生するので、週1回は蓋を開けて換気する'
  },
  rpk: {
    origin: 'タイ（石灰岩地帯）',
    maxSize: '最大約1.5cm',
    lifespan: '3-5年',
    case: 'パンダキングと同様。プラケース（20×15cm以上）。密閉性高めのケース',
    substrate: '腐葉土 3 : 砕き石灰石 5 : 赤玉土 2。パンダキングと同じ配合。厚さ4-6cm',
    temp: '22-27°C（パンダキングと同じ温度帯）',
    humidity: '75-85%。高湿度維持が必須。毎日〜2日に1回の霧吹き',
    food: '【主食】落ち葉（広葉樹）\n【副食】にんじん・かぼちゃ\n【タンパク源】フィッシュフード・乾燥エビを多めに\n【カルシウム】石灰石大量 + カトルボーン常設',
    breeding: '難しい。パンダキングと同様に繁殖ペースが遅い。赤い発色を維持するには栄養バランスが重要',
    tips: '基本的な飼育方法はパンダキングと同じ。赤い色素の維持にはカロテノイド系の餌（にんじん等）が効果的という説がある。パンダキングとの混合飼育は避け、別ケースで管理すること'
  },
  cp: {
    origin: '東南アジア（詳細産地不明）',
    maxSize: '最大約1.2cm',
    lifespan: '3-5年',
    case: 'プラケース（15×10cm以上）。小型種のため小さめのケースでもOK。密閉性高め',
    substrate: '腐葉土 3 : 砕き石灰石 5 : 赤玉土 2。石灰石多めはCubaris共通。厚さ3-5cm',
    temp: '23-27°C（やや暖かめを好む）',
    humidity: '75-85%。高湿度維持。霧吹きは毎日〜2日に1回',
    food: '【主食】落ち葉（広葉樹）\n【副食】にんじん・かぼちゃ\n【タンパク源】フィッシュフード。小型種のため細かく砕いて与える\n【カルシウム】石灰石+カトルボーン',
    breeding: 'やや難しい。他のCubarisと同様に繁殖は遅いが、パンダキングよりはやや容易。1回5-10匹程度',
    tips: '小型で動きが可愛らしいCubaris。茶色と白のコーヒーのような色合いが名前の由来。シェルターの下に固まって生活するため、コルクバークは必ず設置する。床材の乾燥に注意し、カビとのバランスを見ながら湿度管理を行う'
  },
  pp: {
    origin: '東南アジア',
    maxSize: '最大約1.3cm',
    lifespan: '3-5年',
    case: 'プラケース（15×10cm以上）。密閉性高めのケース',
    substrate: '腐葉土 3 : 砕き石灰石 5 : 赤玉土 2。厚さ3-5cm',
    temp: '23-27°C',
    humidity: '75-85%。高湿度維持必須',
    food: '【主食】落ち葉（広葉樹）\n【副食】にんじん・かぼちゃ\n【タンパク源】フィッシュフード週1-2回\n【カルシウム】石灰石+カトルボーン常設',
    breeding: 'やや難しい。Cubaris共通で繁殖ペースは遅い。ピンクの発色が美しい個体を選別して累代すると良い',
    tips: 'ピンクと白のパステルカラーが非常に美しい種。Cubaris系共通の高湿度・石灰石多め環境で飼育する。色の薄い個体が生まれることもあるが、成長とともに発色が良くなることが多い'
  },
  rt: {
    origin: '世界各地（培養品）',
    maxSize: '約1-2mm',
    lifespan: '数ヶ月（コロニー単位で永続）',
    case: '密閉容器（タッパー等）。通気口は不要（むしろ密閉の方が良い）。底面に水苔やココナッツファイバーを敷く',
    substrate: '水で湿らせた木炭の上で培養するのが最も簡単。または湿らせたココナッツファイバー。常に湿った状態を保つ',
    temp: '20-28°C（室温で十分）',
    humidity: '80-95%。とにかく高湿度。乾燥は厳禁。容器内に水滴がつく程度が理想',
    food: '【主食】ドライイースト（パン酵母）を少量ふりかける\n【代替】米粉・フィッシュフードの粉末\n与えすぎるとカビの原因になるため、少量を2-3日に1回',
    breeding: '非常に容易。適切な環境なら爆発的に増える。増えすぎたらダンゴムシ・ワラジムシのケースに投入すると掃除役として活躍',
    tips: 'ダンゴムシ・ワラジムシケースの「掃除屋」として導入するのが主な用途。カビや食べ残しを分解してくれる。単独培養も簡単で、木炭+ドライイーストの方法なら初心者でも失敗しにくい。赤い体色が美しく、ケース内のアクセントにもなる'
  },
  mr: {
    origin: '東南アジア',
    maxSize: '最大約2.5cm',
    lifespan: '2-4年',
    case: 'プラケース（20×15cm以上）。中型種のためやや広めが良い',
    substrate: '腐葉土 4 : 砕き石灰石 3 : 赤玉土 2 : ヤシガラ 1。Merulanella系は腐葉土多めを好む。厚さ4-6cm',
    temp: '22-28°C（熱帯産のためやや暖かめ）',
    humidity: '70-80%。高めの湿度を好むが、Cubarisほどではない。霧吹きは2日に1回程度',
    food: '【主食】落ち葉（広葉樹）。消費量が多い\n【副食】野菜くず各種。きゅうり・にんじんが好評\n【タンパク源】フィッシュフード・ドッグフードを週2回\n【カルシウム】カトルボーン常設',
    breeding: '比較的容易。Cubarisより繁殖ペースが速い。1回10-20匹程度の稚虫を産む',
    tips: '大型で見応えのある種。落ち葉の消費が激しいので、常にストックを切らさないこと。コルクバークの下に潜む習性があるため、シェルターは必ず設置。比較的丈夫で初心者にもおすすめできるMerulanella系の入門種'
  },
  ws: {
    origin: 'ヨーロッパ南部',
    maxSize: '最大約2cm',
    lifespan: '2-3年',
    case: 'プラケース（20×15cm以上）。通気口付きの蓋',
    substrate: '腐葉土 5 : 砕き石灰石 3 : 赤玉土 2。厚さ3-5cm',
    temp: '20-25°C',
    humidity: '60-70%。片側湿潤・片側乾燥の勾配。霧吹き2-3日に1回',
    food: '【主食】落ち葉（クヌギ・コナラ）\n【副食】野菜くず\n【タンパク源】フィッシュフードを週1回\n【カルシウム】カトルボーン常設+床材に石灰石配合',
    breeding: 'やや難しい。繁殖ペースはゆっくりだが、安定した環境なら着実に増える。1回10-15匹程度',
    tips: '白とグレーのシャープな模様が名前の由来。Armadillidium系の標準的な飼育方法で管理できる。模様の出方に個体差があるため、選別累代でより美しい模様を目指すのも楽しみのひとつ'
  },
  gt: {
    origin: 'イタリア（サルデーニャ島）',
    maxSize: '最大約2cm',
    lifespan: '2-3年',
    case: 'プラケース（20×15cm以上）。通気口付き',
    substrate: '腐葉土 5 : 砕き石灰石 3 : 赤玉土 2。厚さ3-5cm',
    temp: '20-25°C（地中海性気候の種のため極端な高温・低温を避ける）',
    humidity: '60-70%。やや乾燥気味でもOK。霧吹きは3日に1回程度',
    food: '【主食】落ち葉（クヌギ・コナラ）\n【副食】野菜くず・果物の皮\n【タンパク源】フィッシュフード週1回\n【カルシウム】カトルボーン常設',
    breeding: '比較的容易。Armadillidium gestroiは丈夫で繁殖もしやすい。1回15-30匹程度の稚虫を産む',
    tips: '地中海原産のため乾燥にも比較的強い。オレンジがかった美しい体色が特徴。Armadillidium系の入門種として最適で、丈夫さと美しさを兼ね備えている。コロニーが安定すれば順調に数が増える'
  },
  ad: {
    origin: 'タイ',
    maxSize: '最大約1.3cm',
    lifespan: '3-5年',
    case: 'プラケース（15×10cm以上）。密閉性高めのケース。Cubaris系共通',
    substrate: '腐葉土 3 : 砕き石灰石 5 : 赤玉土 2。石灰石を非常に多めに。厚さ4-6cm。石灰岩の塊もシェルターとして設置',
    temp: '23-27°C',
    humidity: '75-85%。高湿度必須。霧吹きは毎日〜2日に1回',
    food: '【主食】落ち葉（広葉樹）\n【副食】にんじん・かぼちゃ\n【タンパク源】フィッシュフード・乾燥エビ\n【カルシウム】石灰石大量+カトルボーン',
    breeding: '難しい。Cubaris系で最も人気があるが、繁殖は遅い。1回3-8匹程度と少数。「ラバーダッキー」の別名の通り、可愛らしい姿で人気が高い',
    tips: '琥珀色の美しい体色が最大の魅力。Cubaris系の中でも特に人気が高く、入手困難になることも。飼育自体はCubaris共通の方法で問題ないが、繁殖が遅いため大事に管理すること。石灰岩のシェルターは必須。パンダキング同様、石灰石の量が成功のカギ'
  },
  kit: null,
  sub: null
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
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navToggle.classList.remove('active'); mobileMenu.classList.remove('active'); document.body.style.overflow = '';
  }));

  // --- スクロールアニメーション ---
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), entry.target.dataset.delay || 0);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.fade-up').forEach(el => {
    const siblings = el.parentElement.querySelectorAll(':scope > .fade-up');
    el.dataset.delay = Array.from(siblings).indexOf(el) * 80;
    fadeObserver.observe(el);
  });

  // --- カテゴリフィルター ---
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card');
  const productsEmpty = document.getElementById('productsEmpty');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.category;
      let visibleCount = 0;
      productCards.forEach(card => {
        const show = cat === 'all' || card.dataset.category === cat;
        card.classList.toggle('filtered-out', !show);
        if (show) visibleCount++;
      });
      // 準備中メッセージの表示
      productsEmpty.style.display = visibleCount === 0 ? 'block' : 'none';
    });
  });

  // --- 商品検索 ---
  const searchInput = document.getElementById('productSearch');
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    if (q) { filterTabs.forEach(t => t.classList.remove('active')); filterTabs[0].classList.add('active'); }
    let visibleCount = 0;
    productCards.forEach(card => {
      if (!q) { card.classList.remove('filtered-out'); visibleCount++; return; }
      const name = card.querySelector('.product-name').textContent.toLowerCase();
      const sci = (card.querySelector('.product-scientific')?.textContent || '').toLowerCase();
      const show = name.includes(q) || sci.includes(q);
      card.classList.toggle('filtered-out', !show);
      if (show) visibleCount++;
    });
    productsEmpty.style.display = visibleCount === 0 ? 'block' : 'none';
  });

  // --- お気に入り ---
  let favorites = JSON.parse(localStorage.getItem('selectInsectsFav') || '[]');
  const favBtns = document.querySelectorAll('.fav-btn');
  function updateFavUI() { favBtns.forEach(btn => btn.classList.toggle('active', favorites.includes(btn.dataset.id))); }
  favBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const id = btn.dataset.id;
    const idx = favorites.indexOf(id);
    if (idx > -1) favorites.splice(idx, 1); else favorites.push(id);
    localStorage.setItem('selectInsectsFav', JSON.stringify(favorites));
    updateFavUI();
  }));
  updateFavUI();

  // --- モーダル ---
  const modalOverlay = document.getElementById('modalOverlay');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  function openCareModal(id) {
    const care = careData[id];
    if (!care) return;
    const card = document.querySelector(`.product-card[data-id="${id}"]`);
    const name = card.querySelector('.product-name').textContent;
    const sci = card.querySelector('.product-scientific').textContent;
    const price = card.querySelector('.product-price').innerHTML;
    const statusEl = card.querySelector('.product-status');
    const statusHTML = statusEl ? statusEl.outerHTML : '';
    const category = card.querySelector('.product-category').textContent;

    // 商品画像を取得（あれば実写、なければプレースホルダ）
    const photoEl = card.querySelector('.product-photo');
    const silEl = card.querySelector('.product-silhouette');
    const imageHTML = photoEl
      ? `<img src="${photoEl.src}" alt="${name}">`
      : `<span class="modal-image-placeholder">${silEl ? silEl.textContent : ''}</span>`;

    modalBody.innerHTML = `
      <div class="modal-image">${imageHTML}</div>
      <span class="modal-category">${category}</span>
      <h2 class="modal-name">${name}</h2>
      <p class="modal-scientific">${sci}</p>
      <div class="modal-status-price">
        ${statusHTML}
        <span class="modal-price">${price}</span>
      </div>
      <div class="modal-actions" style="margin-bottom:28px">
        <a href="#contact" class="modal-cta" onclick="document.getElementById('modalOverlay').classList.remove('active');document.body.style.overflow=''">XのDMで問い合わせる</a>
      </div>
      <h3 class="modal-care-title">飼育環境マニュアル</h3>
      <div class="modal-care-basic modal-care-grid">
        <div class="modal-care-item"><strong>原産地</strong>${care.origin}</div>
        <div class="modal-care-item"><strong>最大サイズ</strong>${care.maxSize}</div>
        <div class="modal-care-item"><strong>寿命</strong>${care.lifespan}</div>
      </div>
      <div class="modal-care-section">
        <h3>ケース</h3>
        <p>${care.case}</p>
      </div>
      <div class="modal-care-section">
        <h3>床材の配合</h3>
        <p>${care.substrate}</p>
      </div>
      <div class="modal-care-section">
        <h3>温度</h3>
        <p>${care.temp}</p>
      </div>
      <div class="modal-care-section">
        <h3>湿度</h3>
        <p>${care.humidity}</p>
      </div>
      <div class="modal-care-section">
        <h3>餌</h3>
        <p>${care.food.replace(/\n/g, '<br>')}</p>
      </div>
      <div class="modal-care-section">
        <h3>繁殖</h3>
        <p>${care.breeding}</p>
      </div>
      <div class="modal-care-section">
        <h3>飼育のコツ・注意点</h3>
        <p>${care.tips}</p>
      </div>
      <div class="modal-actions">
        <a href="#contact" class="modal-cta" onclick="document.getElementById('modalOverlay').classList.remove('active');document.body.style.overflow=''">この種について相談する</a>
      </div>
    `;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    modalBody.scrollTop = 0;
  }

  function closeModal() { modalOverlay.classList.remove('active'); document.body.style.overflow = ''; }

  // 飼育環境ボタン
  document.querySelectorAll('.care-btn').forEach(btn => {
    btn.addEventListener('click', (e) => { e.stopPropagation(); openCareModal(btn.dataset.id); });
  });

  // カードクリックでもモーダル
  productCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      if (careData[card.dataset.id]) openCareModal(card.dataset.id);
    });
    if (careData[card.dataset.id]) card.style.cursor = 'pointer';
  });

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // --- ご利用案内タブ ---
  document.querySelectorAll('.info-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.info-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.info-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.panel).classList.add('active');
    });
  });

  // --- FAQ ---
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // --- パーティクル ---
  const pc = document.getElementById('heroParticles');
  function cp() {
    const p = document.createElement('div'); p.classList.add('particle');
    const d = Math.random()*8+6, dl = Math.random()*4;
    p.style.cssText = `left:${Math.random()*100}%;bottom:-10px;width:${Math.random()*2.5+1.5}px;height:${Math.random()*2.5+1.5}px;animation-duration:${d}s;animation-delay:${dl}s`;
    pc.appendChild(p); setTimeout(() => { p.remove(); cp(); }, (d+dl)*1000);
  }
  for (let i=0;i<12;i++) cp();

  // --- スムーズスクロール ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href'); if (id === '#') return;
      const t = document.querySelector(id);
      if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 32, behavior: 'smooth' }); }
    });
  });

  // --- カートに入れるボタン ---
  document.querySelectorAll('.product-inquiry:not(.inquiry-notify)').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (btn.classList.contains('added')) return;
      btn.classList.add('added');
      btn.textContent = '追加済み';
    });
  });
});
