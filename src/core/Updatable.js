export class Updatable {
  #needsUpdate = false

  constructor(needsUpdate = false) {
    this.#needsUpdate = needsUpdate
  }

  get needsUpdate() {
    return this.#needsUpdate
  }

  reset() {
    this.#needsUpdate = false
  }

  set() {
    this.#needsUpdate = true
  }
}
