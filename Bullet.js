//logika pojedycznego pocisku pozycja, poruszanie, kolizja
export default class Bullet {

    // dodatnie predkosc = gora
    // ujemna predkosc = dół
    constructor(canvas, x, y, velocity, bulletColor) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.bulletColor = bulletColor;

        //rozmiar
        this.width = 5;
        this.height = 20;
    }

    draw(ctx) {

        this.y -= this.velocity;
        //przeciwnik bilae enemy czerwone
        ctx.fillStyle = this.bulletColor;
        // prostokat
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    //https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    collideWith(sprite) {
        if (
            this.x + this.width > sprite.x &&
            this.x < sprite.x + sprite.width &&
            this.y + this.height > sprite.y &&
            this.y < sprite.y + sprite.height
        ) {
            return true;
        } else {
            return false;
        }
    }
}
