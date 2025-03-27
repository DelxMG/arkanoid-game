class Options {
    constructor (paddle, game) {
        this.paddle = paddle;
        this.game = game;
        this.optionsButton = document.getElementById('options');
        this.optionContainer = document.getElementById('option-container');
        this.paddleSensibility = paddle.paddleSensibility;
    }

    manageOptions(){
        this.optionContainer.addEventListener('click', () => {
            this.optionContainer.style.display = 'block';
        })
    }
}