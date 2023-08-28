const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const dpr = window.devicePixelRatio > 1 ? 2 : 1
const interval = 1000 / 60
let canvasWidth = window.innerWidth
let canvasHeight = window.innerHeight

function init() {
  canvasWidth = window.innerWidth
  canvasHeight = window.innerHeight
  canvas.style.width = canvasWidth + "px"
  canvas.style.height = canvasHeight + "px"
  canvas.width = canvasWidth * dpr
  canvas.height = canvasHeight * dpr
  ctx.scale(dpr, dpr)
}

function render() {
  let now, delta
  let then = Date.now()

  const frame = () => {
    requestAnimationFrame(frame)
    now = Date.now()
    delta = now - then
    if (delta < interval) return

    ctx.fillStyle = "red"
    ctx.fillRect(200, 200, 50, 50)

    then = now - (delta % interval)
  }
  requestAnimationFrame(frame)
}

window.addEventListener("load", () => {
  init()
  render()
})

window.addEventListener("resize", () => {
  init()
})