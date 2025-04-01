class Game {
    constructor(canvas, ctx, ball, paddle, bricks, score) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.ball = ball;
        this.paddle = paddle;
        this.bricks = bricks;
        this.score = score;
        this.options = options;

        this.rightPressed = false;
        this.leftPressed = false;
        this.isRunning = false;
        this.gameFinish = false;
        this.gameWin = false;
        this.isStopped = false;

        this.animationId = null;

        this.gameOverImg = document.getElementById('gameOver');
        this.winImg = document.getElementById('win');
        this.startButton = document.getElementById('start');
        this.optionsButton = document.getElementById('options');
        this.easyButton = document.getElementById('easy');
        this.mediumButton = document.getElementById('medium');
        this.hardButton = document.getElementById('hard');
        this.sensitivitySlider = document.getElementById('sensitivity-slider');
        this.sensitivityValue = document.getElementById('sensitivity-value');
        this.optionContainer = document.getElementById('option-container');

        this.initButtons();
    }

    // Limpia el lienzo
    cleanCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Dibuja todos los elementos en el lienzo
    draw() {
        this.cleanCanvas();
        this.ball.draw();
        this.ball.move(this.paddle, this.bricks);

        this.paddle.draw();
        this.paddle.move(this.rightPressed, this.leftPressed);

        this.bricks.draw();
        this.win();

        if (this.ball.ballOut && !this.gameWin) {
            this.showGameOver();
        } else if (!this.gameWin) {
            this.animationId = window.requestAnimationFrame(() => this.draw());
        }
    }

    // Muestra la pantalla de "Game Over"
    showGameOver() {
        this.score.checkHighScore(); 
        this.gameOverImg.style.display = 'block';
        this.startButton.style.display = 'flex';
        this.startButton.innerText = 'Restart';
        this.score.resetScore(); 
        this.gameFinish = true;
    }

    // Detecta las teclas presionadas
    keyDownHandler(event) {
        if (event.key === 'ArrowRight') this.rightPressed = true;
        if (event.key === 'ArrowLeft') this.leftPressed = true;
    }

    // Detecta cuando se dejan de presionar las teclas
    keyUpHandler(event) {
        if (event.key === 'ArrowRight') this.rightPressed = false;
        if (event.key === 'ArrowLeft') this.leftPressed = false;
    }

    // Inicializa los eventos de teclado
    initEvents() {
        document.addEventListener('keydown', (event) => this.keyDownHandler(event));
        document.addEventListener('keyup', (event) => this.keyUpHandler(event));
    }

    // Inicializa los eventos de los botones
    initButtons() {
        this.optionsButton.addEventListener('click', () => this.manageOptions());
        this.easyButton.addEventListener('click', () => this.manageDifficulty('easy'));
        this.mediumButton.addEventListener('click', () => this.manageDifficulty('medium'));
        this.hardButton.addEventListener('click', () => this.manageDifficulty('hard'));
        this.sensitivitySlider.addEventListener('input', () => this.manageSensitivity());
    }

    // Gestiona la visibilidad de las opciones
    manageOptions() {
        this.optionContainer.style.display = this.optionContainer.style.display === 'flex' ? 'none' : 'flex';
    }

    // Gestiona la dificultad
    manageDifficulty(level) {
        switch(level) {
            case 'easy': 
                this.ball.setBallSpeed(1.5); 
                this.score.setMultiplier(1);
                break;
            case 'medium':
                this.ball.setBallSpeed(3);
                this.score.setMultiplier(2);
                break;
            case 'hard':
                this.ball.setBallSpeed(5);
                this.score.setMultiplier(3);
                break;
        }
    }

    // Gestiona la sensibilidad
    manageSensitivity() {
        const sensitivity = parseInt(this.sensitivitySlider.value);
        this.sensitivityValue.textContent = sensitivity;
        this.paddle.setPaddleSensitivity(sensitivity);
    }

    // Comienza o reanuda el juego
    startGame() {
        if (!this.isRunning && !this.isStopped) {
            this.startNewGame();
            this.optionContainer.style.display = 'none';
        } else if (this.isStopped && !this.isRunning) {
            this.resumeGame();
            this.optionContainer.style.display = 'none'; 
        } else if (this.gameFinish && !this.isStopped && this.isRunning) {
            this.restartGame();
            this.optionContainer.style.display = 'none'; 
        }
    }

    // Comienza un juego nuevo
    startNewGame() {
        document.getElementById('logo').style.display = 'none';
        this.startButton.style.display = 'none';
        this.startButton.innerText = 'Restart';
        this.isRunning = true;
        this.initEvents();
        this.draw();
    }

    // Cancela la animación en curso
    cancelAnimation() {
        if (this.animationId) {
            window.cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    // Reinicia el juego
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

        this.score.resetScore();

        this.draw();
    }

    // Detiene el juego
    stopGame() {
        if (this.isRunning && !this.gameFinish) {
            this.isStopped = true;
            this.isRunning = false;
            this.cancelAnimation();
            this.startButton.style.display = 'flex';
            this.startButton.innerText = 'Resume';
        }
    }

    // Reanuda el juego
    resumeGame() {
        if (this.isStopped) {
            this.isStopped = false;
            this.isRunning = true;
            this.startButton.style.display = 'none';
            this.cancelAnimation();
            this.animationId = requestAnimationFrame(() => this.draw());
        }
    }

    // Comprueba si el jugador ganó
    win() {
        if (this.isRunning && this.bricks.checkAllBricksDestroyed()) {
            this.gameWin = true;
            this.winImg.style.display = 'block';
            this.cleanCanvas();
        }
    }
}
