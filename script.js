const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const guessX = document.getElementById("guessX");
const guessY = document.getElementById("guessY");
const moveButton = document.getElementById("moveButton");
const resetButton = document.getElementById("resetButton");
const message = document.getElementById("message");

const gridSize = 20;
const gridRange = 20;
const diamondHalfSize = 1;
const hitZoneSize = 5;

let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

let targetX = centerX;
let targetY = centerY;

let dotX = centerX;
let dotY = centerY;

let dotVisible = false;
let dotBlue = false;

let score = 0; // Initialize the score

const scoreboard = document.createElement("div");
scoreboard.style.position = "absolute";
scoreboard.style.right = "10px";
scoreboard.style.top = "10px";
scoreboard.style.backgroundColor = "darkgray";
scoreboard.style.color = "white";
scoreboard.style.padding = "10px";
scoreboard.style.borderRadius = "5px";
scoreboard.style.fontSize = "24px";
scoreboard.textContent = "Score: 0";

document.body.appendChild(scoreboard);

function updateScoreboard() {
    scoreboard.textContent = `Score: ${score}`;
}

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
    ctx.fillStyle = dotBlue ? "blue" : "transparent"; // Set the dot color to transparent
    ctx.fill();
    ctx.closePath();
}

function drawPixelatedBoxWithCorners(x, y, size) {
    const halfSize = Math.floor(size / 2);

    for (let dx = -halfSize; dx <= halfSize; dx++) {
        for (let dy = -halfSize; dy <= halfSize; dy++) {
            if (Math.abs(dx) + Math.abs(dy) < halfSize) {
                ctx.fillStyle = "red";
                ctx.fillRect(x + dx * gridSize, y + dy * gridSize, gridSize, gridSize);
            }
        }
    }
}

function moveTarget() {
    const moveX = parseInt(guessX.value) || 0;
    const moveY = parseInt(guessY.value) || 0;

    // Update the hit zone position based on user input
    dotX += moveX * gridSize;
    dotY -= moveY * gridSize;

    dotBlue = true; // Turn the dot blue
    dotVisible = true; // Show the dot
    clearCanvas();
    drawGrid();
    drawPixelatedBoxWithCorners(dotX, dotY, hitZoneSize); // Draw the custom hit zone
    drawTarget();
}

// ... (Previous code)

function checkWin() {
    const distanceX = Math.abs(targetX - dotX);
    const distanceY = Math.abs(targetY - dotY);

    if (distanceX <= diamondHalfSize * gridSize && distanceY <= diamondHalfSize * gridSize) {
        message.style.color = "white"; // Set text color to white
        message.textContent = "Congratulations! You hit the target.";
    } else {
        message.style.color = "white"; // Set text color to white
        message.textContent = "Missed. The target is outside the hit zone.";
    }

    disableInputAndButton();
}

// ... (Rest of the code)


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
    clearCanvas();
    drawGrid();
    drawPixelatedBoxWithCorners(dotX, dotY, hitZoneSize);
}

randomizeTargetPosition();
clearCanvas();
drawGrid();
drawTarget();
updateScoreboard();

moveButton.addEventListener("click", () => {
    moveTarget();
    checkWin();
});

resetButton.addEventListener("click", () => {
    restartGame();
});
