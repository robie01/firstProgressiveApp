// self means give access to service worker in background process
self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker...', event);
    event.waitUntil(
        caches.open('pre-cache')
            .then(function (cache) {
                console.log('[Service Worker] PreCaching App Shell');
                cache.add('/src/js/app.js');
            })
    );
});

self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker...', event);
    // this makes sure that sw are loaded/activated correctly
    return self.clients.claim();
});
// this will trigger if images, css or script is loaded
self.addEventListener('fetch' , function (event) {
event.respondWith(
    // caches is the over all storage.
    caches.match(event.request)
        .then(function (response) {
           if (response) {
               return response; // returning a value from cache
           } else
           {
               return fetch(event.request);
           }
        })
);
});