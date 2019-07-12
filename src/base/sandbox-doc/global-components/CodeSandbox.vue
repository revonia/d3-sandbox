<template>
  <div class="code-sandbox">
    <div
      v-show="sourcesLoaded"
      class="main-container"
    >
      <div class="toolbar">
        <ul class="actions">
          <li>
            <button
              class="btn tab-btn"
              type="button"
              :class="{active: showPreview}"
              @click="preview"
            >
              Run &amp; Preview
            </button>
          </li><li
            v-for="tab in tabs"
            :key="tab.name"
          >
            <button
              type="button"
              class="tab-btn btn"
              :class="{active: currentTab === tab.name}"
              @click="changeTab(tab.name)"
            >
              {{ tab.name }}
            </button>
          </li>
        </ul>
      </div>
      <div
        class="box"
        :style="{height}"
      >
        <div
          v-show="showEditor"
          class="editor-container"
        >
          <div
            ref="editor"
            class="editor"
          />
        </div>
        <div
          v-show="showPreview"
          class="preview-container"
        >
          <div
            ref="previewBox"
            class="preview-box"
          />
        </div>
        <div
          v-show="loading"
          class="loading"
        >
          <div class="loading-text">
            Loading...
          </div>
        </div>
      </div>
    </div>

    <div
      v-show="!sourcesLoaded"
      ref="sourceContainer"
      class="source-container"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import Sandbox from '../../Sandbox'

export default {
  name: 'CodeSandbox',
  components: {},
  props: {
    tabs: {
      type: Array,
      default: () => [
        { name: 'javascript', selector: '@pre.language-js > code', language: 'javascript' },
        { name: 'css', selector: '@pre.language-css > code', language: 'css' },
        { name: 'html', selector: '@pre.language-html > code', language: 'html' },
        { name: 'dataset.json', selector: '@pre.language-json > code', language: 'javascript', type: 'dataset' },
        { name: 'config.yaml', selector: '@pre.language-yaml > code', language: 'yaml', type: 'config' }
      ]
    },
    previewFirst: {
      type: Boolean,
      default: true
    },
    initialHeight: {
      type: String,
      default: '300px'
    }
  },
  data () {
    return {
      tabData: new Map(),
      currentTab: '',
      sourcesLoaded: false,
      showPreview: false,
      showEditor: false,
      loading: false,
      innerHeight: null
    }
  },
  computed: {
    height () {
      return this.innerHeight === null
        ? this.initialHeight
        : this.innerHeight
    }
  },
  created () {
    this.editor = null // non-reactive data, it is no need observer
    if (!this.$options.beforeDestroy) {
      this.$options.beforeDestroy = []
    }
  },
  async mounted () {
    this.loadSources()

    this.loading = true
    const monaco = await import('../../editor')
    this.renderEditor(monaco)
    if (this.previewFirst) {
      this.preview()
    } else {
      this.changeTab(this.tabs[0].name)
    }
  },
  methods: {
    getTabData (name) {
      if (!this.tabData.has(name)) {
        this.tabData.set(name, {
          source: null,
          state: null,
          model: null
        })
      }
      return this.tabData.get(name)
    },
    loadSources () {
      const slot = this.$refs['sourceContainer']

      this.tabs.forEach(tab => {
        const el = (tab.selector && tab.selector[0] === '@') // // start with @ means query in slot
          ? slot.querySelector(tab.selector.substr(1))
          : document.querySelector(tab.selector)

        if (el) {
          const data = this.getTabData(tab.name)
          data.source = el.textContent
        }
      })

      this.sourcesLoaded = true
    },
    renderEditor ({ monaco }) {
      if (!this.editor) {
        this.loading = true
        const el = this.$refs['editor']

        this.editor = monaco.editor.create(el, { // not a vue data
          theme: 'vs-dark',
          minimap: {
            enabled: false
          }
        })

        this.tabs.forEach(tab => {
          const name = tab.name
          const data = this.getTabData(name)
          data.model = monaco.editor.createModel(data.source, tab.language)
        })

        this.editor.setModel(this.getTabData(this.currentTab).model)

        this.$options.beforeDestroy.push(() => {
          this.editor.dispose()
        })
        this.loading = false
      }
    },
    async changeTab (name) {
      if (name === '') {
        this.showEditor = false
        this.currentTab = ''
        return
      }

      if (this.currentTab) {
        const current = this.getTabData(this.currentTab)
        current.state = this.editor.saveViewState()
      }

      this.currentTab = name

      const data = this.getTabData(name)
      this.editor.setModel(data.model)
      if (data.state !== null) {
        this.editor.restoreViewState(data.state)
      }
      this.showEditor = true
      this.showPreview = false
      await this.$nextTick()

      this.editor.focus()
      this.editor.layout()

      this.loading = false
    },
    async preview () {
      this.loading = true
      const el = this.$refs['previewBox']
      // clean up
      while (el.firstChild) {
        el.removeChild(el.firstChild)
      }

      const frame = document.createElement('iframe')

      let codes = this.tabs.map(tab => {
        return {
          code: this.getTabData(tab.name).model.getValue(),
          type: tab.type || tab.language
        }
      })

      const sandbox = new Sandbox({
        codes,
        resourcesMap: { ...this.$themeConfig.resourcesMap },
        base: this.$site.base,
        lang: this.$lang
      })

      sandbox.attach(frame).then(() => { this.loading = false })

      el.appendChild(frame)
      this.showPreview = true
      this.changeTab('')
    }
  }
}
</script>

<style>
  .code-sandbox {
    margin: 1em 0;
  }
  .box {
    position: relative;
  }

  .main-container {
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid #424242;
    position: relative;
  }

  .loading {
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: white;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .loading > .loading-text {
    margin: auto;
  }

  .editor-container {
    background-color: #1e1e1e;
    height: 100%;

  }

  .toolbar {
    height: 30px;
    background-color: #1e1e1e;
    border-bottom: 2px solid #424242;
  }

  .actions {
    height: 100%;
    padding: 0;
    margin: 0;
    display: inline-block;
    white-space: nowrap;
  }

  .actions > li {
    list-style-type: none;
    display: inline-block;
    height: 100%;
  }

  .tab-btn {
    font-family: Consolas, "Courier New", monospace;
  }

  .tab-btn:hover {
    color: white;
  }

  /*noinspection CssUnusedSymbol*/
  .tab-btn.active {
    background-color: #424242;
  }

  .btn {
    background-color: transparent;
    padding: 0 1em;
    border: none;
    color: #d4d4d4;
    height: 100%;
    min-width: 4em;
    outline: none;
    cursor: pointer;
  }

  .preview-box {
    box-sizing: border-box;
  }

  .preview-box > iframe {
    width: 100%;
    border: none;
  }

  .preview-container,
  .preview-box,
  .preview-box > iframe,
  .editor-container,
  .editor
  {
    height: 100%;
  }
</style>
