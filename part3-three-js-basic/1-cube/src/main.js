import * as THREE from 'three'

window.addEventListener("load", function () {
  init()
})

function init() {
  const renderer = new THREE.WebGLRenderer()

  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    75, // 시야각
    window.innerWidth / window.innerHeight, // 종횡비
    1, // 최소 시야 거리
    500  // 최대 시야 거리
  )

  renderer.render(scene, camera)
}