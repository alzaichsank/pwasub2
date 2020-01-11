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
	endpoint: 'https://fcm.googleapis.com/fcm/send/eT0MqDpPiqI:APA91bEdgKdG6m5d5sjg0zCf7P8dvRPqmttkvmAxwFCgBBM_ha1d1oy1CN2OAL4yNKJMzbu-Xp3siKHv5H6_TqxDoP6eLiJ2jSiQMz5cNkx2_aOq4ReqtPv7IaHeRkO7oGiuHaidcrwS',
	keys: {
		p256dh: 'BLoWC/dIhYciBb9MEWTpZFtwrIb6RDE+eLXahTg11U7HwI1mISe6oMp4sfo9eLyoLsyWcXn4u3y5WX7eejGn4Fw=',
		auth: 'GeMw0PDEH5iSxT40vGqT2A=='
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