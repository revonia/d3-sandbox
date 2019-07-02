<template>
  <div class="script-editor">
    <div
      v-show="sourcesLoaded"
      class="main-container"
    >
      <div
        v-show="previewLoaded"
        ref="previewBox"
        class="preview-box"
      />
      <div class="editor-box">
        <div class="editor-toolbar">
          <ul class="editor-actions">
            <li
              v-for="tab in tabs"
              :key="tab.name"
            >
              <button
                type="button"
                class="editor-tab editor-btn"
                :class="{active: currentTab === tab.name}"
                @click="changeTab(tab)"
              >
                {{ tab.name }}
              </button>
            </li>
          </ul>
          <ul class="editor-actions">
            <li>
              <button
                class="editor-btn primary"
                type="button"
                @click="preview"
              >
                RUN &gt;
              </button>
            </li>
          </ul>
        </div>
        <div class="editor-container">
          <div
            v-show="!editorLoaded"
            class="editor-loading"
          >
            Loading editor...
          </div>
          <div
            ref="editor"
            class="editor"
          />
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
import * as yaml from 'js-yaml'

export default {
  name: 'ScriptEditor',
  components: {},
  props: {
    tabs: {
      type: Array,
      default: () => [
        { name: 'javascript', selector: '@pre.language-js > code', language: 'javascript' },
        { name: 'css', selector: '@pre.language-css > code', language: 'css' },
        { name: 'html', selector: '@pre.language-html > code', language: 'html' },
        { name: 'json', selector: '@pre.language-json > code', language: 'json' },
        { name: 'config.yaml', selector: '@pre.language-yaml > code', language: 'yaml', type: 'config' }
      ]
    }
  },
  data () {
    return {
      tabData: new Map(),
      editor: null,
      frameSrc: '',
      previewLoaded: false,
      currentTab: '',
      sourcesLoaded: false,
      editorLoaded: false
    }
  },
  created () {
    if (!this.$options.beforeDestroy) {
      this.$options.beforeDestroy = []
    }
  },
  mounted () {
    this.loadSources()
    import('./editor').then(monaco => this.renderEditor(monaco))
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
          if (this.currentTab === '') {
            this.currentTab = tab.name
          }
        }
      })

      this.sourcesLoaded = true
    },
    renderEditor ({ monaco }) {
      if (!this.editor) {
        const el = this.$refs['editor']

        this.editor = monaco.editor.create(el, {
          theme: 'vs-dark',
          minimap: {
            enabled: false
          }
        })

        this.tabs.forEach(tab => {
          const name = tab.name
          const data = this.getTabData(name)
          data.model = monaco.editor.createModel(data.source, tab.language, name)
          data.model.onDidChangeContent(() => {
            data.source = data.model.getValue()
          })
        })

        this.$nextTick(() => {
          this.editor.setModel(this.getTabData(this.currentTab).model)
        })

        this.$options.beforeDestroy.push(() => {
          this.editor.dispose()
        })

        this.editorLoaded = true
      }
    },
    changeTab (tab) {
      const current = this.getTabData(this.currentTab)
      const data = this.getTabData(tab.name)

      current.state = this.editor.saveViewState()
      this.currentTab = tab.name

      this.editor.setModel(data.model)
      if (data.state !== null) {
        this.editor.restoreViewState(data.state)
      }
      this.editor.focus()
    },
    preview () {
      const el = this.$refs['previewBox']
      // clean up
      while (el.firstChild) {
        el.removeChild(el.firstChild)
      }

      const frame = document.createElement('iframe')

      let sources = this.tabs.map(tab => {
        const item = {
          source: this.getTabData(tab.name).source,
          type: tab.type || tab.language,
          resolved: null
        }
        switch (tab.language) {
          case 'yaml':
            item.resolved = yaml.safeLoad(item.source)
            break
          case 'json':
            item.resolved = JSON.parse(item.source)
            break
        }

        return item
      })

      sources.$$scriptEditorResource = true

      frame.onload = function () {
        frame.contentWindow.postMessage(sources, '/')
      }
      frame.src = this.$withBase('/preview.html')

      el.appendChild(frame)
      this.previewLoaded = true
    }
  }
}
</script>

<style>
  .main-container {
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid #424242;
  }

  .editor-loading {
    padding: 10px;
    text-align: center;
    vertical-align: center;
    color: #d4d4d4;
    position: absolute;
    width: 100%;
  }

  .editor-container {
    background-color: #1e1e1e;
    position: relative;
  }

  .editor {
    min-height: 300px;
  }

  .editor-toolbar {
    height: 40px;
    background-color: #1e1e1e;
    border-bottom: 2px solid #424242;
    display: flex;
    justify-content: space-between;
  }

  .editor-actions {
    height: 40px;
    padding: 0;
    margin: 0;
    display: inline-block;
  }

  .editor-actions > li {
    list-style-type: none;
    display: inline-block;
    height: 100%;
  }

  .editor-tab {
    font-family: Consolas, "Courier New", monospace;
  }

  .editor-tab:hover {
    color: white;
  }

  .editor-tab.active {
    background-color: #424242;
  }

  .editor-btn {
    background-color: transparent;
    padding: 0 1em;
    border: none;
    color: #d4d4d4;
    height: 100%;
    min-width: 4em;
    outline: none;
    cursor: pointer;
  }

  .editor-btn.primary:hover {
    background-color: #007acc;
    color: white;
  }

  .preview-box {
    box-sizing: border-box;
    height: 300px;
  }

  .preview-box > iframe {
    width: 100%;
    border: none;
    height: 100%;
  }

</style>
