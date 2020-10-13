

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

let angle = 0
let radius = 100
let time = 0

console.log(Math.cos(6), Math.sin(6))
// à chaque image : 60fps
const update = () => {
    requestAnimationFrame(update)

    angle += .1
    time += .1

    let mouseX = ((Mouse.cursor[0] + 1) / 2) * canvas.width
    let mouseY = ((Mouse.cursor[1] + 1) / 2) * canvas.height

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()

    ctx.translate(cW2, cH2)
    ctx.fillStyle = "#FFF"
    for(let i = 0; i < 100; i++){
        drawCircle(Math.PI * (i*0.1) + time, (i * 10 * Math.sin(time * .365)) + 20)    }
    // drawCircle(0, 200, 'rgba(255, 0, 0, 1)')
    // drawCircle(Math.PI / 2, 200, 'rgba(255, 0, 0, 1)')
    // drawCircle(Math.PI, 200, 'rgba(255, 0, 0, 1)')
    // drawCircle(- Math.PI / 2, 200, 'rgba(255, 0, 0, 1)')
    // drawCircle(2.8, 500, 'rgba(255, 0, 0, 1)')
    ctx.restore()
}
requestAnimationFrame(update)

function drawCircle(angle, radius, color) {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(Math.cos(angle + time) * radius, Math.sin(angle + time) * radius, 10, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
}