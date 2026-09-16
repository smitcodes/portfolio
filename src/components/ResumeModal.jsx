import { motion, useReducedMotion } from "framer-motion";
import { Download, X } from "lucide-react";
import { portfolio } from "../data/portfolio.js";
import { useDialogA11y } from "../lib/useDialogA11y.js";

const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`;

/**
 * Inline résumé preview with a download fallback, so visitors can read it
 * without leaving the page. Escape / backdrop / close button all dismiss it.
 */
export function ResumeModal({ onClose }) {
  const reduce = useReducedMotion();
  const { panelRef, initialFocusRef } = useDialogA11y(onClose);

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
        aria-labelledby="resume-modal-title"
        className="modal-panel resume-panel"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96, y: reduce ? 0 : 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.18 } }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
          <h3
            id="resume-modal-title"
            className="text-sm font-semibold text-content"
          >
            Résumé — {portfolio.personal.name}
          </h3>
          <div className="flex items-center gap-2">
            <a href={RESUME_URL} download className="btn btn-secondary text-xs">
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Download
            </a>
            <button
              ref={initialFocusRef}
              type="button"
              onClick={onClose}
              className="icon-btn"
              aria-label="Close résumé preview"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <object
          data={RESUME_URL}
          type="application/pdf"
          className="resume-frame"
          aria-label={`Résumé of ${portfolio.personal.name}`}
        >
          <div className="p-10 text-center text-sm text-muted">
            <p>Your browser can&rsquo;t display PDFs inline.</p>
            <a
              href={RESUME_URL}
              download
              className="mt-4 inline-flex items-center gap-1.5 font-medium text-accent-400 hover:text-accent-500"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download the résumé instead
            </a>
          </div>
        </object>
      </motion.div>
    </motion.div>
  );
}
