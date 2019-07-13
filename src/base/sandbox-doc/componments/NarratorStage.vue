<template>
  <div ref="root" />
</template>

<script>
import EventEmitter from 'eventemitter3'

export default {
  name: 'NarratorStage',
  props: {
    scene: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      lastScene: null
    }
  },
  watch: {
    scene (scene, oldScene) {
      if (!this.ee) {
        return
      }

      if (oldScene !== null) {
        this.ee.emit('exit', oldScene)
        this.lastScene = oldScene
      }

      if (scene !== null) {
        this.ee.emit('enter', scene)
      }
    }
  },
  created () {
    this.ee = null // non-reactive data, it is no need observer
    if (!this.$options.beforeDestroy) {
      this.$options.beforeDestroy = []
    }
  },
  async mounted () {
    const key = this.$frontmatter.stage
    const promises = this.$themeConfig.stagePromises

    if (key && promises[key]) {
      this.ee = new EventEmitter()

      const mod = await promises[key]
      mod.default(this.$refs.root, this.ee)
    }
  }
}
</script>
