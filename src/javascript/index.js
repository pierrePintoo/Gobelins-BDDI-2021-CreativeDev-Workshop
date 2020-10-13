

import Mouse from "./utils/mouse"
import Easing from "./utils/easing"
import Noise from "./utils/Noise"

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

let noise = new Noise()

// à chaque image : 60fps
const update = () => {
    //requestAnimationFrame(update)

    //time += .01

    //let mouseX = ((Mouse.cursor[0] + 1) / 2) * canvas.width
    //let mouseY = ((Mouse.cursor[1] + 1) / 2) * canvas.height

    //ctx.clearRect(0, 0, canvas.width, canvas.height)

    let size = 200

    let steps = 100
    let scale = 100
    let frequency = .1

    ctx.save()

    ctx.translate(0, cH2)
    ctx.beginPath()
    ctx.strokeStyle = '#FFF'
    ctx.moveTo(0, noise.getVal(0) * scale)
    console.log(noise.getVal(0))
    for(let i = 0; i < steps; i++){
        ctx.lineTo(i / steps * canvas.width, noise.getVal(i * frequency) * scale)
    }
    ctx.stroke()
    ctx.closePath()

    ctx.restore()

}
requestAnimationFrame(update)



