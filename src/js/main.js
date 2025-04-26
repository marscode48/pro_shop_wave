// 共通機能（グローバルに影響するもの）を先に
import { GsapAnimations } from './modules/gsap-animations.js';
import { ScrollHeader } from './modules/scroll-header.js';
import { HeaderMenu } from './modules/HeaderMenu.js';
import { ToggleSearch } from './modules/toggle-search.js';

// 特定ページ専用や個別機能（ページ単位のもの）
import HeroAnimation from './modules/HeroAnimation.js';
import { SwiperNewArrivals } from './modules/swiper-new-arrivals.js';
import { GsapNewArrivals } from './modules/gsap-new-arrivals.js';

document.addEventListener('DOMContentLoaded', () => {
  new GsapAnimations();
  new ScrollHeader();
  new HeaderMenu();
  new ToggleSearch();
  // new HeroAnimation();
  const swiper = new SwiperNewArrivals();
  new GsapNewArrivals(swiper.instance);
});