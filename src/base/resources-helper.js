const yaml = require('js-yaml')
const fs = require('fs')
const DownloadResourcePlugin = require('./download-resource-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const sites = {
  'cdnjs': 'https://cdnjs.cloudflare.com/ajax/libs',
  'unpkg': 'https://unpkg.com',
  'jsdelivr': 'https://cdn.jsdelivr.net'
}

const urls = Object.values(sites)
const siteNames = Object.keys(sites)

function getLocalPathByUrl (url) {
  for (let i = 0; i < urls.length; i++) {
    if (url.indexOf(urls[i]) === 0) {
      return '/' + siteNames[i] + url.substring(urls[i].length)
    }
  }
  return false
}

function toLocalPath (prefix, resourcesMap) {
  return Object.keys(resourcesMap).reduce((ret, key) => {
    ret[key] = '/' + prefix + getLocalPathByUrl(resourcesMap[key])
    return ret
  }, {})
}

function resolveResources (file, outputDir) {
  const resources = yaml.load(fs.readFileSync(file, 'utf-8'))
  let runtime = resources.map

  if (process.env.BUILD_LOCAL) {
    runtime = toLocalPath(outputDir, resources.map)
  }

  function applyToWebpack (config) {
    if (!Array.isArray(config.plugins)) {
      config.plugins = []
    }

    if (Array.isArray(resources.copy)) {
      const copy = resources.copy.map(({ from, to }) => {
        return { from, to: outputDir + '/' + to }
      })

      config.plugins.push(
        new CopyPlugin(copy)
      )
    }

    if (process.env.BUILD_LOCAL) {
      config.plugins.push(new DownloadResourcePlugin({
        map: resources.map,
        outputDir
      }))
    }
  }

  return {
    map: runtime,
    applyToWebpack
  }
}

module.exports = {
  getLocalPathByUrl,
  resolveResources
}
