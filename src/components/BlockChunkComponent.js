import { Vec3 } from 'gl-matrix';
import { Component } from '../core/components/Component';
import { Updatable } from '../core/Updatable';

export class BlockChunkComponent extends Component {
  static X_SIZE = 16
  static Y_SIZE = 16
  static Z_SIZE = 16

  #biome
  #x
  #z
  #position = new Vec3()
  #color = new Vec3(Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5)

  #data = new Uint32Array(
    BlockChunkComponent.X_SIZE * BlockChunkComponent.Y_SIZE * BlockChunkComponent.Z_SIZE
  )

  #updatable = new Updatable(true)

  constructor(id, options) {
    super(id)
    this.#biome = options?.biome ?? 0
    this.#x = options?.x ?? 0
    this.#z = options?.z ?? 0
    this.#position.x = this.#x * 16
    this.#position.z = this.#z * 16

    for (let i = 0; i < this.#data.length; i++) {
      this.#data[i] = Math.random() < 0.75 ? 0 : 1
    }
  }

  get needsUpdate() {
    return this.#updatable.needsUpdate
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

  get color() {
    return this.#color
  }

  updated() {
    this.#updatable.reset()
  }
}
