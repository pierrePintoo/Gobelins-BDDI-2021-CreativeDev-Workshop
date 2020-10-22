import Mouse from "./utils/mouse"
import Easing from "./utils/easing"
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// let canvas = document.getElementById('canvas')
// let c = canvas.getContext('2d')  

// function drawResponse(datas){
//     initCanvas()
//     drawAllPersons(datas)
// }

// function initCanvas() {
//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight
  
//     c.fillStyle = 'rgba(255,0,0,0.5)';
//     c.fillRect( 0, 0, canvas.width, canvas.height);
//     c.fill()
// }

function getRandomIntBefore255(){
    let randomNumber = Math.floor(Math.random() * 255)
    return randomNumber
}

// function drawAllPersons(datas){
//     let x = 300
//     let y = 100
//     let r = 20
//     let randomInt = 0
//     let gender
//     // for (let i = 0; i < datas.length; i++){
//     //     if(x > canvas.width - 100){
//     //         x = 300
//     //         y += 50
//     //     }
//     //     c.beginPath()
//     //     randomInt = getRandomIntBefore255()
//     //     isGender(datas, c)
//     //     c.arc(x, y, r, 0, Math.PI * 2)
//     //     c.fill()
//     //     c.closePath()
//     //     x += 50
//     // }
//     datas.forEach((el) => {
//         if(x > canvas.width - 100){
//             x = 300
//             y += 50
//         }
//         c.beginPath()
//         randomInt = getRandomIntBefore255()
//         isGender(el, c)
//         c.arc(x, y, r, 0, Math.PI * 2)
//         c.fill()
//         c.closePath()
//         x += 50
//     })
// }

let filters = {
    "sexe": false,
    "localisation": false,
    "bac": false,
    "avenir_lycee": false,
    "premiere_idee_etudes": false,
    "influences" : false,
    "reorientation" : false,
    "epanoui": false,
    "changement_etudes" : false,
    "reco_etudes" : false,
    "jeux_videos" : false,
    "vision_dix_ans" : false
} 
console.log(filters)

function isGender(el, c){
        if(el.sexe === "homme" && filters.sexe){
            // console.log('bite')
            c.fillStyle = `blue`;
        } else if(el.sexe === "femme" && filters.sexe){
            c.fillStyle = `red`;
        } else {
            c.fillStyle = `grey`;
        }
}

function listenFilters2 () {
    let activatedFilters = []
    let inputs = []
    let options = []
    inputs = document.querySelectorAll("input")
    options = document.querySelectorAll("option")
    activatedFilters.push(inputs)
    activatedFilters.push(options)

    for(let i = 0; i < inputs.length; i++){
        // console.log(inputs)
        if(inputs[i].checked){
            filters[inputs[i].attributes["name"].value] = true
        } else if (inputs[i].checked === false){
            filters[inputs[i].attributes["name"].value] = false
        } 
    }
    console.log(filters)
}


let datas = [];
let filteredDatas = []
let personsToDraw = []
let began = false;
let first = true;
let etatJointure = false;
let requestURL = '../datas_mercredi_midi.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    datas = request.response
    document.onclick = (e) => {
        if(e.target.checked){
            listenFilters2()
            modelAllPersons(datas, loaders)
        } else {
            listenFilters2()
            modelAllPersons(datas, loaders)
        }
    }

}

let container, stats;

let camera, controls, scene, renderer;

let mesh, texture;

let loaders = []

init();
animate();

function modelAllPersons(datas, loaders){

    let x = 0
    let y = -20
    let z = 20
    let i = 0
    datas.forEach(gobelin => {
        i++
        loaders[i] = new GLTFLoader();

        loaders[i].load( '../assets/Goblins.gltf', function ( gltf ) {
            // console.log(gltf.scene.children)
            if(gobelin.sexe === "homme" && filters.sexe){
                gltf.scene.children.forEach(el => {
                    if(el.type === "Mesh"){
                        el.material.color.r = 0
                        el.material.color.g = 0
                        el.material.color.b = 255
                        // console.log(el.material.color)
                    }
                });
            } else if (gobelin.sexe === "femme" && filters.sexe){
                gltf.scene.children.forEach(el => {
                    if(el.type === "Mesh"){
                        el.material.color.r = 255
                        el.material.color.g = 0
                        el.material.color.b = 0
                        // console.log(el.material.color)
                    }
                });
            }
            if(z < -40){
                z = 20
                y += 15
            }
            z -= 5
            gltf.scene.position.x = 0
            gltf.scene.position.y = y // de -30 à 30
            gltf.scene.position.z = z // de 10 à -50
            scene.add( gltf.scene );
    
        }, undefined, function ( error ) {
    
            console.error( error );
    
        } );        
    });

}
function init() {
    // const canvas = document.querySelector('.main-canvas')


    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 500 );
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
