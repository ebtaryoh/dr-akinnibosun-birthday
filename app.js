/* ================================================================
   A LEGACY OF GRACE — Birthday Celebration App JS
   ================================================================ */

'use strict';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, doc, updateDoc, getDocs, limit, startAfter } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGKxX5sEcyjkOTq9lsrSnoErA01oz0AGY",
  authDomain: "daddy-birthday.firebaseapp.com",
  projectId: "daddy-birthday",
  storageBucket: "daddy-birthday.firebasestorage.app",
  messagingSenderId: "302454431091",
  appId: "1:302454431091:web:c2afecac8297ec9b073906",
  measurementId: "G-E84NV73NMR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// ================================================================
// CONFIGURATION
// ================================================================
const CONFIG = {
  // Next birthday: dynamically calculated to stay timeless
  birthdayDate: (() => {
    const now = new Date();
    const date = new Date(now.getFullYear(), 2, 17); // March 17
    if (date < now) date.setFullYear(now.getFullYear() + 1);
    return date;
  })(),
  candleCount: 8, // Standard decorative count
};

// Gallery data
const GALLERY_ITEMS = [
  { id: 1, category: 'family', src: 'images/family_with_children.jpeg', caption: 'A Legacy of Family Love', bg: 'linear-gradient(135deg, #2c1810, #5a3020)' },
  { id: 2, category: 'milestones', src: 'images/celebrant_main.jpeg', caption: 'Years of Achievement', bg: 'linear-gradient(135deg, #1a1530, #3a2060)' },
  { id: 3, category: 'memories', src: 'images/memories_1.jpeg', caption: 'Springtime Memories', bg: 'linear-gradient(135deg, #1a1025, #3a1545)' },
  { id: 4, category: 'family', src: 'images/celebrant_wife_1.jpeg', caption: 'Love in Every Moment', bg: 'linear-gradient(135deg, #2a1015, #602030)' },
  { id: 5, category: 'family', src: 'images/celebrant_wife_2.jpeg', caption: 'Cherished Bonds', bg: 'linear-gradient(135deg, #1a1a10, #3a3515)' },
  { id: 6, category: 'memories', src: 'images/memories_2.jpeg', caption: 'Golden Sunrises', bg: 'linear-gradient(135deg, #1a0f05, #3a2010)' },
  { id: 7, category: 'family', src: 'images/celebrant_wife_3.jpeg', caption: 'Together Through Everything', bg: 'linear-gradient(135deg, #101a1a, #153a35)' },
  { id: 8, category: 'milestones', emoji: '✨', caption: 'A Magnificent Legacy', bg: 'linear-gradient(135deg, #1a1510, #3a2c15)' },
  { id: 9, category: 'memories', emoji: '🎵', caption: 'Songs of a Lifetime', bg: 'linear-gradient(135deg, #0f1520, #1a2a40)' },
];

// Seed wishes
const SEED_WISHES = [
  { name: 'Adaeze Emmanuel', relation: 'Family', message: 'Mama, you are the glue that holds us all together. Your love is our greatest inheritance. We love you!', emoji: '❤️' },
  { name: 'The Grandchildren', relation: 'Family', message: 'Grandma, every memory with you is our favourite memory. Thank you for being our safe place always. 🎂', emoji: '🎂' },
  { name: 'Chioma Okafor', relation: 'Friend', message: 'Decades of being the most remarkable woman I know. Here\'s to many more golden moments!', emoji: '🥂' },
];

// ================================================================
// DOM READY
// ================================================================
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initParticles();
  initNavbar();
  initHeroCountdown();
  initRevealAnimations();
  initStatCounters();
  initCakeCandles();
  initGallery();
  initCarousel();
  initGuestbook();
  initMusicPlayer();
  initLightbox();
  initBackToTop();
  initConfetti();
  initFamilyTributes();
});

// ================================================================
// PRELOADER
// ================================================================
function initPreloader() {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.style.overflow = 'visible';
  }, 2400);
}

