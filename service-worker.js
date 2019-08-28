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
    "revision": "21bc31287095c67cf0bf93a3826740d1"
  },
  {
    "url": "assets/css/0.styles.703e35be.css",
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
    "url": "assets/js/11.57c528ec.js",
    "revision": "051544bddbd47621a04db4d80cc769c4"
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
    "url": "assets/js/14.4d452f30.js",
    "revision": "e7ed86102e5c181332e8541f9bdbedfd"
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
    "url": "assets/js/17.0cf59fcc.js",
    "revision": "2f0d816685e098344de53aaba4ed5c96"
  },
  {
    "url": "assets/js/18.43714569.js",
    "revision": "725365c850f300b6d685657d04419f25"
  },
  {
    "url": "assets/js/19.5a6b5faa.js",
    "revision": "4f73d10a18c49a523935fdacf8f9e3c1"
  },
  {
    "url": "assets/js/2.5496e02a.js",
    "revision": "028fde3a7dad28e128b790e45186f6a0"
  },
  {
    "url": "assets/js/20.95d54482.js",
    "revision": "06c5bffdd8447f8dfefe9d231d1cd21c"
  },
  {
    "url": "assets/js/21.b9101eb5.js",
    "revision": "465c94e744d724e27555c85781da650b"
  },
  {
    "url": "assets/js/22.5dc59c83.js",
    "revision": "981fade8ed6234aff206c857a425dc84"
  },
  {
    "url": "assets/js/23.e8fdc5d4.js",
    "revision": "94445dc0380928207d6176f6d950e98d"
  },
  {
    "url": "assets/js/24.2611d344.js",
    "revision": "1c278f0b569c9535efa7190c3b776547"
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
    "revision": "f3f4732e3e7636b811428232b459044a"
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
    "revision": "47b1b5dd9a7580718eaa57d90c0a9479"
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
    "revision": "3de96120af33ad68ff5f8aafca859a3d"
  },
  {
    "url": "assets/js/9.8a64b501.js",
    "revision": "00a858dc9d4171661f05d2453e165614"
  },
  {
    "url": "assets/js/app.1222e876.js",
    "revision": "7b7b070f6c439bd75a0d23461e9c2786"
  },
  {
    "url": "assets/js/vendors~docsearch.4762853e.js",
    "revision": "34a2e3528c46d32f158a84e694cbe5b7"
  },
  {
    "url": "d3-basic/digging-deeper-collection-dataset.html",
    "revision": "45031be523900aae8d813f1d5bbc6eff"
  },
  {
    "url": "d3-basic/index.html",
    "revision": "3f4074ab9e614781695ac711d79063ca"
  },
  {
    "url": "d3-basic/joining-data.html",
    "revision": "2e510cb23b3b9022f0b226040201e7d3"
  },
  {
    "url": "d3-basic/selecting-and-modifying.html",
    "revision": "bd302e961303f84d891dc0d64f8c121c"
  },
  {
    "url": "examples/index.html",
    "revision": "1f987e7b1f6457f81a3eb97edd4fe176"
  },
  {
    "url": "examples/line-charts.html",
    "revision": "9374184b719b9e7ff53648b1d9e0e74b"
  },
  {
    "url": "examples/world-map-labor-force-total.html",
    "revision": "60914f50188974245c3d0796e9969724"
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
    "revision": "113c40abc260cf796f5e3e23c9e2a584"
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
