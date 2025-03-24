// Obtener el contexto del canvas y definir su tamaño
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 448;
canvas.height = 400;

// Crear los objetos del juego (pelota, pala y ladrillos)
const ball = new Ball(canvas, ctx);
const paddle = new Paddle(canvas, ctx);
const bricks = new Bricks(canvas, ctx);
const gameOverImg = document.getElementById('gameOver')

// Variables para las teclas
let rightPressed = false; //Presionar la flecha derecha 
let leftPressed = false; // Presionar la flecha izquierda 
let gameOver = false; // Controla si ha terminado el juego 


// Inicializar los eventos de las teclas (keydown y keyup)
function initEvents() {
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
}

// Función para manejar el evento de cuando se presiona una tecla
function keyDownHandler(event) {
    if (event.key === 'ArrowRight') {
        rightPressed = true; // Asignar true cuando la tecla de la flecha derecha se presiona
    }

    if (event.key === 'ArrowLeft') {
        leftPressed = true; // Asignar true cuando la tecla de la flecha izquierda se presiona
    }
}

// Función para manejar el evento de cuando se suelta una tecla
function keyUpHandler(event) {
    if (event.key === 'ArrowRight') {
        rightPressed = false;  // Asignar false cuando la tecla de la flecha derecha se suelta
    }

    if (event.key === 'ArrowLeft') {
        leftPressed = false; // Asignar false cuando la tecla de la flecha izquierda se suelta
    }
}

// Función para limpiar el canvas antes de redibujar
function cleanCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let start = document.getElementById('startButton')
// Función principal del ciclo de animación del juego

function draw() {
    cleanCanvas(); // Limpiar el canvas

    ball.draw(); // Dibujar la pelota
    ball.move(paddle, bricks); // Mover la pelota y detectar colisiones

    paddle.draw(); // Dibujar la pala
    paddle.move(rightPressed, leftPressed); // Mover la pala según las teclas presionadas

    bricks.draw(); // Dibujar los ladrillos

    if (gameOver){
        gameOverImg.style.display = 'block';
    } else {
    window.requestAnimationFrame(draw); // Siguiente frame para crear la animación
    }
}

const logo = document.getElementById('logo');

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') { // Detectar la tecla Enter
        logo.style.display = 'none';
        initEvents();  // Iniciar los eventos de teclado
        draw();        // Llamar la función de dibujo
    }
});




