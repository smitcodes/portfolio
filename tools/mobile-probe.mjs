/**
 * Dev-only probe: loads the built site headlessly at every common device
 * width (320px → 1023px) and reports the layout viewport vs. document
 * scroll width plus the hero's widest in-flow child, so any horizontal
 * overflow or right-edge clipping is obvious.
 * Run: node tools/mobile-probe.mjs
 */
import puppeteer from "puppeteer-core";

const URL = process.env.PROBE_URL ?? "http://localhost:4173";

const edgePaths = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const executablePath = edgePaths.find((p) => existsSync(p));
if (!executablePath) throw new Error("Edge not found");

import { existsSync } from "node:fs";

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--no-first-run", "--disable-gpu"],
});
const page = await browser.newPage();

// Sweep every common device width and report any layout overflow or a hero
// element whose right edge is clipped (i.e. wider than the viewport).
const widths = [320, 344, 360, 375, 390, 393, 412, 414, 480, 540, 600, 640, 768, 800, 900, 1000, 1023];
for (const w of widths) {
  await page.setViewport({ width: w, height: 740 });
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 500));
  const res = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const docW = document.documentElement.scrollWidth;
    const container = document.querySelector("#home .page-container");
    const cr = container?.getBoundingClientRect();
    // widest in-flow child inside the hero left column
    let maxRight = 0;
    container?.querySelectorAll("h1, p, div, a, span").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > 1) maxRight = Math.max(maxRight, r.right);
    });
    return { vw, docW, containerRight: cr ? Math.round(cr.right) : null, heroMaxRight: Math.round(maxRight) };
  });
  const bad = res.docW > res.vw + 1 || res.heroMaxRight > res.vw + 1;
  console.log(
    `${bad ? "FAIL" : "ok  "} w=${w} vw=${res.vw} docW=${res.docW} container.right=${res.containerRight} heroMaxRight=${res.heroMaxRight}`,
  );
}
await browser.close();
