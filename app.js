const fallbackProducts = [
  { id: 'starter-kit', name: 'Sniffari One Starter Kit', description: 'The whole system: smart base, 3 play discs and the wobble ball. Everything your dog needs to start.', price: 89, badge: 'Bestseller', icon: '🎁', art: 'kit' },
  { id: 'disc-pack', name: 'Play Disc Pack', description: 'Snuffle, puzzle and lick discs that swap onto the base for a completely different quest.', price: 29, badge: '', icon: '🌀', art: 'discs' },
  { id: 'wobble-ball', name: 'Wobble Treat Ball', description: 'A top-heavy roller that drops kibble one piece at a time. Built for the enthusiastic nudger.', price: 24, badge: '', icon: '⚽', art: 'ball' },
  { id: 'travel-mat', name: 'Snuffle Travel Mat', description: 'Roll-up scent mat for rainy days, holidays and calm mealtimes anywhere in the world.', price: 34, badge: 'New', icon: '🌿', art: 'mat' }
];

const questPlans = {
  zoomies: {
    tag: 'For the zoomies',
    title: 'The Wobble Chase',
    time: '12 minutes',
    steps: [
      'Fill the wobble ball with a handful of kibble and give it a nudge.',
      'Let your dog chase it around the kitchen — one piece at a time.',
      'Cool down with three rounds of "find it" under a cushion.'
    ],
    product: 'wobble-ball'
  },
  calm: {
    tag: 'For calm vibes',
    title: 'The Slow Sunday Lick',
    time: '10 minutes',
    steps: [
      'Spread soft food or yoghurt across the lick disc and freeze it for an hour.',
      'Settle your dog on their mat and let the licking do the calming.',
      'Finish with a slow sniff walk around one room.'
    ],
    product: 'disc-pack'
  },
  nose: {
    tag: 'For the nose-first',
    title: 'The Great Sniffari',
    time: '15 minutes',
    steps: [
      'Scatter a meal through the snuffle mat and press a few treats deep into the folds.',
      'Let your dog work the whole mat before you add any more.',
      'Hide three treats around the room for a final scent safari.'
    ],
    product: 'travel-mat'
  }
};

let products = fallbackProducts;
let cart = loadCart();

const $ = (selector) => document.querySelector(selector);

function loadCart() {
  try {
    const stored = JSON.parse(localStorage.getItem('sniffari-cart') || '{}');
    return stored && typeof stored === 'object' ? stored : {};
  } catch {
    return {};
  }
}

function saveCart() {
  localStorage.setItem('sniffari-cart', JSON.stringify(cart));
}

function productById(id) {
  return products.find((product) => product.id === id);
}

function formatMoney(amount) {
  return '$' + Number(amount).toFixed(2);
}

