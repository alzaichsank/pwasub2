//sw with workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

console.log("Workbox :" + workbox ? "successfully loaded" : "failed to load")

workbox.precaching.precacheAndRoute([
    { url: "./index.html", revision: '1' },

    //vendor
    { url: "./vendor/materialize/materialize.min.css", revision: '1' },
    { url: "./vendor/materialize/materialize.min.js", revision: '1' },
    { url: "./vendor/jquery/jquery.min.js", revision: '1' },
    { url: "./vendor/material-icon/deploy.css", revision: '1' },
    { url: "./vendor/material-icon/font-materialize.woff2", revision: '1' },
    { url: "./vendor/idb/idb.js", revision: '1' },
    { url: "./vendor/lazyload/lazyload.min.js", revision: '1' },

    //pages
    { url: "./pages/home.html", revision: '1' },
    { url: "./pages/standings.html", revision: '1' },
    { url: "./pages/favorite.html", revision: '1' },
    { url: "./pages/feedback.html", revision: '1' },
    { url: "./pages/teams.html", revision: '1' },
    { url: "./pages/settings.html", revision: '1' },

    //asset custom
    { url: "./assets/css/style.css", revision: '1' },
    { url: "./assets/js/custom.js", revision: '1' },
    { url: "./assets/js/indexDb.js", revision: '1' },
    { url: "./assets/js/settings.js", revision: '1' },
    { url: "./assets/js/teams.js", revision: '1' },
    { url: "./assets/js/favorite.js", revision: '1' },
    { url: "./assets/js/schedule.js", revision: '1' },
    //banner
    { url: "./assets/img/club/banner/ic_bundes.jpg", revision: '1' },
    { url: "./assets/img/club/banner/ic_laliga.jpg", revision: '1' },
    { url: "./assets/img/club/banner/ic_premier.jpg", revision: '1' },
    { url: "./assets/img/club/banner/ic_seri_a.jpg", revision: '1' },
    //ui
    { url: "./assets/img/ui/img-no-network.svg", revision: '1' },
    { url: "./assets/img/ui/thankyou.png", revision: '1' },
    { url: "./assets/img/ui/favorite.png", revision: '1' },
    //icon
    { url: "./assets/img/icon/Icon-144.png", revision: '1' },
    { url: "./assets/img/icon/Icon-192.png", revision: '1' },
    { url: "./assets/img/icon/Icon-36.png", revision: '1' },
    { url: "./assets/img/icon/Icon-48.png", revision: '1' },
    { url: "./assets/img/icon/Icon-512.png", revision: '1' },
    { url: "./assets/img/icon/Icon-72.png", revision: '1' },
    { url: "./assets/img/icon/Icon-96.png", revision: '1' },
    //system
    { url: "./sw-reg.js", revision: '1' },
    { url: "./sw-football-with-workbox.js", revision: '1' },
    { url: "./manifest.json", revision: '1' }
])

workbox.routing.registerRoute(
    /\.(?:css|js)$/,
    new workbox.strategies.CacheFirst({
        cacheName: 'Javascript',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30
            })
        ]
    })
)

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org'),
    new workbox.strategies.NetworkFirst({
        cacheName: 'ApiFootball',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24,
                maxEntries: 30,
            }),
        ]
    })
)

workbox.routing.registerRoute(
    new RegExp('https://upload.wikimedia.org'),
    new workbox.strategies.CacheFirst({
        cacheName: 'image',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30
            }),
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            })
        ]
    })
);

// workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

self.addEventListener('push', event => {
    let body
    if (event.data) {
        body = event.data.text()
    } else {
        body = 'Push message no payload'
    }

    const options = {
        body,
        icon: '/img/Icon-512x512.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }

    event.waitUntil(
        self.registration.showNotification('Jangan lupa tonton tim favoritmu', options)
    )
})