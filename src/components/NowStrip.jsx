import React from "react";
import { Sparkles } from "lucide-react";
import { portfolio } from "../data/portfolio.js";

/**
 * Compact "Now" strip under the hero — what he's open to, building and
 * learning right now. Content comes from portfolio.js -> now.
 */
export function NowStrip() {
  const { now } = portfolio;
  if (!now) return null;

  const items = [
    now.status,
    now.building ? `Building ${now.building}` : null,
    now.learning ? `Learning ${now.learning}` : null,
  ].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <div className="page-container pb-12">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-xl border border-line bg-base-900 px-5 py-3 text-center text-xs text-muted sm:text-sm">
        <span className="inline-flex items-center gap-1.5 font-semibold text-accent-400">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Now
        </span>
        {items.map((item, index) => (
          <React.Fragment key={item}>
            {index > 0 && (
              <span className="text-faint" aria-hidden="true">
                &middot;
              </span>
            )}
            <span>{item}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