function productArt(kind) {
  if (kind === 'discs') {
    return `<svg viewBox="0 0 180 180" fill="none" aria-hidden="true">
      <ellipse cx="90" cy="128" rx="62" ry="20" fill="#12172b" opacity=".12"/>
      <ellipse cx="90" cy="112" rx="60" ry="20" fill="#4ecdc4"/>
      <path d="M30 112c8 11 28 18 60 18s52-7 60-18" stroke="#2c9b94" stroke-width="4"/>
      <ellipse cx="90" cy="88" rx="60" ry="20" fill="#ffd23f"/>
      <ellipse cx="90" cy="84" rx="48" ry="13" fill="#f0b920"/>
      <g fill="#12172b"><circle cx="66" cy="84" r="5"/><circle cx="90" cy="79" r="5"/><circle cx="114" cy="86" r="5"/></g>
      <ellipse cx="90" cy="62" rx="60" ry="20" fill="#ff6b5b"/>
      <ellipse cx="90" cy="58" rx="46" ry="12" fill="#ef5748"/>
      <g stroke="#fff" stroke-width="4" stroke-linecap="round"><path d="M58 58h64M72 51v14M96 50v15"/></g>
    </svg>`;
  }
  if (kind === 'ball') {
    return `<svg viewBox="0 0 180 180" fill="none" aria-hidden="true">
      <ellipse cx="90" cy="150" rx="54" ry="12" fill="#12172b" opacity=".13"/>
      <circle cx="90" cy="88" r="62" fill="#4ecdc4"/>
      <path d="M40 60c28 20 72 20 100 0M35 96c30 24 80 24 110 0M90 26v124" stroke="#2c9b94" stroke-width="5" stroke-linecap="round"/>
      <g fill="#12172b"><circle cx="64" cy="66" r="7"/><circle cx="115" cy="70" r="7"/><circle cx="74" cy="108" r="7"/><circle cx="112" cy="112" r="7"/></g>
      <path d="M60 34c12-14 30-18 44-12" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".5"/>
    </svg>`;
  }
  if (kind === 'mat') {
    return `<svg viewBox="0 0 180 180" fill="none" aria-hidden="true">
      <ellipse cx="90" cy="146" rx="70" ry="12" fill="#12172b" opacity=".12"/>
      <rect x="24" y="48" width="132" height="92" rx="20" fill="#b8e08a"/>
      <rect x="32" y="55" width="116" height="78" rx="16" fill="#a2d36c"/>
      <g stroke="#77a944" stroke-width="6" stroke-linecap="round"><path d="M44 70c10-10 20 10 30 0s20 10 30 0 20 10 30 0"/><path d="M44 92c10-10 20 10 30 0s20 10 30 0 20 10 30 0"/><path d="M44 114c10-10 20 10 30 0s20 10 30 0 20 10 30 0"/></g>
      <circle cx="58" cy="80" r="5" fill="#ffd23f"/><circle cx="120" cy="103" r="5" fill="#ff6b5b"/><circle cx="88" cy="122" r="4" fill="#fff"/>
    </svg>`;
  }
  return `<svg viewBox="0 0 180 180" fill="none" aria-hidden="true">
    <ellipse cx="90" cy="154" rx="66" ry="12" fill="#12172b" opacity=".13"/>
    <rect x="32" y="62" width="116" height="84" rx="22" fill="#12172b"/>
    <rect x="40" y="70" width="100" height="68" rx="18" fill="#232b49"/>
    <circle cx="90" cy="104" r="34" fill="#ffd23f"/>
    <circle cx="90" cy="104" r="26" fill="#f0b920"/>
    <g stroke="#12172b" stroke-width="4" stroke-linecap="round"><path d="M72 96h36M72 106h36M72 116h36"/></g>
    <rect x="60" y="48" width="60" height="20" rx="10" fill="#ff6b5b"/>
  </svg>`;
}

async function loadProducts() {
  try {
    const response = await fetch('/api/products');
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.products) && data.products.length) products = data.products;
    }
  } catch {
    products = fallbackProducts;
  }
  renderProducts();
  renderCart();
  renderQuest(document.querySelector('.quest-option.is-active')?.dataset.quest || 'zoomies');
  initReveals();
}

function renderProducts() {
  const grid = $('#productGrid');
  if (!grid) return;
  grid.innerHTML = products.map((product) => `
    <article class="product-card">
      <a class="product-art-link" href="products/${product.id}.html" aria-label="View ${escapeHtml(product.name)}">
        <div class="product-art">
          ${product.badge ? `<span class="product-badge">${escapeHtml(product.badge)}</span>` : ''}
          <span class="product-3d-badge">3D</span>
          ${productArt(product.art || 'kit')}
        </div>
      </a>
      <div class="product-info">
        <h3><a href="products/${product.id}.html">${escapeHtml(product.name)}</a></h3>
        <p class="product-desc">${escapeHtml(product.description)}</p>
        <div class="product-bottom">
          <span class="price">${formatMoney(product.price)}</span>
          <button class="add-btn" data-add="${escapeHtml(product.id)}">Add to basket</button>
        </div>
        <a class="view-link" href="products/${product.id}.html">Full details &amp; 3D <span aria-hidden="true">→</span></a>
      </div>
    </article>
  `).join('');
}

function cartEntries() {
  return Object.entries(cart)
    .map(([id, qty]) => ({ product: productById(id), qty }))
    .filter((entry) => entry.product && entry.qty > 0);
}

