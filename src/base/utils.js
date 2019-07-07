const https = require('https')
const fs = require('fs')
const path = require('path')

function download (from, to) {
  return new Promise((resolve, reject) => {
    to = path.normalize(to)

    const dir = path.dirname(to)

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    const file = rejectOnError(fs.createWriteStream(to, {
      flags: 'w+',
      autoClose: true
    }))

    function finish () {
      file.close()
      resolve()
    }
    function rejectOnError (ee) {
      return ee.on('error', reject)
    }

    let followLeft = 3

    let u = new URL(from)

    function followLink (url) {
      return new Promise(resolve => {
        rejectOnError(https.get(url, async (res) => {
          if (res.statusCode >= 400) {
            return reject(res)
          }

          if (res.statusCode === 301 || res.statusCode === 302) {
            followLeft--
            if (followLeft === 0) {
              return reject(new Error('Max follow exceeded.'))
            }

            let location = res.headers['location']

            if (location[0] === '/') {
              location = `${u.protocol}//${u.host}${location}`
            }

            res = await followLink(location)
          }

          resolve(res)
        }))
      })
    }

    followLink(from).then(res => {
      rejectOnError(
        res.pipe(file)
          .on('finish', finish)
          .on('close', finish)
      )
    })
  })
}

module.exports = {
  download
}
