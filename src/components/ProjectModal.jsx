import { motion, useReducedMotion } from "framer-motion";
import { Check, ExternalLink, Github, X } from "lucide-react";
import { useDialogA11y } from "../lib/useDialogA11y.js";

/**
 * Full project overview dialog, formatted in labelled sections:
 * category chip, title, Overview, Key Features, Tech Stack, then the
 * action links. No image header — text-focused. Closes on Escape,
 * backdrop click or the close button; locks scroll; manages focus.
 */
export function ProjectModal({ project, onClose }) {
  const reduce = useReducedMotion();
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

  // Shared dialog behaviour: Escape to close, scroll lock, focus trap,
  // and focus restoration (falls back to this card's trigger button).
  const { panelRef, initialFocusRef } = useDialogA11y(onClose, () =>
    document.querySelector(`[data-project-trigger=${JSON.stringify(title)}]`),
  );

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
          ref={initialFocusRef}
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
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-muted"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent-400"
                      aria-hidden="true"
                    />
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
