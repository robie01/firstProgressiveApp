var deferredPrompt;

if(!window.Promise) {
    window.Promise = Promise;
}

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

// var promise = new Promise(function (resolve, reject) {
//     setTimeout(function () {
//         // resolve('This is executed once the timer is done')
//         reject({code: 500, message: 'An error occurred!'});
//     }, 3000);
// });
//
// // ajax
// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://httpbin.org/ip');
// xhr.responseType = 'json';
//
// xhr.onload = function () {
//     console.log(xhr.response);
// };
//
// xhr.onerror = function () {
//     console.log('Error')
// };
// xhr.send();
//
//
// fetch('https://httpbin.org/ip')
//     .then(function (response) {
//         console.log(response);
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     })
//     .catch(function (err) {
//         console.log(err);
//     });
//
// fetch('https://httpbin.org/post', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     },
//     mode: 'cors',
//     body: JSON.stringify({message:'Does this work?'})
// })
//     .then(function (response) {
//         console.log(response);
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     })
//     .catch(function (err) {
//         console.log(err);
//     });
// promise.then(function (value){
//     return value;
// }).catch(function (err) {
//     console.log(err.code, err.message);
// });
//
// console.log('It is executed right after setTimeOut()');