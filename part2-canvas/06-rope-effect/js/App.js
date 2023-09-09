import Dot from './Dot.js'
import Mouse from './Mouse.js'
import Stick from './Stick.js'

export default class App {
  static width = window.innerWidth
  static height = window.innerHeight
  static dpr = window.devicePixelRatio > 1 ? 2 : 1
  static interval = 1000 / 60

  constructor() {
    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')

    this.resize()
    window.addEventListener("resize", this.resize.bind(this))

    this.mouse = new Mouse(this.canvas)

    this.dots = [
      new Dot(App.width * 0.1, App.height * 0.2),
      new Dot(App.width * 0.4, App.height * 0.1),
      // new Dot(App.width * 0.5, App.height * 0.05),
      // new Dot(App.width * 0.7, App.height * 0.05),
    ]
    this.sticks = [
      new Stick(this.dots[0], this.dots[1]),
      // new Stick(this.dots[1], this.dots[2]),
      // new Stick(this.dots[2], this.dots[3]),
    ]

    this.dots[0].pinned = true
  }


  resize() {
    App.width = window.innerWidth
    App.height = window.innerHeight
    this.canvas.style.width = `${App.width}px`
    this.canvas.style.height = `${App.height}px`
    this.canvas.width = App.width * App.dpr
    this.canvas.height = App.height * App.dpr
    this.ctx.scale(App.dpr, App.dpr)
  }

  render() {
    let now, delta
    let then = Date.now()

    const frame = () => {
      requestAnimationFrame(frame)
      now = Date.now()
      delta = now - then
      if (delta < App.interval) return
      then = now - (delta % App.interval)

      this.ctx.clearRect(0, 0, App.width, App.height)

      this.dots.forEach(dot => dot.update(this.mouse))
      this.sticks.forEach(stick => stick.update())

      this.dots.forEach(dot => dot.draw(this.ctx))
      this.sticks.forEach(stick => stick.draw(this.ctx))
    }
    requestAnimationFrame(frame)
  }
}
