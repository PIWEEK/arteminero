export class IndexedGeometry {
  #vertices = null
  #indices = null

  constructor(vertices, indices) {
    this.#vertices = new Float32Array(vertices)
    this.#indices = new Uint32Array(indices)
  }

  get vertices() {
    return this.#vertices
  }

  get indices() {
    return this.#indices
  }
}
