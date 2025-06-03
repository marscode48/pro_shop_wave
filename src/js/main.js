// ========================
// 共通機能（全ページ共通で使用するモジュール）
// ========================
import { ScrollObserver } from './modules/scroll-observer.js';
import { GsapAnimations } from './modules/gsap-animations.js';
import { HeaderMenu } from './modules/HeaderMenu.js';
import { ToggleSearch } from './modules/toggle-search.js';
import { SmoothScrollToTop } from './modules/smooth-scroll-to-top.js';
import { VivusLogo } from './modules/vivus-logo.js';

// ========================
// ページ固有機能（トップページなどで使用）
// ========================
import { HeroSlider } from './modules/hero-slider.js';
import { SwiperNewArrivals } from './modules/swiper-new-arrivals.js';
import { GsapNewArrivals } from './modules/gsap-new-arrivals.js';

class Main {
  constructor() {
    this.#init();
  }

  // 初期化処理
  #init() {
    // ページ読み込み完了後の処理（Paceを利用）
    Pace.on('done', () => {
      this.header = document.querySelector('.header');
      this.hero = new HeroSlider('.swiper.hero-swiper');
      this.heroDelay = 3000;
      this.newArrivalsSwiper = new SwiperNewArrivals('.new-arrivals-swiper .swiper');
      this.newArrivalsDelay = 3000;
      this.vivusLogo = new VivusLogo();

      this.#scrollInit();
    });

    // ページロード時に即座に必要な機能の初期化
    new GsapAnimations({
      breakpoint: 960,
      staggerAmount: 0.2,
      parallaxSpeed: 30,
    });
    new HeaderMenu();
    new ToggleSearch();
    new SmoothScrollToTop();
  }

  // スクロールオブザーバーの初期化
  #scrollInit() {
    new ScrollObserver('.nav-trigger', this.#navAnimation.bind(this), { once: false });
    new ScrollObserver('.swiper.hero-swiper', this.#toggleHeroAnimation.bind(this), { once: false });
    new ScrollObserver('.new-arrivals-swiper .swiper', this.#toggleNewArrivalsAnimation.bind(this), { once: false });
    new ScrollObserver('.footer__brand', this.#vivusLogoAnimation.bind(this), { once: true });
  }

  // ヒーロースライダーの再生／停止切り替え
  #toggleHeroAnimation(el, inview) {
    if (inview) {
      this.hero.start({ delay: this.heroDelay });
      console.log('hero-slider start is called');
    } else {
      this.hero.stop();
      console.log('hero-slider stop is called');
    }
  }

  // 新着スライダーの再生／停止切り替え
  #toggleNewArrivalsAnimation(el, inview) {
    if (inview) {
      this.newArrivalsSwiper.start({ delay: this.newArrivalsDelay });
      this.gsapNewArrivals = new GsapNewArrivals(this.newArrivalsSwiper.instance);
      console.log('new-arrivals-slider start is called');
    } else {
      this.newArrivalsSwiper.stop();
      console.log('new-arrivals-slider stop is called');
    }
  }

  // ヘッダーのスクロールアニメーション制御
  #navAnimation(el, inview) {
    if (inview) {
      this.header.classList.remove('is-scrolled');
    } else {
      this.header.classList.add('is-scrolled');
    }
  }

  // Vivusロゴアニメーションの発火
  #vivusLogoAnimation(el, inview) {
    if (inview) {
      this.vivusLogo.initVivus();
      console.log('vivus-logo animation started');
    }
  }
}

// DOM読み込み完了後にMainクラスをインスタンス化
document.addEventListener('DOMContentLoaded', () => {
  new Main();
});