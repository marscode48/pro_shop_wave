import { ScrollHeader } from './modules/scroll-header.js';
import { HeaderMenu } from './modules/HeaderMenu.js';
import { ToggleSearch } from './modules/toggle-search.js';
import HeroAnimation from './modules/HeroAnimation.js';
import { SwiperNewArrivals } from './modules/swiper-new-arrivals.js';
import { GsapNewArrivals } from './modules/gsap-new-arrivals.js';

document.addEventListener('DOMContentLoaded', () => {
  new ScrollHeader();
  new HeaderMenu();
  new ToggleSearch();
  // new HeroAnimation();
  const swiper = new SwiperNewArrivals();
  new GsapNewArrivals(swiper.instance);
});