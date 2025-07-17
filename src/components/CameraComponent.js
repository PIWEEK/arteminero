import { Mat4 } from 'gl-matrix'
import { Component } from '../core/components/Component.js'
import { PerspectiveProjection } from './camera/PerspectiveProjection.js'

export class CameraComponent extends Component {
  #projection = null

  // View Matrix
  #matrix = new Mat4()

  constructor(id, init) {
    super(id)
    this.#projection = init?.projection ?? new PerspectiveProjection()
  }

  get matrix() {
    return this.#matrix
  }

  get projection() {
    return this.#projection
  }
}
