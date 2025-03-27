class Paddle {
    constructor(canvas, ctx, paddleSensitivity = 4) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.paddleHeight = 10; 
        this.paddleWidth = 50; 
        this.paddleX = (canvas.width - this.paddleWidth) / 2; 
        this.paddleY = canvas.height - this.paddleHeight - 10; 
        this.paddleSensitivity = paddleSensitivity;
        this.sprite = document.getElementById('sprite'); 
    }

    getPaddleWidth() {
        return this.paddleWidth;
    }

    getPaddleHeight() {
        return this.paddleHeight;
    }

    getPaddleX() {
        return this.paddleX;
    }

    getPaddleY() {
        return this.paddleY;
    }

    setPaddleSensitivity(sensitivity){
        this.paddleSensitivity = sensitivity;
    }

    reset() {
        this.paddleX = (this.canvas.width - this.paddleWidth) / 2;
        this.paddleY = this.canvas.height - this.paddleHeight - 10;
    }
   
    draw() {
        this.ctx.drawImage(
            this.sprite, 
            29, 174,
            this.paddleWidth, this.paddleHeight, 
            this.paddleX, this.paddleY, 
            this.paddleWidth, this.paddleHeight
        );
    }

    move(rightPressed, leftPressed) {
        if (rightPressed && this.paddleX < (this.canvas.width - this.paddleWidth)) {
            this.paddleX += this.paddleSensitivity; 
        } else if (leftPressed && this.paddleX > 0) {
            this.paddleX -= this.paddleSensitivity;
        }
    }
}
