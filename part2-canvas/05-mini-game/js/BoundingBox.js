import App from "./App.js"

export default class BoundingBox {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = `rgba(255, 0, 0, 0.3)`
  }

  draw() {
    App.ctx.fillStyle = this.color
    App.ctx.fillRect(this.x, this.y, this.width, this.height)

  }

}