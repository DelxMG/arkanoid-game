class Bricks {
    constructor(canvas, ctx, score) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.brickRowCount = 6;
        this.brickColumnCount = 13;
        this.brickWidth = 32;
        this.brickHeight = 16;
        this.brickPadding = 2;
        this.brickOffsetTop = 35;
        this.brickOffsetLeft = 5;
        this.score = 0;
        this.scoreHandler = score;
        this.bricks = [];
        this.brickStatus = {
            ACTIVE: 1,
            DESTROYED: 0
        };
        this.brickImage = document.getElementById('bricks'); // Cargar sprite de los ladrillos

        // Crear la matriz de ladrillos
        for (let c = 0; c < this.brickColumnCount; c++) {
            this.bricks[c] = [];
            for (let r = 0; r < this.brickRowCount; r++) {
                const brickX = c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
                const brickY = r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
                const random = Math.floor(Math.random() * 8);
                this.bricks[c][r] = {
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
                    const clipX = currentBrick.color * 32;
                    this.ctx.drawImage(
                        this.brickImage,
                        clipX, 0,
                        this.brickWidth, this.brickHeight,
                        currentBrick.x, currentBrick.y,
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

    collisionDetection(ball) {
        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                const currentBrick = this.bricks[c][r];
                if (currentBrick.status === this.brickStatus.DESTROYED) {
                    continue;
                }

                const isBallSameXAsBrick = ball.x > currentBrick.x &&
                    ball.x < (currentBrick.x + this.brickWidth);
                const isBallTouchingBrick = ball.y + ball.dy > currentBrick.y &&
                    ball.y < (currentBrick.y + this.brickHeight);

                if (isBallSameXAsBrick && isBallTouchingBrick) {
                    currentBrick.status = this.brickStatus.DESTROYED;
                    this.scoreHandler.increaseScore(10);
                    return true;
                }
            }
        }
        return false;
    }


    checkAllBricksDestroyed() {
        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                const currentBrick = this.bricks[c][r];
                if (currentBrick.status === this.brickStatus.ACTIVE) {
                    return false;
                }
            }
        }
        return true;
    }



}

