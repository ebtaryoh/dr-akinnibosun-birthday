/**
 * 69 & Glorious — Dr C.I Akinnibosun Birthday Website
 * Features: Particles, Countdown, Interactive Cake, Gallery, Tributes, 
 * Persistent Firebase Guestbook, Web Audio API Birthday Song.
 */

// ========== CONFIGURATION ==========
const CONFIG = {
  birthdayDate: '2026-03-17T00:00:00', // March 17
  celebrantName: 'Dr C.I Akinnibosun',
  // Firebase config placeholder - User will need to add their own keys for full functionality
  // I will implement a "pseudo-persistence" using LocalStorage if Firebase is not initialized
  firebaseConfig: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
  }
};

// ========== STATE ==========
let db = null;
try {
  if (typeof firebase !== 'undefined') {
    firebase.initializeApp(CONFIG.firebaseConfig);
    db = firebase.firestore();
  }
} catch (e) {
  console.warn("Firebase not initialized. Using local storage for wishes.");
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initParticles();
  initNavbar();
  initHeroCountdown();
  initRevealAnimations();
  initStatCounters();
  initCakeCandles();
  initGallery();
  initLightbox();
  initCarousel();
  initGuestbook();
  initMusicPlayer();
  initBackToTop();
  initConfetti();
  
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.getElementById('navbar').offsetHeight;
        window.scrollTo({
          top: target.offsetTop - navHeight,
          behavior: 'smooth'
        });
        // Close mobile menu if open
        document.querySelector('.nav-links').classList.remove('active');
        document.getElementById('navToggle').classList.remove('active');
      }
    });
  });
});

// ========== PRELOADER ==========
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const fill = preloader.querySelector('.preloader-fill');
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 30;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }, 500);
    }
    fill.style.width = `${progress}%`;
  }, 200);
}

// ========== PARTICLES ==========
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resize);
  resize();
  
  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.color = Math.random() > 0.5 ? '#c8a96e' : '#c0626e';
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
  
  // Click burst
  canvas.addEventListener('mousedown', (e) => {
    for (let i = 0; i < 10; i++) {
      const p = new Particle();
      p.x = e.clientX;
      p.y = e.clientY;
      p.speedX = (Math.random() - 0.5) * 5;
      p.speedY = (Math.random() - 0.5) * 5;
      particles.push(p);
      setTimeout(() => particles.shift(), 2000);
    }
  });
}

// ========== NAVBAR ==========
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// ========== HERO COUNTDOWN ==========
function initHeroCountdown() {
  const targetDate = new Date(CONFIG.birthdayDate).getTime();
  
  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;
    
    if (diff <= 0) {
      document.getElementById('heroCountdown').innerHTML = "<h2 class='celebrate-text'>Happy 69th Birthday Dr C.I Akinnibosun! 🎉</h2>";
      return;
    }
    
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('cd-days').innerText = d.toString().padStart(2, '0');
    document.getElementById('cd-hours').innerText = h.toString().padStart(2, '0');
    document.getElementById('cd-mins').innerText = m.toString().padStart(2, '0');
    document.getElementById('cd-secs').innerText = s.toString().padStart(2, '0');
  }
  
  setInterval(update, 1000);
  update();
}

// ========== REVEAL ANIMATIONS ==========
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });
  
  reveals.forEach(r => observer.observe(r));
}

