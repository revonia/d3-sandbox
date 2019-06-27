<template>
  <div class="script-editor">
    <div
      v-show="previewLoaded"
      ref="previewBox"
      class="preview-box"
    />
    <div class="editor-box">
      <ul class="editor-tabs">
        <li
          v-for="tab in tabs"
          :key="tab.name"
        >
          <button
            type="button"
            class="editor-tab"
            :class="{active: currentTab === tab.name}"
            @click="changeTab(tab)"
          >
            {{ tab.name }}
          </button>
        </li>
        <li>
          <button
            type="button"
            @click="preview"
          >
            RUN
          </button>
        </li>
      </ul>
      <div
        ref="editor"
        class="editor"
      />
    </div>
    <div
      v-show="!sourcesRead"
      ref="sourceContainer"
      class="source-container"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
import 'monaco-editor/esm/vs/basic-languages/css/css.contribution'
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution'
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'

export default {
  name: 'ScriptEditor',
  components: {},
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    languageMap: {
      type: Object,
      default () {
        return {
          'js': 'javascript',
          'css': 'css',
          'html': 'html',
          'json': 'javascript'
        }
      }
    }
  },
  data () {
    return {
      editor: null,
      source: '',
      frameSrc: '',
      beforeDestroyCallback: [],
      previewLoaded: false,
      sources: {},
      currentTab: '',
      sourcesRead: false,
      enabledTabs: ['js', 'json', 'html', 'css'],
      tabs: [],
      tabsIndex: {}
    }
  },
  mounted () {
    this.readSources()
    this.buildTabs()
    this.renderEditor()
  },
  beforeDestroy () {
    this.beforeDestroyCallback.forEach(callback => callback())
  },
  methods: {
    buildTabs () {
      let index = {}

      this.enabledTabs.forEach(name => {
        if (typeof this.sources[name] !== 'undefined') {
          const tab = { name, state: null, model: null }
          this.tabs.push(tab)
          index[name] = tab
        }
      })

      this.tabsIndex = index
    },
    readSources () {
      const sources = this.enabledTabs.reduce((sources, lang) => {
        const codeEl = this.$refs['sourceContainer'].querySelector(`pre.language-${lang} > code`)
        if (codeEl) {
          sources[lang] = codeEl.textContent
        }
        return sources
      }, {})

      for (let i = 0; i < this.enabledTabs.length; i++) {
        let name = this.enabledTabs[i]
        if (typeof sources[name] !== 'undefined') {
          this.currentTab = name
          break
        }
      }

      this.sources = sources
      this.sourcesRead = true
    },
    renderEditor () {
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
          tab.model = monaco.editor.createModel(this.sources[name], this.languageMap[name], name)
        })

        this.editor.setModel(this.tabsIndex[this.currentTab].model)

        this.beforeDestroyCallback.push(() => {
          this.editor.dispose()
        })
      }
    },
    changeTab (tab) {
      const currentTab = this.tabsIndex[this.currentTab]

      currentTab.state = this.editor.saveViewState()
      this.currentTab = tab.name

      this.editor.setModel(tab.model)
      if (tab.state !== null) {
        this.editor.restoreViewState(tab.state)
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
      let sources = Object.assign({}, this.sources)
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

  .script-editor {
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid #424242;
  }
  .editor {
    min-height: 300px;
  }

  .editor-tabs {
    padding: 0;
    margin: 0;
    background-color: #1e1e1e;
    border-bottom: 2px solid #424242;
  }

  .editor-tabs > li {
    list-style-type: none;
    display: inline-block;
  }

  .editor-tab {
    background-color: #1e1e1e;
    padding: 0;
    border: none;
    color: #d4d4d4;
    height: 3em;
    cursor: pointer;
    min-width: 4em;
    font-family: Consolas, "Courier New", monospace;
    outline: none;
  }
  .editor-tab:hover {
    color: white;
  }

  .editor-tab.active {
    background-color: #424242;
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
