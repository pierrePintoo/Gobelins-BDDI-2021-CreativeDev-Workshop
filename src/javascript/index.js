

import Mouse from "./utils/mouse"
import Easing from "./utils/easing"
import Noise from "./utils/Noise"
import Noise2D from "./utils/Noise2D"

const canvas = document.querySelector('.main-canvas')
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth * window.devicePixelRatio
canvas.height = window.innerHeight * window.devicePixelRatio
canvas.style.maxWidth = window.innerWidth
canvas.style.maxHeight = window.innerHeight

let canvasWidth = (canvas.width)
let canvasHeight = (canvas.height)
let cW2 = (canvas.width / 2)
let cH2 = (canvas.height / 2)

let maskLoaded = false

let time = 0

let noise1D = new Noise()
let simplex = new Noise2D()

// à chaque image : 60fps
const update = () => {
    requestAnimationFrame(update)

    //time += .01

    //let mouseX = ((Mouse.cursor[0] + 1) / 2) * canvas.width
    //let mouseY = ((Mouse.cursor[1] + 1) / 2) * canvas.height

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let size = 200
    let steps = 100
    let stepsY = 1
    let scaleY = .1
    let scale = 100
    let frequency = .05

    time += .01

    for (let y = 0; y < stepsY; y++) {
        ctx.save()

        ctx.translate(cW2, cH2)
        ctx.beginPath()
        ctx.strokeStyle = '#FFF'
        /*ctx.moveTo(0, simplex.noise3D(0 + time, time, scaleY) * scale)
        for(let i = 0; i < steps; i++){
            ctx.lineTo(i / steps * canvas.width, simplex.noise3D(i * frequency + time * 2, time, y * scaleY) * scale)
        }*/

        let radius = 100
        //ctx.moveTo(Math.cos(0) * radius, Math.sin(0) * radius)

        for (let x = 0; x <= steps; x++){
            let angle = (x / steps) * Math.PI * 2
            radius = 200 + simplex.noise4D(Math.cos(angle), Math.sin(angle), y * scaleY, time) * scale + y * 100
            ctx.lineTo(Math.cos((x / steps) * Math.PI * 2) * radius, Math.sin((x / steps) * Math.PI * 2) * radius)
        }

        radius = 200 + simplex.noise4D(Math.cos(0), Math.sin(0), y * scaleY, time) * scale + y * 100
        ctx.lineTo(Math.cos(0) * radius, Math.sin(0) * radius)

        ctx.stroke()
        ctx.closePath()
    
        ctx.restore()
    }



}
requestAnimationFrame(update)



