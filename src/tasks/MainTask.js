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
    } else if (game.systems.input.keyboard.isPressed('ArrowRight')) {
      console.log('Right')
    }
    if (game.systems.input.keyboard.isPressed('ArrowUp')) {
      console.log('Left')
    } else if (game.systems.input.keyboard.isPressed('ArrowDown')) {
      console.log('Right')
    }
    if (game.systems.input.keyboard.isPressed('KeyA')) {
      console.log('Strafe Left')
    } else if (game.systems.input.keyboard.isPressed('KeyD')) {
      console.log('Strafe Right')
    }
    if (game.systems.input.keyboard.isPressed('KeyW')) {
      console.log('Forward')
    } else if (game.systems.input.keyboard.isPressed('KeyS')) {
      console.log('Backward')
    }
    if (game.systems.input.keyboard.isPressed('Space')) {
      console.log('Jump')
    } else if (game.systems.input.keyboard.isPressed('Enter')) {
      console.log('Use')
    }
    yield
  }
}
