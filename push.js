const webPush = require('web-push')

const vapidKeys = {
	publicKey: 'BE11CIpUkCknNQS5Gdsu6jd1c4U-hsmrs1W8Evu5SQaOld_1AiLrx6DKl2dIzBwn2LSfM0M4QfntAy04yUmqhRA',
	privateKey: 'Z_Ei4XF0xHtDN3kJ2PXTxc7l8YI_Yeq6oKQN8pZQr3U'
}

webPush.setVapidDetails(
	'mailto:kuroalza@gmail.com',
	vapidKeys.publicKey,
	vapidKeys.privateKey
	)

var pushSubscription = {
	endpoint: ' https://fcm.googleapis.com/fcm/send/f2KcoGbZ_RE:APA91bGMbbMQyyaTYzmHCWo1djN_QV76Aw9hSXyo2ePwMsYW_t9s1pv8MOIen25r5NqpFl0xuyrCjX8dAl1ObYFwx9qvGCgaOmjArBoRTBSQcnneI4Cxw8w5tfHSfHdt1szNJDxk7SsI',
	keys: {
		p256dh: 'BMB9zrAdt3qYMiOmkJKCwkrkwashX6j7Lthp0yCHTaHJtqBEn6Yb3zHldUmmF8NG3K3ecSGprstwz3QG5vSSSkE=',
		auth: 'QtjU9PQI05jJSp4WXJtEMA=='
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