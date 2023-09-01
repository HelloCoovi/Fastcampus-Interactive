import Background from "./Background.js"

export default class App {
  static canvas = document.querySelector("canvas")
  static ctx = App.canvas.getContext("2d")
  static dpr = devicePixelRatio > 1 ? 2 : 1
  static interval = 1000 / 60
  static width = 1024
  static height = 768

  constructor() {
    this.background = new Background()

    // 🎯 자동으로 실행되는 로직, bind로 this조정
    window.addEventListener("resize", this.resize.bind(this))
  }

  resize() {
    App.canvas.width = App.width * App.dpr
    App.canvas.height = App.height * App.dpr
    App.ctx.scale(App.dpr, App.dpr)

    // 화면의 가로 세로 비율이 항상 4 : 3을 유지하게 하는 로직
    const width = window.innerWidth > window.innerHeight ?
      window.innerHeight * 0.9 :
      window.innerWidth * 0.9
    App.canvas.style.width = width + "px"
    App.canvas.style.height = width * (3 / 4) + "px"
  }

  render() {
    let now, delta
    let then = Date.now()

    const frame = () => {
      requestAnimationFrame(frame)
      now = Date.now()
      delta = now - then
      if (delta < App.interval) return


      App.ctx.clearRect(0, 0, App.width, App.height)
      App.ctx.fillRect(50, 50, 100, 100)

      this.background.update()
      this.background.draw()


      then = now - (delta % App.interval)
    }
    requestAnimationFrame(frame)
  }
};