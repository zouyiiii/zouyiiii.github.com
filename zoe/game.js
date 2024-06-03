const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let dino = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    dy: 0,
    gravity: 0.6,
    jump: -10,
    grounded: true
};

let obstacles = [];
let frameCount = 0;
let score = 0;
let gameOver = false;

function drawDino() {
    ctx.fillStyle = 'green';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawObstacles() {
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function updateDino() {
    if (!dino.grounded) {
        dino.dy += dino.gravity;
        dino.y += dino.dy;
    }
    if (dino.y + dino.height >= canvas.height) {
        dino.y = canvas.height - dino.height;
        dino.dy = 0;
        dino.grounded = true;
    }
}

function updateObstacles() {
    if (frameCount % 100 === 0) {
        obstacles.push({
            x: canvas.width,
            y: canvas.height - 20,
            width: 20,
            height: 20
        });
    }
    obstacles.forEach(obstacle => {
        obstacle.x -= 5;
    });
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
}

function checkCollision() {
    obstacles.forEach(obstacle => {
        if (dino.x < obstacle.x + obstacle.width &&
            dino.x + dino.width > obstacle.x &&
            dino.y < obstacle.y + obstacle.height &&
            dino.y + dino.height > obstacle.y) {
            gameOver = true;
        }
    });
}

function displayScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameOver) {
        drawDino();
        drawObstacles();
        updateDino();
        updateObstacles();
        checkCollision();
        displayScore();

        score++;
        frameCount++;
        requestAnimationFrame(gameLoop);
    } else {
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && dino.grounded) {
        dino.dy = dino.jump;
        dino.grounded = false;
    }
});

gameLoop();
