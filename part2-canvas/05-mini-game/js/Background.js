import App from "./App.js";

export default class Background {
  constructor() {
    this.img = document.querySelector("#bg1-img")
    this.height = App.height
    this.width = App.height * (this.img.width / this.img.height)
    this.leftPos = { x: 0, y: 0 }
    this.rightPos = { x: this.width, y: 0 }
    this.speed = 13
  }

  update() {
    if (this.leftPos.x + this.width < 0) {
      this.leftPos.x = this.rightPos.x + this.width
    }
    if (this.rightPos.x + this.width < 0) {
      this.rightPos.x = this.leftPos.x + this.width
    }

    this.leftPos.x -= this.speed
    this.rightPos.x -= this.speed
  }

  draw() {
    App.ctx.drawImage(
      this.img,
      this.leftPos.x, this.leftPos.y, this.width, this.height
    )
    App.ctx.drawImage(
      this.img,
      this.rightPos.x, this.rightPos.y, this.width, this.height
    )
  }
}