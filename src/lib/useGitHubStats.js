import React from "react";

const CACHE_KEY = "ss-github-stats";
const TTL = 6 * 60 * 60 * 1000; // 6 hours — well inside the unauthenticated rate limit
const DEFAULT_USER = "smitcodes";

/** Read a still-fresh cached payload, or null. */
function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.at !== "number") return null;
    if (Date.now() - parsed.at > TTL) return null;
    return parsed.data ?? null;
  } catch {
    return null;
  }
}

/**
 * Pulls live public-repo stats for a GitHub user and caches them in
 * localStorage. Returns `null` until data is available — callers should keep
 * showing their static fallback in the meantime, so the UI never regresses
 * when offline or rate-limited.
 */
export function useGitHubStats(username = DEFAULT_USER) {
  const [stats, setStats] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;

    const cached = readCache();
    if (cached) {
      setStats(cached);
      return () => {
        cancelled = true;
      };
    }

    const load = async () => {
      try {
        const [userRes, repoRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          ),
        ]);
        if (!userRes.ok || !repoRes.ok) return;

        const user = await userRes.json();
        const repos = await repoRes.json();
        if (!Array.isArray(repos)) return;

        const languages = {};
        let stars = 0;
        for (const repo of repos) {
          if (repo.fork) continue;
          stars += repo.stargazers_count || 0;
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        }

        const data = {
          publicRepos: user.public_repos ?? repos.length,
          stars,
          topLanguages: Object.entries(languages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([name]) => name),
        };

        if (!cancelled) setStats(data);
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ at: Date.now(), data }),
          );
        } catch {
          /* storage unavailable — live value still applied this session */
        }
      } catch {
        /* offline or rate-limited: silently keep the static fallback */
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return stats;
}
