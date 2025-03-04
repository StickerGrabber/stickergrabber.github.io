self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.webmanifest',
      ]);
    })
  );
});

self.addEventListener('activate', () => {
  console.log('Service Worker activated.');
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request);
    })
  );
});
