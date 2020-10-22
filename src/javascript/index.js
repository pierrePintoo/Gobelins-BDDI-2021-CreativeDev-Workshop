import Mouse from "./utils/mouse"
import Easing from "./utils/easing"
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let container, stats;

let camera, controls, scene, renderer;

let mesh, texture;

init();
animate();

function init() {
    // const canvas = document.querySelector('.main-canvas')


    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 50, 20, 0 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xbfd1e5 );

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    controls = new OrbitControls( camera, renderer.domElement );

    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    // controls.enableZoom = true;
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 10;
    controls.maxDistance = 500;

    controls.keys = {
        LEFT: 37, //left arrow
        UP: 38, // up arrow
        RIGHT: 39, // right arrow
        BOTTOM: 40 // down arrow
    }

    controls.maxPolarAngle = Math.PI / 2;
    
    let loader = new GLTFLoader();

    loader.load( '../assets/Goblins.gltf', function ( gltf ) {

        scene.add( gltf.scene );

    }, undefined, function ( error ) {

        console.error( error );

    } );

    let loader2 = new GLTFLoader();

    loader2.load( '../assets/Goblins.gltf', function ( gltf ) {
        gltf.scene.position.y = 20
        scene.add( gltf.scene );

    }, undefined, function ( error ) {

        console.error( error );

    } );

    let pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.x = 200
    pointLight.position.y = 200
    scene.add(pointLight);

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    // controls.handleResize();

}

function animate() {

    requestAnimationFrame( animate );
    controls.update();
    render();
    // stats.update();

}

function render() {

    // controls.update( clock.getDelta() );
    renderer.render( scene, camera );

}
