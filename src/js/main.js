// 共通機能（グローバルに影響するもの）を先に
import { GsapAnimations } from './modules/gsap-animations.js';
import { ScrollHeader } from './modules/scroll-header.js';
import { HeaderMenu } from './modules/HeaderMenu.js';
import { ToggleSearch } from './modules/toggle-search.js';
import { SmoothScrollToTop } from './modules/smooth-scroll-to-top.js';

// 特定ページ専用や個別機能（ページ単位のもの）
import HeroAnimation from './modules/HeroAnimation.js';
import { SwiperNewArrivals } from './modules/swiper-new-arrivals.js';
import { GsapNewArrivals } from './modules/gsap-new-arrivals.js';
import { VivusLogo } from './modules/vivus-logo.js';

document.addEventListener('DOMContentLoaded', () => {
  new GsapAnimations({
    breakpoint: 960,
    staggerAmount: 0.2,
    parallaxSpeed: 30,
  });
  new ScrollHeader();
  new HeaderMenu();
  new ToggleSearch();
  // new HeroAnimation();
  const swiper = new SwiperNewArrivals();
  new GsapNewArrivals(swiper.instance);
  new VivusLogo();
  new SmoothScrollToTop();
});