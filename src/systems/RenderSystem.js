import { CameraComponent } from '../components/CameraComponent'
import { TransformComponent } from '../components/TransformComponent'
import { System } from './System'

export class RenderSystem extends System {
  #canvas
  #gl

  constructor(componentRegistry, resources, options) {
    super(componentRegistry, resources)
    this.#canvas = options?.canvas ?? new OffscreenCanvas(1280, 720)
  }

  start() {
    this.#gl = this.#canvas.getContext('webgl2')
  }

  stop() {
    this.#gl = null
  }

  update = () => {
    const gl = this.#gl
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    const cameras = this.componentRegistry.findByConstructor(CameraComponent)
    for (const camera of cameras) {
      camera.projection.aspectRatio = gl.canvas.width / gl.canvas.height
      const transform = this.componentRegistry.findByIdAndConstructor(camera.id, TransformComponent)
      if (transform.needsUpdate) {
        transform.update()
      }
      if (camera.projection.needsUpdate) {
        camera.projection.update()
      }
      camera.matrix
        .copy(transform.matrix)
        .invert()
    }
  }
}
