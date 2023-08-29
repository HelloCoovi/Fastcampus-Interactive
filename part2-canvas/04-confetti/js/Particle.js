export default class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y

    this.width = 30
    this.height = 30
  }
  update() {
  }
  draw(ctx) {
    ctx.fillStyle = "red"
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}