// ========== STAT COUNTERS ==========
function initStatCounters() {
  const stats = document.querySelectorAll('.stat-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateValue(entry.target, 0, target, 2000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 1 });
  
  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
  stats.forEach(s => observer.observe(s));
}

// ========== CAKE & CANDLES ==========
function initCakeCandles() {
  const row = document.getElementById('candleRow');
  const relightBtn = document.getElementById('relight');
  const wishPrompt = document.getElementById('wishPrompt');
  let blownOutCount = 0;
  const totalCandles = 6;
  
  function createCandles() {
    row.innerHTML = '';
    blownOutCount = 0;
    wishPrompt.style.display = 'none';
    relightBtn.style.display = 'none';
    
    for (let i = 0; i < totalCandles; i++) {
      const candle = document.createElement('div');
      candle.className = 'candle';
      candle.innerHTML = '<div class="flame"></div><div class="smoke"></div>';
      candle.addEventListener('click', () => {
        if (!candle.classList.contains('out')) {
          candle.classList.add('out');
          blownOutCount++;
          if (blownOutCount === totalCandles) {
            celebrateWish();
          }
        }
      });
      row.appendChild(candle);
    }
  }
  
  function celebrateWish() {
    wishPrompt.style.display = 'block';
    relightBtn.style.display = 'inline-block';
    triggerConfetti();
  }
  
  relightBtn.addEventListener('click', createCandles);
  createCandles();
}

// ========== GALLERY ==========
const GALLERY_ITEMS = [
  { id: 1, category: 'family', title: 'With Family', img: 'images/gallery-1.jpg' },
  { id: 2, category: 'milestones', title: 'The Ordination', img: 'images/gallery-2.jpg' },
  { id: 3, category: 'memories', title: 'Joyful Times', img: 'images/gallery-3.jpg' },
  { id: 4, category: 'family', title: 'Grandchildren Love', img: 'images/gallery-4.jpg' },
  { id: 5, category: 'milestones', title: '60th Celebration', img: 'images/gallery-5.jpg' },
  { id: 6, category: 'memories', title: 'Quiet Reflection', img: 'images/gallery-6.jpg' },
  { id: 7, category: 'family', title: 'The Pillars', img: 'images/gallery-7.jpg' },
  { id: 8, category: 'milestones', title: 'New Heights', img: 'images/gallery-8.jpg' },
  { id: 9, category: 'memories', title: 'Beautiful Day', img: 'images/gallery-9.jpg' }
];

function initGallery() {
  const grid = document.getElementById('galleryGrid');
  const filters = document.querySelectorAll('.filter-btn');
  
  function render(filter = 'all') {
    grid.innerHTML = '';
    const filtered = filter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(item => item.category === filter);
    
    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'gallery-card reveal active';
      card.innerHTML = `
        <img src="${item.img}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400x500/1a1a2e/c8a96e?text=${item.title}'">
        <div class="gallery-overlay">
          <span>${item.title}</span>
          <button class="gallery-view-btn" data-id="${item.id}">View View</button>
        </div>
      `;
      grid.appendChild(card);
    });
  }
  
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      render(btn.dataset.filter);
    });
  });
  
  render();
}

// ========== LIGHTBOX ==========
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
  const close = document.getElementById('lightboxClose');
  const prev = document.getElementById('lightboxPrev');
  const next = document.getElementById('lightboxNext');
  
  let currentIndex = 0;
  
  document.getElementById('galleryGrid').addEventListener('click', (e) => {
    if (e.target.classList.contains('gallery-view-btn')) {
      const id = parseInt(e.target.dataset.id);
      currentIndex = GALLERY_ITEMS.findIndex(item => item.id === id);
      showLightbox();
    }
  });
  
  function showLightbox() {
    const item = GALLERY_ITEMS[currentIndex];
    img.src = item.img;
    img.onerror = () => { img.src = `https://via.placeholder.com/800x600/1a1a2e/c8a96e?text=${item.title}`; };
    caption.innerText = item.title;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  close.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
  
  prev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    showLightbox();
  });
  
  next.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % GALLERY_ITEMS.length;
    showLightbox();
  });
}

