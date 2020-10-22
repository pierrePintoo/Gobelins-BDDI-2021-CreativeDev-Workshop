

import Mouse from "./utils/mouse"
import Easing from "./utils/easing"
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

const canvas = document.querySelector('.main-canvas')

let time = 0

// Setup Scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({
   canvas: canvas
});

let manager = new THREE.LoadingManager();
let textureLoader = new THREE.TextureLoader(manager)

let texture = textureLoader.load('../assets/papi.jpg')

function onWindowResize() {

   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();

   renderer.setSize( window.innerWidth, window.innerHeight );
   renderer.setPixelRatio(window.devicePixelRatio)

   controls.handleResize();

}

window.addEventListener( 'resize', onWindowResize, false );
// let geometry = new THREE.PlaneBufferGeometry(10, 10, 100, 100)

// let material = new THREE.ShaderMaterial({
//    uniforms: {
//        time: { value: 1.0 },
//        rez: { type: "v2", value: [canvas.width, canvas.height] },
//        mouse: { type: "v2", value: Mouse.cursor },
//        photo: { type: "t", value: texture },
//    },
//    vertexShader: require("../shaders/screen.vert"),
//    fragmentShader: require("../shaders/screen.frag"),
// })


// let mesh = new THREE.Mesh(geometry, material)
// mesh.scale.x = 5
// mesh.scale.y = 5

// mesh.rotation.x = -Math.PI / 2
// mesh.position.y = -10
// mesh.position.z = -30

// scene.add(mesh)

let loader = new GLTFLoader();

loader.load( '../assets/Goblins.gltf', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

let controls = new FirstPersonControls(camera, renderer.domElement)
controls.movementSpeed = 1000;
controls.lookSpeed = 0.1; 

let pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.x = -2
pointLight.position.y = 2
scene.add(pointLight);

let ambientLight = new THREE.AmbientLight(0x111111)
scene.add(ambientLight);

camera.position.z = 20

// à chaque image : 60fps
const update = () => {
   requestAnimationFrame(update)
   time += 0.01

   // material.uniforms.time.value = time
   // material.uniforms.mouse.value = Mouse.cursor

   // mesh.rotation.x += 0.01
   // mesh.rotation.z += 0.005
   // console.log(Mouse.cursor)
   // console.log((Mouse.cursor[0] + 1) / 2, (Mouse.cursor[1] + 1) / 2)

   // Render WebGL Scene
   renderer.render(scene, camera);

}
requestAnimationFrame(update)
