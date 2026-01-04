import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";
import ExplosionController from "./ExplosionController.js";


export default class EnemyController{

    enemyMap = this.generateEnemyMap();

    enemyRows=[];


    currentDirection = MovingDirection.right;
    xVelocity= 0;
    yVelocity =0;
    defaultXVelocity =1;
    defaultYVelocity =1;
    moveDownTimerDefault =30;
    moveDownTimer = this.moveDownTimerDefault;
// kiedy wystrzelić pocisk
    fireBulletTimerDefault = 100;
    fireBulletTimer = this.fireBulletTimerDefault;


    constructor(canvas, enemyBulletController, playerBulletController) {
        this.canvas = canvas;
        this.enemyBulletController = enemyBulletController;
        this.playerBulletController = playerBulletController;

        this.enemyDeathSound = new Audio("sounds/death.mp3");
        this.enemyDeathSound.volume = 0.5;
        this.explosionController = new ExplosionController();

        this.createEnemies();

    }
    draw(ctx){
        this.decrementMoveDownTimer();
        this.updateVelocityAndDirection();
        this.collisionDetection();

        this.drawEnemies(ctx);
        this.explosionController.draw(ctx);

        this.resetMoveDownTimer();
        this.fireBullet();

    }

    collisionDetection() {
        //iteracja po rzedach
        this.enemyRows.forEach((enemyRow) => {
            //iteracja po enemy
            enemyRow.forEach((enemy, enemyIndex) => {
                if (this.playerBulletController.collideWith(enemy)) {
                    enemy.hp--;

                    if (enemy.hp <= 0) {
                        this.enemyDeathSound.currentTime = 0;
                        this.enemyDeathSound.play();

                        this.explosionController.addExplosion(
                            enemy.x + enemy.width / 2,
                            enemy.y + enemy.height / 2
                        );

                        enemyRow.splice(enemyIndex, 1);
                    }
                }

            });
        });
        //usuniecie pustych rzedow
        this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0);
    }

    fireBullet() {
        this.fireBulletTimer--;
        if (this.fireBulletTimer <= 0) {
            //reset po każdym strzale
            this.fireBulletTimer = this.fireBulletTimerDefault;
            //liczba przeciwników
            const allEnemies = this.enemyRows.flat();
            //wybranie losowego indexu wroga
            const enemyIndex = Math.floor(Math.random() * allEnemies.length);
            const enemy = allEnemies[enemyIndex];
            //zeby pocisk lecial ze srodka przeciwnika
            // -3 = kierunek
            this.enemyBulletController.shoot(enemy.x + enemy.width / 2, enemy.y, -3);
        }
    }
    decrementMoveDownTimer(){
        if(
            this.currentDirection === MovingDirection.downLeft ||
            this.currentDirection=== MovingDirection.downRight
        ){
            this.moveDownTimer--;
        }
    }
    resetMoveDownTimer(){
        if(this.moveDownTimer <= 0){
           this.moveDownTimer = this.moveDownTimerDefault;
        }
    }
    updateVelocityAndDirection(){
        for(const enemyRow of this.enemyRows){
            if(this.currentDirection == MovingDirection.right){
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity=0;
                const rightMostEnemy = enemyRow[enemyRow.length - 1];
                if(rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width){
                    this.currentDirection = MovingDirection.downLeft;
                    break;
                }
            }
           else if(this.currentDirection === MovingDirection.downLeft){
               if(this.moveDown(MovingDirection.left)){
                   break;
               }
            } else if(this.currentDirection === MovingDirection.left){
               this.xVelocity = -this.defaultXVelocity;
               this.yVelocity=0;
               const leftMostEnemy = enemyRow[0];
               if(leftMostEnemy.x <= 0){
                   this.currentDirection = MovingDirection.downRight;
                   break;
               }
            } else if(this.currentDirection === MovingDirection.downRight){
                if(this.moveDown(MovingDirection.right)){
                    break;
                }
            }
        }
    }
moveDown(newDirection){
    this.xVelocity=0;
    this.yVelocity=this.defaultYVelocity;
    if(this.moveDownTimer <=0){
        this.currentDirection = newDirection;
        return true;
    }
    return false;
}
    drawEnemies(ctx){
        this.enemyRows.flat().forEach((enemy)=>{
            enemy.move(this.xVelocity, this.yVelocity);
            enemy.draw(ctx);
        })
    }

    createEnemies(){
        this.enemyMap.forEach((row,rowIndex)=>{
          this.enemyRows[rowIndex]=[];
          row.forEach((enemyNumber,enemyIndex) => {
              if(enemyNumber>0){
                  this.enemyRows[rowIndex].push(
                      // enemyIndex ->przerwa pozioma między przeciwnikami
                      // rowIndex ->przerwa pionowa między przeciwnikami
                      new Enemy(enemyIndex* 50, rowIndex * 35, enemyNumber))
              }
            });
        });
    }
    collideWith(sprite) {
        return this.enemyRows.flat().some((enemy) => enemy.collideWith(sprite));
    }

    //https://stackoverflow.com/questions/5836833/create-an-array-with-random-values
    //https://dev.to/juniordevforlife/adventures-with-javascript-arrays-random-numbers-array-4io1
    generateEnemyMap(rows = 6, cols = 10) {
        const map = [];

        for (let r = 0; r < rows; r++) {
            map[r] = [];
            for (let c = 0; c < cols; c++) {
                map[r][c] = Math.random() < 0.8
                    ? Math.floor(Math.random() * 3) + 1
                    : 0;
            }
        }

        return map;
    }

}