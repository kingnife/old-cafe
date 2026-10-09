/**
 * VINTAGE COFFEE SHOP - INTERACTIVE SCRIPTS
 * E-commerce Cart, Mobile Navigation, Accessibility, Modals & Live Status
 */

// Central State
const AppState = {
  cart: JSON.parse(localStorage.getItem('coffee_cart') || '[]'),
  cookieConsent: localStorage.getItem('coffee_cookie_consent') || null,
};

// Available Products Catalog for lookup
const PRODUCTS = {
  'ethiopia-yirgacheffe': {
    id: 'ethiopia-yirgacheffe',
    title: 'Ethiopian Yirgacheffe',
    origin: 'Single Origin • Floral & Citrus',
    roast: 'Light Roast',
    price: 18.50,
    image: 'assets/images/coffee_bag.jpg'
  },
  'colombia-huila': {
    id: 'colombia-huila',
    title: 'Colombian Huila Reserva',
    origin: 'Single Origin • Caramel & Red Apple',
    roast: 'Medium Roast',
    price: 17.00,
    image: 'assets/images/coffee_bag.jpg'
  },
  'sumatra-mandheling': {
    id: 'sumatra-mandheling',
    title: 'Sumatra Mandheling Dark',
    origin: 'Single Origin • Earthy, Cedar & Cocoa',
    roast: 'Dark Roast',
    price: 19.00,
    image: 'assets/images/coffee_bag.jpg'
  },
  'house-espresso-blend': {
    id: 'house-espresso-blend',
    title: 'Vintage Roastery Espresso Blend',
    origin: 'Signature Blend • Dark Chocolate & Molasses',
    roast: 'Medium-Dark',
    price: 16.50,
    image: 'assets/images/coffee_bag.jpg'
  },
  'french-press-artisan': {
    id: 'french-press-artisan',
    title: 'Artisan Copper French Press (8-Cup)',
    origin: 'Brewing Gear • Borosilicate Glass',
    roast: 'Gear',
    price: 42.00,
    image: 'assets/images/latte_art.jpg'
  },
  'vintage-diner-mug': {
    id: 'vintage-diner-mug',
    title: 'Heritage Heavy Ceramic Diner Mug',
    origin: 'Merchandise • 12oz Stoneware',
    roast: 'Merch',
    price: 14.00,
    image: 'assets/images/hero.jpg'
  },
  // In-House Cafe Drinks
  'espresso-double': {
    id: 'espresso-double',
    title: 'Double Espresso (9-Bar Pull)',
    origin: 'Espresso Bar • Double Shot',
    roast: 'Espresso',
    price: 3.75,
    image: 'assets/images/hero.jpg'
  },
  'cortado-signature': {
    id: 'cortado-signature',
    title: 'Signature Cortado (1:1 Ratio)',
    origin: 'Espresso Bar • Equal Parts Steamed Milk',
    roast: 'Espresso',
    price: 4.50,
    image: 'assets/images/latte_art.jpg'
  },
  'flat-white': {
    id: 'flat-white',
    title: 'Velvet Flat White',
    origin: 'Espresso Bar • Double Ristretto',
    roast: 'Espresso',
    price: 5.00,
    image: 'assets/images/latte_art.jpg'
  },
  'cardamom-rose-latte': {
    id: 'cardamom-rose-latte',
    title: 'Wild Cardamom Rose Latte',
    origin: 'Signature Drink • House Botanical Syrups',
    roast: 'Specialty',
    price: 6.25,
    image: 'assets/images/latte_art.jpg'
  },
  'cold-brew-single-origin': {
    id: 'cold-brew-single-origin',
    title: '18-Hour Slow Drip Cold Brew',
    origin: 'Cold Bar • Steeped Sumatra Mandheling',
    roast: 'Cold Brew',
    price: 5.50,
    image: 'assets/images/hero.jpg'
  },
  // Artisanal Bakery Fare
  'pastry-cardamom-knot': {
    id: 'pastry-cardamom-knot',
    title: 'Swedish Cardamom Knot',
    origin: 'Artisanal Bakery • Sourdough & Pearl Sugar',
    roast: 'Bakery',
    price: 4.75,
    image: 'assets/images/hero.jpg'
  },
  'pastry-almond-croissant': {
    id: 'pastry-almond-croissant',
    title: 'Twice-Baked Almond Croissant',
    origin: 'Artisanal Bakery • Pure Butter & Frangipane',
    roast: 'Bakery',
    price: 5.25,
    image: 'assets/images/hero.jpg'
  },
  'pastry-valrhona-cookie': {
    id: 'pastry-valrhona-cookie',
    title: 'Smoked Sea Salt 72% Dark Chocolate Cookie',
    origin: 'Artisanal Bakery • Valrhona Chocolate',
    roast: 'Bakery',
    price: 4.25,
    image: 'assets/images/hero.jpg'
  },
  'pastry-sourdough-toast': {
    id: 'pastry-sourdough-toast',
    title: 'Toasted Sourdough with Espresso Butter',
    origin: 'Artisanal Bakery • Cultured Maldon Butter',
    roast: 'Bakery',
    price: 6.00,
    image: 'assets/images/hero.jpg'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCart();
  initHoursStatus();
  initCookieBanner();
  initContactForm();
  initGallery();
  initReadMoreModal();
  initScrollSpy();
});

