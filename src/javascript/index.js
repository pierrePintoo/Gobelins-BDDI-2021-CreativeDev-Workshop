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

// let filters = {
//     "sexe": false,
//     "localisation": false,
//     "bac": false,
//     "avenir_lycee": false,
//     "premiere_idee_etudes": false,
//     "influences" : false,
//     "reorientation" : false,
//     "epanoui": false,
//     "changement_etudes" : false,
//     "reco_etudes" : false,
//     "jeux_videos" : false,
//     "vision_dix_ans" : false
// } 

let filters = {
    "sexe": {
        "homme": false,
        "femme": false
    },
    "localisation": {
        "Campagne" : false,
        "Metropole" : false
    },
    "bac": {
        "S" : false,
        "ES": false,
        "L": false,
        "Techno": false,
        "Pro": false
    },
    "avenir_lycee": 
    {
        "Oui": false,
        "Non": false
    },
    "premiere_idee_etudes": {
        "Oui" : false,
        "Non" : false
    },
    "influences" : {
        "Personne": false,
        "Amis": false,
        "parents": false,
        "Autre": false
    },
    "reorientation" : {
        "Oui" : false,
        "Non" : false
    },
    "epanoui":{
        "Oui" : false,
        "Non" : false
    },
    "changement_etudes" : {
        "Oui" : false,
        "Non" : false
    },
    "reco_etudes" : {
        "Oui" : false,
        "Non" : false        
    },
    "jeux_videos" : {
        "Oui" : false,
        "Non" : false        
    },
    "vision_dix_ans" : {
        "CDI" : false,
        "Freelance" : false
    }
}    

// console.log(filters)

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
    // console.log(filters)
}

function listenFilters(){
    let activatedFilters = []
    let inputs = []
    let options = []
    inputs = document.querySelectorAll("input")
    options = document.querySelectorAll("option")
    activatedFilters.push(inputs)
    activatedFilters.push(options)

    for(let j = 0; j < activatedFilters.length; j++){
        if(j == 0){
            // Si c'est un élément input radio
            for(let i = 0; i < activatedFilters[j].length; i++){
                // console.log(activatedFilters[j])
                if(activatedFilters[j][i].checked){
                    filters[activatedFilters[j][i].attributes["name"].value][activatedFilters[j][i].attributes["value"].value] = true
                } else if (activatedFilters[j][i].checked === false){
                    filters[activatedFilters[j][i].attributes["name"].value][activatedFilters[j][i].attributes["value"].value] = false
                } 
            }
        } else if (j == 1){
            // Si c'est une boite option dans un select
            for(let i = 0; i < activatedFilters[j].length; i++){
                // console.log(filters)
                if(activatedFilters[j][i].selected){
                    if(filters[activatedFilters[j][i].parentNode.attributes["name"].value][activatedFilters[j][i].attributes["value"].value] == "ES"){
                        console.log('ha gros c\'est true')
                    }
                    filters[activatedFilters[j][i].parentNode.attributes["name"].value][activatedFilters[j][i].attributes["value"].value] = true
                } else if (activatedFilters[j][i].selected === false){
                    filters[activatedFilters[j][i].parentNode.attributes["name"].value][activatedFilters[j][i].attributes["value"].value] = false
                } 
            }
        }
    }

    // console.log(filters)
}





let container, stats;

let camera, controls, scene, renderer;

let mesh, texture;

let loaders = []

init();
animate();

function modelAllPersons(gobelins, loaders){
gobelins.forEach( gobelin => {
    gobelin.affiche = true
})
    let x = 0
    let y = -20
    let z = 20
    let i = 0
    let gobelinsWainting = []
    // console.log(filters)
    // console.log(filters)
    for(let filterName in filters){
        for(let filterValue in filters[filterName]){
            // console.log(filters[filterName][filterValue], ' doit être égal à true', filterValue,  ' doit être égal à ', gobelin[filterName], ' et le last true : ',gobelin.affiche)
            if(filters[filterName][filterValue]){
                gobelins.forEach(gobelin => {
                console.log(filterValue,  ' doit être égal à ', gobelin[filterName], ' et le last true : ', gobelin.affiche)
                if(gobelin[filterName] === filterValue && gobelin.affiche){
                        console.log(gobelin.Horodateur)
                        gobelin.affiche = true
                    } else {
                        gobelin.affiche = false
                    }
                })
            }
        }
    }
    console.log(gobelins)
            // console.log(gobelin.Horodateur ,gobelin.affiche)
                   
            // if(gobelin.affiche === "homme" && filters.sexe){
            //     gltf.scene.children.forEach(el => {
            //         if(el.type === "Mesh"){
            //             el.material.color.r = 0
            //             el.material.color.g = 0
            //             el.material.color.b = 255
            //             // console.log(el.material.color)
            //         }
            //     });
            // } else if (gobelin.sexe === "femme" && filters.sexe){
            //     gltf.scene.children.forEach(el => {
            //         if(el.type === "Mesh"){
            //             el.material.color.r = 255
            //             el.material.color.g = 0
            //             el.material.color.b = 0
            //             // console.log(el.material.color)
            //         }
            //     });
            // }
            // if(gobelin.epanoui === "Non" && filters.epanoui){
            //     gltf.scene.children.forEach(el => {
            //         if(el.type === "Mesh"){
            //             el.material.emissive = new THREE.Color( 0x00ffff );
            //             el.material.emissiveIntensity = 0.5;
            //             // console.log(el.material.color)
            //         }
            //     });
            // }
gobelins.forEach(gobelin => {
        loaders[i] = new GLTFLoader();

        loaders[i].load( '../assets/Goblins.gltf', function ( gltf ) {
            if(gobelin.affiche === false){
                // console.log('bite')
                gltf.scene.children.forEach(el => {
                    if(el.type === "Mesh"){
                        el.material.color.r = 0
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

let datas = [];
let filteredDatas = []
let personsToDraw = []
let began = false;
let first = true;
let etatJointure = false;
let inputs = document.querySelectorAll('input')
let requestURL = '../datas_mercredi_midi.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    datas = request.response
    console.log(datas)
    modelAllPersons(datas, loaders)
    document.onclick = (e) => {
        listenFilters()
        // console.log("bite")
        modelAllPersons(datas, loaders)

        if(e.target.id === "reset_filters"){
            e.preventDefault()
            inputs.forEach(el => {
                el.checked = false
            })
        }
    }

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
    pointLight.position.z = 200
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