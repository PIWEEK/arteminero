import { Quat, Vec3, Mat4 } from 'gl-matrix'
import { Component } from '../core/components/Component'
import { Updatable } from '../core/Updatable'

export class TransformComponent extends Component {
  #position = new Vec3()
  #rotation = new Vec3()
  #scale = new Vec3(1.0, 1.0, 1.0)
  #matrix = new Mat4()
  #updatable = new Updatable()

  get needsUpdate() {
    return this.#updatable.needsUpdate
  }

  get position() {
    return this.#position
  }

  get rotation() {
    return this.#rotation
  }

  get scale() {
    return this.#scale
  }

  get matrix() {
    return this.#matrix
  }

  get x() {
    return this.#position.x
  }

  set x(value) {
    this.#position.x = value
    this.#updatable.set()
  }

  get y() {
    return this.#position.y
  }

  set y(value) {
    this.#position.y = value
    this.#updatable.set()
  }

  get z() {
    return this.#position.z
  }

  set z(value) {
    this.#position.z = value
    this.#updatable.set()
  }

  get rotationX() {
    return this.#rotation.x
  }

  set rotationX(value) {
    this.#rotation.x = value
    this.#updatable.set()
  }

  get rotationY() {
    return this.#rotation.y
  }

  set rotationY(value) {
    this.#rotation.y = value
    this.#updatable.set()
  }

  get rotationZ() {
    return this.#rotation.z
  }

  set rotationZ(value) {
    this.#rotation.z = value
    this.#updatable.set()
  }

  get scaleX() {
    return this.#scale.x
  }

  set scaleX(value) {
    this.#scale.x = value
    this.#updatable.set()
  }

  get scaleY() {
    return this.#scale.y
  }

  set scaleY(value) {
    this.#scale.y = value
    this.#updatable.set()
  }

  get scaleZ() {
    return this.#scale.z
  }

  set scaleZ(value) {
    this.#scale.z = value
    this.#updatable.set()
  }

  update() {
    this.#matrix
      .identity()
      .translate(this.#position)
      .rotateZ(this.#rotation.z)
      .rotateY(this.#rotation.y)
      .rotateX(this.#rotation.x)
      .scale(this.#scale)
    this.#updatable.reset()
  }
}
