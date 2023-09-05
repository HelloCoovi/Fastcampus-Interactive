import App from "./App.js"
import Coin from "./Coin.js"

export default class Score {
  constructor() {
    this.coin = new Coin(App.width - 50, 50, 0)
    this.coin.frameX = 0

    this.distCount = 0
    this.coinCount = 0

  }
  update() {

  }
  draw() {
    this.coin.draw()

    App.ctx.font = "55px Jua"
    App.ctx.fillStyle = "#f1f1f1"
    App.ctx.textAlign = "right"
    App.ctx.fillText(this.coinCount, App.width - 90, 69)

    App.ctx.textAlign = "left"
    App.ctx.fillText(`${this.distCount}m`, 25, 69)
  }
}