import App from "./App.js"

export default class Coin {
  constructor(x, y) {
    this.img = document.querySelector("#coin-img")

    this.x = x
    this.y = y
    this.width = 70
    this.height = 70

    this.counter = 0
    this.frameX = 0
  }
  update() {
    if (++this.counter % 6 === 0) {
      this.counter = 0
      this.frameX += 1
      if (this.frameX >= 6) this.frameX = 0
    }

  }
  draw() {
    App.ctx.drawImage(
      this.img,
      this.img.width / 6 * this.frameX, 0, this.img.width / 6, this.img.height,
      this.x - this.width * 0.5, this.y - this.height * 0.5, this.width, this.height
    )
  }
}