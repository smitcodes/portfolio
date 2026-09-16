import React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Magnetic wrapper: gently pulls the wrapped element toward the cursor
 * while it hovers (springy), and springs back to rest on leave.
 * Disabled on touch devices and for reduced-motion users.
 */
export function Magnetic({ children, strength = 0.3, className = "" }) {
  const reduce = useReducedMotion();
  const ref = React.useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 18 });
  const y = useSpring(rawY, { stiffness: 260, damping: 18 });

  const enabled =
    !reduce &&
    typeof window !== "undefined" &&
    !window.matchMedia("(hover: none), (pointer: coarse)").matches;

  const handleMouseMove = (e) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    rawY.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}