import { Runnable } from '../../core/Runnable'

export class Keyboard {
  #target = null
  #keys = new Map()
  #runnable = new Runnable()

  constructor(options) {
    this.#target = options?.target ?? globalThis
  }

  #onKey = (e) => {
    this.#keys.set(e.code, e.type === 'keydown' ? 1.0 : 0.0)
  }

  stateOf(code) {
    return this.#keys.get(code) ?? 0.0
  }

  isPressed(code) {
    return this.stateOf(code) > 0.0
  }

  isReleased(code) {
    return !this.isPressed(code)
  }

  update() {

  }

  start() {
    if (this.#runnable.start()) {
      this.#target.addEventListener('keyup', this.#onKey)
      this.#target.addEventListener('keydown', this.#onKey)
    }
  }

  stop() {
    if (this.#runnable.stop()) {
      this.#target.removeEventListener('keyup', this.#onKey)
      this.#target.removeEventListener('keydown', this.#onKey)
    }
  }
}
