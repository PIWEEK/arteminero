import { TransformComponent } from '../components/TransformComponent.js'
import { CameraComponent } from '../components/CameraComponent.js'

export function * MainTask(game) {
  const camera = new CameraComponent('player')
  const transform = new TransformComponent('player', {
    position: {
      x: 0,
      y: 0,
      z: 10
    }
  })

  game.componentRegistry.register(camera)
  game.componentRegistry.register(transform)

  while(true) {
    if (game.systems.input.keyboard.isPressed('ArrowLeft')) {
      console.log('Left')
      transform.rotationY -= 0.1
    } else if (game.systems.input.keyboard.isPressed('ArrowRight')) {
      console.log('Right')
      transform.rotationY += 0.1
    }
    if (game.systems.input.keyboard.isPressed('ArrowUp')) {
      console.log('Up')
      transform.rotationX += 0.1
    } else if (game.systems.input.keyboard.isPressed('ArrowDown')) {
      console.log('Down')
      transform.rotationX -= 0.1
    }
    if (game.systems.input.keyboard.isPressed('KeyA')) {
      console.log('Strafe Left')
      // transform.rotationX -= 0.1
    } else if (game.systems.input.keyboard.isPressed('KeyD')) {
      console.log('Strafe Right')
      // transform.rotationX -= 0.1
    }
    if (game.systems.input.keyboard.isPressed('KeyW')) {
      console.log('Forward')
      transform.z--
    } else if (game.systems.input.keyboard.isPressed('KeyS')) {
      console.log('Backward')
      transform.z++
    }
    if (game.systems.input.keyboard.isPressed('Space')) {
      console.log('Jump')
      transform.y--
    } else if (game.systems.input.keyboard.isPressed('Enter')) {
      console.log('Use')
      transform.y--
    }
    yield
  }
}
