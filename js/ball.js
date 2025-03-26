class Ball {
    constructor(canvas, ctx) {
        this.canvas = canvas; 
        this.ctx = ctx;
        this.ballRadius = 4; // Radio de la pelota
        this.x = canvas.width / 2; // Posición inicial en X
        this.y = canvas.height - 30; // Posición inicial en Y
        this.dx = 1.5; // Velocidad en el eje X
        this.dy = -1.5; // Velocidad en el eje Y
        this.ballOut = false;
    }

    reset() {
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 30;
        this.dx = 2;
        this.dy = -2;
        this.ballOut = false;
    }
    

    // Función para dibujar la pelota
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2); // Dibuja un círculo
        this.ctx.fillStyle = '#fff'; 
        this.ctx.fill();
        this.ctx.closePath();
    }
    
    // Función para mover la pelota y detectar colisiones
    move(paddle, bricks) {

        // Colisiones con las paredes laterales
        if (this.x + this.dx > this.canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.dx = -this.dx; 
        }

        // Colisión en la pared superior
        if (this.y + this.dy < this.ballRadius) {
            this.dy = -this.dy; 
        }

        // Game Over si llega a la parte inferior
        if (this.y + this.dy > this.canvas.height + this.ballRadius) {
            this.ballOut = true;
        }

        // Colisión con la pala
        const isBallSameXAsPaddle = this.x > paddle.getPaddleX() && 
            this.x < (paddle.getPaddleX() + paddle.getPaddleWidth());
        const isBallTouchingPaddle = this.y + this.dy > paddle.getPaddleY() && 
            this.y < (paddle.getPaddleY() + paddle.getPaddleHeight());

        if (isBallSameXAsPaddle && isBallTouchingPaddle) {
            this.dy = -this.dy; 
        }

        // Colisión con los ladrillos
        if (bricks.collisionDetection(this)) {
            this.dy = -this.dy; 
        }

        // Actualizar las posiciones de la pelota
        this.x += this.dx;
        this.y += this.dy;
    }
}
