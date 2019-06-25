<template>
  <div class="script-editor">
    <div class="preview-box"></div>
    <div class="editor-box">
      <div ref="editor" class="editor"></div>
    </div>
  </div>
</template>

<script>
  import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
  import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
  import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'

  export default {
    name: 'script-editor',
    props: {
      code: {
        type: String,
        default: `console.log('hello')`
      }
    },
    data() {
      return {
        monaco: null
      }
    },
    mounted() {
      const el = this.$refs['editor'];
      this.monaco = monaco.editor.create(el, {
        value: this.code,
        language: "javascript",
        theme: "vs-dark",
        minimap: {
          enabled: false
        }
      })
    },
    beforeDestroy() {
      this.monaco.dispose()
    },
    components: {
    }
  }
</script>

<style>
.editor {
  min-height: 300px;
}
</style>
