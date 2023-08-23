const canvas = document.querySelector("canvas")

const ctx = canvas.getContext("2d")
const dpr = window.devicePixelRatio

const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight

canvas.style.width = canvasWidth + "px"
canvas.style.height = canvasHeight + "px"
canvas.width = canvasWidth * dpr
canvas.height = canvasHeight * dpr
ctx.scale(dpr, dpr)

ctx.fillRect(10, 10, 50, 50)

class Particle {
  constructor(x, y, radius) {
    this.x = x
    this.y = y
    this.radius = radius
  }
  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360)
    ctx.fillStyle = "orange"
    ctx.fill()
    ctx.closePath()
  }
}

const TOTAL = 5
const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min
}

const anime = () => {

}
let particles = []

for (let i = 0; i < TOTAL; i++) {
  const x = randomNumBetween(0, canvasWidth)
  const y = randomNumBetween(0, canvasHeight)
  const radius = randomNumBetween(50, 100)
  particles.push(new Particle(x, y, radius))
}

let interval = 1000 / 60
let now, delta
let then = Date.now()

// requestAnimationFrame으로 애니메이션 구현
function animate() {
  window.requestAnimationFrame(animate)
  now = Date.now()
  delta = now - then

  if (delta < interval) return

  // 캔버스 전체를 지우고 y 그리기
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)

  particles.forEach((particle => {
    particle.draw()
  }))

  then = now - (delta % interval)
}

animate()