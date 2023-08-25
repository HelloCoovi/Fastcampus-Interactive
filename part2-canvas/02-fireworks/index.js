import CanvasOption from "./js/CanvasOption.js"
import Particle from "./js/Particle.js"

class Canvas extends CanvasOption {
  constructor() {
    super()

    this.particles = []
  }

  createParticles() {
    const PARTICLE_NUM = 1
    for (let i = 0; i < PARTICLE_NUM; i++) {
      const x = 300
      const y = 300
      this.particles.push(new Particle(x, y))
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

    this.createParticles()
  }

  render() {
    let now, delta
    let then = Date.now()

    const frame = () => {
      requestAnimationFrame(frame)
      now = Date.now()
      delta = now - then
      if (delta < this.interval) return

      this.particles.forEach((particle) => {
        particle.update()
        particle.draw()
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