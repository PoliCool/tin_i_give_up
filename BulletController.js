//kontroler pocisków
import Bullet from "./Bullet.js";
export default class BulletController {
    //tablica pociskow
    bullets = [];
    //cooldown strzalu
    timeTillNextBulletAllowed = 0;

    constructor(canvas, maxBulletsAtATime, bulletColor, soundEnabled) {
        this.canvas = canvas;
        this.maxBulletsAtATime = maxBulletsAtATime;
        this.bulletColor = bulletColor;
        this.soundEnabled = soundEnabled;

        this.shootSound = new Audio("sounds/shoot.mp3");
        this.shootSound.volume = 0.5;
    }
    draw(ctx) {
        //usuwanie pociskow powyzej i ponizej ekranu
        this.bullets = this.bullets.filter(
            //bullet.y + bullet.width -> warunek że badamy tylko pociski które sa na mapie
            (bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
        );
        //rysowanie pociskow
        this.bullets.forEach((bullet) => bullet.draw(ctx));
        //odliczanie cooldownu
        if (this.timeTillNextBulletAllowed > 0) {
            this.timeTillNextBulletAllowed--;
        }
    }

    //jesli trafienie zwraca index jesli nie -1
    collideWith(sprite) {
        const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet) =>
            bullet.collideWith(sprite)
        );

        if (bulletThatHitSpriteIndex >= 0) {
            //uduwanie pocisku ktory trafil
            this.bullets.splice(bulletThatHitSpriteIndex, 1);
            return true;
        }

        return false;
    }


    shoot(x, y, velocity, timeTillNextBulletAllowed = 0) {
        if (
            //uwarunkowanie strzalu
            this.timeTillNextBulletAllowed <= 0 &&
            this.bullets.length < this.maxBulletsAtATime
        ) {
            //utworzenie pocsiku
            const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
            this.bullets.push(bullet);
            if (this.soundEnabled) {
                this.shootSound.currentTime = 0;
                this.shootSound.play();
            }
            this.timeTillNextBulletAllowed = timeTillNextBulletAllowed;
        }
    }

}