/* --------------------------------------------------------------------------
   1. MOBILE NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navList = document.getElementById('navList');

  if (!toggleBtn || !navList) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    navList.classList.toggle('open');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !navList.contains(e.target) && navList.classList.contains('open')) {
      navList.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --------------------------------------------------------------------------
   2. E-COMMERCE CART ENGINE
   -------------------------------------------------------------------------- */
function initCart() {
  const cartBtn = document.getElementById('cartToggleBtn');
  const cartBackdrop = document.getElementById('cartDrawerBackdrop');
  const cartDrawer = document.getElementById('cartDrawer');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // Render initial cart
  updateCartUI();

  // Attach Add to Cart buttons
  document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = btn.getAttribute('data-add-to-cart');
      const grindSelect = btn.closest('.product-card')?.querySelector('.grind-select');
      const grind = grindSelect ? grindSelect.value : 'Whole Bean';
      addToCart(productId, grind);
    });
  });

  if (cartBtn && cartDrawer && cartBackdrop) {
    const openCart = () => {
      cartBackdrop.classList.add('active');
      cartDrawer.classList.add('active');
      cartDrawer.setAttribute('aria-hidden', 'false');
      closeCartBtn?.focus();
    };

    const closeCart = () => {
      cartBackdrop.classList.remove('active');
      cartDrawer.classList.remove('active');
      cartDrawer.setAttribute('aria-hidden', 'true');
      cartBtn?.focus();
    };

    cartBtn.addEventListener('click', openCart);
    closeCartBtn?.addEventListener('click', closeCart);
    cartBackdrop.addEventListener('click', closeCart);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && cartDrawer.classList.contains('active')) {
        closeCart();
      }
    });
  }

  // Checkout button handler
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (AppState.cart.length === 0) {
        showToast('Your cart is empty! Add coffee to proceed.');
        return;
      }
      openCheckoutModal();
    });
  }
}

