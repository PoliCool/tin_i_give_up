//gameloop
import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
//muzyka
const backgroundMusic = new Audio("sounds/music.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;
//autoplay fix, po nacisnieciu klawisza zaczyna grac muzyka
https://stackoverflow.com/questions/78316193/fix-html-autoplay-issue-does-not-work-with-js-or-when-muted-attribute-is-applie
document.addEventListener("keydown", () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    }
}, { once: true });


const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
//rozmiar gry
canvas.width=600;
canvas.height=600;

const background = new Image();
background.src = 'images/background.jpg'
//kontrolery pocsikow
const playerBulletController = new BulletController(canvas, 7, "red", true);
const enemyBulletController = new BulletController(canvas, 4, "white", false);

//enymcontroler
let enemyController = new EnemyController(
    canvas,
    enemyBulletController,
    playerBulletController
);
//player
let player = new Player(canvas, 3, playerBulletController);

//reset po enter
function resetGame() {
    isGameOver = false;
    didWin = false;
    //forcowane czyszczenie pociskow
    playerBulletController.bullets = [];
    enemyBulletController.bullets = [];
    //nowe obikety
    enemyController = new EnemyController(
        canvas,
        enemyBulletController,
        playerBulletController
    );

    player = new Player(canvas, 3, playerBulletController);
}


let isGameOver = false;
let didWin = false;
function game(){
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if (!isGameOver) {
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
    }
}

//https://www.youtube.com/watch?v=MCVU0w73uKI
function displayGameOver() {
    if (isGameOver) {
        let text = didWin ? "You Win" : "Game Over";
        let textOffset = didWin ? 3.5 : 5;

        ctx.fillStyle = "white";
        ctx.font = "70px Arial";
        ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);

        ctx.font = "30px Arial";
        ctx.fillText(
            "Press ENTER to play again",
            canvas.width / 4.5,
            canvas.height / 2 + 60
        );

    }
}

function checkGameOver() {
    if (isGameOver) {
        return;
    }
    // czy jest kolizja z graczem?
    if (enemyBulletController.collideWith(player)) {
        isGameOver = true;
    }

    if (enemyController.collideWith(player)) {
        isGameOver = true;
    }

    if (enemyController.enemyRows.length === 0) {
        didWin = true;
        isGameOver = true;
    }
}
document.addEventListener("keydown", (event) => {
    if (event.code === "Enter" && isGameOver) {
        resetGame();
    }
});

setInterval(game,1000 / 60);