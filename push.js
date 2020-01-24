const webPush = require('web-push')

const vapidKeys = {
	publicKey: 'BGMBsRBC6LH0SaqYKpKUNL0GfE1JPxAQrGIZU44Z6JUTidmsM5YOgVWrtHllyFXHwAwU-8VETSXm0S649EBjBGQ',
	privateKey: 'HwK_-fjkBoHdY_zUroMDcFpq8ZarW23-Egrk7-WvSuI'
}

webPush.setVapidDetails(
	'mailto:kuroalza@gmail.com',
	vapidKeys.publicKey,
	vapidKeys.privateKey
	)

var pushSubscription = {
	endpoint: 'https://fcm.googleapis.com/fcm/send/e1Q7uu1ICsg:APA91bGo6utTd7xQI8Zgldkr9_OZsr5yXrPThiRFbSUn8kahIwT9G0uTi0fEkLRWg6mJSrseOArA_c_6Xcc6WbGsfvhrcPqJebH5OKGyRQVfLE8NsEYd75SfQpQ3nA5gSWwmkPFOwhHz',
	keys: {
		p256dh: 'BJeRIX6E0vA9ygHFsAx62TlVasnPPIS+2VeJwFCzeY1waLnwkHFzYvlRqePxsylODV5I5Q9LvO9IorRaTcwkw+U=',
		auth: 'jXosi+izbS68a0kOaeCI+Q=='
	}
}

var payload = "cek jadwal yuk , supaya tidak bosan~"

var options = {
	gcmAPIKey: '807511394615',
	TTL: 60
}

webPush.sendNotification(
	pushSubscription,
	payload,
	options)