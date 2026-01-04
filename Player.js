//logika gracza
export default class Player{
    //stan klawiatury
    rightPressed = false;
    leftPressed = false;
    shootPressed = false;
    constructor(canvas, velocity, bulletController) {
    this.canvas =canvas;
    this.velocity = velocity;
    this.bulletController = bulletController;

    //pozycja startowa
    this.x = this.canvas.width/2;
    this.y=this.canvas.height -75;
    //parametry
    this.width =50;
    this.height = 48;

    this.image = new Image();
    this.image.src="images/player.png";

//klawiatura
    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
    }
draw(ctx){
        //jesli spacja to strzal
    if (this.shootPressed) {
        this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10);
    }
    this.move();
    this.collideWithWalls();
    //narysowanie gracza
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
}
    collideWithWalls() {
        //left
        //jesli wyjdze poza ekran ustaw na krawedzi
        if (this.x < 0) {
            this.x = 0;
        }

        //right
        if (this.x > this.canvas.width - this.width) {
            this.x = this.canvas.width - this.width;
        }
    }
    move() {
        //jesli wcisniejty
        if (this.rightPressed) {
            //przesuniecie
            this.x += this.velocity;
        } else if (this.leftPressed) {
            this.x += -this.velocity;
        }
    }
    keydown = (event) => {
        if (event.code == "ArrowRight") {
            this.rightPressed = true;
        }
        if (event.code == "ArrowLeft") {
            this.leftPressed = true;
        }
        if (event.code == "Space") {
            this.shootPressed = true;
        }
    };

    keyup = (event) => {
        if (event.code == "ArrowRight") {
            this.rightPressed = false;
        }
        if (event.code == "ArrowLeft") {
            this.leftPressed = false;
        }
        if (event.code == "Space") {
            this.shootPressed = false;
        }
    };


}