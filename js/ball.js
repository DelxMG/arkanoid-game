class Ball {
    constructor(canvas, ctx, ballSpeed = 1.5) {
        this.canvas = canvas; 
        this.ctx = ctx;
        this.ballRadius = 4;
        this.x = canvas.width / 2;
        this.y = canvas.height - 30;
        this.ballSpeed = ballSpeed;
        this.dx = ballSpeed; 
        this.dy = -ballSpeed;
        this.ballOut = false;
    }

    setBallSpeed(ballSpeed) {
        this.ballSpeed = ballSpeed;
        this.dx = ballSpeed;
        this.dy = -ballSpeed; 
    }

    reset() {
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 30;
        this.setBallSpeed(this.ballSpeed); 
        this.ballOut = false;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = '#fff';
        this.ctx.fill();
        this.ctx.closePath();
    }
    
    move(paddle, bricks) {
        this.#bounceOffWalls();
        this.#bounceOffPaddle(paddle);
        this.#checkBrickCollision(bricks);
        this.#checkOutOfBounds();
        
        this.x += this.dx;
        this.y += this.dy;
    }

    #bounceOffWalls() {
        if (this.x + this.dx > this.canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.dx = -this.dx;
        }
        if (this.y + this.dy < this.ballRadius) {
            this.dy = -this.dy;
        }
    }

    #bounceOffPaddle(paddle) {
        const paddleX = paddle.getPaddleX();
        const paddleY = paddle.getPaddleY();
        const paddleWidth = paddle.getPaddleWidth();
        const paddleHeight = paddle.getPaddleHeight();

        if (
            this.x > paddleX && this.x < paddleX + paddleWidth &&
            this.y + this.dy >= paddleY && this.y + this.dy <= paddleY + paddleHeight
        ) {
            this.dy = -this.dy; 
        }
    }

    #checkBrickCollision(bricks) {
        if (bricks.collisionDetection(this)) {
            this.dy = -this.dy;
        }
    }

    #checkOutOfBounds() {
        if (this.y + this.dy > this.canvas.height + this.ballRadius) {
            this.ballOut = true;
        }
    }
}
