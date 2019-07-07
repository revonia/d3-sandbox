import * as yaml from 'js-yaml'

class Sandbox {
  /**
   * @param options
   */
  constructor (options) {
    this.win = null
    this.dataset = null
    this.options = {
      base: '/',
      resourcesMap: {},
      codes: [],
      lang: '',
      ...options
    }

    const order = Sandbox.loadingOrder
    this.options.codes.sort((a, b) => {
      return order.indexOf(a.type) - order.indexOf(b.type)
    })

    this.resolvedConfig = null
    this.attached = false
  }

  /**
   * yaml text to resolved object
   * @param text
   * @returns {*}
   * @private
   */
  _loadConfigYaml (text) {
    const SandboxConfigResourceYamlType = new yaml.Type('!resource', {
      kind: 'scalar',
      construct: name => this.options.resourcesMap[name] || name
    })

    const schema = yaml.Schema.create([
      SandboxConfigResourceYamlType
    ])

    return yaml.load(text, { schema })
  }

  /**
   * @returns {Promise<void>}
   * @private
   */
  async _applyConfig () {
    if (this.attached) {
      return
    }

    const config = this.getConfig()

    const doc = this.win.document

    if (Array.isArray(config.js)) {
      for (let i = 0; i < config.js.length; i++) {
        let tag = doc.createElement('script')
        let promise = new Promise(resolve => {
          tag.onload = resolve
        })
        tag.type = 'application/javascript'
        tag.src = this.withBase(config.js[i])
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
        tag.href = this.withBase(config.css[i])
        doc.head.append(tag)
        await promise
      }
    }

    this.configApplied = true
  }

  /**
   * @param {string} type
   * @param {string} code
   * @returns {Promise<void>}
   * @private
   */
  _loadCode (type, code) {
    const doc = this.win.document
    return new Promise(resolve => {
      switch (type) {
        case 'javascript':
          const script = doc.createElement('script')
          script.type = 'application/javascript'
          script.appendChild(doc.createTextNode(code))
          doc.head.appendChild(script)
          resolve()
          break
        case 'css':
          const style = doc.createElement('style')
          style.innerHTML = code
          doc.head.appendChild(style)
          resolve()
          break
        case 'html':
          doc.body.innerHTML = code
          resolve()
          break
        case 'dataset':
          try {
            this.dataset = JSON.parse(code)
          } catch (e) {}
          resolve()
          break
        default:
          resolve()
      }
    })
  }

  getResource (key) {
    return this.withBase(this.options.resourcesMap[key])
  }

  getDataset () {
    return this.dataset
  }

  /**
   * @param {string} path
   * @returns {string}
   */
  withBase (path) {
    return path[0] === '/'
      ? this.options.base + path.slice(1)
      : path
  }

  /**
   * @returns {object}
   */
  getConfig () {
    if (!this.resolvedConfig) {
      this.resolvedConfig = {}

      let text = null

      for (let i = 0; i < this.options.codes.length; i++) {
        if (this.options.codes[i].type === 'config') {
          text = this.options.codes[i].code
        }
      }

      if (text != null) {
        this.resolvedConfig = this._loadConfigYaml(text)
      }
    }
    return this.resolvedConfig
  }

  /**
   * @param {HTMLIFrameElement} iframe
   * @returns {Promise<Window>}
   */
  attach (iframe) {
    if (this.attached) {
      return
    }

    return new Promise(resolve => {
      iframe.onload = async () => {
        this.win = iframe.contentWindow

        this.win.$sandbox = this
        await this._applyConfig()

        const codes = this.options.codes

        for (let i = 0; i < codes.length; i++) {
          await this._loadCode(codes[i].type, codes[i].code)
        }

        this.attached = true
        resolve(this.win)
      }

      iframe.src = this.iframeTemplate()
    })
  }

  iframeTemplate () {
    return `javascript: '
<!DOCTYPE html>
<html lang="${this.options.lang}">
<head>
  <meta charset="UTF-8">
  <title>Preview</title>
</head>
<body>
</body>
</html>'`.replace(/\n/g, '')
  }
}

Sandbox.loadingOrder = ['config', 'css', 'html', 'json', 'javascript']

export default Sandbox
