class SceneManager {
  constructor () {
    this.scenes = new Map()
    this.exits = new Map()
    this.currentScene = null
  }

  applyEmitter (emitter) {
    emitter.on('enter', scene => {
      if (this.exits.has(this.currentScene)) {
        this.exits.get(this.currentScene)()
        this.exits.delete(this.currentScene)
      }

      if (this.scenes.has(scene)) {
        const exit = this.scenes.get(scene)()
        this.exits.set(scene, exit)
        this.currentScene = scene
      }
    })

    emitter.on('exit', scene => {
      if (this.exits.has(scene)) {
        this.exits.get(scene)()
        this.exits.delete(scene)
      }
    })
  }
}

export default SceneManager
