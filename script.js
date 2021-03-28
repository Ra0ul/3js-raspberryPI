import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MixOperation } from 'three'


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


const gltfLoader = new GLTFLoader()

gltfLoader.load(
    '/models/untitled.gltf',
    (gltf) => {
        for (let i = 0; i < 5; i++) {
            let copy = gltf.scene.clone()

            copy.scale.set(0.2, 0.2, 0.2)
            copy.position.set(i, 0, 0)

            gltf.scene.scale.set(0.5, 0.5, 0.5)
            gltf.scene.position.set(-10, 3, -8)
            scene.add(gltf.scene)

            scene.add(copy)

            let animate = () => {
                gltf.scene.rotation.y += 0.03
                copy.rotation.z += 0.03
                renderer.render(scene, camera)
                requestAnimationFrame(animate)
            }
            animate()
        }
    }
)

/**[copy mesh X2] 
gltfLoader.load(
    '/models/untitled.gltf',
    (gltf) => {

        let copy = gltf.scene.clone()

        gltf.scene.scale.set(0.5, 0.5, 0.5)
        gltf.scene.position.set(2, 3, -8)
        scene.add(gltf.scene)

        copy.scale.set(0.3, 0.3, 0.3)
        copy.position.set = (3, 0, 0)
        scene.add(copy)

        let animate = () => {
            gltf.scene.rotation.y += 0.03
            gltf.scene.rotation.z += 0.03
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }
        animate()
    }
)
*/

/**
 * Lights
 */
let olla01 = 0xff0000
let olla02 = 0x0000ff

const directionalLight01 = new THREE.DirectionalLight(olla01, 3)
directionalLight01.castShadow = true

directionalLight01.position.set(- 5, 5, 0)
scene.add(directionalLight01)

const directionalLight02 = new THREE.DirectionalLight(olla02, 0.8)
directionalLight02.castShadow = true

directionalLight02.position.set(5, -5, 3)
scene.add(directionalLight02)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 4)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // // Render
    // renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()