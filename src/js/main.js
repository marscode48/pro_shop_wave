// 共通機能（グローバルに影響するもの）を先に
import { ScrollObserver } from './modules/scroll-observer.js';
import { GsapAnimations } from './modules/gsap-animations.js';
import { HeaderMenu } from './modules/HeaderMenu.js';
import { ToggleSearch } from './modules/toggle-search.js';
import { SmoothScrollToTop } from './modules/smooth-scroll-to-top.js';

// 特定ページ専用や個別機能（ページ単位のもの）
import HeroAnimation from './modules/HeroAnimation.js';
import { HeroSlider } from './modules/hero-slider.js';
import { SwiperNewArrivals } from './modules/swiper-new-arrivals.js';
import { GsapNewArrivals } from './modules/gsap-new-arrivals.js';
import { VivusLogo } from './modules/vivus-logo.js';

class Main {
  constructor() {
    this.#init();
  }

  #init() {
    Pace.on('done', () => {
      this.header = document.querySelector('.header');
      this.hero = new HeroSlider('.swiper.hero-swiper');
      this.heroDelay = 3000;
      this.#scrollInit();
    });
    new GsapAnimations({
      breakpoint: 960,
      staggerAmount: 0.2,
      parallaxSpeed: 30,
    });
    new HeaderMenu();
    new ToggleSearch();
    new SmoothScrollToTop();
    this.swiperNewArrivals = new SwiperNewArrivals();
    this.gsapNewArrivals = new GsapNewArrivals(this.swiperNewArrivals.instance);
    this.vivusLogo = new VivusLogo();
  }

  #scrollInit() {
    new ScrollObserver('.nav-trigger', this.#navAnimation.bind(this), { once: false });
    new ScrollObserver('.swiper.hero-swiper', this.#toggleHeroAnimation.bind(this), { once: false });
    new ScrollObserver('.footer__brand', this.#vivusLogoAnimation.bind(this), { once: true });
  }

  #toggleHeroAnimation(el, inview) {
    if (inview) {
      this.hero.start({ delay: this.heroDelay });
      console.log('hero-slider start is called');
    } else {
      this.hero.stop();
      console.log('hero-slider stop is called');
    }
  }

  #navAnimation(el, inview) {
    if (inview) {
      this.header.classList.remove('is-scrolled');
    } else {
      this.header.classList.add('is-scrolled');
    }
  }

  #vivusLogoAnimation(el, inview) {
    if (inview) {
      this.vivusLogo.initVivus();
      console.log('vivus-logo animation started');
  }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const main = new Main();
  // new ToggleSearch();
  // // new HeroAnimation();
  // new HeroSlider();
  // const swiper = new SwiperNewArrivals();
  // new GsapNewArrivals(swiper.instance);
  // new VivusLogo();
  // new SmoothScrollToTop();
});