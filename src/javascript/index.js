

import Mouse from "./utils/mouse"
import Easing from "./utils/easing"
import * as THREE from 'three'

const canvas = document.querySelector('#main-canvas')

let time = 0

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
let renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

let geometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1)
let material = new THREE.RawShaderMaterial({
    uniforms: {
        time: {value: 1.0},
        rez: { type: 'v2', value: [canvas.width, canvas.height]},
        mouse: { type: 'v2', value: Mouse.cursor}
    },
    vertexShader: require('../shaders/screen.vert'),
    fragmentShader: require('../shaders/screen.frag')
})

let mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

camera.position.z = 5

const update = () => {
    requestAnimationFrame(update)

    time += 0.01
    
    material.uniforms.time.value = time
    material.uniforms.mouse.value = Mouse.cursor


    mesh.rotation.x += .01
    mesh.rotation.z += .005

    renderer.render(scene, camera)
}
requestAnimationFrame(update)
