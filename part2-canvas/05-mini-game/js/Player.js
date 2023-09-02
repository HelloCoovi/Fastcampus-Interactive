import App from "./App.js"

export default class Player {
  constructor() {
    this.img = document.querySelector('#bird-img')
    this.x = App.width * 0.1
    this.y = App.height * 0.5

  }
  update() {
  }
  draw() {
    App.ctx.drawImage(
      this.img,
      this.x, this.y, 100, 100
    )
  }
}