import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

export class SwiperNewArrivals {
  constructor() {
    this.initSwiper();
  }

  initSwiper() {
    this.swiper = new Swiper('.section--new .swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      grabCursor: true,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 3000, // 次のスライドに切り替わるまでの時間（ミリ秒）
        disableOnInteraction: false, // ユーザーが操作しても自動再生を止めない
      },
      pagination: {
        el: '.section--new .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.section--new .swiper-button-next',
        prevEl: '.section--new .swiper-button-prev',
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        960: {
          slidesPerView: 4,
          spaceBetween: 32,
        },
      },
    });
  }

  get instance() {
    return this.swiper;
  }
}