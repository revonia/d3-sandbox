const { download } = require('./utils')
const { getLocalPathByUrl } = require('./resources-helper')
const path = require('path')

class DownloadResourceWebpackPlugin {
  constructor ({ outputDir = '/resources', map }) {
    this.outputDir = outputDir
    this.map = map
  }

  apply (compiler) {
    const dest = compiler.options.output.path + '/' + this.outputDir

    compiler.hooks.emit.tapPromise(
      'DownloadResourceWebpackPlugin',
      async () => {
        const keys = Object.keys(this.map)

        for (let i = 0; i < keys.length; i++) {
          const from = this.map[keys[i]]
          const to = path.normalize(dest + '/' + getLocalPathByUrl(from))
          await download(from, to)
        }
      }
    )
  }
}

module.exports = DownloadResourceWebpackPlugin
