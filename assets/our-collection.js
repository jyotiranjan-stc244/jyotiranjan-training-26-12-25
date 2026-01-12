document.addEventListener('DOMContentLoaded', () => {

new Swiper('.our-collection-swiper', {
  slidesPerView: 'auto',
  spaceBetween: 40,
  centeredSlides: true,
  loop: true,
  grabCursor: true
})


  const multiplier = {
    translate: 0.1,
    rotate: 0.01
  }

  function calculateWheel() {
    const slides = document.querySelectorAll('.our-collection .single')

    slides.forEach(slide => {
      const rect = slide.getBoundingClientRect()
      const r =
        window.innerWidth * 0.5 -
        (rect.x + rect.width * 0.5)

      let ty =
        Math.abs(r) * multiplier.translate -
        rect.width * multiplier.translate

      if (ty < 0) ty = 0

      const transformOrigin =
        r < 0 ? 'left top' : 'right top'

      slide.style.transform = `
        translateY(${ty}px)
        rotate(${-r * multiplier.rotate}deg)
      `
      slide.style.transformOrigin = transformOrigin
    })
  }

  function raf() {
    requestAnimationFrame(raf)
    calculateWheel()
  }

  raf()
})
