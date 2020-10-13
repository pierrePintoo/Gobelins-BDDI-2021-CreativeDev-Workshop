class Point {
    constructor(x, y, size = 25, ctx){
        this.x = x
        this.y = y
        this.size = size
        this.ctx = ctx
        
        this.direction = Math.random() * Math.PI
        this.lifeSpan = 1
        this.lifeSpanRef = this.lifeSpan
        this.progress = 0


    }

    update(){
        this.x += Math.sin(this.direction)
        this.y += Math.cos(this.direction)
        this.lifeSpan -= .01
        this.progress = this.lifeSpan / this.lifeSpanRef 
    }

    draw(){
        this.update()

        let ctx = this.ctx
        ctx.save()
        ctx.globalAlpha = Math.max(this.progress, 0)
        ctx.translate(this.x, this.y)
        ctx.beginPath()
        ctx.fillStyle = `#FFFFFF`
        ctx.arc(0, 0, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
        ctx.globalAlpha = 1
        ctx.restore()

    }
}

export default Point;