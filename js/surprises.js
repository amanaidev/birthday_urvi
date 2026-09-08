/* ==========================================================================
   SURPRISES: gift box, mood generator, candle finale
   ========================================================================== */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasConfetti = typeof confetti === "function";
  const hasGsap = typeof gsap !== "undefined";

  function fireConfetti(opts) {
    if (!hasConfetti || reduceMotion) return;
    confetti(Object.assign({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FF6E52", "#FFC7A8", "#DCD1F7", "#CFE7F2", "#FFD3C4"],
    }, opts || {}));
  }

  /* ---------------- SCROLL-AWARE EDP MEMORY CAROUSEL ---------------- */
  const carousel = document.getElementById("memory-carousel");
  const slides = carousel ? carousel.querySelectorAll(".memory-slide") : [];
  const carouselDots = carousel ? carousel.querySelectorAll(".carousel-dot") : [];
  const prevMemory = document.getElementById("memory-prev");
  const nextMemory = document.getElementById("memory-next");
  let activeMemory = 0;
  let carouselInView = false;
  let lastScrollY = window.scrollY;
  let scrollCarry = 0;

  function showMemory(next) {
    if (!slides.length) return;
    activeMemory = (next + slides.length) % slides.length;
    slides.forEach((slide, index) => slide.classList.toggle("is-active", index === activeMemory));
    carouselDots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeMemory);
      dot.setAttribute("aria-current", index === activeMemory ? "true" : "false");
    });
  }

  if (carousel && slides.length) {
    new IntersectionObserver((entries) => {
      carouselInView = entries[0].isIntersecting;
      lastScrollY = window.scrollY;
      scrollCarry = 0;
    }, { threshold: 0.35 }).observe(carousel);
    window.addEventListener("scroll", () => {
      if (!carouselInView || reduceMotion) return;
      const distance = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      scrollCarry += distance;
      if (scrollCarry > 260) { showMemory(activeMemory + 1); scrollCarry = 0; }
    }, { passive: true });
    window.setInterval(() => { if (carouselInView && !reduceMotion) showMemory(activeMemory + 1); }, 4800);
    prevMemory?.addEventListener("click", () => showMemory(activeMemory - 1));
    nextMemory?.addEventListener("click", () => showMemory(activeMemory + 1));
    carouselDots.forEach((dot, index) => dot.addEventListener("click", () => showMemory(index)));
    slides.forEach((slide) => {
      const memoryImage = slide.querySelector(".memory-slide__image");
      memoryImage?.addEventListener("click", () => slide.classList.add("is-open"));
    });
  }

  /* ---------------- GIFT BOX ---------------- */
  const gift = document.getElementById("gift-box");
  const giftHint = document.querySelector(".gift__hint");
  const giftReveal = document.getElementById("gift-reveal");
  let giftOpened = false;

  if (gift) {
    gift.addEventListener("click", () => {
      if (giftOpened) return;
      giftOpened = true;
      gift.classList.add("is-open");
      document.body.classList.add("is-celebrating", "theme-celebrate");

      if (hasGsap && !reduceMotion) {
        const tl = gsap.timeline();
        tl.to(gift, { scale: 1.08, duration: 0.15, ease: "power2.out" })
          .to(".gift__lid", { y: -34, rotation: -18, duration: 0.5, ease: "back.out(2)" }, "-=0.05")
          .to(gift, { scale: 1, duration: 0.3, ease: "power2.out" }, "-=0.35");
        if (giftHint) tl.to(giftHint, { opacity: 0, duration: 0.3 }, 0);

        tl.add(() => {
          fireConfetti({ particleCount: 130, spread: 90, origin: { y: 0.55 } });
          if (window.__balloonScene) window.__balloonScene.riseBurst();
        });

        tl.set(giftReveal, { display: "block" }, "-=0.1")
          .to(giftReveal, { height: "auto", opacity: 1, duration: 0.15 }, "+=0.05")
          .fromTo(
            ".gift-reveal__big, .gift-reveal__small, .gift-reveal__terms",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" }
          );
        giftReveal.classList.add("is-shown");
      } else {
        fireConfetti();
        giftReveal.classList.add("is-shown");
        gsap && gsap.set(giftReveal, { opacity: 1, height: "auto" });
      }
    });
  }

  /* ---------------- MOOD GENERATOR ---------------- */
  const moodWishes = {
    cute: "Soft pink skies, extra cake and every sweet thing you deserve. ♡",
    chaotic: "EDP might be ending, but the chaos and the memories are absolutely staying.",
    main: "Cue the spotlight: today, Urvi is the entire main character energy.",
    sleep: "A quiet reset, a soft blanket and a year with gentler days ahead.",
  };

  const moodButtons = document.querySelectorAll(".mood-btn");
  const moodOutput = document.getElementById("mood-output");
  const moodVisual = document.getElementById("mood-visual");
  const moodImage = document.getElementById("mood-image");
  const moodImages = {
    cute: { src: "assets/images/cute.png", alt: "Cute birthday mood illustration" },
    chaotic: { src: "assets/images/chaotic.png", alt: "Chaotic birthday mood illustration" },
    main: { src: "assets/images/main_character.png", alt: "Main character birthday mood illustration" },
    sleep: { src: "assets/images/i_need_sleep.png", alt: "Sleepy birthday mood illustration" },
  };

  moodButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      moodButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const wish = moodWishes[btn.dataset.mood] || "";
      document.body.classList.remove("theme-cute", "theme-chaotic", "theme-main", "theme-sleep", "theme-celebrate");
      document.body.classList.add(`theme-${btn.dataset.mood}`);
      const selectedImage = moodImages[btn.dataset.mood];
      if (moodVisual && moodImage && selectedImage) {
        moodVisual.classList.add("is-shown", "is-changing");
        window.setTimeout(() => {
          moodImage.src = selectedImage.src;
          moodImage.alt = selectedImage.alt;
          moodImage.onload = () => moodVisual.classList.remove("is-changing");
          if (moodImage.complete) moodVisual.classList.remove("is-changing");
        }, reduceMotion ? 0 : 160);
      }

      if (hasGsap && !reduceMotion) {
        gsap.to(moodOutput, {
          opacity: 0,
          y: 8,
          duration: 0.18,
          onComplete: () => {
            moodOutput.textContent = wish;
            gsap.fromTo(moodOutput, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
          },
        });
      } else {
        moodOutput.textContent = wish;
      }
    });
  });

  /* ---------------- CANDLE / FINALE ---------------- */
  const candle = document.getElementById("candle");
  const flameGroup = document.getElementById("flame-group");
  const candleHint = document.getElementById("candle-hint");
  const finaleReveal = document.getElementById("finale-reveal");
  let candleBlown = false;

  if (candle) {
    candle.addEventListener("click", () => {
      if (candleBlown) return;
      candleBlown = true;
      flameGroup.classList.add("is-out");
      if (candleHint) candleHint.style.opacity = "0";

      // brief dim
      const dimmer = document.createElement("div");
      dimmer.style.position = "fixed";
      dimmer.style.inset = "0";
      dimmer.style.background = "#2E241F";
      dimmer.style.opacity = "0";
      dimmer.style.zIndex = "45";
      dimmer.style.pointerEvents = "none";
      document.body.appendChild(dimmer);

      if (hasGsap && !reduceMotion) {
        const tl = gsap.timeline();
        tl.to(dimmer, { opacity: 0.35, duration: 0.25 })
          .to(dimmer, { opacity: 0, duration: 0.45, onComplete: () => dimmer.remove() })
          .add(() => {
            fireConfetti({ particleCount: 160, spread: 110, origin: { y: 0.5 } });
            fireConfetti({ particleCount: 80, spread: 140, startVelocity: 45, origin: { y: 0.4 } });
            if (window.__balloonScene) window.__balloonScene.riseBurst();
          }, "-=0.1")
          .set(finaleReveal, { display: "block" })
          .to(finaleReveal, { height: "auto", opacity: 1, duration: 0.15 })
          .fromTo(
            ".finale-reveal__big, .finale-reveal__lines, .finale-reveal__sign",
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" }
          );
        finaleReveal.classList.add("is-shown");
      } else {
        dimmer.remove();
        fireConfetti();
        finaleReveal.classList.add("is-shown");
      }
    });
  }
})();
