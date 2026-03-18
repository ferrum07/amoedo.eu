/* ============================================================
   AMOEDO — UI Global: dark mode, hamburger, banner, lightbox, reveal
   ============================================================ */

// ── Dark Mode ─────────────────────────────────────────────
const THEME_KEY = 'amoedoTheme';

function initDarkMode() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  document.querySelectorAll('.dark-toggle').forEach(btn => {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.title = theme === 'dark' ? 'Modo claro' : 'Modo oscuro';
  });
}

function toggleDark() {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ── Hamburger / Mobile Nav ─────────────────────────────────
function initHamburger() {
  const burger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileClose = document.getElementById('mobile-nav-close');
  if (!burger || !mobileNav) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
  mobileNav.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', closeMobileNav));
}

function closeMobileNav() {
  const burger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (burger)     burger.classList.remove('open');
  if (mobileNav)  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Event Banner Countdown ─────────────────────────────────
function updateBannerCountdown() {
  const el = document.getElementById('banner-countdown');
  if (!el) return;
  const target = new Date('2027-01-15T00:00:00');
  const diff = Math.ceil((target - new Date()) / 86400000);
  el.textContent = diff > 0 ? diff + ' días' : '¡Hoy!';
}

// ── Scroll Reveal ─────────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.06) + 's';
    obs.observe(el);
  });
}

// ── Lightbox ──────────────────────────────────────────────
let lightboxItems = [];
let lightboxIndex = 0;

function initLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;

  lightboxItems = Array.from(document.querySelectorAll('.photo-item'));

  lightboxItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  document.getElementById('lb-close').addEventListener('click', closeLightbox);
  document.getElementById('lb-prev').addEventListener('click', () => moveLightbox(-1));
  document.getElementById('lb-next').addEventListener('click', () => moveLightbox(1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') moveLightbox(-1);
    if (e.key === 'ArrowRight') moveLightbox(1);
  });
}

function openLightbox(i) {
  lightboxIndex = i;
  renderLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function moveLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxItems.length) % lightboxItems.length;
  renderLightbox();
}

function renderLightbox() {
  const item = lightboxItems[lightboxIndex];
  const svg  = item.querySelector('svg');
  const label = item.querySelector('.photo-label');
  const lbImg = document.getElementById('lb-img');
  const lbCap = document.getElementById('lb-caption');

  // Clone SVG and show it large
  if (svg) {
    lbImg.innerHTML = '';
    const clone = svg.cloneNode(true);
    clone.style.width = '100%';
    clone.style.height = 'auto';
    clone.style.borderRadius = '12px';
    clone.style.display = 'block';
    lbImg.appendChild(clone);
  }
  if (lbCap) lbCap.textContent = label ? label.textContent : '';
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initHamburger();
  updateBannerCountdown();
  setInterval(updateBannerCountdown, 60000);
  initReveal();
  initLightbox();
});
