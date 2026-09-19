import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Download,
  Github,
  LayoutGrid,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { portfolio } from "../data/portfolio.js";
import { Magnetic } from "./Magnetic.jsx";

// Download link that respects Vite's `base` — works at the domain root and on sub-paths
const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`;

export function Hero() {
  const reduce = useReducedMotion();
  const glowRef = React.useRef(null);

  const roles = portfolio.personal.roles ?? [];
  const [roleIndex, setRoleIndex] = React.useState(0);

  // Cycle through roles every ~2.6s (static first role for reduced motion)
  React.useEffect(() => {
    if (reduce || roles.length < 2) return undefined;
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [reduce, roles.length]);

  // Cursor spotlight: a soft glow that follows the mouse across the hero.
  // rAF-throttled, skipped on touch devices and for reduced-motion users.
  React.useEffect(() => {
    const el = glowRef.current;
    const host = el ? el.parentElement : null;
    if (!el || !host || reduce) return undefined;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      return undefined;
    }
    let frame = 0;
    const onMove = (e) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = host.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
        el.classList.add("is-active");
      });
    };
    const onLeave = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
      el.classList.remove("is-active");
    };
    host.addEventListener("mousemove", onMove, { passive: true });
    host.addEventListener("mouseleave", onLeave);
    return () => {
      host.removeEventListener("mousemove", onMove);
      host.removeEventListener("mouseleave", onLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduce]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative overflow-hidden"
    >
      {/* Cursor spotlight - painted before the grid so the grid sits on top */}
      <div
        ref={glowRef}
        className="cursor-glow pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      {/* Decorative background */}
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <div
        className="aurora-blob pointer-events-none absolute -top-24 -right-24 h-96 w-96 opacity-25"
        aria-hidden="true"
      />
      <div
        className="aurora-blob aurora-alt pointer-events-none absolute -bottom-32 -left-24 h-88 w-88 opacity-20"
        aria-hidden="true"
      />

      <div className="page-container relative z-10 grid items-center gap-10 pb-20 pt-28 lg:grid-cols-12 lg:gap-12 lg:pb-32 lg:pt-36">
        <motion.div
          className="lg:col-span-7"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={item}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent-500 opacity-60"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-400"></span>
            </span>
            {portfolio.personal.role}
          </motion.p>

          <motion.h1
            variants={item}
            className="text-4xl font-extrabold tracking-tight text-content sm:text-5xl lg:text-6xl"
          >
            {portfolio.personal.name}
          </motion.h1>

          {roles.length > 0 && (
            <motion.div
              variants={item}
              className="mt-6 flex min-h-9 items-center gap-2 text-xl font-bold sm:text-3xl"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={roles[roleIndex] ?? roleIndex}
                  className="text-gradient"
                  initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -16 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
              <span
                className="cursor-blink font-mono font-normal text-accent-400"
                aria-hidden="true"
              >
                |
              </span>
            </motion.div>
          )}

          <motion.p
            variants={item}
            className="mt-4 max-w-2xl text-lg leading-relaxed text-muted"
          >
            {portfolio.personal.tagline}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#projects"
                className="btn btn-primary w-full justify-center sm:w-auto"
              >
                <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                View Projects
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a
                href={RESUME_URL}
                download
                className="btn btn-secondary w-full justify-center sm:w-auto"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download Resume
              </a>
            </Magnetic>
            <span
              className="chip self-start sm:self-auto"
              aria-label={`Location: ${portfolio.personal.location}`}
            >
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {portfolio.personal.location}
            </span>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-3">
            <span className="text-sm text-faint">Find me on</span>
            <a
              href={portfolio.personal.github}
              className="icon-btn"
              aria-label="GitHub profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={portfolio.personal.linkedin}
              className="icon-btn"
              aria-label="LinkedIn profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${portfolio.personal.email}`}
              className="icon-btn"
              aria-label={`Email ${portfolio.personal.name}`}
            >
              <Mail className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* Developer-style code card */}
        <motion.div
          className="hidden lg:col-span-5 lg:grid lg:grid-cols-1"
          variants={item}
          initial="hidden"
          animate="show"
        >
          <div
            className="code-card p-5 font-mono text-sm leading-6 shadow-lg"
            role="img"
            aria-label="Code-style summary of the profile: focus on software, data and AI, with tools like Java, React and Python."
          >
            <div className="flex items-center gap-2 text-faint">
              <span
                className="h-3 w-3 rounded-full bg-red-400"
                aria-hidden="true"
              ></span>
              <span
                className="h-3 w-3 rounded-full bg-yellow-400"
                aria-hidden="true"
              ></span>
              <span
                className="h-3 w-3 rounded-full bg-green-500"
                aria-hidden="true"
              ></span>
              <span className="ml-auto text-xs opacity-70">profile.js</span>
            </div>
            <pre className="mt-4 overflow-x-auto">
              <code>
                <span className="text-faint">// {portfolio.personal.name}</span>
                {"\n"}
                <span className="text-accent-400">const</span>{" "}
                <span className="text-content">engineer</span>{" "}
                <span className="text-faint">=</span>{" "}
                <span className="text-faint">{"{"}</span>
                {"\n  "}
                <span className="text-accent-400">focus</span>{" "}
                <span className="text-faint">:</span>{" "}
                <span className="text-secondary-400">
                  ["software", "data", "ai"]
                </span>
                <span className="text-faint">,</span>
                {"\n  "}
                <span className="text-accent-400">projects</span>{" "}
                <span className="text-faint">:</span>{" "}
                <span className="text-content">
                  {String(portfolio.projects.length)}
                </span>
                <span className="text-faint">,</span>
                {"\n  "}
                <span className="text-accent-400">stack</span>{" "}
                <span className="text-faint">:</span>{" "}
                <span className="text-secondary-400">
                  "Python · React · SQL"
                </span>
                {"\n"}
                <span className="text-faint">{"};"}</span>
                <span className="cursor-blink text-content">{"_"}</span>
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