// ================================================================
// PARTICLE CANVAS
// ================================================================
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = [
    'rgba(200,169,110,',
    'rgba(240,208,128,',
    'rgba(192,98,110,',
    'rgba(255,255,255,',
  ];

  const SHAPES = ['circle', 'star', 'plus'];

  class Particle {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x = Math.random() * W;
      this.y = initial ? Math.random() * H : H + 20;
      this.size = Math.random() * 3 + 1;
      this.speed = Math.random() * 0.6 + 0.2;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      this.drift = (Math.random() - 0.5) * 0.5;
      this.angle = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.04;
      this.twinkle = Math.random() > 0.7;
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
      this.phase = Math.random() * Math.PI * 2;
    }
    update() {
      this.y -= this.speed;
      this.x += this.drift;
      this.angle += this.rotSpeed;
      this.phase += this.twinkleSpeed;
      if (this.twinkle) {
        this.opacity = 0.1 + Math.abs(Math.sin(this.phase)) * 0.4;
      }
      if (this.y < -20) this.reset();
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color + this.opacity + ')';
      ctx.strokeStyle = this.color + this.opacity * 0.5 + ')';
      if (this.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.shape === 'star') {
        drawStar(ctx, 0, 0, 5, this.size * 2, this.size);
        ctx.fill();
      } else {
        ctx.fillRect(-this.size / 2, -this.size * 1.5, this.size, this.size * 3);
        ctx.fillRect(-this.size * 1.5, -this.size / 2, this.size * 3, this.size);
      }
      ctx.restore();
    }
  } 
   
  function drawStar(ctx, cx, cy, spikes, outerR, innerR) {
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerR);
    for (let i = 0; i < spikes; i++) {
      ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
      rot += step;
      ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerR);
    ctx.closePath();
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();

  // Burst effect on click
  canvas.addEventListener('click', (e) => {
    for (let i = 0; i < 12; i++) {
      const p = new Particle();
      p.x = e.clientX;
      p.y = e.clientY;
      p.speed = Math.random() * 3 + 1;
      p.opacity = 0.8;
      p.size = Math.random() * 4 + 2;
      particles.push(p);
    }
    if (particles.length > 150) particles.splice(0, 20);
  });
}

// ================================================================
// NAVBAR
// ================================================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
  });

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => links.classList.remove('open'));
  });
}

