import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Menu,
  Moon,
  Palette,
  Search,
  Sun,
  X,
} from "lucide-react";
import { portfolio } from "../data/portfolio.js";

const ACCENTS = [
  { id: "indigo", label: "Indigo", swatch: "#4f6bf7" },
  { id: "emerald", label: "Emerald", swatch: "#10b981" },
  { id: "rose", label: "Rose", swatch: "#f43f5e" },
  { id: "amber", label: "Amber", swatch: "#f59e0b" },
];

function getScrollY() {
  return (
    (typeof window !== "undefined" && window.scrollY) ||
    document.documentElement.scrollTop ||
    0
  );
}

export function Navbar({
  sections,
  theme,
  accent,
  onToggleTheme,
  onChangeAccent,
}) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState("");
  const [paletteOpen, setPaletteOpen] = React.useState(false);

  // Scroll-spy: highlight the last section whose top crossed the nav area.
  // Throttled with requestAnimationFrame so it runs at most once per frame.
  React.useEffect(() => {
    const ids = sections.map((s) => s.id);
    let frame = 0;
    let ticking = false;
    const update = () => {
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) current = id;
      }
      setActive(current);
      setScrolled(getScrollY() > 12);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        frame = window.requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [sections]);

  // Escape closes the mobile menu.
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setPaletteOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock page scroll while the mobile menu is open.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-line bg-base-950/85 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="page-container flex items-center justify-between gap-6 py-3.5">
        <a
          href="#home"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
          aria-label="Back to top"
        >
          <span
            className="logo-badge grid h-8 w-8 place-items-center rounded-lg text-sm font-bold"
            aria-hidden="true"
          >
            {portfolio.personal.name.charAt(0)}
          </span>
          <span className="text-base font-semibold tracking-tight text-content">
            {portfolio.personal.name}
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                active === s.id
                  ? "text-accent-400"
                  : "text-muted hover:text-content"
              }`}
              aria-current={active === s.id ? "true" : undefined}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("portfolio:open-palette"))
            }
            className="icon-btn"
            aria-label="Open command palette"
            title="Command palette (Ctrl+K)"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            className="icon-btn"
            aria-label={
              theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
          >
            {theme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={() => setPaletteOpen(!paletteOpen)}
              className="icon-btn"
              aria-label="Change accent colour"
              aria-expanded={paletteOpen}
              aria-haspopup="true"
            >
              <Palette className="h-4 w-4" />
            </button>
            {paletteOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setPaletteOpen(false)}
                  aria-hidden="true"
                />
                <div
                  className="absolute right-0 top-11 z-50 w-44 rounded-xl border border-line bg-base-900 p-2 shadow-lg"
                  role="group"
                  aria-label="Accent colour"
                >
                  {ACCENTS.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => {
                        onChangeAccent(a.id);
                        setPaletteOpen(false);
                      }}
                      aria-pressed={accent === a.id}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-base-800 hover:text-content"
                    >
                      <span
                        className="h-4 w-4 rounded-full border border-white/20"
                        style={{ backgroundColor: a.swatch }}
                        aria-hidden="true"
                      />
                      <span className="flex-1 text-left">{a.label}</span>
                      {accent === a.id && (
                        <Check
                          className="h-4 w-4 text-accent-400"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="icon-btn md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-b border-line bg-base-900 shadow-lg md:hidden"
          >
            <nav
              className="page-container flex flex-col py-4"
              aria-label="Mobile"
            >
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium ${
                    active === s.id
                      ? "bg-base-800 text-accent-400"
                      : "text-muted hover:bg-base-800 hover:text-content"
                  }`}
                >
                  {s.label}
                  <ChevronRight
                    className="h-4 w-4 opacity-60"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
