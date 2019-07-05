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
    "revision": "c7077d96e0056e11b741fa92b1f5d674"
  },
  {
    "url": "assets/css/0.styles.fa72d287.css",
    "revision": "c61762d211715ae76e6104073773de4d"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.8f740e2e.js",
    "revision": "33f71a83b0bd580ed13d83efedc39634"
  },
  {
    "url": "assets/js/10.203f52cb.js",
    "revision": "2b9697a17c0f47153c2443b352d4b380"
  },
  {
    "url": "assets/js/11.d340f8dc.js",
    "revision": "37b5b19d7228be7faeb892d33aaa301b"
  },
  {
    "url": "assets/js/12.075a2138.js",
    "revision": "20507f83b3c120b728d5e869c8e55dc5"
  },
  {
    "url": "assets/js/13.30015422.js",
    "revision": "fa1e6a6de3feadf11466fde3833109f5"
  },
  {
    "url": "assets/js/14.ec26b1b5.js",
    "revision": "419e25b3cb97a89d20b2165b003eb340"
  },
  {
    "url": "assets/js/15.0c1d8c89.js",
    "revision": "7e4f92dd3003aa41fa7f60c72e9a7f98"
  },
  {
    "url": "assets/js/16.a0595eb8.js",
    "revision": "98a8e9ff6599e4c76bc23b47dc459017"
  },
  {
    "url": "assets/js/17.719851a6.js",
    "revision": "db4d657776d4dd0e7c0b5e11c2ab56c4"
  },
  {
    "url": "assets/js/18.d9c366d3.js",
    "revision": "04af464cea59bb441c29e31bd3d50896"
  },
  {
    "url": "assets/js/19.5af0f5c6.js",
    "revision": "0af81a3dd60f282fd79dbb7e0e8ff4c5"
  },
  {
    "url": "assets/js/20.44bce651.js",
    "revision": "ad5f2bcf6ccf9d32cb04071fd926af75"
  },
  {
    "url": "assets/js/4.c84f836f.js",
    "revision": "93c131bfd25c26f1a25ff0f6ed5783c3"
  },
  {
    "url": "assets/js/5.e4bd0f8d.js",
    "revision": "0c18a7b62e2a5c3ee75ffa4d8b3058bb"
  },
  {
    "url": "assets/js/6.c3c5dafd.js",
    "revision": "e4066021cccd5c39fef5bd935950cc34"
  },
  {
    "url": "assets/js/7.7f79409b.js",
    "revision": "f02c304aa5e25806b1e531726717f9b9"
  },
  {
    "url": "assets/js/8.c7a7b37a.js",
    "revision": "509d10f7982693e60ff2d6082a6cebc1"
  },
  {
    "url": "assets/js/9.d323c811.js",
    "revision": "de83becf233ff7141938b7fd981f70eb"
  },
  {
    "url": "assets/js/app.3f70d635.js",
    "revision": "7194d5516dec5c6046a5d25f41252df5"
  },
  {
    "url": "assets/js/vendors~docsearch.024d053c.js",
    "revision": "afd56e3125d9d5f8c5a3eb6c2866c9ae"
  },
  {
    "url": "d3-basic/index.html",
    "revision": "209a653a1c66c578006378515134d4da"
  },
  {
    "url": "d3-basic/joining-data.html",
    "revision": "803bad391c0f89b37031b30844666899"
  },
  {
    "url": "examples/index.html",
    "revision": "c3319f0bcec82ab409b14ab59ca5b9d3"
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
    "revision": "4e2656b925d37329369888a3d2adb423"
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
