const CACHE_NAME = 'notes-app-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  'src/app/index.ts',
  '/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});