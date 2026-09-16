import React from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  Send,
} from "lucide-react";
import { portfolio } from "../data/portfolio.js";
import { Reveal } from "../lib/animations.jsx";
import { fireConfetti } from "../lib/confetti.js";
import { SectionHeading } from "./SectionHeading.jsx";

export function Contact() {
  const { contact, personal } = portfolio;
  const [sent, setSent] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
    } catch {
      // Clipboard API unavailable (older browser or non-secure context)
      const temp = document.createElement("textarea");
      temp.value = personal.email;
      temp.setAttribute("readonly", "");
      temp.style.position = "fixed";
      temp.style.opacity = "0";
      document.body.appendChild(temp);
      temp.select();
      try {
        document.execCommand("copy");
      } catch {
        /* clipboard unavailable — ignore */
      }
      document.body.removeChild(temp);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) return;

    const subject = `Portfolio contact from ${name}`;
    const body = `Hi Smit,\n\n${message}\n\n— ${name} (${email})`;
    const mailto = `mailto:${personal.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
    fireConfetti();
    window.location.href = mailto;
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-base-950 py-24 scroll-mt-28 lg:py-32"
    >
      <div className="page-container">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          accent="connect"
          title="Let's Connect"
          subtitle={contact.message}
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-2">
          {/* Direct links */}
          <Reveal className="space-y-5">
            <p className="text-base leading-relaxed text-muted">
              The fastest way to reach me is by email — I usually respond within
              a couple of days.
            </p>

            <div className="surface-card flex items-center justify-between gap-3 p-5 transition-colors hover:border-accent-500">
              <a
                href={`mailto:${personal.email}`}
                className="flex min-w-0 flex-1 items-center gap-3"
                aria-label={`Compose an email to ${personal.name}`}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-base-800 text-accent-400">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-content">
                      Email
                    </span>
                    <span className="block truncate text-sm text-muted">
                      {personal.email}
                    </span>
                  </span>
                </span>
              </a>
              <span className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="icon-btn h-9 w-9"
                  aria-label={
                    copied ? "Email address copied" : "Copy email address"
                  }
                  title={copied ? "Copied!" : "Copy email address"}
                >
                  {copied ? (
                    <Check
                      className="h-4 w-4 text-accent-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
                <ArrowUpRight
                  className="h-5 w-5 text-accent-400"
                  aria-hidden="true"
                />
              </span>
              <span role="status" className="sr-only">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
            </div>

            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card group flex items-center justify-between gap-3 p-5 transition-colors hover:border-accent-500"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-base-800 text-accent-400">
                  <Github className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-content">
                    GitHub
                  </span>
                  <span className="block truncate text-sm text-muted">
                    Code & projects
                  </span>
                </span>
              </span>
              <ArrowUpRight
                className="h-5 w-5 text-accent-400"
                aria-hidden="true"
              />
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card group flex items-center justify-between gap-3 p-5 transition-colors hover:border-accent-500"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-base-800 text-accent-400">
                  <Linkedin className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-content">
                    LinkedIn
                  </span>
                  <span className="block truncate text-sm text-muted">
                    Professional profile
                  </span>
                </span>
              </span>
              <ArrowUpRight
                className="h-5 w-5 text-accent-400"
                aria-hidden="true"
              />
            </a>
          </Reveal>

          {/* mailto-based form — no backend, composes an email instead */}
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="surface-card flex flex-col gap-4 p-6"
              aria-label="Contact form (opens your email app)"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-sm font-medium text-muted"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className="field"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-sm font-medium text-muted"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="field"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-sm font-medium text-muted"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  required
                  placeholder="What would you like to talk about?"
                  className="field resize-none"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                <Send className="h-4 w-4" aria-hidden="true" />
                Send Message
              </button>

              {sent ? (
                <p className="text-sm text-accent-400" role="status">
                  Opening your email app…
                </p>
              ) : (
                <p className="text-xs leading-snug text-faint">
                  This form opens a pre-filled email in your mail app — nothing
                  is sent through this site.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
