import App from "./App.js"
import { randomNumBetween } from "./utils.js"

export default class Wall {
  constructor(config) {
    this.img = document.querySelector("#wall-img")
    this.type = config.type // SMALL, BIG

    switch (this.type) {
      case "SMALL":
        this.sx = this.img.width * (0 / 30)
        this.sizeX = 9 / 30
        break
      case "BIG":
        this.sx = this.img.width * (9 / 30)
        this.sizeX = 18 / 30
        break
    }

    this.width = App.height * this.sizeX
    this.height = App.height

    // 전체 높이값의 20% ~ 35% (아래 this.gapY는 오버라이드 코드)
    this.gapY = randomNumBetween(App.height * 0.2, App.height * 0.35)
    // this.gapY = App.height * 0.5

    this.x = App.width

    // 전체높이까지 + (30 ~ (전체높이 - 사이값 - 30))
    // 최소한 gapY만큼의 공간을 확보하고(App.height - this.gapY) 나머지는 랜덤으로 지정
    this.y1 = -this.height + randomNumBetween(30, App.height - this.gapY - 30)
    // this.y1 = this.height * 0.5

    // 구해진 y1 + 전체높이(요소 높이) + gap
    this.y2 = this.y1 + this.height + this.gapY
  }

  get isOutside() {
    return this.x + this.width < 0
  }

  update() {
    this.x += -6
  }
  draw() {
    App.ctx.drawImage(
      this.img,
      // 이미지 자르기 옵션
      // sx: 자르기 시작할 X위치, sy: 자르기 시작할 Y위치, 너비, 높이
      this.sx, 0, this.sizeX * this.img.width, this.img.height,
      this.x, this.y1, this.width, this.height
    )
    App.ctx.drawImage(
      this.img,
      this.sx, 0, this.sizeX * this.img.width, this.img.height,
      this.x, this.y2, this.width, this.height
    )
  }
}