import './style.css'
import { mat4, vec3 } from 'gl-matrix'

import { Game } from './Game.js'

const canvas = document.querySelector('canvas')
const game = new Game(canvas)
game.start()
