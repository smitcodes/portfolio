import React from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { portfolio } from "../data/portfolio.js";
import { useGitHubStats } from "../lib/useGitHubStats.js";

/**
 * Animated count-up stat tiles for the About section.
 * Numbers count up (ease-out ~1.2s) every time they scroll into view;
 * reduced-motion users see the final values statically.
 * Values/labels come from portfolio.js -> stats.
 */
function Counter({ value, suffix, reduce }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { amount: 0.6, once: false });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return undefined;
    }
    if (!inView) {
      setDisplay(0);
      return undefined;
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span
      ref={ref}
      className="text-gradient text-3xl font-extrabold tracking-tight tabular-nums sm:text-4xl"
    >
      {display}
      {suffix}
    </span>
  );
}

export function StatCounters() {
  const reduce = useReducedMotion();
  const live = useGitHubStats();

  // Any stat marked `source: "repos"` prefers the live GitHub count, but the
  // static value from portfolio.js is used until (or unless) that arrives.
  const stats = React.useMemo(() => {
    const base = portfolio.stats ?? [];
    if (!live) return base;
    return base.map((stat) =>
      stat.source === "repos" ? { ...stat, value: live.publicRepos } : stat,
    );
  }, [live]);

  if (stats.length === 0) return null;

  return (
    <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="surface-card flex flex-col items-center justify-center rounded-xl p-5 text-center"
        >
          <Counter
            value={stat.value}
            suffix={stat.suffix ?? ""}
            reduce={reduce}
          />
          <p className="mt-1.5 text-xs font-medium text-faint">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
