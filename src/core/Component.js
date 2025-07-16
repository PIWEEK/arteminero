export class Component {
  #id

  constructor(id) {
    this.#id = id
  }

  get id() {
    return this.#id
  }
}
