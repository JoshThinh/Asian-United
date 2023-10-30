function game() {
    window.location.href = 'game.html'; 
}

function home() {
    window.location.href = 'index.html'; 
}

function about() {
    window.location.href = 'about.html'; 
}
document.getElementById("launchButton").addEventListener("click", function() {
    // Specify the path to your game file within your folder
    var gameFilePath = "games/Cookie_Clicker/CookieClicker.html"; // Change this to the actual path
    
    // Open the game file in a new window or tab
    window.open(gameFilePath, "_blank");
});