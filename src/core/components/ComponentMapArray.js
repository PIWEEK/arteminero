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
    if (list.includes(value)) {
      return
    }
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
