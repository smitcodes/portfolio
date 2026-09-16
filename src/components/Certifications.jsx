import { Reveal } from "../lib/animations.jsx";
import { SectionHeading } from "./SectionHeading.jsx";
import { Award, ExternalLink } from "lucide-react";
import { portfolio } from "../data/portfolio.js";

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-title"
      className="py-24 scroll-mt-28 lg:py-32"
    >
      <div className="page-container">
        <SectionHeading
          id="certifications-title"
          eyebrow="Certifications"
          accent="credentials"
          title="Credentials & courses"
          subtitle="Certifications that back up what I do."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.certifications.map((cert, index) => (
            <Reveal
              key={`${cert.title}-${cert.issuer}`}
              delay={(index % 3) * 0.07}
              className="surface-card flex flex-col p-6 transition-transform duration-200 hover:-translate-y-0.5 hover:border-accent-500"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-base-800 text-accent-400">
                <Award className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-content">
                {cert.title}
              </h3>
              <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
              <p className="mt-3 text-xs text-faint">{cert.date}</p>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-400 transition-colors hover:text-accent-500"
                  aria-label={`View credential for ${cert.title}`}
                >
                  View credential
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}