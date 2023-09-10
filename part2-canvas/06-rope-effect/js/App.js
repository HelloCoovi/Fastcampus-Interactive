import Dot from './Dot.js'
import Mouse from './Mouse.js'
import Rope from './Rope.js'
import Stick from './Stick.js'
import { randomNumBetween } from './utils.js'

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
  }


  resize() {
    App.width = window.innerWidth
    App.height = window.innerHeight
    this.canvas.style.width = `${App.width}px`
    this.canvas.style.height = `${App.height}px`
    this.canvas.width = App.width * App.dpr
    this.canvas.height = App.height * App.dpr
    this.ctx.scale(App.dpr, App.dpr)

    this.initRopes()
  }

  initRopes() {
    this.ropes = []
    const TOTAL = App.width * 0.06

    for (let i = 0; i < TOTAL; i++) {
      const rope = new Rope({
        x: randomNumBetween(App.width * 0.3, App.height * 0.7),
        y: 0
      })
      rope.pin(0)
      this.ropes.push(rope)
    }
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

      this.ropes.forEach(rope => {
        rope.update(this.mouse)
        rope.draw(this.ctx)

      })
    }
    requestAnimationFrame(frame)
  }
}
