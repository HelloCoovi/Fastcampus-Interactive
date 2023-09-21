import * as THREE from 'three'

window.addEventListener("load", function () {
  init()
})

function init() {
  const renderer = new THREE.WebGLRenderer({
    // alpha: true,  // 검정 배경 지우기(투명한 배경)
    antialias: true  // 렌더링시 계단 현상 해결(안티 앨리어싱)
  })

  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    75, // 시야각
    window.innerWidth / window.innerHeight, // 종횡비
    1, // 최소 시야 거리
    500  // 최대 시야 거리
  )

  const geometry = new THREE.BoxGeometry(2, 2, 2) // 높이, 너비, 깊이
  const material = new THREE.MeshStandardMaterial({
    // color: 0xcc99ff
    color: new THREE.Color(0xcc99ff),
    transparent: true,
    opacity: 0.5,
    // visible: false,
    // wireframe: true,
    side: THREE.DoubleSide,
  })
  material.color = new THREE.Color(0x00cb96)

  const cube = new THREE.Mesh(geometry, material)

  scene.add(cube)

  // camera.position.z = 5
  camera.position.set(3, 4, 5) // 카메라 좌표 설정 x, y, z

  camera.lookAt(cube.position)

  const directionalLight = new THREE.DirectionalLight(0xf0f0f0, 1)
  directionalLight.position.set(-1, 2, 3)
  scene.add(directionalLight)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
  ambientLight.position.set(3, 2, 1)
  scene.add(ambientLight)

  renderer.render(scene, camera)
}