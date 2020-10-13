

import Mouse from "./utils/mouse"
import Easing from "./utils/easing"
import Point from "./Point"

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
let points = []


// à chaque image : 60fps
const update = () => {
    requestAnimationFrame(update)


    time += .01

    let mouseX = ((Mouse.cursor[0] + 1) / 2) * canvas.width
    let mouseY = ((Mouse.cursor[1] + 1) / 2) * canvas.height
    
    ctx.clearRect(0, 0, window.innerWidth * window.devicePixelRatio,  window.innerHeight * window.devicePixelRatio)
    // ctx.fillStyle = 'black'
    // ctx.globalAlpha = 0.1
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    // ctx.globalAlpha = 1

    if (Mouse.isDown) {
        points.push(new Point(mouseX, mouseY, 2, ctx))
    }
    console.log(points.length);

    
    for (let i = 0; i < points.length; i++) {
        points[i].draw()
    }

    points = points.filter(point => point.lifeSpan > 0)
    /*
        for(let i = 0; i < 40; i++){
            for(let j = 0; j < 40; j++){
                drawArrowLookingAt(i * 50, j * 50, mouseX, mouseY)
            }
        }

        drawArrowLookingAt(cW2, cH2, mouseX, mouseY)
    */

    /*
    for(let i = 0; i < 1000; i++){
        drawCircle(i + time * i / 100, i * Math.sin(time))
    }
    */
}
requestAnimationFrame(update)

function drawCircle(angle, radius){
    ctx.beginPath()
    ctx.fillStyle = `rgb(${red})`
    ctx.arc(Math.cos(time + angle) * radius, Math.sin(time + angle) * radius, 3, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
}

function drawArrowLookingAt(x, y, px, py){
    let size = 50

    let angle = Math.atan2(py - y, px - x)
    ctx.save()

    ctx.translate(x, y)
    ctx.rotate(angle)

    ctx.beginPath()
    ctx.moveTo(-size / 2, 0)
    ctx.lineTo(size / 2, 0)
    ctx.closePath()

    ctx.strokeStyle = '#FFF'
    ctx.stroke()
    ctx.restore()
}

// let img = new Image()
// img.src = "https://miro.medium.com/max/1068/0*WwAJP2U-pFbydOfi.jpeg"
// img.onload = ()=>{
//     console.log("l'image est chargée")
// }

// let mask = new Image()
// mask.src = "https://images-ext-2.discordapp.net/external/iYBUoq3zm0M5LJDbHAX8xSMU0ZZGHQjaf60XYRcPD9U/http/designinteractif.gobelins.fr/wp-content/uploads/2018/11/cropped-Logo-Gobelins-1.png"
// mask.onload = () => {
//     maskLoaded = true
// }

// Blabla

// let canvasWidth = (canvas.width)
// let canvasHeight = (canvas.height)
// let cW2 = (canvas.width / 2)
// let cH2 = (canvas.height / 2)

// ctx.beginPath()
// ctx.strokeStyle = '#00aa00'
// ctx.moveTo(canvasWidth / 2 - 50, canvasHeight / 2 + 50)
// ctx.lineTo(canvasWidth / 2, canvasHeight / 2 - 50)
// ctx.lineTo(canvasWidth / 2 + 50, canvasHeight / 2 + 50)
// ctx.lineTo(canvasWidth / 2 - 50, canvasHeight / 2 + 50)
// ctx.stroke()
// ctx.closePath()


