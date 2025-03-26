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
    }

    cleanCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Función principal del ciclo de animación del juego
    draw() {
        this.cleanCanvas(); // Limpiar el canvas

        this.ball.draw(); // Dibujar la pelota
        this.ball.move(this.paddle, this.bricks); // Mover la pelota y detectar colisiones

        this.paddle.draw(); // Dibujar la pala
        this.paddle.move(this.rightPressed, this.leftPressed); // Mover la pala según las teclas presionadas

        this.bricks.draw(); // Dibujar los ladrillos

        if (this.ball.ballOut) {
            this.gameOverImg.style.display = 'block'; // Mostrar la imagen de "Game Over"
            this.startButton.style.display = 'inline';  
        } else {
            window.requestAnimationFrame(() => this.draw()); // Llamar a draw de forma recursiva
        }
    }

    // Función para manejar el evento de cuando se presiona una tecla
    keyDownHandler(event) {
        if (event.key === 'ArrowRight') {
            this.rightPressed = true; // Asignar true cuando la tecla de la flecha derecha se presiona
        }

        if (event.key === 'ArrowLeft') {
            this.leftPressed = true; // Asignar true cuando la tecla de la flecha izquierda se presiona
        }
    }

    // Función para manejar el evento de cuando se suelta una tecla
    keyUpHandler(event) {
        if (event.key === 'ArrowRight') {
            this.rightPressed = false;  // Asignar false cuando la tecla de la flecha derecha se suelta
        }

        if (event.key === 'ArrowLeft') {
            this.leftPressed = false; // Asignar false cuando la tecla de la flecha izquierda se suelta
        }
    }

    // Función para inicializar los eventos de teclado
    initEvents() {
        document.addEventListener('keydown', (event) => this.keyDownHandler(event));
        document.addEventListener('keyup', (event) => this.keyUpHandler(event));
    }

    startGame() {
        this.startButton.addEventListener('click', () => {
            document.getElementById('logo').style.display = 'none';
            this.startButton.style.display = 'none';  
            this.startButton.innerText = 'Restart';
            this.initEvents();
            this.draw();
        });
    }

}

