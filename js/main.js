const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 448;
canvas.height = 400;

const ball = new Ball(canvas, ctx);
const paddle = new Paddle(canvas, ctx);
const score = new Score();
const bricks = new Bricks(canvas, ctx, score);

const game = new Game(canvas, ctx, ball, paddle, bricks, score);


document.addEventListener("click", function playStartMusicLoop() {
    game.startMusic.loop = true;
    game.playMusic(game.startMusic);

    document.removeEventListener("click", playStartMusicLoop);
});


// Comienza el juego
game.startButton.addEventListener('click', () => {
    game.startGame();
});

// Detiene el juego
const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => {
    game.stopGame();
});