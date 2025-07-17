import { System } from './System';

export class SchedulerSystem extends System {
  #tasks = []

  add(task) {
    this.#tasks.push(task)
  }

  delete(task) {
    const index = this.#tasks.indexOf(task)
    if (index < 0) {
      return false
    }
    const [_] = this.#tasks.splice(index, 1)
    return true
  }

  update = () => {
    for (const task of this.#tasks) {
      const result = task.next()
      if (result.done) {
        this.delete(task)
      }
    }
  }

  start() {

  }

  stop() {

  }
}
