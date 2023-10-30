document.addEventListener("DOMContentLoaded", function () {
    startGame();
});

function startGame() {
    createBoxes();
}

function applyColor() {
    var colorSelect = document.getElementById("color-select");
    var selectedColor = colorSelect.value;
    var gameArea = document.getElementById("game-area");
    gameArea.style.backgroundColor = selectedColor;
}

function createBoxes() {
    var gameArea = document.getElementById("game-area");

    for (var i = 1; i <= 3; i++) {
        var box = document.createElement("div");
        box.className = "box";
        box.textContent = i;
        box.addEventListener("click", function (event) {
            boxClicked(event.target);
        });

        gameArea.appendChild(box);
    }
}

function boxClicked(box) {
    // Handle box click logic here
    // 'box' is the clicked box element
}
