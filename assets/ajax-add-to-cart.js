

(function () {
  const SELECTORS = {
    addToCartBtn: '.js-ajax-add-to-cart',
    cartBubble: '#cart-icon-bubble',
    cartDrawer: 'cart-drawer',
  };

  function updateCartBubble(sections) {
    if (!sections?.['cart-icon-bubble']) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(sections['cart-icon-bubble'], 'text/html');

    const newBubble =
      doc.querySelector('.cart-count-bubble') ||
      doc.querySelector('#cart-icon-bubble .cart-count-bubble');

    const currentBubble = document.querySelector(
      '#cart-icon-bubble .cart-count-bubble'
    );

    const container = document.querySelector(SELECTORS.cartBubble);

    if (!container) return;

    if (currentBubble && newBubble) {
      currentBubble.innerHTML = newBubble.innerHTML;
    } else if (!currentBubble && newBubble) {
      container.insertAdjacentHTML('beforeend', newBubble.outerHTML);
    }
  }

  function updateCartDrawer(res) {
    const drawerHtml = res.sections?.['cart-drawer'];
    if (!drawerHtml) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(drawerHtml, 'text/html');
    const newContent = doc.querySelector('cart-drawer')?.innerHTML;

    const drawer = document.querySelector(SELECTORS.cartDrawer);
    if (!drawer || !newContent) return;

    drawer.innerHTML = newContent;
    drawer.classList.remove('is-empty');
    drawer.classList.add('active');

    if (typeof drawer.open === 'function') {
      drawer.open();
    } else {
      document.body.classList.add('overflow-hidden');
    }
  }

  function closeCartDrawer() {
    const drawer = document.querySelector(SELECTORS.cartDrawer);
    if (!drawer) return;

    if (typeof drawer.close === 'function') {
      drawer.close();
    } else {
      drawer.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
    }
  }

  async function addToCart(button) {
    if (button.classList.contains('is-loading')) return;

    const variantId = button.dataset.variantId;
    const quantity = parseInt(button.dataset.quantity || 1, 10);
    const source = button.dataset.source || 'Global';

    if (!variantId) return;

    button.classList.add('is-loading');
    button.disabled = true;
    const originalText = button.innerText;
    button.innerText = 'Adding...';

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          id: variantId,
          quantity,
          properties: {
            Source: source,
          },
          sections: ['cart-icon-bubble', 'cart-drawer'],
          sections_url: window.location.pathname,
        }),
      });

      if (!response.ok) throw new Error('Add to cart failed');

      const res = await response.json();

      updateCartBubble(res.sections);
      updateCartDrawer(res);

      button.innerText = 'Added ✓';
    } catch (err) {
      console.error(err);
      button.innerText = 'Error';
    } finally {
      setTimeout(() => {
        button.innerText = originalText;
        button.disabled = false;
        button.classList.remove('is-loading');
      }, 1200);
    }
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest(SELECTORS.addToCartBtn);
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    addToCart(btn);
  });

  document.addEventListener('click', (e) => {
    const drawer = document.querySelector(SELECTORS.cartDrawer);
    if (!drawer || !drawer.classList.contains('active')) return;

    const overlay = drawer.querySelector('#CartDrawer-Overlay');
    if (overlay && e.target === overlay) {
      closeCartDrawer();
    }
  });
})();
