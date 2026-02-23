const CACHE = "forehand-cache-v1";
const OFFLINE_URL = "/offline.html";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        // CHANGED: /icons/icon-192.png -> /pwa-icons/icon-192.png
        cache.addAll(["/", "/offline.html", "/manifest.json", "/pwa-icons/icon-192.png"])
      )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }
  
  // NETWORK-FIRST STRATEGY
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Optional: Update the cache with the new response
        return response;
      })
      .catch(() => {
        // If the network fails (offline), fall back to the cache
        return caches.match(event.request);
      })
  );
});