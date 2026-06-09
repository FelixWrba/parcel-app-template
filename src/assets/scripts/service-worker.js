import { manifest, version } from "@parcel/service-worker";

async function install() {
    const cache = await caches.open(version);
    await cache.addAll(manifest);
}
addEventListener('install', event => event.waitUntil(install()));

async function activate() {
    const keys = await caches.keys();
    await Promise.all(
        keys.map(key => key !== version && caches.delete(key))
    );
}
addEventListener('activate', event => event.waitUntil(activate()));

addEventListener('fetch', event => {
    event.respondWith(
        caches.open(version).then(cache =>
            cache.match(event.request).then(response => 
                (response || fetch(event.request).then(res => res))
            )
        )
    );
});
