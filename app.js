// Configure the real HTTPS checkout here. An empty value keeps purchases in preview mode.
const CHECKOUT_URL = 'https://pay.kiwify.com.br/Pc6R80E';

const checkout = /^https:\/\/[^/\s]+/i.test(CHECKOUT_URL) ? CHECKOUT_URL : '';
const offerButton = document.querySelector('button[data-buy]');
const checkoutMessage = document.querySelector('.checkout-message');

if (checkout) {
  document.querySelector('#compra-segura').hidden = false;
}

offerButton.addEventListener('click', () => {
  if (!checkout) {
    checkoutMessage.hidden = false;
    return;
  }

  // Integrations can listen for this event once tracking is configured.
  window.dispatchEvent(new CustomEvent('advento:checkout-click', {
    detail: { placement: offerButton.dataset.buy, value: 19.90, currency: 'BRL' },
  }));

  window.location.assign(checkout);
});

const music = document.querySelector('#musica-natal');
const soundToggle = document.querySelector('.sound-toggle');
const soundIcon = soundToggle.querySelector('span');

function updateSoundToggle() {
  soundToggle.setAttribute('aria-label', music.paused ? 'Ligar música' : 'Desligar música');
  soundIcon.textContent = music.paused ? '🔇' : '🔊';
}

function playMusic() {
  music.play().catch(updateSoundToggle);
}

music.volume = 0.25;
music.addEventListener('play', updateSoundToggle);
music.addEventListener('pause', updateSoundToggle);
soundToggle.addEventListener('click', () => {
  if (music.paused) {
    playMusic();
  } else {
    music.pause();
  }
});
soundToggle.hidden = false;
playMusic();

const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const opening = document.querySelector('.opening');
const landscape = document.querySelector('.landscape');
const snow = document.querySelector('.snow');
const mobileBuy = document.querySelector('.mobile-buy');
const reveal = new IntersectionObserver((entries, observer) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}, { threshold: 0.12 });

if (!motion.matches) {
  document.documentElement.classList.add('motion');
  document.querySelectorAll('[data-reveal]').forEach((element) => reveal.observe(element));

  const flakes = document.createDocumentFragment();
  const amount = window.matchMedia('(max-width: 660px)').matches ? 22 : 42;
  for (let index = 0; index < amount; index++) {
    const flake = document.createElement('i');
    flake.className = 'flake';
    flake.style.setProperty('--x', Math.random() * 100 + '%');
    flake.style.setProperty('--size', 1.5 + Math.random() * 4 + 'px');
    flake.style.setProperty('--opacity', 0.2 + Math.random() * 0.54);
    flake.style.setProperty('--duration', 9 + Math.random() * 14 + 's');
    flake.style.setProperty('--delay', -Math.random() * 23 + 's');
    flake.style.setProperty('--drift', -34 + Math.random() * 68 + 'px');
    flakes.append(flake);
  }
  snow.append(flakes);

  let openingHeight = opening.offsetHeight;
  const resize = new ResizeObserver(() => {
    openingHeight = opening.offsetHeight;
    snow.style.setProperty('--snow-height', openingHeight + 'px');
  });
  resize.observe(opening);

  let frame = 0;
  function updateParallax() {
    frame = 0;
    const progress = Math.min(Math.max(window.scrollY, 0), openingHeight);
    landscape.style.transform = motion.matches ? '' : 'translateY(' + progress * 0.11 + 'px)';
  }

  function requestParallax() {
    if (!frame) frame = window.requestAnimationFrame(updateParallax);
  }

  window.addEventListener('scroll', requestParallax, { passive: true });
  motion.addEventListener('change', requestParallax);
  updateParallax();
}

const offer = document.querySelector('#oferta');
const intersections = new Map();
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => intersections.set(entry.target, entry));
  const hero = intersections.get(opening);
  mobileBuy.hidden = !hero || hero.boundingClientRect.bottom > 0 || Boolean(intersections.get(offer)?.isIntersecting);
}, { threshold: 0 });
barObserver.observe(opening);
barObserver.observe(offer);

const star = document.querySelector('.interactive-star');
let starTimer;
star.addEventListener('click', () => {
  star.setAttribute('data-lit', '');
  clearTimeout(starTimer);
  starTimer = setTimeout(() => star.removeAttribute('data-lit'), 800);
});

const gallery = document.querySelector('.gallery');
const cards = [...gallery.querySelectorAll('.activity')];
const dialog = document.querySelector('#ampliacao');
const dialogTitle = dialog.querySelector('h2');
const fullImage = dialog.querySelector('img');

gallery.addEventListener('click', (event) => {
  const card = event.target.closest('[data-image]');
  if (!card) return;

  const title = card.querySelector('span').firstChild.textContent.trim();
  dialogTitle.textContent = title;
  fullImage.alt = 'Página original da atividade ' + title;
  fullImage.src = 'assets/' + card.dataset.image + '.webp';
  dialog.showModal();
  dialog.scrollTop = 0;
});

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelectorAll('[data-step]').forEach((button) => {
  button.addEventListener('click', () => {
    const gap = parseFloat(getComputedStyle(gallery).columnGap);
    const width = cards[0].offsetWidth + gap;
    const current = Math.round(gallery.scrollLeft / width);
    const next = Math.min(Math.max(current + Number(button.dataset.step), 0), cards.length - 1);
    gallery.scrollTo({ left: next * width, behavior: motion.matches ? 'auto' : 'smooth' });
  });
});

const ADVENT_START = Date.parse('2026-12-01T00:00:00-03:00');
const clock = document.querySelector('#relogio');
const digits = [...clock.querySelectorAll('strong')];
const started = document.querySelector('#advento-comecou');
let countdownTimer;

function renderCountdown() {
  const milliseconds = ADVENT_START - Date.now();
  if (milliseconds <= 0) {
    clock.hidden = true;
    started.hidden = false;
    document.querySelector('#countdown-intro').hidden = true;
    clearInterval(countdownTimer);
    return;
  }

  const remaining = Math.ceil(milliseconds / 1000);
  const values = [
    Math.floor(remaining / 86400),
    Math.floor(remaining % 86400 / 3600),
    Math.floor(remaining % 3600 / 60),
    remaining % 60,
  ];

  digits.forEach((element, index) => {
    const value = String(values[index]).padStart(2, '0');
    if (element.textContent === value) return;
    element.textContent = value;
    element.classList.add('tick');
  });

  clock.hidden = false;
}

clock.addEventListener('animationend', (event) => event.target.classList.remove('tick'));
renderCountdown();
if (started.hidden) countdownTimer = setInterval(renderCountdown, 250);
