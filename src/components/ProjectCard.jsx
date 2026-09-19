import React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  BarChart3,
  BrainCircuit,
  Code2,
  ExternalLink,
  Github,
} from "lucide-react";
import { portfolio } from "../data/portfolio.js";

const PLACEHOLDER_BY_CATEGORY = {
  Development: { className: "ph-dev", icon: Code2 },
  "Data Analytics": { className: "ph-data", icon: BarChart3 },
  AI: { className: "ph-ai", icon: BrainCircuit },
};

export const ProjectCard = React.memo(function ProjectCard({
  project,
  index,
  onView,
}) {
  const reduce = useReducedMotion();
  const { title, description, category, technologies, github, demo, image } =
    project;

  const githubUrl = github || portfolio.personal.github;
  const placeholder = PLACEHOLDER_BY_CATEGORY[category] ?? {
    className: "ph-dev",
    icon: Code2,
  };
  const PlaceholderIcon = placeholder.icon;

  // Skeleton behind lazy images: pulse until the photo decodes, then fade it
  // in. Placeholder-by-category path is instant, so it skips this entirely.
  const [imgLoaded, setImgLoaded] = React.useState(false);
  React.useEffect(() => {
    setImgLoaded(false);
  }, [image]);

  // 3D tilt + cursor spotlight (desktop pointers only; off for reduced motion)
  const cardRef = React.useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const tiltX = useSpring(rawX, { stiffness: 220, damping: 22 });
  const tiltY = useSpring(rawY, { stiffness: 220, damping: 22 });
  const canTilt =
    !reduce &&
    typeof window !== "undefined" &&
    !window.matchMedia("(hover: none), (pointer: coarse)").matches;

  const handleMouseMove = (e) => {
    if (!canTilt) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    rawX.set((0.5 - py / rect.height) * 7);
    rawY.set((px / rect.width - 0.5) * 7);
    card.style.setProperty("--px", `${px}px`);
    card.style.setProperty("--py", `${py}px`);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onView(project)}
      style={
        canTilt
          ? { rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }
          : undefined
      }
      initial={{ opacity: 0, y: reduce ? 0 : 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.18 } }}
      transition={{
        duration: 0.45,
        delay: (index % 2) * 0.05,
        ease: "easeOut",
      }}
      className="surface-card group flex cursor-pointer flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:border-accent-500 hover:shadow-lg"
    >
      {/* Media */}
      <div className="relative aspect-video overflow-hidden">
        {image ? (
          <>
            <div
              aria-hidden="true"
              className={`absolute inset-0 animate-pulse bg-base-800 motion-reduce:animate-none ${
                imgLoaded ? "hidden" : "block"
              }`}
            />
            <img
              src={image}
              alt={`${title} — project screenshot`}
              loading="lazy"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.03] ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </>
        ) : (
          <div
            className={`grid h-full w-full place-items-center ${placeholder.className}`}
            aria-hidden="true"
          >
            <div className="flex flex-col items-center gap-3 text-white">
              <PlaceholderIcon className="h-12 w-12" />
              <span className="font-mono text-xs opacity-80">{category}</span>
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <span className="chip text-xs">{category}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-content">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
        <ul
          className="mt-4 flex flex-wrap gap-2"
          aria-label="Technologies used"
        >
          {technologies.map((tech) => (
            <li key={tech} className="chip text-xs">
              {tech}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions - open the detail modal, plus a demo link when one exists */}
      <div className="mt-auto flex items-center gap-2 border-t border-line px-5 py-3.5">
        <button
          type="button"
          onClick={() => onView(project)}
          data-project-trigger={title}
          className="btn btn-primary flex-1 justify-center"
          aria-label={`View full details of ${title}`}
        >
          View Details
        </button>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="btn btn-secondary"
          aria-label={`View ${title} on GitHub`}
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
        </a>
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="btn btn-secondary"
            aria-label={`Open live demo of ${title}`}
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Live Demo
          </a>
        )}
      </div>

      <div className="tilt-spot" aria-hidden="true" />
    </motion.article>
  );
});
