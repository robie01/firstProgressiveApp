var deferredPrompt;

// if service worker exist
if('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function () {
            console.log('service worker registered!');
        });
}
window.addEventListener('beforeinstallprompt', function (event) {
    console.log('beforeinstallprompt fired');
    // will prevent the default banner
    event.preventDefault();
    deferredPrompt = event;
    return false;
});

