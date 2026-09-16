import React from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Building2, Calendar, Check } from "lucide-react";
import { portfolio } from "../data/portfolio.js";
import { Reveal } from "../lib/animations.jsx";
import { SectionHeading } from "./SectionHeading.jsx";

export function Experience() {
  const reduce = useReducedMotion();
  const railRef = React.useRef(null);

  // The gradient line draws downward as the section passes through the viewport
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 80%", "end 60%"],
  });
  const railScale = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="py-24 scroll-mt-28 lg:py-32"
    >
      <div className="page-container">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience"
          accent="applied"
          title="Where I've applied my skills"
          subtitle="Professional and internship experience, focused on real data and real problems."
        />

        <div ref={railRef} className="relative mt-14 lg:mt-16">
          {/* Static track */}
          <div
            className="absolute left-4 top-0 h-full w-[1px] bg-line"
            aria-hidden="true"
          />
          {/* Gradient fill that draws downward with scroll */}
          <motion.div
            aria-hidden="true"
            className="timeline-fill absolute left-4 top-0 h-full w-[1px]"
            style={reduce ? { scaleY: 1 } : { scaleY: railScale }}
          />

          {portfolio.experience.map((item, index) => (
            <Reveal
              key={`${item.role}-${item.company}`}
              delay={(index % 2) * 0.08}
              className="relative pl-12"
            >
              {/* Dot + glowing halo (lights up as its card enters view) */}
              <span
                className="absolute left-[0.935rem] top-7 h-3 w-3"
                aria-hidden="true"
              >
                {reduce ? (
                  <span className="timeline-dot-halo" style={{ opacity: 0.45 }} />
                ) : (
                  <motion.span
                    className="timeline-dot-halo"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 0.5, scale: 1 }}
                    viewport={{ once: false, amount: 0.9 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                )}
                <span className="block h-3 w-3 rounded-full border-2 border-line bg-accent-400" />
              </span>

              <div className="surface-card mb-8 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-content">{item.role}</h3>
                  <span className="chip">
                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                    {item.period}
                  </span>
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-muted">
                  <Building2 className="h-4 w-4" aria-hidden="true" />
                  {item.company}
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {item.description}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {item.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-sm leading-snug text-muted"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent-400"
                        aria-hidden="true"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}