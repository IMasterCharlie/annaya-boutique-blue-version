const CACHE_NAME = 'annaya-pwa-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // A simple pass-through fetch handler is required to satisfy PWA installability criteria
  // If the request is for an HTML page or basic assets, it allows the browser to show the install prompt
  event.respondWith(fetch(event.request));
});
