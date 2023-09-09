import Vector from "./Vector.js"

export default class Mouse {
  constructor(canvas) {
    // 시작과 동시에 마우스 좌표 주변에 물리효과가 생기는것을 방지하기위한 세팅
    this.pos = new Vector(-1000, -1000)
    this.radius = 100 // 이벤트가 작동하는 거리(마우스 커서를 중심으로 100만큼의 반지름)

    canvas.onmousemove = e => this.pos.setXY(e.clientX, e.clientY)
    canvas.ontouchmove = e => this.pos.setXY(e.touches[0].clientX, e.touches[0].clientY)

  }

  update() {

  }

}