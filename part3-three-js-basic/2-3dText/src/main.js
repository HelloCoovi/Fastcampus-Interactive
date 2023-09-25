import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"

import GUI from 'lil-gui'



window.addEventListener("load", function () {
  init()
})

async function init() {
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
  const font = await fontLoader.loadAsync("./asset/fonts/The Jamsil 3 Regular_Regular.json")

  /** Text */
  const textGeometry = new TextGeometry("안녕 친구들!", {
    font: font,
    size: 0.5,
    height: 0.1,

    bevelEnabled: true,    // bevel 효과 활성화, true일 경우 bevel 효과 적용
    bevelSegments: 5,      // bevel의 세그먼트(구분) 수. 값이 클수록 베벨의 모양이 더 부드러워짐
    bevelSize: 0.02,       // bevel의 크기. 값이 클수록 베벨의 너비가 넓어짐
    bevelThickness: 0.02,  // bevel의 두께. 값이 클수록 베벨이 더 굵어짐
  })
  textGeometry.center()
  const textMaterial = new THREE.MeshPhongMaterial({ color: 0x00c896 })

  const text = new THREE.Mesh(textGeometry, textMaterial)
  // textGeometry.computeBoundingBox();
  // console.log("textGeometry.boundingBox: ", textGeometry.boundingBox)
  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x) * 0.5,
  //   -(textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y) * 0.5,
  //   -(textGeometry.boundingBox.max.z - textGeometry.boundingBox.min.z) * 0.5,
  // )
  scene.add(text)

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