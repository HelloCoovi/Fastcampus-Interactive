export default class GameHandler {
  constructor() {
    this._status = "READY" // READY, PLAYING, FINISHED

    this.init()
  }

  get status() {
    return this._status
  }
  set status(value) {
    this._status = value

    switch (value) {
      case "READY": this.showReadyScreen(); break
    }
  }

  init() {
    this.readyScreen = document.querySelector(".ready-screen")
    this.gameTitle = this.readyScreen.querySelector(".game-title")
    this.playBtn = this.readyScreen.querySelectorAll(".play-btn")

    this.status = "READY"
  }

  showReadyScreen() {
    gsap.to(this.gameTitle, {
      scale: 1, rotation: 720, opacity: 1, duration: 0.5
    })
    gsap.to(this.playBtn, {
      scale: 1, duration: 1, ease: Elastic.easeOut.config(2, 0.5), delay: 0.5
    })
  }
}