import Background from "./Background.js"
import Wall from "./Wall.js"
import Player from "./Player.js"
import Coin from "./Coin.js"
import Score from "./Score.js"
import GameHandler from "./GameHandler.js"

export default class App {
  static canvas = document.querySelector("canvas")
  static ctx = App.canvas.getContext("2d")
  static dpr = devicePixelRatio > 1 ? 2 : 1
  static interval = 1000 / 60
  static width = 1024
  static height = 768

  constructor() {
    this.backgrounds = [
      new Background({ img: document.querySelector("#bg3-img"), speed: 1 }),
      new Background({ img: document.querySelector("#bg2-img"), speed: 2 }),
      new Background({ img: document.querySelector("#bg1-img"), speed: 4 })
    ]
    this.walls = [new Wall({ type: "SMALL" })]
    this.player = new Player()
    this.coins = []
    this.score = new Score()
    this.gameHandler = new GameHandler(this)
  }

  init() {
    App.canvas.width = App.width * App.dpr
    App.canvas.height = App.height * App.dpr
    App.ctx.scale(App.dpr, App.dpr)

    this.backgrounds.forEach(background => {
      background.draw()
    })
  }

  render() {
    let now, delta
    let then = Date.now()

    const frame = () => {
      requestAnimationFrame(frame)
      now = Date.now()
      delta = now - then
      if (delta < App.interval) return


      if (this.gameHandler.status !== "PLAYING") return

      App.ctx.clearRect(0, 0, App.width, App.height)

      // 배경 애니메이션
      this.backgrounds.forEach(background => {
        background.update()
        background.draw()
      })

      // 벽(장애물) 애니메이션
      let newWall = []

      this.walls.forEach(wall => {
        wall.update();
        wall.draw();

        // 벽 생성
        if (wall.canGenerateNext) {
          wall.generatedNext = true
          newWall = [new Wall({ type: Math.random() > 0.3 ? 'SMALL' : 'BIG' })]

          // 코인 생성 로직
          if (Math.random() < 0.5) {
            const x = newWall[0].x + newWall[0].width / 2
            const y = newWall[0].y2 - newWall[0].gapY / 2
            const vx = newWall[0].vx
            this.coins.push(new Coin(x, y, vx))
          }
        }
      })
      // isOutside로 화면에서 나간 요소를 제외한 배열 생성 + 새로운 벽이 생겼다면 this.walls와 병합
      this.walls = this.walls.filter(wall => !wall.isOutside).concat(newWall)
      // isOutside로 화면에서 벗어난 요소 삭제
      this.coins = this.coins.filter(coin => !coin.isOutside)

      const isCollidingAnyWall = this.walls.some(wall => wall.isColliding(this.player.boundingBox));

      if (isCollidingAnyWall) {
        this.gameHandler.status = "FINISHED"
        return;
      }

      // 플레이어 애니메이션
      this.player.update()
      this.player.draw()

      // 코인 애니메이션
      this.coins.forEach((coin) => {
        coin.update()
        coin.draw()
      })

      const isCollidingAnyCoin = this.coins.some(coin => coin.boundingBox.isColliding(this.player.boundingBox));

      if (isCollidingAnyCoin) {
        this.coins = this.coins.filter(coin => !coin.boundingBox.isColliding(this.player.boundingBox));
        this.score.coinCount++
      }

      // 점수관련 로직
      this.score.update()
      this.score.draw()


      then = now - (delta % App.interval)
    }
    requestAnimationFrame(frame)
  }
};