import App from "./App.js"

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
  }

  update() {
  }
  draw() {
    App.ctx.drawImage(
      this.img,
      // 이미지 자르기 옵션
      // sx: 자르기 시작할 X위치, sy: 자르기 시작할 Y위치, 너비, 높이
      this.sx, 0, this.sizeX * this.img.width, this.img.height,
      0, 0, this.width, this.height
    )
  }
}