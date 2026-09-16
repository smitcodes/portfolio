import { Reveal } from "../lib/animations.jsx";
import { SectionHeading } from "./SectionHeading.jsx";
import { Award, ExternalLink, FileText } from "lucide-react";
import { portfolio } from "../data/portfolio.js";

// Respects Vite's `base` so certificate links work at the root or on a sub-path.
const BASE = import.meta.env.BASE_URL;

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
          {portfolio.certifications.map((cert, index) => {
            const certificateHref = cert.certificate
              ? `${BASE}${cert.certificate}`
              : null;

            return (
              <Reveal
                key={`${cert.title}-${cert.issuer}`}
                delay={(index % 3) * 0.07}
                className="surface-card flex h-full flex-col p-6 transition-transform duration-200 hover:-translate-y-0.5 hover:border-accent-500"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-base-800 text-accent-400">
                    <Award className="h-5 w-5" aria-hidden="true" />
                  </span>
                  {cert.type && (
                    <span className="chip text-[11px]">{cert.type}</span>
                  )}
                </div>

                <h3 className="mt-4 text-base font-semibold text-content">
                  {cert.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{cert.issuer}</p>

                {cert.date && (
                  <p className="mt-3 text-xs text-faint">{cert.date}</p>
                )}
                {cert.credentialId && (
                  <p className="mt-1 font-mono text-[11px] text-faint">
                    ID: {cert.credentialId}
                  </p>
                )}

                {(certificateHref || cert.credentialUrl) && (
                  <div className="mt-auto flex flex-wrap items-center gap-4 pt-5">
                    {certificateHref && (
                      <a
                        href={certificateHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-400 transition-colors hover:text-accent-500"
                        aria-label={`View the certificate for ${cert.title}`}
                      >
                        <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                        View certificate
                      </a>
                    )}
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-400 transition-colors hover:text-accent-500"
                        aria-label={`Verify the credential for ${cert.title}`}
                      >
                        Verify
                        <ExternalLink
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                      </a>
                    )}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
