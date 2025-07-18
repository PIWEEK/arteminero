export class Shader {
  #gl = null
  #type = null
  #source = null
  #shader = null

  constructor(gl, type, source) {
    this.#gl = gl
    this.#type = type
    this.#source = source
  }

  get type() {
    return this.#type
  }

  get needsCompilation() {
    return this.#shader === null
  }

  get shader() {
    return this.#shader
  }

  compile() {
    const gl = this.#gl
    this.#shader = gl.createShader(this.#type)
    gl.shaderSource(this.#shader, this.#source)
    gl.compileShader(this.#shader)
  }

  validate() {
    const gl = this.#gl
    if (!gl.getShaderParameter(this.#shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(this.#shader))
    }
  }
}
