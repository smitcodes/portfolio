import React from "react";
import { portfolio } from "./data/portfolio.js";
import { Navbar } from "./components/Navbar.jsx";
import { Hero } from "./components/Hero.jsx";
import { About } from "./components/About.jsx";
import { Skills } from "./components/Skills.jsx";
import { Experience } from "./components/Experience.jsx";
import { Projects } from "./components/Projects.jsx";
import { Certifications } from "./components/Certifications.jsx";
import { Contact } from "./components/Contact.jsx";
import { Footer } from "./components/Footer.jsx";
import { BackToTop } from "./components/BackToTop.jsx";
import { ScrollProgress } from "./components/ScrollProgress.jsx";
import { TechMarquee } from "./components/TechMarquee.jsx";

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
    () => BASE_SECTIONS.filter((s) => s.id !== "certifications" || hasCertifications),
    [hasCertifications]
  );

  const [theme, setTheme] = React.useState(() =>
    document.documentElement.getAttribute("data-theme") || "dark"
  );

  const [accent, setAccent] = React.useState(
    () => document.documentElement.getAttribute("data-accent") || "indigo"
  );

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
        <TechMarquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        {hasCertifications && <Certifications />}
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}