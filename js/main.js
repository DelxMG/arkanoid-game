const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 448;
canvas.height = 400;

const ball = new Ball(canvas, ctx);
const paddle = new Paddle(canvas, ctx);
const score = new Score();
const bricks = new Bricks(canvas, ctx, score);

const game = new Game(canvas, ctx, ball, paddle, bricks, score);

// Comienza el juego
game.startButton.addEventListener('click', () => {
    game.startGame(); 
});

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => {
    game.stopGame();
});