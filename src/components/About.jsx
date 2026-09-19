import { Building2, FolderKanban, MapPin, Mail, Sparkles } from "lucide-react";
import { portfolio } from "../data/portfolio.js";
import { Reveal } from "../lib/animations.jsx";
import { SectionHeading } from "./SectionHeading.jsx";
import { StatCounters } from "./StatCounters.jsx";

export function About() {
  const { about, education, experience, projects, personal } = portfolio;

  const facts = [
    education[0]
      ? { icon: Building2, label: "Education", value: education[0].degree }
      : null,
    experience[0]
      ? {
          icon: Sparkles,
          label: "Experience",
          value: `${experience[0].role} · ${experience[0].company}`,
        }
      : null,
    {
      icon: FolderKanban,
      label: "Projects",
      value: `${projects.length} ${projects.length === 1 ? "project" : "projects"} in portfolio`,
    },
    personal.location
      ? { icon: MapPin, label: "Location", value: personal.location }
      : null,
    personal.email
      ? { icon: Mail, label: "Email", value: personal.email }
      : null,
  ].filter(Boolean);

  // Derived strictly from the data file — nothing invented.
  const tiles = [
    education[0]
      ? {
          big: education[0].degree.split("—")[0].trim(),
          small:
            education[0].degree.split("—").slice(1).join("").trim() ||
            "Pursuing",
        }
      : null,
    experience[0]
      ? { big: experience[0].role, small: experience[0].company }
      : null,
    { big: String(projects.length), small: "Projects in portfolio" },
    {
      big: `${about.interests[0]} + ${about.interests[1]}`,
      small: "Focus areas",
    },
  ].filter(Boolean);

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="py-24 scroll-mt-28 lg:py-32"
    >
      <div className="page-container">
        <SectionHeading
          id="about-title"
          eyebrow="About Me"
          accent="code"
          title="Building with code, deciding with data"
          subtitle="A quick look at who I am, what I'm working on and where I'm headed."
        />

        <StatCounters />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-3 space-y-5 text-base leading-relaxed">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-faint">
              Introduction
            </h3>
            <p className="text-content">{about.shortIntro}</p>
            <p className="text-muted">{about.currentFocus}</p>
            <p className="text-muted">{about.philosophy}</p>
          </Reveal>

          <Reveal className="lg:col-span-2" delay={0.1}>
            <aside
              className="surface-card p-6"
              aria-label="Quick facts about Smit"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-faint">
                Quick Facts
              </h3>
              <ul className="mt-5 space-y-3">
                {facts.map((fact) => (
                  <li
                    key={fact.label}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-base-800 text-accent-400">
                      <fact.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-faint">
                        {fact.label}
                      </span>
                      <span className="block truncate text-muted">
                        {fact.value}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>

        {/* Interest chips + derived stats */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="surface-card h-full p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-faint">
                Technical Interests
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {about.interests.map((interest) => (
                  <li key={interest} className="chip">
                    {interest}
                  </li>
                ))}
              </ul>
              <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-faint">
                Education
              </h3>
              <p className="mt-3 text-base font-semibold text-content">
                {education[0]?.degree}
              </p>
              <p className="text-sm text-muted">
                {education[0]?.institution}
                {education[0]?.period ? ` · ${education[0].period}` : ""}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {about.education}
              </p>
            </div>
          </Reveal>

          <Reveal className="h-full" delay={0.1}>
            <div className="surface-card h-full p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-faint">
                At a Glance
              </h3>
              <dl className="mt-5 grid auto-rows-fr grid-cols-1 gap-5 min-[420px]:grid-cols-2">
                {tiles.map((tile) => (
                  <div
                    key={tile.small}
                    className="flex flex-col justify-center rounded-xl border border-line bg-base-800 p-4"
                  >
                    <dt className="text-xl font-bold tracking-tight text-content">
                      {tile.big}
                    </dt>
                    <dd className="mt-1 text-xs leading-snug text-muted">
                      {tile.small}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
