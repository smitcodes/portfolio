/**
 * Dependency-free canvas confetti. Spawns a short celebratory burst
 * coloured from the site's CURRENT accent CSS tokens (so it matches
 * whichever theme is active), then removes itself from the DOM.
 * Skipped automatically when the user prefers reduced motion.
 */
export function fireConfetti() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const style = getComputedStyle(document.documentElement);
  const colors = [
    style.getPropertyValue("--color-accent-400").trim() || "#4f6bf7",
    style.getPropertyValue("--color-accent-500").trim() || "#4f6bf7",
    style.getPropertyValue("--color-secondary-400").trim() || "#7c5cf0",
    "#ffffff",
  ];

  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:95;";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  const W = window.innerWidth;
  const H = window.innerHeight;
  const originX = W / 2;
  const originY = H * 0.6;

  const particles = [];
  for (let i = 0; i < 120; i++) {
    const angle = (Math.random() * Math.PI) / 3 + Math.PI / 3; // upward fan
    const speed = 7 + Math.random() * 7;
    particles.push({
      x: originX + (Math.random() - 0.5) * W * 0.2,
      y: originY,
      vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
      vy: -Math.sin(angle) * speed - 3,
      size: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI,
      rotationSpeed: (Math.random() - 0.5) * 0.25,
      round: Math.random() > 0.5,
    });
  }

  const DURATION = 2200;
  let last = performance.now();
  const start = last;
  let frame = 0;

  const tick = (now) => {
    const dt = Math.min((now - last) / 16.7, 3);
    last = now;
    const elapsed = now - start;
    ctx.clearRect(0, 0, W, H);
    const life = Math.max(0, 1 - elapsed / DURATION);
    for (const p of particles) {
      p.vy += 0.18 * dt; // gravity
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rotation += p.rotationSpeed * dt;
      ctx.save();
      ctx.globalAlpha = life;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      if (p.round) {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }
      ctx.restore();
    }
    if (elapsed < DURATION) {
      frame = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(frame);
      canvas.remove();
    }
  };
  frame = requestAnimationFrame(tick);
}