import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gradient progress bar fixed at the top of the page.
 * Fills left-to-right as the user scrolls. Purely decorative.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  // Stiff, well-damped spring settles in fewer frames than a loose one —
  // less per-scroll work on phones for the same visual fill.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.01,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress"
      style={{ scaleX }}
    />
  );
}
