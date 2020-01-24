if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("./sw.js")
        .then(function() {
          console.log("Pendaftaran ServiceWorker berhasil");
      })
        .catch(function() {
          console.log("Pendaftaran ServiceWorker gagal");
      })
        navigator.serviceWorker.ready.then(function(){
            regPushManager()
        }).catch(()=> console.log("ServiceWorker belum siap"))
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}

if ('Notification' in window) {
 Notification.requestPermission()
 .then(res => {
    if (res === 'granted') {
        navigator.serviceWorker.ready.then(reg => {
            reg.showNotification(title, option2)
        })
    } else {
        console.log("Notifikasi ditolak");
    }
})
} else {
    console.log("Notifikasi tidak didukung browser");
}

//register push service google cloud messenging
function regPushManager(){
    if ('PushManager' in window) {
        navigator.serviceWorker.getRegistration().then(reg => {
            reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array('BOh_3uYIKMKRPooX-ocCVXZ1KBscqx_8xMMSDxh-LIi8tgf8njiPBFmpOrwi_GErzTvksbLldf7ajYxjoMhCj5k')
            }).then(subscribe => {
                console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('p256dh')))));
                console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('auth')))));
            }).catch((err) => {
                console.log("Tidak dapat melakukan subscribe " + err.message);
            })
        })
    }
}

function urlBase64ToUint8Array(base64) {
    const padding = '='.repeat((4 - base64.length % 4) % 4);
    var base64 = (base64 + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const dt = new Date()

let jam = dt.getHours()
var judul = 'Selamat datang footaball mania' ;
var isi = "silahkan cek jadwal terkini";

const title = judul
const option2 = {
    isi,
    icon: './assets/img/icon/Icon-512.png',
    badge: './assets/img/icon/Icon-512.png',
    tag: 'greetings'
}
