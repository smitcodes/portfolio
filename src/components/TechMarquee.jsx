import { portfolio } from "../data/portfolio.js";

/**
 * Infinite auto-scrolling strip of every technology in portfolio.js.
 * Pure CSS loop (track duplicated once for seamlessness), pauses on hover.
 * Screen readers get an sr-only list of the unique skills instead;
 * prefers-reduced-motion renders a static wrapped row.
 */
export function TechMarquee() {
  const skills = Object.values(portfolio.skills).flat();
  if (skills.length === 0) return null;

  const Group = ({ hidden = false }) => (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {skills.map((skill) => (
        <span key={skill} className="chip whitespace-nowrap font-mono text-xs">
          <span
            className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent-500"
            aria-hidden="true"
          />
          {skill}
        </span>
      ))}
    </div>
  );

  return (
    <section aria-label="Technologies I work with" className="marquee-band">
      <div className="marquee-mask">
        <div className="marquee-track">
          <Group />
          <Group hidden />
        </div>
      </div>
      <p className="sr-only">{skills.join(", ")}</p>
    </section>
  );
}