/* ==========================================================================
   GSAP ANIMATIONS
   Hero entrance, scroll reveals, progress indicator, cursor sparkle.
   ========================================================================== */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typeof gsap === "undefined") return;
  if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

  /* ---------- Hero entrance ---------- */
  function heroEntrance() {
    if (reduceMotion) {
      gsap.set(".js-hero-in", { opacity: 1, y: 0 });
      return;
    }
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".eyebrow", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(".hero__heading span", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, "-=0.3")
      .fromTo(".hero__subtitle", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
      .fromTo(".hero .handwritten", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .fromTo("#start-surprise", { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.6 }, "-=0.3");
  }
  heroEntrance();

  /* ---------- Message card reveal ---------- */
  gsap.utils.toArray(".reveal-group .reveal").forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 82%" },
      delay: i * 0.05,
    });
  });

  /* ---------- Section titles reveal ---------- */
  gsap.utils.toArray(".section__title, .finale__pre, .finale__title, .cta-final__eyebrow").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      }
    );
  });

  /* ---------- Deserve cards stagger ---------- */
  gsap.fromTo(
    ".deserve-card",
    { opacity: 0, y: 30, scale: 0.94 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "back.out(1.6)",
      stagger: 0.12,
      scrollTrigger: { trigger: ".deserve__rail", start: "top 80%" },
    }
  );

  /* ---------- Mood buttons + gift + candle idle entrances ---------- */
  gsap.fromTo(
    ".mood__options .mood-btn",
    { opacity: 0, y: 16 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: { trigger: ".mood__options", start: "top 85%" },
    }
  );

  gsap.fromTo(
    ".gift-stage",
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".gift-stage", start: "top 85%" } }
  );

  gsap.fromTo(
    ".candle-stage",
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".candle-stage", start: "top 85%" } }
  );

  gsap.fromTo(
    "#create-yours, .cta-final__sub",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".cta-final", start: "top 80%" } }
  );

  /* ---------- Progress dots ---------- */
  const dots = document.querySelectorAll(".progress__dot");
  const sections = document.querySelectorAll(".section");
  if (dots.length && sections.length && typeof ScrollTrigger !== "undefined") {
    sections.forEach((sec, i) => {
      ScrollTrigger.create({
        trigger: sec,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) {
            dots.forEach((d) => d.classList.remove("is-active"));
            if (dots[i]) dots[i].classList.add("is-active");
          }
        },
      });
    });
  }

  /* ---------- Optional cursor sparkle trail (desktop only) ---------- */
  const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (isDesktop && !reduceMotion) {
    let lastSpawn = 0;
    window.addEventListener("mousemove", (e) => {
      const now = performance.now();
      if (now - lastSpawn < 60) return;
      lastSpawn = now;
      const s = document.createElement("span");
      s.className = "sparkle-trail";
      s.style.left = e.clientX + "px";
      s.style.top = e.clientY + "px";
      document.body.appendChild(s);
      gsap.to(s, {
        opacity: 0,
        y: -14,
        scale: 0.4,
        duration: 0.7,
        ease: "power1.out",
        onComplete: () => s.remove(),
      });
    }, { passive: true });
  }

  window.__animations = { heroEntrance };
})();
