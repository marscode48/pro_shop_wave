export class ScrollHeader {
  constructor(selector = '.header', threshold = 0) {
    this.header = document.querySelector(selector);
    this.threshold = threshold;

    if (this.header) {
      this.bindScroll();
    }
  }

  bindScroll() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > this.threshold) {
        this.header.classList.add('is-scrolled');
      } else {
        this.header.classList.remove('is-scrolled');
      }
    });
  }
}