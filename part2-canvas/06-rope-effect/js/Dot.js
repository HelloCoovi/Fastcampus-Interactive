import Vector from "./Vector.js"

export default class Dot {
  constructor(x, y) {
    this.pos = new Vector(x, y)
    this.oldPos = new Vector(x, y)
  }

  update() {
    let vel = Vector.sub(this.pos, this.oldPos)

    this.oldPos.setXY(this.pos.x, this.pos.y)

    vel.x += 0.1
    this.pos.add(vel)
  }

  draw(ctx) {
    ctx.fillStyle = "#000"
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
  }
}