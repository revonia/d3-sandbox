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
    "revision": "c7f845474b3d22157ceecc82e512c8d1"
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
    "url": "assets/js/1.65ff3d3c.js",
    "revision": "7d208c6ec2bf87b146d1e7187dd19606"
  },
  {
    "url": "assets/js/10.2f3d57c0.js",
    "revision": "aeaa608b300e0b299427ac7e059b5ed2"
  },
  {
    "url": "assets/js/11.5b0c8744.js",
    "revision": "8567a7d9ce1a9895a1619520377b88e9"
  },
  {
    "url": "assets/js/12.51f903ca.js",
    "revision": "a0550da57849515e34b08757e33f1211"
  },
  {
    "url": "assets/js/13.68f3e44c.js",
    "revision": "73a02845b378f2c1143f91a7fed8fd43"
  },
  {
    "url": "assets/js/14.0c9b7daa.js",
    "revision": "d42b6a3718e0b83e6595c0085283a195"
  },
  {
    "url": "assets/js/15.c12f61db.js",
    "revision": "bbc4350a3c1e0762d9bcee5566f05ce3"
  },
  {
    "url": "assets/js/16.c92dc96d.js",
    "revision": "f08aad054e7fb3d1ee25dcfae3621a40"
  },
  {
    "url": "assets/js/17.a68745de.js",
    "revision": "5768a97563a45f96ad501cfb28f769db"
  },
  {
    "url": "assets/js/18.20565583.js",
    "revision": "bb01a243d8d1531a2d08976cfc1ce645"
  },
  {
    "url": "assets/js/19.59da11d0.js",
    "revision": "55f4e2c7d96bf411e00d5447b04bf9a9"
  },
  {
    "url": "assets/js/20.11501d49.js",
    "revision": "d6bfb3863fbc269290f7e0374766a76a"
  },
  {
    "url": "assets/js/21.0e4c6314.js",
    "revision": "47757f06383acf84494abbe840ec90f8"
  },
  {
    "url": "assets/js/4.db19fd0b.js",
    "revision": "2c4895e9ac3edfffda248be4bf0031f6"
  },
  {
    "url": "assets/js/5.100b37c7.js",
    "revision": "8e3753f298b15962aa345292a8557c71"
  },
  {
    "url": "assets/js/6.bcd474c3.js",
    "revision": "a2e7ee5cb9a95306a521975a84e224f9"
  },
  {
    "url": "assets/js/7.1dc18bcb.js",
    "revision": "27570f6f68402df2234c53ebdfee7878"
  },
  {
    "url": "assets/js/8.04d87d89.js",
    "revision": "05309045b899edea0e138b8bb3ea5de4"
  },
  {
    "url": "assets/js/9.90f7854d.js",
    "revision": "7f9f07ffc91a981a8b1eea72f8f389a5"
  },
  {
    "url": "assets/js/app.b322673b.js",
    "revision": "94c396a34c3fa3e277eda81651d0bc94"
  },
  {
    "url": "assets/js/vendors~docsearch.c5c54aa7.js",
    "revision": "b499d6183058c68c5729f80db94fa535"
  },
  {
    "url": "d3-basic/index.html",
    "revision": "7eb47118da11669b81e62d436fc73377"
  },
  {
    "url": "d3-basic/joining-data.html",
    "revision": "64eba836a3f2b04d810ade5169f703da"
  },
  {
    "url": "d3-basic/selecting-and-modifying.html",
    "revision": "edcfa22916f989325503b888fb2c3724"
  },
  {
    "url": "examples/index.html",
    "revision": "1dbe06c11f3dc9bf511150979a7994cf"
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
    "revision": "5793a52cc78759d7dfff33a3eba9df38"
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
