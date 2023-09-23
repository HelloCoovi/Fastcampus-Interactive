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

  const geometry = new THREE.IcosahedronGeometry(1)
  const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    emissive: 0x111111,
  })
  // material.color = new THREE.Color(0x00cb96)

  const cube = new THREE.Mesh(geometry, material)

  scene.add(cube)

  camera.position.z = 5
  // camera.position.set(3, 4, 5) // 카메라 좌표 설정 x, y, z

  camera.lookAt(cube.position)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  scene.add(directionalLight)

  const clock = new THREE.Clock()

  render()

  function render() {
    const elapsedTime = clock.getElapsedTime()

    cube.rotation.x = elapsedTime
    cube.rotation.y = elapsedTime

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