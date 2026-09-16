import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Shared scroll-reveal wrapper.
 * Fades content up as it enters the viewport and honours
 * prefers-reduced-motion via framer-motion's hook.
 *
 * `once: false` — the reveal REPLAYS every time the element comes back
 * into view: scroll down -> animates in, scroll past it -> resets,
 * scroll back -> animates in again (not just on first page load).
 *
 * Memoized so parent state changes (e.g. typing in the contact form)
 * don't re-render every revealed section.
 */
export const Reveal = React.memo(function Reveal({ className = "", delay = 0, amount = 0.18, children }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
});