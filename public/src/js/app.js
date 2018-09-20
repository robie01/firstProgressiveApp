// if service worker exist
if('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function () {
            console.log('service worker registered!');
        });
}
