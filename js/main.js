// Obtener el canvas y el contexto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Establecer las dimensiones del canvas
canvas.width = 448;
canvas.height = 400;

// Crear los objetos del juego
const ball = new Ball(canvas, ctx);
const paddle = new Paddle(canvas, ctx);
const bricks = new Bricks(canvas, ctx);

// Crear la instancia del juego
const game = new Game(canvas, ctx, ball, paddle, bricks);

// Manejador del botón de inicio/reinicio
game.startButton.addEventListener('click', () => {
    if (game.isRunning) {
        game.restartGame(); // Reiniciar el juego si ya está corriendo
    } else if (!game.isRunning || game.gameStopped) {
        game.startGame(); // Empezar el juego
    }
});

const stopButton = document.getElementById('stop');


stopButton.addEventListener('click', () => {
    game.stopGame();
})