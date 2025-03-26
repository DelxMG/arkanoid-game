class Game {
    constructor(canvas, ctx, ball, paddle, bricks) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.ball = ball;
        this.paddle = paddle;
        this.bricks = bricks;
        this.rightPressed = false;
        this.leftPressed = false;
        this.gameOverImg = document.getElementById('gameOver');
        this.startButton = document.getElementById('start');
        this.isRunning = false;
        this.gameStopped = false;
        this.animationId = null;
    }

    cleanCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Función principal del ciclo de animación del juego
    draw() {
        this.cleanCanvas();

        this.ball.draw();
        this.ball.move(this.paddle, this.bricks); 

        this.paddle.draw(); 
        this.paddle.move(this.rightPressed, this.leftPressed); 

        this.bricks.draw();

        // Verificar si el juego debe detenerse
        if (this.ball.ballOut) {
            this.gameOverImg.style.display = 'block'; 
            this.startButton.style.display = 'flex';  
        } else {
            // Continuar con la animación si el juego no está detenido
            this.animationId = window.requestAnimationFrame(() => this.draw());
        }
    }

    // Función para manejar el evento de cuando se presiona una tecla
    keyDownHandler(event) {
        if (event.key === 'ArrowRight') {
            this.rightPressed = true; 
        }

        if (event.key === 'ArrowLeft') {
            this.leftPressed = true; 
        }
    }

    // Función para manejar el evento de cuando se suelta una tecla
    keyUpHandler(event) {
        if (event.key === 'ArrowRight') {
            this.rightPressed = false; 
        }

        if (event.key === 'ArrowLeft') {
            this.leftPressed = false; 
        }
    }

    // Función para inicializar los eventos de teclado
    initEvents() {
        document.addEventListener('keydown', (event) => this.keyDownHandler(event));
        document.addEventListener('keyup', (event) => this.keyUpHandler(event));
    }

    startGame() {
        this.startButton.addEventListener('click', () => {
            if (!this.isRunning) { // Solo empezar si no está corriendo
                document.getElementById('logo').style.display = 'none';
                this.startButton.style.display = 'none';  
                this.startButton.innerText = 'Restart';
                this.isRunning = true;
                this.gameStopped = false; // Asegurarse de que el juego no está detenido
                this.initEvents();
                this.draw(); // Iniciar el juego
            }
        });
    }

    restartGame() {
        this.isRunning = true; 
        this.gameStopped = false; // Asegurarse de que el juego no está detenido

        // Cancelar la animación anterior si existe
        if (this.animationId) {
            window.cancelAnimationFrame(this.animationId);
        }

        // Limpiar el canvas y ocultar la imagen de Game Over
        this.gameOverImg.style.display = 'none';
        this.startButton.style.display = 'none';

        // Reiniciar la pelota, la pala y los ladrillos
        this.ball.reset();
        this.paddle.reset();
        this.bricks.reset();

        // Iniciar el ciclo de animación
        this.draw();
    }

    stopGame() {
        // Detener la animación
        if (this.animationId) {
            window.cancelAnimationFrame(this.animationId);
            this.gameStopped = true; 
        }

        this.startButton.style.display = 'flex';
        this.startButton.innerText = 'Restart';
    }
}

