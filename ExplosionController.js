import Explosion from "./Explosion.js";

export default class ExplosionController {
    //tablica, kazda eksplozja to osobny obiekt
    explosions = [];

    addExplosion(x, y) {
        this.explosions.push(new Explosion(x, y));
    }

    draw(ctx) {
        this.explosions.forEach((explosion) => explosion.draw(ctx));
        //usuniecie zakonczonych eksplozji
        this.explosions = this.explosions.filter(
            (explosion) => !explosion.isFinished()
        );
    }
}
