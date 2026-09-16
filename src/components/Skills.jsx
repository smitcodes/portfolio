import React from "react";
import { BarChart3, Braces, Database, Globe, Wrench } from "lucide-react";
import { portfolio } from "../data/portfolio.js";
import { Reveal } from "../lib/animations.jsx";
import { SectionHeading } from "./SectionHeading.jsx";

// UI chrome only — skill values themselves come from the data file.
const CATEGORY_META = [
  { key: "programming", label: "Programming", icon: Braces },
  { key: "webDevelopment", label: "Web Development", icon: Globe },
  { key: "databases", label: "Databases", icon: Database },
  { key: "dataAnalytics", label: "Data & Analytics", icon: BarChart3 },
  { key: "tools", label: "Tools", icon: Wrench },
];

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="bg-base-950 py-24 scroll-mt-28 lg:py-32"
    >
      <div className="page-container">
        <SectionHeading
          id="skills-title"
          eyebrow="Skills"
          accent="work"
          title="What I work with"
          subtitle="Languages, frameworks and tools I use to build software and turn data into insight."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_META.map(({ key, label, icon: Icon }, index) => (
            <Reveal
              key={key}
              delay={(index % 3) * 0.07}
              className="surface-card flex flex-col p-6 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-base-800 text-accent-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-base font-semibold text-content">{label}</h3>
                <span className="ml-auto text-xs tabular-nums text-faint">
                  {portfolio.skills[key].length}
                </span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {portfolio.skills[key].map((skill) => (
                  <li key={skill} className="chip">
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}