// self means give access to service worker in background process
self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker...', event);
    event.waitUntil(
        caches.open('pre-cache-v2')
            .then(function (cache) {
                console.log('[Service Worker] PreCaching App Shell');
                cache.addAll([
                    '/',
                    '/src/js/app.js',
                    '/src/js/feed.js',
                    '/src/js/promise.js',
                    '/src/js/fetch.js',
                    '/src/js/material.min.js',
                    '/src/css/app.css',
                    '/src/css/feed.css',
                    '/src/images/main-image.jpg',
                    'https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet',
                    'https://fonts.googleapis.com/icon?family=Material+Icons',
                    'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'

                ]);
            })
    );
});
// A comment

self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker...', event);
    event.waitUntil(
        caches.keys()
            .then(function (keyListCachesNames) {
                return Promise.all(keyListCachesNames.map(function (key) {
                    if (key !== 'pre-cache-v2' && key !== 'dynamic') {
                        console.log('[Service Worker] Removing old cache.', key);
                        return caches.delete(key);
                    }
                }))
            })
    );
    // this makes sure that sw are loaded/activated correctly
    return self.clients.claim();
});
// this will trigger if images, css or script is loaded
self.addEventListener('fetch', function (event) {
    event.respondWith(
        // caches is the over all storage.
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response; // returning a value from cache
                } else {
                    return fetch(event.request)
                        .then(function (res) {
                           return caches.open('dynamic')
                                .then(function (cache) {
                                    cache.put(event.request.url, res.clone());
                                    return res;
                                })
                        });
                }
            }).catch(function (err) {
                console.log(err);
        })
    );
});