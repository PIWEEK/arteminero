import { System } from './System';

export class ResizeSystem extends System {
  #canvas = null
  #resized = false

  constructor(componentRegistry, options) {
    super(componentRegistry)
    this.#canvas = options.canvas
    this.#resized = false
  }

  get canvas() {
    return this.#canvas
  }

  get resized() {
    return this.#resized
  }

  #resize(width, height) {
    this.#resized = false
    if (this.#canvas.width !== width) {
      this.#canvas.width = width
      this.#resized = true
    }
    if (this.#canvas.height !== height) {
      this.#canvas.height = height
      this.#resized = true
    }
  }

  update = () => {
    this.#resize(
      Math.floor(this.#canvas.clientWidth),
      Math.floor(this.#canvas.clientHeight)
    )
  }

  start() {

  }

  stop() {

  }
}
