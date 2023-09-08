export default class Stick {
  constructor(p1, p2) {
    this.startPoint = p1
    this.endPoint = p2

    this.length = this.startPoint.pos.dist(this.endPoint.pos)
  }
  update() {
    const dx = this.endPoint.pos.x - this.startPoint.pos.x
    const dy = this.endPoint.pos.y - this.startPoint.pos.y

    const dist = Math.sqrt(dx * dx + dy * dy)
    const diff = (dist - this.length) / dist

    const offsetX = diff * dx
    const offsetY = diff * dy

    if (!this.startPoint.pinned) {
      this.startPoint.pos.x += offsetX * 0.5
      this.startPoint.pos.y += offsetY * 0.5
    }
    if (!this.endPoint.pinned) {
      this.endPoint.pos.x -= offsetX * 0.5
      this.endPoint.pos.y -= offsetY * 0.5
    }
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