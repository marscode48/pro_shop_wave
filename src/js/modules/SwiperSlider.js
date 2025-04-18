export default class SwiperSlider {
  constructor() {
    this.init();
  }

  init() {
    new Swiper('.swiper-container', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        960: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  }
}