// ================================================================
// HERO COUNTDOWN
// ================================================================
function initHeroCountdown() {
  const birthday = CONFIG.birthdayDate;
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');
  const countdownEl = document.getElementById('heroCountdown');
  if (!countdownEl) return;

  function update() {
    const now = new Date();
    const target = new Date(birthday);
    // If birthday passed, set next year
    if (target < now) {
      target.setFullYear(now.getFullYear() + 1);
    }
    const diff = target - now;
    if (diff <= 0) {
      countdownEl.innerHTML = '<div class="cd-num" style="-webkit-text-fill-color: var(--gold-light); font-size: clamp(1.5rem, 4vw, 2.5rem);">🎉 It\'s Your Birthday! 🎂</div>';
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const fmt = (n) => String(n).padStart(2, '0');
    daysEl.textContent = fmt(days);
    hoursEl.textContent = fmt(hours);
    minsEl.textContent = fmt(mins);
    secsEl.textContent = fmt(secs);
  }
  update();
  setInterval(update, 1000);
}

// ================================================================
// SCROLL REVEAL
// ================================================================
function initRevealAnimations() {
  const els = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
}

// ================================================================
// STAT COUNTERS
// ================================================================
function initStatCounters() { // Generic stat counter logic
  const stats = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
}

function countUp(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = Date.now();

  function tick() {
    const progress = Math.min((Date.now() - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target + (target === 1000 ? '+' : '');
  }
  tick();
}

// ================================================================
// CAKE CANDLES
// ================================================================
function initCakeCandles() {
  const row = document.getElementById('candleRow');
  const wishPrompt = document.getElementById('wishPrompt');
  const relightBtn = document.getElementById('relight');
  let lit = CONFIG.candleCount;

  // Create candles
  for (let i = 0; i < CONFIG.candleCount; i++) {
    const candle = document.createElement('div');
    candle.className = 'candle';
    candle.innerHTML = `
      <div class="candle-flame" id="flame${i}"></div>
      <div class="candle-smoke" id="smoke${i}"></div>
      <div class="candle-wick"></div>
      <div class="candle-body"></div>
    `;
    candle.addEventListener('click', () => blowOut(i));
    row.appendChild(candle);
  }

  function blowOut(i) {
    const flame = document.getElementById('flame' + i);
    const smoke = document.getElementById('smoke' + i);
    if (!flame || flame.classList.contains('out')) return;
    flame.classList.add('out');
    smoke.style.display = 'block';
    setTimeout(() => { if (smoke) smoke.style.display = 'none'; }, 1000);
    lit--;
    if (lit <= 0) {
      wishPrompt.style.display = 'block';
      relightBtn.style.display = 'inline-block';
      triggerMiniConfetti();
    }
  }

  relightBtn.addEventListener('click', () => {
    for (let i = 0; i < CONFIG.candleCount; i++) {
      const flame = document.getElementById('flame' + i);
      if (flame) flame.classList.remove('out');
    }
    lit = CONFIG.candleCount;
    wishPrompt.style.display = 'none';
    relightBtn.style.display = 'none';
  });

  document.getElementById('cake-section')?.addEventListener('click', (e) => {
    if (e.target.closest('.candle')) return;
    // Blow out all candles when clicking cake
  });
}

// ================================================================
// GALLERY
// ================================================================
function initGallery() {
  const grid = document.getElementById('galleryGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  let lightboxItems = [];
  let currentLightboxIndex = 0;

  // Build gallery cards
  GALLERY_ITEMS.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.dataset.category = item.category;
    card.innerHTML = `
      <div class="gallery-card-inner" style="background: ${item.bg};">
        ${item.src ? `<img src="${item.src}" alt="${item.caption}" class="gallery-img">` : `
        <div class="gallery-placeholder">
          <span class="gallery-icon">${item.emoji}</span>
          <p>${item.caption}</p>
        </div>`}
      </div>
      <div class="gallery-overlay">
        <div class="gallery-caption">${item.caption}</div>
      </div>
    `;
    card.addEventListener('click', () => openLightbox(idx));
    grid.appendChild(card);
    lightboxItems.push(item);
  });

  window._galleryItems = lightboxItems;

  // Filter
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.gallery-card').forEach(card => {
        const matches = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !matches);
        if (matches) {
          card.style.animation = 'none';
          card.offsetHeight;
          card.style.animation = '';
        }
      });
    });
  });
}

// ================================================================
// LIGHTBOX
// ================================================================
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
  const placeholder = document.getElementById('lightboxPlaceholder');

  let current = 0;

  window.openLightbox = (idx) => {
    current = idx;
    showLightboxItem(current);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function showLightboxItem(idx) {
    const items = window._galleryItems || [];
    const item = items[idx];
    if (!item) return;
    if (item.src) {
      img.src = item.src;
      img.style.display = 'block';
      placeholder.style.display = 'none';
    } else {
      img.style.display = 'none';
      placeholder.style.display = 'flex';
      placeholder.innerHTML = `<span>${item.emoji}</span><p>${item.caption}</p>`;
    }
    caption.textContent = item.caption;
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });

  prevBtn.addEventListener('click', () => {
    const items = window._galleryItems || [];
    current = (current - 1 + items.length) % items.length;
    showLightboxItem(current);
  });
  nextBtn.addEventListener('click', () => {
    const items = window._galleryItems || [];
    current = (current + 1) % items.length;
    showLightboxItem(current);
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });
}

