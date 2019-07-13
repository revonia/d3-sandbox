<template>
  <div
    ref="block"
    class="scene-block"
    :style="style"
    :data-scene-block-name="name"
  >
    <slot />
  </div>
</template>

<script>

import { narratorPage } from '../componments/NarratorPage'
import { debounce } from 'lodash'

const listenFlag = Symbol('sceneBlockListen')
const sceneMap = new Map()

const onScroll = debounce(() => {
  const header = document.querySelector('header')
  const topPad = header ? header.offsetHeight : 0

  for (let [, update] of sceneMap) {
    update(topPad)
  }
})

function attach (name, update) {
  if (document[listenFlag] !== true) {
    document.addEventListener('scroll', onScroll)
    document[listenFlag] = true
  }

  sceneMap.set(name, update)
}

function detach (name) {
  sceneMap.delete(name)
  if (sceneMap.size === 0) {
    document.removeEventListener('scroll', onScroll)
    document[listenFlag] = false
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
    },
    vh: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      entered: false
    }
  },
  computed: {
    style () {
      if (this.vh) {
        return { minHeight: this.vh + 'vh' }
      }
      return null
    }
  },
  mounted () {
    attach(this.name, this.updateState)
  },
  beforeDestroy () {
    detach(this.name)
  },
  methods: {
    updateState (topPad) {
      if (!this.narratorPage) {
        return
      }
      const { top, bottom } = this.$refs.block.getBoundingClientRect()

      const enter = bottom - topPad > 0 && top - topPad < 0

      if (enter !== this.entered) {
        this.entered = enter
        this.narratorPage.$emit(`scene-block-transit`, {
          scene: this.name,
          enter
        })
      }
    }
  }
}
</script>

<style>
  /*noinspection CssUnusedSymbol*/
  .scene-block.full-height {
    min-height: 90vh;
  }
</style>