// ========== TRIBUTES CAROUSEL ==========
function initCarousel() {
  const carousel = document.getElementById('tributesCarousel');
  const cards = carousel.querySelectorAll('.tribute-card');
  const dotsContainer = document.getElementById('carouselDots');
  const prev = document.getElementById('carouselPrev');
  const next = document.getElementById('carouselNext');
  let current = 0;
  
  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = i === 0 ? 'dot active' : 'dot';
    dot.addEventListener('click', () => showSlide(i));
    dotsContainer.appendChild(dot);
  });
  
  const dots = dotsContainer.querySelectorAll('.dot');
  
  function showSlide(index) {
    cards[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = index;
    cards[current].classList.add('active');
    dots[current].classList.add('active');
  }
  
  next.addEventListener('click', () => {
    let n = (current + 1) % cards.length;
    showSlide(n);
  });
  
  prev.addEventListener('click', () => {
    let p = (current - 1 + cards.length) % cards.length;
    showSlide(p);
  });
  
  setInterval(() => {
    let n = (current + 1) % cards.length;
    showSlide(n);
  }, 6000);
}

// ========== GUESTBOOK (FIREBASE) ==========
const SEED_WISHES = [
  { name: 'Deacon Jones', relation: 'Colleague', msg: 'Happy 69th Birthday to a great teacher! Your insights into the Word have been a blessing.', emoji: '🙏' },
  { name: 'Olamide A.', relation: 'Family', msg: 'We love you so much Grandpa! You are the best.', emoji: '❤️' },
  { name: 'The Choir', relation: 'Friend', msg: 'Cheers to many more years of grace and powerful ministry!', emoji: '🥂' }
];

function initGuestbook() {
  const form = document.getElementById('wishForm');
  const emojiOpt = document.querySelectorAll('.emoji-opt');
  let selectedEmoji = '🎂';
  
  emojiOpt.forEach(opt => {
    opt.addEventListener('click', () => {
      emojiOpt.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedEmoji = opt.dataset.emoji;
    });
  });
  
  // Load wishes
  loadWishes();
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const wish = {
      name: document.getElementById('wishName').value,
      relation: document.getElementById('wishRelation').value,
      msg: document.getElementById('wishMessage').value,
      emoji: selectedEmoji,
      timestamp: Date.now()
    };
    
    // Save Wish
    await saveWish(wish);
    
    // UI Update
    addWishToWall(wish, true);
    form.reset();
    triggerConfetti();
  });
}

async function saveWish(wish) {
  if (db) {
    try {
      await db.collection('wishes').add(wish);
    } catch (e) {
      console.error("Firebase save failed:", e);
      saveLocally(wish);
    }
  } else {
    saveLocally(wish);
  }
}

function saveLocally(wish) {
  const wishes = JSON.parse(localStorage.getItem('birthday_wishes') || '[]');
  wishes.push(wish);
  localStorage.setItem('birthday_wishes', JSON.stringify(wishes));
}

function loadWishes() {
  const wall = document.getElementById('wishesWall');
  wall.innerHTML = '';
  
  // Initial seeds
  SEED_WISHES.forEach(w => addWishToWall(w));
  
  if (db) {
    db.collection('wishes').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // Clear and re-render or just append? 
      // For simplicity, we clear and re-render dynamic ones
      const dynamicWishes = snapshot.docs.map(doc => doc.data());
      renderDynamicWishes(dynamicWishes);
    });
  } else {
    const local = JSON.parse(localStorage.getItem('birthday_wishes') || '[]');
    renderDynamicWishes(local);
  }
}

function renderDynamicWishes(wishes) {
  const wall = document.getElementById('wishesWall');
  // Keep seeds, clear others? Let's just keep seeds at top
  // Remove all cards that aren't seeds
  const cards = wall.querySelectorAll('.wish-card');
  cards.forEach(c => {
    if (!c.classList.contains('seed')) c.remove();
  });
  wishes.forEach(w => addWishToWall(w, false, false));
}

function addWishToWall(wish, isNew = false, isSeed = true) {
  const wall = document.getElementById('wishesWall');
  const card = document.createElement('div');
  card.className = `wish-card${isNew ? ' new' : ''}${isSeed ? ' seed' : ''}`;
  card.innerHTML = `
    <div class="wish-emoji">${wish.emoji}</div>
    <div class="wish-text">"${wish.msg}"</div>
    <div class="wish-meta">
      <strong>${wish.name}</strong> • ${wish.relation}
    </div>
  `;
  wall.prepend(card);
}

