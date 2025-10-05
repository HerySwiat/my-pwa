// public/sw.js
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';

// 👇 Esto lo rellena Vite automáticamente en build
precacheAndRoute(self.__WB_MANIFEST || []);

// 📌 Estrategias personalizadas

// 1. Imágenes → cache-first
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: []
  })
);

// 2. CSS y JS → stale-while-revalidate
registerRoute(
  ({ request }) =>
    request.destination === 'script' ||
    request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

// 3. Peticiones a API → network-first
registerRoute(
  ({ url }) => url.origin.includes('api.tuservidor.com'),
  new NetworkFirst({
    cacheName: 'api-cache',
  })
);
