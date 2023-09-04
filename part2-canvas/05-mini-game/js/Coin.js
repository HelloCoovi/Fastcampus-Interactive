import App from "./App.js"

export default class Coin {
  constructor() {
    this.img = document.querySelector("#coin-img")
  }
  update() {

  }
  draw() {
    App.ctx.drawImage(
      this.img,
      100, 100, 100, 100
    )
  }
}