export default class Explosion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.maxRadius = 25;
        //przezroczystosc
        this.alpha = 1;
    }
//https://codegolf.stackexchange.com/questions/2571/most-compact-code-for-a-simulated-explosion
    //https://stackoverflow.com/questions/43498923/html5-canvas-particle-explosion
    draw(ctx) {
        this.radius += 2;
        this.alpha -= 0.05;

        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    isFinished() {
        return this.alpha <= 0;
    }
}
