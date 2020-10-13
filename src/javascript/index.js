

import Mouse from "./utils/mouse"
import Easing from "./utils/easing"

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
let lineWidth = 20

// à chaque image : 60fps
const update = () => {
    requestAnimationFrame(update)

    time += .01

    let mouseX = ((Mouse.cursor[0] + 1) / 2) * canvas.width
    let mouseY = ((Mouse.cursor[1] + 1) / 2) * canvas.height

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.moveTo(lineWidth / 2, 0)
    ctx.strokeStyle = `rgb(255, 255, 255)` 
    ctx.lineTo(lineWidth / 2, canvas.height)
    ctx.stroke()
    ctx.fill()

}
requestAnimationFrame(update)