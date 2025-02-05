const CACHE_NAME = "F.M.S";
const urlToCache = [
    //navigation
    "./index.html",
    "./navigation/sidenav.html",
    "./navigation/topnav.html",
    //external libray
    "./vendor/materialize/materialize.min.css",
    "./vendor/materialize/materialize.min.js",
    "./vendor/jquery/jquery.min.js",
    "./vendor/material-icon/deploy.css",
    "./vendor/material-icon/font-materialize.woff2",
    "./vendor/idb/idb.js",
    "./vendor/lazyload/lazyload.min.js",
    //pages
    "./pages/home.html",
    "./pages/favorite.html",
    "./pages/table.html",
    "./pages/champions.html",
    "./pages/sugestion.html",
    //asset custom
    "./assets/css/style.css",
    "./js/nav.js",
    "./js/indexDb.js",
    //banner
    "./assets/img/liga/ic_bundes.jpg",
    "./assets/img/liga/ic_laliga.jpg",
    "./assets/img/liga/ic_premier.jpg",
    "./assets/img/liga/ic_seri_a.jpg",
    //ui
    "./assets/img/ui/img-no-network.svg",
    "./assets/img/ui/thankyou.png",
    "./assets/img/ui/favorite.png",
    //icon
    "./assets/img/icon/Icon-512.png",
    "./assets/img/icon/Icon-192.png",
    "./assets/img/icon/Icon-144.png",
    "./assets/img/icon/Icon-96.png",
    "./assets/img/icon/Icon-72.png",
    "./assets/img/icon/Icon-48.png",
    "./assets/img/icon/Icon-36.png",
    // //web info
    "./manifest.json",
    // //system
    "./main.js",
    ];

//Tahap Instalasi

self.addEventListener('install', function(event) {
 console.log("ServiceWorker: Menginstall..");
 event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll(urlToCache);
    })
    );
});

//Tahap Aktivasi
self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
                );
        })
        );
});

//Event Fetch
self.addEventListener('fetch', event => {
    var base_url = 'https://api.football-data.org/v2/';
    var jpg = '.jpg';
    var svg = '.svg';
    var png = '.png';

    var uri = event.request.url

    if (uri.indexOf(base_url) > -1) {
        event.respondWith(
            caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function(response) {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);

                return caches.open(CACHE_NAME).then(cache => {
                    return fetch(event.request).then(response => {
                        cache.put(event.request.url, response.clone())
                        return response
                    })
                })
            })
            )
    } else if (uri.indexOf(jpg) > -1 || uri.indexOf(svg) > -1 || uri.indexOf(png) > -1) {
        event.respondWith(
            caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function(response) {
                if (response) {
                    console.log("ServiceWorker: Gunakan image dari cache: ", response.url);
                    return response;
                }
                console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
                return caches.open(CACHE_NAME).then(cache => {
                    cache.add(uri)
                    return fetch(uri)
                })
            })
            )
    } else {
        event.respondWith(
            caches.match(event.request, {
                ignoreSearch: !0
            }).then(response => {
                return response || fetch(event.request)
            })
            )
    }
});

self.addEventListener('push', event => {

    console.log("masuk pak eko");
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body =  'Push message no payload';
    }

    var options = {
        body: body,
        icon: '/img/Icon-512x512.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }

    event.waitUntil(
        self.registration.showNotification('Lagi gabut?', options)
        );
});