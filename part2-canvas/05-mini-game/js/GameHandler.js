export default class GameHandler {
  constructor() {
    this._status = "READY" // READY, PLAYING, FINISHED

    this.init()
    this.showReadyScreen()
  }

  init() {
    this.readyScreen = document.querySelector(".ready-screen")
    this.gameTitle = this.readyScreen.querySelector(".game-title")
    this.playBtn = this.readyScreen.querySelector(".play-btn")
  }

  showReadyScreen() {
    gsap.to(this.gameTitle, {
      scale: 1, rotation: 720, opacity: 1, duration: 0.5
    })
  }
}