function addToCart(productId, grind = 'Whole Bean') {
  const product = PRODUCTS[productId];
  if (!product) return;

  const cartItemId = `${productId}-${grind}`;
  const existingIndex = AppState.cart.findIndex(item => item.cartItemId === cartItemId);

  if (existingIndex > -1) {
    AppState.cart[existingIndex].quantity += 1;
  } else {
    AppState.cart.push({
      cartItemId,
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      grind: grind,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added "${product.title}" to your order.`);
}

function changeQty(cartItemId, delta) {
  const index = AppState.cart.findIndex(item => item.cartItemId === cartItemId);
  if (index === -1) return;

  AppState.cart[index].quantity += delta;
  if (AppState.cart[index].quantity <= 0) {
    AppState.cart.splice(index, 1);
  }

  saveCart();
  updateCartUI();
}

function removeFromCart(cartItemId) {
  AppState.cart = AppState.cart.filter(item => item.cartItemId !== cartItemId);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('coffee_cart', JSON.stringify(AppState.cart));
}

function updateCartUI() {
  const badge = document.getElementById('cartBadgeCount');
  const itemsList = document.getElementById('cartItemsList');
  const subtotalEl = document.getElementById('cartSubtotalAmount');

  const totalCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (badge) {
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? 'inline-block' : 'none';
  }

  if (subtotalEl) {
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  }

  if (itemsList) {
    if (AppState.cart.length === 0) {
      itemsList.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--cream-300);">
          <svg style="width: 50px; height: 50px; margin: 0 auto 1rem; opacity: 0.5;" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 5h-14l1.5 14h11zM7 3h10v2h-10z"/>
          </svg>
          <p style="font-weight: 600; font-size: 1.1rem; color: var(--cream-100); margin-bottom: 0.5rem;">Your Coffee Cart is Empty</p>
          <p style="font-size: 0.9rem;">Freshly roasted artisanal beans and handcrafted brewing gear are waiting.</p>
        </div>
      `;
    } else {
      itemsList.innerHTML = AppState.cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}" class="cart-item-img" />
          <div class="cart-item-info">
            <div class="cart-item-title">${item.title}</div>
            <div style="font-size: 0.78rem; color: var(--cream-300);">${item.grind}</div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <div class="cart-qty-ctrl">
              <button class="qty-btn" onclick="changeQty('${item.cartItemId}', -1)" aria-label="Decrease quantity">-</button>
              <span style="font-weight: bold; font-size: 0.9rem; min-width: 20px; text-align: center;">${item.quantity}</span>
              <button class="qty-btn" onclick="changeQty('${item.cartItemId}', 1)" aria-label="Increase quantity">+</button>
              <button onclick="removeFromCart('${item.cartItemId}')" style="margin-left: auto; color: #e57373; font-size: 0.8rem; text-decoration: underline;" aria-label="Remove item">Remove</button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }
}

/* --------------------------------------------------------------------------
   3. CHECKOUT MODAL & FORM SIMULATION
   -------------------------------------------------------------------------- */
function openCheckoutModal() {
  const existingModal = document.getElementById('checkoutModal');
  if (existingModal) existingModal.remove();

  const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 45 ? 0 : 5.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const modalHtml = `
    <div id="checkoutModal" style="position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(6px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
      <div style="background: #170d08; border: 1px solid var(--amber-gold); border-radius: var(--radius-md); width: 100%; max-width: 580px; max-height: 90vh; overflow-y: auto; padding: 2rem; box-shadow: 0 20px 50px rgba(0,0,0,0.9); position: relative;">
        <button id="closeCheckoutModal" style="position: absolute; top: 18px; right: 18px; color: var(--cream-200); font-size: 1.5rem;" aria-label="Close modal">&times;</button>
        <h2 style="font-family: var(--font-heading); color: var(--cream-50); font-size: 1.8rem; margin-bottom: 0.5rem;">Secure Checkout</h2>
        <p style="font-size: 0.88rem; color: var(--amber-light); margin-bottom: 1.5rem;">Direct trade, freshly roasted beans dispatched within 24 hours.</p>
        
        <div style="background: rgba(38, 22, 14, 0.6); padding: 1rem 1.25rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem; border: 1px solid rgba(200, 138, 75, 0.2);">
          <div style="display: flex; justify-content: space-between; font-size: 0.95rem; margin-bottom: 0.35rem;">
            <span>Subtotal:</span> <span>$${subtotal.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.95rem; margin-bottom: 0.35rem;">
            <span>Shipping:</span> <span>${shipping === 0 ? '<strong style="color:#81c784;">FREE</strong>' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.95rem; margin-bottom: 0.35rem;">
            <span>Estimated Tax (8%):</span> <span>$${tax.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: 800; color: var(--cream-50); border-top: 1px solid rgba(200,138,75,0.3); padding-top: 0.5rem; margin-top: 0.5rem;">
            <span>Total:</span> <span>$${total.toFixed(2)}</span>
          </div>
        </div>

        <form id="checkoutForm">
          <div class="form-group">
            <label class="form-label" for="custName">Full Name</label>
            <input type="text" id="custName" class="form-control" placeholder="E.g. Eleanor Vance" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="custEmail">Email Address</label>
            <input type="email" id="custEmail" class="form-control" placeholder="eleanor@example.com" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="custAddress">Shipping Address</label>
            <input type="text" id="custAddress" class="form-control" placeholder="124 Roastery Way, Suite 4B" required />
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label" for="custCard">Card Number</label>
              <input type="text" id="custCard" class="form-control" placeholder="•••• •••• •••• 4242" required maxlength="19" />
            </div>
            <div class="form-group">
              <label class="form-label" for="custExp">Exp / CVC</label>
              <input type="text" id="custExp" class="form-control" placeholder="MM/YY  CVC" required maxlength="10" />
            </div>
          </div>
          <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; margin-top: 1rem; padding: 1rem;">
            Authorize & Complete Order ($${total.toFixed(2)})
          </button>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById('checkoutModal');
  const closeBtn = document.getElementById('closeCheckoutModal');
  const form = document.getElementById('checkoutForm');

  closeBtn.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('custName').value;
    const email = document.getElementById('custEmail').value;
    
    // Simulate successful order
    AppState.cart = [];
    saveCart();
    updateCartUI();
    document.getElementById('cartDrawer')?.classList.remove('active');
    document.getElementById('cartDrawerBackdrop')?.classList.remove('active');

    modal.innerHTML = `
      <div style="background: #170d08; border: 2px solid #4caf50; border-radius: var(--radius-md); width: 100%; max-width: 500px; padding: 2.5rem; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.9);">
        <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(76, 175, 80, 0.2); border: 2px solid #4caf50; color: #81c784; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem;">✓</div>
        <h2 style="font-family: var(--font-heading); color: var(--cream-50); font-size: 1.8rem; margin-bottom: 0.5rem;">Order Confirmed!</h2>
        <p style="color: var(--amber-light); margin-bottom: 1.5rem;">Thank you, ${name}! Your order confirmation and roast dispatch tracker have been dispatched to <strong>${email}</strong>.</p>
        <button onclick="document.getElementById('checkoutModal').remove()" class="btn-primary" style="justify-content: center; width: 100%;">Return to Cafe</button>
      </div>
    `;
  });
}

/* --------------------------------------------------------------------------
   4. LIVE OPEN/CLOSED HOURS STATUS
   -------------------------------------------------------------------------- */
function initHoursStatus() {
  const statusEl = document.getElementById('liveHoursStatus');
  if (!statusEl) return;

  const now = new Date();
  const day = now.getDay(); // 0 is Sunday, 6 is Saturday
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hour + (minutes / 60);

  // Mon-Fri: 6:30am - 8:00pm (6.5 to 20.0)
  // Sat-Sun: 7:30am - 9:00pm (7.5 to 21.0)
  let isOpen = false;

  if (day >= 1 && day <= 5) {
    isOpen = (currentTime >= 6.5 && currentTime < 20);
  } else {
    isOpen = (currentTime >= 7.5 && currentTime < 21);
  }

  if (isOpen) {
    statusEl.className = 'hours-status-badge status-open';
    statusEl.innerHTML = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#4caf50;"></span> OPEN NOW • Espresso Machine is Hot';
  } else {
    statusEl.className = 'hours-status-badge status-closed';
    statusEl.innerHTML = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#ef5350;"></span> CURRENTLY CLOSED • Doors open 6:30 AM';
  }
}

/* --------------------------------------------------------------------------
   5. GALLERY FILTERS & LIGHTBOX
   -------------------------------------------------------------------------- */
function initGallery() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox click
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('h3')?.textContent || 'Vintage Coffee Roastery';
      const caption = item.querySelector('p')?.textContent || '';

      const lightboxHtml = `
        <div id="galleryLightbox" style="position: fixed; inset: 0; background: rgba(0,0,0,0.92); backdrop-filter: blur(8px); z-index: 2500; display: flex; align-items: center; justify-content: center; padding: 2rem;">
          <button id="closeLightboxBtn" style="position: absolute; top: 20px; right: 25px; color: #fff; font-size: 2.2rem;" aria-label="Close lightbox">&times;</button>
          <div style="max-width: 900px; width: 100%; text-align: center;">
            <img src="${img.src}" alt="${title}" style="max-height: 75vh; margin: 0 auto 1.5rem; border-radius: var(--radius-sm); border: 1px solid var(--amber-gold); box-shadow: 0 10px 40px rgba(0,0,0,0.8);" />
            <h3 style="font-family: var(--font-heading); color: var(--cream-50); font-size: 1.5rem;">${title}</h3>
            <p style="color: var(--amber-light); font-size: 0.95rem; margin-top: 0.35rem;">${caption}</p>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', lightboxHtml);
      const lightbox = document.getElementById('galleryLightbox');
      const closeBtn = document.getElementById('closeLightboxBtn');

      const closeLb = () => lightbox.remove();
      closeBtn.addEventListener('click', closeLb);
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLb();
      });

      document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
          closeLb();
          document.removeEventListener('keydown', escHandler);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. CONTACT FORM REAL-TIME VALIDATION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const msgInput = document.getElementById('contactMessage');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !msgInput.value.trim()) {
      showToast('Please complete all required fields.');
      return;
    }

    showToast('Thank you! Your message has been sent to our master roaster.');
    form.reset();
  });
}

