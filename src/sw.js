/**
 * Service Worker for antony.ch
 * Implements Network-First with Cache Fallback strategy
 * @version 2.0.0
 */

const CACHE_VERSION = '2.0.0';
const CACHE_NAME = `antony-ch-pwa-v${CACHE_VERSION}`;
const CACHE_PREFIX = 'antony-ch-pwa-';

// Critical assets for offline functionality
const OFFLINE_URLS = [
  '/',
  '/css/style.css',
  '/assets/js/sw-register.js'
];

// Cache duration in seconds
const CACHE_MAX_AGE = {
  pages: 3600,      // 1 hour
  assets: 86400,    // 24 hours
  images: 604800    // 7 days
};

/**
 * Install event - cache critical assets
 */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(OFFLINE_URLS);
      })
      .then(() => self.skipWaiting())
      .catch(error => {
        console.error('Service Worker install failed:', error);
      })
  );
});

/**
 * Activate event - clean up old caches
 */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => {
        return Promise.all(
          keys
            .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
            .map(key => {
              console.log('Deleting old cache:', key);
              return caches.delete(key);
            })
        );
      })
      .then(() => self.clients.claim())
      .catch(error => {
        console.error('Service Worker activation failed:', error);
      })
  );
});

/**
 * Fetch event - Network-First strategy with cache fallback
 */
self.addEventListener('fetch', event => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  // Skip caching for demo files (streaming media)
  if (url.pathname.startsWith('/demos/')) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then(networkResponse => {
        // Only cache successful responses
        if (
          networkResponse &&
          networkResponse.ok &&
          networkResponse.type === 'basic'
        ) {
          const responseToCache = networkResponse.clone();

          // Cache in background
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseToCache);
          });
        }

        return networkResponse;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // Fallback for HTML documents
          if (request.destination === 'document') {
            return caches.match('/');
          }

          // Return a basic offline response
          return new Response('Offline - content not available', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});

/**
 * Message event - manual cache clearing
 */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.delete(CACHE_NAME).then(() => {
        return self.clients.matchAll();
      }).then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'CACHE_CLEARED' });
        });
      })
    );
  }
});