// ================================================================
// TRIBUTES CAROUSEL
// ================================================================
function initCarousel() {
  const cards = document.querySelectorAll('.tribute-card');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  let current = 0;
  let autoTimer;

  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(idx) {
    cards[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = (idx + cards.length) % cards.length;
    cards[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }
  resetAuto();
}

// ================================================================
// GUESTBOOK / WISHES
// ================================================================
function initGuestbook() {
  const form = document.getElementById('wishForm');
  const wall = document.getElementById('wishesWall');
  const emojiPicker = document.getElementById('emojiPicker');
  const submitBtn = document.getElementById('submitWish');
  let selectedEmoji = '🎂';
  let editingWishId = null;

  // Local Storage Key
  const L_STORAGE_KEY = 'birthday_wishes_backup';

  // Load from local storage first (Fallback)
  renderLocalBackup();

  // Setup Real-time Firestore Listener
  const q = query(collection(db, "wishes"), orderBy("timestamp", "desc"), limit(50));
  
  onSnapshot(q, (snapshot) => {
    const wishes = [];
    snapshot.forEach((doc) => {
      wishes.push({ id: doc.id, ...doc.data() });
    });
    
    console.log("Real-time update: Received", wishes.length, "wishes");
    
    // Sanitize timestamps for storage
    const wishesToStore = wishes.map(w => ({
      ...w,
      timestamp: w.timestamp?.toDate ? w.timestamp.toDate().toISOString() : w.timestamp
    }));
    
    localStorage.setItem(L_STORAGE_KEY, JSON.stringify(wishesToStore));
    renderWishes(wishes);
  }, (error) => {
    console.error("Firestore Listener Error:", error);
    // If listener fails, we already rendered from local backup
  });

  function renderLocalBackup() {
    const backup = localStorage.getItem(L_STORAGE_KEY);
    if (backup) {
      try {
        const wishes = JSON.parse(backup);
        console.log("Loaded from LocalStorage backup:", wishes.length);
        renderWishes(wishes);
      } catch (e) {
        console.error("Error parsing local backup", e);
      }
    } else {
      // Use Seed Wishes if nothing exists
      renderWishes(SEED_WISHES.map(w => ({ ...w, id: 'seed-' + Math.random() })));
    }
  }

  function renderWishes(wishes) {
    wall.innerHTML = '';
    if (wishes.length === 0) {
      wall.innerHTML = '<div class="text-center section-sub">No wishes yet. Be the first to leave one!</div>';
      return;
    }
    wishes.forEach(addWishCard);
  }

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('wishName').value.trim();
    const relation = document.getElementById('wishRelation').value;
    const message = document.getElementById('wishMessage').value.trim();

    if (!name || !message) return;

    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      if (editingWishId) {
        const wishDoc = doc(db, "wishes", editingWishId);
        await updateDoc(wishDoc, {
          name,
          relation,
          message,
          emoji: selectedEmoji,
          updatedAt: serverTimestamp()
        });
        editingWishId = null;
      } else {
        await addDoc(collection(db, "wishes"), {
          name,
          relation,
          message,
          emoji: selectedEmoji,
          timestamp: serverTimestamp()
        });
      }

      form.reset();
      resetEmojiPicker();
      submitBtn.textContent = 'Send My Wish 🎁';
      triggerMiniConfetti();
      
    } catch (error) {
      console.error("Error saving wish:", error);
      alert(`Could not save your wish: ${error.message}\n\nPlease check your Firestore rules.`);
      submitBtn.textContent = originalBtnText;
    } finally {
      submitBtn.disabled = false;
    }
  });

  function resetEmojiPicker() {
    emojiPicker.querySelectorAll('.emoji-opt').forEach(o => o.classList.remove('selected'));
    const defaultEmoji = emojiPicker.querySelector('[data-emoji="🎂"]');
    if (defaultEmoji) defaultEmoji.classList.add('selected');
    selectedEmoji = '🎂';
  }

  function addWishCard(wish) {
    const card = document.createElement('div');
    card.className = 'wish-card';
    card.dataset.id = wish.id;
    const initial = (wish.name || "?").charAt(0).toUpperCase();
    
    let dateStr = 'Just now';
    if (wish.timestamp) {
      const date = wish.timestamp.toDate ? wish.timestamp.toDate() : new Date(wish.timestamp);
      dateStr = isNaN(date.getTime()) ? 'Recently' : date.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
    }

    card.innerHTML = `
      <div class="wish-card-header">
        <div class="wish-avatar">${initial}</div>
        <div class="wish-meta">
          <div class="wish-name">${escapeHTML(wish.name || "Anonymous")}</div>
          <div class="wish-relation">${escapeHTML(wish.relation || "Guest")} • ${dateStr}</div>
        </div>
        <div class="wish-emoji">${wish.emoji || "🎂"}</div>
      </div>
      <div class="wish-message">"${escapeHTML(wish.message || "")}"</div>
      <button class="btn-edit-wish" title="Edit your wish">Edit</button>
    `;

    card.querySelector('.btn-edit-wish').addEventListener('click', () => {
      document.getElementById('wishName').value = wish.name;
      document.getElementById('wishRelation').value = wish.relation;
      document.getElementById('wishMessage').value = wish.message;
      
      emojiPicker.querySelectorAll('.emoji-opt').forEach(o => {
        o.classList.toggle('selected', o.dataset.emoji === wish.emoji);
      });
      selectedEmoji = wish.emoji;
      
      editingWishId = wish.id;
      submitBtn.textContent = 'Update My Wish ✨';
      document.getElementById('wishes').scrollIntoView({ behavior: 'smooth' });
    });

    wall.appendChild(card);
  }
}

