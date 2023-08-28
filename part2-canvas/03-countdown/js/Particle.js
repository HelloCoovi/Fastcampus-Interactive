export default class Particle {
  constructor() {
    this.x = window.innerWidth / 2
    this.y = window.innerHeight / 2
  }
  update() {
  }
  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, 1, 0, Math.PI * 2)
    ctx.fillStyle = "#fff"
    ctx.fill()
    ctx.closePath()
  }
}