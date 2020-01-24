var title = 'Selamat datang footaball mania' ;
var isi = "silahkan cek jadwal terkini";
var optiondata = {
    isi,
    icon: './assets/img/icon/Icon-512.png',
    badge: './assets/img/icon/Icon-512.png',
    tag: 'greetings'
};


if (!('serviceWorker' in navigator)) {
  console.log("Service worker tidak didukung browser ini.");
} else {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("./sw.js")
        .then(function() {
          console.log("Pendaftaran ServiceWorker berhasil");
      })
        .catch(function() {
          console.log("Pendaftaran ServiceWorker gagal");
      })
        navigator.serviceWorker.ready.then(function(){
            regPushManager();
            requestPermission();
        }).catch(()=> console.log("ServiceWorker belum siap"))
    });
}
function requestPermission() {
    if ('Notification' in window) {
      Notification.requestPermission().then(function (result) {
        if (result === "granted") {
            navigator.serviceWorker.getRegistration().then(function(reg) {
                reg.showNotification(title, optiondata)
            });
        } else if (result === "denied") {
          console.log("Fitur notifikasi tidak diijinkan.");

      }else if (result === "default") {
          console.error("Pengguna menutup kotak dialog permintaan ijin.");
      }


  });
  }
}
function regPushManager(){
    if ('PushManager' in window) {
        navigator.serviceWorker.getRegistration().then(reg => {
            reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array('BGMBsRBC6LH0SaqYKpKUNL0GfE1JPxAQrGIZU44Z6JUTidmsM5YOgVWrtHllyFXHwAwU-8VETSXm0S649EBjBGQ')
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