function escapeHTML(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// ================================================================
// MUSIC PLAYER
// ================================================================
function initMusicPlayer() {
  const player = document.getElementById('musicPlayer');
  const toggle = document.getElementById('musicToggle');
  const icon = toggle.querySelector('.music-icon');
  let isPlaying = false;

  // Create audio element (Happy Birthday melody — data URI workaround for demo)
  const audio = new Audio();
  // Use a royalty-free birthday tune URL as demo
  // In production, replace with actual audio file path
  audio.src = '/music/birthday.mp3';
  audio.loop = true;
  audio.volume = 0.5;

  toggle.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      player.classList.remove('playing');
      icon.textContent = '♪';
      isPlaying = false;
    } else {
      audio.play().catch(() => {
        // Audio play might fail without user interaction on first load
        // Show info instead
        player.classList.add('playing');
        icon.textContent = '⏸';
        isPlaying = true;
      });
      player.classList.add('playing');
      icon.textContent = '⏸';
      isPlaying = true;
    }
  });
}

// ================================================================
// BACK TO TOP
// ================================================================
function initBackToTop() {
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ================================================================
// CONFETTI
// ================================================================
function initConfetti() {
  document.getElementById('throwConfetti')?.addEventListener('click', () => {
    launchConfetti(200);
  });
}

function launchConfetti(count = 120) {
  const colors = ['#f0d080', '#c8a96e', '#c0626e', '#ffffff', '#a0783a', '#e8909a'];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const color = colors[Math.floor(Math.random() * colors.length)];
    const startX = Math.random() * 100;
    const dx = (Math.random() - 0.5) * 200;
    const rot = Math.random() * 720 - 360;
    const size = Math.random() * 8 + 4;
    const dur = Math.random() * 2.5 + 2;
    piece.style.cssText = `
      left: ${startX}vw;
      top: -20px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      --dx: ${dx}px;
      --rot: ${rot}deg;
      animation-duration: ${dur}s;
      animation-delay: ${Math.random() * 0.5}s;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
    `;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), (dur + 0.5) * 1000);
  }
}

function triggerMiniConfetti() {
  launchConfetti(60);
}

