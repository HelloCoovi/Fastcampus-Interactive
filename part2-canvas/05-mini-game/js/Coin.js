import App from "./App.js"
import BoundingBox from "./BoundingBox.js"

export default class Coin {
  constructor(x, y, vx) {
    this.img = document.querySelector("#coin-img")

    this.width = 70
    this.height = 70
    this.x = x - this.width * 0.5
    this.y = y - this.height * 0.5

    this.counter = 0
    this.frameX = 0

    this.vx = vx

    this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height)
  }

  get isOutside() {
    return this.x + this.width < 0
  }

  update() {
    if (++this.counter % 6 === 0) {
      this.counter = 0
      this.frameX += 1
      if (this.frameX >= 6) this.frameX = 0
    }

    this.x += this.vx
    this.boundingBox.x = this.x

  }
  draw() {
    App.ctx.drawImage(
      this.img,
      this.img.width / 6 * this.frameX, 0, this.img.width / 6, this.img.height,
      this.x, this.y, this.width, this.height
    )

    // this.boundingBox.draw()
  }
}