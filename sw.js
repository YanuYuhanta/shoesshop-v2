// file sw js digunakan sebagai implementasi service worker
// CACHE_NAME akan mendifinisikan nama service worker yang digunakan
const CACHE_NAME = 'SW-001';
// toCache akan mendefinisikan URL yang akan disimpan di cache
const toCache = [
    '/',
    '/js/web.webmanifest',
    '/js/register.js',
    '/image/banner.jpg',
    '/image/image2.png',
    '/image/shoes.png',
];
// service worker membuka cache dengan menggunakan caches.open(CACHE_NAME) dan menambahkan 
// daftar URL yang didefinisikan di toCache ke dalam cache dengan menggunakan cache.addAll(toCache)
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(toCache)
        })
        .then(self.skipWaiting())
    )
})
// kode dibawah digunakan untuk menampilkan data cache yang telah disimpan
// service worker menggunakan fetch(event.request) untuk mencoba mengambil sumber daya dari jaringan.
self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request)
        .catch(() => {
            return caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.match(event.request)
            })
        })
    )
})
// kode dibawah akan mengahpus cache lama saat cache baru dibuat 
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
        .then((keyList) => {
            return Promise.all(keyList.map((key) => {
            if (key !== CACHE_NAME) {
                console.log('[ServiceWorker] Hapus cache lama', key)
                return caches.delete(key)
            }
            }))
        })
        .then(() => self.clients.claim())
    )
})
/*
Kode ini mengimplementasikan tiga event listener utama dalam service worker: 'install', 'fetch', dan 'activate'. 
Mereka digunakan untuk mengelola cache, memproses permintaan jaringan, dan menghapus cache lama saat service worker diperbarui.*/