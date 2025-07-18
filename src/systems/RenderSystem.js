import { Mat4 } from 'gl-matrix'
import { CameraComponent } from '../components/CameraComponent.js'
import { TransformComponent } from '../components/TransformComponent.js'
import { System } from './System.js'
import { BlockChunkComponent } from '../components/BlockChunkComponent.js'
import { Shader } from './render/gl/Shader.js'
import { Program } from './render/gl/Program.js'
import defaultVertexShader from './render/shaders/default.v.glsl?raw'
import defaultFragmentShader from './render/shaders/default.f.glsl?raw'

export class RenderSystem extends System {
  #canvas

  /**
   * @type {WebGL2RenderingContext}
   */
  #gl

  #currentModelMatrix = new Mat4()
  #currentViewMatrix = new Mat4()
  #currentProjectionMatrix = new Mat4()
  #currentViewProjectionMatrix = new Mat4()
  #currentModelViewProjectionMatrix = new Mat4()

  // NOTA: No sé si esto debería estar en la
  // clase Resources o aquí.
  #defaultVertexShader = null
  #defaultFragmentShader = null
  #defaultProgram = null
  #defaultBuffer = null

  constructor(componentRegistry, resources, options) {
    super(componentRegistry, resources)
    this.#canvas = options.canvas
  }

  createDefaults() {
    const gl = this.#gl
    this.#defaultVertexShader = new Shader(gl, gl.VERTEX_SHADER, defaultVertexShader)
    this.#defaultFragmentShader = new Shader(gl, gl.FRAGMENT_SHADER, defaultFragmentShader)
    this.#defaultProgram = new Program(gl, this.#defaultVertexShader, this.#defaultFragmentShader)

    /*
    const points = new Float32Array([
      -1.0, -1.0, -1.0,
       1.0, -1.0, -1.0,
      -1.0, -1.0,  1.0,
       1.0, -1.0,  1.0,
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
    ])
    */

    const points = new Float32Array(300)
    for (let i = 0; i < 300; i += 3) {
      points[i + 0] = (Math.random() - 0.5) * 2.0
      points[i + 1] = (Math.random() - 0.5) * 2.0
      points[i + 2] = (Math.random() - 0.5) * 2.0
    }
    this.#defaultBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.#defaultBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
  }

  start() {
    this.#gl = this.#canvas.getContext('webgl2')
    this.createDefaults()
  }

  stop() {
    this.#gl = null
  }

  update = () => {
    const gl = this.#gl
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.enable(gl.DEPTH)

    gl.viewport(0, 0, this.#canvas.width, this.#canvas.height)

    // Sets the default program.
    if (this.#defaultProgram.needsLinking) {
      this.#defaultProgram.link()
    }
    this.#defaultProgram.use()

    const cameras = this.componentRegistry.findByConstructor(CameraComponent)
    for (const camera of cameras) {
      if (camera.projection.aspectRatio != gl.canvas.width / gl.canvas.height) {
        camera.projection.aspectRatio = gl.canvas.width / gl.canvas.height
      }

      const transform = this.componentRegistry.findByIdAndConstructor(camera.id, TransformComponent)

      // Model matrix.
      if (transform.needsUpdate) {
        transform.update()
      }
      // this.#currentModelMatrix = transform.matrix

      // Projection Matrix
      if (camera.projection.needsUpdate) {
        camera.projection.update()
      }
      this.#currentProjectionMatrix = camera.projection.matrix

      // View matrix.
      camera
        .matrix
        .copy(transform.matrix)
        .invert()

      this.#currentViewMatrix = camera.matrix

      // ViewProjection Matrix
      this.#currentViewProjectionMatrix
        .copy(this.#currentProjectionMatrix)
        .multiply(this.#currentViewMatrix)

      gl.enableVertexAttribArray(
        this.#defaultProgram.attributes.a_position.location
      )
      gl.bindBuffer(gl.ARRAY_BUFFER, this.#defaultBuffer)
      gl.vertexAttribPointer(
        this.#defaultProgram.attributes.a_position.location,
        3,
        gl.FLOAT,
        false,
        0,
        0
      )

      //
      const blockChunks = this.componentRegistry.findByConstructor(BlockChunkComponent)
      for (const blockChunk of blockChunks) {
        // Model matrix
        this.#currentModelMatrix
          .identity()
          .translate(blockChunk.position)

        // ModelViewProjection matrix
        this.#currentModelViewProjectionMatrix
          .copy(this.#currentProjectionMatrix)
          .multiply(this.#currentViewMatrix)
          .multiply(this.#currentModelMatrix)

        gl.uniformMatrix4fv(
          this.#defaultProgram.uniforms.u_modelViewProjection.location,
          false,
          this.#currentModelViewProjectionMatrix
        )

        gl.drawArrays(gl.POINTS, 0, 100)
      }
    }
  }
}
