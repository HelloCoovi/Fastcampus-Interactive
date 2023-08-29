import { randomNumBetween } from "./utils.js"

export default class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y

    this.width = 30
    this.height = 30

    this.r = 7
    this.angle = Math.PI / 180 * randomNumBetween(0, 360)

    this.vx = this.r * Math.cos(this.angle)
    this.vy = this.r * Math.sin(this.angle)
    this.friction = 0.97
    this.gravity = 0.1
  }
  update() {
    this.vy += this.gravity

    this.vx *= this.friction
    this.vy *= this.friction

    this.x += this.vx
    this.y += this.vy
  }
  draw(ctx) {
    ctx.fillStyle = "red"
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}