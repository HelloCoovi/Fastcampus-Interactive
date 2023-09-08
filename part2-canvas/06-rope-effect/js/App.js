import Dot from './Dot.js'
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

    this.dots = [
      new Dot(App.width * 0.1, App.height * 0.1),
      new Dot(App.width * 0.2, App.height * 0.2)
    ]
    this.sticks = [
      new Stick(this.dots[0], this.dots[1])
    ]
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

      // this.ctx.clearRect(0, 0, App.width, App.height)

      this.dots.forEach(dot => {
        dot.update()
        dot.draw(this.ctx)
      })
      this.sticks.forEach(stick => {
        stick.update()
        stick.draw(this.ctx)
      })
    }
    requestAnimationFrame(frame)
  }
}
