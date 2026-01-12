document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.our-story.swiper').forEach(swiperEl => {

    if (typeof Swiper === 'undefined') {
      console.error('[OurStory] ❌ Swiper not loaded');
      return;
    }

    // 🔒 Prevent double initialization
    if (swiperEl.classList.contains('swiper-initialized')) {
      return;
    }

    const slidesDesktop =
      Number(swiperEl.dataset.slidesDesktop) || 2.5;

    new Swiper(swiperEl, {
      slidesPerView: 1.1,
      spaceBetween: 24,
      loop: false,
      watchOverflow: true,

      // 🔒 CRITICAL: Prevent resize / zoom bug
      resizeObserver: false,
      updateOnWindowResize: false,
      observer: false,
      observeParents: false,

      navigation: {
        nextEl: swiperEl.querySelector('.our-story-next'),
        prevEl: swiperEl.querySelector('.our-story-prev'),
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

    console.log('[OurStory] ✅ Swiper initialized');
  });
});
