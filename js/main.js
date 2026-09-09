/* ==========================================================================
   MAIN — config + wiring
   All personalized copy is driven from birthdayConfig so this can later be
   templated by a birthday-website generator product.
   ========================================================================== */

const birthdayConfig = {
  sender: "Your Name here",
  recipient: "Friend Name",
  date: "Birthday date",
  createYoursUrl: "#create-yours",
};

(function () {
  "use strict";

  // Apply config to any [data-config] element, if present in markup.
  document.querySelectorAll("[data-config]").forEach((el) => {
    const key = el.getAttribute("data-config");
    if (birthdayConfig[key]) el.textContent = birthdayConfig[key];
  });

  const createYoursBtn = document.getElementById("create-yours");
  if (createYoursBtn && birthdayConfig.createYoursUrl) {
    createYoursBtn.setAttribute("href", birthdayConfig.createYoursUrl);
  }

  /* ---------------- Start the surprise → scroll to message ---------------- */
  const startBtn = document.getElementById("start-surprise");
  const messageSection = document.getElementById("section-message");
  if (startBtn && messageSection) {
    startBtn.addEventListener("click", () => {
      messageSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ---------------- Birthday music — start on load, with browser-safe fallback ---------------- */
  const soundToggle = document.getElementById("sound-toggle");
  const audioEl = document.getElementById("birthday-audio");
  let soundOn = false;

  function updateSoundState(isPlaying) {
    soundOn = isPlaying;
    soundToggle?.setAttribute("aria-pressed", String(isPlaying));
    soundToggle?.setAttribute("aria-label", isPlaying ? "Pause birthday music" : "Play birthday music");
    if (soundToggle) soundToggle.querySelector(".sound-toggle__icon").textContent = isPlaying ? "♫" : "♪";
  }

  function startBirthdayMusic() {
    if (!audioEl) return;
    audioEl.volume = 0.38;
    audioEl.play().then(() => updateSoundState(true)).catch(() => updateSoundState(false));
  }

  if (audioEl) {
    audioEl.addEventListener("play", () => updateSoundState(true));
    audioEl.addEventListener("pause", () => updateSoundState(false));
    startBirthdayMusic();
  }

  if (soundToggle && audioEl) {
    soundToggle.addEventListener("click", () => {
      if (audioEl.paused) audioEl.play().catch(() => {});
      else audioEl.pause();
    });
  }

  /* ---------------- Prevent 3D canvas from ever blocking clicks ---------------- */
  const canvas = document.getElementById("balloon-canvas");
  if (canvas) canvas.style.pointerEvents = "none";
})();
