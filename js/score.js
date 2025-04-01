class Score {
    constructor() {
        this.score = 0;  
        this.scoreboard = document.getElementById('current-score');
        this.highScoreElement = document.getElementById('high-score');
        this.multiplier = 1;

        this.highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
        this.updateScore(); 
    }

    updateScore() {
        this.scoreboard.textContent = this.score;  
        this.highScoreElement.textContent = this.highScore;
    }


    increaseScore(points) {
        this.score += points * this.multiplier; 
        this.updateScore();  
    }

    resetScore(){
        this.score = 0;
        this.updateScore();
    }

    
    checkHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore); 
            this.updateScore();
        }
    }

    resetScore() {
        this.checkHighScore();
        this.score = 0;
        this.updateScore();
    }

    setMultiplier(multiplier) {
        this.multiplier = multiplier;
    }
}