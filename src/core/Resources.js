export class Resources {
  #resources = new Map()

  has(path) {
    return this.#resources.has(path)
  }

  set(path, resource) {
    this.#resources.set(path, resource)
    return this
  }

  get(path, resource) {
    return this.#resources.get(path)
  }

  delete(path) {
    this.#resources.delete(path)
    return this
  }
}
