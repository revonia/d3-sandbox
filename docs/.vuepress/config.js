const docsConfig = require('../../src/base/docs-config-resolver')(__dirname + '/../docs-config.yaml')

const d3Script = docsConfig.resourcesMap['d3@5'].replace(/^\/d3-sandbox/, '')

module.exports = {
  title: 'D3 Sandbox',
  description: 'Play with D3.js',
  base: '/d3-sandbox/',
  dest: 'dist',
  markdown: {
    lineNumbers: true
  },
  locales: {
    '/': {
      lang: 'zh-CN'
    },
    // '/en/': {
    //   lang: 'en-Us'
    // }
  },
  themeConfig: {
    lastUpdated: true,
    repo: 'revonia/d3-sandbox',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    algolia: process.env.ALGOLIA_API_KEY == null
      ? {}
      :{
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: 'd3-sandbox'
      },
    ...docsConfig
  },
  plugins: {
    '@vuepress/pwa': {
      updatePopup: true,
      serviceWorker: true,
    },
    '@vuepress/register-components': {
      componentsDir: 'src/base/global-components'
    },
    '@vssue/vuepress-plugin-vssue': {
      platform: 'github',
      owner: 'revonia',
      repo: 'd3-sandbox',
      clientId: process.env.OAUTH_CLIENT_ID || 'id',
      clientSecret: process.env.OAUTH_CLIENT_SECRET || 'secret',
    },
  },
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon', }],
    ['link', { rel: 'icon', href: '/images/icon/d3-sandbox192.png', }],
    ['link', { rel: 'manifest', href: '/manifest.json', type: 'application/manifest+json' }],
    ['script', { type: 'application/javascript', src: d3Script }],
  ],
  extraWatchFiles: [
    'src'
  ],
  configureWebpack: (config, isServer) => {
    if (!Array.isArray(config.plugins)) {
      config.plugins = []
    }

    if (!isServer) {
    }
  }
}