// ================================================================
// FAMILY TRIBUTES LOGIC
// ================================================================
const FAMILY_VIDEOS = [
  { id: 'gc1', name: 'Grandchildren', relation: 'First in our hearts', emoji: '👶', src: 'videos/family/grandchildren_one.mp4' },
  { id: 'gc2', name: 'Grandchildren', relation: 'Purest Love', emoji: '👦', src: 'videos/family/grandchildren_two.mp4' },
  { id: 'son1', name: 'First Son', relation: 'The First Strength', emoji: '👨‍💼', src: 'videos/family/first_son.mp4' },
  { id: 'son2', name: 'Second Son', relation: 'The Pillar', emoji: '👨‍🔬', src: 'videos/family/second_son.mp4' },
  { id: 'daughter', name: 'Daughter', relation: 'The Joy', emoji: '👩‍⚕️', src: 'videos/family/daughter.mp4' },
  { id: 'friend', name: 'Daughter\'s Friend', relation: 'Family by Choice', emoji: '🤝', src: 'videos/family/daughter_friend.mp4' },
  { id: 'son3', name: 'Third Son', relation: 'The Visionary', emoji: '👨‍🎨', src: 'videos/family/third_son.mp4' },
  { id: 'son4', name: 'Fourth Son', relation: 'The Promise', emoji: '👨‍🚀', src: 'videos/family/fourth_son.mp4' },
  { id: 'wife', name: 'The Wife', relation: 'The Queen • Forever', emoji: '👸', src: 'videos/family/wife.mp4' },
];

function initFamilyTributes() {
  const video = document.getElementById('familyVideoPlayer');
  const playPauseBtn = document.getElementById('videoPlayPause');
  const prevBtn = document.getElementById('videoPrev');
  const nextBtn = document.getElementById('videoNext');
  const progressLine = document.getElementById('videoProgress');
  const progressWrap = document.querySelector('.video-progress-wrap');
  const timeDisplay = document.getElementById('videoTime');
  const muteBtn = document.getElementById('videoMute');
  const wrapper = document.querySelector('.video-player-wrapper');
  const overlay = document.getElementById('videoOverlay');
  
  let currentIndex = 0;

  function switchVideo(index) {
    if (index < 0 || index >= FAMILY_VIDEOS.length) return;
    
    currentIndex = index;
    const item = FAMILY_VIDEOS[currentIndex];

    wrapper.classList.add('switching');
    launchConfetti(40); // Add celebratory confetti

    video.src = item.src;
    video.play().then(() => {
      playPauseBtn.textContent = '⏸';
      wrapper.classList.remove('paused');
    }).catch(() => {
      playPauseBtn.textContent = '▶';
      wrapper.classList.add('paused');
    });

    setTimeout(() => {
      wrapper.classList.remove('switching');
    }, 2000);
  }

  // Initial Load (without auto-play to respect browser policies)
  const firstVideo = FAMILY_VIDEOS[0];
  video.src = firstVideo.src;

  // Controls
  playPauseBtn.addEventListener('click', togglePlay);
  overlay.addEventListener('click', togglePlay);

  function togglePlay() {
    if (video.paused) {
      video.play();
      playPauseBtn.textContent = '⏸';
      wrapper.classList.remove('paused');
    } else {
      video.pause();
      playPauseBtn.textContent = '▶';
      wrapper.classList.add('paused');
    }
  }

  nextBtn.addEventListener('click', () => {
    switchVideo((currentIndex + 1) % FAMILY_VIDEOS.length);
  });

  prevBtn.addEventListener('click', () => {
    switchVideo((currentIndex - 1 + FAMILY_VIDEOS.length) % FAMILY_VIDEOS.length);
  });

  video.addEventListener('timeupdate', () => {
    const progress = (video.currentTime / video.duration) * 100;
    progressLine.style.width = `${progress}%`;
    timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
  });

  video.addEventListener('ended', () => {
    if (currentIndex < FAMILY_VIDEOS.length - 1) {
      switchVideo(currentIndex + 1);
    } else {
      playPauseBtn.textContent = '▶';
      wrapper.classList.add('paused');
    }
  });

  progressWrap.addEventListener('click', (e) => {
    const rect = progressWrap.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  });

  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? '🔇' : '🔊';
  });

  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}

// ================================================================
// PARALLAX HERO BG NUMBER
// ================================================================
window.addEventListener('scroll', () => {
  const bgNum = document.querySelector('.hero-bg-number');
  if (!bgNum) return;
  const val = window.scrollY * 0.4;
  bgNum.style.transform = `translate(-50%, calc(-50% + ${val}px))`;
});

// ================================================================
// SMOOTH ANCHOR SCROLLING WITH OFFSET FOR FIXED NAV
// ================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
