import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js';
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

export class HeroSlider {
  constructor() {
    this.initSwiper();
  }
  
  initSwiper() {

    // Reset styles for all .hero-word and .hero-word__mask in a slide
    function resetHeroWords(slide) {
      const heroWords = slide.querySelectorAll('.hero-word');
      heroWords.forEach((word) => {
        gsap.set(word, { opacity: 0 });
        const mask = word.querySelector('.hero-word__mask');
        if (mask) {
          gsap.set(mask, { opacity: 0 });
        }
        gsap.set(word, { clearProps: 'all' });
        gsap.set(mask, { clearProps: 'all' });
      });
    }

    function createChildTimeline(element) {
      const elMask = element.querySelector('.hero-word__mask');
      const tl = gsap.timeline({ delay: 1 })
        .from(element, {
          y: 16,
          opacity: 0,
          duration: 0.75,
          ease: 'power4.out',
        })
        .set(elMask, { opacity: 0 })
        .to(
          elMask,
          {
            x: '105%',
            duration: 1,
            ease: 'power4.out',
          },
          '-=50%'
        );
      return tl;
    }

    const swiper = new Swiper('.hero-swiper', {
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      loop: true,
      loopAdditionalSlides: 1,
      speed: 3000,
      // autoplay: {
      //   delay: 5000,
      //   disableOnInteraction: false,
      //   waitForTransition: false,
      // },
      followFinger: false,
      observeParents: true, // Swiperの親要素も監視する
      pagination: {
        el: '.hero .swiper-pagination',
        clickable: true,
      },

      on: {
        init: function () {
          console.log('swiper initialized');
          const activeSlide = document.querySelector('.hero-swiper .swiper-slide-active');
          const heroWords = activeSlide.querySelectorAll('.hero-word');
          if (heroWords.length > 0) {
            const tl = gsap.timeline();
            heroWords.forEach((heroWord) => {
              tl.add(createChildTimeline(heroWord), '-=90%');
            });
          }
        },
        // スライドが切り替わり「始まったとき」に呼ばれます（アニメーション中）。
        // 前のスライドのクラス・状態をリセットしたいとき。
        slideChangeTransitionStart: () => {
          console.log('slideChangeTransitionStart is called');
          const slides = document.querySelectorAll('.hero-swiper .swiper-slide');
          slides.forEach(slide => {
            slide.querySelector('.hero__heading-en')?.classList.remove('animated');
            slide.querySelector('.hero__subheading-jp')?.classList.remove('animated');
            resetHeroWords(slide);
          });
        },
        // スライドが切り替わる「アニメーションが終わったあと」に呼ばれます。
        // 新しいスライドの要素に対して GSAP アニメーションを開始。
        slideChangeTransitionEnd: () => {
          console.log('slideChangeTransitionStop is called');
          const activeSlide = document.querySelector('.hero-swiper .swiper-slide-active');
          const heading = activeSlide.querySelector('.hero__heading-en');
          const subheading = activeSlide.querySelector('.hero__subheading-jp');

          if (heading && subheading) {
            const heroWords = activeSlide.querySelectorAll('.hero-word');
            if (heroWords.length > 0) {
              const tl = gsap.timeline();

              heroWords.forEach((heroWord) => {
                tl.add(createChildTimeline(heroWord), '-=90%');
              });
            }
          }

        }
      }
    });
  }
}