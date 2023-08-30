import { randomNumBetween } from "./utils.js"

export default class Particle {
  constructor(x, y, deg = 0) {
    this.x = x
    this.y = y

    this.width = 30
    this.height = 30

    this.r = randomNumBetween(30, 100)
    this.angle = Math.PI / 180 * randomNumBetween(deg - 30, deg + 30)

    this.vx = this.r * Math.cos(this.angle)
    this.vy = this.r * Math.sin(this.angle)
    this.friction = 0.89
    this.gravity = 0.5

    this.opacity = 1
  }
  update() {
    this.vy += this.gravity

    this.vx *= this.friction
    this.vy *= this.friction

    this.x += this.vx
    this.y += this.vy

    this.opacity -= 0.005
  }
  draw(ctx) {
    ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}