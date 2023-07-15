document.addEventListener('DOMContentLoaded', init, false);

// pada function init terdapat navigatir yang mendaftarkan service worker dengan file service worker 
//Service worker digunakan untuk menyediakan fungsi offline atau caching pada aplikasi web, sehingga aplikasi tetap dapat berjalan dengan baik bahkan tanpa koneksi internet.
function init() {
    if ('serviceWorker' in navigator && navigator.onLine) {
        navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
            console.log('Registrasi service worker Berhasil', reg);
        }, (err) => {
            console.error('Registrasi service worker Gagal', err);
        });
    }
}