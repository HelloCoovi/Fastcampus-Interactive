import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.autoRotate = true  // 자동으로 카메라 회전
  // controls.autoRotateSpeed = 10  // autoRotate 속도 조절
  controls.enableDamping = true // 카메라 드래그 관성 조절하기
  // controls.dampingFactor = 0.01 // 관성정도 조정하기
  // controls.enableZoom = true  // 마우스 휠로 확대
  // controls.enablePan = true  // 마우스 우클릭으로 카메라 좌우 이동
  controls.minDistance = 10  // 최소 확대
  controls.maxDistance = 50  // 최대 확대
  controls.minPolarAngle = Math.PI / 4  // 최소 수직 카메라 각도
  controls.maxPolarAngle = Math.PI / 2  // 최대 수직 카메라 각도
  controls.minAzimuthAngle = Math.PI / 4  // 최소 수평 카메라 각도
  controls.maxAzimuthAngle = Math.PI / 2  // 최대 수평 카메라 각도

  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  const cubeGeometry = new THREE.IcosahedronGeometry(1)
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    emissive: 0x111111,
  })
  // material.color = new THREE.Color(0x00cb96)
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

  const skeletonGeometry = new THREE.IcosahedronGeometry(2)
  const skeletonMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0.2,
    color: 0xaaaaaa,
  })
  const skeleton = new THREE.Mesh(skeletonGeometry, skeletonMaterial)

  scene.add(cube, skeleton)

  camera.position.z = 5
  // camera.position.set(3, 4, 5) // 카메라 좌표 설정 x, y, z

  camera.lookAt(cube.position)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  scene.add(directionalLight)

  const clock = new THREE.Clock()

  render()

  function render() {
    const elapsedTime = clock.getElapsedTime()

    // cube.rotation.x = elapsedTime
    // cube.rotation.y = elapsedTime

    // skeleton.rotation.x = elapsedTime * 1.5
    // skeleton.rotation.y = elapsedTime * 1.5

    renderer.render(scene, camera)

    controls.update()

    requestAnimationFrame(render)
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)

    renderer.render(scene, camera)

    controls.update()
  }

  window.addEventListener("resize", handleResize)
}