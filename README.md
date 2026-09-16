# Smit Shewale — Portfolio

A modern, static personal portfolio for **Smit Shewale**, a Computer Science
Engineer focused on software development, data analytics and AI.

Built with **React + Vite + Tailwind CSS v4**, animated with **Framer Motion**,
icons by **Lucide**. No backend, no database, no auth — everything is static
and editable in one place.

---

## Getting started

```bash
npm install     # install dependencies
npm run dev     # start the dev server (http://localhost:5173)
npm run build   # production build → dist/
npm run preview # preview the production build locally
```

---

## Where to edit content

**All portfolio content lives in `src/data/portfolio.js`** — name, tagline,
contact links, about, education, skills, experience, projects and
certifications. The UI reads from this file, so you never touch components to
update content.

**Replace files in `public/` (regenerate icons with `npm run assets` after editing `tools/`):**

| File / folder                              | Purpose                                                        |
| ------------------------------------------ | -------------------------------------------------------------- |
| `public/resume.pdf`                        | Your resume (linked from Hero, résumé modal and palette)       |
| `public/certificates/*.pdf`                | Certificate PDFs, referenced by `certifications[].certificate` |
| `public/projects/*.jpg`                    | Project screenshots, referenced in `portfolio.js`              |
| `public/icon-*.png`, `public/og-image.png` | Generated — run `npm run assets` after editing `tools/`        |
| `tools/og-card.html`, `tools/maskable.svg` | Sources for the generated images                               |

### Projects

Each project supports `title`, `category`, `description`, `technologies`,
`github`, `demo` and `image`.

- `category` drives the filters — use `"Development"`, `"Data Analytics"` or
  `"AI"`. New categories appear in the filter bar automatically.
- Leave `github` / `demo` as `""` and the button is hidden (no broken links).
- Leave `image` as `""` to show an auto-generated gradient placeholder.

### Certifications

Add entries to the `certifications` array (a commented example is included).
The section (and its nav link) only appears once you add at least one entry.

---

## Theme

Dark by default, with a light theme. The toggle is in the navbar. The choice is
saved in `localStorage`; system preference is used when nothing is saved.
Semantic colour tokens are defined in `src/index.css` (`@theme` + a
`[data-theme="light"]` override block).

## Deployment

Static site — deploy `dist/` anywhere:

- **GitHub Pages / Netlify / Vercel / Cloudflare Pages**: build command
  `npm run build`, output `dist`.
- The resume link uses `/resume.pdf`, so deploy to the domain root (or adjust
  `vite.config.js` `base` for a sub-path).

## Accessibility & motion

- Semantic landmarks, skip link, focus-visible rings, ARIA labels throughout.
- `prefers-reduced-motion` is respected in CSS and Framer Motion animations.
