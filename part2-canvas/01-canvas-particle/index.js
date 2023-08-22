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

ctx.beginPath()
// X시작위치, Y시작위치, 반지름, 시작각도, 끝나는 각도(radian계산법)
// 🎯 Math.PI / 180은 radian계산법으로 1 이며 이것에 360을 곱함으로써 360을 만드는것
ctx.arc(100, 100, 50, 0, Math.PI / 180 * 360)
// 원을 채울 색상을 고르고 fill()로 채워줌
ctx.fillStyle = "red"
ctx.fill()
ctx.stroke()  // 채우기 없이 선 그리기
ctx.closePath()