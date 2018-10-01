var deferredPrompt;

// if service worker exist
if('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function () {
            console.log('service worker registered!');
        }).catch(function (err) {
            console.log(err);
    });
}
window.addEventListener('beforeinstallprompt', function (event) {
    console.log('beforeinstallprompt fired');
    // will prevent the default banner
    event.preventDefault();
    deferredPrompt = event;
    return false;
});

var promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('This is executed once the timer is done')
        reject({code: 500, message: 'An error occurred!'});
    }, 3000);
});
promise.then(function (value){
    return value;
}).catch(function (err) {
    console.log(err);
});

console.log('It is executed right after setTimeOut()');