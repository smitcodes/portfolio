/**
 * One-off: walk every element and list those extending past the viewport
 * (right edge > vw or left edge < 0), grouped top-down. Works even when
 * overflow-x: hidden hides the overflow from scrollWidth.
 * Run: node tools/overflow-probe.mjs [width]
 */
import puppeteer from "puppeteer-core";

const width = Number(process.argv[2] ?? 360);
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
await page.setViewport({ width, height: 740 });
await page.goto(URL, { waitUntil: "networkidle2", timeout: 30000 });
// let whileInView animations settle: scroll through the whole page
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 600) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 60));
  }
  window.scrollTo(0, 0);
});
await new Promise((r) => setTimeout(r, 800));

const report = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const out = [];
  document.querySelectorAll("body *").forEach((el) => {
    // skip the marquee: its track is intentionally wider than the screen
    // and gets masked by .marquee-mask
    if (el.closest(".marquee-mask, .marquee-track, .marquee-group")) return;
    const r = el.getBoundingClientRect();
    if (r.width === 0) return;
    if (r.right > vw + 1 || r.left < -1) {
      out.push({
        tag: el.tagName.toLowerCase(),
        cls: String(el.className?.baseVal ?? el.className).slice(0, 60),
        left: Math.round(r.left),
        right: Math.round(r.right),
        w: Math.round(r.width),
        text: (el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 50),
      });
    }
  });
  out.sort((a, b) => b.right - a.right);

  // computed styles for diagnosis
  const info = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      sel,
      w: Math.round(r.width),
      display: cs.display,
      whiteSpace: cs.whiteSpace,
      gridTemplateColumns: cs.gridTemplateColumns,
      minWidth: cs.minWidth,
      childCount: el.children.length,
      firstChildTag: el.firstElementChild?.tagName?.toLowerCase(),
      firstChildClass: String(
        el.firstElementChild?.className?.baseVal ??
          el.firstElementChild?.className ??
          "",
      ).slice(0, 60),
    };
  };

  const aboutH2 = [...document.querySelectorAll("#about h2")][0];
  const h2info = aboutH2
    ? {
        sel: "#about h2",
        w: Math.round(aboutH2.getBoundingClientRect().width),
        whiteSpace: getComputedStyle(aboutH2).whiteSpace,
        innerHTMLsnippet: aboutH2.innerHTML.replace(/\s+/g, " ").slice(0, 200),
        firstWordDisplay: aboutH2.firstElementChild
          ? getComputedStyle(aboutH2.firstElementChild).display
          : null,
        firstWordWhiteSpace: aboutH2.firstElementChild
          ? getComputedStyle(aboutH2.firstElementChild).whiteSpace
          : null,
      }
    : null;

  return {
    vw,
    count: out.length,
    offenders: out.slice(0, 25),
    heading: h2info,
    grid: info("#about .page-container > div.mt-14"),
    aside: info("#about aside"),
  };
});

console.log(`viewport ${width}px, offenders past edge: ${report.count}`);
for (const o of report.offenders) {
  console.log(
    `r=${o.right} l=${o.left} w=${o.w} <${o.tag} class="${o.cls}"> "${o.text}"`,
  );
}
console.log("HEADING:", JSON.stringify(report.heading, null, 2));
console.log("GRID:", JSON.stringify(report.grid, null, 2));
console.log("ASIDE:", JSON.stringify(report.aside, null, 2));
await browser.close();
