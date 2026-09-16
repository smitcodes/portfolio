import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gradient progress bar fixed at the top of the page.
 * Fills left-to-right as the user scrolls. Purely decorative.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX }} />;
}