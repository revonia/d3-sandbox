/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "0e1912328d5fcfbb1d935df097802ba2"
  },
  {
    "url": "assets/css/0.styles.5d96e9c9.css",
    "revision": "43ea9cec693c29c661bc4febb906f75d"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.d5d253c0.js",
    "revision": "d5a700284cc429ec9a665a0b1841ffe5"
  },
  {
    "url": "assets/js/10.9789e588.js",
    "revision": "da2cf8f9bf43ccf946c5c436b2a1ed58"
  },
  {
    "url": "assets/js/11.aff8e9f4.js",
    "revision": "1c6e36889b01054aca5ff5f790a9ce1a"
  },
  {
    "url": "assets/js/12.7cf1ce61.js",
    "revision": "359e7a1e30a1f93840d24f8876bcc243"
  },
  {
    "url": "assets/js/13.9ae96de4.js",
    "revision": "6804fb0a383da2b4b5be6f8bbeb6cc68"
  },
  {
    "url": "assets/js/14.671b1456.js",
    "revision": "0a1a1b793f9bb08bc1ed016bfd53b162"
  },
  {
    "url": "assets/js/15.62eb9edf.js",
    "revision": "573421b27b48dd283127c08e81df26a7"
  },
  {
    "url": "assets/js/16.39d2d15e.js",
    "revision": "f3607c74763736570a9222c12f5fb897"
  },
  {
    "url": "assets/js/3.ee8035c1.js",
    "revision": "b6a768ae9441a94103a304c1000f50b6"
  },
  {
    "url": "assets/js/4.5d689f6d.js",
    "revision": "e04d32637d926f4e6b4ac34c1ab06804"
  },
  {
    "url": "assets/js/5.59dbab7e.js",
    "revision": "90e26077ebc85823948617e0f6e37951"
  },
  {
    "url": "assets/js/6.ffc4d3dd.js",
    "revision": "835c7bb7f48015cd4cea1c75a32f5ce5"
  },
  {
    "url": "assets/js/7.10935361.js",
    "revision": "bc786930f8862175664be80e5f6dba9b"
  },
  {
    "url": "assets/js/8.52c143a6.js",
    "revision": "f535e1142367ba04f79183e202be2bf4"
  },
  {
    "url": "assets/js/9.7b16a4f9.js",
    "revision": "d863145097cce5451f634cc54e74d608"
  },
  {
    "url": "assets/js/app.0d6fbd27.js",
    "revision": "526fc6946bd2f0c004d4f782ec39111b"
  },
  {
    "url": "images/icon/d3-sandbox144.png",
    "revision": "2c3b8951db35b1c4531e0b2ba69bb3e7"
  },
  {
    "url": "images/icon/d3-sandbox168.png",
    "revision": "623f9c0d323ed3a7afbb8e41c29466b1"
  },
  {
    "url": "images/icon/d3-sandbox192.png",
    "revision": "63a4a3e389af91dc6c10d76a6962d2c1"
  },
  {
    "url": "images/icon/d3-sandbox48.png",
    "revision": "3aa2102fe5d3524aa350cce9f186039d"
  },
  {
    "url": "images/icon/d3-sandbox72.png",
    "revision": "74ba231cbb6a9e26e574d5d556e4ab37"
  },
  {
    "url": "images/icon/d3-sandbox96.png",
    "revision": "eff8a770c67cb2454b82792b3a25bcf0"
  },
  {
    "url": "index.html",
    "revision": "621aebd2c59b9a7626849541f07bc113"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
