<template>
  <div />
</template>

<script>
import { narratorPage } from '../componments/NarratorPage'
import loader from '../../../base/narrator-loader'
import EventEmitter from 'eventemitter3'

export default {
  name: 'NarratorScene',
  props: {
    narrator: {
      type: String,
      required: true
    }
  },
  inject: {
    narratorPage
  },
  async mounted () {
    this.ee = new EventEmitter()
    const narrator = await loader(this.narrator)
    narrator(this.ee)
    this.ee.emit('init')
    this.narratorPage.$on('enter.scene-block', this.onEnter)
    this.narratorPage.$on('exit.scene-block', this.onExit)
  },
  beforeDestroy () {
    this.narratorPage.$off('enter.scene-block', this.onEnter)
    this.narratorPage.$off('exit.scene-block', this.onExit)
  },
  methods: {
    onEnter ({ scene }) {
      this.ee.emit('enter', scene)
    },
    onExit ({ scene }) {
      this.ee.emit('exit', scene)
    }
  }
}
</script>
