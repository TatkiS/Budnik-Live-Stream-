const CACHE_NAME = 'wave-victory-v2'; // оновив версію кешу

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/sw.js',

  // CSS / JS (якщо окремі)
  '/styles.css',        
  '/player.js',         

  // Іконки
  '/icons/favicon.ico',
  '/icons/favicon-16x16.png',
  '/icons/favicon-32x32.png',
  '/icons/apple-touch-icon.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',

  // Майбутні ресурси (додасте пізніше)
  // '/fonts/xyz.woff2',
  // '/img/logo.png',
];

// Встановлення Service Worker і кешування файлів
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Обробка запитів через кеш
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Оновлення кешу при зміні версії
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
