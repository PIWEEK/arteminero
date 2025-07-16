class Component {
  #id = null

  constructor(id) {
    this.#id = id
  }

  get id() {
    return this.#id
  }
}

class TransformComponent extends Component {

}

const transform = new TransformComponent('player')

function getPrototypeChainUntil(object, untilPrototype) {
  let prototype = Object.getPrototypeOf(object)
  const chain = []
  while (prototype !== untilPrototype) {
    chain.push(prototype.constructor)
    prototype = Object.getPrototypeOf(prototype)
  }
  return chain
}

function getPrototypeChainOf(object) {
  return getPrototypeChainUntil(object, null)
}

console.log(getPrototypeChainUntil(transform, Component.prototype))
console.log(getPrototypeChainOf(transform))
