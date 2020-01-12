if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("./footms-workbox.js")
            .then(res => {
                console.log("app registered")
            })
            .catch(function() {
                console.log("app failed");
            })
        navigator.serviceWorker.ready.then(function(){
            regPushManager()
        }).catch(()=> console.log("app unready"))
    })
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
                applicationServerKey: urlBase64ToUint8Array('BE11CIpUkCknNQS5Gdsu6jd1c4U-hsmrs1W8Evu5SQaOld_1AiLrx6DKl2dIzBwn2LSfM0M4QfntAy04yUmqhRA')
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
let judul
let isi

if(jam < 5){
    judul = 'Selamat pagi menanti fajar'
    isi = "Mari mulai hari ini dengan bersyukur"
}else if(jam < 10){
    judul = 'Selamat pagi'
    isi = 'Mari mulai aktifitas dengan semangata'
}else if(jam < 15){
    judul = 'Selamat siang'
    isi = "Sambil pantau jadwal, jangan lupa makan ya"
}else if(jam < 19){
    judul = 'Selamat Sore'
    isi = "Mari akhiri sore hari ini dengan bersantai"
}else if(jam < 21){
    judul = 'Selamat Malam'
    isi = "Mari istirahatkan tubuh ini"
}else if(jam < 23){
    judul = 'Mari Tidur'
    isi = "Tubuh ini butuh istirahat"
}else{
    judul = 'Mari Tidur'
    isi = "Tubuh ini butuh istirahat"
}

judul = judul + ', Football Mania'

const title = judul
const option2 = {
    isi,
    icon: './assets/img/icon/Icon-512.png',
    badge: './assets/img/icon/Icon-512.png',
    tag: 'greetings'
}
