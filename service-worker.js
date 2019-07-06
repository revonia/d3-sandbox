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
    "revision": "86f6a87ad236fdf4d4b0480be05fe8d5"
  },
  {
    "url": "assets/css/0.styles.c8c3a48d.css",
    "revision": "777293b4df75fe182912a43077af8011"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.8eeedd08.js",
    "revision": "d9ca618d3c6c6b802b1ee9e452c76d7f"
  },
  {
    "url": "assets/js/10.2a0feded.js",
    "revision": "2b9697a17c0f47153c2443b352d4b380"
  },
  {
    "url": "assets/js/11.b2965d36.js",
    "revision": "59670422a25c23d7c3c210903765a58c"
  },
  {
    "url": "assets/js/12.4caec20b.js",
    "revision": "edf3338c44b4a6aa2c7534023a3582bc"
  },
  {
    "url": "assets/js/13.8a8e5100.js",
    "revision": "8939d4eaa98ee00871864b520abe006f"
  },
  {
    "url": "assets/js/14.22894a7d.js",
    "revision": "e02dbe3f8d6deeab88a91548a8b64ed8"
  },
  {
    "url": "assets/js/15.b53d5e0d.js",
    "revision": "410bfbcd0fdcf1bac4f3341a39a3086e"
  },
  {
    "url": "assets/js/16.0d59edd4.js",
    "revision": "ed8a31b25b162e1ca8c0c8776d475176"
  },
  {
    "url": "assets/js/17.a68745de.js",
    "revision": "5768a97563a45f96ad501cfb28f769db"
  },
  {
    "url": "assets/js/18.2467cdf4.js",
    "revision": "9b8de3dcc9c9442c501f4eb8782e4a96"
  },
  {
    "url": "assets/js/19.30188a09.js",
    "revision": "a9bb8bf0e06ea86cea186cdc87303b76"
  },
  {
    "url": "assets/js/20.3ba465fa.js",
    "revision": "2479a743c3376b291283db3511e69766"
  },
  {
    "url": "assets/js/21.81e0281f.js",
    "revision": "7cab738c0cbe956e5016da5d546c43bf"
  },
  {
    "url": "assets/js/4.c0e2589b.js",
    "revision": "cf4e8a4d1ae17e9d10b1848f909f879f"
  },
  {
    "url": "assets/js/5.ebe7725d.js",
    "revision": "25de1954b3cd498b9b80543fcbaf1708"
  },
  {
    "url": "assets/js/6.54aae982.js",
    "revision": "e52e70c2aec0bee58416f0001245f0b1"
  },
  {
    "url": "assets/js/7.f45c08ad.js",
    "revision": "4007f5a075cdef0fc53066d9578152fa"
  },
  {
    "url": "assets/js/8.b08dd036.js",
    "revision": "81be957527a1d6fa83709f93b5a6c3d5"
  },
  {
    "url": "assets/js/9.1bd5f845.js",
    "revision": "aa35c1273dd4f53a71d7643da637bc53"
  },
  {
    "url": "assets/js/app.396d80df.js",
    "revision": "eab4094e66d67ae5012ae1ce44c3a20d"
  },
  {
    "url": "assets/js/vendors~docsearch.024d053c.js",
    "revision": "afd56e3125d9d5f8c5a3eb6c2866c9ae"
  },
  {
    "url": "d3-basic/index.html",
    "revision": "633efb4e680ff2bf2dc1fd162f2a29f7"
  },
  {
    "url": "d3-basic/joining-data.html",
    "revision": "c883f60a138c842dd40016fbc9f0acb7"
  },
  {
    "url": "d3-basic/selecting-and-modifying.html",
    "revision": "717bce2f52dc9f8bb54692156d6ceee4"
  },
  {
    "url": "examples/index.html",
    "revision": "b09435358bc5265173683527d5e85c12"
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
    "revision": "1f75d2148013862405e198d4ca51d0ff"
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
