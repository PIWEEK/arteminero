import { System } from './System'

export class AudioSystem extends System {
  #context = null

  constructor(componentRegistry, resources, options) {
    super(componentRegistry, resources)
    this.#context = options?.context
  }

  update = () => {

  }

  start() {

  }

  stop() {

  }
}
