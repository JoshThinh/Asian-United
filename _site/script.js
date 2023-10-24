const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const guessX = document.getElementById("guessX");
const guessY = document.getElementById("guessY");
const moveButton = document.getElementById("moveButton");
const resetButton = document.getElementById("resetButton");
const message = document.getElementById("message");

const gridSize = 20;
const gridRange = 20;
const hitZoneSize = 3;
const diamondHalfSize = hitZoneSize / 2;

let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

let targetX = centerX;
let targetY = centerY;

let dotX = centerX;
let dotY = centerY;

let hitAreaX;
let hitAreaY;

let dotVisible = false;
let dotBlue = false;

function randomizeTargetPosition() {
    targetX = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    targetY = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawGrid() {
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 1;

    // Draw vertical grid lines
    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Draw horizontal grid lines
    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function drawTarget() {
    ctx.beginPath();
    ctx.arc(targetX, targetY, 10, 0, Math.PI * 2);
    ctx.fillStyle = dotBlue ? "blue" : "transparent";
    ctx.fill();
    ctx.closePath();
}

function drawHitArea() {
    if (dotVisible) {
        // Draw a diamond-shaped hit zone
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.moveTo(hitAreaX, hitAreaY - diamondHalfSize);
        ctx.lineTo(hitAreaX + diamondHalfSize, hitAreaY);
        ctx.lineTo(hitAreaX, hitAreaY + diamondHalfSize);
        ctx.lineTo(hitAreaX - diamondHalfSize, hitAreaY);
        ctx.closePath();
        ctx.fill();
    }
}

function moveTarget() {
    const moveX = parseInt(guessX.value) || 0;
    const moveY = parseInt(guessY.value) || 0;

    hitAreaX = dotX;
    hitAreaY = dotY;

    dotX += moveX * gridSize;
    dotY -= moveY * gridSize;

    dotBlue = true; // Turn the dot blue
    dotVisible = true; // Show the dot
    clearCanvas();
    drawGrid();
    drawHitArea();
    drawTarget();
}

function checkWin() {
    const distanceX = Math.abs(targetX - dotX);
    const distanceY = Math.abs(targetY - dotY);

    if (distanceX <= diamondHalfSize * gridSize && distanceY <= diamondHalfSize * gridSize) {
        message.textContent = "Congratulations! You hit the target.";
    } else {
        message.textContent = "Missed. The target is outside the hit zone.";
    }

    disableInputAndButton();
}

function disableInputAndButton() {
    guessX.disabled = true;
    guessY.disabled = true;
    moveButton.disabled = true;
}

function enableInputAndButton() {
    guessX.disabled = false;
    guessY.disabled = false;
    moveButton.disabled = false;
}

function restartGame() {
    randomizeTargetPosition();
    dotX = centerX;
    dotY = centerY;
    dotVisible = false; // Hide the dot
    dotBlue = false; // Reset the dot color
    clearCanvas();
    drawGrid();
    drawTarget();
    enableInputAndButton();
    message.textContent = "";
}

randomizeTargetPosition();
clearCanvas();
drawGrid();
drawTarget();

moveButton.addEventListener("click", () => {
    moveTarget();
    checkWin();
});

resetButton.addEventListener("click", () => {
    restartGame();
});
