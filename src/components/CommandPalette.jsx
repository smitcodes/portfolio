import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Award,
  Briefcase,
  Copy,
  FileText,
  Github,
  LayoutGrid,
  Linkedin,
  Mail,
  Moon,
  Palette,
  Search,
  Sun,
  User,
  Wrench,
} from "lucide-react";
import { portfolio } from "../data/portfolio.js";

const BASE = import.meta.env.BASE_URL;

const ACCENTS = [
  { id: "indigo", label: "Switch accent to indigo", swatch: "#7a8cff" },
  { id: "emerald", label: "Switch accent to emerald", swatch: "#34d399" },
  { id: "rose", label: "Switch accent to rose", swatch: "#fb7185" },
  { id: "amber", label: "Switch accent to amber", swatch: "#fbbf24" },
];

const SECTIONS = [
  { id: "about", label: "Go to About", icon: User },
  { id: "skills", label: "Go to Skills", icon: Wrench },
  { id: "experience", label: "Go to Experience", icon: Briefcase },
  { id: "projects", label: "Go to Projects", icon: LayoutGrid },
  { id: "certifications", label: "Go to Certifications", icon: Award },
  { id: "contact", label: "Go to Contact", icon: Mail },
];

/**
 * ⌘/Ctrl + K command palette — jumps to sections, opens project details,
 * opens links, and toggles the theme / accent colour.
 *
 * Keyboard model is the standard combobox pattern: the search input keeps
 * focus and drives the list via aria-activedescendant, so there is only one
 * tab stop and no focus trap to get wrong.
 */
