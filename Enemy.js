//logika pojedycznego pocisku
export default class Enemy {
    //imageNumber - typ przeciwnika
    constructor(x, y, imageNumber) {
        //pozycja
        this.x = x;
        this.y = y;
        //parametry
        this.width = 36;
        this.height = 32;
        //hp zalezne od numeracji przeciwnika
        this.hp = imageNumber;
        //tworzenie obrazu
        this.image = new Image();
        this.image.src = `images/enemy${imageNumber}.png`;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    //info od kontrolera
    move(xVelocity, yVelocity) {
        this.x += xVelocity;
        this.y += yVelocity;
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
