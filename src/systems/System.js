export class System {
  #componentRegistry = null
  #resources = null

  constructor(componentRegistry, resources) {
    this.#componentRegistry = componentRegistry
    this.#resources = resources
  }

  get componentRegistry() {
    return this.#componentRegistry
  }

  get resources() {
    return this.#resources
  }
}
