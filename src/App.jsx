import React, { Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { portfolio } from "./data/portfolio.js";
import { Navbar } from "./components/Navbar.jsx";
import { Hero } from "./components/Hero.jsx";
import { ScrollProgress } from "./components/ScrollProgress.jsx";

/**
 * Code splitting: everything below the fold loads on demand so the initial
 * bundle stays lean (faster first paint on mobile). Hero / Navbar /
 * ScrollProgress stay eager because they're above the fold.
 * Components use named exports, hence the `.then` mapping to `default`.
 */
const TechMarquee = React.lazy(() =>
  import("./components/TechMarquee.jsx").then((m) => ({
    default: m.TechMarquee,
  })),
);
const About = React.lazy(() =>
  import("./components/About.jsx").then((m) => ({ default: m.About })),
);
const Skills = React.lazy(() =>
  import("./components/Skills.jsx").then((m) => ({ default: m.Skills })),
);
const Experience = React.lazy(() =>
  import("./components/Experience.jsx").then((m) => ({
    default: m.Experience,
  })),
);
const Projects = React.lazy(() =>
  import("./components/Projects.jsx").then((m) => ({ default: m.Projects })),
);
const Certifications = React.lazy(() =>
  import("./components/Certifications.jsx").then((m) => ({
    default: m.Certifications,
  })),
);
const Contact = React.lazy(() =>
  import("./components/Contact.jsx").then((m) => ({ default: m.Contact })),
);
const Footer = React.lazy(() =>
  import("./components/Footer.jsx").then((m) => ({ default: m.Footer })),
);
const BackToTop = React.lazy(() =>
  import("./components/BackToTop.jsx").then((m) => ({ default: m.BackToTop })),
);
const CommandPalette = React.lazy(() =>
  import("./components/CommandPalette.jsx").then((m) => ({
    default: m.CommandPalette,
  })),
);
const ResumeModal = React.lazy(() =>
  import("./components/ResumeModal.jsx").then((m) => ({
    default: m.ResumeModal,
  })),
);

/** Layout-preserving placeholder while a below-fold chunk loads. */
function SectionFallback() {
  return (
    <div className="page-container py-16" aria-hidden="true">
      <div className="h-40 animate-pulse rounded-2xl border border-line bg-base-900" />
    </div>
  );
}

const BASE_SECTIONS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const THEME_COLORS = { dark: "#0b0d12", light: "#f7f8fa" };

export function App() {
  const hasCertifications = portfolio.certifications.length > 0;
  // Memoized so the Navbar's scroll-spy effect doesn't re-run on theme toggles
  const sections = React.useMemo(
    () =>
      BASE_SECTIONS.filter(
        (s) => s.id !== "certifications" || hasCertifications,
      ),
    [hasCertifications],
  );

  const [theme, setTheme] = React.useState(
    () => document.documentElement.getAttribute("data-theme") || "dark",
  );

  const [accent, setAccent] = React.useState(
    () => document.documentElement.getAttribute("data-accent") || "indigo",
  );

  // Résumé preview dialog — opened from the footer's "View résumé" link.
  const [resumeOpen, setResumeOpen] = React.useState(false);
  const openResume = React.useCallback(() => setResumeOpen(true), []);
  const closeResume = React.useCallback(() => setResumeOpen(false), []);

  const changeAccent = React.useCallback((next) => {
    if (next === "indigo") {
      document.documentElement.removeAttribute("data-accent");
    } else {
      document.documentElement.setAttribute("data-accent", next);
    }
    try {
      localStorage.setItem("ss-accent", next);
    } catch {
      /* storage unavailable - ignore */
    }
    setAccent(next);
  }, []);

  const toggleTheme = React.useCallback(() => {
    const next =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("ss-theme", next);
    } catch {
      /* storage unavailable — ignore */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEME_COLORS[next]);
    setTheme(next);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-base-950">
      <div className="noise-overlay" aria-hidden="true" />
      <ScrollProgress />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar
        sections={sections}
        theme={theme}
        accent={accent}
        onToggleTheme={toggleTheme}
        onChangeAccent={changeAccent}
      />
      <main id="main-content" className="flex-1">
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <TechMarquee />
          <About />
          <Skills />
          <Experience />
          <Projects />
          {hasCertifications && <Certifications />}
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer onViewResume={openResume} />
        <BackToTop />
        <CommandPalette
          theme={theme}
          onToggleTheme={toggleTheme}
          onChangeAccent={changeAccent}
          onViewResume={openResume}
        />
      </Suspense>
      <AnimatePresence>
        {resumeOpen && (
          <Suspense fallback={null}>
            <ResumeModal onClose={closeResume} />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
}
