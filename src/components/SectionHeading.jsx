import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Signature section heading:
 *  - eyebrow chip with a rotating gradient light beam around its border
 *  - title springs in LETTER BY LETTER (wave); the `accent` word letters
 *    carry the flowing brand gradient + glow; letters bounce on hover
 *  - a glowing gradient beam draws in under the title
 *
 * Accessibility: real title text stays in the DOM via aria-label on the h2;
 * letter spans are aria-hidden. Reduced motion: no stagger/slide/glow anim.
 */
export const SectionHeading = React.memo(function SectionHeading({
  id,
  eyebrow,
  title,
  accent,
  subtitle,
}) {
  const reduce = useReducedMotion();

  const words = title.split(" ");
  const accentLower = (accent || "").toLowerCase();

  return (
    <motion.div
      className="relative z-10 text-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.35 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
      }}
    >
      <motion.p
        className="eyebrow-chip mx-auto"
        variants={{
          hidden: { opacity: 0, y: reduce ? 0 : 10 },
          show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        }}
      >
        <span>{eyebrow}</span>
      </motion.p>

      <motion.h2
        id={id}
        aria-label={title}
        className="mt-7 text-4xl font-bold tracking-tight text-content sm:text-5xl"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: reduce ? 0 : 0.14 } },
        }}
      >
        {words.map((word, wi) => {
          const bare = word.toLowerCase().replace(/[^a-z]/g, "");
          const isAccent = accentLower !== "" && bare === accentLower;
          return (
            <motion.span
              key={`${word}-${wi}`}
              aria-hidden="true"
              className="title-word"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: reduce ? 0 : 0.03 } },
              }}
            >
              {Array.from(word).map((ch, ci) => (
                <motion.span
                  key={`${ch}-${ci}`}
                  className={`title-letter${isAccent ? " text-gradient" : ""}`}
                  style={
                    isAccent && !reduce
                      ? { animationDelay: `${ci * 0.09}s` }
                      : undefined
                  }
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: reduce ? 0 : 26,
                      rotate: reduce ? 0 : 5,
                    },
                    show: {
                      opacity: 1,
                      y: 0,
                      rotate: 0,
                      transition: {
                        type: "spring",
                        stiffness: 320,
                        damping: 24,
                      },
                    },
                  }}
                  whileHover={
                    reduce
                      ? undefined
                      : { y: -6, transition: { type: "spring", stiffness: 500, damping: 14 } }
                  }
                >
                  {ch}
                </motion.span>
              ))}
              {wi < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          );
        })}
      </motion.h2>

      <motion.span
        aria-hidden="true"
        className="title-beam"
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          show: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.55, delay: reduce ? 0 : 0.3, ease: "easeOut" },
          },
        }}
      />

      {subtitle && (
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted"
          variants={{
            hidden: { opacity: 0, y: reduce ? 0 : 12 },
            show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
});