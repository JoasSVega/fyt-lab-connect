/*
  Minimal Service Worker to improve caching of static resources without affecting app behavior.
  - Runtime caching with stale-while-revalidate for images, CSS and JS.
  - No precache list to avoid deployment coupling; safe and reversible.
*/
const CACHE_VERSION = 'static-v2';
const RUNTIME_CACHE = `${CACHE_VERSION}`;

self.addEventListener('install', (event) => {
  // Precache usando manifest.json de Vite (si está disponible)
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(RUNTIME_CACHE);
      const urls = new Set([
        './',
        './index.html',
        './images/Hero-Index.jpg',
        './logo-fyt.png',
        './logo-fyt.webp',
      ]);
      // Intentar cargar manifest.json para detectar assets con hash
      try {
        const res = await fetch('./manifest.json', { cache: 'no-store' });
        if (res.ok) {
          const manifest = await res.json();
          for (const key of Object.keys(manifest)) {
            const item = manifest[key];
            if (item && item.file) urls.add(`./${item.file}`);
            if (item && Array.isArray(item.css)) item.css.forEach((p) => urls.add(`./${p}`));
            if (item && Array.isArray(item.assets)) item.assets.forEach((p) => urls.add(`./${p}`));
          }
        }
      } catch {}
      await cache.addAll(Array.from(urls));
    } catch {}
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== RUNTIME_CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Same-origin only to avoid caching 3rd-party responses incorrectly
  const sameOrigin = url.origin === self.location.origin;
  const isImage = ['image'].includes(req.destination) || /\.(png|jpe?g|webp|avif|svg)$/i.test(url.pathname);
  const isStyle = req.destination === 'style' || /\.css$/i.test(url.pathname);
  const isScript = req.destination === 'script' || /\.js$/i.test(url.pathname);

  if (sameOrigin && (isImage || isStyle || isScript)) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then(async (cache) => {
        const cached = await cache.match(req);
        const networkFetch = fetch(req).then((res) => {
          // Only cache successful, basic responses
          if (res && res.status === 200 && res.type === 'basic') {
            cache.put(req, res.clone());
          }
          return res;
        }).catch(() => cached);
        // Estrategia: cache-first para precache; SWR para el resto
        if (cached) return cached;
        return networkFetch;
      })
    );
  }
});
