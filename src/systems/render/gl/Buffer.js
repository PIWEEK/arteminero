export class Buffer {
  #gl
  #buffer
  #target
  #usage

  constructor(gl, options) {
    this.#gl = gl
    this.#target = options?.target ?? gl.ARRAY_BUFFER
    this.#usage = options?.usage ?? gl.STATIC_DRAW
  }

  get buffer() {
    return this.#buffer
  }

  get target() {
    return this.#target
  }

  get usage() {
    return this.#usage
  }

  create() {
    const gl = this.#gl
    this.#buffer = gl.createBuffer()
  }

  bufferData(sizeOrData, offset) {
    const gl = this.#gl
    gl.bindBuffer(this.#target, this.#buffer)
    gl.bufferData(this.#target, sizeOrData, this.#usage, offset)
    gl.bindBuffer(this.#target, null)
  }
}
