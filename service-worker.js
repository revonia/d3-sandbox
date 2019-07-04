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
    "revision": "32b68610b11320a5f8674b54b30bc350"
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
    "url": "assets/js/10.c600e675.js",
    "revision": "f8ee9c5b0abf11455bd8082883d66da1"
  },
  {
    "url": "assets/js/11.0036263f.js",
    "revision": "bbdac2f33a3a42b136309fea6d86b805"
  },
  {
    "url": "assets/js/12.73d7d465.js",
    "revision": "fe5ec56156e41c7dd5ab69e7da8db6a4"
  },
  {
    "url": "assets/js/13.8fb83f95.js",
    "revision": "0090006808fce48750502b7b82f11609"
  },
  {
    "url": "assets/js/14.5814337a.js",
    "revision": "8305e24c59edd61c7f24496eddd53126"
  },
  {
    "url": "assets/js/15.ee3de4a4.js",
    "revision": "92eb4d101bd44e481dfbd0af110fa080"
  },
  {
    "url": "assets/js/16.3c178b2e.js",
    "revision": "0eaa031c086324f953813ee23a58767d"
  },
  {
    "url": "assets/js/17.4764eaa9.js",
    "revision": "5ec8a8f885cf04003ee6f18b4ccc4c5f"
  },
  {
    "url": "assets/js/18.5177b654.js",
    "revision": "c9ba09b88bd866844de89774f1f4e70e"
  },
  {
    "url": "assets/js/19.f07dd9a3.js",
    "revision": "219527fc418bf1afd87878e30a5e70e8"
  },
  {
    "url": "assets/js/3.c5a81db5.js",
    "revision": "180949e61fa407d43c9698ab60a01d79"
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
    "url": "assets/js/6.ed8bd217.js",
    "revision": "0c10c1378c447f58d30ecf8dab7a7c85"
  },
  {
    "url": "assets/js/7.f00eda84.js",
    "revision": "8542dba1f1ec8412e2880c2cc86075c4"
  },
  {
    "url": "assets/js/8.022b2bbb.js",
    "revision": "35c11644fd529fbbd300c5c766a77c0d"
  },
  {
    "url": "assets/js/9.7b16a4f9.js",
    "revision": "d863145097cce5451f634cc54e74d608"
  },
  {
    "url": "assets/js/app.8743e85d.js",
    "revision": "92c7e36c3106947503b37f44b057eb2a"
  },
  {
    "url": "d3-basic/index.html",
    "revision": "1c7ddbda7ef0423a1d6d0752a298fb56"
  },
  {
    "url": "d3-basic/joining-data.html",
    "revision": "8aa748aa81f42958776bcd862121c1f9"
  },
  {
    "url": "examples/index.html",
    "revision": "bb2ddeab3c1860b96054130ab8354803"
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
    "revision": "e39161235becafa495f55f5e5beb252a"
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
