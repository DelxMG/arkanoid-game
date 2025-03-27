class Bricks {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.brickRowCount = 6; // Número de filas de ladrillos
        this.brickColumnCount = 13; // Número de columnas de ladrillos
        this.brickWidth = 32; // Ancho de cada ladrillo
        this.brickHeight = 16; // Alto de cada ladrillo
        this.brickPadding = 2; // Espacio entre ladrillos
        this.brickOffsetTop = 35; // Desplazamiento de los ladrillos desde la parte superior
        this.brickOffsetLeft = 5; // Desplazamiento de los ladrillos desde la parte izquierda
        this.bricks = [];
        this.brickStatus = {
            ACTIVE: 1, // Ladrillo activo
            DESTROYED: 0 // Ladrillo destruido
        };
        this.brickImage = document.getElementById('bricks'); // Cargar sprite de los ladrillos

        // Crear la matriz de ladrillos
        for (let c = 0; c < this.brickColumnCount; c++) {
            this.bricks[c] = [];
            for (let r = 0; r < this.brickRowCount; r++) {
                const brickX = c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
                const brickY = r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
                const random = Math.floor(Math.random() * 8); // Color aleatorio para cada ladrillo
                this.bricks[c][r] = { // Objeto con la información de cada ladrillo
                    x: brickX,
                    y: brickY,
                    status: this.brickStatus.ACTIVE,
                    color: random
                };
            }
        }
    }

    // Función para dibujar los ladrillos
    draw() {
        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                const currentBrick = this.bricks[c][r];
                if (currentBrick.status === this.brickStatus.ACTIVE) {
                    const clipX = currentBrick.color * 32; // Seleccionar el color del ladrillo
                    this.ctx.drawImage(
                        this.brickImage,
                        clipX, 0, // Recortar la imagen
                        this.brickWidth, this.brickHeight, // Tamaño del ladrillo
                        currentBrick.x, currentBrick.y, // Posición del ladrillo
                        this.brickWidth, this.brickHeight
                    );
                }
            }
        }
    }


    reset() {
        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                this.bricks[c][r].status = this.brickStatus.ACTIVE;
            }
        }

        this.draw();

    }


    // Función para detectar colisiones con los ladrillos
    collisionDetection(ball) {
        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                const currentBrick = this.bricks[c][r];
                if (currentBrick.status === this.brickStatus.DESTROYED) {
                    continue; // Si el ladrillo está destruido, lo ignoramos
                }

                const isBallSameXAsBrick = ball.x > currentBrick.x &&
                    ball.x < (currentBrick.x + this.brickWidth);
                const isBallTouchingBrick = ball.y + ball.dy > currentBrick.y &&
                    ball.y < (currentBrick.y + this.brickHeight);

                if (isBallSameXAsBrick && isBallTouchingBrick) {
                    currentBrick.status = this.brickStatus.DESTROYED; // Marcar el ladrillo como destruido
                    return true;
                }
            }
        }
        return false;
    }
}

