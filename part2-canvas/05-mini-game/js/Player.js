import App from "./App.js"

export default class Player {
  constructor() {
    this.img = document.querySelector('#bird-img')
    this.x = App.width * 0.1
    this.y = App.height * 0.5
    this.width = 130
    // 원본이미지의 스프라이트 1개의 크기의 가로세로 비율로 이미지 크기 설정
    // 원본이미지 크기: 3990 x 207 (3990 / 15 == 266)
    this.height = this.width * (207 / 266)

    this.frameX = 0
  }
  update() {
  }
  draw() {
    App.ctx.drawImage(
      this.img,
      this.img.width / 15 * this.frameX, 0, this.img.width / 15, this.img.height,
      this.x, this.y, this.width, this.height
    )
  }
}