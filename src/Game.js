import { Loop } from './core/Loop.js'
import { Runnable } from './core/Runnable.js'

export class Game {
  #pipeline = [
    (t) => console.log('Hola', t)
  ]
  #loop = new Loop({
    pipeline: this.#pipeline
  })
  #runnable = new Runnable()

  constructor() {

  }

  start() {
    if (this.#runnable.start()) {
      this.#loop.start()
    }
  }

  stop() {
    if (this.#runnable.stop()) {
      this.#loop.stop()
    }
  }
}
