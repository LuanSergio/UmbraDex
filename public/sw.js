/* eslint-disable no-restricted-globals */
// UmbraDex service worker
// Bump CACHE_VERSION to invalidate every runtime cache on the next deploy.
const CACHE_VERSION = 'v1';

const PRECACHE = `umbradex-precache-${CACHE_VERSION}`;
const PAGES_CACHE = `umbradex-pages-${CACHE_VERSION}`;
const STATIC_CACHE = `umbradex-static-${CACHE_VERSION}`;
const IMAGES_CACHE = `umbradex-images-${CACHE_VERSION}`;

const OFFLINE_URL = '/offline';

const PRECACHE_URLS = [
  OFFLINE_URL,
  '/manifest.json',
  '/favicons/android-chrome-192x192.png',
  '/favicons/android-chrome-512x512.png',
  '/favicons/favicon-32x32.png',
];

const MAX_ENTRIES = {
  [PAGES_CACHE]: 60,
  [IMAGES_CACHE]: 300,
};

const CURRENT_CACHES = [PRECACHE, PAGES_CACHE, STATIC_CACHE, IMAGES_CACHE];

async function trimCache(cacheName) {
  const max = MAX_ENTRIES[cacheName];
  if (!max) return;

  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  const overflow = keys.length - max;

  for (let i = 0; i < overflow; i++) {
    // eslint-disable-next-line no-await-in-loop
    await cache.delete(keys[i]);
  }
}

async function putInCache(cacheName, request, response) {
  // Opaque responses (cross-origin no-cors) have status 0 but are still usable.
  if (!response || (!response.ok && response.type !== 'opaque')) return;

  const cache = await caches.open(cacheName);
  await cache.put(request, response);
  trimCache(cacheName);
}

async function networkFirst(event, cacheName, fallbackUrl) {
  const { request } = event;

  try {
    const response = await fetch(request);
    event.waitUntil(putInCache(cacheName, request, response.clone()));
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;

    if (fallbackUrl) {
      const fallback = await caches.match(fallbackUrl);
      if (fallback) return fallback;
    }

    throw error;
  }
}

async function cacheFirst(event, cacheName) {
  const { request } = event;
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  event.waitUntil(putInCache(cacheName, request, response.clone()));
  return response;
}

async function staleWhileRevalidate(event, cacheName) {
  const { request } = event;
  const cached = await caches.match(request);

  const network = fetch(request)
    .then(response => {
      event.waitUntil(putInCache(cacheName, request, response.clone()));
      return response;
    })
    .catch(() => cached);

  if (cached) {
    event.waitUntil(network);
    return cached;
  }

  return network;
}

// Cache the build assets (CSS/JS) referenced by the offline page so it renders
// properly even if the user has never visited it.
async function precacheOfflinePageAssets() {
  const cache = await caches.open(PRECACHE);
  const response = await cache.match(OFFLINE_URL);
  if (!response) return;

  const html = await response.text();
  const assets = [...new Set(html.match(/\/_next\/static\/[^"'\s)]+/g) || [])];

  const staticCache = await caches.open(STATIC_CACHE);
  await Promise.all(
    assets.map(asset => staticCache.add(asset).catch(() => undefined)),
  );
}

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PRECACHE);
      await cache.addAll(PRECACHE_URLS);
      await precacheOfflinePageAssets();
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter(
            name =>
              name.startsWith('umbradex-') && !CURRENT_CACHES.includes(name),
          )
          .map(name => caches.delete(name)),
      );

      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;

  // HTML navigations: always try the network so content stays fresh.
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(event, PAGES_CACHE, OFFLINE_URL));
    return;
  }

  if (isSameOrigin) {
    // Next.js page data used on client-side navigation.
    if (url.pathname.startsWith('/_next/data/')) {
      event.respondWith(networkFirst(event, PAGES_CACHE));
      return;
    }

    // Hashed build assets never change.
    if (url.pathname.startsWith('/_next/static/')) {
      event.respondWith(cacheFirst(event, STATIC_CACHE));
      return;
    }

    if (url.pathname.startsWith('/_next/image')) {
      event.respondWith(staleWhileRevalidate(event, IMAGES_CACHE));
      return;
    }

    if (
      url.pathname.startsWith('/artworks/') ||
      url.pathname.startsWith('/webdoor/') ||
      url.pathname.startsWith('/favicons/') ||
      url.pathname.startsWith('/icons/') ||
      /\.(png|jpe?g|webp|gif|svg|ico)$/.test(url.pathname)
    ) {
      event.respondWith(staleWhileRevalidate(event, IMAGES_CACHE));
      return;
    }

    if (/\.(woff2?|ttf|otf|mp3|ogg|wav)$/.test(url.pathname)) {
      event.respondWith(cacheFirst(event, STATIC_CACHE));
    }

    return;
  }

  // Pokémon sprites served from the PokeAPI GitHub repository.
  if (url.hostname === 'raw.githubusercontent.com') {
    event.respondWith(staleWhileRevalidate(event, IMAGES_CACHE));
  }
});
