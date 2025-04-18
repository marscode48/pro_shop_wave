import { ScrollHeader } from './modules/scroll-header.js';
import { HeaderMenu } from './modules/HeaderMenu.js';
import { ToggleSearch } from './modules/toggle-search.js';
import SwiperSlider from './modules/SwiperSlider.js';
import HeroAnimation from './modules/HeroAnimation.js';

document.addEventListener('DOMContentLoaded', () => {
  new ScrollHeader();
  new HeaderMenu();
  new ToggleSearch();
  // new SwiperSlider();
  // new HeroAnimation();
});
