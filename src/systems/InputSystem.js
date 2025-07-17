import { System } from './System.js'
import { Runnable } from '../core/Runnable.js'
import { Keyboard } from './input/Keyboard.js'
import { Pointer } from './input/Pointer.js'

export class InputSystem extends System {
  #runnable = new Runnable()
  #keyboard = new Keyboard()
  #pointer = new Pointer()

  get keyboard() {
    return this.#keyboard
  }

  get pointer() {
    return this.#pointer
  }

  update = () => {
    this.#keyboard.update()
    this.#pointer.update()
  }

  start() {
    if (this.#runnable.start()) {
      this.#keyboard.start()
      this.#pointer.start()
    }
  }

  stop() {
    if (this.#runnable.stop()) {
      this.#keyboard.stop()
      this.#pointer.stop()
    }
  }
}
