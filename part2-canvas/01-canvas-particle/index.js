const canvas = document.querySelector("canvas")

const ctx = canvas.getContext("2d")
const dpr = window.devicePixelRatio

const canvasWidth = 300
const canvasHeight = 300

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
    ctx.fillStyle = "red"
    ctx.fill()
    ctx.closePath()
  }
}

const x = 100
const y = 100
const radius = 50
const particle = new Particle(x, y, radius)

// requestAnimationFrame으로 애니메이션 구현
function animate() {
  window.requestAnimationFrame(animate)
  // 캔버스 전체를 지우는 코드(좌표, canvas 가로, 세로)
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  // 그리기 시작
  particle.draw()
}

animate()