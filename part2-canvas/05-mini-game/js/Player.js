import App from "./App.js"
import BoundingBox from "./BoundingBox.js"

export default class Player {
  constructor() {
    this.img = document.querySelector('#bird-img')
    this.x = App.width * 0.1
    this.y = App.height * 0.5
    this.width = 130
    // 원본이미지의 스프라이트 1개의 크기의 가로세로 비율로 이미지 크기 설정
    // 원본이미지 크기: 3990 x 207 (3990 / 15 == 266)
    this.height = this.width * (207 / 266)

    this.counter = 0
    this.frameX = 0

    this.vy = -10
    this.gravity = 0.3
    App.canvas.addEventListener('click', () => {
      this.vy = -5
    })

    this.BoundingBoxAdjust = {
      x: 10,
      y: 16,
      width: -20,
      height: -20
    }
    this.boundingBox = new BoundingBox(
      this.x + this.BoundingBoxAdjust.x,
      this.y + this.BoundingBoxAdjust.y,
      this.width + this.BoundingBoxAdjust.width,
      this.height + this.BoundingBoxAdjust.height
    )
  }
  update() {
    if (++this.counter % 2 === 0) {
      this.frameX = ++this.frameX % 15
    }

    this.vy += this.gravity
    this.y += this.vy

    this.boundingBox.y = this.y + this.BoundingBoxAdjust.y
  }
  draw() {
    App.ctx.drawImage(
      this.img,
      this.img.width / 15 * this.frameX, 0, this.img.width / 15, this.img.height,
      this.x, this.y, this.width, this.height
    )

    // this.boundingBox.draw()
  }
}