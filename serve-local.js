const http = require('http')
const fs = require('fs')

const port = 3000
const base = '/d3-sandbox/'
const dist = '/dist/'
const workDir = process.cwd()
const hostname = 'localhost'

const mineTypes = {
  'js': 'application/javascript',
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'html': 'text/html',
  'svg': 'image/svg+xml',
  'css': 'text/css',
  'json': 'application/json',
  'gif': 'image/gif',
  'ico': 'image/vnd.microsoft.icon'
}

function requestHandler (request, response) {
  const url = request.url
  console.log(url)

  if (url.indexOf(base) !== 0) {
    response.statusCode = 404
    return response.end('Not Found')
  }

  let file = workDir + url.replace(base, dist).split('?')[0]

  if (!fs.existsSync(file)) {
    response.statusCode = 404
    return response.end('Not Found')
  }

  if (fs.lstatSync(file).isDirectory()) {
    file += '/index.html'
  }

  if (!fs.existsSync(file)) {
    response.statusCode = 404
    return response.end('Not Found')
  }

  const type = getMimeType(file)

  if (type) {
    response.setHeader('Content-Type', type)
  }

  const stream = fs.createReadStream(file)

  stream.pipe(response)
}

function getMimeType (file) {
  const part = file.split('.')
  const ext = part[part.length - 1]
  return mineTypes[ext] ? mineTypes[ext] : false
}

const server = http.createServer(requestHandler)

server.listen(port, hostname, (err) => {
  if (err) {
    return console.log('Error: ', err)
  }

  console.log(`Listening on http://${hostname}:${port}${base}`)
})
