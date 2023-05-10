import Swiper, { Navigation, Pagination } from 'swiper';

export const swiper = () => {
  const swiper_1 = new Swiper('.swiper', {
    modules: [Navigation, Pagination],

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
    // fadeEffect: {
    //   crossFade: true,
    // },
    // effect: 'coverflow',
    // coverflowEffect: {
    //   rotate: 0,
    //   stretch: 0,
    //   depth: 100,
    //   modifier: 3,
    //   slideShadows: true
    // },
    // effect: 'creative',

    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },

    // grid: {
    //   rows: 2,
    // },

    pagination: {
      el: '.swiper-main__pagination',

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
};
