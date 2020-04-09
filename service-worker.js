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
    "revision": "bcd5e1f4fc3bae94573ca7405a2591c6"
  },
  {
    "url": "assets/css/0.styles.239e2ee2.css",
    "revision": "79cf12fa7a3b1e380775077964353bbf"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.e9043f48.js",
    "revision": "f8dd86d4134397e794231611af0b938f"
  },
  {
    "url": "assets/js/10.a65b0452.js",
    "revision": "f682081cd827b3832900ec736b0207e0"
  },
  {
    "url": "assets/js/11.f4a9c22e.js",
    "revision": "cac2a9ffe6ccd3e7bb2a6078021b6fa9"
  },
  {
    "url": "assets/js/12.0a02e2bb.js",
    "revision": "840f9635d3c8715e34337a63f9b2090f"
  },
  {
    "url": "assets/js/13.b4589600.js",
    "revision": "691d97437e9875773f442e6cf5dbfc18"
  },
  {
    "url": "assets/js/14.dbb1ec4b.js",
    "revision": "dcabbb48a4ba89b95d232ac28eef3bad"
  },
  {
    "url": "assets/js/15.3dba9412.js",
    "revision": "345d3ae69b787bd0f80a180928cab44d"
  },
  {
    "url": "assets/js/16.defa0d3a.js",
    "revision": "98d30ef129b9a278c410ca39379aca66"
  },
  {
    "url": "assets/js/17.c3d22253.js",
    "revision": "e49c1cec17dbcb03a69ddcf603781728"
  },
  {
    "url": "assets/js/18.4e6f5e49.js",
    "revision": "8c46dbf3d46409c46c5e069c683d624c"
  },
  {
    "url": "assets/js/19.1a4aa14c.js",
    "revision": "1cc98fe0c38da1a53580ed2bf4cefbed"
  },
  {
    "url": "assets/js/2.5496e02a.js",
    "revision": "028fde3a7dad28e128b790e45186f6a0"
  },
  {
    "url": "assets/js/20.62a68585.js",
    "revision": "883d84f26aa4eaea6958dd5a9516b0e6"
  },
  {
    "url": "assets/js/21.541e044c.js",
    "revision": "9c07348c11e4d3048a54b213112d87e3"
  },
  {
    "url": "assets/js/22.308dc5a8.js",
    "revision": "050bfc69325a53bf9896f728cc9b4138"
  },
  {
    "url": "assets/js/23.9013758a.js",
    "revision": "a177038ce4b611e2fe4229955951bfb8"
  },
  {
    "url": "assets/js/24.b31a872a.js",
    "revision": "52f829272aa1d1e987cc1b4e71d0c8ed"
  },
  {
    "url": "assets/js/25.236578aa.js",
    "revision": "066c8d79ec379c09a90166b3fdd036d0"
  },
  {
    "url": "assets/js/26.7e655bcd.js",
    "revision": "f51c9028a95654c0ed995989775cfaec"
  },
  {
    "url": "assets/js/27.93d21bf6.js",
    "revision": "a2bba20d31e9e97e590e67e350aa02cb"
  },
  {
    "url": "assets/js/28.1e9a3462.js",
    "revision": "b283040bdeb2c6b383cad5c392d9a414"
  },
  {
    "url": "assets/js/29.1bd004d4.js",
    "revision": "bd9ed7080631832e9378430ea05d3a93"
  },
  {
    "url": "assets/js/3.707fccca.js",
    "revision": "ddfe40d0d385b377c78c06e34a8b490d"
  },
  {
    "url": "assets/js/30.46f70516.js",
    "revision": "a157669f9576898bca4eb9e38118abea"
  },
  {
    "url": "assets/js/4.39145365.js",
    "revision": "9116f0b2e16ff0b9cd2a81743f948239"
  },
  {
    "url": "assets/js/5.0f5fb21c.js",
    "revision": "a2a9f9991e7dc9b5ade18063cf7e2aae"
  },
  {
    "url": "assets/js/8.2de15f84.js",
    "revision": "2af6e8a60edc487029f265530595aebd"
  },
  {
    "url": "assets/js/9.8a64b501.js",
    "revision": "00a858dc9d4171661f05d2453e165614"
  },
  {
    "url": "assets/js/app.8a3d28af.js",
    "revision": "115c6d03f3175b980e6ceff9896455c1"
  },
  {
    "url": "assets/js/vendors~docsearch.4762853e.js",
    "revision": "34a2e3528c46d32f158a84e694cbe5b7"
  },
  {
    "url": "d3-basic/digging-deeper-collection-dataset.html",
    "revision": "fc8293fe3d69f07d123f9804033517d2"
  },
  {
    "url": "d3-basic/index.html",
    "revision": "0dc59828a4e8a8eb7d83c8ae21cf4c3d"
  },
  {
    "url": "d3-basic/joining-data.html",
    "revision": "6c0ce12ebc515eb3bb72df28c8320c57"
  },
  {
    "url": "d3-basic/selecting-and-modifying.html",
    "revision": "0ea7b0b7f9f09f46bf47e07523117283"
  },
  {
    "url": "examples/index.html",
    "revision": "2bacc71476e2d61829fe2306d9028383"
  },
  {
    "url": "examples/line-charts.html",
    "revision": "332b48ac9681860c3aa4f023acb20778"
  },
  {
    "url": "examples/world-map-labor-force-total.html",
    "revision": "6c477040884bd59eb7eb44d52cdfde41"
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
    "revision": "556ca806efde094dcd4e9f1f3efe86b5"
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
