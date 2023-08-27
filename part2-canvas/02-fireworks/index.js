import CanvasOption from "./js/CanvasOption.js"
import Particle from "./js/Particle.js"
import Tail from "./js/Tail.js"

import { randomNumBetween } from "./js/utils.js"
import { hypotenuse } from "./js/utils.js"

class Canvas extends CanvasOption {
  constructor() {
    super()

    this.tails = []
    this.particles = []
  }

  createTail() {
    const x = randomNumBetween(this.canvasWidth * 0.1, this.canvasWidth * 0.9)
    const vy = this.canvasHeight * randomNumBetween(0.003, 0.018) * -1
    const color = "255, 255, 255"
    this.tails.push(new Tail(x, vy, color))
  }

  createParticles(x, y, color) {
    const PARTICLE_NUM = 200
    // const x = randomNumBetween(0, this.canvasWidth)
    // const y = randomNumBetween(0, this.canvasWidth)

    for (let i = 0; i < PARTICLE_NUM; i++) {
      const r = randomNumBetween(2, 100) * hypotenuse(window.innerWidth, window.innerHeight) * 0.0001
      const angle = Math.PI / 180 * randomNumBetween(0, 360)

      const vx = r * Math.cos(angle)
      const vy = r * Math.sin(angle)

      const opacity = randomNumBetween(0.6, 1)

      this.particles.push(new Particle(x, y, vx, vy, opacity, color))
    }
  }

  init() {
    this.canvasWidth = window.innerWidth
    this.canvasHeight = window.innerHeight
    this.canvas.width = this.canvasWidth * this.dpr
    this.canvas.height = this.canvasHeight * this.dpr
    this.ctx.scale(this.dpr, this.dpr)

    this.canvas.style.width = this.canvasWidth + "px"
    this.canvas.style.height = this.canvasHeight + "px"
  }

  render() {
    let now, delta
    let then = Date.now()

    const frame = () => {
      requestAnimationFrame(frame)
      now = Date.now()
      delta = now - then
      if (delta < this.interval) return

      this.ctx.fillStyle = this.bgColor + "35" // #00000035
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)


      if (Math.random() < 0.03) this.createTail()
      // this.createTail()

      this.tails.forEach((tail, index) => {
        tail.update()
        tail.draw()

        if (tail.vy > -1) {
          this.tails.splice(index, 1)
          this.createParticles(tail.x, tail.y, tail.color)
        }
      })

      this.particles.forEach((particle, index) => {
        particle.update()
        particle.draw()

        if (particle.opacity < 0) this.particles.splice(index, 1)
      })

      then = now - (delta % this.interval)
    }
    requestAnimationFrame(frame)
  }
}

const canvas = new Canvas()

window.addEventListener("load", () => {
  canvas.init()
  canvas.render()
})

window.addEventListener("resize", () => {
  canvas.init()
})