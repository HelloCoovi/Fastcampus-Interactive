import Particle from "./js/Particle.js"

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const dpr = window.devicePixelRatio > 1 ? 2 : 1
const interval = 1000 / 60
let canvasWidth = window.innerWidth
let canvasHeight = window.innerHeight

let particles = []

function init() {
  canvasWidth = window.innerWidth
  canvasHeight = window.innerHeight
  canvas.style.width = canvasWidth + "px"
  canvas.style.height = canvasHeight + "px"
  canvas.width = canvasWidth * dpr
  canvas.height = canvasHeight * dpr
  ctx.scale(dpr, dpr)
}


function confetti({ x, y, count, deg, colors, shapes, spread }) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, deg, colors, shapes, spread))
  }
}


function render() {
  let now, delta
  let then = Date.now()

  let deg = 0

  const frame = () => {
    requestAnimationFrame(frame)
    now = Date.now()
    delta = now - then
    if (delta < interval) return
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)


    deg += 1

    confetti({
      x: 0.5, // 0 ~ 1
      y: 0.5, // 0 ~ 1
      count: 5,
      deg: 210 + deg,
      spread: 1
    })
    confetti({
      x: 0.5, // 0 ~ 1
      y: 0.5, // 0 ~ 1
      count: 5,
      deg: 90 + deg,
      spread: 1
    })
    confetti({
      x: 0.5, // 0 ~ 1
      y: 0.5, // 0 ~ 1
      count: 5,
      deg: 330 + deg,
      spread: 1
    })


    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(ctx);
    }

    particles = particles.filter(function (particle) {
      return particle.opacity > 0 &&
        particle.y <= canvasHeight &&
        particle.x <= canvasWidth &&
        particle.x >= 0;
    });



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

// // 🩺 테스트 코드
// window.addEventListener("click", () => {
//   confetti({
//     x: 0, // 0 ~ 1
//     y: 0.5, // 0 ~ 1
//     count: 10,
//     deg: -50,
//     // colors: ["#FF0000"],
//     // spread: ["circle", "square"]
//     spread: 1
//   })
// })