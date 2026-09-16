import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * ─────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH FOR THE DEPLOYED URL
 * Change this one line if the site moves (custom domain, root
 * deploy instead of a project subpath, etc). It drives:
 *   • canonical + og:url + og:image + twitter:image in index.html
 *   • the generated sitemap.xml and robots.txt
 * Always include the trailing slash.
 * ─────────────────────────────────────────────────────────────
 */
const SITE_URL = "https://smitcodes.github.io/portfolio/";

/**
 * Replaces `%SITE_URL%` tokens in index.html and emits sitemap.xml +
 * robots.txt from that same constant, so they can never drift apart.
 */
function siteFilesPlugin() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

  const robots = `# https://smitcodes.github.io/portfolio/
User-agent: *
Allow: /

Sitemap: ${SITE_URL}sitemap.xml
`;

  return {
    name: "site-files",
    enforce: "post",
    transformIndexHtml(html) {
      return html.replaceAll("%SITE_URL%", SITE_URL);
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: sitemap,
      });
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteFilesPlugin()],
  base: "./",
});
