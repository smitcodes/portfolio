import { Github, Linkedin, Mail } from "lucide-react";
import { portfolio } from "../data/portfolio.js";

export function Footer() {
  const year = new Date().getFullYear();
  const { personal } = portfolio;

  return (
    <footer className="border-t border-line bg-base-950">
      <div className="page-container flex flex-col items-center gap-6 py-12 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="text-sm font-semibold text-content">
            © {year} {personal.name}
          </p>
          <p className="mt-1 text-xs text-faint">{personal.role}</p>
        </div>

        <div className="flex items-center gap-3" aria-label="Social links">
          <a
            href={personal.github}
            className="icon-btn"
            aria-label="GitHub profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={personal.linkedin}
            className="icon-btn"
            aria-label="LinkedIn profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="icon-btn"
            aria-label={`Email ${personal.name}`}
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>

        <p className="text-xs text-faint">
          Built with React, Tailwind CSS &amp; Framer Motion.
        </p>
      </div>
    </footer>
  );
}