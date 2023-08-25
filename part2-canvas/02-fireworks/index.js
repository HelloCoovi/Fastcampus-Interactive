import CanvasOption from "./js/CanvasOption.js"

class Canvas extends CanvasOption {
  constructor() {
    super()
  }

  init() {
    this.canvasWidth = window.innerWidth
    this.canvasHeight = window.innerHeight
    this.canvas.width = this.canvasWidth * this.dpr
    this.canvas.height = this.canvasHeight * this.dpr
    this.ctx.scale(this.dpr, this.dpr)

    this.canvas.style.width = this.canvasWidth + "px"
    this.canvas.style.height = this.canvasHeight + "px"
  }

  render() {
    let now, delta
    let then = Date.now()

    const frame = () => {
      requestAnimationFrame(frame)
      now = Date.now()
      delta = now - then
      if (delta < this.interval) return

      this.ctx.fillRect(100, 100, 200, 200)

      then = now - (delta % this.interval)
    }
    requestAnimationFrame(frame)
  }
}

const canvas = new Canvas()

window.addEventListener("load", () => {
  canvas.init()
  canvas.render()
})

window.addEventListener("resize", () => {
  canvas.init()
})