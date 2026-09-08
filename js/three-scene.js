/* ==========================================================================
   THREE.JS BALLOON SCENE
   Reusable Balloon class + single render loop.
   Falls back gracefully to CSS balloons if WebGL is unavailable.
   ========================================================================== */

(function () {
  "use strict";

  const canvas = document.getElementById("balloon-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.innerWidth < 768;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (e) {
    renderer = null;
  }

  if (!renderer || prefersReducedMotion) {
    // Graceful fallback: hide the canvas, CSS-only scene (balloons omitted,
    // decorative blobs already exist in CSS background of each section).
    if (canvas) canvas.style.display = "none";
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 16);

  // Lighting
  scene.add(new THREE.AmbientLight(0xfff3ea, 0.9));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(5, 8, 6);
  scene.add(dirLight);
  const pointLight = new THREE.PointLight(0xffd7c2, 0.5, 30);
  pointLight.position.set(-4, 2, 8);
  scene.add(pointLight);

  // Balloon palette (matches CSS tokens)
  const PALETTE = [0xffd3c4, 0xffc7a8, 0xdcd1f7, 0xcfe7f2, 0xfff3ec, 0xff9d84];

  function makeBalloonGeometry() {
    const geo = new THREE.SphereGeometry(1, 24, 24);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      // stretch vertically + taper bottom slightly to fake a balloon silhouette
      const stretch = 1.25;
      const taper = y < 0 ? 1 - Math.abs(y) * 0.18 : 1;
      pos.setXYZ(i, x * taper, y * stretch, z * taper);
    }
    geo.computeVertexNormals();
    return geo;
  }

  const balloonGeo = makeBalloonGeometry();

  class Balloon {
    constructor(index) {
      const color = PALETTE[index % PALETTE.length];
      const material = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.35,
        metalness: 0.05,
      });
      this.mesh = new THREE.Mesh(balloonGeo, material);

      const scale = THREE.MathUtils.randFloat(0.55, 1.15);
      this.mesh.scale.setScalar(scale);

      this.basePos = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(18),
        THREE.MathUtils.randFloatSpread(11) - 1,
        THREE.MathUtils.randFloatSpread(6) - 2
      );
      this.mesh.position.copy(this.basePos);

      // string
      const stringGeo = new THREE.CylinderGeometry(0.012, 0.012, 1.6 * scale, 4);
      const stringMat = new THREE.MeshBasicMaterial({ color: 0xcabfae, transparent: true, opacity: 0.55 });
      this.string = new THREE.Mesh(stringGeo, stringMat);
      this.string.position.set(0, -1.6 * scale, 0);
      this.mesh.add(this.string);

      // subtle highlight
      const hlGeo = new THREE.SphereGeometry(0.18 * scale, 8, 8);
      const hlMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
      this.highlight = new THREE.Mesh(hlGeo, hlMat);
      this.highlight.position.set(-0.35 * scale, 0.5 * scale, 0.85 * scale);
      this.mesh.add(this.highlight);

      this.speed = THREE.MathUtils.randFloat(0.25, 0.5);
      this.driftPhase = Math.random() * Math.PI * 2;
      this.rotSpeed = THREE.MathUtils.randFloat(-0.08, 0.08);
    }

    update(t) {
      this.mesh.position.y = this.basePos.y + Math.sin(t * this.speed + this.driftPhase) * 0.6;
      this.mesh.position.x = this.basePos.x + Math.sin(t * this.speed * 0.6 + this.driftPhase) * 0.3;
      this.mesh.rotation.z = Math.sin(t * 0.3 + this.driftPhase) * 0.08;
    }
  }

  const BALLOON_COUNT = isMobile ? 5 : 9;
  const balloons = [];
  for (let i = 0; i < BALLOON_COUNT; i++) {
    const b = new Balloon(i);
    balloons.push(b);
    scene.add(b.mesh);
  }

  // Mouse parallax
  const mouse = { x: 0, y: 0 };
  const targetRotation = { x: 0, y: 0 };
  if (!isMobile) {
    window.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });
  }

  // Resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    balloons.forEach((b) => b.update(t));

    targetRotation.x += (mouse.y * 0.15 - targetRotation.x) * 0.03;
    targetRotation.y += (mouse.x * 0.15 - targetRotation.y) * 0.03;
    scene.rotation.x = targetRotation.x;
    scene.rotation.y = targetRotation.y;

    renderer.render(scene, camera);
  }
  animate();

  // Expose a tiny API for the gift/candle reveals to spawn a quick balloon rise
  window.__balloonScene = {
    scene,
    camera,
    THREE,
    riseBurst() {
      const burst = [];
      const count = isMobile ? 3 : 6;
      for (let i = 0; i < count; i++) {
        const b = new Balloon(Math.floor(Math.random() * PALETTE.length));
        b.basePos.set(
          THREE.MathUtils.randFloatSpread(10),
          -8 - Math.random() * 2,
          THREE.MathUtils.randFloatSpread(4)
        );
        b.mesh.position.copy(b.basePos);
        b.mesh.scale.multiplyScalar(0.8);
        scene.add(b.mesh);
        burst.push(b);
      }
      const start = clock.getElapsedTime();
      function riseStep() {
        const elapsed = clock.getElapsedTime() - start;
        burst.forEach((b) => {
          b.mesh.position.y += 0.09;
          b.mesh.position.x += Math.sin(elapsed * 2 + b.driftPhase) * 0.01;
        });
        if (elapsed < 6) {
          requestAnimationFrame(riseStep);
        } else {
          burst.forEach((b) => scene.remove(b.mesh));
        }
      }
      riseStep();
    },
  };
})();
