var BASE_PATH = '/task5/';
var CACHE_NAME = 'gih-cache-v7';
//var newsAPIJSON = "https://newsapi.org/v1/articles?source=bbc-news&apiKey=c0d26668d2dd4049bfd66155dde340b3";

var CACHED_URLS = [
    // Our HTML
    BASE_PATH + 'index.html',
    BASE_PATH + 'formPage.html',
    BASE_PATH + 'articlePage.html',
    BASE_PATH + 'newsPage.html',
    //favicons
   BASE_PATH + 'favicon/android-chrome-144x144.png',
   BASE_PATH + 'favicon/apple-touch-icon.png', 
   BASE_PATH + 'favicon/favicon-16x16.png',
   BASE_PATH + 'favicon/favicon-32x32.png',
   BASE_PATH + 'favicon/manifest.json', 
   BASE_PATH + 'favicon/favicon.ico',
   BASE_PATH + 'favicon/mstile-150x150.png',
   BASE_PATH + 'favicon/safari-pinned-tab.svg',

    //Images for page
//    BASE_PATH + 'offlinemap.jpg',
    BASE_PATH + 'images/Facebook.png',
    BASE_PATH + 'images/Google+.png',
    BASE_PATH + 'images/Twitter.png',
    BASE_PATH + 'images/YouTube.png',
    BASE_PATH + 'images/logo.png',
    BASE_PATH + 'images/newsImg1.jpg',
    BASE_PATH + 'images/sh-1300.jpg',
    BASE_PATH + 'images/sh-600.jpg',
    BASE_PATH + 'images/sh-900.jpg',
    BASE_PATH + 'images/sh-900M.jpg',
    BASE_PATH + 'images/shrewsburyFormPhoto.jpg',    
    // JavaScript
//    BASE_PATH + 'offline-map.js',
  // CSS and fonts
    BASE_PATH + 'styles/genericStyle.css',
    BASE_PATH + 'styles/articleStyle.css',
    BASE_PATH + 'styles/formStyle.css',
    BASE_PATH + 'styles/indexStyle.css',
    BASE_PATH + 'styles/newsStyle.css',
    BASE_PATH + 'scripts/menu.js',
        BASE_PATH + 'serviceworker.js'

//BASE_PATH + 'appimages/news-default.jpg'

];

var googleMapsAPIJS = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCMNj1opBAeNjTEY4PdjCABCwJdrHx0cvI&callback=initMap';

self.addEventListener('install', function(event) {
  // Cache everything in CACHED_URLS. Installation fails if anything fails to cache
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

/*
self.addEventListener('fetch', function(event) {
    var requestURL = new URL(event.request.url);
 if (CACHED_URLS.includes(requestURL.href) || CACHED_URLS.includes(requestURL.pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          return response || fetch(event.request);
        });
      })
    );
  }
});
*/

self.addEventListener('fetch', function(event) {
  var requestURL = new URL(event.request.url);
  if (requestURL.href === googleMapsAPIJS) {
    event.respondWith(
      fetch(
        googleMapsAPIJS+'&'+Date.now(),
        { mode: 'no-cors', cache: 'no-store' }
      ).catch(function() {
        return caches.match('offline-map.js');
      })
    );
  }
    else {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
    }
});



self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith('gih-cache') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