function cartCount() {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

function cartTotal() {
  return cartEntries().reduce((sum, entry) => sum + entry.product.price * entry.qty, 0);
}

function renderCart() {
  const count = cartCount();
  const countEl = $('#cartCount');
  const itemsEl = $('#cartItems');
  const footEl = $('#cartFoot');
  if (countEl) countEl.textContent = String(count);
  if (!itemsEl || !footEl) return;

  const entries = cartEntries();
  if (!entries.length) {
    itemsEl.innerHTML = '<p class="empty-cart">Your basket is empty. Let\'s fix that. 🐾</p>';
    footEl.hidden = true;
    return;
  }

  itemsEl.innerHTML = entries.map(({ product, qty }) => `
    <div class="cart-line">
      <div class="cart-line-art">${product.icon || '🐾'}</div>
      <div>
        <h4>${escapeHtml(product.name)}</h4>
        <small>${formatMoney(product.price)} each</small>
        <div class="qty">
          <button data-qty="-1" data-id="${escapeHtml(product.id)}" aria-label="Decrease quantity">−</button>
          <span>${qty}</span>
          <button data-qty="1" data-id="${escapeHtml(product.id)}" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div>
        <div class="cart-line-price">${formatMoney(product.price * qty)}</div>
        <button class="remove-btn" data-remove="${escapeHtml(product.id)}">Remove</button>
      </div>
    </div>
  `).join('');

  const subtotal = $('#cartSubtotal');
  if (subtotal) subtotal.textContent = formatMoney(cartTotal());
  footEl.hidden = false;
  renderOrderSummary();
}

function renderOrderSummary() {
  const summary = $('#orderSummary');
  if (!summary) return;
  const entries = cartEntries();
  summary.innerHTML = entries.map(({ product, qty }) =>
    `<div><span>${escapeHtml(product.name)} × ${qty}</span><span>${formatMoney(product.price * qty)}</span></div>`
  ).join('') + `<div class="total"><span>Total</span><span>${formatMoney(cartTotal())}</span></div>`;
}

function addToCart(id) {
  if (!productById(id)) return;
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  renderCart();
  openCart();
  const countEl = $('#cartCount');
  if (countEl) {
    countEl.classList.remove('bump');
    void countEl.offsetWidth;
    countEl.classList.add('bump');
  }
}

function openCart() {
  const drawer = $('#cartDrawer');
  const overlay = $('#drawerOverlay');
  if (!drawer || !overlay) return;
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  overlay.hidden = false;
  document.body.classList.add('modal-open');
}

function closeCart() {
  const drawer = $('#cartDrawer');
  const overlay = $('#drawerOverlay');
  if (!drawer || !overlay) return;
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  overlay.hidden = true;
  document.body.classList.remove('modal-open');
}

function openCheckout() {
  if (!cartCount()) return;
  closeCart();
  const checkoutView = $('#checkoutView');
  const successView = $('#successView');
  const overlay = $('#modalOverlay');
  if (!checkoutView || !successView || !overlay) return;
  checkoutView.hidden = false;
  successView.hidden = true;
  const errorEl = $('#checkoutError');
  if (errorEl) errorEl.textContent = '';
  renderOrderSummary();
  overlay.hidden = false;
  document.body.classList.add('modal-open');
  const firstInput = $('#checkoutForm')?.querySelector('input');
  if (firstInput) firstInput.focus();
}

function closeCheckout() {
  const overlay = $('#modalOverlay');
  if (!overlay) return;
  overlay.hidden = true;
  document.body.classList.remove('modal-open');
}

async function placeOrder(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const button = $('#placeOrder');
  const errorEl = $('#checkoutError');
  if (!button) return;
  const data = new FormData(form);
  const items = cartEntries().map(({ product, qty }) => ({ id: product.id, qty }));

  button.disabled = true;
  button.textContent = 'Placing your order…';
  if (errorEl) errorEl.textContent = '';

  try {
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: {
          name: data.get('name'),
          email: data.get('email'),
          address: data.get('address'),
          city: data.get('city'),
          postcode: data.get('postcode')
        },
        items
      })
    });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error(result.error || 'Something went wrong. Please try again.');

    const order = result.order;
    const details = $('#successDetails');
    if (details) {
      details.innerHTML = `
        <div><span>Order number</span><strong>${escapeHtml(order.id)}</strong></div>
        <div><span>Name</span><strong>${escapeHtml(order.customer.name)}</strong></div>
        <div><span>Email</span><strong>${escapeHtml(order.customer.email)}</strong></div>
        <div><span>Items</span><strong>${order.items.reduce((sum, item) => sum + item.qty, 0)}</strong></div>
        <div><span>Total paid</span><strong>${formatMoney(order.total)}</strong></div>
        <div><span>Estimated arrival</span><strong>${escapeHtml(order.estimatedDelivery)}</strong></div>
      `;
    }
    const checkoutView = $('#checkoutView');
    const successView = $('#successView');
    if (checkoutView) checkoutView.hidden = true;
    if (successView) successView.hidden = false;
    cart = {};
    saveCart();
    renderCart();
    form.reset();
    burstConfetti();
  } catch (error) {
    if (errorEl) errorEl.textContent = error.message;
  } finally {
    button.disabled = false;
    button.innerHTML = 'Place order <span aria-hidden="true">→</span>';
  }
}

async function subscribe(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const note = $('#subscribeNote');
  if (!note) return;
  const email = new FormData(form).get('email');
  note.textContent = 'Saving…';
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const result = await response.json();
    note.textContent = response.ok && result.ok ? 'You’re in. Good dog! 🐾' : (result.error || 'Please try again.');
    if (response.ok) form.reset();
  } catch {
    note.textContent = 'Could not save that just now — please try again.';
  }
}

