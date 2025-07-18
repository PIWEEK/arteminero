import { TransformComponent } from '../components/TransformComponent.js'
import { CameraComponent } from '../components/CameraComponent.js'
import { BlockChunkComponent } from '../components/BlockChunkComponent.js'

export function * MainTask(game) {
  const camera = new CameraComponent('player')
  const transform = new TransformComponent('player', {
    position: {
      x: 0,
      y: 0,
      z: 10
    }
  })

  for (let x = -1; x < 1; x++) {
    for (let z = -1; z < 1; z++) {
      const blockChunk = new BlockChunkComponent(`block-chunk:${x}:${z}`, {
        x, z
      })
      game.componentRegistry.register(blockChunk)
    }
  }

  game.componentRegistry.register(camera)
  game.componentRegistry.register(transform)

  while(true) {
    if (game.systems.input.keyboard.isPressed('ArrowLeft')) {
      console.log('Left')
      transform.rotationY += 0.1
    } else if (game.systems.input.keyboard.isPressed('ArrowRight')) {
      console.log('Right')
      transform.rotationY -= 0.1
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
      transform.left(0.1)
    } else if (game.systems.input.keyboard.isPressed('KeyD')) {
      console.log('Strafe Right')
      transform.right(0.1)
    }
    if (game.systems.input.keyboard.isPressed('KeyW')) {
      console.log('Forward')
      transform.forward(0.1)
    } else if (game.systems.input.keyboard.isPressed('KeyS')) {
      console.log('Backward')
      transform.backward(0.1)
    }
    if (game.systems.input.keyboard.isPressed('KeyQ')) {
      console.log('Up')
      transform.up(0.1)
    } else if (game.systems.input.keyboard.isPressed('KeyE')) {
      console.log('Down')
      transform.down(0.1)
    }
    if (game.systems.input.keyboard.isPressed('Space')) {
      console.log('Jump')
      transform.up(0.1)
    } else if (game.systems.input.keyboard.isPressed('Enter')) {
      console.log('Use')
      transform.down(0.1)
    }
    yield
  }
}
