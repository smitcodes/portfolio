<h1 align="center">Smit Shewale — Portfolio</h1>

<p align="center">
  <a href="https://portfolio-darb-mu-13.vercel.app"><strong>🔗 View Live</strong></a>
  ·
  <a href="https://github.com/smitcodes/portfolio/issues">Report an issue</a>
</p>

<p align="center">
  Personal portfolio of <strong>Smit Shewale</strong> — Computer Science Engineer
  focused on software development, data analytics and AI.
</p>

> **No backend, no tracking, no database** — the whole site is static, so
> static. Projects, résumé and certificates are all viewable directly on the
> page, and the entire site works offline after your first visit.

---

## ✨ Highlights

- **Responsive, animated UI** — smooth, physics-based motion (Framer Motion)
  that automatically simplifies for visitors who prefer reduced motion.
- **Dark & light themes** — toggle in the navbar; your choice is remembered.
- **Filterable projects** — browse by Development, Data Analytics or AI, with
  detail modals, tech tags and direct GitHub links.
- **Résumé & certificates built in** — view the résumé and every certificate
  PDF without leaving the site.
- **Live GitHub stats** — public repo count fetched straight from the GitHub
  API (with a graceful offline fallback).
- **Command palette** — press `Ctrl/⌘ + K` to jump anywhere or open any action.
- **Accessible by default** — semantic landmarks, skip link, keyboard-friendly
  modals, focus rings and ARIA labels throughout.
- **Installable & offline-ready** — web app manifest + service worker cache the
  site, so it loads even when you're offline.
- **SEO-ready** — canonical tags, Open Graph/Twitter share card, sitemap and
  robots.txt generated from a single source of truth.

## 🛠 Tech stack

| Layer     | Tools                                   |
| --------- | --------------------------------------- |
| Framework | React 19 + Vite                         |
| Styling   | Tailwind CSS v4, custom design tokens   |
| Motion    | Framer Motion                           |
| Icons     | Lucide                                  |
| Hosting   | GitHub Pages (works on any static host) |

## 🧭 What's inside

| Section        | Contents                                                            |
| -------------- | ------------------------------------------------------------------- |
| Hero           | Intro, roles and quick links to résumé, GitHub and LinkedIn         |
| About          | Background, current focus, interests and education                  |
| Skills         | Programming languages, web, data/AI tooling and developer tools     |
| Experience     | Internships and roles with key takeaways                            |
| Projects       | Featured work with categories, tech stacks and source links         |
| Certifications | Internship, job simulation and NPTEL course certificates (viewable) |
| Contact        | Direct email and profile links — no forms, no data collection       |

---

## 🚀 Run it locally

```bash
git clone https://github.com/smitcodes/portfolio.git
cd portfolio
npm install
npm run dev       # http://localhost:5173
```

Production build & preview:

```bash
npm run build     # outputs static site to dist/
npm run preview   # serve the production build locally
```

### Editing content

Everything on the site — name, tagline, links, projects, certifications —
lives in **`src/data/portfolio.js`**. The UI reads entirely from that file, so
content updates never require touching components:

- `projects[].category` drives the filter tabs (`"Development"`,
  `"Data Analytics"`, `"AI"` — new categories appear automatically).
- Leave `github` / `demo` as `""` and the corresponding button is hidden.
- Leave `image` as `""` and an auto-generated gradient placeholder is shown;
  drop a screenshot in `public/projects/` and set `image: "/projects/…"` to
  use a real one.
- The Certifications section (and its nav link) appears automatically once the
  `certifications` array has at least one entry.
- Replace `public/resume.pdf` and `public/certificates/*.pdf` to swap in your
  own documents.

### Deployment

Deploy `dist/` to any static host (GitHub Pages, Netlify, Vercel, Cloudflare
Pages). Résumé/certificate links go through Vite's `base`, so sub-path deploys
(e.g. `username.github.io/portfolio/`) work out of the box. The canonical URL,
sitemap and robots.txt are all derived from `SITE_URL` in `vite.config.js`.

---

## 📬 Connect

- **Email** — [smit9552@gmail.com](mailto:smit9552@gmail.com)
- **GitHub** — [github.com/smitcodes](https://github.com/smitcodes)
- **LinkedIn** — [linkedin.com/in/smitshewale](https://www.linkedin.com/in/smitshewale)