/* --------------------------------------------------------------------------
   7. COOKIE CONSENT BANNER
   -------------------------------------------------------------------------- */
function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('acceptCookiesBtn');
  const declineBtn = document.getElementById('declineCookiesBtn');

  if (!banner) return;

  if (AppState.cookieConsent) {
    banner.classList.add('hidden');
    return;
  }

  acceptBtn?.addEventListener('click', () => {
    AppState.cookieConsent = 'accepted';
    localStorage.setItem('coffee_cookie_consent', 'accepted');
    banner.classList.add('hidden');
    showToast('Preferences saved.');
  });

  declineBtn?.addEventListener('click', () => {
    AppState.cookieConsent = 'declined';
    localStorage.setItem('coffee_cookie_consent', 'declined');
    banner.classList.add('hidden');
  });
}

/* --------------------------------------------------------------------------
   8. READ MORE EXPANSION MODAL (Faithful to Mockup's 'Read more...' link)
   -------------------------------------------------------------------------- */
function initReadMoreModal() {
  const readMoreBtn = document.getElementById('vintageReadMoreBtn');
  if (!readMoreBtn) return;

  readMoreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const modalHtml = `
      <div id="readMoreModal" style="position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(6px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
        <div style="background: #170d08; border: 1px solid var(--amber-gold); border-radius: var(--radius-md); width: 100%; max-width: 650px; max-height: 85vh; overflow-y: auto; padding: 2.5rem; box-shadow: 0 20px 50px rgba(0,0,0,0.9); position: relative;">
          <button id="closeReadMoreModal" style="position: absolute; top: 18px; right: 18px; color: var(--cream-200); font-size: 1.5rem;" aria-label="Close modal">&times;</button>
          <span style="color: var(--amber-gold); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 700;">Roaster Archive & Heritage</span>
          <h2 style="font-family: var(--font-heading); color: var(--cream-50); font-size: 1.85rem; margin: 0.35rem 0 1.25rem;">The Art of the Slow Roast</h2>
          <div style="color: var(--cream-200); font-size: 0.98rem; line-height: 1.8; display: flex; flex-direction: column; gap: 1rem;">
            <p>Every morning before dawn breaks, our cast-iron drum roaster begins warming to precisely 415°F. We don’t rely on automated industrial presets; our roasters listen for the nuanced first crack of the green beans, observing the caramelization of natural sugars and aromatic coffee oils.</p>
            <p>From the high-altitude volcanic terraces of Sidama, Ethiopia to the cloud forests of Huila, Colombia, we collaborate directly with generational farm cooperatives. Each shipment undergoes rigorous cupping protocols to ensure sweetness, clean acidity, and unmatched mouthfeel.</p>
            <p>Whether you prefer an unapologetically bold espresso pull or a delicate, floral pour-over steeped through unbleached paper filters, our coffee is crafted to celebrate every sensory note from bean to cup.</p>
          </div>
          <button onclick="document.getElementById('readMoreModal').remove()" class="btn-primary" style="margin-top: 1.5rem; width: 100%; justify-content: center;">Close Archive Note</button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = document.getElementById('readMoreModal');
    const closeBtn = document.getElementById('closeReadMoreModal');
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (ev) => {
      if (ev.target === modal) modal.remove();
    });
  });
}

/* --------------------------------------------------------------------------
   9. GLOBAL TOAST HELPER
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// Make changeQty and removeFromCart globally available for inline onclicks
window.changeQty = changeQty;
window.removeFromCart = removeFromCart;

/* --------------------------------------------------------------------------
   10. FLOATING BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const floatingBtn = document.getElementById('floatingBackToHome');
  if (floatingBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        floatingBtn.classList.add('visible');
      } else {
        floatingBtn.classList.remove('visible');
      }
    }, { passive: true });

    floatingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

