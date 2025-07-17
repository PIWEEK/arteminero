import { Component } from './Component.js'
import { ComponentMapArray } from './ComponentMapArray.js'

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
    chain.push(prototype)
    return chain
  }

  #byId = new ComponentMapArray()
  #byConstructor = new ComponentMapArray()

  findById(id) {
    return this.#byId.find(id)
  }

  findByConstructor(constructor) {
    return this.#byConstructor.find(constructor)
  }

  findByIdAndConstructor(id, constructor) {
    return this.#byId
      .find(id)
      .find((component) => component.constructor === constructor)
  }

  register(component) {
    this.#byId.add(component.id, component)
    this.#byConstructor.add(component.constructor, component)
    ComponentRegistry.getPrototypeChainUntil(component, Component.prototype)
      .map((prototype) => prototype.constructor)
      .forEach((constructor) => this.#byConstructor.add(constructor, component))
  }

  unregister(component) {
    this.#byId.delete(component.id, component)
    this.#byConstructor.delete(component.constructor, component)
    ComponentRegistry.getPrototypeChainUntil(component, Component.prototype)
      .map((prototype) => prototype.constructor)
      .forEach((constructor) =>
        this.#byConstructor.delete(constructor, component)
      )
  }
}
