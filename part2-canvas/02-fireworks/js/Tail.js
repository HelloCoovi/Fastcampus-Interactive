import CanvasOption from "./CanvasOption.js";

export default class Tail extends CanvasOption {
  constructor(x, vy, color) {
    super()
    this.x = x
    this.y = this.canvasHeight
    this.vy = vy
    this.color = color
    this.friction = 0.98
  }
  update() {
    this.vy *= this.friction
    this.y += this.vy
  }
  draw() {
    this.ctx.fillStyle = `rgba(${this.color}, 1)`
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2)
    this.ctx.fill()
    this.ctx.closePath()
  }
}