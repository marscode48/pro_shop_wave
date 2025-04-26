import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js";
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

export class GsapAnimations {
  constructor() {
    this.animateElements();
  }

  animateElements() {
    const animations = [
      { selector: ".fadeup", from: { y: 40, autoAlpha: 0 }, to: { y: 0, autoAlpha: 1 } },
      { selector: ".fadeleft", from: { x: 40, autoAlpha: 0 }, to: { x: 0, autoAlpha: 1 } },
      { selector: ".faderight", from: { x: -40, autoAlpha: 0 }, to: { x: 0, autoAlpha: 1 } },
      { selector: ".fadezoom", from: { scale: 0.8, autoAlpha: 0 }, to: { scale: 1, autoAlpha: 1 } },
    ];

    animations.forEach(({ selector, from, to }) => {
      gsap.utils.toArray(selector).forEach((el) => {
        gsap.fromTo(
          el,
          from,
          {
            ...to,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
              // markers: true,
            },
          }
        );
      });
    });
  }
}