const canvas = document.querySelector("canvas")

const ctx = canvas.getContext("2d")
const dpr = window.devicePixelRatio

// dat.gui 생성자
let gui = new dat.GUI()

// 도대체 강의에서 이 코드를 왜 쓰는지 이해가 안됌
// const controls = new function () {
//   this.blurValue = 40
//   this.alphaChannel = 100
//   this.alphaOffset = -23
//   this.acc = 1.03
// }

// ⬇️ 임의로 수정한 코드
// 조작할 요소 지정
const controls = {
  blurValue: 40,
  alphaChannel: 80,
  alphaOffset: -23,
  acc: 1.03
}

const feGaussianBlur = document.querySelector('feGaussianBlur')
const feColorMatrix = document.querySelector('feColorMatrix')

// 폴더 만들기
const f1 = gui.addFolder('Gooey Effect')
// 폴더가 열려있게 설정
f1.open()
// 특정 폴더에 컨트롤할 값 넣기 폴더를 원치 않는다면 gui.add(~~)로 기입
f1.add(controls, 'blurValue', 0, 100).onChange(value => {
  feGaussianBlur.setAttribute('stdDeviation', value)
})
// 🎯조작하는 하나의 값을 조작하면서 다른 값을 유지하기위해 조작하지 않는 값은 controls를 확인하게 설정
f1.add(controls, 'alphaChannel', 1, 200).onChange(value => {
  feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} ${controls.alphaOffset}`)
})
f1.add(controls, 'alphaOffset', -40, 40).onChange(value => {
  feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${value}`)
})

const f2 = gui.addFolder('Particle Property')
f2.open()
f2.add(controls, 'acc', 1, 1.5, 0.01).onChange(value => {
  particles.forEach(particle => particle.acc = value)
})

class Particle {
  constructor(x, y, radius, vy) {
    this.x = x
    this.y = y
    this.radius = radius
    this.vy = vy
    this.acc = 1.05
    // this.acc = 0.99
  }
  update() {
    this.vy *= this.acc
    this.y += this.vy
  }
  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360)
    ctx.fillStyle = "orange"
    ctx.fill()
    ctx.closePath()
  }
}

const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min
}

let canvasWidth
let canvasHeight
let particles

function init() {
  canvasWidth = window.innerWidth
  canvasHeight = window.innerHeight

  canvas.width = canvasWidth * dpr
  canvas.height = canvasHeight * dpr
  ctx.scale(dpr, dpr)

  canvas.style.width = canvasWidth + 'px'
  canvas.style.height = canvasHeight + 'px'

  particles = []
  const TOTAL = canvasWidth / 12

  for (let i = 0; i < TOTAL; i++) {
    const x = randomNumBetween(0, canvasWidth)
    const y = randomNumBetween(0, canvasHeight)
    const radius = randomNumBetween(50, 100)
    const vy = randomNumBetween(1, 3)
    particles.push(new Particle(x, y, radius, vy))
  }
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
    particle.update()
    particle.draw()

    if (particle.y - particle.radius > canvasHeight) {
      particle.x = randomNumBetween(0, canvasWidth)
      particle.y = -particle.radius
      particle.radius = randomNumBetween(50, 100)
      particle.vy = randomNumBetween(1, 3)
    }
  }))

  then = now - (delta % interval)
}

window.addEventListener('load', () => {
  init()
  animate()
})

window.addEventListener('resize', () => {
  init()
})