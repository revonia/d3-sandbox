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
  },
  plugins: {
    '@vuepress/pwa': {
      updatePopup: true,
      serviceWorker: true,
    },
    '@vuepress/register-components': {
      componentsDir: 'src/base/global-components'
    }
  }
}
