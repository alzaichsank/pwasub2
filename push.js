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
	endpoint: 'https://fcm.googleapis.com/fcm/send/ec9oQJbGlEo:APA91bHjz7zbg4-IDc-zb7sP-N-BOjHsVk9mn_InUuwaaykwjCyDLnWstfOMckeqTqGVR6YU61qPJXAxtWLv4xhPGtZorykPOzSBsPlAG2rFNDyRtSHV1T_ZKTYEKoT0re_D8GeihmFR',
	keys: {
		p256dh: 'BF07boy93StZcWP/H0CIYXn0QVjNokn1+9fOCigEWC1qljHAOqwOjLzK82t3od4QbD2JzddEA4ILJAtUaAEjm7s=',
		auth: '4dWuT9YiRXjq9eKP/ZFo1w=='
	}
}

var payload = "Jadwal tebaru sudah ada , Ayo cek sekarang!!"

var options = {
	gcmAPIKey: '807511394615',
	TTL: 60
}

webPush.sendNotification(
	pushSubscription,
	payload,
	options)