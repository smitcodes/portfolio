import React from "react";
import { AnimatePresence } from "framer-motion";
import { portfolio } from "../data/portfolio.js";
import { SectionHeading } from "./SectionHeading.jsx";
import { ProjectCard } from "./ProjectCard.jsx";
import { ProjectModal } from "./ProjectModal.jsx";

export function Projects() {
  // Filter options are derived from the data — an "AI" tab only appears
  // once a project with category "AI" is added to portfolio.js.
  const categories = ["All", ...new Set(portfolio.projects.map((p) => p.category))];

  const [filter, setFilter] = React.useState("All");
  const [selected, setSelected] = React.useState(null);

  const visible =
    filter === "All"
      ? portfolio.projects
      : portfolio.projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="bg-base-950 py-24 scroll-mt-28 lg:py-32"
    >
      <div className="page-container">
        <SectionHeading
          id="projects-title"
          eyebrow="Projects"
          accent="built"
          title="Things I've built"
          subtitle="A selection of development and data analytics work — filter by category to explore."
        />

        <div
          className="mt-12 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                filter === category
                  ? "bg-accent-500 text-white shadow-md"
                  : "border border-line bg-base-800 text-muted hover:border-accent-500 hover:text-content"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-7 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onView={setSelected}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}