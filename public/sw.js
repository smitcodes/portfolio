/**
 * Offline shell for the portfolio — hand-rolled, no build plugin required.
 *
 * Strategy
 *   • navigations  → network-first (so a new deploy is picked up immediately),
 *                    falling back to the cached shell when offline
 *   • same-origin  → cache-first (hashed build assets never change in place)
 *
 * All paths are relative, so the worker works correctly whether the site is
 * deployed at the domain root or under a sub-path such as /portfolio/.
 *
 * Bump CACHE_VERSION when you want to force clients to drop old caches.
 */
const CACHE_VERSION = "v1";
const CACHE_NAME = `smit-portfolio-${CACHE_VERSION}`;

/** Kept intentionally small — hashed assets cache themselves on first view. */
const PRECACHE_URLS = ["./", "./index.html", "./favicon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only ever handle same-origin GETs.
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Page navigations: network-first, cached shell as the offline fallback.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() =>
          caches.match("./index.html").then((cached) => cached || caches.match("./"))
        )
    );
    return;
  }

  // Everything else: cache-first, then network (and store for next time).
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response && response.status === 200 && response.type === "basic") {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
