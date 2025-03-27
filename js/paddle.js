class Paddle {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.paddleHeight = 10; // Altura de la pala
        this.paddleWidth = 50; // Ancho de la pala
        this.paddleX = (canvas.width - this.paddleWidth) / 2; // Posición inicial en X
        this.paddleY = canvas.height - this.paddleHeight - 10; // Posición inicial en Y
        this.paddleSensibility = 4;
        this.sprite = document.getElementById('sprite'); // Cargar sprite de la pala
    }

    // Función para obtener el ancho de la pala
    getPaddleWidth() {
        return this.paddleWidth;
    }

    // Función para obtener la altura de la pala
    getPaddleHeight() {
        return this.paddleHeight;
    }

    // Función para obtener la posición X de la pala
    getPaddleX() {
        return this.paddleX;
    }

    // Función para obtener la posición Y de la pala
    getPaddleY() {
        return this.paddleY;
    }

    reset() {
        this.paddleX = (this.canvas.width - this.paddleWidth) / 2;
        this.paddleY = this.canvas.height - this.paddleHeight - 10;
    }
    // Función para dibujar la paleta
    draw() {
        this.ctx.drawImage(
            this.sprite, // Usar la imagen de la pala
            29, 174, // Coordenadas dentro del sprite
            this.paddleWidth, this.paddleHeight, // Tamaño de la pala
            this.paddleX, this.paddleY, // Posición en el canvas
            this.paddleWidth, this.paddleHeight
        );
    }

    // Función para mover la paleta en función de la tecla presionada
    move(rightPressed, leftPressed) {
        if (rightPressed && this.paddleX < (this.canvas.width - this.paddleWidth)) {
            this.paddleX += this.paddleSensibility; // Mover a la derecha
        } else if (leftPressed && this.paddleX > 0) {
            this.paddleX -= this.paddleSensibility; // Mover a la izquierda
        }
    }
}
