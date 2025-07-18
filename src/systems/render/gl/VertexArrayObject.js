export class vertexArrayObject {
  #gl = null
  #vao = null
  #attributes
  #indexBuffer

  constructor(gl, attributes, indexBuffer) {
    this.#gl = gl
    this.#attributes = attributes
    this.#indexBuffer = indexBuffer
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
      gl.bindBuffer(gl.ARRAY_BUFFER, attribute.buffer)
      gl.vertexAttribPointer(attribute.location, attribute.size, attribute.type, attribute.normalized, attribute.stride, attribute.offset)
    }
    if (this.#indexBuffer) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.#indexBuffer)
    }
    gl.bindVertexArray(null)
  }
}
