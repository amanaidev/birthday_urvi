/* ==========================================================================
   MAIN — config + wiring
   All personalized copy is driven from birthdayConfig so this can later be
   templated by a birthday-website generator product.
   ========================================================================== */

const birthdayConfig = (() => {
  const defaults = { sender: "Your Name", recipient: "Friend's name", message: "", date: "A special day", createYoursUrl: "../templates.html" };
  try {
    const savedWish = JSON.parse(sessionStorage.getItem("itsyourday-wish"));
    if (savedWish?.templateId === "birthday-story") {
      return { ...defaults, sender: savedWish.sender || defaults.sender, recipient: savedWish.recipient || defaults.recipient, message: savedWish.message || "" };
    }
  } catch { /* Keep the standalone template usable with its default copy. */ }
  return defaults;
})();

(function () {
  "use strict";

  document.querySelectorAll("[data-personal]").forEach((el) => {
    const key = el.getAttribute("data-personal");
    if (birthdayConfig[key]) el.textContent = birthdayConfig[key];
  });
  const customMessage = document.querySelector("[data-personal-message]");
  if (customMessage && birthdayConfig.message) customMessage.textContent = birthdayConfig.message;
  // Retain the authored experience while ensuring any remaining placeholder
  // references (including accessible labels) use the recipient's real name.
  const replacePlaceholders = (value) => value
    .replaceAll("Friend's name", birthdayConfig.recipient)
    .replaceAll("Your Name", birthdayConfig.sender)
    .replaceAll("__", "our story");
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => ["SCRIPT", "STYLE"].includes(node.parentElement?.tagName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
  });
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => { node.nodeValue = replacePlaceholders(node.nodeValue); });
  document.querySelectorAll("[alt], [aria-label]").forEach((el) => {
    ["alt", "aria-label"].forEach((attribute) => {
      if (el.hasAttribute(attribute)) el.setAttribute(attribute, replacePlaceholders(el.getAttribute(attribute)));
    });
  });
  document.title = `Happy Birthday, ${birthdayConfig.recipient} — from ${birthdayConfig.sender}`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", `A little digital birthday experience, made by ${birthdayConfig.sender} for ${birthdayConfig.recipient}.`);

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
