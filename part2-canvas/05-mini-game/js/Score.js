import App from "./App.js"
import Coin from "./Coin.js"

export default class Score {
  constructor() {
    this.coin = new Coin(App.width - 50, 50, 0)
    this.coin.frameX = 0
  }
  update() {

  }
  draw() {
    this.coin.draw()
  }
}