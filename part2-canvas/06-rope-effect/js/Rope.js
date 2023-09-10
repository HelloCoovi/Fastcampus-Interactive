import Dot from "./Dot.js"
import Stick from "./Stick.js"

export default class Rope {
  constructor(config) {
    this.x = config.x
    this.y = config.y
    this.segments = config.segments || 10
    this.gap = config.gap || 50
    this.iterations = config.iterations || 10

    this.dots = []
    this.sticks = []

    this.create()
  }

  pin(index) {
    this.dots[index].pinned = true
  }

  checkPullingOut() {
    const dist = this.dots[0].pos.dist(this.dots[1].pos)
    if (dist / this.sticks[0].length > 1.5) {
      this.dots[0].pinned = false
    }
  }

  create() {
    for (let i = 0; i < this.segments; i++) {
      this.dots.push(new Dot(this.x, this.y + (i * this.gap)))
    }
    for (let i = 0; i < this.segments - 1; i++) {
      this.sticks.push(new Stick(this.dots[i], this.dots[i + 1]))
    }
  }

  update(mouse) {
    this.dots.forEach(dot => dot.update(mouse))

    for (let i = 0; i < this.iterations; i++) {
      this.sticks.forEach(stick => stick.update())
    }
  }

  draw(ctx) {
    this.checkPullingOut()

    this.dots.forEach(dot => dot.draw(ctx))
    this.sticks.forEach(stick => stick.draw(ctx))

    this.dots[this.dots.length - 1].drawLight(ctx)
  }
}