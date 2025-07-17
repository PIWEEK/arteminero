import { Mat4 } from 'gl-matrix'
import { Updatable } from '../../core/Updatable'

export class PerspectiveProjection {
  #matrix = new Mat4()

  #aspectRatio = 1.0

  #fieldOfView = Math.PI / 4

  #near = 0.01

  #far = 100.0

  #updatable = new Updatable(true)

  get needsUpdate() {
    return this.#updatable.needsUpdate
  }

  get matrix() {
    return this.#matrix
  }

  get aspectRatio() {
    return this.#aspectRatio
  }

  set aspectRatio(value) {
    this.#aspectRatio = value
    this.#updatable.set()
  }

  get fieldOfView() {
    return this.#fieldOfView
  }

  set fieldOfView(value) {
    this.#fieldOfView = value
    this.#updatable.set()
  }

  get near() {
    return this.#near
  }

  set near(value) {
    this.#near = value
    this.#updatable.set()
  }

  get far() {
    return this.#far
  }

  set far(value) {
    this.#far = value
    this.#updatable.set()
  }

  update() {
    this.#matrix.perspectiveNO(this.#fieldOfView, this.#aspectRatio, this.#near, this.#far)
  }
}
