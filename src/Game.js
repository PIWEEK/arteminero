import { ComponentRegistry } from './core/components/ComponentRegistry.js'
import { Loop } from './core/Loop.js'
import { Runnable } from './core/Runnable.js'
import { Resources } from './core/Resources.js'
import { InputSystem } from './systems/InputSystem.js'
import { SchedulerSystem } from './systems/SchedulerSystem.js'
import { AudioSystem } from './systems/AudioSystem.js'
import { ResizeSystem } from './systems/ResizeSystem.js'
import { RenderSystem } from './systems/RenderSystem.js'

export class Game {
  #componentRegistry = new ComponentRegistry()
  #systems = null
  #pipeline = null
  #loop = null
  #runnable = new Runnable()
  #resources = new Resources()

  constructor(options) {
    this.#systems = {
      resize: new ResizeSystem(this.componentRegistry, {
        canvas: options?.canvas
      }),
      input: new InputSystem(this.#componentRegistry),
      scheduler: new SchedulerSystem(this.#componentRegistry),
      audio: new AudioSystem(this.#componentRegistry),
      render: new RenderSystem(this.#componentRegistry, this.#resources, {
        canvas: options?.canvas
      })
    }
    this.#pipeline = Object.values(this.#systems).map((system) => system.update)
    this.#loop = new Loop({
      pipeline: this.#pipeline
    })
  }

  get resources() {
    return this.#resources
  }

  get componentRegistry() {
    return this.#componentRegistry
  }

  get systems() {
    return this.#systems
  }

  start() {
    if (this.#runnable.start()) {
      Object.values(this.#systems).forEach((system) => system.start())
      this.#loop.start()
    }
  }

  stop() {
    if (this.#runnable.stop()) {
      Object.values(this.#systems).forEach((system) => system.stop())
      this.#loop.stop()
    }
  }
}