function renderQuest(key) {
  const result = $('#questResult');
  const plan = questPlans[key];
  if (!result || !plan) return;
  const product = productById(plan.product);
  result.innerHTML = `
    <div class="quest-result-main">
      <div class="quest-result-head">
        <span class="quest-tag">${plan.tag}</span>
        <span class="quest-time">⏱ ${plan.time}</span>
      </div>
      <h3>${plan.title}</h3>
      <ol class="quest-steps">${plan.steps.map((step) => `<li>${step}</li>`).join('')}</ol>
    </div>
    ${product ? `
      <a class="quest-product" href="products/${product.id}.html">
        <span class="quest-product-icon" aria-hidden="true">${product.icon}</span>
        <span class="quest-product-copy"><small>Built with the</small><strong>${escapeHtml(product.name)}</strong></span>
        <span class="quest-product-arrow" aria-hidden="true">→</span>
      </a>
    ` : ''}
  `;
}

function initQuest() {
  const options = document.querySelectorAll('[data-quest]');
  if (!options.length) return;
  options.forEach((button) => {
    button.addEventListener('click', () => {
      options.forEach((option) => option.classList.remove('is-active'));
      button.classList.add('is-active');
      renderQuest(button.dataset.quest);
    });
  });
}

function initReveals() {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const selector = '.section-head, .center-head, .idea-card, .product-card, .step, .review, .faq-list details, .quest-panel, .panel, .feature-card, .quest-card, .related-card';
  const els = [...document.querySelectorAll(selector)].filter((el) => !el.classList.contains('reveal'));
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(index % 5, 4) * 60}ms`;
    observer.observe(el);
  });
}

function initHeaderState() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const update = () => header.classList.toggle('scrolled', window.scrollY > 8);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function burstConfetti() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const wrap = document.createElement('div');
  wrap.className = 'confetti';
  const colors = ['#ffd23f', '#ff6b5b', '#4ecdc4', '#b8e08a', '#cbb6f5'];
  for (let i = 0; i < 48; i += 1) {
    const bit = document.createElement('i');
    bit.style.left = `${Math.random() * 100}%`;
    bit.style.background = colors[i % colors.length];
    bit.style.animationDelay = `${Math.random() * 0.4}s`;
    bit.style.animationDuration = `${1.6 + Math.random() * 1.2}s`;
    wrap.appendChild(bit);
  }
  document.body.appendChild(wrap);
  window.setTimeout(() => wrap.remove(), 3200);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

document.addEventListener('click', (event) => {
  const add = event.target.closest('[data-add]');
  if (add) { addToCart(add.dataset.add); return; }
  const qty = event.target.closest('[data-qty]');
  if (qty) {
    const id = qty.dataset.id;
    cart[id] = (cart[id] || 0) + Number(qty.dataset.qty);
    if (cart[id] <= 0) delete cart[id];
    saveCart();
    renderCart();
    return;
  }
  const remove = event.target.closest('[data-remove]');
  if (remove) {
    delete cart[remove.dataset.remove];
    saveCart();
    renderCart();
  }
});

const cartButton = $('#cartButton');
if (cartButton) cartButton.addEventListener('click', openCart);
const closeCartButton = $('#closeCart');
if (closeCartButton) closeCartButton.addEventListener('click', closeCart);
const drawerOverlay = $('#drawerOverlay');
if (drawerOverlay) drawerOverlay.addEventListener('click', closeCart);
const checkoutButton = $('#checkoutButton');
if (checkoutButton) checkoutButton.addEventListener('click', openCheckout);
const closeCheckoutButton = $('#closeCheckout');
if (closeCheckoutButton) closeCheckoutButton.addEventListener('click', closeCheckout);
const modalOverlay = $('#modalOverlay');
if (modalOverlay) modalOverlay.addEventListener('click', (event) => { if (event.target.id === 'modalOverlay') closeCheckout(); });
const checkoutForm = $('#checkoutForm');
if (checkoutForm) checkoutForm.addEventListener('submit', placeOrder);
const subscribeForm = $('#subscribeForm');
if (subscribeForm) subscribeForm.addEventListener('submit', subscribe);
const doneButton = $('#doneButton');
if (doneButton) doneButton.addEventListener('click', closeCheckout);
const menuToggle = $('#menuToggle');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const nav = $('#mainNav');
    if (!nav) return;
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}
const mainNav = $('#mainNav');
if (mainNav) {
  mainNav.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      mainNav.classList.remove('open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { closeCart(); closeCheckout(); }
});
const yearEl = $('#year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

initQuest();
initHeaderState();
initReveals();
loadProducts();
