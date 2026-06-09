import { manifest, version } from "@parcel/service-worker";

self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(version);
        await cache.addAll(manifest);
        self.skipWaiting();
    })());
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(keys
            .filter((key) => key !== version)
            .map((key) => caches.delete(key))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') {
        return;
    }
    event.respondWith(cacheFirst(event.request, event));
});

async function cacheFirst(request, event) {
    const cache = await caches.open(version);
    const cacheResponse = await cache.match(request);
    if (cacheResponse) {
        return cacheResponse;
    }

    try {
        const networkResponse = await fetch(request);

        event.waitUntil(await cache.put(request, networkResponse.clone()));

        return networkResponse;
    } catch (error) {
        return new Response(`Network error: ${error}`, {
            status: 408,
            headers: { "Content-Type": "text/plain" },
        });
    }
}