// ========== MUSIC PLAYER (WEB AUDIO API) ==========
function initMusicPlayer() {
  const toggle = document.getElementById('musicToggle');
  const player = document.getElementById('musicPlayer');
  let audioCtx = null;
  let isPlaying = false;
  let birthdayLoop = null;

  toggle.addEventListener('click', () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (isPlaying) {
      stopBirthdaySong();
    } else {
      playBirthdaySong();
    }
    
    isPlaying = !isPlaying;
    player.classList.toggle('playing', isPlaying);
  });

  // Simple "Happy Birthday" melody using oscillators
  const melody = [
    {note: 261.63, duration: 0.4}, {note: 261.63, duration: 0.2}, {note: 293.66, duration: 0.6}, {note: 261.63, duration: 0.6}, {note: 349.23, duration: 0.6}, {note: 329.63, duration: 1.2},
    {note: 261.63, duration: 0.4}, {note: 261.63, duration: 0.2}, {note: 293.66, duration: 0.6}, {note: 261.63, duration: 0.6}, {note: 392.00, duration: 0.6}, {note: 349.23, duration: 1.2},
    {note: 261.63, duration: 0.4}, {note: 261.63, duration: 0.2}, {note: 523.25, duration: 0.6}, {note: 440.00, duration: 0.6}, {note: 349.23, duration: 0.6}, {note: 329.63, duration: 0.6}, {note: 293.66, duration: 1.2},
    {note: 466.16, duration: 0.4}, {note: 466.16, duration: 0.2}, {note: 440.00, duration: 0.6}, {note: 349.23, duration: 0.6}, {note: 392.00, duration: 0.6}, {note: 349.23, duration: 1.2}
  ];

  function playNote(freq, start, duration) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, start);
    
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.1, start + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(start);
    osc.stop(start + duration);
  }

  function playBirthdaySong() {
    let now = audioCtx.currentTime;
    let totalDuration = 0;
    
    melody.forEach(m => {
      playNote(m.note, now + totalDuration, m.duration);
      totalDuration += m.duration;
    });

    birthdayLoop = setTimeout(() => {
      if (isPlaying) playBirthdaySong();
    }, totalDuration * 1000 + 500);
  }

  function stopBirthdaySong() {
    clearTimeout(birthdayLoop);
    if (audioCtx) audioCtx.suspend();
  }
  
  window.addEventListener('blur', () => {
    if (isPlaying) stopBirthdaySong();
  });
  window.addEventListener('focus', () => {
    if (isPlaying) audioCtx.resume();
  });
}

// ========== BACK TO TOP ==========
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========== CONFETTI ==========
function initConfetti() {
  document.getElementById('throwConfetti').addEventListener('click', triggerConfetti);
}

function triggerConfetti() {
  // Simplistic CSS-based confetti or canvas logic
  // For maximum WOW, let's create 100 elements
  const container = document.body;
  for (let i = 0; i < 100; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.left = `${Math.random() * 100}%`;
    c.style.top = `-20px`;
    c.style.backgroundColor = ['#c8a96e', '#c0626e', '#f0d080', '#ffffff'][Math.floor(Math.random() * 4)];
    c.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(c);
    
    const animation = c.animate([
      { transform: `translate3d(0,0,0) rotate(0deg)`, opacity: 1 },
      { transform: `translate3d(${(Math.random() - 0.5) * 200}px, ${window.innerHeight + 20}px, 0) rotate(${Math.random() * 1000}deg)`, opacity: 0 }
    ], {
      duration: Math.random() * 3000 + 2000,
      easing: 'cubic-bezier(0, .9, .57, 1)'
    });
    
    animation.onfinish = () => c.remove();
  }
}
