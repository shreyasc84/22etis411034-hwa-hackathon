const fs = require('fs');
const path = require('path');

const products = [
  {
    id: 'starter-kit',
    name: 'Sniffari One Starter Kit',
    title: 'Sniffari One Starter Kit — Sniffari',
    price: 89,
    badge: 'Bestseller',
    emoji: '🎁',
    viewer: 'kit',
    tagline: 'One base. Five kinds of play. A brand-new quest every morning.',
    intro: 'The Starter Kit is the heart of Sniffari: a tough, food-safe play base with three swappable quest discs and a wobble treat ball. Set it up once, then let the daily quests do the work.',
    quickPoints: [
      '3 quest discs plus the wobble ball included',
      'Five play modes from one compact base',
      'Food-safe and top-rack dishwasher safe',
      'Works for puppies, adults and seniors'
    ],
    features: [
      ['🔄', 'Swaps in seconds', 'Twist a disc on, twist another off. No tools, no batteries, no fuss — just a new game.'],
      ['🧠', 'Grows with your dog', 'Start easy, then add the caps and pegs as your dog gets cleverer. The quest app tracks the right next step.'],
      ['🧼', 'Actually easy to clean', 'Every play piece is top-rack dishwasher safe, and the base wipes clean in one pass.'],
      ['💪', 'Built for real play', 'Food-safe TPR and toughened plastic, tested with enthusiastic chewers and very determined noses.']
    ],
    box: ['Smart play base', 'Snuffle disc', 'Puzzle disc', 'Lick disc', 'Wobble treat ball', 'Quick-start quest cards'],
    specs: [
      ['Base size', '24 × 24 × 8 cm'],
      ['Weight', '1.2 kg'],
      ['Materials', 'Food-safe TPR, BPA-free plastic'],
      ['Cleaning', 'Top-rack dishwasher safe'],
      ['Ages', '8 weeks and up'],
      ['In the box', 'Base + 3 discs + wobble ball']
    ],
    quests: [
      ['Breakfast Safari', '12 min', 'Scatter kibble through the snuffle disc and let the nose do the work.'],
      ['The Puzzle Ladder', '10 min', 'Load the puzzle disc, then add pegs as your dog solves each round.'],
      ['Nudge & Nibble', '15 min', 'Fill the wobble ball and let dinner roll around the kitchen.']
    ],
    reviews: [
      ['Milo used to eat breakfast in nine seconds. Now he works the puzzle disc for fifteen minutes and flops down for a nap.', 'Priya & Milo', 'Border Collie, 3'],
      ['The snuffle disc is our rainy-day saviour. Luna’s nose works overtime and she’s calm for the rest of the evening.', 'Dan & Luna', 'Cocker Spaniel, 5'],
      ['Every other puzzle got solved in one go. This one keeps getting harder as Bean figures it out. Worth every penny.', 'Amy & Bean', 'Beagle, 2']
    ],
    rating: '4.9',
    reviewCount: '312 reviews'
  },
  {
    id: 'disc-pack',
    name: 'Play Disc Pack',
    title: 'Play Disc Pack — Sniffari',
    price: 29,
    badge: 'Add-on',
    emoji: '🌀',
    viewer: 'discs',
    tagline: 'Three new worlds in one slim, stackable pack.',
    intro: 'Already have the base? This is the cheapest way to triple your dog’s play library. The snuffle, puzzle and lick discs swap onto any Sniffari base in seconds.',
    quickPoints: [
      'Adds three fresh play modes',
      'Fits every Sniffari base',
      'Stacks flat for tidy storage',
      'Dishwasher safe and food-safe'
    ],
    features: [
      ['🌿', 'A deeper sniff', 'The snuffle disc holds a full meal in its folds, turning dinner into a ten-minute scent hunt.'],
      ['🧩', 'A smarter puzzle', 'The puzzle disc adds sliding covers and treat wells for dogs who have outgrown the basics.'],
      ['👅', 'A calmer lick', 'The textured lick disc is the one to reach for before nail trims, vet visits and thunderstorms.'],
      ['📦', 'Stacks like plates', 'All three discs nest together, so a whole new play library fits in one cupboard slot.']
    ],
    box: ['Snuffle disc', 'Puzzle disc', 'Lick disc', 'Quest idea card'],
    specs: [
      ['Disc diameter', '22 cm'],
      ['Weight', '0.5 kg (set)'],
      ['Materials', 'Food-safe TPR and silicone'],
      ['Cleaning', 'Top-rack dishwasher safe'],
      ['Fits', 'All Sniffari bases'],
      ['Ages', '8 weeks and up']
    ],
    quests: [
      ['Sniffari Safari', '10 min', 'Hide a full meal in the snuffle folds and let your dog hunt every bite.'],
      ['The Slide & Seek', '12 min', 'Load the puzzle disc with treats, then add the covers for round two.'],
      ['The Calm Lick', '8 min', 'Spread yoghurt on the lick disc, freeze it, and enjoy the quiet.']
    ],
    reviews: [
      ['Three new discs for less than one new toy. Pepper thinks we bought her a whole new toy box.', 'Tom & Pepper', 'Miniature Schnauzer, 4'],
      ['The lick disc is the only thing that gets Biscuit through a nail trim. Worth it for that alone.', 'Sana & Biscuit', 'Labrador, 6'],
      ['The snuffle disc turned dinner into a proper hunt. Puddle is completely obsessed.', 'Jo & Puddle', 'Cavalier, 1']
    ],
    rating: '4.8',
    reviewCount: '184 reviews'
  },
  {
    id: 'wobble-ball',
    name: 'Wobble Treat Ball',
    title: 'Wobble Treat Ball — Sniffari',
    price: 24,
    badge: 'Fast-eater fix',
    emoji: '⚽',
    viewer: 'ball',
    tagline: 'The dinner that runs away — in the best possible way.',
    intro: 'A weighted, top-heavy treat ball that rocks back upright every time your dog nudges it. Fill it with kibble and a thirty-second meal becomes a fifteen-minute treasure hunt.',
    quickPoints: [
      'Slows fast eaters naturally',
      'Weighted base won’t roll under the sofa',
      'Adjustable opening for easy or hard mode',
      'Holds a full cup of kibble'
    ],
    features: [
      ['⏱️', 'Turns 30 seconds into 15 minutes', 'One piece drops at a time, so your dog works for every mouthful — and eats more slowly.'],
      ['⚖️', 'Wobbles, never escapes', 'The weighted bottom keeps it in the room instead of under the fridge.'],
      ['🎚️', 'Easy mode, hard mode', 'Twist the opening to change how quickly treats fall. Perfect for beginners and old pros.'],
      ['🦷', 'Tough but gentle', 'Thick food-safe rubber that’s kind to teeth and tough enough for daily dinners.']
    ],
    box: ['Wobble treat ball', 'Treat-size guide', 'Two starter quest cards'],
    specs: [
      ['Size', '12 cm diameter'],
      ['Capacity', '1 cup / 240 ml'],
      ['Weight', '0.4 kg'],
      ['Materials', 'Food-safe BPA-free rubber'],
      ['Cleaning', 'Hand wash'],
      ['Best for', 'Moderate chewers, fast eaters']
    ],
    quests: [
      ['Roll & Reward', '10 min', 'Fill with kibble and let the ball do the chasing.'],
      ['Dinner Chase', '15 min', 'Use it as the whole dinner — one piece at a time.'],
      ['Hard Mode', '12 min', 'Twist the opening smaller and watch the gears turn.']
    ],
    reviews: [
      ['Otis is a dinner inhaler. The wobble ball buys me a solid fifteen minutes of peace.', 'Marcus & Otis', 'French Bulldog, 3'],
      ['The weighted base means it stays in the kitchen instead of under the sofa. Genius.', 'Ellie & Scout', 'Jack Russell, 5'],
      ['Hard mode is genuinely hard. Nessa actually has to think, which is new for her.', 'Harri & Nessa', 'Whippet, 2']
    ],
    rating: '4.9',
    reviewCount: '426 reviews'
  },
  {
    id: 'travel-mat',
    name: 'Snuffle Travel Mat',
    title: 'Snuffle Travel Mat — Sniffari',
    price: 34,
    badge: 'New',
    emoji: '🌿',
    viewer: 'mat',
    tagline: 'A nose-first holiday, wherever you happen to be.',
    intro: 'A roll-up snuffle mat with hundreds of soft scent pockets. It calms nervous dogs, slows greedy eaters and packs into a bag smaller than a water bottle.',
    quickPoints: [
      '700+ scent pockets',
      'Rolls up with a carry strap',
      'Machine washable',
      'Non-slip base for hard floors'
    ],
    features: [
      ['🧳', 'Packs tiny', 'Rolls into a 20 cm bundle with its own strap — ideal for weekends, cafés and vet waits.'],
      ['👃', 'Nose-first calm', 'Foraging lowers a dog’s heart rate. Ten minutes of sniffing is our favourite pre-nap routine.'],
      ['🧺', 'Wash and repeat', 'Machine washable at 30°C, because snuffle mats get... enthusiastic.'],
      ['🪵', 'Stays put', 'A grippy base keeps the mat flat on wood, tile and café floors.']
    ],
    box: ['Snuffle travel mat', 'Carry strap', 'Quest idea card'],
    specs: [
      ['Unrolled', '60 × 40 cm'],
      ['Rolled', '20 cm bundle'],
      ['Weight', '0.35 kg'],
      ['Materials', 'Recycled polyester fleece, non-slip base'],
      ['Cleaning', 'Machine wash 30°C'],
      ['Ages', 'All ages, supervised']
    ],
    quests: [
      ['Rainy Day Safari', '12 min', 'Scatter a meal through the folds and let the nose work overtime.'],
      ['Find It Five', '10 min', 'Tuck five favourite treats deep into different pockets.'],
      ['Café Calm', '8 min', 'Take it along, add a chew, and let your dog settle beside you.']
    ],
    reviews: [
      ['We take it everywhere. Cafés, trains, my mum’s house. Moss settles in seconds.', 'Freya & Moss', 'Cockapoo, 4'],
      ['Tilly gets anxious in new places. Ten minutes on the mat and she’s a different dog.', 'Ben & Tilly', 'Rescue mix, 7'],
      ['Rolls up tiny and washes like a dream. Fetching treats out of it is Fflur’s favourite job.', 'Nia & Fflur', 'Corgi, 3']
    ],
    rating: '4.7',
    reviewCount: '96 reviews'
  }
];

