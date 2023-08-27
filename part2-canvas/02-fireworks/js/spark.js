import CanvasOption from './CanvasOption.js'

export default class Spark extends CanvasOption {
  constructor(x, y, opacity) {
    super()
    this.x = x
    this.y = y
    this.opacity = opacity
  }

  update() {
    this.opacity -= 0.01
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2)
    this.ctx.fillStyle = `hsla(45, 100%, 65%, ${this.opacity})`
    this.ctx.fill()
    this.ctx.closePath()
  }
}