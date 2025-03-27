class Game {
    constructor(canvas, ctx, ball, paddle, bricks, score) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.ball = ball;
        this.paddle = paddle;
        this.bricks = bricks;
        this.rightPressed = false;
        this.leftPressed = false;
        this.gameOverImg = document.getElementById('gameOver');
        this.winImg = document.getElementById('win');
        this.startButton = document.getElementById('start');
        this.isRunning = false;
        this.gameFinish = false;
        this.isStopped = false;
        this.score = score;
        this.animationId = null;
    }

    cleanCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.cleanCanvas();

        this.ball.draw();
        this.ball.move(this.paddle, this.bricks);

        this.paddle.draw();
        this.paddle.move(this.rightPressed, this.leftPressed);

        this.bricks.draw();

        if (this.ball.ballOut) {
            this.gameOverImg.style.display = 'block';
            this.startButton.style.display = 'flex';
            this.startButton.innerText = 'Restart'; 
            this.score.resetScore();
            this.gameFinish = true;
        } else {
            this.animationId = window.requestAnimationFrame(() => this.draw());
        }
    }

    keyDownHandler(event) {
        if (event.key === 'ArrowRight') this.rightPressed = true;
        if (event.key === 'ArrowLeft') this.leftPressed = true;
    }

    keyUpHandler(event) {
        if (event.key === 'ArrowRight') this.rightPressed = false;
        if (event.key === 'ArrowLeft') this.leftPressed = false;
    }

    initEvents() {
        document.addEventListener('keydown', (event) => this.keyDownHandler(event));
        document.addEventListener('keyup', (event) => this.keyUpHandler(event));
    }

    startGame() {
        if (!this.isRunning && !this.isStopped) { 
            document.getElementById('logo').style.display = 'none';
            this.startButton.style.display = 'none';
            this.startButton.innerText = 'Restart';
            this.isRunning = true;
            this.initEvents();
            this.draw();
        } else if (this.isStopped && !this.isRunning) {
            this.resumeGame(); 
        } else if (this.gameFinish && !this.isStopped && this.isRunning) {
            this.restartGame(); 
        }
    };

    cancelAnimation() {
        if (this.animationId) {
            window.cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }


    restartGame() {
        this.isRunning = true;
        this.isStopped = false;
        this.gameFinish = false;

        this.cancelAnimation();

        this.gameOverImg.style.display = 'none';
        this.startButton.style.display = 'none';

        this.ball.reset();
        this.paddle.reset();
        this.bricks.reset();

        this.draw();
    }

    stopGame() {
        if (!this.gameFinish) {

            this.cancelAnimation();
            this.isStopped = true;
            this.isRunning = false;
            this.startButton.style.display = 'flex';
            this.startButton.innerText = 'Resume';
        }
    }

    resumeGame() {
        if (this.isStopped) {
            this.isStopped = false;
            this.isRunning = true;
            this.startButton.style.display = 'none';

            this.cancelAnimation();

            this.animationId = requestAnimationFrame(() => this.draw());
        }
    }

    winGame(){
            this.cleanCanvas();
            this.stopGame();
            this.winImg.style.display = 'block';
    }
}