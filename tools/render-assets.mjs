/**
 * Renders the static image assets (social share card + PWA/favicon icons)
 * using a locally installed Chrome or Edge in headless mode.
 *
 *   npm run assets
 *
 * Zero npm dependencies — only Node built-ins.
 *
 * Outputs into public/:
 *   og-image.png   1200x630   social share card (og:image / twitter:image)
 *   icon-32.png               favicon fallback
 *   icon-180.png              apple-touch-icon
 *   icon-192.png              PWA manifest icon
 *   icon-512.png              PWA manifest icon
 *
 * Override the browser with:  CHROME_PATH="C:\\path\\to\\chrome.exe" npm run assets
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");

const BROWSERS = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const browser = BROWSERS.find((p) => existsSync(p));

if (!browser) {
  console.error(
    "✗ No Chrome or Edge found.\n" +
      "  Set CHROME_PATH to your browser executable, e.g.\n" +
      '  CHROME_PATH="C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" npm run assets',
  );
  process.exit(1);
}

const toFileUrl = (p) => `file:///${p.replace(/\\/g, "/")}`;
const ogCard = toFileUrl(path.join(root, "tools", "og-card.html"));
const favicon = toFileUrl(path.join(root, "public", "favicon.svg"));
const maskable = toFileUrl(path.join(root, "tools", "maskable.svg"));

/** Each job renders one source file at an exact pixel size. */
const jobs = [
  {
    out: "og-image.png",
    src: ogCard,
    w: 1200,
    h: 630,
    label: "social share card",
  },
  ...[32, 180, 192, 512].map((size) => ({
    out: `icon-${size}.png`,
    src: favicon,
    w: size,
    h: size,
    label: `icon ${size}x${size}`,
  })),
  {
    out: "icon-512-maskable.png",
    src: maskable,
    w: 512,
    h: 512,
    label: "maskable PWA icon",
  },
];

const outDir = path.join(root, "public");
mkdirSync(outDir, { recursive: true });

// A throwaway profile keeps renders isolated from any running browser session.
const profileDir = path.join(root, "node_modules", ".chrome-assets");

const chromeArgs = (job, outPath, headlessFlag) => [
  headlessFlag,
  "--disable-gpu",
  "--hide-scrollbars",
  "--no-first-run",
  "--no-default-browser-check",
  "--force-device-scale-factor=1",
  "--default-background-color=00000000",
  "--virtual-time-budget=5000", // let webfonts finish loading before capture
  `--user-data-dir=${profileDir}`,
  `--window-size=${job.w},${job.h}`,
  `--screenshot=${outPath}`,
  job.src,
];

let failures = 0;

for (const job of jobs) {
  const outPath = path.join(outDir, job.out);
  let rendered = false;

  // `--headless=new` on modern Chrome; older builds only understand `--headless`.
  for (const flag of ["--headless=new", "--headless"]) {
    try {
      execFileSync(browser, chromeArgs(job, outPath, flag), { stdio: "pipe" });
      if (existsSync(outPath) && statSync(outPath).size > 0) {
        rendered = true;
        break;
      }
    } catch {
      /* try the next headless flavour */
    }
  }

  if (rendered) {
    const kb = (statSync(outPath).size / 1024).toFixed(1);
    console.log(
      `✓ public/${job.out}  ${job.w}x${job.h}  ${kb} kB  (${job.label})`,
    );
  } else {
    failures += 1;
    console.error(`✗ failed: ${job.out} (${job.label})`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} asset(s) failed to render.`);
  process.exit(1);
}

console.log(`\nAll ${jobs.length} image assets rendered into public/.`);
