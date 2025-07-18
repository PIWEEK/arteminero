export class IndexedGeometry {
  #vertices = []
  #indices = []

  constructor(vertices, indices) {
    this.#vertices = vertices ?? []
    this.#indices = indices ?? []
  }

  get vertices() {
    return this.#vertices
  }

  get indices() {
    return this.#indices
  }

  append(indexedGeometry) {
    const length = this.#vertices.length / 3
    this.#vertices.push(...indexedGeometry.vertices)
    this.#indices.push(...indexedGeometry.indices.map(index => length + index))
  }
}
