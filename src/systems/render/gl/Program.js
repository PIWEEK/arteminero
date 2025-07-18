export class Program {
  #gl = null
  #vertexShader = null
  #fragmentShader = null
  #program = null
  #attributes = null
  #uniforms = null

  constructor(gl, vertexShader, fragmentShader) {
    this.#gl = gl
    this.#vertexShader = vertexShader
    this.#fragmentShader = fragmentShader
    this.#program = null
  }

  get needsLinking() {
    return this.#program === null
  }

  get attributes() {
    return this.#attributes
  }

  get uniforms() {
    return this.#uniforms
  }

  link() {
    const gl = this.#gl
    this.#program = gl.createProgram()
    if (this.#vertexShader.needsCompilation) {
      this.#vertexShader.compile()
    }
    if (this.#fragmentShader.needsCompilation) {
      this.#fragmentShader.compile()
    }
    this.#vertexShader.validate()
    this.#fragmentShader.validate()
    gl.attachShader(this.#program, this.#vertexShader.shader)
    gl.attachShader(this.#program, this.#fragmentShader.shader)
    gl.linkProgram(this.#program)
    this.validate()
    this.#attributes = this.#getAttributes()
    this.#uniforms = this.#getUniforms()
  }

  validate() {
    const gl = this.#gl
    if (!gl.getProgramParameter(this.#program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(this.#program))
    }
  }

  #getAttributes() {
    const gl = this.#gl
    const count = gl.getProgramParameter(this.#program, gl.ACTIVE_ATTRIBUTES)
    const attributes = {}
    for (let index = 0; index < count; index++) {
      const { name, size, type } = gl.getActiveAttrib(this.#program, index)
      const location = gl.getAttribLocation(this.#program, name)
      attributes[name] = {
        location,
        index,
        name,
        size,
        type
      }
    }
    return attributes
  }

  #getUniforms() {
    const gl = this.#gl
    const count = gl.getProgramParameter(this.#program, gl.ACTIVE_UNIFORMS)
    const uniforms = {}
    for (let index = 0; index < count; index++) {
      const { name, size, type } = gl.getActiveUniform(this.#program, index)
      const location = gl.getUniformLocation(this.#program, name)
      uniforms[name] = {
        location,
        index,
        name,
        size,
        type
      }
    }
    return uniforms
  }

  use() {
    const gl = this.#gl
    if (!this.#program) {
      throw new Error('Program not linked')
    }
    gl.useProgram(this.#program)
  }
}
