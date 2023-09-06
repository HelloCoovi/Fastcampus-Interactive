export default class GameHandler {
  constructor(app) {
    this.app = app
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
      case "FINISHED": this.showFinishScreen(); break
    }
  }

  init() {
    this.readyScreen = document.querySelector(".ready-screen")
    this.gameTitle = this.readyScreen.querySelector(".game-title")
    this.playBtn = this.readyScreen.querySelector(".play-btn")
    this.playBtn.addEventListener("click", () => {
      this.hideReadyScreen();
    })

    this.finishScreen = document.querySelector(".finish-screen")
    this.distanceText = this.finishScreen.querySelector(".distance")
    this.coinText = this.finishScreen.querySelector(".coin")
    this.replayBtn = this.finishScreen.querySelector(".replay-btn")
    this.replayBtn.addEventListener("click", () => {
      this.hideFinishScreen();
    })

    this.status = "READY"
    // this.status = "FINISHED"
  }

  showReadyScreen() {
    gsap.to(this.gameTitle, {
      scale: 1, rotation: 720, opacity: 1, duration: 0.5
    })
    gsap.to(this.playBtn, {
      scale: 1, duration: 1, ease: Elastic.easeOut.config(2, 0.5), delay: 0.5, pointerEvents: "all"
    })
  }
  hideReadyScreen() {
    gsap.to(this.readyScreen, {
      opacity: 0, pointerEvents: "none", duration: 0.3, display: "none", onComplete: () => {
        this.status = "PLAYING"
      }
    })
  }

  showFinishScreen() {
    this.distanceText.innerText = `${this.app.score.distCount.toFixed(1)}m`
    this.coinText.innerText = `${this.app.score.coinCount} coin`

    gsap.set(this.distanceText, { y: 0 });
    gsap.set(this.coinText, { y: 0 });
    gsap.set(this.replayBtn, { opacity: 0, scale: 0, y: 0, rotation: 0, pointerEvents: "none" });

    gsap.fromTo(this.finishScreen, { opacity: 0 }, {
      opacity: 1, duration: 0.5, display: "flex"
    })
    gsap.fromTo(this.distanceText, { opacity: 0, scale: 0 }, {
      opacity: 1, scale: 1, duration: 0.5, delay: 1
    })
    gsap.fromTo(this.coinText, { opacity: 0, scale: 0 }, {
      opacity: 1, scale: 1, duration: 0.5, delay: 1.1
    })
    gsap.to(this.distanceText, {
      duration: 0.5, y: -80, delay: 1.5
    })
    gsap.to(this.coinText, {
      duration: 0.5, y: -80, delay: 1.5
    })
    gsap.fromTo(this.replayBtn, { opacity: 0, scale: 0, pointerEvents: "all" }, {
      opacity: 1, scale: 1, rotation: -720, duration: 0.5, y: 50, delay: 1.5
    })
  }
  hideFinishScreen() {
    gsap.fromTo(this.finishScreen, { opacity: 1 }, {
      opacity: 0, pointerEvents: "none", duration: 0.3
    })
    this.status = "PLAYING"
    this.app.reset()
  }
}