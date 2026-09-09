# Happy Birthday, Friend's name — a little digital experience from Your Name

A single-page, interactive birthday website. No backend, no build step — just open `index.html`.

## Structure

```
/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js          # birthdayConfig + wiring (start button, sound toggle)
│   ├── three-scene.js   # 3D floating balloons (Three.js), one render loop
│   ├── animations.js    # GSAP entrance + scroll reveals + progress dots
│   └── surprises.js     # gift box, mood generator, candle finale, confetti
└── assets/
    ├── images/
    ├── audio/           # drop an mp3 here and set AUDIO_SRC in main.js to enable sound
    └── icons/
```

## Customizing

Everything personal lives in one place — `js/main.js`:

```js
const birthdayConfig = {
  sender: "Your Name",
  recipient: "Friend's name",
  date: "9 September",
  createYoursUrl: "#create-yours",
};
```

Section copy (message, gift reveal, mood wishes, finale) lives directly in `index.html` and `js/surprises.js`, written in clearly separated blocks/comments so it's easy to swap out or template later.

## Notes

- Balloons are real 3D geometry (Three.js), not flat CSS circles — see the `Balloon` class in `three-scene.js`.
- If WebGL isn't available, the canvas hides itself gracefully; the page still works.
- Respects `prefers-reduced-motion`: continuous animation and the 3D scene turn off, content stays fully visible and usable.
- No audio autoplay — the sound toggle stays hidden until an audio file is added.
- Tested conceptually at 390 / 768 / 1024 / 1440px widths — single column on mobile, no horizontal scroll.
