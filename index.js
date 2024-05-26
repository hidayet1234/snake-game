const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = 20;
const tileSize = canvas.width / tileCount;

let snake = [{ x: 10, y: 10 }];
let apple = { x: 15, y: 15 };
let xVelocity = 0;
let yVelocity = 0;

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = "#00f";
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function drawApple() {
    ctx.fillStyle = "#f00";
    ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);
}

function moveSnake() {
    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
    snake.unshift(head);

    if (head.x === apple.x && head.y === apple.y) {
        generateApple();
    } else {
        snake.pop();
    }
}

function generateApple() {
    apple.x = Math.floor(Math.random() * tileCount);
    apple.y = Math.floor(Math.random() * tileCount);
}

function checkCollision() {
    if (
        snake[0].x < 0 || 
        snake[0].x >= tileCount || 
        snake[0].y < 0 || 
        snake[0].y >= tileCount
    ) {
        resetGame();
    }

    snake.slice(1).forEach(segment => {
        if (segment.x === snake[0].x && segment.y === snake[0].y) {
            resetGame();
        }
    });
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    xVelocity = 0;
    yVelocity = 0;
    generateApple();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    checkCollision();
    drawSnake();
    drawApple();
}

document.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowUp":
            if (yVelocity === 0) {
                xVelocity = 0;
                yVelocity = -1;
            }
            break;
        case "ArrowDown":
            if (yVelocity === 0) {
                xVelocity = 0;
                yVelocity = 1;
            }
            break;
        case "ArrowLeft":
            if (xVelocity === 0) {
                xVelocity = -1;
                yVelocity = 0;
            }
            break;
        case "ArrowRight":
            if (xVelocity === 0) {
                xVelocity = 1;
                yVelocity = 0;
            }
            break;
    }
});

setInterval(gameLoop, 100);



