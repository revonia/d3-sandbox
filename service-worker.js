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
    "revision": "bc201ba12066071a6d8590bf30ae77b8"
  },
  {
    "url": "assets/css/0.styles.dce4b0bb.css",
    "revision": "9e8b14fc2099fb362c9992e0fef73656"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.8537eac5.js",
    "revision": "3662264ccd2e794f65639aa086750571"
  },
  {
    "url": "assets/js/10.a36312b5.js",
    "revision": "1cc151ee323beff8cfe8652844a69405"
  },
  {
    "url": "assets/js/11.083c9699.js",
    "revision": "d114fd2d2c92ccad51606231a5b45f31"
  },
  {
    "url": "assets/js/12.aeef7d16.js",
    "revision": "96919eac71011b753e0451040e7487b1"
  },
  {
    "url": "assets/js/13.d34a5c83.js",
    "revision": "aa1ffe0a1cc56fa26bdf7a0a411467dc"
  },
  {
    "url": "assets/js/14.0324a27c.js",
    "revision": "bef2f43d1d1d8c760605f3695349e45c"
  },
  {
    "url": "assets/js/15.297c98cc.js",
    "revision": "b4faea0fcb25bcefcd116edceba9c010"
  },
  {
    "url": "assets/js/16.d02c6206.js",
    "revision": "c3ad2f86352ca576076ec23b01965a77"
  },
  {
    "url": "assets/js/17.11412de8.js",
    "revision": "9766aba37ece47fd540dda587ed02711"
  },
  {
    "url": "assets/js/18.376da4b1.js",
    "revision": "df59a1360e447c799b2882f2621c3291"
  },
  {
    "url": "assets/js/19.a645ac6e.js",
    "revision": "d3d2817280cce51daace113d433627b7"
  },
  {
    "url": "assets/js/3.e8bf89e1.js",
    "revision": "2cd67f36acaf3d0d074304ff3eb5efe6"
  },
  {
    "url": "assets/js/4.d884149c.js",
    "revision": "a9c43e8a2d0bd6ccb7f364e1eb8d3f76"
  },
  {
    "url": "assets/js/5.ebcd8c89.js",
    "revision": "dcc40d5ad69b8cbedf2cb5a29ae32fdf"
  },
  {
    "url": "assets/js/6.116037ab.js",
    "revision": "d8e8cb13df20f6f7dddce667ebdaade2"
  },
  {
    "url": "assets/js/7.13dc7f71.js",
    "revision": "a4f45b6221999efc85da7b1d5ff45029"
  },
  {
    "url": "assets/js/8.f4d86b1c.js",
    "revision": "c5abf6c11d1a78ccba806c744eef9962"
  },
  {
    "url": "assets/js/9.b923d705.js",
    "revision": "329b380388e46ac079832c5fe0d654a5"
  },
  {
    "url": "assets/js/app.21d1790f.js",
    "revision": "15cbc5be68a625f70e02ad5ee65ef120"
  },
  {
    "url": "d3-basic/index.html",
    "revision": "d12b303329ea1ea9174c4aed59f86a25"
  },
  {
    "url": "d3-basic/joining-data.html",
    "revision": "f9c41b379fe1b51d101002568a171b9e"
  },
  {
    "url": "examples/index.html",
    "revision": "4893219f9a2a156717d6b0adc2dc8046"
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
    "revision": "d180166af367741ef490a7828c8948b9"
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
