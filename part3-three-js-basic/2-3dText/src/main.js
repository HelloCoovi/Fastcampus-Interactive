import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"
// import typeface from './asset/fonts/The Jamsil 3 Regular_Regular.json'
import GUI from 'lil-gui'



window.addEventListener("load", function () {
  init()
})

function init() {
  const gui = new GUI()
  // const guiOptions = {
  //   color: 0x00ffff
  // }

  const renderer = new THREE.WebGLRenderer({
    antialias: true
  })

  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
  )

  camera.position.z = 5

  /** Controls */
  new OrbitControls(camera, renderer.domElement)

  /** font */
  const fontLoader = new FontLoader()
  fontLoader.load(
    "./asset/fonts/The Jamsil 3 Regular_Regular.json",
    font => {
      const textGeometry = new TextGeometry("안녕 친구들!", {
        font: font,
        size: 0.5,
        height: 0.1,
      })
      const textMaterial = new THREE.MeshPhongMaterial({ color: 0x00c896 })

      const text = new THREE.Mesh(textGeometry, textMaterial)
      scene.add(text)
    }
    // event => console.log("progress", event),
    // error => console.log("error", error),
  )
  // const font = fontLoader.parse(typeface)



  /** AmbientLight */
  const ambientLight = new THREE.AmbientLight(0xffffff, 1)
  scene.add(ambientLight)

  /** PointLight */
  const pointLight = new THREE.PointLight(0xffffff, 30)
  pointLight.position.set(3, 0, 2)
  scene.add(pointLight)

  const pointerLightHelper = new THREE.PointLightHelper(pointLight, 0.5)
  scene.add(pointerLightHelper)

  /** lil-GUI */
  // pointerLight
  gui.add(pointLight.position, "x").min(-3).max(3).step(0.1)

  render()

  function render() {
    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)

    renderer.render(scene, camera)
  }

  window.addEventListener("resize", handleResize)
}