export class ComponentMapArray {
  #map = new Map()

  find(key) {
    if (!this.#map.has(key)) {
      return []
    }
    return this.#map.get(key)
  }

  add(key, value) {
    if (!this.#map.has(key)) {
      this.#map.set(key, new Array())
    }
    const list = this.#map.get(key)
    list.push(value)
  }

  delete(key, value) {
    if (!this.#map.has(key)) {
      return false
    }
    const list = this.#map.get(key)
    const index = list.indexOf(value)
    if (index < 0) {
      return false
    }
    const [_] = list.splice(index, 1)
    return true
  }
}

export class ComponentRegistry {
  static getPrototypeChainOf(object) {
    return this.getPrototypeChainUntil(object)
  }

  static getPrototypeChainUntil(object, untilPrototype = null) {
    let prototype = Object.getPrototypeOf(object)
    const chain = []
    while (prototype !== untilPrototype) {
      chain.push(prototype)
      prototype = Object.getPrototypeOf(prototype)
    }
    return chain
  }

  #byId = new ComponentMapArray()
  #byConstructor = new ComponentMapArray()

  constructor() {

  }

  findById(id) {
    return this.#byId.find(id)
  }

  findByConstructor(constructor) {
    return this.#byConstructor.find(constructor)
  }

  findByAll(id, constructor) {
    return this.#byId.find(id).find((component) => component.constructor === constructor)
  }

  register(component) {
    this.#byId.add(component.id, component)
    this.#byConstructor.add(component.constructor, component)
    ComponentRegistry
      .getPrototypeChainUntil(component, Component.prototype)
      .map((prototype) => prototype.constructor)
      .forEach((constructor) => this.#byConstructor.add(constructor, component))
  }

  unregister(component) {
    this.#byId.delete(component.id, component)
    this.#byConstructor.delete(component.constructor, component)
    ComponentRegistry
      .getPrototypeChainUntil(component, Component.prototype)
      .map((prototype) => prototype.constructor)
      .forEach((constructor) => this.#byConstructor.delete(constructor, component))
  }
}