export function CommandPalette({
  theme,
  onToggleTheme,
  onChangeAccent,
  onViewResume,
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef(null);
  const panelRef = React.useRef(null);

  const close = React.useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  /** Every available action, rebuilt when the theme or accent changes. */
  const commands = React.useMemo(() => {
    const list = [];

    for (const section of SECTIONS) {
      // Skip certifications entirely when that section isn't rendered.
      if (
        section.id === "certifications" &&
        portfolio.certifications.length === 0
      )
        continue;
      list.push({
        id: `nav-${section.id}`,
        group: "Navigate",
        label: section.label,
        icon: section.icon,
        run: () => {
          const el = document.getElementById(section.id);
          if (el)
            el.scrollIntoView({
              behavior: reduce ? "auto" : "smooth",
              block: "start",
            });
        },
      });
    }

    for (const project of portfolio.projects) {
      list.push({
        id: `project-${project.title}`,
        group: "Projects",
        label: project.title,
        keywords: `${project.category} ${project.technologies.join(" ")}`,
        icon: LayoutGrid,
        run: () => {
          const el = document.getElementById("projects");
          if (el)
            el.scrollIntoView({
              behavior: reduce ? "auto" : "smooth",
              block: "start",
            });
          // Projects listens for this and opens the matching card's modal.
          window.dispatchEvent(
            new CustomEvent("portfolio:open-project", {
              detail: project.title,
            }),
          );
        },
      });
    }

    list.push(
      {
        id: "link-github",
        group: "Links",
        label: "Open GitHub profile",
        icon: Github,
        run: () =>
          window.open(
            portfolio.personal.github,
            "_blank",
            "noopener,noreferrer",
          ),
      },
      {
        id: "link-linkedin",
        group: "Links",
        label: "Open LinkedIn profile",
        icon: Linkedin,
        run: () =>
          window.open(
            portfolio.personal.linkedin,
            "_blank",
            "noopener,noreferrer",
          ),
      },
      {
        id: "link-email",
        group: "Links",
        label: `Copy email — ${portfolio.personal.email}`,
        icon: Copy,
        run: async () => {
          try {
            await navigator.clipboard.writeText(portfolio.personal.email);
          } catch {
            /* clipboard unavailable — the address is visible in the label */
          }
        },
      },
      {
        id: "link-resume",
        group: "Links",
        label: "Preview résumé",
        keywords: "cv resume pdf preview view",
        icon: FileText,
        run: () => {
          if (onViewResume) onViewResume();
        },
      },
      {
        id: "link-resume-download",
        group: "Links",
        label: "Download résumé (PDF)",
        keywords: "cv resume pdf download",
        icon: FileText,
        run: () => {
          const a = document.createElement("a");
          a.href = `${BASE}resume.pdf`;
          a.download = "";
          document.body.appendChild(a);
          a.click();
          a.remove();
        },
      },
      {
        id: "action-theme",
        group: "Appearance",
        label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
        icon: theme === "dark" ? Sun : Moon,
        run: () => onToggleTheme(),
      },
    );

    for (const accent of ACCENTS) {
      list.push({
        id: `accent-${accent.id}`,
        group: "Appearance",
        label: accent.label,
        swatch: accent.swatch,
        icon: Palette,
        run: () => onChangeAccent(accent.id),
      });
    }

    return list;
  }, [theme, reduce, onToggleTheme, onChangeAccent, onViewResume]);

  /** Simple ranked filter: label matches first, then keyword/group matches. */
  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    const scored = [];
    for (const cmd of commands) {
      const label = cmd.label.toLowerCase();
      const at = label.indexOf(q);
      if (at !== -1) {
        scored.push({ cmd, score: at });
      } else if (
        `${label} ${cmd.group.toLowerCase()} ${cmd.keywords ?? ""}`.includes(q)
      ) {
        scored.push({ cmd, score: 100 });
      }
    }
    return scored.sort((a, b) => a.score - b.score).map((entry) => entry.cmd);
  }, [commands, query]);

  React.useEffect(() => setActive(0), [query]);

  // Global ⌘K / Ctrl+K toggle.
  React.useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lets other UI (the navbar's ⌘K button) open the palette too.
  React.useEffect(() => {
    const onOpenPalette = () => setOpen(true);
    window.addEventListener("portfolio:open-palette", onOpenPalette);
    return () =>
      window.removeEventListener("portfolio:open-palette", onOpenPalette);
  }, []);

  // Lock scroll, focus the input, and hand focus back on close.
  React.useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(id);
      if (previouslyFocused && document.contains(previouslyFocused)) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [open]);

  const runCommand = (cmd) => {
    close();
    // Let the palette unmount first so any smooth scroll isn't fighting it.
    window.setTimeout(() => cmd.run(), 0);
  };

  const onInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = results[active];
      if (cmd) runCommand(cmd);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      // Single tab stop: keep focus on the input rather than the page behind.
      e.preventDefault();
    }
  };

  const activeId = results[active] ? `cmdk-${results[active].id}` : undefined;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmdk-backdrop"
          onClick={close}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="cmdk-panel"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: reduce ? 0 : -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : -10, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="cmdk-search">
              <Search
                className="h-4 w-4 shrink-0 text-faint"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search sections, projects, links and actions…"
                className="cmdk-input"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmdk-list"
                aria-activedescendant={activeId}
                aria-autocomplete="list"
                autoComplete="off"
                spellCheck="false"
              />
              <kbd className="cmdk-kbd">Esc</kbd>
            </div>

            <ul
              id="cmdk-list"
              role="listbox"
              aria-label="Commands"
              className="cmdk-list"
            >
              {results.length === 0 ? (
                <li className="cmdk-empty">No matching commands</li>
              ) : (
                results.map((cmd, index) => {
                  const Icon = cmd.icon;
                  return (
                    <li
                      key={cmd.id}
                      id={`cmdk-${cmd.id}`}
                      role="option"
                      aria-selected={index === active}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => runCommand(cmd)}
                      className={`cmdk-item${index === active ? " is-active" : ""}`}
                    >
                      {cmd.swatch ? (
                        <span
                          className="cmdk-swatch"
                          style={{ background: cmd.swatch }}
                          aria-hidden="true"
                        />
                      ) : (
                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      )}
                      <span className="flex-1 truncate">{cmd.label}</span>
                      <span className="cmdk-group">{cmd.group}</span>
                    </li>
                  );
                })
              )}
            </ul>

            <div className="cmdk-foot">
              <span>
                <kbd className="cmdk-kbd">↑</kbd>
                <kbd className="cmdk-kbd">↓</kbd> navigate
              </span>
              <span>
                <kbd className="cmdk-kbd">↵</kbd> select
              </span>
              <span>
                <kbd className="cmdk-kbd">Esc</kbd> close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
