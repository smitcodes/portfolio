/**
 * ============================================================
 *  SKELETON FALLBACKS — lightweight loading placeholders
 * ============================================================
 *  Shape-matched Suspense fallbacks for each lazy below-fold
 *  section, plus a fade-in helper for project images.
 *
 *  Rules followed here:
 *   • Tailwind `animate-pulse` only (already in the bundle — no
 *     new CSS, no new dependency).
 *   • `motion-reduce:animate-none` so reduced-motion users see
 *     static blocks.
 *   • Everything is `aria-hidden` — placeholders are never
 *     announced to screen readers.
 *   • Layouts mirror the real sections (same grids / spacing)
 *     so swapping skeleton → content causes no layout shift.
 * ============================================================
 */

/** Single pulsing block. Callers supply size via className. */
function Skel({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-xl border border-line bg-base-800 motion-reduce:animate-none ${className}`}
    />
  );
}

/** Eyebrow + title + subtitle lines shared by every section. */
function HeadingSkel() {
  return (
    <div aria-hidden="true">
      <Skel className="h-4 w-28 rounded-full!" />
      <Skel className="mt-3 h-8 w-72 max-w-full" />
      <Skel className="mt-3 h-4 w-96 max-w-full" />
    </div>
  );
}

export function TechMarqueeFallback() {
  return (
    <div className="marquee-band" aria-hidden="true">
      <div className="page-container">
        <Skel className="h-10 rounded-full!" />
      </div>
    </div>
  );
}

export function AboutFallback() {
  return (
    <div className="py-24 lg:py-32" aria-hidden="true">
      <div className="page-container">
        <HeadingSkel />
        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <Skel key={i} className="h-24" />
          ))}
        </div>
        <div className="mt-14 grid grid-cols-1 items-start gap-10 lg:grid-cols-5">
          <Skel className="h-48 lg:col-span-3" />
          <Skel className="h-48 lg:col-span-2" />
        </div>
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Skel className="h-56" />
          <Skel className="h-56" />
        </div>
      </div>
    </div>
  );
}

export function SkillsFallback() {
  return (
    <div className="py-24 lg:py-32" aria-hidden="true">
      <div className="page-container">
        <HeadingSkel />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="surface-card p-6">
              <div className="flex items-center gap-3">
                <Skel className="h-10 w-10 rounded-xl!" />
                <Skel className="h-4 w-24" />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Skel className="h-6 w-16 rounded-full!" />
                <Skel className="h-6 w-20 rounded-full!" />
                <Skel className="h-6 w-14 rounded-full!" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ExperienceFallback() {
  return (
    <div className="py-24 lg:py-32" aria-hidden="true">
      <div className="page-container">
        <HeadingSkel />
        <div className="relative mt-14 lg:mt-16">
          <div className="absolute left-4 top-0 h-full w-px bg-line" />
          {[0, 1].map((i) => (
            <div key={i} className="relative pl-12">
              <span className="absolute left-[0.935rem] top-7 block h-3 w-3 rounded-full border-2 border-line bg-accent-400" />
              <Skel className="mb-8 h-56" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectsFallback() {
  return (
    <div className="bg-base-950 py-24 lg:py-32" aria-hidden="true">
      <div className="page-container">
        <HeadingSkel />
        <div className="mt-12 flex flex-wrap gap-2">
          {[0, 1, 2].map((i) => (
            <Skel key={i} className="h-9 w-24 rounded-lg!" />
          ))}
        </div>
        <div className="mt-10 grid gap-7 md:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="surface-card overflow-hidden">
              <Skel className="aspect-video rounded-none! border-0!" />
              <div className="p-5">
                <Skel className="h-4 w-20 rounded-full!" />
                <Skel className="mt-3 h-6 w-3/4" />
                <Skel className="mt-2 h-4 w-full" />
                <Skel className="mt-2 h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CertificationsFallback() {
  return (
    <div className="py-24 lg:py-32" aria-hidden="true">
      <div className="page-container">
        <HeadingSkel />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Skel key={i} className="h-56" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ContactFallback() {
  return (
    <div className="bg-base-950 py-24 lg:py-32" aria-hidden="true">
      <div className="page-container">
        <HeadingSkel />
        <div className="mt-14 grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          <Skel className="h-72" />
          <Skel className="h-96" />
        </div>
      </div>
    </div>
  );
}
