// self means give access to service worker in background process
self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker...', event);
});

self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker...', event);
    // this makes sure that sw are loaded/activated correctly
    return self.clients.claim();
});
// this will trigger if images, css or script is loaded
self.addEventListener('fetch' , function (event) {
console.log('[Service Worker] Fetching something...', event);
event.respondWith(fetch(event.request));
});