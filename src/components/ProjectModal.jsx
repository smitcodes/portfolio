import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ExternalLink, Github, X } from "lucide-react";

/**
 * Full project overview dialog, formatted in labelled sections:
 * category chip, title, Overview, Key Features, Tech Stack, then the
 * action links. No image header — text-focused. Closes on Escape,
 * backdrop click or the close button; locks scroll; manages focus.
 */
export function ProjectModal({ project, onClose }) {
  const reduce = useReducedMotion();
  const closeRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const returnFocusRef = React.useRef(null);
  const {
    title,
    description,
    overview,
    highlights = [],
    category,
    technologies = [],
    github,
    demo,
  } = project;

  React.useEffect(() => {
    // Remember what was focused so focus can be handed back on close.
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    /** Visible, focusable elements inside the dialog, in DOM order. */
    const focusableInPanel = () => {
      const panel = panelRef.current;
      if (!panel) return [];
      return Array.from(
        panel.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.getClientRects().length > 0);
    };

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      // Trap Tab / Shift+Tab inside the dialog so focus can never reach
      // the page behind it while the modal is open.
      if (e.key !== "Tab") return;

      const focusable = focusableInPanel();
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const inside = panelRef.current?.contains(active);

      if (e.shiftKey) {
        if (!inside || active === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (!inside || active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    if (closeRef.current) closeRef.current.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";

      // Hand focus back to whatever opened the dialog. If the card body was
      // clicked (rather than its button) focus may sit on <body>, so fall back
      // to the card's own "View details" trigger for this project.
      let target = returnFocusRef.current;
      if (!target || target === document.body || !document.contains(target)) {
        const selector = `[data-project-trigger=${JSON.stringify(title)}]`;
        target = document.querySelector(selector);
      }
      if (target && typeof target.focus === "function" && document.contains(target)) {
        target.focus({ preventScroll: true });
      }
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.18 } }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: reduce ? 0 : 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 0, transition: { duration: 0.18 } }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="modal-close"
          aria-label="Close project details"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="modal-body">
          {/* Category */}
          <div className="flex items-center gap-2 pr-12">
            <span className="chip text-xs">{category}</span>
          </div>

          {/* Title */}
          <h3
            id="project-modal-title"
            className="mt-3 text-2xl font-bold tracking-tight text-content"
          >
            {title}
          </h3>

          {/* Overview */}
          <section className="mt-6" aria-label="Overview">
            <h4 className="modal-label">Overview</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {overview || description}
            </p>
          </section>

          {/* Key features */}
          {highlights.length > 0 && (
            <section className="mt-6" aria-label="Key features">
              <h4 className="modal-label">Key Features</h4>
              <ul className="mt-3 space-y-2.5">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden="true" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Tech stack */}
          {technologies.length > 0 && (
            <section className="mt-6" aria-label="Tech stack">
              <h4 className="modal-label">Tech Stack</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <li key={tech} className="chip text-xs">
                    {tech}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Actions */}
          <div className="mt-7 flex flex-wrap gap-3 border-t border-line pt-5">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                aria-label={`View ${title} source on GitHub`}
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                View on GitHub
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                aria-label={`Open live demo of ${title}`}
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}