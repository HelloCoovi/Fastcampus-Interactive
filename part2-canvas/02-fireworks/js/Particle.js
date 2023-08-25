import CanvasOption from "./CanvasOption.js";

export default class Particle extends CanvasOption {
  constructor(x, y, vx, vy) {
    super()
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
  }

  update() {
    this.x += this.vx
    this.y += this.vy
  }

  draw() {
    this.ctx.fillStyle = "#fff"

    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2)
    this.ctx.fill()
    this.ctx.closePath()
  }
}