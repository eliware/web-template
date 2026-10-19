const cacheName = "web-template-shell-v1";
const appShell = ["/", "/client.js", "/styles.css", "/manifest.webmanifest", "/icons/template.svg"];

export function installOfflineShell(scope) {
  scope.addEventListener("install", (event) => {
    event.waitUntil(
      scope.caches
        .open(cacheName)
        .then((cache) => cache.addAll(appShell))
        .then(() => scope.skipWaiting()),
    );
  });

  scope.addEventListener("activate", (event) => {
    event.waitUntil(
      scope.caches
        .keys()
        .then((names) =>
          Promise.all(
            names.filter((name) => name !== cacheName).map((name) => scope.caches.delete(name)),
          ),
        ),
    );
    scope.clients.claim();
  });

  scope.addEventListener("fetch", (event) => {
    const requestUrl = new URL(event.request.url);
    if (event.request.method !== "GET" || requestUrl.origin !== scope.location.origin) return;
    if (
      requestUrl.pathname.startsWith("/api/") ||
      requestUrl.pathname === "/health" ||
      requestUrl.pathname === "/ready"
    )
      return;

    event.respondWith(
      scope.caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return scope.fetch(event.request).then((response) => {
          if (response.ok && requestUrl.pathname.startsWith("/screenshots/")) {
            const copy = response.clone();
            scope.caches.open(cacheName).then((cache) => cache.put(event.request, copy));
          }
          return response;
        });
      }),
    );
  });
}
