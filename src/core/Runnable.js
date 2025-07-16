export class Runnable {
  #isRunning = false

  constructor(isRunning) {
    this.#isRunning = isRunning ?? false
  }

  get isRunning() {
    return this.#isRunning
  }

  start() {
    if (this.#isRunning) {
      return false
    }
    this.#isRunning = true
    return true
  }

  stop() {
    if (!this.#isRunning) {
      return false
    }
    this.#isRunning = false
    return true
  }
}
