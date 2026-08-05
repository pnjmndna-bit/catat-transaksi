/* ==========================================
   PxxStudix Service Worker
========================================== */

const CACHE_NAME = "pxxstudix-v13";

const FILES_TO_CACHE = [

    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",

    "./assets/logo.jpg",
    "./assets/icon-192.png",
    "./assets/icon-512.png"

];

/* ==========================================
   INSTALL
========================================== */

self.addEventListener("install", (event) => {
    self.skipWaiting();
});

/* ==========================================
   ACTIVATE
========================================== */

self.addEventListener("activate", (event) => {

    event.waitUntil(self.clients.claim());

});

/* ==========================================
   FETCH
========================================== */

self.addEventListener("fetch", () => {});
