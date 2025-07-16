import { Runnable } from './Runnable.js'

export class Loop {
  #runnable = new Runnable()
  #pipeline = []
  #context = {}
  #requestId
  #delegates = null

  constructor(options) {
    this.#context = options?.context ?? {}
    this.#pipeline = options?.pipeline ?? []
    this.#delegates = {
      request: options?.requestDelegate ?? globalThis?.requestAnimationFrame ?? globalThis?.setTimeout,
      cancel: options?.cancelDelegate ?? globalThis?.cancelAnimationFrame ?? globalThis?.setTimeout
    }
  }

  get isRunning() {
    return this.#runnable.isRunning
  }

  #onStep = (time) => {
    this.#pipeline.forEach((step) => step(time, this.#context))
    this.#request()
  }

  #request = () => {
    this.#requestId = this.#delegates.request.call(null, this.#onStep)
  }

  #cancel = () => {
    this.#delegates.cancel.call(null, this.#requestId)
  }

  start() {
    if (this.#runnable.start()) {
      this.#request()
    }
  }

  stop() {
    if (this.#runnable.stop()) {
      this.#cancel()
    }
  }
}
