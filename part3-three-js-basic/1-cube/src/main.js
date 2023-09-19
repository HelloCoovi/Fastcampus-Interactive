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
  const material = new THREE.MeshBasicMaterial({ color: 0xcc99ff })

  const cube = new THREE.Mesh(geometry, material)

  scene.add(cube)

  // camera.position.z = 5
  camera.position.set(3, 4, 5) // 카메라 좌표 설정 x, y, z

  camera.lookAt(cube.position)

  renderer.render(scene, camera)
}