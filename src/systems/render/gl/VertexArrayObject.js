export class VertexArrayObject {
  #gl = null
  #vao = null
  #attributes
  #indexBuffer
  #count = 0
  #offset = 0
  #mode

  constructor(gl, options) {
    this.#gl = gl
    this.#attributes = options.attributes
    this.#indexBuffer = options?.indexBuffer
    this.#mode = options?.mode ?? gl.TRIANGLES
    this.#count = options.count
    this.#offset = options?.offset ?? 0
  }

  get attributes() {
    return this.#attributes
  }

  get indexBuffer() {
    return this.#indexBuffer
  }

  bindAll() {
    const gl = this.#gl
    this.#vao = gl.createVertexArray()
    gl.bindVertexArray(this.#vao)
    for (const attribute of this.#attributes) {
      gl.enableVertexAttribArray(attribute.location)
      gl.bindBuffer(gl.ARRAY_BUFFER, attribute.buffer, attribute?.usage ?? gl.STATIC_DRAW)
      gl.vertexAttribPointer(attribute.location, attribute.size, attribute?.type ?? gl.FLOAT, attribute?.normalized ?? false, attribute?.stride ?? 0, attribute?.offset ?? 0)
    }
    if (this.#indexBuffer) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.#indexBuffer)
    }
    gl.bindVertexArray(null)
  }

  draw(mode) {
    const gl = this.#gl
    gl.bindVertexArray(this.#vao)
    if (this.#indexBuffer) {
      gl.drawElements(mode ?? this.#mode, this.#count, gl.UNSIGNED_INT, this.#offset)
    } else {
      gl.drawArrays(mode ?? this.#mode, this.#offset, this.#count)
    }
    gl.bindVertexArray(null)
  }
}
