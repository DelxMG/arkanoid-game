
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


canvas.width = 448;
canvas.height = 400;


const ball = new Ball(canvas, ctx);
const paddle = new Paddle(canvas, ctx);
const score = new Score();
const bricks = new Bricks(canvas, ctx, score);


const game = new Game(canvas, ctx, ball, paddle, bricks, score);
const options = new Options(paddle, ball, game);


const optionsButton = document.getElementById('options');
optionsButton.addEventListener('click', () => {
    options.manageOptions();  
});


const easyButton = document.getElementById('easy');
const mediumButton = document.getElementById('medium');
const hardButton = document.getElementById('hard');

easyButton.addEventListener('click', () => {
    options.manageDifficulty('easy');
});

mediumButton.addEventListener('click', () => {
    options.manageDifficulty('medium');
});

hardButton.addEventListener('click', () => {
    options.manageDifficulty('hard');
});

options.manageSensitivity();


game.startButton.addEventListener('click', () => {
    options.closeOptions();
    game.startGame(); 

    if(bricks.checkAllBricksDestroyed()){
    game.winGame();
    }
});

const stopButton = document.getElementById('stop');


stopButton.addEventListener('click', () => {
    game.stopGame();
});