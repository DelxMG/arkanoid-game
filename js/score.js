class Score {
    constructor() {
        this.score = 0;  
        this.scoreboard = document.getElementById('current-score');
        this.updateScore();  
    }

    updateScore() {
        this.scoreboard.textContent = this.score;  
    }


    increaseScore(points) {
        this.score += points; 
        this.updateScore();  
    }

    resetScore(){
        this.score = 0;
        this.updateScore();
    }
}