// Obtener el canvas y el contexto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Establecer las dimensiones del canvas
canvas.width = 448;
canvas.height = 400;

// Crear los objetos del juego (pelota, pala y ladrillos)
const ball = new Ball(canvas, ctx);
const paddle = new Paddle(canvas, ctx);
const bricks = new Bricks(canvas, ctx);

// Crear la instancia del juego
const game = new Game(canvas, ctx, ball, paddle, bricks);

// Obtener el logo
const logo = document.getElementById('logo');


if(game.startGame()){
    logo.style.display = 'none'; 
} 
   

game.startGame();


