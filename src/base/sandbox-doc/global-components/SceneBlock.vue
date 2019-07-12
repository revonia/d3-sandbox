<template>
  <div
    ref="block"
    class="scene-block"
    :data-scene-block-name="name"
  >
    <slot />
  </div>
</template>

<script>

import { narratorPage } from '../componments/NarratorPage'

const listenFlag = {}
const sceneMap = new Map()

function onScroll () {
  const header = document.querySelector('header')
  const topPad = header ? header.offsetHeight : 0

  for (let [, opt] of sceneMap) {
    const { top, bottom } = opt.block.getBoundingClientRect()
    if (bottom - topPad <= 0 || top - topPad > 0) {
      opt.outView()
    } else {
      opt.inView()
    }
  }
}

function attach (name, block, inView, outView) {
  if (document['$$sceneBlockListen'] !== listenFlag) {
    document.addEventListener('scroll', onScroll)
  }
  sceneMap.set(name, {
    name: name,
    inView,
    outView,
    block
  })
}

function detach (name) {
  sceneMap.delete(name)
  if (sceneMap.size === 0) {
    document.removeEventListener('scroll', onScroll)
  }
}

export default {
  name: 'SceneBlock',
  inject: {
    narratorPage
  },
  props: {
    name: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      entered: false
    }
  },
  mounted () {
    attach(this.name, this.$refs.block, this.inView, this.outView)
  },
  beforeDestroy () {
    detach(this.name)
  },
  methods: {
    inView () {
      if (!this.narratorPage) {
        return
      }

      if (!this.entered) {
        this.entered = true
        this.narratorPage.$emit('enter.scene-block', {
          scene: this.name
        })
      }
    },
    outView () {
      if (!this.narratorPage) {
        return
      }

      if (this.entered) {
        this.entered = false
        this.narratorPage.$emit('exit.scene-block', {
          scene: this.name
        })
      }
    }
  }
}
</script>

<style>
  /*noinspection CssUnusedSymbol*/
  .theme-default-content .scene-block:last-child {
    min-height: 90vh;
  }
</style>
