const docsConfig = require('../../src/base/docs-config-resolver')(__dirname + '/../docs-config.yaml')
const { resolveResources } = require('../../src/base/resources-helper')

const resourcesHelper = resolveResources(__dirname + '/../resources.yaml', 'resources')

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
      : {
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: 'd3-sandbox'
      },
    resourcesMap: resourcesHelper.map,
    ...docsConfig,
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
    ['script', { type: 'application/javascript', src: resourcesHelper.map['d3@5'] }],
  ],
  extraWatchFiles: [
    'src'
  ],
  configureWebpack: (config, isServer) => {
    if (!isServer) {
      resourcesHelper.applyToWebpack(config)
    }
  }
}
