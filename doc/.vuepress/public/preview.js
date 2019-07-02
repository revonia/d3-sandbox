var jsonResource = {};
(function () {
  function loadResource (type, content, resolved) {
    return new Promise((resolve, reject) => {
      switch (type) {
        case 'javascript':
          try {
            resolve()
            eval(content)
          } catch (e) {
            const pre = document.createElement('pre')
            pre.appendChild(document.createTextNode(e))
            document.body.insertBefore(pre, document.body.firstChild)
            reject(e)
          }
          break
        case 'css':
          const tag = document.createElement('style')
          tag.innerHTML = content
          document.head.appendChild(tag)
          resolve()
          break
        case 'html':
          document.body.innerHTML = content
          resolve()
          break
        case 'json':
          jsonResource = resolved
          resolve()
          break
        case 'config':
          loadConfig(resolved).then(resolve, reject)
          break
      }
    })

  }

  async function loadConfig (config) {
    if (!config) {
      return;
    }

    if (Array.isArray(config.js)) {
      for (let i = 0; i < config.js.length; i++) {
        let tag = document.createElement('script')
        let promise = new Promise(resolve => {
          tag.onload = resolve
        })
        tag.type = 'application/javascript'
        tag.src = config.js[i]
        document.head.append(tag)
        await promise
      }
    }

    if (Array.isArray(config.css)) {

      for (let i = 0; i < config.css.length; i++) {
        let tag = document.createElement('link')
        let promise = new Promise(resolve => {
          tag.onload = resolve
        })
        tag.rel = 'stylesheet'
        tag.type = 'text/css'
        tag.href = config.css[i]
        document.head.append(tag)
        await promise
      }
    }
  }

  async function load (data) {
    for (let i = 0; i < data.length; i++) {
      await loadResource(data[i].type, data[i].source, data[i].resolved)
    }
  }

  function listener (event) {
    if (Array.isArray(event.data) && event.data.$$scriptEditorResource === true) {
      const order = ['config', 'css', 'html', 'json', 'javascript']
      let data = [...event.data]
      data.sort((a, b) => {
        return order.indexOf(a.type) - order.indexOf(b.type)
      })

      window.removeEventListener('message', listener, false)
      load(data)
    }
  }

  // one time message
  window.addEventListener('message', listener, false)

})()



