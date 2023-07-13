// Get the canvas element
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game variables
let score = 0;
let hoppingInterval = 1500; // Initial hopping interval in milliseconds
let bugX, bugY;
let bugSize = 64; // Size of the bug image

// Bug image
const bugImage = new Image();
bugImage.src = "bug.png"; // Replace "bug.png" with your bug image file

// Splattered bug image
const splatteredImage = new Image();
splatteredImage.src = "splattered.png"; // Replace "splattered.png" with your splattered bug image file

// Play zone image
const playZoneImage = new Image();
playZoneImage.src = "playzone.png"; // Replace "playzone.png" with your play zone image file

// Score display
const scoreDisplay = document.getElementById("scoreDisplay");

// Flag to track if bug is splattered
let isSplattered = false;

// Update the bug position
function updateBugPosition() {
    bugX = Math.random() * (canvas.width - bugSize);
    bugY = Math.random() * (canvas.height - bugSize);
    bugSize = Math.floor(Math.random() * 65) + 64; // Randomize bug size between 64 and 128
    isSplattered = false; // Reset the splattered flag
}

// Draw the bug on the canvas
function drawBug() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(playZoneImage, 0, 0, canvas.width, canvas.height);

    if (!isSplattered) {
        ctx.drawImage(bugImage, bugX, bugY, bugSize, bugSize);
    } else {
        ctx.drawImage(splatteredImage, bugX, bugY, bugSize, bugSize);
    }
}

// Update the score display
function updateScoreDisplay() {
    scoreDisplay.textContent = "Score: " + score;
}

// Handle mouse click events
function handleClick(event) {
    const mouseX = event.clientX - canvas.offsetLeft;
    const mouseY = event.clientY - canvas.offsetTop;

    if (
        !isSplattered &&
        mouseX >= bugX - 25 &&
        mouseX <= bugX + bugSize + 25 &&
        mouseY >= bugY - 25 &&
        mouseY <= bugY + bugSize + 25
    ) {
        score++;
        hoppingInterval -= 100;
        isSplattered = true;
        updateScoreDisplay();

        // Temporarily show the splattered bug image
        drawBug();
        setTimeout(() => {
            isSplattered = false;
            updateBugPosition();
        }, 1000); // Set the time to show the splattered bug image before respawning (in milliseconds)
    }
}

// Reset the hopping interval to its initial value
function resetSpeed() {
    hoppingInterval = 1000;
}

// Reset the score
function resetScore() {
    score = 0;
    updateScoreDisplay();
}

// Update the game state and draw the bug
function updateGame() {
    updateBugPosition();
    drawBug();
    updateScoreDisplay();
    setTimeout(updateGame, hoppingInterval);
}

// Event listeners
canvas.addEventListener("mousedown", handleClick);
document.getElementById("resetSpeed").addEventListener("click", resetSpeed);
document.getElementById("resetScore").addEventListener("click", resetScore);

// Initialize the game
playZoneImage.onload = () => {
    bugImage.onload = () => {
        splatteredImage.onload = () => {
            updateGame();
        };
    };
};
