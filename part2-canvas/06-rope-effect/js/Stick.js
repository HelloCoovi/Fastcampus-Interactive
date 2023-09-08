export default class Stick {
  constructor(p1, p2) {
    this.startPoint = p1
    this.endPoint = p2
  }
  update() {

  }
  draw(ctx) {
    ctx.beginPath()
    ctx.strokeStyle = "#999"
    ctx.lineWidth = 2
    ctx.moveTo(this.startPoint.pos.x, this.startPoint.pos.y)
    ctx.lineTo(this.endPoint.pos.x, this.endPoint.pos.y)
    ctx.stroke()
    ctx.closePath()
  }
}