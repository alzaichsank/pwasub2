const webPush = require('web-push')

const vapidKeys = {
	publicKey: 'BOh_3uYIKMKRPooX-ocCVXZ1KBscqx_8xMMSDxh-LIi8tgf8njiPBFmpOrwi_GErzTvksbLldf7ajYxjoMhCj5k',
	privateKey: 'fYscKx4KEEqKcpLDzX6mmnT3cwOrLRuORlVgtDXOh1A'
}

webPush.setVapidDetails(
	'mailto:alzarf77@gmail.com',
	vapidKeys.publicKey,
	vapidKeys.privateKey
	)

var pushSubscription = {
	endpoint: 'ttps://fcm.googleapis.com/fcm/send/cEn5V-8JQUE:APA91bEhm8E3V8VdebHnQL6B7AmCic8QL9ymuJKyFUI5U2E8CW5lLqm9OXU-o8JVa_CrGb3REcvCC3mOcDILKAo-1drS41tudAJm8SHU6b3nieBMJsXxtz1ZXGqw1BoNoMKpCwMZQSt4',
	keys: {
		p256dh: 'BFrgis2PJNx4MsRQSDkSgxI+vkoKO/5OzljMFs3o+vuadDDlDvOdJp/EAu2CmCizdnoRocuS5GVr3SHRjG8G1fs=',
		auth: 'Bi5MuGkBTHmSYfpjVTXfUg=='
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