const logo = `<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="#ffd23f"/><circle cx="20" cy="20" r="10" fill="#12172b"/><circle cx="20" cy="20" r="4" fill="#ff6b5b"/><path d="M20 2v6M20 32v6M2 20h6M32 20h6" stroke="#12172b" stroke-width="3" stroke-linecap="round"/></svg>`;

const cartIcon = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h8.1a2 2 0 0 0 2-1.6L21 8H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="20" r="1.4" fill="currentColor"/><circle cx="18" cy="20" r="1.4" fill="currentColor"/></svg>`;

function header() {
  return `<div class="announcement">Free shipping on every order <span>•</span> New: the Play Disc Pack <a href="disc-pack.html">Shop now →</a></div>
  <header class="site-header" id="top">
    <div class="container nav-wrap">
      <a class="brand" href="../index.html" aria-label="Sniffari home">
        <span class="brand-mark" aria-hidden="true">${logo}</span>
        <span>Sniffari</span>
      </a>
      <nav class="main-nav" id="mainNav" aria-label="Main navigation">
        <a href="../index.html#why">Why it works</a>
        <a href="../index.html#ideas">The idea</a>
        <a href="../index.html#shop">Shop</a>
        <a href="../index.html#faq">FAQ</a>
      </nav>
      <button class="cart-button" id="cartButton" aria-label="Open cart">
        ${cartIcon}
        <span>Cart</span>
        <span class="cart-count" id="cartCount">0</span>
      </button>
      <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </header>`;
}

function footer() {
  return `<footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <a class="brand footer-brand" href="../index.html"><span class="brand-mark" aria-hidden="true">${logo}</span><span>Sniffari</span></a>
        <p class="footer-tag">Small adventures. Big tail wags.</p>
      </div>
      <div><h4>Explore</h4><a href="../index.html#why">Why it works</a><a href="../index.html#ideas">The idea</a><a href="../index.html#shop">Shop</a></div>
      <div><h4>Help</h4><a href="../index.html#faq">FAQ</a><a href="mailto:hello@sniffari.example">Contact</a><a href="../index.html#how">How it works</a></div>
      <div><h4>Say hello</h4><p>hello@sniffari.example<br />Made with care for good dogs.</p></div>
    </div>
    <div class="container footer-bottom"><span>© <span id="year"></span> Sniffari. All rights reserved.</span><span>Made for dogs who deserve better Tuesdays.</span></div>
  </footer>`;
}

function drawer() {
  return `<div class="drawer-overlay" id="drawerOverlay" hidden></div>
  <aside class="cart-drawer" id="cartDrawer" aria-hidden="true" aria-label="Shopping cart">
    <div class="drawer-head"><h2>Your basket</h2><button class="icon-btn" id="closeCart" aria-label="Close cart">×</button></div>
    <div class="drawer-body" id="cartItems"><p class="empty-cart">Your basket is empty. Let's fix that. 🐾</p></div>
    <div class="drawer-foot" id="cartFoot" hidden>
      <div class="subtotal"><span>Subtotal</span><strong id="cartSubtotal">$0.00</strong></div>
      <small>Free shipping included on every order.</small>
      <button class="btn btn-primary btn-full" id="checkoutButton">Continue to checkout <span aria-hidden="true">→</span></button>
    </div>
  </aside>

  <div class="modal-overlay" id="modalOverlay" hidden>
    <div class="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkoutTitle">
      <button class="icon-btn modal-close" id="closeCheckout" aria-label="Close checkout">×</button>
      <div id="checkoutView">
        <span class="kicker">Almost there</span>
        <h2 id="checkoutTitle">Checkout</h2>
        <p class="modal-lede">Pop in your details and we'll send your order confirmation straight away.</p>
        <form id="checkoutForm">
          <div class="field-row">
            <label>Full name<input name="name" type="text" autocomplete="name" required placeholder="Alex Taylor" /></label>
            <label>Email<input name="email" type="email" autocomplete="email" required placeholder="alex@example.com" /></label>
          </div>
          <label>Delivery address<input name="address" type="text" autocomplete="street-address" required placeholder="12 Waggle Lane" /></label>
          <div class="field-row">
            <label>City<input name="city" type="text" autocomplete="address-level2" required placeholder="Springfield" /></label>
            <label>Postcode<input name="postcode" type="text" autocomplete="postal-code" required placeholder="12345" /></label>
          </div>
          <div class="order-summary" id="orderSummary"></div>
          <p class="checkout-error" id="checkoutError" role="alert"></p>
          <button type="submit" class="btn btn-primary btn-full" id="placeOrder">Place order <span aria-hidden="true">→</span></button>
        </form>
      </div>
      <div id="successView" hidden class="success-view">
        <div class="success-icon">✓</div>
        <h2>Order received!</h2>
        <p>Thanks for giving your dog something brilliant to do. Your confirmation details are below.</p>
        <div class="success-details" id="successDetails"></div>
        <button class="btn btn-dark btn-full" id="doneButton">Back to the site</button>
      </div>
    </div>
  </div>`;
}

function productPage(product) {
  const others = products.filter((entry) => entry.id !== product.id);
  const related = others.map((entry) => `<a class="related-card" href="${entry.id}.html">
      <span class="related-icon" aria-hidden="true">${entry.emoji}</span>
      <h3>${entry.name}</h3>
      <p>${entry.tagline}</p>
      <span class="related-bottom"><span class="price">$${entry.price}</span><span class="related-link">View product →</span></span>
    </a>`).join('\n    ');

  const features = product.features.map(([icon, title, text]) => `<article class="feature-card">
        <div class="feature-icon" aria-hidden="true">${icon}</div>
        <h3>${title}</h3>
        <p>${text}</p>
      </article>`).join('\n      ');

  const quests = product.quests.map(([name, time, text]) => `<article class="quest-card">
        <span class="quest-time">${time}</span>
        <h3>${name}</h3>
        <p>${text}</p>
      </article>`).join('\n      ');

  const reviews = product.reviews.map(([quote, name, dog]) => `<blockquote class="review">
        <span class="stars">★★★★★</span>
        <p>"${quote}"</p>
        <footer><span class="review-dog" aria-hidden="true">🐕</span><div><strong>${name}</strong><small>${dog}</small></div></footer>
      </blockquote>`).join('\n      ');

  const quickPoints = product.quickPoints.map((point) => `<li>${point}</li>`).join('\n          ');
  const box = product.box.map((item) => `<li>${item}</li>`).join('\n          ');
  const specs = product.specs.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('\n          ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${product.tagline} Shop the ${product.name} at Sniffari." />
  <meta name="theme-color" content="#12172b" />
  <title>${product.title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../styles.css" />
</head>
<body class="product-page">
  ${header()}
  <main>
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="../index.html">Home</a><span>/</span><a href="../index.html#shop">Shop</a><span>/</span><span>${product.name}</span>
      </nav>
    </div>

    <section class="product-hero">
      <div class="container product-hero-grid">
        <div class="product-copy">
          <span class="pill">${product.badge}</span>
          <h1>${product.name}</h1>
          <p class="product-tagline">${product.tagline}</p>
          <div class="rating-row"><span class="stars" aria-label="5 out of 5 stars">★★★★★</span><span>${product.rating} · ${product.reviewCount}</span></div>
          <div class="product-price-row"><span class="product-price">$${product.price}</span><span class="ship-note">Free shipping</span></div>
          <p class="product-intro">${product.intro}</p>
          <ul class="quick-points">
          ${quickPoints}
          </ul>
          <div class="buy-row">
            <button class="btn btn-primary add-to-cart-lg" data-add="${product.id}">Add to basket <span aria-hidden="true">→</span></button>
            <a class="btn btn-ghost" href="../index.html#shop">Back to shop</a>
          </div>
          <p class="buy-note">In stock · Ships in 1–2 working days · 30-day happy-tail guarantee</p>
        </div>
        <div class="product-viewer-col">
          <div class="viewer3d product-viewer" data-3d="${product.viewer}">
            <canvas role="img" aria-label="Interactive 3D model of the ${product.name}. Drag to spin it around."></canvas>
            <div class="viewer-fallback">Your browser can't show the 3D preview, but the product still works a treat.</div>
            <div class="viewer-hint">drag to spin</div>
          </div>
          <div class="viewer-footnote"><span aria-hidden="true">${product.emoji}</span> Interactive 3D preview — give it a spin</div>
        </div>
      </div>
    </section>

    <section class="section product-features">
      <div class="container">
        <div class="center-head">
          <span class="kicker">The plus points</span>
          <h2>Why dogs (and their humans) love it.</h2>
        </div>
        <div class="feature-grid">
      ${features}
        </div>
      </div>
    </section>

    <section class="section box-specs">
      <div class="container box-specs-grid">
        <div class="panel">
          <span class="kicker">What's in the box</span>
          <h2>Everything you need to start.</h2>
          <ul class="box-list">
          ${box}
          </ul>
        </div>
        <div class="panel">
          <span class="kicker">The details</span>
          <h2>Specs, plainly put.</h2>
          <dl class="spec-list">
          ${specs}
          </dl>
        </div>
      </div>
    </section>

    <section class="section product-quests">
      <div class="container">
        <div class="center-head">
          <span class="kicker">Play ideas</span>
          <h2>Three quests to try this week.</h2>
        </div>
        <div class="quest-cards">
      ${quests}
        </div>
      </div>
    </section>

    <section class="section product-reviews">
      <div class="container">
        <div class="center-head">
          <span class="kicker">Real pups</span>
          <h2>${product.reviewCount} tails are wagging.</h2>
        </div>
        <div class="reviews-grid">
      ${reviews}
        </div>
      </div>
    </section>

    <section class="section related">
      <div class="container">
        <div class="center-head">
          <span class="kicker">Keep exploring</span>
          <h2>Pairs well with...</h2>
        </div>
        <div class="related-grid">
    ${related}
        </div>
      </div>
    </section>

    <section class="cta-band">
      <div class="container cta-grid">
        <div>
          <h2>Give your dog a job they'll love.</h2>
          <p>Add the ${product.name} to your basket and start the first quest tonight.</p>
        </div>
        <div class="cta-side">
          <button class="btn btn-dark" data-add="${product.id}">Add to basket <span aria-hidden="true">→</span></button>
        </div>
      </div>
    </section>
  </main>

  ${footer()}

  ${drawer()}

  <script src="../app.js" defer></script>
  <script type="importmap">
  {
    "imports": {
      "three": "/vendor/three.module.min.js"
    }
  }
  </script>
  <script type="module" src="../viewer3d.js"></script>
</body>
</html>
`;
}

const outDir = path.join(__dirname, '..', 'products');
fs.mkdirSync(outDir, { recursive: true });
for (const product of products) {
  fs.writeFileSync(path.join(outDir, `${product.id}.html`), productPage(product), 'utf8');
  console.log(`wrote products/${product.id}.html`);
}
