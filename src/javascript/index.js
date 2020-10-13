

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

let diff = 0

console.log(Math.cos(6), Math.sin(6))
// à chaque image : 60fps
const update = () => {
    requestAnimationFrame(update)

    angle += .1

    let mouseX = ((Mouse.cursor[0] + 1) / 2) * canvas.width
    let mouseY = ((Mouse.cursor[1] + 1) / 2) * canvas.height

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.translate(cW2, cH2)
    ctx.beginPath()
    for(let i = 0; i < 4; i++){
        diff += .004
        ctx.arc(Math.cos(angle) * radius + diff, Math.sin(angle) * radius + diff, 10, 0, Math.PI * 2)
    }
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.closePath()

    ctx.beginPath()
    ctx.fillStyle = '#ff0000'
    ctx.arc(Math.cos(angle) * radius, 0, 5, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.closePath()

    ctx.beginPath()
    ctx.fillStyle = '#00ff00'
    ctx.arc(0, Math.sin(angle) * radius, 5, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.closePath()

    ctx.restore()

}
requestAnimationFrame(update)