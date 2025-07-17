import './style.css'
import { Game } from './Game.js'
import { MainTask } from './tasks/MainTask.js'

const canvas = document.querySelector('canvas')
const game = new Game({ canvas })
game.start()
game.systems.scheduler.add(MainTask(game))
