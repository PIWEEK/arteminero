import { Component } from '../core/components/Component';

export class BlockChunkComponent extends Component {
  #data = new Uint32Array(
    16 * 16 * 16
  )

  get data() {
    return this.#data
  }
}
