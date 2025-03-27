class Options {
    constructor(paddle, ball, game) {
        this.paddle = paddle;
        this.game = game;
        this.ball = ball;
        this.optionContainer = document.getElementById('option-container');
        this.sensitivitySlider = document.getElementById('sensitivity-slider');
        this.sensitivityValue = document.getElementById('sensitivity-value')
        this.paddleSensitivity = paddle.paddleSensitivity;
    }

    manageOptions() {
            if ((!this.game.isRunning && !this.game.isStopped) || this.game.gameFinish) {
                this.optionContainer.style.display = this.optionContainer.style.display === 'flex' ? 'none' : 'flex';
            }
        }

    closeOptions(){
        this.optionContainer.style.display = 'none';
    }

    manageDifficulty(level){
        
        switch(level){

            case 'easy': 
            this.ball.setBallSpeed(1.5); 
            break;

            case 'medium':
            this.ball.setBallSpeed(3.5);
            break;

            case 'hard':
            this.ball.setBallSpeed(6);
        }

        this.ball.reset();
    }

    manageSensitivity(){
        this.sensitivitySlider.addEventListener('input', () => {
            const sensitivity = parseInt(this.sensitivitySlider.value);
            this.sensitivityValue.textContent = sensitivity;

            this.paddle.setPaddleSensitivity(sensitivity);
        });
    }
}