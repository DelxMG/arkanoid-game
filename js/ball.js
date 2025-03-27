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
        this.dx = ballSpeed; // Actualiza dx
        this.dy = -ballSpeed; // Actualiza dy
    }

    reset() {
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 30;
        this.dx = this.ballSpeed; 
        this.dy = -this.ballSpeed; 
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
        if (this.x + this.dx > this.canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.dx = -this.dx; 
        }

        if (this.y + this.dy < this.ballRadius) {
            this.dy = -this.dy; 
        }

        if (this.y + this.dy > this.canvas.height + this.ballRadius) {
            this.ballOut = true;
        }

        const isBallSameXAsPaddle = this.x > paddle.getPaddleX() && this.x < (paddle.getPaddleX() + paddle.getPaddleWidth());
        const isBallTouchingPaddle = this.y + this.dy > paddle.getPaddleY() && this.y < (paddle.getPaddleY() + paddle.getPaddleHeight());

        if (isBallSameXAsPaddle && isBallTouchingPaddle) {
            this.dy = -this.dy; 
        }

        if (bricks.collisionDetection(this)) {
            this.dy = -this.dy; 
        }

        this.x += this.dx;
        this.y += this.dy;
    }
}
