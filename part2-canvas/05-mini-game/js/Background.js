import App from "./App.js";

export default class Background {
  constructor() {
    this.img = document.querySelector("#bg1-img")
    this.height = App.height
    this.width = App.height * (this.img.width / this.img.height)
  }

  update() {
  }

  draw() {
    App.ctx.drawImage(
      this.img,
      0, 0, this.width, this.height
    )
  }
}