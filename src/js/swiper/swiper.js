import './swiper-bundle.min.js';

export const swiper = new Swiper('.swiper', {
  loop: true,
  autoHeight: true,
  slidesPerView: 1,
  // slidesPerView: 'auto',
  // spaceBetween: 30,
  // centeredSlides: true,
  // freeMode: true,
  // mousewheel: true,
  // grabCursor: true,
  // effect: 'fade',
  // effect: 'coverflow',
  // effect: 'creative',

  // autoplay: {
  //   delay: 2500,
  //   disableOnInteraction: false,
  // },

  // grid: {
  //   rows: 2,
  // },

  pagination: {
    el: '.swiper-pagination',

    // Is clickable
    clickable: true,

    // Animation
    // dynamicBullets: true,

    // Numbers
    // type: 'fraction',

    // Custom bullet with number
    // renderBullet: function (index, className) {
    //   return '<span class="' + className + '">' + (index + 1) + "</span>";
    // },
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  scrollbar: {
    el: '.swiper-scrollbar',
    hide: true,
  },

  // breakpoints: {
  //   767: {
  //     slidesPerView: 2,
  //     spaceBetween: 20,
  //   },
  // },
});
