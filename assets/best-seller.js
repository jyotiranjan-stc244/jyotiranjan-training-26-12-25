document.addEventListener('DOMContentLoaded', () => {
  const swiperEl = document.querySelector('.bestSellerSwiper');

  if (!swiperEl) {
    console.error('[BestSeller] ❌ .bestSellerSwiper not found');
    return;
  }

  if (typeof Swiper === 'undefined') {
    console.error('[BestSeller] ❌ Swiper library not loaded');
    return;
  }

  // Prevent double initialization
  if (swiperEl.classList.contains('swiper-initialized')) {
    return;
  }

  const slidesDesktop =
    Number(
      swiperEl
        .closest('.best-seller')
        ?.querySelector('[data-slides-desktop]')
        ?.dataset.slidesDesktop
    ) || 3;

  new Swiper(swiperEl, {
    slidesPerView: 1,
    spaceBetween: 40,
    loop: false,
    watchOverflow: true,

    // 🔒 Prevent zoom / resize jump
    resizeObserver: false,
    updateOnWindowResize: false,
    observer: false,
    observeParents: false,

    navigation: {
      nextEl: swiperEl.querySelector('.best-seller-next'),
      prevEl: swiperEl.querySelector('.best-seller-prev'),
    },

    pagination: {
      el: swiperEl.querySelector('.swiper-pagination'),
      clickable: true,
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: slidesDesktop,
      },
    },
  });

  console.log('[BestSeller] ✅ Swiper initialized');
});
