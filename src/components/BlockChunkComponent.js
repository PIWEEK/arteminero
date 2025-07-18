import { Vec3 } from 'gl-matrix';
import { Component } from '../core/components/Component';

export class BlockChunkComponent extends Component {
  #biome
  #x
  #z
  #position = new Vec3()

  #data = new Uint32Array(
    16 * 16 * 16
  )

  constructor(id, options) {
    super(id)
    this.#biome = options?.biome ?? 0
    this.#position.x = this.#x = options?.x ?? 0
    this.#position.z = this.#z = options?.z ?? 0
  }

  get data() {
    return this.#data
  }

  get biome() {
    return this.#biome
  }

  get x() {
    return this.#x
  }

  get z() {
    return this.#z
  }

  get position() {
    return this.#position
  }
}
