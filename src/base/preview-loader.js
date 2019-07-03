function loadResource (win, type, content) {
  const doc = win.document
  return new Promise((resolve, reject) => {
    switch (type) {
      case 'javascript':
        const script = doc.createElement('script')
        script.type = 'application/javascript'
        script.appendChild(doc.createTextNode(content))
        doc.head.appendChild(script)
        resolve()
        break
      case 'css':
        const style = doc.createElement('style')
        style.innerHTML = content
        doc.head.appendChild(style)
        resolve()
        break
      case 'html':
        doc.body.innerHTML = content
        resolve()
        break
      case 'dataset':
        const jsonTag = doc.createElement('script')
        jsonTag.type = 'application/json'
        jsonTag.id = 'dataset'
        jsonTag.appendChild(doc.createTextNode(content))
        doc.head.appendChild(jsonTag)
        resolve()
        break
      case 'config':
        loadConfig(win, content).then(resolve, reject)
        break
    }
  })
}

async function loadConfig (win, config) {
  const doc = win.document
  if (!config) {
    return
  }

  if (Array.isArray(config.js)) {
    for (let i = 0; i < config.js.length; i++) {
      let tag = doc.createElement('script')
      let promise = new Promise(resolve => {
        tag.onload = resolve
      })
      tag.type = 'application/javascript'
      tag.src = config.js[i]
      doc.head.append(tag)
      await promise
    }
  }

  if (Array.isArray(config.css)) {
    for (let i = 0; i < config.css.length; i++) {
      let tag = doc.createElement('link')
      let promise = new Promise(resolve => {
        tag.onload = resolve
      })
      tag.rel = 'stylesheet'
      tag.type = 'text/css'
      tag.href = config.css[i]
      doc.head.append(tag)
      await promise
    }
  }
}

async function load (win, resource) {
  const order = ['config', 'css', 'html', 'json', 'javascript']
  let data = [...resource]
  data.sort((a, b) => {
    return order.indexOf(a.type) - order.indexOf(b.type)
  })

  for (let i = 0; i < data.length; i++) {
    await loadResource(win, data[i].type, data[i].content)
  }
}

const iframeSrc = `javascript: '
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Preview</title>
</head>
<body>
</body>
</html>'`.replace(/\n/g, '')

export {
  load,
  iframeSrc
}
