import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Magnetic } from "./Magnetic.jsx";

/** Show the button once the user has scrolled this far down (px). */
const SHOW_AFTER = 600;

/**
 * Floating "back to top" button. Appears after scrolling down, scrolls back
 * to the top smoothly (instantly when the user prefers reduced motion), and
 * throttles its scroll listener with requestAnimationFrame.
 */
export function BackToTop() {
  const [visible, setVisible] = React.useState(false);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    let frame = 0;
    let ticking = false;
    const update = () => {
      setVisible(window.scrollY > SHOW_AFTER);
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
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        // `fixed` lives on the Magnetic wrapper: a transformed ancestor becomes
        // the containing block for fixed children, so the button can't hold it.
        <Magnetic className="fixed bottom-6 right-6 z-40">
          <motion.button
            type="button"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="icon-btn shadow-lg"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </motion.button>
        </Magnetic>
      )}
    </AnimatePresence>
  );
}